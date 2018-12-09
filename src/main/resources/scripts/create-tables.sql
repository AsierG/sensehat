drop schema IF exists raspberry cascade;
create schema raspberry;
set schema 'raspberry';

create sequence id_measure_seq start 1 increment 1;
create table measure (
        id_countries int8 not null,
        date timestamp not null,
        humidity float8 not null,
        pressure float8 not null,
        temperature float8 not null,
        temperature_from_cpu float8,
        temperature_from_humidity float8,
        temperature_from_pressure float8,
        year_month_day int4 not null,
        primary key (id_countries)
    );
create index IDX_DATE on measure (date);