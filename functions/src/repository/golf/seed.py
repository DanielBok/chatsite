import logging
from datetime import datetime

import pytz

from src.repository.golf.course.models import CourseFilter

__all__ = ['seed_golf_tables']


def seed_golf_tables():
    """Seeds the application with initial data"""
    logging.info("Running data seeding operations")

    _seed_golf_course_table()
    _seed_golf_scores_table()


MANDAI_FILTER = CourseFilter(
    country='Singapore',
    location='Mandai Executive Public Golf Course',
    course='Executive Golf Course'
)

MARINA_BAY_FILTER = CourseFilter(
    country='Singapore',
    location='Marina Bay Golf Course',
    course='Course 1',
)

KEPPEL_CLUB_FILTER = CourseFilter(
    country='Singapore',
    location='Keppel Club',
    course='Sime',
)


def _seed_golf_course_table():
    from src.repository.golf.course.repo import CourseRepository
    import src.repository.golf.course.models as m

    repo = CourseRepository()
    if repo.num_courses() == 0:
        logging.info("\tNo courses in database yet, creating default courses")

        for course, payload in [
            ('Mandai Executive Public Golf Course',
             m.CreateCourse(
                 country=MANDAI_FILTER.country,
                 location=MANDAI_FILTER.location,
                 course=MANDAI_FILTER.course,
                 google_map_url='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6259721477304!2d103.80913869999999!3d1.4007912999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da3c3b81e04209%3A0x99a688cdca67ea90!2sMandai%20Executive%20Public%20Golf%20Course!5e0!3m2!1sen!2sth!4v1697720799088!5m2!1sen!2sth',
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
                 country=MARINA_BAY_FILTER.country,
                 location=MARINA_BAY_FILTER.location,
                 course=MARINA_BAY_FILTER.course,
                 google_map_url='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.802602272368!2d103.87136919999999!3d1.292876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da18547a193767%3A0xc2448b1f729923e!2sMarina%20Bay%20Golf%20Course!5e0!3m2!1sen!2sth!4v1697720940084!5m2!1sen!2sth',
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
                 country=KEPPEL_CLUB_FILTER.country,
                 location=KEPPEL_CLUB_FILTER.location,
                 course=KEPPEL_CLUB_FILTER.course,
                 google_map_url='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.724472594439!2d103.8110618!3d1.3416814999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1be8414207d9%3A0x3c1468c27bb2eba5!2sKeppel%20Club!5e0!3m2!1sen!2sth!4v1697721036135!5m2!1sen!2sth',
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
    from src.repository.main.account.repo import AccountRepository
    from src.repository.golf.course.repo import CourseRepository
    from src.repository.golf.score.repo import ScoreRepository
    import src.repository.golf.score.models as m

    repo = ScoreRepository()
    if len(repo.fetch_scores()) == 0:
        logging.info("\tNo scores in database yet, creating default scores")

        # these are actual scores by Daniel
        dbok_id = AccountRepository.get_account('dbok').id
        pquek_id = AccountRepository.get_account('pquek').id

        # Mandai scores
        mandai_id = CourseRepository.fetch_course(MANDAI_FILTER).id

        for date, scores in [
            (datetime(2023, 9, 14), [4, 6, 5, 5, 7, 4, 4, 3, 4]),
            (datetime(2023, 9, 19), [5, 6, 3, 4, 6, 3, 4, 5, 3]),
            (datetime(2023, 10, 5), [5, 6, 4, 6, 6, 5, 4, 4, 4]),
            (datetime(2023, 10, 10), [4, 6, 4, 4, 5, 5, 4, 4, 3]),
            (datetime(2023, 10, 31), [4, 5, 4, 3, 6, 4, 4, 5, 4]),
            (datetime(2023, 11, 7), [4, 6, 3, 5, 5, 5, 5, 3, 4]),
        ]:
            repo.add_score(m.CreateScore(
                player_id=dbok_id,
                course_id=mandai_id,
                tee=m.GolfTeeEnum.Blue,
                game=m.GameEnum.Front,
                scores=scores,
                datetime=pytz.timezone('Asia/Singapore').localize(date),
            ))
            logging.info(f"\t\tAdded score for player={dbok_id} at course={mandai_id} on date='{date:%Y-%m-%d}'")

        keppel_id = CourseRepository.fetch_course(KEPPEL_CLUB_FILTER).id
        marina_bay_id = CourseRepository.fetch_course(MARINA_BAY_FILTER).id

        for player_id, date, course_id, scores in [
            (dbok_id, datetime(2023, 10, 8), keppel_id, [6, 9, 6, 7, 6, 6, 3, 6, 9, 5, 6, 6, 6, 6, 7, 6, 5, 5]),
            (pquek_id, datetime(2023, 10, 8), keppel_id, [6, 6, 4, 5, 4, 6, 4, 6, 6, 5, 6, 5, 4, 6, 5, 6, 5, 4]),
            (dbok_id, datetime(2023, 11, 12), marina_bay_id, [5, 4, 6, 8, 4, 8, 4, 5, 3, 7, 5, 3, 4, 7, 3, 8, 5, 6]),
            (pquek_id, datetime(2023, 11, 12), marina_bay_id, [6, 4, 6, 7, 4, 7, 6, 5, 4, 5, 6, 5, 4, 5, 4, 7, 6, 6]),
            (dbok_id, datetime(2023, 11, 13), marina_bay_id, [7, 4, 6, 7, 3, 8, 5, 6, 4, 6, 4, 5, 5, 7, 6, 7, 5, 7]),
        ]:
            repo.add_score(m.CreateScore(
                player_id=player_id,
                course_id=course_id,
                tee=m.GolfTeeEnum.White,
                game=m.GameEnum.Full,
                scores=scores,
                datetime=pytz.timezone('Asia/Singapore').localize(date),
            ))
            logging.info(f"\t\tAdded score for player={player_id} at course={keppel_id} on date='{date:%Y-%m-%d}'")


    else:
        logging.info("\tSkipping golf score data seeding")
