-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2024 at 04:56 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs264_account`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `userName` varchar(10) NOT NULL,
  `userPwd` varchar(13) NOT NULL,
  `accStatus` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `userName`, `userPwd`, `accStatus`) VALUES
(1, '6401234567', '1234567890123', 1),
(2, '6411111111', '1234567890123', 1),
(3, 't1', '1234', 2),
(4, 't2', '1234', 3),
(5, 't3', '1234', 4);

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `id` varchar(10) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `years` varchar(1) NOT NULL,
  `field` varchar(50) NOT NULL,
  `addhouseno` varchar(20) NOT NULL,
  `addvillageno` varchar(20) NOT NULL,
  `addsubdistrict` varchar(50) NOT NULL,
  `adddistrict` varchar(50) NOT NULL,
  `addprovince` varchar(50) NOT NULL,
  `addpostalcode` varchar(5) NOT NULL,
  `phonenumber` varchar(10) NOT NULL,
  `number` varchar(9) DEFAULT NULL,
  `teacher` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`id`, `fname`, `lname`, `years`, `field`, `addhouseno`, `addvillageno`, `addsubdistrict`, `adddistrict`, `addprovince`, `addpostalcode`, `phonenumber`, `number`, `teacher`) VALUES
('6401234567', 'ชื่อ', 'นามสกุล', '1', 'วิทยาการคอมพิวเตอร์', '123/4', '-', 'คลองหนึ่ง', 'คลองหลวง', 'ปทุมธานี', '12120', '0812223333', NULL, 'อจ.'),
('6411111111', 'ชื่อ2', 'นามสกุล2', '2', 'วิทยาการคอมพิวเตอร์', '111', '2', 'คลองหนึ่ง', 'คลองหลวง', 'ปทุมธานี', '12120', '0911111111', NULL, 'อจ.2');

-- --------------------------------------------------------

--
-- Table structure for table `form`
--

CREATE TABLE `form` (
  `formid` int(11) NOT NULL,
  `id` varchar(10) NOT NULL,
  `date` varchar(10) DEFAULT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `years` varchar(1) NOT NULL,
  `field` varchar(50) NOT NULL,
  `addhouseno` varchar(20) NOT NULL,
  `addvillageno` varchar(20) NOT NULL,
  `addsubdistrict` varchar(50) NOT NULL,
  `adddistrict` varchar(50) NOT NULL,
  `addprovince` varchar(50) NOT NULL,
  `addpostalcode` varchar(5) NOT NULL,
  `phonenumber` varchar(10) NOT NULL,
  `number` varchar(9) DEFAULT NULL,
  `teacher` varchar(50) NOT NULL,
  `formtype` varchar(1) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT '2',
  `addsub` varchar(1000) DEFAULT NULL,
  `remsub` varchar(1000) DEFAULT NULL,
  `reason` varchar(1000) DEFAULT NULL,
  `story` varchar(1000) DEFAULT NULL,
  `filename` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `form`
--

INSERT INTO `form` (`formid`, `id`, `date`, `fname`, `lname`, `years`, `field`, `addhouseno`, `addvillageno`, `addsubdistrict`, `adddistrict`, `addprovince`, `addpostalcode`, `phonenumber`, `number`, `teacher`, `formtype`, `status`, `addsub`, `remsub`, `reason`, `story`, `filename`) VALUES
(61, '6401234567', '2022-11-25', 'ชื่อ', 'นามสกุล', '1', 'วิทยาการคอมพิวเตอร์', '123/4', '-', 'คลองหนึ่ง', 'คลองหลวง', 'ปทุมธานี', '12120', '0812223333', '', 'อจ.', '3', '0', NULL, NULL, 'การำนสดยไนำ', NULL, NULL),
(62, '6401234567', '2022-11-25', 'ชื่อ', 'นามสกุล', '1', 'วิทยาการคอมพิวเตอร์', '123/4', '-', 'คลองหนึ่ง', 'คลองหลวง', 'ปทุมธานี', '12120', '0812223333', '', 'อจ.', '3', '5', NULL, NULL, 'สวัสดีครับ', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `form`
--
ALTER TABLE `form`
  ADD PRIMARY KEY (`formid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `form`
--
ALTER TABLE `form`
  MODIFY `formid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
