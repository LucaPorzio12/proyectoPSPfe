CREATE DATABASE gamesDAMBdb;
use gamesDAMBdb;
CREATE TABLE games(
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(255),
    subtitle varchar(255),
    description varchar(255),
    image varchar(255),
    favorite boolean,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);