from typing import Literal

from psycopg.rows import class_row

import src.repository.course.models as m
from src.database.connector import connection_context, require_connection_pool

__all__ = ['CourseRepository']


@require_connection_pool
class CourseRepository:
    """Repository to handle course information"""

    @staticmethod
    def create_course(course: m.CreateCourse):
        """Creates a course given the CreateCourse command object"""
        with connection_context() as conn:
            with conn.cursor() as cur, conn.transaction():
                course_id, *_ = cur.execute("""
                insert into golf.course (location, course, country, google_map_url, active, par, index)
                values (%(location)s, %(course)s, %(country)s, %(google_map_url)s, %(active)s, %(par)s, %(index)s)
                returning id
                """, course.model_dump(include={
                    'location', 'course', 'country', 'google_map_url', 'active', 'par', 'index'
                })).fetchone()

                cur.executemany("""
                insert into golf.course_tee_info (course_id, tee, distance, distance_metric) 
                values (%(course_id)s, %(tee)s, %(distance)s, %(distance_metric)s)
                """, [{'course_id': course_id} | x.model_dump() for x in course.tee_info])

        return course_id

    @staticmethod
    def countries() -> list[str]:
        """Returns the list of countries"""
        with connection_context() as conn:
            return [c for c, *_ in conn.execute("select country from golf.course")]

    @staticmethod
    def num_courses() -> int:
        """Returns the number of courses"""
        with connection_context() as conn:
            num_courses, *_ = conn.execute("select count(*) from golf.course").fetchone()
            return num_courses

    @staticmethod
    def fetch_courses(country: str | list[str] = None,
                      course_id: int | list[int] = None,
                      status: Literal['active', 'inactive'] = None) -> list[m.Course]:
        """Fetches courses given filters. If no filters specified, retrieves all courses"""
        filters = []
        params = []
        for col, element in [('country', country),
                             ('id', course_id)]:
            if element is not None:
                filters.append(f'C.{col} = any(%s)')
                params.append([element] if isinstance(element, (int, str)) else list(element))

        if status is not None:
            assert status in ('active', 'inactive'), "status must be 'active', 'inactive' or None"
            filters.append("active" if status == 'active' else 'not active')

        if filters:
            where_clause = 'where ' + '\nand '.join(filters)
        else:
            where_clause = ''
        params = None

        with connection_context() as conn:
            with conn.cursor(row_factory=class_row(m.Course.from_dict)) as cur:
                return cur.execute(f"""
select json_build_object(
               'id', C.id,
               'location', location,
               'course', course,
               'country', country,
               'google_map_url', google_map_url,
               'active', active,
               'par', par,
               'index', index,
               'tee_info', (select json_agg(
                                           json_build_object(
                                                   'id', id,
                                                   'tee', tee,
                                                   'distance', distance,
                                                   'distance_metric', distance_metric
                                               ))
                            from golf.course_tee_info T
                            where T.course_id = C.id)
           ) as value
from golf.course C;
{where_clause}
                """, params=params).fetchall()

    @classmethod
    def fetch_course_by_id(cls, course_id: int):
        """Fetches a single course by its ID. If ID does not exist, returns None"""
        courses = cls.fetch_courses(course_id=course_id)
        if len(courses) == 0:
            return None
        else:
            return courses[0]

    @staticmethod
    def course_id_exists(course_id: int):
        """Checks that the given course ID exists"""
        with connection_context() as conn:
            count, *_ = conn.execute("select count(*) from golf.course where id = %s", (course_id,)).fetchone()
            return count == 1

    @staticmethod
    def update_status(course_id: int, active=False):
        """Sets the active/inactive state for the course. Usually used to set courses to inactive (defunct)"""
        with connection_context() as conn:
            conn.execute("update golf.course set active = %(active)s where id = %(id)s",
                         {'id': course_id, 'active': active})
