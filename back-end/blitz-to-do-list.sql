DROP SCHEMA IF EXISTS blitz_toDoList;
CREATE SCHEMA IF NOT EXISTS blitz_toDoList;

USE blitz_toDoList;

CREATE TABLE user (
  user_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL, 
  admin BOOLEAN NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(320) NOT NULL,
  password VARCHAR(30) NOT NULL
);

CREATE TABLE task (
  task_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  task_content VARCHAR(500) NOT NULL,
  status VARCHAR(15) NOT NULL,
  user_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)
    REFERENCES user (user_id)
    ON DELETE CASCADE
);

SET SQL_SAFE_UPDATES = 0;

INSERT INTO
  user (admin, first_name, last_name, email, password)
VALUES
  (true, 'Thiago', 'Martins', 'thiago_martins@gmail.com', 'thiago12345'),
  (false, 'João', 'Pedro', 'joao@gmail.com', 'joao123');

INSERT INTO
  task (task_content, status, user_id, created_at, updated_at)
VALUES
  ('Fazer relatório trimestral', 'pendente', 1, NOW(), NOW()),
  ('Terminar Projeto', 'pendente', 2, NOW(), NOW());