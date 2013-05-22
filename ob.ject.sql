-- phpMyAdmin SQL Dump
-- version 3.3.9.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 22, 2013 at 06:14 PM
-- Server version: 5.5.9
-- PHP Version: 5.3.6

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ob.ject`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

--
-- Dumping data for table `cells`
--

INSERT INTO `cells` VALUES(1, 23, 'img/cell_test/1.jpg', 'funktastic!');
INSERT INTO `cells` VALUES(2, 23, 'img/cell_test/2.jpg', 'yeah!');
INSERT INTO `cells` VALUES(3, 23, 'img/cell_test/3.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');
INSERT INTO `cells` VALUES(7, 23, 'img/cell_test/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');
INSERT INTO `cells` VALUES(8, 9, 'img/cell_test/8.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');
INSERT INTO `cells` VALUES(9, 9, 'img/cell_test/9.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');
INSERT INTO `cells` VALUES(10, 9, 'img/cell_test/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');
INSERT INTO `cells` VALUES(11, 9, 'img/cell_test/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');
INSERT INTO `cells` VALUES(12, 9, 'img/cell_test/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');
INSERT INTO `cells` VALUES(13, 9, 'img/cell_test/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');
INSERT INTO `cells` VALUES(14, 23, 'img/cell_test/6.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');
INSERT INTO `cells` VALUES(15, 9, 'img/cell_test/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');
INSERT INTO `cells` VALUES(19, 9, 'img/cell_test/9.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');

-- --------------------------------------------------------

--
-- Table structure for table `mebg`
--

DROP TABLE IF EXISTS `mebg`;
CREATE TABLE `mebg` (
  `mebg_id` int(11) NOT NULL AUTO_INCREMENT,
  `bg` blob,
  PRIMARY KEY (`mebg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `mebg`
--


-- --------------------------------------------------------

--
-- Table structure for table `metxt`
--

DROP TABLE IF EXISTS `metxt`;
CREATE TABLE `metxt` (
  `metxt_id` int(11) NOT NULL AUTO_INCREMENT,
  `txt` blob,
  PRIMARY KEY (`metxt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `metxt`
--


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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `objects`
--

INSERT INTO `objects` VALUES(1, 'yeah!', 'soon', 'portfolios', 'soon', '0', 'soon', 'soon', 1, 1);
INSERT INTO `objects` VALUES(9, 'soon', 'soon', 'portfolios', 'soon', '0', 'soon', 'soon', 2, 2);
INSERT INTO `objects` VALUES(10, 'soon', 'soon', 'festivals', 'soon', '0', 'soon', 'soon', 0, 1);
INSERT INTO `objects` VALUES(11, 'soon', 'soon', 'festivals', 'soon', '0', 'soon', 'soon', 1, 2);
INSERT INTO `objects` VALUES(12, 'soon', 'soon', 'festivals', 'soon', '0', 'soon', 'soon', 2, 1);
INSERT INTO `objects` VALUES(13, 'soon', 'soon', 'festivals', 'soon', '0', 'soon', 'soon', 3, 1);
INSERT INTO `objects` VALUES(14, 'soon', 'soon', 'corporate', 'soon', '0', 'soon', 'soon', 1, 1);
INSERT INTO `objects` VALUES(15, 'soon', 'soon', 'corporate', 'soon', '0', 'soon', 'soon', 1, 2);
INSERT INTO `objects` VALUES(16, 'soon', 'soon', 'corporate', 'soon', '0', 'soon', 'soon', 2, 1);
INSERT INTO `objects` VALUES(17, 'soon', 'soon', 'mobile', 'soon', '0', 'soon', 'soon', 2, 2);
INSERT INTO `objects` VALUES(18, 'soon', 'soon', 'mobile', 'soon', '0', 'soon', 'soon', 1, 2);
INSERT INTO `objects` VALUES(19, 'soon', 'soon', 'mobile', 'soon', '0', 'soon', 'soon', 1, 1);
INSERT INTO `objects` VALUES(20, 'soon', 'soon', 'small', 'soon', '0', 'soon', 'soon', 0, 1);
INSERT INTO `objects` VALUES(21, 'soon', 'soon', 'small', 'soon', '0', 'soon', 'soon', 1, 2);
INSERT INTO `objects` VALUES(22, 'soon', 'soon', 'small', 'soon', '0', 'soon', 'soon', 2, 1);
INSERT INTO `objects` VALUES(23, 'sooner', 'soonest', 'small', 'soon', '6', 'soon', 'soon', 3, 1);
INSERT INTO `objects` VALUES(24, 'soon', 'soon', 'tools', 'soon', '0', 'soon', 'soon', 1, 1);
INSERT INTO `objects` VALUES(25, 'soon', 'soon', 'tools', 'soon', '0', 'soon', 'soon', 1, 2);
INSERT INTO `objects` VALUES(26, 'soon', 'soon', 'tools', 'soon', '0', 'soon', 'soon', 2, 1);
INSERT INTO `objects` VALUES(27, 'soon', 'soon', 'interactive', 'soon', '0', 'soon', 'soon', 2, 2);
INSERT INTO `objects` VALUES(28, 'soon', 'soon', 'interactive', 'soon', '0', 'soon', 'soon', 1, 2);
INSERT INTO `objects` VALUES(31, 'soon', 'soon', 'fun', 'soon', '0', 'soon', 'soon', 1, 2);
INSERT INTO `objects` VALUES(32, 'soon', 'soon', 'fun', 'soon', '0', 'soon', 'soon', 2, 1);
INSERT INTO `objects` VALUES(33, 'new!', 'new!', 'small', 'oh yeah!', '0', 'this is som', 'this is a link!', 4, 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `shapeshifters_sprite`
--

INSERT INTO `shapeshifters_sprite` VALUES(1, 23, 'img/shapeshifter/sprite_23.png', '71, 72, 73');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=74 ;

--
-- Dumping data for table `shapeshifter_individual`
--

INSERT INTO `shapeshifter_individual` VALUES(7, 22, 'img/shapeshift/22/Expansion%20Writ-18.jpg');
INSERT INTO `shapeshifter_individual` VALUES(10, 22, 'img/shapeshift/22/Expansion%20Writ-23.jpg');
INSERT INTO `shapeshifter_individual` VALUES(71, 23, 'img/shapeshift/23/new_Expansion%20Writ-18.jpg');
INSERT INTO `shapeshifter_individual` VALUES(72, 23, 'img/shapeshift/23/new_Expansion%20Writ-19.jpg');
INSERT INTO `shapeshifter_individual` VALUES(73, 23, 'img/shapeshift/23/new_Expansion%20Writ-21.jpg');

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
SET FOREIGN_KEY_CHECKS=1;
