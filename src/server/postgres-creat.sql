CREATE TABLE users (
userid SERIAL PRIMARY KEY,
username VARCHAR,
password VARCHAR,
home_location VARCHAR DEFAULT NULL,
email VARCHAR DEFAULT NULL
);

CREATE TABLE events (
eventid VARCHAR PRIMARY KEY,
title VARCHAR,
category VARCHAR(50),
labels VARCHAR,
description VARCHAR,
predicted_attendance INTEGER,
latitude NUMERIC(11, 8),
longitude NUMERIC(11, 8),
start_time VARCHAR,
private VARCHAR(50),
rank INTEGER,
local_rank INTEGER
);


-- JOIN TABLES
CREATE TABLE user_events(
 user_event_id SERIAL PRIMARY KEY,
 userid INTEGER,
 eventid VARCHAR
)