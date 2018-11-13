SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE `chop_list_db`.`credentials_table`;

TRUNCATE `chop_list_db`.`lists2users_table`;

TRUNCATE `chop_list_db`.`lists_table`;

TRUNCATE `chop_list_db`.`users_table`;

SET FOREIGN_KEY_CHECKS = 1;

/* JOHN DOE */

INSERT INTO `chop_list_db`.`users_table` (`first_name`, `last_name`, `email`) VALUES ('John', 'Doe', 'jdoe@hotmail.com');

INSERT INTO `chop_list_db`.`credentials_table` (`primary`, `type`, `username`, `password`, `user_id`) VALUES (TRUE, 'USER/PASSWORD', 'jdoe', '12345678', '1');

INSERT INTO `chop_list_db`.`lists_table` (`name`) VALUES ('Mercadona');

INSERT INTO `chop_list_db`.`lists2users_table` (`role`, `user_id`, `list_id`) VALUES ('owner', 1, 1);
    
INSERT INTO `chop_list_db`.`categories_table` (`name`, `list_id`) VALUES 
	('Carniceria', '1'),
    ('Polleria', '1'),
    ('Limpieza', '1'),
    ('Desayuno', '1'),
    ('Fruta y Verdura', '1'),
    ('Higiene personal', '1'),
    ('Bebidas', '1');

INSERT INTO `chop_list_db`.`items_table` (`name`, `category_id`) VALUES 
	('Lomo adobado', '1'),
    ('Filetes de pechuga de pollo', '2'),
    ('Fregasuelos', '3'),
    ('Fregona', '3'),
    ('Quitagrasas', '3'),
	('Leche', '4'),
	('Galletas','4'),
    ('Manzanas', '5'),
    ('Naranjas', '5'),
	('Puerros', '5'),
    ('Tomates', '5'),
    ('Champú', '6');
    
    
INSERT INTO `chop_list_db`.`users_table` (`first_name`, `last_name`, `email`) VALUES ('Jane', 'Fonda', 'jfonda@hotmail.com');

INSERT INTO `chop_list_db`.`lists2users_table` (`role`, `user_id`, `list_id`) VALUES ('invitee', 2, 1);

INSERT INTO `chop_list_db`.`credentials_table` (`primary`, `type`, `username`, `password`, `user_id`) VALUES (TRUE, 'USER/PASSWORD', 'jfonda', '12345678', '2');

INSERT INTO `chop_list_db`.`users_table` (`first_name`, `last_name`, `email`) VALUES ('Alan', 'Parsons', 'aparsons@hotmail.com');

INSERT INTO `chop_list_db`.`credentials_table` (`primary`, `type`, `username`, `password`, `user_id`) VALUES (TRUE, 'USER/PASSWORD', 'aparsons', '12345678', '3');

INSERT INTO `chop_list_db`.`users_table` (`first_name`, `last_name`, `email`) VALUES ('Michael', 'Moore', 'mmoore@hotmail.com');

INSERT INTO `chop_list_db`.`credentials_table` (`primary`, `type`, `username`, `password`, `user_id`) VALUES (TRUE, 'USER/PASSWORD', 'mmoore', '12345678', '4');


