-- TEST DATA FOR KSAOOSTERZELE DATABASE

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ksaoosterzele_beksaoosterzeledatabase`
--
CREATE DATABASE IF NOT EXISTS `ksaoosterzele_testdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ksaoosterzele_testdatabase`;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `email`, `password`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'prive', 'test', 'prive', 1, '2024-06-15 19:45:25', '2024-06-15 19:45:25');

-- --------------------------------------------------------

--
-- Table structure for table `account_leaders`
--

CREATE TABLE `account_leaders` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `leader_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `account_roles`
--

CREATE TABLE `account_roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account_roles`
--

INSERT INTO `account_roles` (`id`, `name`) VALUES
(1, 'leider');

-- --------------------------------------------------------

--
-- Table structure for table `collages`
--

CREATE TABLE `collages` (
  `id` int(11) NOT NULL,
  `internal_name` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collage_collage_types`
--

CREATE TABLE `collage_collage_types` (
  `id` int(11) NOT NULL,
  `collage_id` int(11) NOT NULL,
  `collage_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collage_types`
--

CREATE TABLE `collage_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `start_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `end_timestamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `img_path` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `url` varchar(255) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_age` int(11) NOT NULL,
  `end_age` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leaders`
--

CREATE TABLE `leaders` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birthdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leader_places`
--

CREATE TABLE `leader_places` (
  `id` int(11) NOT NULL,
  `leader_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `gender` char(1) NOT NULL CHECK (`gender` in ('M','X')),
  `birthplace` varchar(255) NOT NULL,
  `parent_first_name` varchar(255) NOT NULL,
  `parent_last_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `town` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `telephone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `second_parent_first_name` varchar(255) DEFAULT NULL,
  `second_parent_last_name` varchar(255) DEFAULT NULL,
  `second_address` varchar(255) DEFAULT NULL,
  `second_postal_code` varchar(255) DEFAULT NULL,
  `second_town` varchar(255) DEFAULT NULL,
  `second_phone_number` varchar(255) DEFAULT NULL,
  `second_telephone_number` varchar(255) DEFAULT NULL,
  `second_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `account_leaders`
--
ALTER TABLE `account_leaders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `leader_id` (`leader_id`);

--
-- Indexes for table `account_roles`
--
ALTER TABLE `account_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collages`
--
ALTER TABLE `collages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collage_collage_types`
--
ALTER TABLE `collage_collage_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collage_id` (`collage_id`),
  ADD KEY `collage_type_id` (`collage_type_id`);

--
-- Indexes for table `collage_types`
--
ALTER TABLE `collage_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leaders`
--
ALTER TABLE `leaders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leader_places`
--
ALTER TABLE `leader_places`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leader_id` (`leader_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `account_leaders`
--
ALTER TABLE `account_leaders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `account_roles`
--
ALTER TABLE `account_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `collages`
--
ALTER TABLE `collages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `collage_collage_types`
--
ALTER TABLE `collage_collage_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `collage_types`
--
ALTER TABLE `collage_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leaders`
--
ALTER TABLE `leaders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leader_places`
--
ALTER TABLE `leader_places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `account_roles` (`id`);

--
-- Constraints for table `account_leaders`
--
ALTER TABLE `account_leaders`
  ADD CONSTRAINT `account_leaders_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  ADD CONSTRAINT `account_leaders_ibfk_2` FOREIGN KEY (`leader_id`) REFERENCES `leaders` (`id`);

--
-- Constraints for table `collage_collage_types`
--
ALTER TABLE `collage_collage_types`
  ADD CONSTRAINT `collage_collage_types_ibfk_1` FOREIGN KEY (`collage_id`) REFERENCES `collages` (`id`),
  ADD CONSTRAINT `collage_collage_types_ibfk_2` FOREIGN KEY (`collage_type_id`) REFERENCES `collage_types` (`id`);

--
-- Constraints for table `leader_places`
--
ALTER TABLE `leader_places`
  ADD CONSTRAINT `leader_places_ibfk_1` FOREIGN KEY (`leader_id`) REFERENCES `leaders` (`id`),
  ADD CONSTRAINT `leader_places_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`);

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
