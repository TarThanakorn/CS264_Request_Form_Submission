-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2023 at 08:22 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `userName`, `userPwd`, `accStatus`) VALUES
(1, '6401234567', '1234567891011', 1),
(2, '6411111111', '1234567891011', 1),
(3, 'admin', 'admin', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`id`, `fname`, `lname`, `years`, `field`, `addhouseno`, `addvillageno`, `addsubdistrict`, `adddistrict`, `addprovince`, `addpostalcode`, `phonenumber`, `number`, `teacher`) VALUES
('6401234567', 'ชื่อ', 'นามสกุล', '1', 'วิทยาการคอมพิวเตอร์', '123/4', '-', 'คลองหนึ่ง', 'คลองหลวง', 'ปทุมธานี', '12120', '0812223333', NULL, 'อจ.'),
('6411111111', 'ชื่อ2', 'นามสกุล2', '2', 'วิทยาการคอมพิวเตอร์', '111', '2', 'คลองหนึ่ง', 'คลองหลวง', 'ปทุมธานี', '12120', '0911111111', NULL, 'อจ.2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
