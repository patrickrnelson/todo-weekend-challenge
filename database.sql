CREATE TABLE tasks (
    "id" serial PRIMARY KEY,
    "title" varchar(255) NOT NULL,
    "date_created" DATE DEFAULT CURRENT_TIMESTAMP,
    "complete" boolean DEFAULT FALSE
);

INSERT INTO "tasks" ("title")
VALUES ('Get Dog Food'),
	  ('Buy Flowers for Vday'),
	  ('Meditate');