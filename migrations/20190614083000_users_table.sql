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
