from psycopg.rows import class_row
from pydantic import PositiveInt

import src.repository.score_counter.models as m
from src.database.connector import connection_context, cursor_context
from src.routers.score_counter.response import CreateGameResponse


class ScoreCounterRepo:
    @staticmethod
    def get_current_game(game_id: int):
        with cursor_context(row_factory=class_row(CreateGameResponse)) as cur:
            return cur.execute("""
            select id, name, max_players, creation_time 
            from score_counter.game 
            where id = %(id)s
              and end_time is null
            """, {'id': game_id}).fetchone()

    @staticmethod
    def create_game(name: str, max_players: PositiveInt) -> tuple[CreateGameResponse | None, str | None]:
        with connection_context() as conn:
            name = name.strip()

            is_existing_game = conn.execute("""
            select count(*) from 
            score_counter.game
            where end_time IS NULL
              and upper(name) = %(name)s
            """, {'name': name.upper()}).fetchone()[0] > 0

            if is_existing_game:
                return None, "Game already exists"

            with cursor_context(row_factory=class_row(CreateGameResponse), connection=conn) as cur:
                details = cur.execute("""
                insert into score_counter.game (name, max_players)
                values (%(name)s, %(max_players)s)
                returning id, name, max_players, creation_time
                """, {"name": name, 'max_players': max_players}).fetchone()

                return details, None

    @staticmethod
    def join_game(game_id: int, player: m.Player, score: float) -> str | None:
        with connection_context() as conn:
            players: set[str] = set(conn.execute("select uuid from score_counter.score where game_id = %s", (game_id,))
                                    .fetchall())
            max_players, *_ = conn.execute("select count(*) from score_counter.score where game_id = %s",
                                           (game_id,)).fetchone()

            if len(players) == max_players and player.uuid not in players:
                return "Max player reached, cannot join game"

            conn.execute("""
            insert into score_counter.score (game_id, name, uuid, score)
            values (%(game_id)s, %(name)s, %(uuid)s, %(score)s)
            on conflict (game_id, uuid)
                -- update happens on player re-joining game
                do update 
                    set name = %(name)s;
            
            """, {'game_id': game_id, 'name': player.name, 'uuid': player.uuid, 'score': score})

    @staticmethod
    def end_game(game_id: int):
        with connection_context() as conn:
            conn.execute("""
            update score_counter.game
             set end_time = current_timestamp
            where id = %(game_id)s
            """, {'game_id': game_id})

    @staticmethod
    def get_scores(room_id: int) -> list[m.PlayerScore]:
        with cursor_context(row_factory=class_row(m.PlayerScore)) as cur:
            return cur.execute("""
            select id, name, uuid, score 
            from score_counter.score
            where game_id = %s
            """, (room_id,)).fetchall()

    @staticmethod
    def update_scores(scores: list[m.Score]):
        with cursor_context() as cur:
            cur.executemany("""
            update score_counter.score
            set score = %(score)s
            where id = %(id)s
            """, [s.model_dump() for s in scores])
