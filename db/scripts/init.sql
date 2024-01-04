CREATE DATABASE IF NOT EXISTS doclib ;

USE doclib ;

CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL ,
    role_id INT NOT NULL
) ;

CREATE TABLE IF NOT EXISTS favorites(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL ,
    article_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
) ;

CREATE TABLE IF NOT EXISTS tokens_blacklist(
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(512) NOT NULL
) ;

CREATE TABLE IF NOT EXISTS temp_users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    code INT NOT NULL, 
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ;

INSERT INTO users (id, email, password , role_id) 
VALUES (1, 'lo_cherguelaine@esi.dz', '$2b$12$16qAptoWjhP6Y0fc1ITnGeJOG0UQLrjx1xCG4W/hoBcEP6NwCEyVC' , 2);
-- role2 is for admins