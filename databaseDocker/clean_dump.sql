-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mytable
-- ------------------------------------------------------
-- Server version	8.0.12

-- This file can be used to set up docker, it is referenced in the corresponding dockerfiles.

 SET NAMES utf8 ;

DROP TABLE IF EXISTS `objects`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `objects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `multiple_of` int(11) DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `price` varchar(20) DEFAULT NULL,
  `owner` varchar(50) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `buyer` varchar(50) DEFAULT NULL,
  `shippingAddress` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `pics`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `corresp_obj_id` varchar(10) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `reports`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(5000) DEFAULT NULL,
  `objectId` int(10) DEFAULT NULL,
  `reporter` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `tags`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `corresp_obj_id` int(11) DEFAULT NULL,
  `content` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `users`;

 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `pw` varchar(60) DEFAULT NULL,
  `profile_pic` varchar(20) DEFAULT NULL,
  `eth_account` varchar(42) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `email` varchar(100) DEFAULT NULL,
  `kycKey` varchar(42) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'Admin','$2b$10$0upO9ur2dEQ7pa4mPWkCf.miPvWO9jDFIS7xtjSZ434we9Zt19Aua','icon.png','YOUR ETHEREUM ADDRESS HERE',1,'YOUR EMAIL ADDRESS HERE',NULL);

-- LOCK TABLES `user` WRITE;
-- FLUSH PRIVILEGES;
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
-- FLUSH PRIVILEGES;

UNLOCK TABLES;

-- mysql -uroot -proot --socket=/var/run/mysqld/mysqld.sock -e "FLUSH PRIVILEGES;"
-- mysql -uroot -proot --socket=/var/run/mysqld/mysqld.sock -e "grant all privileges on *.* to '$MYSQL_USER'@'%' identified by '$MYSQL_PASSWORD';"

