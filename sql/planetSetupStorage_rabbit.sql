DROP TABLE IF EXISTS `planetSetupStorage`;

CREATE TABLE `planetSetupStorage` (
	`hashKey` int(11) NOT NULL,
	`setup` varchar(1024)
	`lastRefreshDate` date,
	`persists` boolean,
	`version` int(5),
  PRIMARY KEY (`hashKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;