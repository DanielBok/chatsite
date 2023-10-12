from fastapi import APIRouter, Depends, HTTPException, status

import src.repository.course.models as m
import src.routers.course.requests as req
import src.routers.course.responses as resp
from src.repository.course.repo import CourseRepository
from src.services.authentication import is_admin

router = APIRouter(prefix="/course", tags=["Course Management"])


@router.get('/filters', response_model=resp.CourseFilterOptions)
def get_course_filter_options(repo: CourseRepository = Depends()):
    return repo.fetch_filter_options()


@router.post('/', response_model=list[m.Course])
def get_courses(payload: req.GetCourse, repo: CourseRepository = Depends()):
    """Gets the specified courses"""
    return repo.fetch_courses(course_id=payload.course_id,
                              country=payload.country,
                              active=payload.active)


@router.post('/manage', response_model=m.Course, dependencies=[Depends(is_admin)])
def create_course(payload: m.CreateCourse, repo: CourseRepository = Depends()):
    """Registers a course"""
    course_id = repo.create_course(payload)
    return repo.fetch_course_by_id(course_id=course_id)


@router.put('/manage', response_model=m.Course, dependencies=[Depends(is_admin)])
def update_course_status(payload: m.Course, repo: CourseRepository = Depends()):
    if repo.fetch_course_by_id(course_id=payload.id) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Course ID <{payload.id}> does not exist")

    repo.update_course(payload)
    return repo.fetch_course_by_id(payload.id)


@router.post('/manage/{course_id}/tee-info', dependencies=[Depends(is_admin)], response_model=m.CourseTeeInfo)
def add_course_tee_info(course_id: int, tee_info: m.CreateCourseTeeInfo, repo: CourseRepository = Depends()):
    tee_id = repo.add_tee_info(course_id, tee_info)
    return m.CourseTeeInfo(**tee_info.model_dump(), id=tee_id)


@router.delete('/manage/{course_id}/tee-info/{tee_id}', dependencies=[Depends(is_admin)])
def delete_course_tee_info(course_id: int, tee_id: int, repo: CourseRepository = Depends()):
    repo.delete_tee_info_by_id(course_id, tee_id)
