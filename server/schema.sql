CREATE DATABASE chat;

use chat;

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  name VARCHAR(50),
  createdAt DATETIME,
  updatedAt DATETIME,

  PRIMARY KEY(id)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT,
  user_id INT,
  roomname VARCHAR(30),
  message VARCHAR(150),
  createdAt DATETIME,
  updatedAt DATETIME,

  PRIMARY KEY(id),
  FOREIGN KEY(user_id)
    REFERENCES users(id)
);