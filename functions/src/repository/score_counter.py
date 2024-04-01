from psycopg.rows import class_row
from pydantic import PositiveInt

from src.models.score_counter import dat, req, rsp
from src.database.connector import connection_context, cursor_context


class ScoreCounterRepo:
    @staticmethod
    def get_current_game(game_id: int):
        with cursor_context(row_factory=class_row(rsp.CreateGameResponse)) as cur:
            return cur.execute("""
            select id, name, max_players, creation_time 
            from score_counter.game 
            where id = %(id)s
              and end_time > current_timestamp
            """, {'id': game_id}).fetchone()

    @staticmethod
    def create_game(payload: req.CreateGameRequest) -> tuple[rsp.CreateGameResponse | None, None | str]:
        with connection_context() as conn:
            name = payload.name.strip()

            is_existing_game = conn.execute("""
            select count(*) from 
            score_counter.game
            where end_time > current_timestamp
              and upper(name) = %(name)s
            """, {'name': name.upper()}).fetchone()[0] > 0

            if is_existing_game:
                return None, "Game already exists"

            with cursor_context(row_factory=class_row(rsp.CreateGameResponse), connection=conn) as cur:
                details = cur.execute("""
                insert into score_counter.game (name, max_players, end_time)
                values (%(name)s, %(max_players)s, current_timestamp + interval '6 hours')
                returning id, name, max_players, creation_time
                """, {"name": name, 'max_players': payload.max_players}).fetchone()

                return details, None

    @staticmethod
    def join_game(game_id: PositiveInt, payload: req.JoinGameRequest) -> str | None:
        with connection_context() as conn:
            players: set[str] = {
                x.upper()
                for x in conn.execute("select name from score_counter.score where game_id = %s", (game_id,))
            }
            max_players, *_ = conn.execute("select count(*) from score_counter.score where game_id = %s",
                                           (game_id,)).fetchone()

            if payload.name.upper in players:
                return None  # player exists
            elif len(players) == max_players:
                return "Max player reached, cannot join game"
            else:
                # add player
                conn.execute("""
                insert into score_counter.score (game_id, name, score)
                values (%(game_id)s, %(name)s, %(score)s)
                on conflict (game_id, name)
                    -- do nothing when player is already in
                    do nothing 
                """, {'game_id': game_id} | payload.model_dump())

    @staticmethod
    def end_game(game_id: int):
        with connection_context() as conn:
            conn.execute("""
            update score_counter.game
             set end_time = current_timestamp
            where id = %(game_id)s
            """, {'game_id': game_id})

    @staticmethod
    def get_scores(game_id: int) -> list[rsp.PlayerScore]:
        with cursor_context(row_factory=class_row(rsp.PlayerScore)) as cur:
            return cur.execute("""
            select id, name, score 
            from score_counter.score
            where game_id = %s
            """, (game_id,)).fetchall()

    @classmethod
    def update_scores(cls, game_id: int, scores: list[dat.Score]):
        with cursor_context() as cur:
            game_exists = cur.execute("""select 1
            from score_counter.game
            where id = %(game_id)s
              and game.end_time > current_timestamp
            """, {'game_id': game_id})

            if not game_exists:
                return None, f"Game (id={game_id}) does not exist"

            # update score
            cur.executemany("""
            update score_counter.score
            set score = %(score)s
            where id = %(id)s
            """, [s.model_dump() for s in scores])

            # update end time
            cur.execute("""
            update score_counter.game
            set end_time = current_timestamp + interval '6 hours'
            where id = %(game_id)s
            """, {"game_id": game_id})

        return cls.get_scores(game_id), None
