-- SQLite


--DROP TABLE users;

CREATE TABLE users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name TEXT NOT NULL,
   email TEXT NOT NULL UNIQUE,
   status INTEGER NULL DEFAULT 1,
   createdAt TIMESTAMP DEFAULT NULL,
   updatedAt TIMESTAMP DEFAULT NULL
);

-- SQLite
INSERT INTO users (name, email, status)
VALUES ('Fernando', 'fernando@test.com', 1);
-- SQLite
INSERT INTO users (name, email, status)
VALUES ('Hernando', 'hernando@test.com', 1);
-- SQLite
INSERT INTO users (name, email, status)
VALUES ('Eduardo', 'eduardo@test.com', 0);

select * from users;
