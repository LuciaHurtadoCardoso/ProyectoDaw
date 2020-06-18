CREATE DATABASE  IF NOT EXISTS `proyecto_proyectos` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proyecto_proyectos`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto_proyectos
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin@proyectoproyectos.com','$2a$10$RbSKugFlZc4KfUHhFySj.OtDxWz7cXpqMTzyZGrf69Y.HZJwVypgy');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 NOT NULL,
  `apellidos` varchar(45) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(200) CHARACTER SET utf8 NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `foto` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES (1,'Lucía','Hurtado Cardoso','lucia@gmail.com','$2a$10$V2I9ykstviyOgyRn5gf5aeSHb7ET710Ie7Vx4L/1hp0WzjqBQgFn6',1,'Lucía_Hurtado_Cardoso_fotoPerfil_lucia.jpg'),(2,'Juan Ramon','Garcia Carrasco','juanra@gmail.com','$2a$10$dJK6fbeAtMND1p1ddAgZ8uJR9Gcxeb8HQf/nv/WhkCrkIphWsadmS',1,'92e79897-3878-43d3-834f-a80d238e01c0_IMG_3046.JPG'),(45,'lucia','hurtado','luciahurtadocardoso1@gmail.com','$2a$10$usaVktVQwYbRFI6TjJ6/quszdWfTEXbA3HO8WaczpXz.bv.WfsCsO',1,NULL);
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciclo`
--

DROP TABLE IF EXISTS `ciclo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciclo` (
  `siglas` varchar(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria` enum('M','S') NOT NULL,
  PRIMARY KEY (`siglas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciclo`
--

LOCK TABLES `ciclo` WRITE;
/*!40000 ALTER TABLE `ciclo` DISABLE KEYS */;
INSERT INTO `ciclo` VALUES ('ASIR','Administracion de sistemas informaticos y redes','S'),('DAW','Desarrollo de aplicaciones web','S');
/*!40000 ALTER TABLE `ciclo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codigo`
--

DROP TABLE IF EXISTS `codigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codigo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codigo`
--

LOCK TABLES `codigo` WRITE;
/*!40000 ALTER TABLE `codigo` DISABLE KEYS */;
INSERT INTO `codigo` VALUES (1,'profesor','soyElProfesor'),(2,'alumno','hola');
/*!40000 ALTER TABLE `codigo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentario`
--

DROP TABLE IF EXISTS `comentario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto` varchar(255) COLLATE utf8_bin NOT NULL,
  `role` varchar(45) COLLATE utf8_bin NOT NULL,
  `id_usuario` int NOT NULL,
  `fecha` date NOT NULL,
  `publicacion_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comentario_publicacion1_idx` (`publicacion_id`),
  CONSTRAINT `fk_comentario_publicacion1` FOREIGN KEY (`publicacion_id`) REFERENCES `publicacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario`
--

LOCK TABLES `comentario` WRITE;
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
INSERT INTO `comentario` VALUES (20,'Testeando Comentarios','alumno',1,'2020-05-25',43),(21,'Testeando comentarios 2','alumno',1,'2020-05-25',43),(22,'Hola Lucía','profesor',1,'2020-05-25',43),(23,'asdsad','alumno',1,'2020-06-05',43);
/*!40000 ALTER TABLE `comentario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `convocatoria`
--

DROP TABLE IF EXISTS `convocatoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `convocatoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mes` varchar(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convocatoria`
--

LOCK TABLES `convocatoria` WRITE;
/*!40000 ALTER TABLE `convocatoria` DISABLE KEYS */;
INSERT INTO `convocatoria` VALUES (1,'Junio'),(2,'Marzo'),(3,'Diciembre');
/*!40000 ALTER TABLE `convocatoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` VALUES (1,'Juana','Sánchez Rey','juana@gmail.com','$2a$10$OuQPFjPxYK74SNGOgwCLee.afLFaYw/d9wf0n81fYwXaXcClU5R9C',1,NULL),(2,'Pepe','Palo','pepe@gmail.com','$2a$10$2Q1ynlgMDei6fxFRhidrbOKiC3Aw/t//5D3aO9DQzIsczE8SeKRrK',1,'');
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `horas` int DEFAULT NULL,
  `descripcion` text NOT NULL,
  `nota` int DEFAULT NULL,
  `estado_proyecto` tinyint DEFAULT '1',
  `urlGitHub` varchar(255) NOT NULL,
  `anio` int NOT NULL,
  `alumno_id` int NOT NULL,
  `profesor_id` int DEFAULT NULL,
  `ciclo_siglas` varchar(45) NOT NULL,
  `convocatoria_mes` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_proyecto_alumno1_idx` (`alumno_id`),
  KEY `fk_proyecto_ciclo1_idx` (`ciclo_siglas`) /*!80000 INVISIBLE */,
  KEY `fk_proyecto_profesor1_idx` (`profesor_id`),
  CONSTRAINT `fk_proyecto_alumno1` FOREIGN KEY (`alumno_id`) REFERENCES `alumno` (`id`),
  CONSTRAINT `fk_proyecto_ciclo1` FOREIGN KEY (`ciclo_siglas`) REFERENCES `ciclo` (`siglas`),
  CONSTRAINT `fk_proyecto_profesor1` FOREIGN KEY (`profesor_id`) REFERENCES `profesor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
INSERT INTO `proyecto` VALUES (4,'test2',200,'texto',5,1,'hola',2019,2,NULL,'DAW','Junio'),(41,'Proyecto de proyectos',200,'La idea principal del proyecto se basa en algo parecido a una Moodle, pero destinada a la gestión de proyectos de fin de grado y a mejorar la comunicación entre alumno y profesor durante el desarrollo de estos.',10,1,'https://github.com/LuciaHurtadoCardoso/ProyectoDaw',2020,1,1,'DAW','Junio'),(59,'test',NULL,'hola',NULL,1,'hola',2020,2,NULL,'ASIR','Marzo');
/*!40000 ALTER TABLE `proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto_finalizado`
--

DROP TABLE IF EXISTS `proyecto_finalizado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto_finalizado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `anio` int NOT NULL,
  `tags` text,
  `ciclo` varchar(45) NOT NULL,
  `alumno` varchar(255) NOT NULL,
  `tutor` varchar(255) NOT NULL,
  `horas` int NOT NULL,
  `convocatoria` varchar(45) NOT NULL,
  `archivo` varchar(255) DEFAULT NULL,
  `mostrado` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto_finalizado`
--

LOCK TABLES `proyecto_finalizado` WRITE;
/*!40000 ALTER TABLE `proyecto_finalizado` DISABLE KEYS */;
INSERT INTO `proyecto_finalizado` VALUES (20,'hola','texto','test2',2019,'HTML5,MariaDB,CSS,SASS','DAW','Garcia Carrasco Juan Ramon','García Hurtado Juana',200,'Junio','2019_Junio_Garcia_Carrasco_Juan_Ramon_test2_final.zip',1),(24,'https://github.com/LuciaHurtadoCardoso/ProyectoDaw','La idea principal del proyecto se basa en algo parecido a una Moodle, pero destinada a la gestión de proyectos de fin de grado y a mejorar la comunicación entre alumno y profesor durante el desarrollo de estos.','Proyecto de proyectos',2020,'HTML5,CSS,JWT,SASS,Angular,JavaScript,SQL','DAW','Hurtado Cardoso Lucía','Sánchez Rey Juana',200,'Junio','2020_Junio_Hurtado_Cardoso_Lucía_Proyecto_de_proyectos_final.zip',0);
/*!40000 ALTER TABLE `proyecto_finalizado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicacion`
--

DROP TABLE IF EXISTS `publicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `archivo` varchar(255) DEFAULT NULL,
  `fecha` date NOT NULL,
  `texto` varchar(255) NOT NULL,
  `proyecto_id` int NOT NULL,
  PRIMARY KEY (`id`,`proyecto_id`),
  KEY `fk_publicacion_proyecto1_idx` (`proyecto_id`),
  CONSTRAINT `fk_publicacion_proyecto1` FOREIGN KEY (`proyecto_id`) REFERENCES `proyecto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicacion`
--

LOCK TABLES `publicacion` WRITE;
/*!40000 ALTER TABLE `publicacion` DISABLE KEYS */;
INSERT INTO `publicacion` VALUES (43,'2020-05-25_Hurtado_Cardoso_Lucía_GNY323V8CN.pdf','2020-05-25','Comprobación',41),(45,'2020-05-25_Garcia_Carrasco_Juan_Ramon_CV.pdf','2020-05-25','Hola que tal',4),(46,'2020-05-25_Garcia_Carrasco_Juan_Ramon_fotoMama.PNG','2020-05-25','Comprobaciones',4),(47,NULL,'2020-06-05','testeando comentarios',41);
/*!40000 ALTER TABLE `publicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'HTML5'),(2,'CSS'),(3,'SASS'),(4,'JAVA'),(5,'Sping5'),(6,'JavaScript'),(7,'JQuery'),(8,'Angular'),(9,'Python'),(10,'PHP'),(11,'SQL'),(12,'MariaDB'),(68,'JWT');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_etiqueta_proyecto`
--

DROP TABLE IF EXISTS `tag_etiqueta_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag_etiqueta_proyecto` (
  `tag_id` int NOT NULL,
  `proyecto_id` int NOT NULL,
  PRIMARY KEY (`tag_id`,`proyecto_id`),
  KEY `fk_tag_has_proyecto_proyecto1_idx` (`proyecto_id`),
  KEY `fk_tag_has_proyecto_tag1_idx` (`tag_id`),
  CONSTRAINT `fk_tag_has_proyecto_proyecto1` FOREIGN KEY (`proyecto_id`) REFERENCES `proyecto` (`id`),
  CONSTRAINT `fk_tag_has_proyecto_tag1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_etiqueta_proyecto`
--

LOCK TABLES `tag_etiqueta_proyecto` WRITE;
/*!40000 ALTER TABLE `tag_etiqueta_proyecto` DISABLE KEYS */;
INSERT INTO `tag_etiqueta_proyecto` VALUES (1,4),(2,4),(3,4),(12,4),(1,41),(2,41),(3,41),(6,41),(8,41),(11,41),(68,41);
/*!40000 ALTER TABLE `tag_etiqueta_proyecto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-17 18:07:09
