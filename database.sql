CREATE TABLE tasks (
    "id" serial PRIMARY KEY,
    "title" varchar(255) NOT NULL,
    "date_created" DATE,
    "complete" boolean NOT NULL
);

INSERT INTO "tasks" ("title", "date_created", "complete")
VALUES ('Get Dog Food', '02-10-2021', FALSE),
	('Buy Flowers for Vday', '02-08-2021', TRUE),
	('Meditate', '02-05-2021', FALSE);