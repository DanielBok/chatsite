from fastapi import Depends, APIRouter

import src.repository.golf.score.models as m
import src.routers.golf.performance.responses as resp
from src.repository.main.account.models import Account
from src.repository.golf.course.repo import CourseRepository
from src.repository.golf.score.repo import ScoreRepository
from src.services.authentication import auth_svc

router = APIRouter(prefix="/golf/performance", tags=["Golf Performance", "Scores", "Course Performance"])


@router.get("/", response_model=list[resp.Score])
def get_score(acc: Account = Depends(auth_svc),
              score_repo: ScoreRepository = Depends(),
              course_repo: CourseRepository = Depends()):
    scores = score_repo.fetch_scores(player_id=acc.id)
    courses: dict[int, resp.Course] = {
        c.id: c for c in
        course_repo.fetch_courses(course_id=[s.course_id for s in scores])
    }

    return [resp.Score.from_components(score, courses[score.course_id]) for score in scores]


@router.post("/", response_model=resp.Score)
def post_score(new_score: m.CreateScore,
               acc: Account = Depends(),
               score_repo: ScoreRepository = Depends(),
               course_repo: CourseRepository = Depends()):
    new_score.player_id = acc.id
    score = score_repo.add_score(new_score)
    course = course_repo.fetch_course_by_id(score.course_id)

    return resp.Score.from_components(score, course)
