-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: database
-- Generation Time: Jul 07, 2024 at 02:42 PM
-- Server version: 10.6.17-MariaDB-1:10.6.17+maria~ubu2004
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ksaoosterzele_testdatabase`
--
CREATE DATABASE IF NOT EXISTS `ksaoosterzele_testdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ksaoosterzele_testdatabase`;

-- --------------------------------------------------------

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
-- Gegevens worden geëxporteerd voor tabel `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `email`, `password`, `role_id`, `created_at`, `updated_at`) VALUES
(2, 'prive', 'prive', 'prive', 1, '2024-07-13 06:39:57', '2024-07-13 06:39:57');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `account_leaders`
--

CREATE TABLE `account_leaders` (
  `id` int(11) NOT NULL,
  `leader_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `account_roles`
--

CREATE TABLE `account_roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `account_roles`
--

INSERT INTO `account_roles` (`id`, `name`) VALUES
(1, 'leider');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `collages`
--

CREATE TABLE `collages` (
  `id` int(11) NOT NULL,
  `internal_name` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `collages`
--

INSERT INTO `collages` (`id`, `internal_name`, `display_name`, `description`, `date`, `active`) VALUES
(10, 'polll', 'Iaaa', NULL, '2024-07-13', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `collage_collage_types`
--

CREATE TABLE `collage_collage_types` (
  `id` int(11) NOT NULL,
  `collage_id` int(11) NOT NULL,
  `collage_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `collage_collage_types`
--

INSERT INTO `collage_collage_types` (`id`, `collage_id`, `collage_type_id`) VALUES
(6, 10, 2);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `collage_types`
--

CREATE TABLE `collage_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `collage_types`
--

INSERT INTO `collage_types` (`id`, `name`) VALUES
(1, 'kamp'),
(2, 'vergaderingen'),
(3, 'evenementen');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  `image_file_name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `entryprice` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `location`, `datetime`, `image_file_name`, `url`, `featured`, `entryprice`) VALUES
(1, 'erghsqh', 'srdh', 'rsdh', '2024-06-28 18:59:33', 'drhs', 'drhs', 1, 'drh'),
(3, 'test', NULL, NULL, '2024-07-06 18:00:00', NULL, NULL, 0, NULL),
(4, 'test', NULL, 'test', '2024-07-06 18:00:00', 'Wiskunde.png', NULL, 0, NULL),
(12, 'Emile feest', 'Er is een nieuw feest van Emile, dit feest zal doorgaan de 15 februari om eslbgiesb osehoig esgb eosi bgqoisemb gioseg oimsegqmo igbseiom ', 'Den Amb8', '2024-07-18 18:00:00', 'Wiskunde.png', 'emilecaron.be', 1, '8'),
(14, 'gese', NULL, NULL, '2024-07-20 18:00:00', NULL, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_age` int(11) NOT NULL,
  `end_age` int(11) NOT NULL,
  `description` text NOT NULL,
  `age_range` varchar(255) NOT NULL,
  `image_file_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `groups`
--

INSERT INTO `groups` (`id`, `name`, `start_age`, `end_age`, `description`, `age_range`, `image_file_name`) VALUES
(1, 'Leeuwkes', 6, 9, 'De jongste leden van onze beweging noemen we de Leeuwkes. KSA betekent voor hen spelen, spelen en nog eens spelen. Ze kunnen zich op elke activiteit verwonderen over de nieuwe ervaringen die ze opdoen. Hun levendige fantasie zorgt ervoor dat ze op reis kunnen naar eender waar, met eender wie, om eender welk probleem op te lossen. Leiers zijn tijdens deze reizen hun troost en toeverlaat.', 'Leeuwkes: 6 tot 9 jaar (1ste, 2de en 3e leerjaar)', 'leeuwkes.png'),
(2, 'Jongknapen', 9, 11, 'De Jongknapen vinden in KSA vooral actie en spanning. Ze mogen zelf al eens het initiatief nemen om de activiteiten wat op te vullen, al houdt de leiding wel steeds een oogje in het zeil. Ze zijn de waaghalzen van KSA, die graag in competitie treden met elkaar. In de jeugdbeweging mogen ze echt bij de groep te horen en nieuwe vrienden leren kennen.', 'Jongknapen: 9 tot 11 jaar (4de en 5de leerjaar)', 'jongknapen.png'),
(3, 'Knapen', 11, 14, 'De leden van 12 tot 14 jaar heten in KSA de Knapen. Ze zijn stilaan \'groot\' geworden en mogen de echte wereld gaan verkennen. Ze gebruiken de vrijheid die ze genieten als pubers om op avontuur te trekken. Ook in KSA kunnen ze met vanalles gaan experimenteren. Deze groep avonturiers is al redelijk zelfstandig geworden in al wat ze doen. Aangezien Knapen volop zichzelf aan het ontdekken zijn, leidt dit geregeld eens tot kleine crisissen waar de leider als moderator nodig is. De activiteiten worden al heel wat avontuurlijker en de vriendengroep heel wat hechter.', 'Knapen: 11 tot 14 jaar (6de leerjaar, 1ste en 2de middelbaar)', 'knapen.png'),
(4, 'Jonghernieuwers', 14, 16, 'KSA wordt voor de Jonghernieuwers een ontmoetingsplaats met vrienden. Ze zullen soms willen stilzitten om wat gezellig te babbelen, maar trekken er even graag eens samen op uit om de meest uiteenlopende stunten te beleven. De leiders zetten activiteiten op die een uitdaging vormen voor de leden en hen uitnodigen om samen te werken om hun doel te bereiken. Hierbij wordt al heel wat verantwoordelijkheid doorgespeeld naar de leden zelf en mag de groep geregeld zelf één en ander organiseren. In KSA mogen ze zichzelf zijn, los van de doordeweekse verplichtingen en verwachtingen.', 'Jonghernieuwers: 14 tot 16 jaar (3de, 4de en 5de middelbaar)', 'jonghernieuwers.png');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `leaders`
--

CREATE TABLE `leaders` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image_file_name` varchar(255) DEFAULT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `leaders`
--

INSERT INTO `leaders` (`id`, `first_name`, `last_name`, `birthdate`, `phone_number`, `email`, `image_file_name`, `role_id`) VALUES
(1, 'Emile', 'Caron', '2024-07-09', NULL, NULL, '', 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `leader_places`
--

CREATE TABLE `leader_places` (
  `id` int(11) NOT NULL,
  `leader_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `working_year_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `leader_places`
--

INSERT INTO `leader_places` (`id`, `leader_id`, `group_id`, `working_year_id`) VALUES
(13, 1, 2, 12),
(16, 1, 4, 13),
(17, 1, 1, 14),
(18, 1, 3, 15);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `leader_roles`
--

CREATE TABLE `leader_roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `leader_roles`
--

INSERT INTO `leader_roles` (`id`, `name`) VALUES
(1, 'leiding'),
(2, 'bondsleiding'),
(3, 'oudleiding'),
(4, 'passief leiding');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `registrations`
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
  `second_email` varchar(255) DEFAULT NULL,
  `allow_media` tinyint(4) NOT NULL,
  `working_year_id` int(11) DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `registrations`
--

INSERT INTO `registrations` (`id`, `group_id`, `first_name`, `last_name`, `birthdate`, `gender`, `birthplace`, `parent_first_name`, `parent_last_name`, `address`, `postal_code`, `town`, `phone_number`, `telephone_number`, `email`, `second_parent_first_name`, `second_parent_last_name`, `second_address`, `second_postal_code`, `second_town`, `second_phone_number`, `second_telephone_number`, `second_email`, `allow_media`, `working_year_id`, `updated_at`, `created_at`) VALUES
(1, 2, 'Emile', 'Caron', '2010-06-01', 'M', 'oosterzele', 'Ann', 'De Winter', 'testadres 16', '9860', 'Oosterzele', '0412345678', NULL, 'caron.emile@telenet.be', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2024-07-01 19:35:41', '2024-07-01 15:34:30');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `working_years`
--

CREATE TABLE `working_years` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_year` smallint(6) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `working_years`
--

INSERT INTO `working_years` (`id`, `name`, `start_year`, `created_at`, `updated_at`) VALUES
(12, 'Werkjaar 2024-2025', 2024, '2024-07-19 21:33:00', '2024-07-19 21:33:00'),
(13, 'Werkjaar 2025-2026', 2025, '2024-07-19 21:39:45', '2024-07-19 21:39:45'),
(14, 'Werkjaar 2026-2027', 2026, '2024-07-19 21:48:37', '2024-07-19 21:48:37'),
(15, 'Werkjaar 2027-2028', 2027, '2024-07-19 21:53:07', '2024-07-19 21:53:07');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexen voor tabel `account_leaders`
--
ALTER TABLE `account_leaders`
  ADD KEY `leader_id` (`leader_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexen voor tabel `account_roles`
--
ALTER TABLE `account_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `collages`
--
ALTER TABLE `collages`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `collage_collage_types`
--
ALTER TABLE `collage_collage_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collage_id` (`collage_id`),
  ADD KEY `collage_type_id` (`collage_type_id`);

--
-- Indexen voor tabel `collage_types`
--
ALTER TABLE `collage_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `leaders`
--
ALTER TABLE `leaders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexen voor tabel `leader_places`
--
ALTER TABLE `leader_places`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leader_id` (`leader_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `working_year_id` (`working_year_id`);

--
-- Indexen voor tabel `leader_roles`
--
ALTER TABLE `leader_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `working_year_id` (`working_year_id`);

--
-- Indexen voor tabel `working_years`
--
ALTER TABLE `working_years`
  ADD PRIMARY KEY (`id`);



CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `leader_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `remarks` text DEFAULT NULL,
  `working_year_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leader_id` (`leader_id`),
  ADD KEY `working_year_id` (`working_year_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`leader_id`) REFERENCES `leaders` (`id`),
  ADD CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`working_year_id`) REFERENCES `working_years` (`id`);
COMMIT;

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `account_roles`
--
ALTER TABLE `account_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT voor een tabel `collages`
--
ALTER TABLE `collages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT voor een tabel `collage_collage_types`
--
ALTER TABLE `collage_collage_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT voor een tabel `collage_types`
--
ALTER TABLE `collage_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT voor een tabel `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `leaders`
--
ALTER TABLE `leaders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT voor een tabel `leader_places`
--
ALTER TABLE `leader_places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT voor een tabel `leader_roles`
--
ALTER TABLE `leader_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT voor een tabel `working_years`
--
ALTER TABLE `working_years`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `account_roles` (`id`);

--
-- Beperkingen voor tabel `account_leaders`
--
ALTER TABLE `account_leaders`
  ADD CONSTRAINT `account_leaders_ibfk_1` FOREIGN KEY (`leader_id`) REFERENCES `leaders` (`id`),
  ADD CONSTRAINT `account_leaders_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

--
-- Beperkingen voor tabel `collage_collage_types`
--
ALTER TABLE `collage_collage_types`
  ADD CONSTRAINT `collage_collage_types_ibfk_1` FOREIGN KEY (`collage_id`) REFERENCES `collages` (`id`),
  ADD CONSTRAINT `collage_collage_types_ibfk_2` FOREIGN KEY (`collage_type_id`) REFERENCES `collage_types` (`id`);

--
-- Beperkingen voor tabel `leaders`
--
ALTER TABLE `leaders`
  ADD CONSTRAINT `leaders_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `leader_roles` (`id`);

--
-- Beperkingen voor tabel `leader_places`
--
ALTER TABLE `leader_places`
  ADD CONSTRAINT `leader_places_ibfk_1` FOREIGN KEY (`leader_id`) REFERENCES `leaders` (`id`),
  ADD CONSTRAINT `leader_places_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  ADD CONSTRAINT `leader_places_ibfk_3` FOREIGN KEY (`working_year_id`) REFERENCES `working_years` (`id`);

--
-- Beperkingen voor tabel `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  ADD CONSTRAINT `registrations_ibfk_2` FOREIGN KEY (`working_year_id`) REFERENCES `working_years` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
