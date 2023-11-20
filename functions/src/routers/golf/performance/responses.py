from pydantic import BaseModel

import src.repository.golf.score.models as m
from src.repository.golf.course.models import Course, GolfDistanceMetric

__all__ = ['Score']


class ScoreDetail(BaseModel):
    hole: int
    par: int
    index: int
    distance: int
    score: int


class Score(BaseModel):
    id: int
    tee: m.GolfTeeEnum
    game: m.GameEnum
    datetime: m.AwareDatetime
    metric: GolfDistanceMetric
    scores: list[ScoreDetail]

    @classmethod
    def from_components(cls, score: m.Score, course: Course):
        par = course.par
        index = course.index

        for tee_info in course.tee_info:
            if tee_info.tee == score.tee:
                metric = tee_info.distance_metric
                distances = tee_info.distance
                break
        else:
            raise ValueError(f"No <{score.tee}> tee information for course id={course.id}")

        start = 1
        match score.game:
            case m.GameEnum.Front:
                par = par[:9]
                index = index[:9]
                distances = distances[:9]

            case m.GameEnum.Back:
                par = par[9:]
                index = index[9:]
                distances = distances[9:]
                start = 10

        if not (len(par) == len(index) == len(distances) == len(score.scores)):
            raise ValueError(f"Issue with score (id={score.id})")

        return {
            'id': score.id,
            'tee': score.tee,
            'game': score.game,
            'datetime': score.datetime,
            'scores': [
                {'hole': start + x, 'par': p, 'index': i, 'distance': d, 'score': s}
                for x, (p, i, d, s) in enumerate(zip(par, index, distances, score.scores))
            ],
            'metric': metric,
        }
