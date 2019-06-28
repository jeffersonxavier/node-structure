CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `number` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `enabled` TINYINT(2) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

INSERT INTO `users` (`name`, `email`, `password`, `enabled`, `number`) VALUES ('Administrador', 'admin@email.com', '$2b$10$c6EE/bqPs.w6RMdNopgOGuAHwoXeycB5hu16EFrVyy4YcM37ausn2', '1', '00000000000');

CREATE TABLE `roles` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
);

INSERT INTO `roles` (`name`) VALUES ('ROLE_ADMIN');
INSERT INTO `roles` (`name`) VALUES ('ROLE_USER');

CREATE TABLE `users_roles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `role_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_to_users_roles_idx` (`user_id` ASC),
  INDEX `fk_roles_to_users_roles_idx` (`role_name` ASC),
  CONSTRAINT `fk_users_to_users_roles`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_roles_to_users_roles`
    FOREIGN KEY (`role_name`)
    REFERENCES `roles` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


INSERT INTO `users_roles` (`user_id`, `role_name`) VALUES (1, 'ROLE_ADMIN');