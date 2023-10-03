from psycopg.rows import class_row

import src.repository.score.models as m
from src.database.connector import connection_context, require_connection_pool

__all__ = ['ScoreRepository']


@require_connection_pool
class ScoreRepository:
    @classmethod
    def add_score(cls, score: m.CreateScore):
        with connection_context() as conn:
            score_id, *_ = conn.execute("""
insert into golf.score_card (player_id, course_id, tee, scores, holes, datetime)
values (%(player_id)s, %(course_id)s, %(tee)s, %(scores)s, %(holes)s, %(datetime)s)
returning id;""", score.model_dump()).fetchone()

        return cls.fetch_score_by_id(score_id)

    @staticmethod
    def fetch_score_by_id(score_id: int):
        with connection_context() as conn, conn.cursor(row_factory=class_row(m.Score)) as cur:
            return cur.execute("""
select id, player_id, course_id, tee, scores, holes, datetime
from golf.score_card
where id = %s;""", (score_id,)).fetchone()

    @classmethod
    def fetch_scores(cls, *, player_id: int | list[int] = None, course_id: int | list[int] = None):
        filters = []
        params = []

        for col, element in [('player_id', player_id),
                             ('course_id', course_id)]:
            if element is not None:
                filters.append(f"{col} = any(%s)")
                params.append([element] if isinstance(element, int) else element)

        if filters:
            where_clause = 'where ' + '\nand'.join(filters)
        else:
            where_clause = ''
            params = None

        with connection_context() as conn, conn.cursor(row_factory=class_row(m.Score)) as cur:
            return cur.execute(f"""
select id, player_id, course_id, tee, scores, holes, datetime
from golf.score_card
{where_clause};""", params=params).fetchall()
