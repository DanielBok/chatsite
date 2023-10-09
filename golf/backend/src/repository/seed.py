import logging
import os
from datetime import datetime

import pytz

from src.database.connector import require_connection_pool

__all__ = ['seed_application']


@require_connection_pool
def seed_application():
    """Seeds the application with initial data"""
    logging.info("Running data seeding operations")

    _seed_player_table()
    _seed_golf_course_table()
    _seed_golf_scores_table()


def _seed_player_table():
    from src.repository.account.repo import AccountRepository
    import src.repository.account.models as m

    repo = AccountRepository()
    if len(repo.get_accounts()) == 0:
        logging.info("\tNo accounts in database yet, creating default admin account")
        repo.create_account(m.CreateAccount(
            username=os.getenv('APP_FIRST_USER_USERNAME', 'dbok'),
            password=os.getenv('APP_FIRST_USER_PASSWORD', 'password'),
            first_name=os.getenv('APP_FIRST_USER_FIRST_NAME', 'Daniel'),
            last_name=os.getenv('APP_FIRST_USER_LAST_NAME', 'Bok'),
        ))
    else:
        logging.info("\tSkipping player data seeding")


def _seed_golf_course_table():
    from src.repository.course.repo import CourseRepository
    import src.repository.course.models as m

    repo = CourseRepository()
    if repo.num_courses() == 0:
        logging.info("\tNo courses in database yet, creating default courses")

        for course, payload in [
            ('Mandai Executive Public Golf Course',
             m.CreateCourse(
                 country='Singapore',
                 location='Mandai Executive Public Golf Course',
                 course='Executive Golf Course',
                 google_map_url='https://maps.app.goo.gl/HEkJW1P87SPjzpBdA',
                 website='https://www.mandaigolf.com',
                 active=True,
                 par=[3, 4, 3, 3, 4, 3, 3, 3, 3],
                 index=[7, 3, 15, 11, 1, 17, 5, 13, 9],
                 tee_info=[
                     m.CreateCourseTeeInfo(tee=tee,
                                           distance=distance,
                                           distance_metric=m.GolfDistanceMetric.Meter)
                     for tee, distance in [
                         (m.GolfTeeEnum.Black, [175, 250, 150, 150, 330, 130, 165, 110, 175]),
                         (m.GolfTeeEnum.Blue, [160, 250, 130, 142, 300, 93, 154, 105, 128]),
                         (m.GolfTeeEnum.White, [135, 233, 110, 116, 273, 83, 125, 90, 112]),
                         (m.GolfTeeEnum.Red, [88, 215, 90, 95, 232, 69, 115, 77, 98]),
                     ]
                 ]
             )),
            ('Marina Bay Golf Course',
             m.CreateCourse(
                 country='Singapore',
                 location='Marina Bay Golf Course',
                 course='Course 1',
                 google_map_url='https://maps.app.goo.gl/mkjBnY2br2o28S8HA',
                 website='https://www.mbgc.com.sg',
                 active=True,
                 par=[4, 3, 4, 6, 3, 5, 4, 4, 3, 4, 4, 4, 3, 4, 3, 5, 4, 5],
                 index=[7, 15, 5, 9, 13, 11, 3, 1, 17, 4, 8, 16, 12, 2, 10, 6, 18, 4],
                 tee_info=[
                     m.CreateCourseTeeInfo(tee=tee,
                                           distance=distance,
                                           distance_metric=m.GolfDistanceMetric.Meter)
                     for tee, distance in [
                         (m.GolfTeeEnum.Black,
                          [349, 149, 395, 651, 181, 543, 396, 452, 161, 417, 365, 313, 119, 452, 194, 527, 307, 522]),
                         (m.GolfTeeEnum.Blue,
                          [324, 149, 369, 617, 163, 508, 362, 416, 133, 375, 340, 292, 119, 426, 177, 499, 289, 494]),
                         (m.GolfTeeEnum.White,
                          [303, 117, 339, 593, 149, 473, 335, 384, 111, 354, 316, 269, 119, 402, 149, 472, 269, 465]),
                         (m.GolfTeeEnum.Red,
                          [279, 99, 282, 569, 136, 447, 310, 357, 86, 311, 296, 229, 95, 379, 131, 448, 246, 433]),
                     ]
                 ]
             )),
            ('Keppel Club',
             m.CreateCourse(
                 country='Singapore',
                 location='Keppel Club',
                 course='Sime',
                 google_map_url='https://maps.app.goo.gl/tnoDhmTGtCnYExaYA',
                 website='https://www.keppelclub.com.sg',
                 active=True,
                 par=[4, 5, 3, 4, 4, 4, 3, 4, 5, 4, 3, 4, 3, 5, 4, 5, 4, 4],
                 index=[1, 9, 15, 11, 5, 17, 13, 7, 3, 10, 12, 8, 18, 2, 14, 4, 6, 16],
                 tee_info=[
                     m.CreateCourseTeeInfo(tee=tee,
                                           distance=distance,
                                           distance_metric=m.GolfDistanceMetric.Meter)
                     for tee, distance in [
                         (m.GolfTeeEnum.Black,
                          [384, 482, 191, 298, 353, 284, 178, 356, 441, 317, 156, 342, 127, 501, 325, 514, 369, 323]),
                         (m.GolfTeeEnum.Blue,
                          [362, 464, 173, 278, 336, 264, 168, 338, 424, 296, 145, 319, 119, 478, 307, 471, 341, 301]),
                         (m.GolfTeeEnum.White,
                          [338, 443, 147, 246, 327, 240, 148, 327, 398, 276, 134, 292, 105, 448, 271, 461, 315, 274]),
                         (m.GolfTeeEnum.Red,
                          [322, 415, 130, 228, 282, 219, 121, 282, 380, 250, 126, 269, 95, 420, 240, 434, 282, 254]),
                     ]
                 ]
             )
             )

        ]:
            logging.info(f"\t\tCreating {course}")
            repo.create_course(payload)
    else:
        logging.info("\tSkipping course data seeding")


def _seed_golf_scores_table():
    from src.repository.account.repo import AccountRepository
    from src.repository.course.models import CourseFilter
    from src.repository.course.repo import CourseRepository
    from src.repository.score.repo import ScoreRepository
    import src.repository.score.models as m

    repo = ScoreRepository()
    if len(repo.fetch_scores()) == 0:
        logging.info("\tNo scores in database yet, creating default scores")

        # these are actual scores by Daniel
        account_id = AccountRepository.get_account('dbok').id
        mandai_id = CourseRepository.fetch_course(CourseFilter(
            country='Singapore',
            location='Mandai Executive Public Golf Course',
            course='Executive Golf Course'
        )).id

        for date, scores in [
            (datetime(2023, 9, 14), [4, 6, 5, 5, 7, 4, 4, 3, 4]),
            (datetime(2023, 9, 19), [5, 6, 3, 4, 6, 3, 4, 5, 3]),
        ]:
            repo.add_score(m.CreateScore(
                player_id=account_id,
                course_id=mandai_id,
                tee='Blue',
                holes='Front 9',
                scores=scores,
                datetime=pytz.timezone('Asia/Singapore').localize(date),
            ))
    else:
        logging.info("\tSkipping golf score data seeding")
