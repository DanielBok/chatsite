import logging
import os

from src.database.connector import require_connection_pool

__all__ = ['seed_application']


@require_connection_pool
def seed_application():
    """Seeds the application with initial data"""
    logging.info("Running data seeding operations")

    _seed_player_table()
    _seed_golf_course_table()


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
        ]:
            logging.info(f"\t\tCreating {course}")
            repo.create_course(payload)
