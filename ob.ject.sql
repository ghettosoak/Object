-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 20, 2013 at 02:05 PM
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
(1, 23, 'img/cell_test/1.jpg', 'funktastic!'),
(2, 23, 'img/cell_test/2.jpg', 'yeah!'),
(3, 23, 'img/cell_test/3.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(7, 23, 'img/cell_test/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(8, 9, 'img/cell_test/8.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(9, 9, 'img/cell_test/9.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(10, 9, 'img/cell_test/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(11, 9, 'img/cell_test/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(12, 9, 'img/cell_test/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(13, 9, 'img/cell_test/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(14, 23, 'img/cell_test/6.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(15, 9, 'img/cell_test/7.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.'),
(19, 9, 'img/cell_test/9.jpg', 'this is some text about project 20. I am not sure how long it will be in the end, but this seems like a good length, more or less.');

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

-- --------------------------------------------------------

--
-- Table structure for table `objects`
--

DROP TABLE IF EXISTS `objects`;
CREATE TABLE `objects` (
  `object_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(11) DEFAULT NULL,
  `client` varchar(11) DEFAULT NULL,
  `category` varchar(11) DEFAULT NULL,
  `date_launched` varchar(11) DEFAULT NULL,
  `total_hours` varchar(11) DEFAULT NULL,
  `project_text` varchar(11) DEFAULT NULL,
  `link` varchar(11) DEFAULT NULL,
  `coord_y` int(11) DEFAULT NULL,
  `coord_z` int(11) DEFAULT NULL,
  PRIMARY KEY (`object_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `objects`
--

INSERT INTO `objects` (`object_id`, `name`, `client`, `category`, `date_launched`, `total_hours`, `project_text`, `link`, `coord_y`, `coord_z`) VALUES
(1, 'yeah!', 'soon', 'portfolios', 'soon', 'soon', 'soon', 'soon', 1, 1),
(9, 'soon', 'soon', 'portfolios', 'soon', 'soon', 'soon', 'soon', 2, 2),
(10, 'soon', 'soon', 'festivals', 'soon', 'soon', 'soon', 'soon', 0, 1),
(11, 'soon', 'soon', 'festivals', 'soon', 'soon', 'soon', 'soon', 1, 2),
(12, 'soon', 'soon', 'festivals', 'soon', 'soon', 'soon', 'soon', 2, 1),
(13, 'soon', 'soon', 'festivals', 'soon', 'soon', 'soon', 'soon', 3, 1),
(14, 'soon', 'soon', 'corporate', 'soon', 'soon', 'soon', 'soon', 1, 1),
(15, 'soon', 'soon', 'corporate', 'soon', 'soon', 'soon', 'soon', 1, 2),
(16, 'soon', 'soon', 'corporate', 'soon', 'soon', 'soon', 'soon', 2, 1),
(17, 'soon', 'soon', 'mobile', 'soon', 'soon', 'soon', 'soon', 2, 2),
(18, 'soon', 'soon', 'mobile', 'soon', 'soon', 'soon', 'soon', 1, 2),
(19, 'soon', 'soon', 'mobile', 'soon', 'soon', 'soon', 'soon', 1, 1),
(20, 'soon', 'soon', 'small', 'soon', 'soon', 'soon', 'soon', 0, 1),
(21, 'soon', 'soon', 'small', 'soon', 'soon', 'soon', 'soon', 1, 2),
(22, 'soon', 'soon', 'small', 'soon', 'soon', 'soon', 'soon', 2, 1),
(23, 'sooner', 'soonest', 'small', 'soon', 'soon', 'soon', 'soon', 3, 1),
(24, 'soon', 'soon', 'tools', 'soon', 'soon', 'soon', 'soon', 1, 1),
(25, 'soon', 'soon', 'tools', 'soon', 'soon', 'soon', 'soon', 1, 2),
(26, 'soon', 'soon', 'tools', 'soon', 'soon', 'soon', 'soon', 2, 1),
(27, 'soon', 'soon', 'interactive', 'soon', 'soon', 'soon', 'soon', 2, 2),
(28, 'soon', 'soon', 'interactive', 'soon', 'soon', 'soon', 'soon', 1, 2),
(29, 'soon', 'soon', 'fun', 'soon', 'soon', 'soon', 'soon', 2, 1),
(30, 'soon', 'soon', 'fun', 'soon', 'soon', 'soon', 'soon', 1, 1);

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

INSERT INTO `shapeshifters_sprite` (`shapeshifter_id`, `object_key`, `img`, `madewith`) VALUES
(1, 23, 'img/shapeshifter/sprite_23.png', '29, 30, 31, 32, 33');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

--
-- Dumping data for table `shapeshifter_individual`
--

INSERT INTO `shapeshifter_individual` (`shapeshifter_id`, `object_key`, `img`) VALUES
(7, 22, 'img/shapeshift/22/Expansion%20Writ-18.jpg'),
(10, 22, 'img/shapeshift/22/Expansion%20Writ-23.jpg'),
(29, 23, 'img/shapeshift/23/new_Expansion%20Writ-19.jpg'),
(44, 23, 'img/shapeshift/23/new_Expansion%20Writ-08.jpg');

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
