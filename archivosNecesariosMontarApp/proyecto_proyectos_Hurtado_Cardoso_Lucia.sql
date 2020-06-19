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
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
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
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `apellidos` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `foto` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES (57,'Lucía','Hurtado Cardoso','luciahurtadocardoso1@gmail.com','$2a$10$V2I9ykstviyOgyRn5gf5aeSHb7ET710Ie7Vx4L/1hp0WzjqBQgFn6',1,'Lucía_Hurtado_Cardoso_fotoPerfil_lucia.jpg'),(58,'Manuel','López Ramos','manuellp87@hotmail.com','$2a$10$V2I9ykstviyOgyRn5gf5aeSHb7ET710Ie7Vx4L/1hp0WzjqBQgFn6',1,'Manuel_López_Ramos_fotoPerfil_pp.jpg'),(59,'Cristina','Sierra Segura','cocosierrasegura@gmail.com','$2a$10$V2I9ykstviyOgyRn5gf5aeSHb7ET710Ie7Vx4L/1hp0WzjqBQgFn6',1,'Cristina_Sierra_Segura_fotoPerfil_Screenshot_1.jpg'),(60,'Juan Ramón','García Carrasco','juanra.gc94@gmail.com','$2a$10$V2I9ykstviyOgyRn5gf5aeSHb7ET710Ie7Vx4L/1hp0WzjqBQgFn6',1,'Juan Ramón_García_Carrasco_fotoPerfil_juanra.jpg');
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
  `rol` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `codigo` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codigo`
--

LOCK TABLES `codigo` WRITE;
/*!40000 ALTER TABLE `codigo` DISABLE KEYS */;
INSERT INTO `codigo` VALUES (1,'profesor','soyElProfesor'),(2,'alumno','soyAlumnoDelIESFcoRomeroVargas');
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
  `texto` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `role` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `id_usuario` int NOT NULL,
  `fecha` date NOT NULL,
  `publicacion_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comentario_publicacion1_idx` (`publicacion_id`),
  CONSTRAINT `fk_comentario_publicacion1` FOREIGN KEY (`publicacion_id`) REFERENCES `publicacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario`
--

LOCK TABLES `comentario` WRITE;
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
INSERT INTO `comentario` VALUES (28,'¿Te parece bien Juana?','alumno',57,'2020-06-19',49),(29,'¿Crees que debería cambiar algo?','alumno',57,'2020-06-19',49);
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
  `mes` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` VALUES (10,'Juana','Sánchez Rey','juana@gmail.com','$2a$10$V2I9ykstviyOgyRn5gf5aeSHb7ET710Ie7Vx4L/1hp0WzjqBQgFn6',1,'Juana_Sánchez_Rey_fotoPerfil_pp(1).jpg'),(11,'Paco','Ávila','paco@gmail.com','$2a$10$V2I9ykstviyOgyRn5gf5aeSHb7ET710Ie7Vx4L/1hp0WzjqBQgFn6',1,'Paco_Ávila_fotoPerfil_WhatsAppImage2020-06-18at17.32.53.jpeg');
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
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
INSERT INTO `proyecto` VALUES (61,'Proyecto de proyectos',NULL,'La finalidad de mi proyecto, no es otra que, facilitar la comunicación entre alumno y profesor durante el seguimiento del proyecto y dar la posibilidad a los profesores de llevar un seguimiento más exhaustivo de los proyectos de forma sencilla.\nAdemás, esta aplicación servirá como almacén de antiguos proyectos, de los cuales los alumnos podrán coger ideas.',NULL,1,'https://github.com/LuciaHurtadoCardoso/ProyectoDaw',2020,57,10,'DAW','Junio'),(62,'Best Learning Resources',NULL,'Aplicación web que reune los mejores materiales para el aprendizaje de tecnologías.',NULL,1,'https://github.com/manu-lopez/proyectoDAW',2020,58,11,'DAW','Junio'),(63,'Moodle Académica',NULL,'CMS personalizado para gestionar alumn@s, cursos, temarios y exámenes por parte del profesor, y la realización de exámenes por parte del alumnado.',NULL,1,'https://github.com/piltrafillaeme/ProyectoDaw',2020,59,10,'DAW','Junio'),(64,'Chabrar',100,'Juego de preguntas por niveles en el que se evalúa la sabiduría de la persona en base a unos temas predeterminados.',10,0,'https://github.com/JuanraGC',2019,60,10,'DAW','Marzo');
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto_finalizado`
--

LOCK TABLES `proyecto_finalizado` WRITE;
/*!40000 ALTER TABLE `proyecto_finalizado` DISABLE KEYS */;
INSERT INTO `proyecto_finalizado` VALUES (28,'https://github.com/JuanraGC','Juego de preguntas por niveles en el que se evalúa la sabiduría de la persona en base a unos temas predeterminados.','Chabrar',2019,'CSS,JavaScript,HTML5','DAW','García Carrasco Juan Ramón','Sánchez Rey Juana',100,'Marzo',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicacion`
--

LOCK TABLES `publicacion` WRITE;
/*!40000 ALTER TABLE `publicacion` DISABLE KEYS */;
INSERT INTO `publicacion` VALUES (49,'2020-06-19_Hurtado_Cardoso_Lucía_documentacion_Hurtado_Cardoso_Lucia.pdf','2020-06-19','Documentación del proyecto',61),(50,'2020-06-19_Hurtado_Cardoso_Lucía_guia_de_estilos_Hurtado_Cardoso_Lucia.pdf','2020-06-19','Guía de estilos del proyecto',61),(51,'2020-06-19_Hurtado_Cardoso_Lucía_EntidadRelacion_Hurtado_Cardoso_Lucia.jpg','2020-06-19','Modelo entidad relación de la base de datos',61),(52,'2020-06-19_Hurtado_Cardoso_Lucía_seo_Hurtado_Cardoso_Lucia.pdf','2020-06-19','SEO de la aplicación',61),(53,'2020-06-19_López_Ramos_Manuel_EntidadRelacion_Hurtado_Cardoso_Lucia.jpg','2020-06-19','Updateando modelo relacional de la base de datos.',62),(54,'2020-06-19_Sierra_Segura_Cristina_proyecto_proyectos_Hurtado_Cardoso_Lucia.sql','2020-06-19','Juana, ya tengo listo el .sql de la base de datos.',63);
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
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'HTML5'),(2,'CSS'),(3,'SASS'),(4,'JAVA'),(5,'Sping5'),(6,'JavaScript'),(7,'JQuery'),(8,'Angular'),(9,'Python'),(10,'PHP'),(11,'SQL'),(12,'MariaDB'),(68,'JWT'),(83,'Django'),(84,'Docker'),(85,'Laravel');
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
INSERT INTO `tag_etiqueta_proyecto` VALUES (1,61),(2,61),(4,61),(5,61),(6,61),(7,61),(8,61),(12,61),(68,61),(83,62),(84,62),(6,63),(10,63),(85,63),(1,64),(2,64),(6,64);
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

-- Dump completed on 2020-06-19 20:14:29
