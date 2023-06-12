-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 19, 2023 lúc 02:05 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tttotnghiep`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ward`
--

CREATE TABLE `ward` (
  `id` int(10) UNSIGNED NOT NULL,
  `_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `_prefix` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `_province_id` int(10) UNSIGNED DEFAULT NULL,
  `_district_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `ward`
--

INSERT INTO `ward` (`id`, `_name`, `_prefix`, `_province_id`, `_district_id`) VALUES
(914, 'Hòa An', 'Phường', 3, 55),
(915, 'Hòa Phát', 'Phường', 3, 55),
(916, 'Hòa Thọ Đông', 'Phường', 3, 55),
(917, 'Hòa Thọ Tây', 'Phường', 3, 55),
(918, 'Hòa Xuân', 'Phường', 3, 55),
(919, 'Khuê Trung', 'Phường', 3, 55),
(920, ' Hải Châu I', 'Phường', 3, 56),
(921, ' Hòa Thuận Đông', 'Phường', 3, 56),
(922, 'Bình Hiên', 'Phường', 3, 56),
(923, 'Bình Thuận', 'Phường', 3, 56),
(924, 'Hải Châu II', 'Phường', 3, 56),
(925, 'Hòa Cường Bắc', 'Phường', 3, 56),
(926, 'Hòa Cường Nam', 'Phường', 3, 56),
(927, 'Hòa Thuận Tây', 'Phường', 3, 56),
(928, 'Nam Dương', 'Phường', 3, 56),
(929, 'Phước Ninh', 'Phường', 3, 56),
(930, 'Thạch Thang', 'Phường', 3, 56),
(931, 'Thanh Bình', 'Phường', 3, 56),
(932, 'Thuận Phước', 'Phường', 3, 56),
(933, 'Hòa Bắc', 'Phường', 3, 57),
(934, 'Hòa Châu', 'Phường', 3, 57),
(935, 'Hòa Khương', 'Phường', 3, 57),
(936, 'Hòa Liên', 'Phường', 3, 57),
(937, 'Hòa Nhơn', 'Phường', 3, 57),
(938, 'Hòa Ninh', 'Xã', 3, 57),
(939, 'Hòa Phong', 'Xã', 3, 57),
(940, 'Hòa Phú', 'Xã', 3, 57),
(941, 'Hòa Phước', 'Xã', 3, 57),
(942, 'Hòa Sơn', 'Xã', 3, 57),
(943, 'Hòa Tiến', 'Xã', 3, 57),
(944, 'Hòa Hiệp Bắc', 'Phường', 3, 59),
(945, 'Hòa Hiệp Nam', 'Phường', 3, 59),
(946, 'Hòa Khánh Bắc', 'Phường', 3, 59),
(947, 'Hòa Khánh Nam', 'Phường', 3, 59),
(948, 'Hòa Minh', 'Phường', 3, 59),
(949, ' Khuê Mỹ', 'Phường', 3, 60),
(950, 'Hòa Hải', 'Phường', 3, 60),
(951, 'Hòa Quý', 'Phường', 3, 60),
(952, 'Mỹ An', 'Phường', 3, 60),
(953, ' An Hải Bắc', 'Phường', 3, 61),
(954, 'An Hải Đông', 'Phường', 3, 61),
(955, 'An Hải Tây', 'Phường', 3, 61),
(956, 'Mân Thái', 'Phường', 3, 61),
(957, 'Nại Hiên Đông ', 'Phường', 3, 61),
(958, 'Phước Mỹ', 'Phường', 3, 61),
(959, 'Thọ Quang', 'Phường', 3, 61),
(960, 'An Khê', 'Phường', 3, 62),
(961, 'Chính Gián', 'Phường', 3, 62),
(962, 'Hòa Khê', 'Phường', 3, 62),
(963, 'Tam Thuận', 'Phường', 3, 62),
(964, 'Tân Chính', 'Phường', 3, 62),
(965, 'Thạc Gián', 'Phường', 3, 62),
(966, 'Thanh Khê Đông', 'Phường', 3, 62),
(967, 'Thanh Khê Tây', 'Phường', 3, 62),
(968, 'Thanh Lộc Đán', 'Phường', 3, 62),
(969, 'Vĩnh Trung', 'Phường', 3, 62),
(970, 'Xuân Hà', 'Phường', 3, 62);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `ward`
--
ALTER TABLE `ward`
  ADD PRIMARY KEY (`id`),
  ADD KEY `_province_id` (`_province_id`,`_district_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `ward`
--
ALTER TABLE `ward`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11284;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
