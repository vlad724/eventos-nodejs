-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2022 at 08:32 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `desafio_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `password` varchar(255) NOT NULL,
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `id` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`estado`, `password`, `updatedAt`, `id`, `nombre`, `createdAt`) VALUES
(1, '$2a$10$WbCfuLrErc/KHhN180DaqendLUbWY1DEhh/Tu2mHY.tXnPwKojGV.', '2022-01-27 18:36:06.000000', 1, 'nulo', '2022-01-19 19:57:20.000000'),
(1, '$2a$10$vmoNwF1e4ATMyCoJ75TPu.QpPLjvUc2CUYzgMI8brnO4CaqpwJYEi', '2022-01-19 20:16:05.000000', 2, 'null', '2022-01-19 20:16:05.000000');

-- --------------------------------------------------------

--
-- Table structure for table `entradas`
--

CREATE TABLE `entradas` (
  `createdAt` date DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL,
  `comprador_nombre` varchar(255) NOT NULL,
  `mail_comprador` varchar(255) NOT NULL,
  `codigo_confirmacion` int(255) NOT NULL,
  `Eventos_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `entradas`
--

INSERT INTO `entradas` (`createdAt`, `updatedAt`, `comprador_nombre`, `mail_comprador`, `codigo_confirmacion`, `Eventos_id`) VALUES
('2022-01-28', NULL, 'vlad', 'micorreo@gmail.com', 19827, 6),
('2022-01-28', '2022-01-28', 'vladimir', 'vladimir@gmail.com', 2147483647, 6),
('2022-01-28', '2022-01-28', 'vladimir', 'vladimir@gmail.com', 2147483647, 6),
('2022-01-28', '2022-01-28', 'vladimir', 'vladimir@gmail.com', 2147483647, 6);

-- --------------------------------------------------------

--
-- Table structure for table `eventos`
--

CREATE TABLE `eventos` (
  `precio_entrada` int(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NULL DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_termino` date NOT NULL,
  `id` int(255) NOT NULL,
  `nombre_evento` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `estado_publicacion` varchar(255) NOT NULL DEFAULT 'created',
  `cantidad_entradas` int(255) NOT NULL,
  `Cliente_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `eventos`
--

INSERT INTO `eventos` (`precio_entrada`, `createdAt`, `updatedAt`, `fecha_inicio`, `fecha_termino`, `id`, `nombre_evento`, `descripcion`, `img`, `estado_publicacion`, `cantidad_entradas`, `Cliente_id`) VALUES
(12990, '2022-01-28 18:02:33.000000', '2022-01-28 18:40:26.000000', '2022-01-28', '0000-00-00', 6, '2022-01-28-azures', 'sasasa', '', 'published', 999, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_unique` (`nombre`);

--
-- Indexes for table `entradas`
--
ALTER TABLE `entradas`
  ADD KEY `Entradas_Eventos_FK` (`Eventos_id`);

--
-- Indexes for table `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Eventos_Cliente_FK` (`Cliente_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `entradas`
--
ALTER TABLE `entradas`
  ADD CONSTRAINT `Entradas_Eventos_FK` FOREIGN KEY (`Eventos_id`) REFERENCES `eventos` (`id`);

--
-- Constraints for table `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `Eventos_Cliente_FK` FOREIGN KEY (`Cliente_id`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
