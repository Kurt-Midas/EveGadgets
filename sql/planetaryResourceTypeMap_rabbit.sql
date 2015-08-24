--
-- Table structure for table `planetaryResourceTypeMap`
--

DROP TABLE IF EXISTS `planetaryResourceTypeMap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `planetaryResourceTypeMap` (
  `planetId` int(11) NOT NULL,
  `resourceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`planetId`,`resourceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*
11 Temperate
12 Ice
13 Gas
2014 Ocean
2015 Lava
2016 Barren
2017 Storm
2063 Plasma
30889 Shattered

•	Barren
o	Aqueous, Base, Micro, Noble, Carbon
•	Gas
o	Aqueous
o	Base
o	Ionic
o	Noble Gas
o	Reactive
•	Ice
o	Aqueous, Heavy, Micro, Planktic, Noble Gas
•	Oceanic
o	Aqueous, Complex, Micro, Planktic, Carbon
•	Storm
o	Aqueous, Base, Suspended, Ionic, Noble Gas
•	Temperate
o	Aqueous, Complex, Micro, Autotrophs, Carbon
•	Lava
o	Base, Heavy, Suspended, Felsic, Non-CS
•	Plasma
o	Base, Heavy, Noble metals, Suspended, non-cs

*/
--
-- Dumping data for table `planetaryResourceTypeMap`
--

LOCK TABLES `planetaryResourceTypeMap` WRITE;
INSERT INTO `planetaryResourceTypeMap` VALUES 
(2016, 2268), (2016, 2267), (2016, 2073), (2016, 2270), (2016, 2288),
(13,2268),(13,2267),(13,2309),(13,2310),(13,2311),
(12,2268),(12,2272),(12,2073),(12,2286),(12,2310),
(2014,2268),(2014,2287),(2014,2073),(2014,2286),(2014,2288),
(2017,2268),(2017,2267),(2017,2308),(2017,2309),(2017,2310),
(11,2268),(11,2287),(11,2073),(11,2305),(11,2288),
(2015,2267),(2015,2272),(2015,2308),(2015,2307),(2015,2306),
(2063,2267),(2063,2272),(2063,2270),(2063,2308),(2063,2306);
UNLOCK TABLES;
