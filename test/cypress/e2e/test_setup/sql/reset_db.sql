SET FOREIGN_KEY_CHECKS = 0;
LOCK TABLES `SITE_RELAY_APPUSER` WRITE;
TRUNCATE TABLE `SITE_RELAY_APPUSER`;
UNLOCK TABLES;
LOCK TABLES `SITE_RELAY_USER` WRITE;
TRUNCATE TABLE `SITE_RELAY_USER`;
UNLOCK TABLES;
-- LOCK TABLES `AB_JOINMN_ROLE_USER_users` WRITE; TRUNCATE TABLE `AB_JOINMN_ROLE_USER_users`; UNLOCK TABLES;
SET FOREIGN_KEY_CHECKS = 1;