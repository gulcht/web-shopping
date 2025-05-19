-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2023 at 05:43 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'อาหารจานเดียว'),
(2, 'กับข้าว'),
(3, 'ของทานเล่น'),
(4, 'ของหวาน');

-- --------------------------------------------------------

--
-- Table structure for table `orderamount`
--

CREATE TABLE `orderamount` (
  `product_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderamount`
--

INSERT INTO `orderamount` (`product_id`, `order_id`, `amount`, `user_id`) VALUES
(15, NULL, 1, 11),
(16, NULL, 1, 11),
(17, NULL, 5, 10),
(34, NULL, 1, 10),
(15, NULL, 2, 12),
(14, 39, 2, 20),
(14, 40, 1, 20),
(15, 40, 1, 20),
(16, 40, 1, 20),
(20, 42, 2, 21),
(16, 43, 1, 21),
(34, 44, 1, 21),
(15, 45, 1, 21),
(14, 46, 2, 20),
(14, 47, 2, 20),
(15, 47, 1, 20),
(8, 48, 1, 21),
(21, 48, 1, 21);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT 1,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `date`, `name`, `address`, `phone`, `status_id`, `user_id`) VALUES
(38, '2023-04-01', '231', 'dsa', '0826983620', 2, 21),
(39, '2023-04-01', '675', 'dsad', '098', 1, 20),
(40, '2023-04-01', 'yt', 'fgh', '098089', 1, 20),
(41, '2023-04-01', 'hjeg', 'njdka', '099', 2, 21),
(42, '2023-04-01', 'peter', 'bb', '0982314', 2, 21),
(43, '2023-04-01', 'ewqewq', 'eqweq09731289', '09038921', 2, 21),
(44, '2023-04-01', 'vfnab', 'hbjdgba', '09321', 1, 21),
(45, '2023-04-01', 'refsrew', 'rew', '09312', 2, 21),
(46, '2023-04-01', 'hg', 'fyu', '099', 1, 20),
(47, '2023-04-01', 'u1', '125', '001', 2, 20),
(48, '2023-04-01', 'u2', 'dbjksa', '002', 2, 21);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `image`, `price`, `category_id`) VALUES
(8, 'ข้าวโพดทอดไส้นม', 'https://img.wongnai.com/p/800x0/2021/12/13/464583a8ce4c4499a6daa661eb9b998f.jpg', 20, 3),
(14, 'ข้าวมันไก่', 'https://img.thaibuffer.com/u/2015/surauch/Cook/hit1.jpg', 40, 1),
(15, 'ผัดกะเพราหมูย่าง', 'https://img.thaibuffer.com/u/2015/surauch/Cook/hit2.jpg', 45, 1),
(16, 'ผัดกะเพราวุ้นเส้น', 'https://img.thaibuffer.com/u/2015/surauch/Cook/hit3.jpg', 40, 1),
(17, 'ผัดกะเพราไข่', 'https://img.thaibuffer.com/u/2015/surauch/Cook/hit4.jpg', 40, 1),
(18, 'ผัดกะเพราเครื่องในไก่', 'https://img.thaibuffer.com/u/2015/surauch/Cook/hit5.jpg', 45, 1),
(19, 'ข้าวหมูแดง', 'https://img.thaibuffer.com/u/2015/surauch/Cook/hit6.jpg', 45, 1),
(20, 'ข้าวหมูกรอบ', 'https://img.thaibuffer.com/u/2015/surauch/Cook/hit7.JPG', 50, 1),
(21, 'ลูกชิ้นกุ้งไร้แป้ง', 'https://img.wongnai.com/p/1600x0/2021/12/13/fd241897c3654a28a1cd8bfec90520d0.jpg', 20, 3),
(22, 'หมูแดดเดียว', 'https://img.wongnai.com/p/1600x0/2021/12/13/3c8c143b82cf449e8f90a3b4c215ed0b.jpg', 25, 3),
(23, 'ทุเรียนทอด', 'https://img.wongnai.com/p/1600x0/2021/12/13/da07b958151b40cc9305511df1332bcc.jpg', 30, 3),
(24, 'แซนด์วิชผลไม้ครีมสด', 'https://img.wongnai.com/p/1600x0/2021/12/13/41aa3e300be842d0b21fa704b89461c6.jpg', 25, 3),
(25, 'ขนมโตเกียว(เค็ม)', 'https://img.wongnai.com/p/1600x0/2021/12/13/c5507bfecf8d4dc6a5a815e4e62ba40a.jpg', 10, 3),
(26, 'กล้วยแขก', 'https://img.wongnai.com/p/1600x0/2021/12/13/c729630790af4e5eafb3486a5bf6705d.jpg', 20, 3),
(27, 'วาฟเฟิลกล้วยช็อกโกแลต', 'https://img.wongnai.com/p/1920x0/2018/07/16/ffeec4faa9394fda9a864201cdc1939b.jpg', 35, 4),
(28, 'ชีสเค้กซูเฟล', 'https://img.wongnai.com/p/l/2017/08/25/73df1f83459641c1abc173d1d995b434.jpg', 35, 4),
(29, 'ชีสเค้กมันม่วง', 'https://img.wongnai.com/p/1920x0/2018/09/03/b79c3a5d5983499f9a60661769b2b86f.jpg', 35, 4),
(30, 'ทาร์ตผลไม้', 'https://img.wongnai.com/p/1920x0/2019/02/04/ce92bd2bd5c44a62b75921927cb42ef9.jpg', 30, 4),
(31, 'ทาร์ตบราวนี', 'https://img.wongnai.com/p/1920x0/2019/01/28/84e7ba5d632940bb81506e15bfef2150.jpg', 30, 4),
(32, 'คุกกี้นมข้นหวาน', 'https://img.wongnai.com/p/1920x0/2019/02/17/6829b1f7d51645a5a1de2d035e56f54c.jpg', 25, 4),
(33, 'ชีสทาร์ตมะยงชิด', 'https://img.wongnai.com/p/1920x0/2019/04/08/22a29a6afeba4310a371b788084d7555.jpg', 30, 4),
(34, ' แกงส้มผักรวมกุ้งสด', 'https://img.wongnai.com/p/l/2017/08/03/5748df150f8e495992b845c5066f26af.jpg', 40, 2),
(35, 'เต้าหู้ไข่น้ำแดง', 'https://img.wongnai.com/p/1920x0/2019/08/09/38e7effed12846dda8803c5fb51bf539.jpg', 35, 2),
(36, 'ไข่ลูกสะใภ้', 'https://img.wongnai.com/p/1920x0/2019/07/01/4a2f7fa6557a43c7b712cf5a621da859.jpg', 35, 2),
(37, 'กุ้งผัดพริกขี้หนู', 'https://img.wongnai.com/p/1920x0/2018/02/21/0e79682cafd744d18aa61f996845bf00.jpg', 40, 2),
(38, 'ผัดเปรี้ยวหวานทะเล', 'https://img.wongnai.com/p/1920x0/2021/08/24/c8a4d8909588426fb956a10a976d3cb7.jpg', 40, 2),
(39, 'ยำสามไข่', 'https://img.wongnai.com/p/1920x0/2019/07/09/e9b6615e70b64df190d3d90ccffea5a7.jpg', 35, 2),
(40, 'หมูย่างใบชะพลู', 'https://img.wongnai.com/p/1920x0/2019/06/26/75065be415354d2a8247f9c654031cd0.jpg', 40, 2),
(41, NULL, NULL, NULL, NULL),
(42, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `status_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`status_id`, `name`) VALUES
(1, 'ยังไม่ส่ง'),
(2, 'ส่งแล้ว');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `name`, `role`) VALUES
(1, 'peter@gmail.com', '$2y$10$NEMQnXaivd4AaJrY6znmGOle3KRFecru1INcrAD3NBCQGDulDBezy', 'peter', 0),
(9, 'customer@email.com', '$2y$10$p7jfu7k8d.lI8viOxGfna.YSPFgj8SpQmHE8XmmyMGTJeNsBxLoUm', 'customer', 1),
(10, 'test@email.com', '$2y$10$00I9/fr6u5AKIMIVcBkEoeOXdmGqrpIY7mKUIdG8baeQWGUOKq2om', 'Test', 1),
(11, 'test2@email.com', '$2y$10$TElDwinv/MzLlyP4rItnIOFEwlLyUdGIS4pnFRm4ZOX1KnztlVOVa', 'dsa', 1),
(12, 'sad@dawd.com', '$2y$10$.gWaPCylLfgTCI2/YwT73.rU39A4UlXraJVKZgtG97idiN/hG1R5m', 'weq', 0),
(20, 'customer2@dsad.com', '$2y$10$iJRk6JcZpYuz8TyHmX5LL.A6aSi7jlN0oN6RQmR5nFa6YQQ5OJCwW', 'customer', 1),
(21, '1234@dsa.com', '$2y$10$VlZQdubTLlRuR/q8C1o72u1SjJzqK3wfXbKkoxUsdFWg6NN/wQ5mS', '1234@dsa.com', 1),
(22, '', '$2y$10$2urPjKRAb7RI3iCapjLi9Ob2tUikfiSaaqF8lIZi/u7jKl8ZwcP/S', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `orderamount`
--
ALTER TABLE `orderamount`
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderamount`
--
ALTER TABLE `orderamount`
  ADD CONSTRAINT `orderamount_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderamount_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `orderamount_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
