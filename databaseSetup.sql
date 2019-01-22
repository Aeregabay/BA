CREATE DATABASE `mytable` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;


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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `pics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `corresp_obj_id` varchar(10) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(5000) DEFAULT NULL,
  `objectId` int(10) DEFAULT NULL,
  `reporter` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `corresp_obj_id` int(11) DEFAULT NULL,
  `content` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci



