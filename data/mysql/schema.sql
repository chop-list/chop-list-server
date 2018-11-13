DROP DATABASE IF EXISTS chop_list_db;

CREATE DATABASE chop_list_db;

USE chop_list_db;

CREATE TABLE users_table (
  id INT UNSIGNED AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NULL,
  email VARCHAR(128) NULL,
  last_connection DATETIME NULL,
  creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);


CREATE TABLE `credentials_table` (
  `id` INT UNSIGNED AUTO_INCREMENT,
  `primary` BOOLEAN DEFAULT FALSE,
  `type` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  INDEX `credentials2user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `credentials_user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `chop_list_db`.`users_table` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT
);

CREATE TABLE `lists_table` (
  `id` INT UNSIGNED AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);
  
CREATE TABLE `lists2users_table` (
  `role` VARCHAR(45),
  `user_id` INT UNSIGNED NOT NULL,
  `list_id` INT UNSIGNED NOT NULL,
  INDEX `user_idx` (`user_id` ASC) VISIBLE,
  INDEX `list_id_idx` (`list_id` ASC) VISIBLE,
  CONSTRAINT `lists2users_user_id`
	  FOREIGN KEY (`user_id`)
	  REFERENCES `chop_list_db`.`users_table` (`id`)
	  ON DELETE RESTRICT
	  ON UPDATE RESTRICT,
  CONSTRAINT `lists2users_ist_id`
	  FOREIGN KEY (`list_id`)
	  REFERENCES `chop_list_db`.`lists_table` (`id`)
	  ON DELETE RESTRICT
	  ON UPDATE RESTRICT
);

CREATE TABLE `categories_table` (
  `id` INT UNSIGNED AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `list_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  INDEX `category2list_idx` (`list_id` ASC) VISIBLE,
  CONSTRAINT `categories_list_id`
	  FOREIGN KEY (`list_id`)
	  REFERENCES `chop_list_db`.`lists_table` (`id`)
	  ON DELETE RESTRICT
	  ON UPDATE RESTRICT
);

CREATE TABLE `items_table` (
  `id` INT UNSIGNED AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `checked` BOOLEAN NOT NULL DEFAULT FALSE,
  `category_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  INDEX `category_id_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `items_category_id`
	  FOREIGN KEY (`category_id`)
	  REFERENCES `chop_list_db`.`categories_table` (`id`)
	  ON DELETE RESTRICT
	  ON UPDATE RESTRICT
);
