-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 03, 2013 at 08:23 AM
-- Server version: 5.5.25
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ob.ject`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'portfolios'),
(3, 'festivals'),
(4, 'corporate'),
(5, 'mobile'),
(7, 'small'),
(9, 'tools'),
(10, 'interactive'),
(11, 'fun');

-- --------------------------------------------------------

--
-- Table structure for table `cells`
--

DROP TABLE IF EXISTS `cells`;
CREATE TABLE `cells` (
  `cell_id` int(11) NOT NULL AUTO_INCREMENT,
  `object_key` int(11) DEFAULT NULL,
  `img` text,
  `txt` text,
  PRIMARY KEY (`cell_id`),
  KEY `object_key` (`object_key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `cells`
--

INSERT INTO `cells` (`cell_id`, `object_key`, `img`, `txt`) VALUES
(1, 23, '../join/img/cells/1.jpg', 'funktastic!'),
(2, 23, '../join/img/cells/2.jpg', 'yeah!'),
(3, 23, '../join/img/cells/3.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(7, 23, '../join/img/cells/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(8, 9, '../join/img/cells/8.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(9, 9, '../join/img/cells/9.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(10, 9, '../join/img/cells/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(11, 9, '../join/img/cells/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(12, 9, '../join/img/cells/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(13, 9, '../join/img/cells/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(14, 23, '../join/img/cells/6.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(15, 9, '../join/img/cells/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(19, 9, '../join/img/cells/9.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `passkey` longtext,
  `whom` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `passkey`, `whom`) VALUES
(1, 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff', 'mike'),
(2, 'c4a12f24ceabef771459150b0a953e81e3776a41800798e27808b87c95dd3b0c30280761390833bda9ec11ab48aa733ab253da2f57914744aada6681c9fbda63 ', 'notmike'),
(3, 'ab93a9e95d70edb06025511cea4e2b8047fb7e1deaf7244fc0d3edf5e7cb57d8fb7b951bdeb3c6b552714878749eb19b9103e64a83635e8885c7d3e1d0fc5649', 'notmike');

-- --------------------------------------------------------

--
-- Table structure for table `mebg`
--

DROP TABLE IF EXISTS `mebg`;
CREATE TABLE `mebg` (
  `mebg_id` int(11) NOT NULL AUTO_INCREMENT,
  `bg` blob,
  PRIMARY KEY (`mebg_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=59 ;

--
-- Dumping data for table `mebg`
--

INSERT INTO `mebg` (`mebg_id`, `bg`) VALUES
(1, 0x2e2e2f6a6f696e2f696d672f6d652f636c65616e2f312e6a7067),
(9, 0x2e2e2f6a6f696e2f696d672f6d652f636c65616e2f322e6a7067),
(54, 0x2e2e2f6a6f696e2f696d672f6d652f636c65616e2f35342e6a7067),
(56, 0x2e2e2f6a6f696e2f696d672f6d652f636c65616e2f35362e6a7067),
(57, 0x2e2e2f6a6f696e2f696d672f6d652f636c65616e2f35372e6a7067),
(58, 0x2e2e2f6a6f696e2f696d672f6d652f636c65616e2f35382e6a7067);

-- --------------------------------------------------------

--
-- Table structure for table `metxt`
--

DROP TABLE IF EXISTS `metxt`;
CREATE TABLE `metxt` (
  `metxt_id` int(11) NOT NULL AUTO_INCREMENT,
  `txt` blob,
  PRIMARY KEY (`metxt_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `metxt`
--

INSERT INTO `metxt` (`metxt_id`, `txt`) VALUES
(1, 0x7468697320697320736f6d65206e65772074657874),
(2, 0x74686973206973206e6f7420736f6d65206e65772074657874),
(3, 0x7468697320697320736f6d652074657874),
(4, 0x7468697320697320736f6d652074657874),
(5, 0x7468697320697320736f6d652074657874),
(6, 0x7468697320697320736f6d652074657874),
(7, 0x7468697320697320736f6d652074657874),
(8, 0x7468697320697320736f6d652074657874),
(9, 0x7468697320697320736f6d652074657874),
(10, 0x7468697320697320736f6d652074657874),
(11, 0x7468697320697320736f6d652074657874),
(12, 0x7468697320697320736f6d652074657874),
(13, 0x7468697320697320736f6d652074657874),
(14, 0x7468697320697320736f6d652074657874);

-- --------------------------------------------------------

--
-- Table structure for table `objects`
--

DROP TABLE IF EXISTS `objects`;
CREATE TABLE `objects` (
  `object_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text,
  `client` text,
  `category` varchar(11) DEFAULT NULL,
  `date_launched` varchar(50) DEFAULT NULL,
  `total_hours` varchar(11) DEFAULT NULL,
  `project_text` text,
  `link` text,
  `coord_y` int(11) DEFAULT NULL,
  `coord_z` int(11) DEFAULT NULL,
  PRIMARY KEY (`object_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=40 ;

--
-- Dumping data for table `objects`
--

INSERT INTO `objects` (`object_id`, `name`, `client`, `category`, `date_launched`, `total_hours`, `project_text`, `link`, `coord_y`, `coord_z`) VALUES
(1, 'yeah!', 'soon', 'portfolios', 'soon', '0', 'soon', 'soon', 1, 1),
(9, 'soon', 'soon', 'portfolios', 'soon', '0', 'soon', 'soon', 2, 2),
(10, 'soon', 'soon', 'festivals', 'soon', '0', 'soon', 'soon', 0, 1),
(11, 'soon', 'soon', 'festivals', 'soon', '0', 'soon', 'soon', 1, 2),
(12, 'soon', 'soon', 'festivals', 'soon', '0', 'soon', 'soon', 2, 1),
(14, 'soon', 'soon', 'corporate', 'soon', '0', 'soon', 'soon', 1, 1),
(15, 'soon', 'soon', 'corporate', 'soon', '0', 'soon', 'soon', 1, 2),
(16, 'soon', 'soon', 'corporate', 'soon', '0', 'soon', 'soon', 2, 1),
(17, 'soon', 'soon', 'mobile', 'soon', '0', 'soon', 'soon', 2, 2),
(18, 'soon', 'soon', 'mobile', 'soon', '0', 'soon', 'soon', 1, 2),
(19, 'soon', 'soon', 'mobile', 'soon', '0', 'soon', 'soon', 1, 1),
(20, 'soon', 'soon', 'small', 'soon', '0', 'soon', 'soon', 0, 1),
(21, 'soon', 'soon', 'small', 'soon', '0', 'soon', 'soon', 1, 2),
(22, 'soon', 'soon', 'small', 'soon', '0', 'soon', 'soon', 2, 1),
(23, 'sooner', 'soonest', 'small', 'soon', '6', 'soon', 'soon', 3, 1),
(24, 'soon', 'soon', 'tools', 'soon', '0', 'soon', 'soon', 1, 1),
(25, 'soon', 'soon', 'tools', 'soon', '0', 'soon', 'soon', 1, 2),
(27, 'soon', 'soon', 'interactive', 'soon', '0', 'soon', 'soon', 2, 2),
(28, 'soon', 'soon', 'interactive', 'soon', '0', 'soon', 'soon', 1, 2),
(31, 'soon', 'soon', 'fun', 'soon', '0', 'soon', 'soon', 1, 2),
(32, 'soon', 'soon', 'fun', 'soon', '0', 'soon', 'soon', 2, 1),
(39, '', '', 'corporate', '', '', '', '', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `shapeshifters_sprite`
--

DROP TABLE IF EXISTS `shapeshifters_sprite`;
CREATE TABLE `shapeshifters_sprite` (
  `shapeshifter_id` int(11) NOT NULL AUTO_INCREMENT,
  `object_key` int(11) DEFAULT NULL,
  `img` text,
  `madewith` text,
  PRIMARY KEY (`shapeshifter_id`),
  KEY `object_key` (`object_key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `shapeshifters_sprite`
--

INSERT INTO `shapeshifters_sprite` (`shapeshifter_id`, `object_key`, `img`, `madewith`) VALUES
(1, 23, '../join/img/shapeshift/sprite_23.png', '71, 72, 73, 76'),
(2, 24, '../join/img/shapeshift/sprite_23.png', '71, 72, 73, 76'),
(3, 25, '../join/img/shapeshift/sprite_23.png', '71, 72, 73, 76');

-- --------------------------------------------------------

--
-- Table structure for table `shapeshifter_individual`
--

DROP TABLE IF EXISTS `shapeshifter_individual`;
CREATE TABLE `shapeshifter_individual` (
  `shapeshifter_id` int(11) NOT NULL AUTO_INCREMENT,
  `object_key` int(11) DEFAULT NULL,
  `img` text,
  PRIMARY KEY (`shapeshifter_id`),
  KEY `object_key` (`object_key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=77 ;

--
-- Dumping data for table `shapeshifter_individual`
--

INSERT INTO `shapeshifter_individual` (`shapeshifter_id`, `object_key`, `img`) VALUES
(7, 22, '../join/img/shapeshift/22/Expansion%20Writ-18.jpg'),
(10, 22, '../join/img/shapeshift/22/Expansion%20Writ-23.jpg'),
(71, 23, '../join/img/shapeshift/23/new_Expansion%20Writ-18.jpg'),
(72, 23, '../join/img/shapeshift/23/new_Expansion%20Writ-19.jpg'),
(73, 23, '../join/img/shapeshift/23/new_Expansion%20Writ-21.jpg'),
(76, 23, '../join/img/shapeshift/23/new_Expansion%20Writ-04.jpg');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cells`
--
ALTER TABLE `cells`
  ADD CONSTRAINT `object_key` FOREIGN KEY (`object_key`) REFERENCES `objects` (`object_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shapeshifters_sprite`
--
ALTER TABLE `shapeshifters_sprite`
  ADD CONSTRAINT `shapeshifters_sprite_ibfk_1` FOREIGN KEY (`object_key`) REFERENCES `objects` (`object_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shapeshifter_individual`
--
ALTER TABLE `shapeshifter_individual`
  ADD CONSTRAINT `shapeshifter_individual_ibfk_1` FOREIGN KEY (`object_key`) REFERENCES `objects` (`object_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
