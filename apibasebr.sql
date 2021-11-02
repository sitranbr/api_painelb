-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 02-Nov-2021 às 15:01
-- Versão do servidor: 8.0.27-0ubuntu0.20.04.1
-- versão do PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `apibasebr`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `checklist`
--

CREATE TABLE `checklist` (
  `id` int NOT NULL,
  `checklist_id` bigint NOT NULL,
  `driver` text,
  `team_service` text,
  `plate` text NOT NULL,
  `prisma` text NOT NULL,
  `check_date` text,
  `departure_time` text,
  `return_time` text,
  `km_departure` text,
  `km_return` text,
  `output_fuel_quantity` text,
  `return_fuel_quantity` text,
  `carpet` tinyint(1) DEFAULT NULL,
  `tire_iron` tinyint(1) DEFAULT NULL,
  `triangue` tinyint(1) DEFAULT NULL,
  `monkey` tinyint(1) DEFAULT NULL,
  `front_lighting_system` tinyint(1) DEFAULT NULL,
  `back_lighting_system` tinyint(1) DEFAULT NULL,
  `sirene` tinyint(1) DEFAULT NULL,
  `flashing` tinyint(1) DEFAULT NULL,
  `supply_card` tinyint(1) DEFAULT NULL,
  `crlv` tinyint(1) DEFAULT NULL,
  `glacier` tinyint(1) DEFAULT NULL,
  `etilometer` tinyint(1) DEFAULT NULL,
  `pneus` tinyint(1) DEFAULT NULL,
  `stereo` tinyint(1) DEFAULT NULL,
  `cones` tinyint(1) DEFAULT NULL,
  `cones_quantities` text,
  `super_cones` tinyint(1) DEFAULT NULL,
  `super_cones_quantities` text,
  `new_jersey` tinyint(1) DEFAULT NULL,
  `new_jersey_quantities` text,
  `handle` tinyint(1) DEFAULT NULL,
  `handle_quantities` text NOT NULL,
  `users_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `checklist`
--

INSERT INTO `checklist` (`id`, `checklist_id`, `driver`, `team_service`, `plate`, `prisma`, `check_date`, `departure_time`, `return_time`, `km_departure`, `km_return`, `output_fuel_quantity`, `return_fuel_quantity`, `carpet`, `tire_iron`, `triangue`, `monkey`, `front_lighting_system`, `back_lighting_system`, `sirene`, `flashing`, `supply_card`, `crlv`, `glacier`, `etilometer`, `pneus`, `stereo`, `cones`, `cones_quantities`, `super_cones`, `super_cones_quantities`, `new_jersey`, `new_jersey_quantities`, `handle`, `handle_quantities`, `users_id`) VALUES
(22, 1626534359613, 'Amauri Lopes', 'ALFA', 'QDT3455', 'DT0456', '2021-07-17', '12:5', '22:0', '12000', '12500', '2/4 fuel', 'Full tank', 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, '5', 0, '', 0, '', 1, '', 1),
(23, 1626790871885, 'ERINALDO JOSÉ', 'DELTA', 'OTF3455', 'DT3455', '2021-07-20', '11:21', '', '12300', '12600', '2/4 fuel', 'Full tank', 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, '6', 0, '', 0, '', 1, '3', 1),
(24, 1627305016759, 'MARIVALDO NOGUEIRA', 'DELTA', 'QDB4566', 'DT3455', '2021-07-26', '10:10', '10:0', '12300', '12680', '2/4 de combustível', '3/4 de combustível', 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, '6', 0, '', 0, '', 1, '', 1627591108838),
(25, 1627607615007, 'Sandro Araújo', 'DELTA', 'QVE5170', 'DT 0450', '2021-07-29', '22:10', '9:50', '69662', '69738', '3/4 de combustível', '2/4 de combustível', 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, '6', 0, '', 0, '', 1, '', 1627591108838),
(26, 1628343082190, 'Carla sema', 'DELTA', 'PDB3455', 'DT0456', '2021-08-07', '10:31', '', '59564', '', '3/4 de combustível', '', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, '6', 0, '', 0, '', 1, '1', 1627591108838),
(27, 1629164658888, 'Sandro Araújo costa', 'FOX', 'QVE5170', 'DT0450', '2021-08-16', '22:44', '', '71814', '', '3/4 de combustível', '', 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, '4', 0, '', 0, '', 1, '', 1627591108838),
(28, 1634062335913, 'SANDRO ARAÚJO', 'DELTA', 'ODF3455', 'DT3455', '2021-10-12', '22:12', '', '12322', '', '3/4 de combustível', '2/4 de combustível', 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, '6', 0, '', 0, '', 1, '2', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `checklist_photos`
--

CREATE TABLE `checklist_photos` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `photo_id` bigint NOT NULL,
  `photo` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `checklist_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `checklist_photos`
--

INSERT INTO `checklist_photos` (`id`, `name`, `photo_id`, `photo`, `checklist_id`) VALUES
(55, '1626534460489_JPEG_1626534453595.jpg', 1626534460489, 'http://api.sistran.app.br/uploads/checklist/1626534359613/1626534460489_JPEG_1626534453595.jpg', 1626534359613),
(56, '1626534470118_JPEG_1626534464906.jpg', 1626534470118, 'http://api.sistran.app.br/uploads/checklist/1626534359613/1626534470118_JPEG_1626534464906.jpg', 1626534359613),
(70, '1626790966895_JPEG_1626790960228.jpg', 1626790966895, 'http://api.sistran.app.br/uploads/checklist/1626790871885/1626790966895_JPEG_1626790960228.jpg', 1626790871885),
(71, '1626790977581_JPEG_1626790972222.jpg', 1626790977581, 'http://api.sistran.app.br/uploads/checklist/1626790871885/1626790977581_JPEG_1626790972222.jpg', 1626790871885),
(74, '1627305082045_JPEG_1627305076101.jpg', 1627305082045, 'http://api.sistran.app.br/uploads/checklist/1627305016759/1627305082045_JPEG_1627305076101.jpg', 1627305016759),
(75, '1627601428554_JPEG_1627601421167.jpg', 1627601428554, 'http://api.sistran.app.br/uploads/checklist/1627305016759/1627601428554_JPEG_1627601421167.jpg', 1627305016759),
(79, '1627607807873_JPEG_1627607792945.jpg', 1627607807873, 'http://api.sistran.app.br/uploads/checklist/1627607615007/1627607807873_JPEG_1627607792945.jpg', 1627607615007),
(80, '1627607979346_JPEG_1627607971557.jpg', 1627607979346, 'http://api.sistran.app.br/uploads/checklist/1627607615007/1627607979346_JPEG_1627607971557.jpg', 1627607615007),
(81, '1628343201282_JPEG_1628343193789.jpg', 1628343201282, 'http://api.sistran.app.br/uploads/checklist/1628343082190/1628343201282_JPEG_1628343193789.jpg', 1628343082190),
(85, '1629164816358_JPEG_1629164809420.jpg', 1629164816358, 'http://api.sistran.app.br/uploads/checklist/1629164658888/1629164816358_JPEG_1629164809420.jpg', 1629164658888),
(86, '1634062436806_IMG_20211012_115457805.jpg', 1634062436806, 'http://api.sistran.app.br/uploads/checklist/1634062335913/1634062436806_IMG_20211012_115457805.jpg', 1634062335913);

-- --------------------------------------------------------

--
-- Estrutura da tabela `occurrence`
--

CREATE TABLE `occurrence` (
  `id` int NOT NULL,
  `occurrence_id` bigint NOT NULL,
  `has_victim` tinyint(1) DEFAULT NULL,
  `has_witness` tinyint(1) DEFAULT NULL,
  `occurrence_type` varchar(50) DEFAULT NULL,
  `address` varchar(80) NOT NULL,
  `perimeter` varchar(15) DEFAULT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(10) NOT NULL,
  `description` text,
  `users_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `occurrence`
--

INSERT INTO `occurrence` (`id`, `occurrence_id`, `has_victim`, `has_witness`, `occurrence_type`, `address`, `perimeter`, `date`, `time`, `description`, `users_id`) VALUES
(24, 1624468552741, 1, 0, 'Via interditada', 'ROD. BR 316', 'Km 1 ao 4', '2021-06-23', '14:15', 'Acidente sem vítima', 1),
(25, 1626791182478, 0, 0, 'Pane mecânica', 'Rod. PA 243, KM 12, crescente', 'Km 12 ao 18', '2021-07-20', '11:26', 'Veículo com pane seca em cima da ponte do acará', 1),
(26, 1627312021049, 1, 1, 'Colisão', 'ROD. BR 316', 'Km 1 ao 4', '2021-07-26', '15:26', 'Veículo avançou o sinal azul', 1),
(27, 1634043098517, 1, 0, 'Tombamento', 'Rod. BR 316, Km 18, crescente', 'Km 12 ao 18', '2021-10-12', '9:30', 'Colisão frontal.', 1),
(28, 1634043098517, 1, 0, 'Tombamento', 'Rod. BR 316, Km 18, crescente', 'Km 12 ao 18', '2021-10-12', '9:30', 'Colisão frontal.', 1),
(29, 1634043098517, 1, 0, 'Tombamento', 'Rod. BR 316, Km 18, crescente', 'Km 12 ao 18', '2021-10-12', '9:30', 'Colisão frontal.', 1),
(31, 1634158287325, 1, 0, 'Colisão', 'Rod. BR 316, Km 8, crecente', 'Km 8 ao 12', '2021-10-13', '17:51', 'Colisão frontal de pequena monta. Condutores orientados e liberados.', 1),
(32, 1634354120131, 1, 0, 'Colisão', 'ROD. BR 316, KM 5', 'Km 1 ao 4', '2021-10-16', '11:0', 'Motociclista colidiu na traseira da caçamba.', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `occurrence_photos`
--

CREATE TABLE `occurrence_photos` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `photo_id` bigint NOT NULL,
  `photo` text,
  `occurrence_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `occurrence_photos`
--

INSERT INTO `occurrence_photos` (`id`, `name`, `photo_id`, `photo`, `occurrence_id`) VALUES
(175, '1626791335455_JPEG_1626791329116.jpg', 1626791335455, 'http://api.sistran.app.br/uploads/occurrence/1626791182478/1626791335455_JPEG_1626791329116.jpg', 1626791182478),
(181, '1624468730009_JPEG_1624468721829.jpg', 1624468730009, 'http://api.sistran.app.br/uploads/occurrence/1624468552741/1624468730009_JPEG_1624468721829.jpg', 1624468552741),
(182, '1624468741097_JPEG_1624468737167.jpg', 1624468741097, 'http://api.sistran.app.br/uploads/occurrence/1624468552741/1624468741097_JPEG_1624468737167.jpg', 1624468552741),
(183, '1626529006154_JPEG_1626528998782.jpg', 1626529006154, 'http://api.sistran.app.br/uploads/occurrence/1624468552741/1626529006154_JPEG_1626528998782.jpg', 1624468552741),
(184, '1627312287937_JPEG_1627312280194.jpg', 1627312287937, 'http://api.sistran.app.br/uploads/occurrence/1627312021049/1627312287937_JPEG_1627312280194.jpg', 1627312021049),
(185, '1627312296784_JPEG_1627312293010.jpg', 1627312296784, 'http://api.sistran.app.br/uploads/occurrence/1627312021049/1627312296784_JPEG_1627312293010.jpg', 1627312021049),
(186, '1627400310887_JPEG_1627400303724.jpg', 1627400310887, 'http://api.sistran.app.br/uploads/occurrence/1627312021049/1627400310887_JPEG_1627400303724.jpg', 1627312021049),
(193, '1634059980888_IMG_20211012_115349983_BURST000_COVER_TOP.jpg', 1634059980888, 'http://api.sistran.app.br/uploads/occurrence/1634043098517/1634059980888_IMG_20211012_115349983_BURST000_COVER_TOP.jpg', 1634043098517),
(194, '1634059980888_IMG_20211012_115349983_BURST000_COVER_TOP.jpg', 1634059980888, 'http://api.sistran.app.br/uploads/occurrence/1634043098517/1634059980888_IMG_20211012_115349983_BURST000_COVER_TOP.jpg', 1634043098517),
(195, '1634059980888_IMG_20211012_115349983_BURST000_COVER_TOP.jpg', 1634059980888, 'http://api.sistran.app.br/uploads/occurrence/1634043098517/1634059980888_IMG_20211012_115349983_BURST000_COVER_TOP.jpg', 1634043098517),
(196, '1634059971779_IMG_20211012_115457805.jpg', 1634059971779, 'http://api.sistran.app.br/uploads/occurrence/1634043098517/1634059971779_IMG_20211012_115457805.jpg', 1634043098517),
(197, '1634059971779_IMG_20211012_115457805.jpg', 1634059971779, 'http://api.sistran.app.br/uploads/occurrence/1634043098517/1634059971779_IMG_20211012_115457805.jpg', 1634043098517),
(198, '1634059971779_IMG_20211012_115457805.jpg', 1634059971779, 'http://api.sistran.app.br/uploads/occurrence/1634043098517/1634059971779_IMG_20211012_115457805.jpg', 1634043098517),
(204, '1634354388890_IMG-20211016-WA0000.jpg', 1634354388890, 'http://api.sistran.app.br/uploads/occurrence/1634354120131/1634354388890_IMG-20211016-WA0000.jpg', 1634354120131),
(205, '1634354396930_IMG-20211015-WA0081.jpg', 1634354396930, 'http://api.sistran.app.br/uploads/occurrence/1634354120131/1634354396930_IMG-20211015-WA0081.jpg', 1634354120131),
(206, '1634158557665_JPEG_1634158552318.jpg', 1634158557665, 'http://api.sistran.app.br/uploads/occurrence/1634158287325/1634158557665_JPEG_1634158552318.jpg', 1634158287325),
(207, '1634354685993_JPEG_1629164809420.jpg', 1634354685993, 'http://api.sistran.app.br/uploads/occurrence/1634158287325/1634354685993_JPEG_1629164809420.jpg', 1634158287325);

-- --------------------------------------------------------

--
-- Estrutura da tabela `occurrence_type`
--

CREATE TABLE `occurrence_type` (
  `id` int NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `occurrence_type`
--

INSERT INTO `occurrence_type` (`id`, `name`) VALUES
(1, 'Atropelamento de pedestre'),
(2, 'Atropelamento de animal'),
(3, 'Capotamento'),
(4, 'Colisão'),
(5, 'Tombamento'),
(6, 'Abalroamento'),
(7, 'Choque'),
(8, 'Pane mecânica'),
(9, 'Pane seca'),
(10, 'Veículo pegando fogo'),
(11, 'Animal vivo na via'),
(12, 'Animal morto na via'),
(13, 'Via interditada'),
(14, 'Recapeamento de via'),
(15, 'Trecho em obra'),
(16, 'Protesto'),
(17, 'Outros');

-- --------------------------------------------------------

--
-- Estrutura da tabela `occurrence_victim`
--

CREATE TABLE `occurrence_victim` (
  `id` int NOT NULL,
  `victim_id` bigint NOT NULL,
  `name` varchar(50) NOT NULL,
  `genre` varchar(10) NOT NULL,
  `document_type` varchar(20) NOT NULL,
  `document_number` varchar(15) NOT NULL,
  `address` varchar(80) NOT NULL,
  `status_victim` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `occurrence_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `occurrence_victim`
--

INSERT INTO `occurrence_victim` (`id`, `victim_id`, `name`, `genre`, `document_type`, `document_number`, `address`, `status_victim`, `occurrence_id`) VALUES
(41, 1624468680948, 'Italo Gonçalves', 'Maculino', 'CNH', '2435565556', 'Av. conselheiro, 456', 'Leve', 1624468552741),
(42, 1627312191632, 'Antônio Jorge', 'Maculino', 'RG', '23555', 'Rod. Senador Lemos, 345', 'Leve', 1627312021049),
(43, 1627565523170, 'AMADEU SILVERADO', 'Maculino', 'FUNCIONAL', '234555', 'Rod. BR 316, 566', 'Grave', 1627312021049),
(47, 1634059915993, 'JOSÉ INÁCIO', 'Maculino', 'CNH', '12323443445', 'Rua da providencia, 23', 'Leve', 1634043098517),
(48, 1634059915993, 'JOSÉ INÁCIO', 'Maculino', 'CNH', '12323443445', 'Rua da providencia, 23', 'Leve', 1634043098517),
(49, 1634059915993, 'JOSÉ INÁCIO', 'Maculino', 'CNH', '12323443445', 'Rua da providencia, 23', 'Leve', 1634043098517),
(53, 1634354343925, 'Marielson Lima', 'Maculino', 'CNH', '24455566', 'Rod. PA 234, km 34', 'Fatal', 1634354120131),
(54, 1634158483335, 'LIOMEL MESSI LANA', 'Maculino', 'CNH', '03456545677', 'Conj. Julia Sefer, qd 13, rua 12', 'Leve', 1634158287325);

-- --------------------------------------------------------

--
-- Estrutura da tabela `occurrence_witness`
--

CREATE TABLE `occurrence_witness` (
  `id` int NOT NULL,
  `witness_id` bigint NOT NULL,
  `name` varchar(50) NOT NULL,
  `document_type` varchar(100) NOT NULL,
  `document_number` varchar(15) NOT NULL,
  `address` varchar(80) NOT NULL,
  `occurrence_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `occurrence_witness`
--

INSERT INTO `occurrence_witness` (`id`, `witness_id`, `name`, `document_type`, `document_number`, `address`, `occurrence_id`) VALUES
(21, 1627312245395, 'Marildo Lemos', 'RG', '2355', 'Av. Serzedelo Correa, 345', 1627312021049);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `users_id` bigint DEFAULT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `name` text NOT NULL,
  `cpf` text NOT NULL,
  `my_team` text NOT NULL,
  `service_team` text NOT NULL,
  `sector` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `users_id`, `email`, `password`, `name`, `cpf`, `my_team`, `service_team`, `sector`) VALUES
(11, 1, 'b@gmail.com', '202cb962ac59075b964b07152d234b70', 'Andorinhas', '', 'Charlie', 'Bravo', 'detran'),
(12, 1618929787682, 'rimon.rsa@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Salauddin Gazi', 'ok', 'ok', 'ok', 'ok'),
(13, 1627591108838, 'beldata@gmail.com', 'cfe5547fb85ed0217277411f02f3a636', 'Sandro', '454991522', 'Bravo', 'Charlie', 'Goftc');

-- --------------------------------------------------------

--
-- Estrutura da tabela `vehicle_conductor`
--

CREATE TABLE `vehicle_conductor` (
  `id` int NOT NULL,
  `vehicle_id` bigint NOT NULL,
  `plate_vehicle` varchar(10) DEFAULT NULL,
  `doc_vehicle_type` varchar(20) NOT NULL,
  `doc_vehicle_number` varchar(15) NOT NULL,
  `vehicle_type` varchar(20) NOT NULL,
  `damage_category` varchar(20) NOT NULL,
  `vehicle_procedure` varchar(30) NOT NULL,
  `driver_name` varchar(100) DEFAULT NULL,
  `driver_document_type` varchar(30) DEFAULT NULL,
  `driver_document_number` varchar(15) DEFAULT NULL,
  `driver_procedure` varchar(30) NOT NULL,
  `occurrence_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `vehicle_conductor`
--

INSERT INTO `vehicle_conductor` (`id`, `vehicle_id`, `plate_vehicle`, `doc_vehicle_type`, `doc_vehicle_number`, `vehicle_type`, `damage_category`, `vehicle_procedure`, `driver_name`, `driver_document_type`, `driver_document_number`, `driver_procedure`, `occurrence_id`) VALUES
(150, 1626791409256, 'OTB4566', 'RENAVAM', '34555', 'Auto', 'Pequena monta', 'Others', 'Orineu Viana', 'CNH', '12456445455', 'Condutor liberado', 1626791182478),
(155, 1624468629469, 'QDT4566', 'RENAVAM', '2324555', 'Auto', 'Pequena monta', 'Others', 'Heitor Araújo', 'FUNCIONAL', '33444', 'Recusou atendimento', 1624468552741),
(156, 1624468585432, 'OTB4566', 'RENAVAM', '00000', 'Auto', 'Pequena monta', 'Held vehicle', 'Italo Gonçalves', 'CPF', '2435565556', 'Condutor liberado', 1624468552741),
(157, 1627312144085, 'OTJ4566', 'CRLV', '2355667', 'Auto', 'Pequena monta', 'Veículo entregue ao condutor', 'Antônio Jorge', 'RG', '23555', 'Avaliado e liberado', 1627312021049),
(158, 1627312067112, 'OTB3455', 'CRLV', '123456', 'Auto', 'Pequena monta', 'Veículo entregue ao condutor', 'Erasmo Carlos', 'CARTEIRA DE TRABALHO', '235555', 'Condutor liberado', 1627312021049),
(166, 1634158437375, 'OTF3455', 'CRLV', '00454566', 'Oficial', 'Pequena monta', 'Veículo entregue ao condutor', 'LIOMEL MESSI LANA', 'CNH', '03456545677', 'Condutor liberado', 1634158287325);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `checklist`
--
ALTER TABLE `checklist`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `checklist_photos`
--
ALTER TABLE `checklist_photos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `occurrence`
--
ALTER TABLE `occurrence`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `occurrence_photos`
--
ALTER TABLE `occurrence_photos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `occurrence_type`
--
ALTER TABLE `occurrence_type`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `occurrence_victim`
--
ALTER TABLE `occurrence_victim`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `occurrence_witness`
--
ALTER TABLE `occurrence_witness`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `vehicle_conductor`
--
ALTER TABLE `vehicle_conductor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `checklist`
--
ALTER TABLE `checklist`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `checklist_photos`
--
ALTER TABLE `checklist_photos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT de tabela `occurrence`
--
ALTER TABLE `occurrence`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de tabela `occurrence_photos`
--
ALTER TABLE `occurrence_photos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- AUTO_INCREMENT de tabela `occurrence_victim`
--
ALTER TABLE `occurrence_victim`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de tabela `occurrence_witness`
--
ALTER TABLE `occurrence_witness`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `vehicle_conductor`
--
ALTER TABLE `vehicle_conductor`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
