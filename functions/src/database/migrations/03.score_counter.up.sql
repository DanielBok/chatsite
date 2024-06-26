create schema score_counter;

create table score_counter.game
(
    id            serial primary key,
    name          varchar(300) not null,
    creation_time timestamp    not null                               default current_timestamp,
    max_players   int check ( max_players >= 1 and max_players <= 20) default 4,
    end_time      timestamp    not null                               default current_timestamp + interval '6 hours'
);

create unique index uq_sc_game_name on score_counter.game (UPPER(name));

create table score_counter.score
(
    id      serial       not null,
    game_id int          not null,
    name    varchar(100) not null, -- player name
    score   float        not null default 0,
    constraint fk_game foreign key (game_id) references score_counter.game (id) on delete cascade
);

create index ix_sc_score_game_id on score_counter.score (game_id);
create unique index uq_sc_score_game_id_name on score_counter.score (game_id, upper(name));