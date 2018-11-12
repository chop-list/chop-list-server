DROP DATABASE IF EXISTS chop_list_db;

CREATE DATABASE chop_list_db;

USE chop_list_db;

CREATE TABLE users_table (
  id INT UNSIGNED AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NULL,
  email VARCHAR(128) NULL,
  last_connection DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);


CREATE TABLE `credentials_table` (
  `id` INT UNSIGNED AUTO_INCREMENT,
  `credential_type` VARCHAR(45) NOT NULL,
  `identifier` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `userid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  INDEX `credentials2user_idx` (`userid` ASC) VISIBLE,
  CONSTRAINT `credentials2user`
  FOREIGN KEY (`userid`)
  REFERENCES `chop_list_db`.`users_table` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT);
