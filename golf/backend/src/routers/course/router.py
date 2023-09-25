from fastapi import APIRouter, Depends, HTTPException, status

import src.repository.course.models as m
import src.routers.course.requests as req
from src.repository.course.repo import CourseRepository
from src.services.authentication import is_admin

router = APIRouter(prefix="/course", tags=["Course Management"])


@router.post('/', response_model=list[m.Course])
def get_courses(payload: req.GetCourse, repo: CourseRepository = Depends()):
    """Gets the specified courses"""
    return repo.fetch_courses(course_id=payload.course_id,
                              country=payload.country,
                              status=payload.status)


@router.post('/', response_model=m.Course, dependencies=[Depends(is_admin)])
def create_course(payload: m.CreateCourse, repo: CourseRepository = Depends()):
    """Registers a course"""
    course_id = repo.create_course(payload)
    return repo.fetch_course_by_id(course_id=course_id)


@router.put('/status', response_model=m.Course, dependencies=[Depends(is_admin)])
def update_course_status(payload: req.UpdateStatus, repo: CourseRepository = Depends()):
    if repo.course_id_exists(course_id=payload.course_id):
        repo.update_status(payload.course_id, active=payload.active)
        return repo.fetch_course_by_id(payload.course_id)
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Course ID <{payload.course_id}> does not exist")
