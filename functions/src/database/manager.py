from pathlib import Path
from typing import Literal

from psycopg import Connection

from src.database.connector import connection_context


class MigrationManager:
    def __init__(self):
        self.migration_folder = Path(__file__).parent / 'migrations'

    def migrate(self, direction: Literal['up', 'down'], levels: int):
        """Migrates the database based on the migration sql files"""
        with connection_context() as conn:
            if levels <= 0:
                raise ValueError("Levels must be a positive value")

            current_level = self.get_migration_level(connection=conn)

            match direction:
                case 'up':
                    contents = [
                                   content
                                   for content, mig_level in
                                   sorted([
                                       self._parse_migration_file(file) for file in
                                       self.migration_folder.glob('*.up.sql')
                                   ], key=lambda x: x[1])
                                   if mig_level > current_level
                               ][:levels]
                    new_migration_level = current_level + len(contents)

                case 'down':
                    contents = [
                                   content
                                   for content, mig_level in
                                   sorted([
                                       self._parse_migration_file(file) for file in
                                       self.migration_folder.glob('*.down.sql')
                                   ], key=lambda x: -x[1])
                                   if mig_level <= current_level
                               ][:levels]
                    new_migration_level = current_level - len(contents)
                case _:
                    raise ValueError(f"Invalid migration direction: '{direction}'")

            if len(contents) > 0:
                for sql in contents:
                    conn.execute(sql)
                conn.commit()

                if self.migration_table_exists(connection=conn):
                    conn.execute("update main.migration set level = %s where id = %s",
                                 (new_migration_level, self._get_migration_id(connection=conn)))

            return new_migration_level

    @staticmethod
    def _parse_migration_file(fp: Path):
        level = int(fp.name.split('.')[0])
        with open(fp) as f:
            content = f.read().strip()

        if not content.endswith(';'):
            content += ';'

        return content, level

    @staticmethod
    def migration_table_exists(*, connection: Connection = None):
        with connection_context(connection=connection) as conn:
            return conn.execute("""
            select * 
            from information_schema.tables 
            where table_schema = 'main' and table_name = 'migration';
            """).rowcount == 1

    def get_migration_level(self, *, connection: Connection = None):
        """Gets the current migration level"""
        with connection_context(connection=connection) as conn:
            if not self.migration_table_exists(connection=conn):
                return 0

            return conn.execute("""
            select level 
            from main.migration
            where id = %s""", (self._get_migration_id(connection=conn),)).fetchone()[0]

    @staticmethod
    def _get_migration_id(*, connection: Connection = None):
        with connection_context(connection=connection) as conn:
            ids = conn.execute("select id from main.migration").fetchall()

        if len(ids) > 1:
            raise RuntimeError("There are more than one migration id!")

        return ids[0][0]

    def reset(self):
        """Brings the database down to nothing then recreates it again"""
        self.wipe()
        self.migrate_to_latest()

    def wipe(self):
        """Wipes the database of everything"""
        level = self.get_migration_level()
        if level > 0:
            self.migrate('down', level)

    def migrate_to_latest(self):
        """Update the database to the latest schema from wherever it currently is"""
        level = self.get_migration_level()
        latest = max(int(x.name.split('.')[0]) for x in self.migration_folder.glob('*.up.sql'))
        if level < latest:
            self.migrate('up', latest - level)
