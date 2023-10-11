from typing import Optional

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
                insert into golf.course (location, course, country, google_map_url, website, active, par, index)
                values (%(location)s, %(course)s, %(country)s, %(google_map_url)s, %(website)s, %(active)s, %(par)s, %(index)s)
                returning id
                """, course.model_dump(include={
                    'location', 'course', 'country', 'google_map_url', 'website', 'active', 'par', 'index'
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

    @classmethod
    def fetch_courses(cls,
                      country: str | list[str] = None,
                      course_id: int | list[int] = None,
                      active: bool = None, ) -> list[m.Course]:
        """Fetches courses given filters. If no filters specified, retrieves all courses"""
        filters = []
        params = []
        for col, element in [('country', country),
                             ('id', course_id)]:
            if element is not None:
                filters.append(f'C.{col} = any(%s)')
                params.append([element] if isinstance(element, (int, str)) else list(element))

        if isinstance(active, bool):
            filters.append("active" if active else 'not active')

        if filters:
            where_clause = 'where ' + '\nand '.join(filters)
        else:
            where_clause = ''
            params = None

        with connection_context() as conn, conn.cursor(row_factory=class_row(m.Course.from_dict)) as cur:
            return cur.execute(cls._generate_fetch_clause_sql(where_clause), params=params).fetchall()

    @staticmethod
    def _generate_fetch_clause_sql(where_clause: str):
        return f"""
select json_build_object(
               'id', C.id,
               'location', location,
               'course', course,
               'country', country,
               'google_map_url', google_map_url,
               'website', website,
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
from golf.course C
{where_clause};
        """

    @classmethod
    def fetch_course_by_id(cls, course_id: int):
        """Fetches a single course by its ID. If ID does not exist, returns None"""
        courses = cls.fetch_courses(course_id=course_id)
        if len(courses) == 0:
            return None
        else:
            return courses[0]

    @classmethod
    def fetch_course(cls, identifiers: m.CourseFilter) -> Optional[m.Course]:
        params = identifiers.model_dump()
        where_clause = "where " + ' and '.join(f"{k} = %({k})s" for k in params.keys())

        with connection_context() as conn, conn.cursor(row_factory=class_row(m.Course.from_dict)) as cur:
            return cur.execute(cls._generate_fetch_clause_sql(where_clause), params=params).fetchone()

    @classmethod
    def update_course(cls, course: m.Course):
        """Updates the course information"""
        with connection_context() as conn, conn.transaction(), conn.cursor() as cur:
            cur.execute("""
update golf.course
set location = %(location)s,
    course = %(course)s,
    country = %(country)s,
    google_map_url = %(google_map_url)s,
    website = %(website)s,
    active = %(active)s,
    par = %(par)s,
    index = %(index)s
where id = %(id)s;
            """, course.model_dump(include={'location',
                                            'course',
                                            'country',
                                            'google_map_url',
                                            'website',
                                            'active',
                                            'par',
                                            'index',
                                            'id'}))

            cur.executemany("""
update golf.course_tee_info
set tee = %(tee)s,
    distance = %(distance)s,
    distance_metric = %(distance_metric)s
where id = %(id)s;
            """, [x.model_dump(include={'tee', 'distance', 'distance_metric' 'id'}) for x in course.tee_info])

    @staticmethod
    def add_tee_info(course_id: int, tee_info: m.CreateCourseTeeInfo):
        with connection_context() as conn:
            tee_id, *_ = conn.execute("""
insert into golf.course_tee_info (course_id, tee, distance, distance_metric)
values (%(course_id)s, %(tee)s, %(distance)s, %(distance_metric)s)
returning id
            """, {'course_id': course_id, **tee_info.model_dump()}).fetchone()

            return tee_id

    @staticmethod
    def delete_tee_info_by_id(course_id: int, tee_id: int):
        with connection_context() as conn:
            conn.execute("delete from golf.course_tee_info where course_id = %s and id = %s",
                         (course_id, tee_id))

    @staticmethod
    def fetch_filter_options():
        with connection_context() as conn:
            countries = [c for c, *_ in conn.execute("select distinct country from golf.course order by country")]

        return {'countries': countries}
