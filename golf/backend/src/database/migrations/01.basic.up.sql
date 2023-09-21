create schema golf;

create table golf.player
(
    id         serial primary key,
    username   varchar(50) not null,
    first_name varchar(50) not null,
    last_name  varchar(50) not null,
    password   text        not null,
    is_admin   bool default false
);

create unique index uq_golf_player_idx on golf.player (lower(username));

create type golf.holes as enum ('Front 9', 'Back 9', '18 Holes');
create type golf.tee as enum ('Green', 'Red', 'Yellow', 'White', 'Blue', 'Black', 'Silver', 'Golf');
create type golf.distance_metric as enum ('meter', 'yard');

create table golf.course
(
    id             serial primary key,
    location       varchar(300) not null,
    course         varchar(300) not null,
    country        varchar(300) not null,
    google_map_url text         not null,
    active         boolean default true,
    par            smallint[18],
    index          smallint[18],
    constraint uq_place unique (location, course, country)
);

create table golf.course_tee_info
(
    id              serial primary key,
    course_id       int      not null,
    tee             golf.tee not null,
    distance        smallint[18],
    distance_metric golf.distance_metric,
    constraint fk_course foreign key (course_id) references golf.course (id) on delete cascade
);

create table golf.score_card
(
    id        serial primary key,
    player_id int          not null,
    course_id int          not null,
    tee       golf.tee     not null,
    scores    smallint[18] not null,
    holes     golf.holes   not null,
    constraint fk_player foreign key (player_id) references golf.player (id) on delete cascade,
    constraint fk_course foreign key (course_id) references golf.course (id) on delete cascade
);
