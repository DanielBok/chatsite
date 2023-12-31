create schema main;

create table main.migration
(
    id    serial primary key,
    level int not null
);

insert into main.migration (level)
values (1);

create table main.user
(
    id         serial primary key,
    username   varchar(50)  not null,
    name       varchar(300) not null,
    password   text         not null,
    is_admin   bool default false,
    image_path text
);

create unique index uq_main_user_idx on main.user (lower(username));
