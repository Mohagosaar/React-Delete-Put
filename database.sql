CREATE TABLE countries (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	continent VARCHAR(100) NOT NULL
);

INSERT INTO countries (name, continent) VALUES
('Vatican City', 'Europe'), 
('Monaco', 'Europe'), 
('Nauru', 'Australia'),
('Tuvalu', 'Australia'),
('San Marino', 'Europe');

SELECT * FROM "countries" ORDER BY id;

ALTER TABLE "countries" ADD "visited" BOOLEAN DEFAULT false;