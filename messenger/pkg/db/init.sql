/* --- CREATE EXTENSIONS --- */

CREATE EXTENSION IF NOT EXISTS citext;

/* --- CREATE TABLES --- */

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email citext UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    subscribed BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS trials (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) UNIQUE NOT NULL,
    texts_remaining SMALLINT NOT NULL
);

/* --- INSERT VALUES --- */

INSERT INTO users(id, email, password, phone, subscribed) VALUES
    (
        DEFAULT,
        'drivas-val@gmail.com',
        'sh34ph3lp',
        '+12057253709',
        TRUE
    ),
    (
        DEFAULT,
        'jsmith@gmail.com',
        'jsm17h11',
        '+12059847829',
        FALSE
    );

INSERT INTO trials(id, phone, texts_remaining) VALUES
    (
        DEFAULT,
        '+12057253709',
        8
    );
