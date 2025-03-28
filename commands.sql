CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Seungwon Jang', 'https://yellokat.github.io/', 'Matrix Factorization', 10);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Alan Turing', 'https://google.com', 'Turing Machines', 5);