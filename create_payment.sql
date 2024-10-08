drop schema if exists ccca cascade;

create schema ccca;

create table ccca.transaction (
	transaction_id uuid primary key,
	ride_id uuid,
	amount numeric,
	date timestamp,
	status text
);
