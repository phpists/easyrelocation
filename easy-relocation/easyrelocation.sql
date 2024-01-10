-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Час створення: Січ 10 2024 р., 23:09
-- Версія сервера: 10.4.26-MariaDB
-- Версія PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `easyrelocation`
--

-- --------------------------------------------------------

--
-- Структура таблиці `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `site` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `surname` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `promo` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `d_t` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
