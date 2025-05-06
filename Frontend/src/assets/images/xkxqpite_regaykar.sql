-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 22, 2025 at 05:37 AM
-- Server version: 5.7.23-23
-- PHP Version: 8.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xkxqpite_regaykar`
--

-- --------------------------------------------------------

--
-- Table structure for table `assigned_pois`
--

CREATE TABLE `assigned_pois` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `poi_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assigned_pois`
--

INSERT INTO `assigned_pois` (`id`, `group_id`, `poi_id`, `created_at`, `updated_at`) VALUES
(8, 2, 45, '2025-03-20 15:18:45', '2025-03-20 15:18:45'),
(9, 2, 46, '2025-03-20 15:18:45', '2025-03-20 15:18:45'),
(10, 2, 47, '2025-03-20 15:18:45', '2025-03-20 15:18:45'),
(11, 2, 49, '2025-03-20 15:18:45', '2025-03-20 15:18:45'),
(23, 1, 2, '2025-03-27 17:16:45', '2025-03-27 17:16:45'),
(24, 1, 3, '2025-03-27 17:16:45', '2025-03-27 17:16:45'),
(25, 1, 11, '2025-03-27 17:16:45', '2025-03-27 17:16:45'),
(26, 1, 29, '2025-03-27 17:16:45', '2025-03-27 17:16:45'),
(27, 1, 54, '2025-03-27 17:16:45', '2025-03-27 17:16:45'),
(28, 1, 55, '2025-03-27 17:16:45', '2025-03-27 17:16:45'),
(29, 3, 2, '2025-04-01 18:20:10', '2025-04-01 18:20:10'),
(30, 2, 67, '2025-04-18 13:58:18', '2025-04-18 13:58:18');

-- --------------------------------------------------------

--
-- Table structure for table `assigned_servers`
--

CREATE TABLE `assigned_servers` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `server_id` int(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assigned_servers`
--

INSERT INTO `assigned_servers` (`id`, `user_id`, `server_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 48, 1, '2025-01-20 03:53:21', '2025-01-20 04:52:12', '2025-01-20 10:22:12'),
(2, 48, 1, '2025-01-20 04:52:12', '2025-01-20 04:52:12', NULL),
(3, 2, 1, '2025-01-23 01:10:35', '2025-02-10 13:56:49', '2025-02-10 07:56:49'),
(4, 2, 2, '2025-01-23 01:10:35', '2025-02-10 13:56:49', '2025-02-10 07:56:49'),
(5, 2, 1, '2025-02-10 13:56:49', '2025-02-10 13:56:49', NULL),
(6, 2, 2, '2025-02-10 13:56:49', '2025-02-10 13:56:49', NULL),
(7, 5, 1, '2025-03-28 16:17:06', '2025-03-28 16:17:06', NULL),
(8, 5, 2, '2025-03-28 16:17:06', '2025-03-28 16:17:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `description`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'divya', 'divya', 3, '2025-03-18 19:20:20', '2025-03-18 19:20:20', NULL),
(2, 'test Group', 'Test Desc', 4, '2025-03-20 15:18:45', '2025-03-20 15:18:45', NULL),
(3, 'kapil', 'kapil', 3, '2025-04-01 18:20:10', '2025-04-01 18:20:15', '2025-04-01 18:20:15');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `sale_agent_id` bigint(20) UNSIGNED NOT NULL,
  `pois_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `device_id` int(11) NOT NULL,
  `device_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `activation_date` date DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `user_id`, `plan_id`, `group_id`, `sale_agent_id`, `pois_id`, `device_id`, `device_name`, `created_at`, `updated_at`, `activation_date`, `deleted_at`) VALUES
(1, 3, 1, 1, 1, '[2,3]', 1, 'NS-Hastyar', '2025-03-19 05:00:12', '2025-03-19 05:00:12', '2025-03-18', NULL),
(2, 4, 2, 2, 5, '[45,46,47,49]', 2, 'NST- GD S1', '2025-03-21 05:00:10', '2025-03-21 05:00:10', '2025-03-20', NULL),
(3, 3, 3, 1, 1, '[2,3,11,29,54,55]', 1, 'NS-Hastyar', '2025-03-27 05:00:12', '2025-03-27 05:00:12', '2025-03-26', NULL),
(4, 3, 4, 1, 1, '[2,3,11,29,54,55]', 2, 'NST- GD S1', '2025-03-28 05:00:13', '2025-03-28 05:00:13', '2025-03-27', NULL),
(5, 4, 5, 2, 5, '[45,46,47,49]', 2, 'NST- GD S1', '2025-03-29 05:00:14', '2025-03-29 05:00:14', '2025-03-28', NULL),
(6, 4, 6, 2, 5, '[45,46,47,49]', 2, 'NST- GD S1', '2025-04-14 05:00:13', '2025-04-14 05:00:13', '2025-04-13', NULL),
(7, 3, 7, 1, 1, '[2,3,11,29,54,55]', 2869, 'ignismob', '2025-04-18 05:00:11', '2025-04-18 05:00:11', '2025-04-17', NULL),
(8, 4, 8, 2, 5, '[45,46,47,49,67]', 2, 'NST- GD S1', '2025-04-20 05:00:13', '2025-04-20 05:00:13', '2025-04-19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_12_17_185657_modify_remember_token_in_users_table', 1),
(6, '2025_01_22_062907_create_history_table', 1),
(7, '2025_01_23_054444_pois', 1),
(8, '2025_01_23_055018_groups', 1),
(9, '2025_01_23_055453_sales', 1),
(10, '2025_01_23_055718_regaykar_plans', 1),
(11, '2025_01_23_060048_assigned_pois', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'remember_token', '75aa8e2036f4dd64985ff3793e38028ba591a2dd0abda8a5971503c95229e36b', '[\"*\"]', '2025-01-23 01:09:52', NULL, '2025-01-23 01:09:51', '2025-01-23 01:09:52'),
(2, 'App\\Models\\User', 1, 'remember_token', 'a95986de41e1eaeccb913369c4988ba96f444a7c5f4238e219040ac921d63b54', '[\"*\"]', '2025-01-23 01:13:28', NULL, '2025-01-23 01:10:02', '2025-01-23 01:13:28'),
(3, 'App\\Models\\User', 3, 'remember_token', 'a2dba9e19f70095de68c332a2c841542ad4387e69e488acbda379a2ff11024c2', '[\"*\"]', '2025-01-23 01:26:13', '2025-04-07 11:44:08', '2025-01-23 01:13:58', '2025-04-07 11:44:08'),
(4, 'App\\Models\\User', 1, 'remember_token', '0815d9140eb20492335ebff47d6d13c40c13462c7bde8750d94090201ae142a3', '[\"*\"]', '2025-01-23 01:15:21', NULL, '2025-01-23 01:14:40', '2025-01-23 01:15:21'),
(5, 'App\\Models\\User', 3, 'remember_token', '77630e7cc7c0d947a7647eeda0d9c14f0dc30bd019716385f6ab11a05a30adc5', '[\"*\"]', '2025-01-23 01:54:40', '2025-04-07 11:44:08', '2025-01-23 01:54:01', '2025-04-07 11:44:08'),
(6, 'App\\Models\\User', 1, 'remember_token', '251011815b51f05735480e425ce9db3e5fb62168e5e11a9a16ee5a307ab6ecc5', '[\"*\"]', '2025-01-23 03:44:42', NULL, '2025-01-23 03:44:37', '2025-01-23 03:44:42'),
(7, 'App\\Models\\User', 1, 'remember_token', 'b4ad001c72bd813c566eee5a67773d8965b0be850e4fe95344dad8db64181a8e', '[\"*\"]', NULL, NULL, '2025-01-28 04:08:59', '2025-01-28 04:08:59'),
(8, 'App\\Models\\User', 1, 'remember_token', '1d0bd61a5e3a7250e8aac2050a0033af42b16a3b07aaac77c5118375d7c7c45d', '[\"*\"]', '2025-01-28 04:09:39', NULL, '2025-01-28 04:09:38', '2025-01-28 04:09:39'),
(9, 'App\\Models\\User', 3, 'remember_token', 'aecff8bf748278cacc190f6e34a54aff268dc2edb3dd3e9e6054488fcc910790', '[\"*\"]', '2025-01-28 04:57:49', '2025-04-07 11:44:08', '2025-01-28 04:10:11', '2025-04-07 11:44:08'),
(10, 'App\\Models\\User', 3, 'remember_token', '95e141dc9e44a1c82d48d8ba73880e65908de12f2e92355bb89b852138bc9e26', '[\"*\"]', NULL, '2025-04-07 11:44:08', '2025-01-28 04:22:02', '2025-04-07 11:44:08'),
(11, 'App\\Models\\SalesModel', 1, 'sales_token', '07ef17d8f761070ae497363867fec205cbcac5a661f4ce4c11e1d51222b81463', '[\"*\"]', '2025-01-28 04:33:08', '2025-04-07 11:44:09', '2025-01-28 04:31:10', '2025-04-07 11:44:09'),
(12, 'App\\Models\\User', 3, 'remember_token', '118a7222930a03ed9201973e49cbfe7ad2187efdd7f9594bad3af73fbf7227df', '[\"*\"]', '2025-01-28 06:22:11', '2025-04-07 11:44:08', '2025-01-28 05:30:32', '2025-04-07 11:44:08'),
(13, 'App\\Models\\User', 1, 'remember_token', 'ddce2d30210f12c46b22bba17425ef8c9abc9145bb8ecbce965302a41576feb7', '[\"*\"]', '2025-01-28 23:57:17', NULL, '2025-01-28 23:54:16', '2025-01-28 23:57:17'),
(14, 'App\\Models\\User', 1, 'remember_token', 'b48eebd8c4ddb7b8f2ebea62990cbb795a1d3b4e45e8cfebda8469d82cacedd4', '[\"*\"]', '2025-01-29 03:53:30', NULL, '2025-01-29 03:42:29', '2025-01-29 03:53:30'),
(15, 'App\\Models\\User', 3, 'remember_token', 'dca473abb6b0506d8a74fdc1a04a27a5dd23d81ecf3d733d98f9e86f15bb3960', '[\"*\"]', '2025-01-29 04:10:01', '2025-04-07 11:44:08', '2025-01-29 03:43:02', '2025-04-07 11:44:08'),
(16, 'App\\Models\\User', 2, 'remember_token', 'c589e2955a421a92a2ddd47e7dc40c6e356534026f18057aeb5e3f56d7506c4a', '[\"*\"]', '2025-01-29 04:11:10', '2025-04-14 02:17:32', '2025-01-29 03:59:21', '2025-04-14 02:17:32'),
(17, 'App\\Models\\User', 1, 'remember_token', '1c494cc9a408e1d9b394d4de0c62a001cbfa097e1162581b60ebdb2b7c983f39', '[\"*\"]', '2025-01-29 04:10:37', NULL, '2025-01-29 04:00:06', '2025-01-29 04:10:37'),
(18, 'App\\Models\\User', 3, 'remember_token', 'd47dec2e01b3419e647d8ed8138b1fed4a224530cb0afca85bb57e79fd241167', '[\"*\"]', NULL, '2025-04-07 11:44:08', '2025-01-29 04:10:37', '2025-04-07 11:44:08'),
(19, 'App\\Models\\User', 2, 'remember_token', 'dcb0449b276ed84ebe58ccff0c879076425fe1c182e92a1612957ee7b93d6824', '[\"*\"]', '2025-01-29 04:31:19', '2025-04-14 02:17:32', '2025-01-29 04:11:37', '2025-04-14 02:17:32'),
(20, 'App\\Models\\User', 2, 'remember_token', 'cf3aef4e36cf1dae0a0d7cec035988231048d2795277b68944c09b31ab2ff57c', '[\"*\"]', '2025-01-29 04:35:32', '2025-04-14 02:17:32', '2025-01-29 04:31:34', '2025-04-14 02:17:32'),
(21, 'App\\Models\\User', 3, 'remember_token', 'f0130bf61b24172ee46f9676d7262ee26fefb5036ade6a0434bab5ec2125dfa2', '[\"*\"]', NULL, '2025-04-07 11:44:08', '2025-01-29 04:33:45', '2025-04-07 11:44:08'),
(22, 'App\\Models\\User', 1, 'remember_token', '6bf16effc58f585b49db1e0bf25a96abfc88d5a387c5955d3b80354aba670af0', '[\"*\"]', '2025-01-29 04:55:31', NULL, '2025-01-29 04:35:48', '2025-01-29 04:55:31'),
(23, 'App\\Models\\User', 2, 'remember_token', 'bc6957b4428dbf94f268392048ea3721be7b6774429bbe1bd3181d696d1cbae8', '[\"*\"]', '2025-01-29 04:57:51', '2025-04-14 02:17:32', '2025-01-29 04:55:59', '2025-04-14 02:17:32'),
(24, 'App\\Models\\User', 2, 'remember_token', '67ddd1369349792f6fd598dd3f8908972fb028a380f638ede41f9c31e7599ba5', '[\"*\"]', NULL, '2025-04-14 02:17:32', '2025-01-29 05:03:11', '2025-04-14 02:17:32'),
(25, 'App\\Models\\User', 1, 'remember_token', 'c305f0770e3be8154b8ae6543e8ddf843d16161e0db22de88b8a8638414f10cb', '[\"*\"]', '2025-01-29 05:23:16', NULL, '2025-01-29 05:03:24', '2025-01-29 05:23:16'),
(26, 'App\\Models\\User', 3, 'remember_token', '90f495986331f40ced824260155cffbb77e446f773a52bc87642b1cc25d8dffe', '[\"*\"]', '2025-01-29 05:45:39', '2025-04-07 11:44:08', '2025-01-29 05:03:30', '2025-04-07 11:44:08'),
(27, 'App\\Models\\User', 1, 'remember_token', '1f16d1660a9d3352e8a6bbc8c82db30080e38d8325811f2cafc26459a096c193', '[\"*\"]', '2025-01-29 06:16:06', NULL, '2025-01-29 06:15:51', '2025-01-29 06:16:06'),
(28, 'App\\Models\\User', 2, 'remember_token', '26790a292c0594d57fa92eaa7aab97502c3f7c2728fa3864cfe2f8c7aed005c1', '[\"*\"]', '2025-01-29 06:16:33', '2025-04-14 02:17:32', '2025-01-29 06:16:28', '2025-04-14 02:17:32'),
(29, 'App\\Models\\User', 3, 'remember_token', '28a96ed22a2bd4e3a3d3b9531be7bad219b9df26bed051b6e7c5f99581177a22', '[\"*\"]', '2025-02-10 14:44:41', '2025-04-07 11:44:08', '2025-02-10 13:48:06', '2025-04-07 11:44:08'),
(30, 'App\\Models\\User', 1, 'remember_token', '746e7a7c20f022b3da89a5b3729321695d1b00383f43b2f41dab8d7b80327d46', '[\"*\"]', '2025-02-10 14:00:21', NULL, '2025-02-10 13:56:24', '2025-02-10 14:00:21'),
(31, 'App\\Models\\User', 1, 'remember_token', 'ff9294abc4dfae38fae4b4122ca8d33007cf2dac177195367999ec3081154979', '[\"*\"]', '2025-02-10 14:23:41', NULL, '2025-02-10 14:23:19', '2025-02-10 14:23:41'),
(32, 'App\\Models\\User', 3, 'remember_token', '3561362c0c67d83925b9d714fc5bf028728c4fc4a11aa3c751d368dd10400f68', '[\"*\"]', '2025-02-10 14:26:42', '2025-04-07 11:44:08', '2025-02-10 14:24:09', '2025-04-07 11:44:08'),
(33, 'App\\Models\\User', 1, 'remember_token', 'f467a5f0e50d317cf9f4fd7db193eb66e1c068ec67c810df3913db07a0c3fdac', '[\"*\"]', '2025-02-10 14:33:14', NULL, '2025-02-10 14:32:39', '2025-02-10 14:33:14'),
(34, 'App\\Models\\User', 3, 'remember_token', '4191d61cee1a77610d82c6c8564b9f2dff1111f209772c71046b18f0e31e21b0', '[\"*\"]', '2025-02-10 15:20:25', '2025-04-07 11:44:08', '2025-02-10 14:33:38', '2025-04-07 11:44:08'),
(35, 'App\\Models\\User', 1, 'remember_token', 'ab9765c7b843db0408f6afb0e286b2df6a9cb6c1f3228cfef36350359d4fd354', '[\"*\"]', '2025-02-10 14:34:14', NULL, '2025-02-10 14:34:08', '2025-02-10 14:34:14'),
(36, 'App\\Models\\User', 1, 'remember_token', '81c2d67820f9ea017e28aa131c8c6e210d520abf252e822d97b09f84dbb17352', '[\"*\"]', '2025-02-10 14:42:44', NULL, '2025-02-10 14:42:38', '2025-02-10 14:42:44'),
(37, 'App\\Models\\User', 3, 'remember_token', '00eb5b185049cf5e176872214c955cac905b6809c72097b24fd99db45f3aa3ca', '[\"*\"]', '2025-02-10 15:14:04', '2025-04-07 11:44:08', '2025-02-10 14:42:44', '2025-04-07 11:44:08'),
(38, 'App\\Models\\User', 1, 'remember_token', '0235f5ba94327aaaf05f0d6d6f1d15e4f14ebe88f3790cff174b3cd72248a1d5', '[\"*\"]', '2025-02-10 14:46:25', NULL, '2025-02-10 14:46:17', '2025-02-10 14:46:25'),
(39, 'App\\Models\\User', 3, 'remember_token', '0d7c8aa151d85098796c40c3382aea8ba078972514e9d2f222646e0f390102d5', '[\"*\"]', '2025-02-10 14:46:45', '2025-04-07 11:44:08', '2025-02-10 14:46:25', '2025-04-07 11:44:08'),
(40, 'App\\Models\\User', 1, 'remember_token', '293ce96c00b7f33d54bcbb9878fd3d9b3b6c4d8a257cca77bbf22908d58a8c23', '[\"*\"]', '2025-02-10 14:48:54', NULL, '2025-02-10 14:48:44', '2025-02-10 14:48:54'),
(41, 'App\\Models\\User', 3, 'remember_token', 'ab650d3e4297d99d670a132122e161bb2852788ffad4bd00cb9904ee0b88d021', '[\"*\"]', '2025-02-10 14:49:21', '2025-04-07 11:44:08', '2025-02-10 14:48:54', '2025-04-07 11:44:08'),
(42, 'App\\Models\\User', 1, 'remember_token', 'd41ee7153be135124358f2739d85e997733d1a98f24060bfc061f9e28ca57217', '[\"*\"]', '2025-02-10 14:57:19', NULL, '2025-02-10 14:56:08', '2025-02-10 14:57:19'),
(43, 'App\\Models\\User', 3, 'remember_token', 'e6936e5a87ea4ea78cc768b4afdfdef0a30e5ed557413e3842a2e176dfb15a73', '[\"*\"]', NULL, '2025-04-07 11:44:08', '2025-02-10 14:56:58', '2025-04-07 11:44:08'),
(44, 'App\\Models\\User', 3, 'remember_token', 'eb0ebde5eee3bc6b1b60951cc9618640fa6e72177b6ef2542eef1d40080741f0', '[\"*\"]', NULL, '2025-04-07 11:44:08', '2025-02-10 14:56:59', '2025-04-07 11:44:08'),
(45, 'App\\Models\\User', 3, 'remember_token', 'd913851d2ebfc249a7a5b220a0ec8ea06dee7cd4736c7dba2ffb36142911280a', '[\"*\"]', '2025-02-10 14:57:23', '2025-04-07 11:44:08', '2025-02-10 14:57:19', '2025-04-07 11:44:08'),
(46, 'App\\Models\\User', 1, 'remember_token', 'a73585a98814641725be2a10a1f90a652bd1a13df0d0a63ac675b278b0c9413b', '[\"*\"]', '2025-02-10 14:58:22', NULL, '2025-02-10 14:58:16', '2025-02-10 14:58:22'),
(47, 'App\\Models\\User', 3, 'remember_token', 'ad5f43ac8ae156efd2543385fe165c5f18ab24b7abc060e788ae949e934047ba', '[\"*\"]', '2025-02-10 15:00:45', '2025-04-07 11:44:08', '2025-02-10 14:58:22', '2025-04-07 11:44:08'),
(48, 'App\\Models\\User', 1, 'remember_token', 'fc994ad2df448470794b6e16d36b583d8f57c1fd860ac336077beb7dcc381dde', '[\"*\"]', '2025-02-10 15:16:50', NULL, '2025-02-10 15:08:11', '2025-02-10 15:16:50'),
(49, 'App\\Models\\User', 3, 'remember_token', 'f3bc543dbfa0ccf15622d226b4994570caf3a27b154bc5bea11c8cba894fb242', '[\"*\"]', '2025-02-10 15:15:51', '2025-04-07 11:44:08', '2025-02-10 15:08:19', '2025-04-07 11:44:08'),
(50, 'App\\Models\\User', 3, 'remember_token', 'f22c06ca9e62a237a7696f637385f8ee1bd37b6c7bb41c5d5881a3a48ac53101', '[\"*\"]', '2025-02-10 15:47:55', '2025-04-07 11:44:08', '2025-02-10 15:16:50', '2025-04-07 11:44:08'),
(51, 'App\\Models\\User', 1, 'remember_token', '70248786f55e30bf23e3e8f530e5c3043291c092cd619c8db2e424e5e289dd93', '[\"*\"]', '2025-02-10 17:13:49', NULL, '2025-02-10 17:13:48', '2025-02-10 17:13:49'),
(52, 'App\\Models\\User', 1, 'remember_token', 'a5fd8da941caea7c413d3d66d8087ffa5fcd7116b67990099cee15150eb0dd69', '[\"*\"]', '2025-02-12 12:40:14', NULL, '2025-02-12 12:40:13', '2025-02-12 12:40:14'),
(53, 'App\\Models\\User', 3, 'remember_token', 'a1bc6ebfdbaff7c9c9026e32f7bb6088ad8f2344d9449673beec23809e8d8c45', '[\"*\"]', '2025-02-13 15:57:03', '2025-04-07 11:44:08', '2025-02-13 15:29:48', '2025-04-07 11:44:08'),
(54, 'App\\Models\\User', 3, 'remember_token', '68ac7f3962532c0c80227cab3d162b405d142ed6ad2fcdf10bd0306f75fc2823', '[\"*\"]', '2025-02-14 20:30:31', '2025-04-07 11:44:08', '2025-02-14 20:30:29', '2025-04-07 11:44:08'),
(55, 'App\\Models\\User', 1, 'remember_token', '36c2660e1395f7c25859050c6d93e15cabb58865e49b51fbb9cc5bac742bd9ca', '[\"*\"]', '2025-02-14 20:32:33', NULL, '2025-02-14 20:31:17', '2025-02-14 20:32:33'),
(56, 'App\\Models\\User', 3, 'remember_token', '28129f68dc1f78e13811cd1e71f047b53fc9cc96032168decd7ab401be8b0d51', '[\"*\"]', '2025-02-14 20:34:58', '2025-04-07 11:44:08', '2025-02-14 20:32:33', '2025-04-07 11:44:08'),
(57, 'App\\Models\\User', 3, 'remember_token', '32425bdd24c79d5a5a7d0c46b0751a1fa2a29116c246058283e67b33fa94ead2', '[\"*\"]', '2025-02-15 11:12:15', '2025-04-07 11:44:08', '2025-02-15 11:07:01', '2025-04-07 11:44:08'),
(58, 'App\\Models\\User', 3, 'remember_token', '33c0f74a7cbd825b1d796a6624574a90ca8c3bac98c76d33acdea90187ba7972', '[\"*\"]', '2025-02-15 11:32:35', '2025-04-07 11:44:08', '2025-02-15 11:32:14', '2025-04-07 11:44:08'),
(59, 'App\\Models\\User', 3, 'remember_token', 'ae948d037f8c8b3450999f5ed49cb192a698278784fb46a34e19c8ee1ac746d9', '[\"*\"]', '2025-02-15 13:13:00', '2025-04-07 11:44:08', '2025-02-15 12:38:07', '2025-04-07 11:44:08'),
(60, 'App\\Models\\User', 1, 'remember_token', '483ba91732f302807bf9cc2f35c2c57c3368f63b40110ca7c57e7d34b8aec777', '[\"*\"]', '2025-02-15 17:44:15', NULL, '2025-02-15 17:43:29', '2025-02-15 17:44:15'),
(61, 'App\\Models\\User', 3, 'remember_token', '08ce0160926a7e0634080b46bb6dbe9e9f2726710e4d8a095d15642c7ab734a9', '[\"*\"]', '2025-02-15 17:44:21', '2025-04-07 11:44:08', '2025-02-15 17:44:15', '2025-04-07 11:44:08'),
(62, 'App\\Models\\User', 1, 'remember_token', '45c18011e6ee4b2d1f5b43f71d8bec777a5c908c6c871345c9b777a8f7c6f2db', '[\"*\"]', '2025-02-19 01:33:35', NULL, '2025-02-19 01:26:15', '2025-02-19 01:33:35'),
(63, 'App\\Models\\User', 3, 'remember_token', 'da986c1fa4ffa8be908e70a50fb0d97e7782e7d3077a48a258c5c1a0cb13624a', '[\"*\"]', '2025-02-19 01:34:27', '2025-04-07 11:44:08', '2025-02-19 01:27:25', '2025-04-07 11:44:08'),
(64, 'App\\Models\\User', 1, 'remember_token', '38aa4403784893df45b4dd5b247b767014473e19fa6503f57a94f98beefc2cc9', '[\"*\"]', '2025-02-19 14:53:01', NULL, '2025-02-19 14:52:03', '2025-02-19 14:53:01'),
(65, 'App\\Models\\User', 3, 'remember_token', '55268a6d6ee98f94e4b9a9d1e437c8778d53e2a08534c6235295a917e7bbcb32', '[\"*\"]', '2025-02-19 16:04:48', '2025-04-07 11:44:08', '2025-02-19 16:04:06', '2025-04-07 11:44:08'),
(66, 'App\\Models\\User', 1, 'remember_token', '5860e96e24a27b97bd0fb628b55e32d005b8a46a58cd90c2e954441a2285a9ae', '[\"*\"]', '2025-02-20 16:25:35', NULL, '2025-02-20 15:55:49', '2025-02-20 16:25:35'),
(67, 'App\\Models\\User', 3, 'remember_token', '2daaa642492dda71ff8ecd7d503f940b524583fc22ed00683de357aff4a8c801', '[\"*\"]', '2025-02-20 16:24:18', '2025-04-07 11:44:08', '2025-02-20 15:55:56', '2025-04-07 11:44:08'),
(68, 'App\\Models\\User', 3, 'remember_token', '395a0e2d549d776e31c0f79a443667de89ecbcf08985e62e83d66b10118f1186', '[\"*\"]', '2025-02-20 16:25:18', '2025-04-07 11:44:08', '2025-02-20 16:25:15', '2025-04-07 11:44:08'),
(69, 'App\\Models\\User', 3, 'remember_token', '4098ecf45ce091b3ae94d53c42f575a7b9e5954446ad6d4c4121e5a920f22aa2', '[\"*\"]', '2025-02-20 16:25:58', '2025-04-07 11:44:08', '2025-02-20 16:25:35', '2025-04-07 11:44:08'),
(70, 'App\\Models\\User', 1, 'remember_token', 'fec8f49b6fcfc175002cb33209bf7a5478cd5378799ed3658643f71f5b2dc49e', '[\"*\"]', '2025-02-20 16:50:04', NULL, '2025-02-20 16:28:46', '2025-02-20 16:50:04'),
(71, 'App\\Models\\User', 3, 'remember_token', 'f0702afc1ba203bac639dfebceb37410f47a6389e98d33b339b28d0d10bc4042', '[\"*\"]', '2025-02-20 16:31:29', '2025-04-07 11:44:08', '2025-02-20 16:28:51', '2025-04-07 11:44:08'),
(72, 'App\\Models\\User', 1, 'remember_token', 'c2916b556c31db8e1f78280645cd2187eae4d0bf9358903b71a51936ae696192', '[\"*\"]', '2025-02-20 16:29:13', NULL, '2025-02-20 16:28:59', '2025-02-20 16:29:13'),
(73, 'App\\Models\\User', 3, 'remember_token', '4b72692b5ddc1ba5d0a4b7263e5becf11b8963b6856f0867a936ffa785b44e76', '[\"*\"]', '2025-02-20 17:03:54', '2025-04-07 11:44:08', '2025-02-20 16:36:20', '2025-04-07 11:44:08'),
(74, 'App\\Models\\User', 1, 'remember_token', 'b80a038c5149d0029e54fed76879e78168008ec5cf62222465c0cfdda71e8b94', '[\"*\"]', '2025-02-20 19:08:39', NULL, '2025-02-20 19:08:33', '2025-02-20 19:08:39'),
(75, 'App\\Models\\User', 3, 'remember_token', '54b87042c01f8d4ada2a449363a42e3b3259a49f890097fa0ab35b8c1d0e4c57', '[\"*\"]', '2025-02-20 19:12:13', '2025-04-07 11:44:08', '2025-02-20 19:08:39', '2025-04-07 11:44:08'),
(76, 'App\\Models\\User', 1, 'remember_token', '05e78ab1d0f593c85fb57ceebbcd4fa150e190d662cd263f84af914014a7bdb7', '[\"*\"]', '2025-02-20 19:10:44', NULL, '2025-02-20 19:10:38', '2025-02-20 19:10:44'),
(77, 'App\\Models\\User', 3, 'remember_token', '834b0f957b3abba1a804bfb3861209859c5cd09a1bf0c969c696b8521faa2815', '[\"*\"]', '2025-02-20 19:11:28', '2025-04-07 11:44:08', '2025-02-20 19:10:44', '2025-04-07 11:44:08'),
(78, 'App\\Models\\User', 1, 'remember_token', 'baf860e4defcd6c092dda11ae27586314c794ffeb54094a573a51acf3fa3ff52', '[\"*\"]', '2025-02-20 20:08:36', NULL, '2025-02-20 20:07:45', '2025-02-20 20:08:36'),
(79, 'App\\Models\\User', 3, 'remember_token', 'dcae25e0a98db78ba4374fb2fbbc54e7ed2cb07112187fd11b5ac67551ee52c1', '[\"*\"]', '2025-02-20 20:10:01', '2025-04-07 11:44:08', '2025-02-20 20:08:36', '2025-04-07 11:44:08'),
(80, 'App\\Models\\User', 3, 'remember_token', '3775f4e03068e084772d82c5e0a66f45d8ed7a8678494054257f25eb488bea00', '[\"*\"]', '2025-02-21 15:56:21', '2025-04-07 11:44:08', '2025-02-21 15:35:11', '2025-04-07 11:44:08'),
(81, 'App\\Models\\User', 1, 'remember_token', '3e3325d5e850673fd450cced493dc3d795c5e09636ce1b7bf90caea95ac6a60b', '[\"*\"]', '2025-02-21 18:07:54', NULL, '2025-02-21 17:22:07', '2025-02-21 18:07:54'),
(82, 'App\\Models\\User', 3, 'remember_token', 'cf707a6b726330f9d507e617ebba41bae51f6675486800833941bc2df61e1293', '[\"*\"]', '2025-02-21 17:24:27', '2025-04-07 11:44:08', '2025-02-21 17:22:44', '2025-04-07 11:44:08'),
(83, 'App\\Models\\User', 3, 'remember_token', 'cc0ef3f2da84cd836e2d2c512abf8878e0fff63d0538c564aa0349309a5ec484', '[\"*\"]', '2025-02-21 18:27:43', '2025-04-07 11:44:08', '2025-02-21 18:01:10', '2025-04-07 11:44:08'),
(84, 'App\\Models\\User', 1, 'remember_token', '2264c893648942734d79e8413f3d9b4ab1e005fc777651b03422cf1f1a9a2c22', '[\"*\"]', '2025-02-21 18:24:03', NULL, '2025-02-21 18:23:52', '2025-02-21 18:24:03'),
(85, 'App\\Models\\User', 1, 'remember_token', 'ec910621c9b6e096d888caf8080650499b7997786017daa9a1bf1825381d7e18', '[\"*\"]', '2025-02-21 19:18:03', NULL, '2025-02-21 19:10:07', '2025-02-21 19:18:03'),
(86, 'App\\Models\\User', 3, 'remember_token', '9e42163524e98155b13baf4b5567cffa580b3289293f47a42b6d98c0b1f04eef', '[\"*\"]', '2025-02-21 19:36:48', '2025-04-07 11:44:08', '2025-02-21 19:10:25', '2025-04-07 11:44:08'),
(87, 'App\\Models\\User', 1, 'remember_token', 'a0a67db515a044829d261faed099c231d13af67b2b5bcceddfd6e277021285a4', '[\"*\"]', '2025-02-21 19:51:58', NULL, '2025-02-21 19:38:58', '2025-02-21 19:51:58'),
(88, 'App\\Models\\User', 3, 'remember_token', '3ead06cb6a7335f96ab69ce9839f825f6f85a7f6a54c58fae261a1bd401e630b', '[\"*\"]', '2025-02-21 19:46:16', '2025-04-07 11:44:08', '2025-02-21 19:39:04', '2025-04-07 11:44:08'),
(89, 'App\\Models\\SalesModel', 1, 'sales_token', '57143444f8e940b54e0f24010d843bc9904c5293810bca545e7dc49df4501024', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-02-21 20:14:01', '2025-04-07 11:44:09'),
(90, 'App\\Models\\User', 1, 'remember_token', '467db23053c7e3f10f21700c4c191d3b244a0708d4faf02223093332ac3a521c', '[\"*\"]', '2025-02-24 16:34:15', NULL, '2025-02-24 16:33:53', '2025-02-24 16:34:15'),
(91, 'App\\Models\\User', 3, 'remember_token', 'a07bdd021d909397ec885fcf62a24047846a5814653ce9bd9687efd44fc5343e', '[\"*\"]', '2025-02-24 16:35:26', '2025-04-07 11:44:08', '2025-02-24 16:34:15', '2025-04-07 11:44:08'),
(92, 'App\\Models\\User', 1, 'remember_token', 'dc3c7331a9d09130f6951eb83e52f3d4564e635b99e760c0c7b5327f7ed7ce19', '[\"*\"]', '2025-02-24 19:18:49', NULL, '2025-02-24 19:18:31', '2025-02-24 19:18:49'),
(93, 'App\\Models\\User', 3, 'remember_token', 'ef66c066c83bd5d09f005bde391875b19a26bff7f40921462c7071f18e02650c', '[\"*\"]', '2025-02-24 19:19:01', '2025-04-07 11:44:08', '2025-02-24 19:18:49', '2025-04-07 11:44:08'),
(94, 'App\\Models\\SalesModel', 1, 'sales_token', 'f8992083df04899edc3ac35a588b0369d720dd2b9d0514e59713d7f35547c4e7', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-02-27 17:38:43', '2025-04-07 11:44:09'),
(95, 'App\\Models\\SalesModel', 1, 'sales_token', '26cefe11bced1967da1d825bf098294067f956c2b86edfbdf9ff24f59dde832b', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-02-27 17:52:19', '2025-04-07 11:44:09'),
(96, 'App\\Models\\User', 1, 'remember_token', '9c0b38b695a6810d70f562ae5beb0b54e8ea19b28eaeab3625769ec615807959', '[\"*\"]', '2025-02-27 17:55:45', NULL, '2025-02-27 17:55:45', '2025-02-27 17:55:45'),
(97, 'App\\Models\\SalesModel', 1, 'sales_token', 'a673eeff7a4f30dbdc2c6d120f9a7ad8df69d756fd0037e1c927024e599ae010', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-02-27 19:04:34', '2025-04-07 11:44:09'),
(98, 'App\\Models\\SalesModel', 1, 'sales_token', '04e342c84ecf7cc301149f062367bde0efd875eff0574e2ea24a7f29515908c1', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-02-27 19:06:31', '2025-04-07 11:44:09'),
(99, 'App\\Models\\SalesModel', 1, 'sales_token', '0af5fc1f1f5e43ebfacc989be28109355d6328bff34b805e35aeb2abe09ee81f', '[\"*\"]', '2025-02-27 19:07:25', '2025-04-07 11:44:09', '2025-02-27 19:06:59', '2025-04-07 11:44:09'),
(100, 'App\\Models\\SalesModel', 1, 'sales_token', '535bf722599782c7e9cdba67d17a9120eafbbcb4068e37107c81df4cf8c6644f', '[\"*\"]', '2025-02-27 19:38:34', '2025-04-07 11:44:09', '2025-02-27 19:07:32', '2025-04-07 11:44:09'),
(101, 'App\\Models\\User', 1, 'remember_token', '2f1ad03fc146217d9d63ceacdf47d58342181e2ca7ed8faf59562b8300561ede', '[\"*\"]', '2025-02-27 19:51:28', NULL, '2025-02-27 19:08:09', '2025-02-27 19:51:28'),
(102, 'App\\Models\\User', 3, 'remember_token', 'af446f0c70438d8ce0ae48840515292c6c3e752c59056bc58d829f044ff24ada', '[\"*\"]', '2025-02-27 19:11:21', '2025-04-07 11:44:08', '2025-02-27 19:08:14', '2025-04-07 11:44:08'),
(103, 'App\\Models\\SalesModel', 1, 'sales_token', 'e049feb0007c50ec3e748826cf99fcfa901c354ba8f1129a4cdc55fa36b6d5a5', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-02-28 12:28:09', '2025-04-07 11:44:09'),
(104, 'App\\Models\\SalesModel', 1, 'sales_token', '3ccb8923ffd1b048402a27e988bc9618a7622cf34d6756711ed9902be062fa3e', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-02-28 12:32:07', '2025-04-07 11:44:09'),
(105, 'App\\Models\\SalesModel', 1, 'sales_token', '8e5015a9071b3af8efc4e7e0824b498753273988deea074a0ac8c1cfef4948cd', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-02-28 12:44:56', '2025-04-07 11:44:09'),
(106, 'App\\Models\\SalesModel', 1, 'sales_token', 'd75e0e7169f3dc61b45e8a45ba02ec435290e7c05e1402cb5464afa9c5b0f34f', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-02-28 12:45:40', '2025-04-07 11:44:09'),
(107, 'App\\Models\\SalesModel', 1, 'sales_token', '11c26ddd0ef2ba09bd6982e6f4fd8b1f4957a88da4e76db88cd94731b42df03d', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 11:26:48', '2025-04-07 11:44:09'),
(108, 'App\\Models\\SalesModel', 1, 'sales_token', '911b41efe7b7c9978378f551afd497ded8661030ab5962b8ca7ecac397b8face', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 11:32:55', '2025-04-07 11:44:09'),
(109, 'App\\Models\\SalesModel', 1, 'sales_token', '0a33d379f59cd35a7fca3e463705e40019c6ffde6873fc07a39069fff4a6350d', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 11:34:36', '2025-04-07 11:44:09'),
(110, 'App\\Models\\SalesModel', 1, 'sales_token', '6bf549849d82b89bdc26c019b3338f7f3f6b36df06a032542ad5ccbb001ca590', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 11:34:44', '2025-04-07 11:44:09'),
(111, 'App\\Models\\SalesModel', 1, 'sales_token', '0beffc1bf2a03423f8cef3e125ded905c3b082149f14fb1e8eb24b46f2a7d221', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 11:35:01', '2025-04-07 11:44:09'),
(112, 'App\\Models\\SalesModel', 1, 'sales_token', '9f681ab9e5c697543ecea0139e7ec939d980b0fd6b7f656367e84e7f90d9263b', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 11:45:07', '2025-04-07 11:44:09'),
(113, 'App\\Models\\SalesModel', 1, 'sales_token', 'f92e378e09602305f8c681cc29c3dae7223695b0ef3ae236db8b6872c9429087', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 11:46:40', '2025-04-07 11:44:09'),
(114, 'App\\Models\\SalesModel', 1, 'sales_token', '0f5ea9c14a22f9468b4306d02bc758ae7f029bd3a3d4fe92b45539733c5c5465', '[\"*\"]', '2025-03-01 11:52:10', '2025-04-07 11:44:09', '2025-03-01 11:47:16', '2025-04-07 11:44:09'),
(115, 'App\\Models\\User', 1, 'remember_token', '791e84c13c8f3fdb2d5eefe1ddeb8a33cd613dc988bb139e228b55efaad58646', '[\"*\"]', '2025-03-01 11:51:30', NULL, '2025-03-01 11:51:18', '2025-03-01 11:51:30'),
(116, 'App\\Models\\User', 3, 'remember_token', '715afed56b5d06832144ddd02c4947069626e52999cd57516c73bd2ac8339581', '[\"*\"]', '2025-03-01 11:52:00', '2025-04-07 11:44:08', '2025-03-01 11:51:30', '2025-04-07 11:44:08'),
(117, 'App\\Models\\SalesModel', 1, 'sales_token', 'ff933364c9ab536e870ff18fdc972fb92a7367a8f276339a0db3dbfa796ef4de', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 11:51:56', '2025-04-07 11:44:09'),
(118, 'App\\Models\\SalesModel', 1, 'sales_token', '9a39019f3149cde9181ea08de85cb7a9a272ec87c0fae26cb24a6103f2d302a6', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 12:24:31', '2025-04-07 11:44:09'),
(119, 'App\\Models\\SalesModel', 1, 'sales_token', '67fdaa0f3039a2345e108da9768b2c571956caa460677a7e9ffe771ff10b2440', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 12:37:31', '2025-04-07 11:44:09'),
(120, 'App\\Models\\SalesModel', 1, 'sales_token', '2af95f492ebd02559d1e35ece212530045de17905a906d9014d0e46dc0af21ee', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 12:38:53', '2025-04-07 11:44:09'),
(121, 'App\\Models\\SalesModel', 1, 'sales_token', '6a76960b24738313d70412a9f6b2ad9d5742c6c28aedda51ec9a1d175a13445d', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 12:39:35', '2025-04-07 11:44:09'),
(122, 'App\\Models\\SalesModel', 1, 'sales_token', '5e36e564aad34dcdd62f21eaf5040fbdcc7e5a5303a472ff76e559a692830826', '[\"*\"]', '2025-03-01 12:41:15', '2025-04-07 11:44:09', '2025-03-01 12:39:48', '2025-04-07 11:44:09'),
(123, 'App\\Models\\SalesModel', 1, 'sales_token', '0603ef4b84f601eb26bdd747662c6b94dcec8981a9fa53d6f74775dbf6bf8ab4', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 12:41:37', '2025-04-07 11:44:09'),
(124, 'App\\Models\\SalesModel', 1, 'sales_token', '1f4f5b66b19772006fa387141a0980723baef65cf5d1054e1335c296f4965701', '[\"*\"]', '2025-03-01 12:44:43', '2025-04-07 11:44:09', '2025-03-01 12:42:25', '2025-04-07 11:44:09'),
(125, 'App\\Models\\SalesModel', 1, 'sales_token', 'bcbdc52a767d5aaec96f3e924fa827932fb3e93847374c5c8579d9866b59dd58', '[\"*\"]', '2025-03-01 12:47:44', '2025-04-07 11:44:09', '2025-03-01 12:45:46', '2025-04-07 11:44:09'),
(126, 'App\\Models\\SalesModel', 1, 'sales_token', '6bf09cf2d2e1d3efdba9c1758f01e2d5a888769dff1a6e40efa4852dd2855eaf', '[\"*\"]', '2025-03-01 12:49:23', '2025-04-07 11:44:09', '2025-03-01 12:47:52', '2025-04-07 11:44:09'),
(127, 'App\\Models\\SalesModel', 1, 'sales_token', 'cc28254cd0014133d09ac96a4c32f6d1ee030939742134f339dba851d063532d', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 12:50:04', '2025-04-07 11:44:09'),
(128, 'App\\Models\\User', 1, 'remember_token', '03847540d3e70e414d1091ef3c10053c93cda9cc782e8d1b5cb64faaa6ac3533', '[\"*\"]', '2025-03-01 12:55:23', NULL, '2025-03-01 12:55:19', '2025-03-01 12:55:23'),
(129, 'App\\Models\\SalesModel', 1, 'sales_token', 'fd29970dbc0abc9ad7f79fb6774ca799842036f4ba27b5262818681f69bb2117', '[\"*\"]', '2025-03-01 13:04:38', '2025-04-07 11:44:09', '2025-03-01 13:04:31', '2025-04-07 11:44:09'),
(130, 'App\\Models\\SalesModel', 1, 'sales_token', '31239007eee181719d3f76066015f33528cd9b03e0903621a13dd24f38c28162', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-01 13:16:27', '2025-04-07 11:44:09'),
(131, 'App\\Models\\SalesModel', 1, 'sales_token', 'f24c7babc19995d901f0aba517394d6b69eff0bc3d081c576959144480608f96', '[\"*\"]', '2025-03-01 13:16:55', '2025-04-07 11:44:09', '2025-03-01 13:16:54', '2025-04-07 11:44:09'),
(132, 'App\\Models\\SalesModel', 1, 'sales_token', 'f29369c6b3eb8293dfcf159e598978881ec33b7b2ea3a13dff9242cf77d4691c', '[\"*\"]', '2025-03-01 13:18:27', '2025-04-07 11:44:09', '2025-03-01 13:17:54', '2025-04-07 11:44:09'),
(133, 'App\\Models\\SalesModel', 1, 'sales_token', '6125f862624613bc7b72c2e831a03ed75888b455196f6b3fc3d5a950b832fc4e', '[\"*\"]', '2025-03-01 13:25:42', '2025-04-07 11:44:09', '2025-03-01 13:20:08', '2025-04-07 11:44:09'),
(134, 'App\\Models\\SalesModel', 1, 'sales_token', '5f28a9ce02627ed3d88150843ad4f2d502a408f2060dc55cf34a3391c9bc29d9', '[\"*\"]', '2025-03-01 13:28:13', '2025-04-07 11:44:09', '2025-03-01 13:26:40', '2025-04-07 11:44:09'),
(135, 'App\\Models\\User', 1, 'remember_token', 'ed1b4c06a58f8dddf400186dc6c45b4df2be5d1b8e7eee5d95364174f28b9c54', '[\"*\"]', '2025-03-02 13:05:11', NULL, '2025-03-02 13:05:11', '2025-03-02 13:05:11'),
(136, 'App\\Models\\SalesModel', 1, 'sales_token', '9e67ae59bafa8d35d696b3438020cfd6894a2db7461e9a9fe68e7145202f87a6', '[\"*\"]', '2025-03-03 13:15:23', '2025-04-07 11:44:09', '2025-03-03 13:15:22', '2025-04-07 11:44:09'),
(137, 'App\\Models\\SalesModel', 1, 'sales_token', '2e1d540898a09782fb63e73ccea24a6c64d145617a126fa9f9d69c57c583eae9', '[\"*\"]', '2025-03-03 13:19:29', '2025-04-07 11:44:09', '2025-03-03 13:19:28', '2025-04-07 11:44:09'),
(138, 'App\\Models\\User', 1, 'remember_token', 'baabd298e20623f96421a16e764b3202020d3da315e4af8790be43bfaa50583a', '[\"*\"]', '2025-03-03 13:19:38', NULL, '2025-03-03 13:19:34', '2025-03-03 13:19:38'),
(139, 'App\\Models\\User', 3, 'remember_token', '03a337c1ce5b0d45de413d732b8479b3664456c59b1205a57e700d9a9fce4c90', '[\"*\"]', '2025-03-03 13:20:34', '2025-04-07 11:44:08', '2025-03-03 13:19:38', '2025-04-07 11:44:08'),
(140, 'App\\Models\\SalesModel', 1, 'sales_token', '613707153759c5b7baad9d47c495657abab1dfe78944881c9c4b16f82947fb3d', '[\"*\"]', '2025-03-03 13:20:26', '2025-04-07 11:44:09', '2025-03-03 13:20:26', '2025-04-07 11:44:09'),
(141, 'App\\Models\\SalesModel', 1, 'sales_token', '23d1b48ef889ce9d7448a9e59c9d342593c6337f9cdf5cbc8867feb64d167342', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-03 13:20:54', '2025-04-07 11:44:09'),
(142, 'App\\Models\\SalesModel', 1, 'sales_token', '48b5e51c99a513a04abf174b99c6476c78eb398816cc9c11cc95d3364b36fa40', '[\"*\"]', '2025-03-03 13:21:31', '2025-04-07 11:44:09', '2025-03-03 13:20:58', '2025-04-07 11:44:09'),
(143, 'App\\Models\\SalesModel', 1, 'sales_token', 'ce425fbcb2799bed061a4bcf132dfb88648606c441514b94994fcec17842fc71', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-03 13:21:06', '2025-04-07 11:44:09'),
(144, 'App\\Models\\SalesModel', 1, 'sales_token', '4bdf06d05f88ec7036f362d63e325cfb7e2a2ef5bf1cfcac39cd8ac6b4e3165b', '[\"*\"]', '2025-03-03 13:28:58', '2025-04-07 11:44:09', '2025-03-03 13:28:57', '2025-04-07 11:44:09'),
(145, 'App\\Models\\SalesModel', 1, 'sales_token', 'fea7a9e23992cb531d01110bc5461f51bbc38da27d9397cd5aba4d2330b9c5ee', '[\"*\"]', '2025-03-03 13:43:28', '2025-04-07 11:44:09', '2025-03-03 13:29:43', '2025-04-07 11:44:09'),
(146, 'App\\Models\\SalesModel', 1, 'sales_token', 'a30122a5eea96526ffa7ce94a33c889e4031556eb8bc6f4b3ba95a05ae1f1696', '[\"*\"]', '2025-03-03 13:35:55', '2025-04-07 11:44:09', '2025-03-03 13:35:37', '2025-04-07 11:44:09'),
(147, 'App\\Models\\SalesModel', 1, 'sales_token', '053a56a544416f72118fe26ad25dd2723f14451f225d17bf36e9fb290d659fe1', '[\"*\"]', '2025-03-03 13:54:09', '2025-04-07 11:44:09', '2025-03-03 13:54:08', '2025-04-07 11:44:09'),
(148, 'App\\Models\\SalesModel', 1, 'sales_token', 'aad5f81758ffa2d1b82d2f02e6b429ce0496be328c2098406370b200480dd293', '[\"*\"]', '2025-03-03 16:01:21', '2025-04-07 11:44:09', '2025-03-03 16:01:13', '2025-04-07 11:44:09'),
(149, 'App\\Models\\SalesModel', 1, 'sales_token', 'e522a3c8f0447382a98ffe401606f206765609f46b522fc53d6d39dc74e29089', '[\"*\"]', '2025-03-03 16:29:21', '2025-04-07 11:44:09', '2025-03-03 16:29:20', '2025-04-07 11:44:09'),
(150, 'App\\Models\\SalesModel', 1, 'sales_token', '0e5aa749ce61ca5a858e4765e710bb3bab8feef2823dabdd8e23ae45ff487900', '[\"*\"]', '2025-03-03 16:30:51', '2025-04-07 11:44:09', '2025-03-03 16:30:50', '2025-04-07 11:44:09'),
(151, 'App\\Models\\SalesModel', 1, 'sales_token', '8da95db8d073188661cd08644c302034a23ef57b4ac982ae79c54c315bea3846', '[\"*\"]', '2025-03-03 16:31:28', '2025-04-07 11:44:09', '2025-03-03 16:31:28', '2025-04-07 11:44:09'),
(152, 'App\\Models\\SalesModel', 1, 'sales_token', '92aa925daf02a05672a6b70f1a8110661dd484c3679cd97ac3f114dfdf641667', '[\"*\"]', '2025-03-03 16:36:20', '2025-04-07 11:44:09', '2025-03-03 16:36:19', '2025-04-07 11:44:09'),
(153, 'App\\Models\\SalesModel', 1, 'sales_token', '97517498105a28f1dd8c90fcaae209cd59fafa7ba5a512c5ae4dbb66a8f0b4f0', '[\"*\"]', '2025-03-03 16:37:24', '2025-04-07 11:44:09', '2025-03-03 16:37:23', '2025-04-07 11:44:09'),
(154, 'App\\Models\\SalesModel', 1, 'sales_token', '9d0c80c1eee9b48dee086056396d8cac7f5ce4a2d478e8fc17a6305946244805', '[\"*\"]', '2025-03-04 10:50:44', '2025-04-07 11:44:09', '2025-03-04 10:44:19', '2025-04-07 11:44:09'),
(155, 'App\\Models\\User', 1, 'remember_token', 'b96e6fbefa65302b8a53058f1548a5e95db1279190add36977054563ab8204a3', '[\"*\"]', '2025-03-04 10:47:16', NULL, '2025-03-04 10:46:49', '2025-03-04 10:47:16'),
(156, 'App\\Models\\User', 3, 'remember_token', 'b9f3f70aa09aba51fee9459534e66e8418cd0e2412d9998e13a91e361657ed70', '[\"*\"]', '2025-03-04 10:47:34', '2025-04-07 11:44:08', '2025-03-04 10:47:16', '2025-04-07 11:44:08'),
(157, 'App\\Models\\SalesModel', 1, 'sales_token', '40ac0bc292ccc3f1e1b2ccca8dc13d9b337db9ab1c603cfeb837d7ac69635bfd', '[\"*\"]', '2025-03-04 10:56:09', '2025-04-07 11:44:09', '2025-03-04 10:55:42', '2025-04-07 11:44:09'),
(158, 'App\\Models\\SalesModel', 1, 'sales_token', 'd1aa759e099bec394360c0130ba1587433ca7aa3bcc2550eee722560feedff8f', '[\"*\"]', '2025-03-04 11:26:09', '2025-04-07 11:44:09', '2025-03-04 10:59:18', '2025-04-07 11:44:09'),
(159, 'App\\Models\\SalesModel', 1, 'sales_token', 'cef516c5ca4884c925267b83d5a23572b32beed88d486732e930c51b8260a9dc', '[\"*\"]', '2025-03-04 11:27:41', '2025-04-07 11:44:09', '2025-03-04 11:26:28', '2025-04-07 11:44:09'),
(160, 'App\\Models\\SalesModel', 1, 'sales_token', '5fbe5d29cd30a8f87a8ade4d0cdac0197f32a6c70c0229a75996259cca845107', '[\"*\"]', '2025-03-04 11:34:37', '2025-04-07 11:44:09', '2025-03-04 11:29:48', '2025-04-07 11:44:09'),
(161, 'App\\Models\\SalesModel', 1, 'sales_token', '883fa612858b674090d3ed11bb54d34193b28afc57e8c7be1fefb0b13b3905a4', '[\"*\"]', '2025-03-04 11:41:54', '2025-04-07 11:44:09', '2025-03-04 11:37:08', '2025-04-07 11:44:09'),
(162, 'App\\Models\\SalesModel', 1, 'sales_token', 'd312559ff09bb3c08d31f2bf6ec3214f9cf130741ee08b7b236b3317d008b068', '[\"*\"]', '2025-03-04 11:52:41', '2025-04-07 11:44:09', '2025-03-04 11:42:23', '2025-04-07 11:44:09'),
(163, 'App\\Models\\SalesModel', 1, 'sales_token', '24ac86a123576f90b5fdc04d9e05af9faf8898da597de990f71af176605765c3', '[\"*\"]', '2025-03-04 11:54:52', '2025-04-07 11:44:09', '2025-03-04 11:54:11', '2025-04-07 11:44:09'),
(164, 'App\\Models\\SalesModel', 1, 'sales_token', '7d6631d83ca4b3350c5478189143ed9b9bcac81f3eb681e349ed2358aa2cadd4', '[\"*\"]', '2025-03-04 12:07:48', '2025-04-07 11:44:09', '2025-03-04 12:01:08', '2025-04-07 11:44:09'),
(165, 'App\\Models\\SalesModel', 1, 'sales_token', '834026632e352d2420a6bd6ae6aee33b63c4fe3d10f936893043093bacdcf1f2', '[\"*\"]', '2025-03-04 12:18:27', '2025-04-07 11:44:09', '2025-03-04 12:16:05', '2025-04-07 11:44:09'),
(166, 'App\\Models\\SalesModel', 1, 'sales_token', '3622650333548d97124fdee3490b01dce403ee0f05dcc98db09699e3d7a19c97', '[\"*\"]', '2025-03-04 12:20:25', '2025-04-07 11:44:09', '2025-03-04 12:19:03', '2025-04-07 11:44:09'),
(167, 'App\\Models\\SalesModel', 1, 'sales_token', 'b20d9505e745c0b50b87f25a3fb3bd25a450a31a08a1377c163cf5a5d4bff59d', '[\"*\"]', '2025-03-04 12:25:04', '2025-04-07 11:44:09', '2025-03-04 12:21:36', '2025-04-07 11:44:09'),
(168, 'App\\Models\\SalesModel', 1, 'sales_token', '83525806fb059071a3b8c3f92d66c650089209808840405f375622afd8e999c0', '[\"*\"]', '2025-03-04 12:26:01', '2025-04-07 11:44:09', '2025-03-04 12:26:00', '2025-04-07 11:44:09'),
(169, 'App\\Models\\SalesModel', 1, 'sales_token', 'd78f3c30c6caf272893c6ffbb814bef8499fcd5ba370fb0f5fb51f4884db1238', '[\"*\"]', '2025-03-04 12:28:04', '2025-04-07 11:44:09', '2025-03-04 12:28:03', '2025-04-07 11:44:09'),
(170, 'App\\Models\\SalesModel', 1, 'sales_token', '770e2996615fe02c91a3e119c83e638d85023ad242c8e28c761457b91f81bc3c', '[\"*\"]', '2025-03-04 12:46:45', '2025-04-07 11:44:09', '2025-03-04 12:46:43', '2025-04-07 11:44:09'),
(171, 'App\\Models\\SalesModel', 1, 'sales_token', '03c74d8925f17e41c5e412448064fdcda0cb2d4024b53a937b231efc6db8f5c5', '[\"*\"]', '2025-03-04 12:48:51', '2025-04-07 11:44:09', '2025-03-04 12:48:50', '2025-04-07 11:44:09'),
(172, 'App\\Models\\SalesModel', 1, 'sales_token', '05d58c38e33853da6d13227dfb927cb6fcedd09af0a6f271a609dd214af67f62', '[\"*\"]', '2025-03-04 12:51:48', '2025-04-07 11:44:09', '2025-03-04 12:51:40', '2025-04-07 11:44:09'),
(173, 'App\\Models\\SalesModel', 1, 'sales_token', '6581489e742fba4d3b09c14d58001b9c50bcccc534b907994c2bbcc54628f2b2', '[\"*\"]', '2025-03-04 12:55:30', '2025-04-07 11:44:09', '2025-03-04 12:55:28', '2025-04-07 11:44:09'),
(174, 'App\\Models\\SalesModel', 1, 'sales_token', '1219842620b195f8f2efd7c5c0fa986d924e57905c2699fbf68f41ee1a551423', '[\"*\"]', '2025-03-04 12:56:52', '2025-04-07 11:44:09', '2025-03-04 12:56:51', '2025-04-07 11:44:09'),
(175, 'App\\Models\\SalesModel', 1, 'sales_token', 'b666f3f15cf154cf8bf37d1a8d74f70e404edebd6b9da4ff7c07968e309616a1', '[\"*\"]', '2025-03-04 12:59:31', '2025-04-07 11:44:09', '2025-03-04 12:59:30', '2025-04-07 11:44:09'),
(176, 'App\\Models\\SalesModel', 1, 'sales_token', 'ce682a8e77a85bac21660bfea9a774e349de25f68bd4cf52576a759be86d8ade', '[\"*\"]', '2025-03-04 13:00:35', '2025-04-07 11:44:09', '2025-03-04 13:00:35', '2025-04-07 11:44:09'),
(177, 'App\\Models\\SalesModel', 1, 'sales_token', '05b7f72325898964a33475665342ac66ef85116395a883fddb3bd3e5ebad7682', '[\"*\"]', NULL, '2025-04-07 11:44:09', '2025-03-04 13:06:43', '2025-04-07 11:44:09'),
(178, 'App\\Models\\SalesModel', 1, 'sales_token', 'b51a05e69549ff041d7126c9195a3dc694b122a37864b98fb7e176f1244469db', '[\"*\"]', '2025-03-04 13:09:37', '2025-04-07 11:44:09', '2025-03-04 13:09:36', '2025-04-07 11:44:09'),
(179, 'App\\Models\\SalesModel', 1, 'sales_token', '71efe617cefbdbb40c2923a730a8ee93e0c27855a2a6b1bcc889a0fd593dbcd9', '[\"*\"]', '2025-03-04 13:10:09', '2025-04-07 11:44:09', '2025-03-04 13:10:09', '2025-04-07 11:44:09'),
(180, 'App\\Models\\SalesModel', 1, 'sales_token', 'd42c7c81930e80e71390d17e0ae86e6b1054754c024f2bc2eec5523b99222345', '[\"*\"]', '2025-03-04 13:11:17', '2025-04-07 11:44:09', '2025-03-04 13:11:17', '2025-04-07 11:44:09'),
(181, 'App\\Models\\SalesModel', 1, 'sales_token', '294c2d1d496929c6198b6b3915650482f53e05181c8992376af5c52fcd460aa6', '[\"*\"]', '2025-03-04 13:13:12', '2025-04-07 11:44:09', '2025-03-04 13:13:11', '2025-04-07 11:44:09'),
(182, 'App\\Models\\SalesModel', 1, 'sales_token', '706bf97d85b4cf3ee1d56cdb75e81e17a3c097d78370d3be137cf7cccec41693', '[\"*\"]', '2025-03-04 13:15:44', '2025-04-07 11:44:09', '2025-03-04 13:15:05', '2025-04-07 11:44:09'),
(183, 'App\\Models\\SalesModel', 1, 'sales_token', '44fd9bf7af6e3c13e0512684cd26f721919d5e25d380302e97779b98562dec49', '[\"*\"]', '2025-03-04 13:24:31', '2025-04-07 11:44:09', '2025-03-04 13:23:29', '2025-04-07 11:44:09'),
(184, 'App\\Models\\User', 1, 'remember_token', '448e90bf047b01d199e3578cf800cf7fb33099a1fc06808c75b04a56b0ef24d3', '[\"*\"]', '2025-03-04 16:16:50', NULL, '2025-03-04 16:12:04', '2025-03-04 16:16:50'),
(185, 'App\\Models\\User', 3, 'remember_token', 'bbc29a97aa18bc9c4b5fceeec2d0d0a524674e8531c4429fd30d92fc5ab330d1', '[\"*\"]', '2025-03-04 16:30:09', '2025-04-07 11:44:08', '2025-03-04 16:16:50', '2025-04-07 11:44:08'),
(186, 'App\\Models\\SalesModel', 1, 'sales_token', 'ceb0f8b95d3632a0924a75e713370d6b5b50d27f3aba69f8d76a72b55b5c0583', '[\"*\"]', '2025-03-04 16:19:01', '2025-04-07 11:44:10', '2025-03-04 16:18:32', '2025-04-07 11:44:10'),
(187, 'App\\Models\\SalesModel', 1, 'sales_token', '6fafb78bcab2e32eb186d8423772d0753cdc0cc07a81c04e35828d64587caa7e', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-04 16:34:58', '2025-04-07 11:44:10'),
(188, 'App\\Models\\SalesModel', 1, 'sales_token', '3163395199657acd4226bd85d6db47e239c37a6f6173f5577512c59f654b4db9', '[\"*\"]', '2025-03-04 16:35:33', '2025-04-07 11:44:10', '2025-03-04 16:35:32', '2025-04-07 11:44:10'),
(189, 'App\\Models\\SalesModel', 1, 'sales_token', '0c0ac9330cb341bccc3ada3dc8933fbede56ab4af61768057730f3f38443ae98', '[\"*\"]', '2025-03-04 16:37:09', '2025-04-07 11:44:10', '2025-03-04 16:36:57', '2025-04-07 11:44:10'),
(190, 'App\\Models\\User', 1, 'remember_token', '64207280416661ebe9281e24f618ee344a9edd1a7505aaf46455a4cb5833bd45', '[\"*\"]', '2025-03-04 16:44:53', NULL, '2025-03-04 16:38:05', '2025-03-04 16:44:53'),
(191, 'App\\Models\\User', 3, 'remember_token', 'e3d571796051bd3e4c931e0c8de6f23727dbfdd9f885c48fe3a26ee6ed2865bd', '[\"*\"]', '2025-03-04 16:38:24', '2025-04-07 11:44:08', '2025-03-04 16:38:18', '2025-04-07 11:44:08'),
(192, 'App\\Models\\User', 3, 'remember_token', '13dbfd8f2b9eda3b1f09f1455a4d659e093d125ebd4a11b7bce1520f8aef635b', '[\"*\"]', '2025-03-04 16:45:08', '2025-04-07 11:44:08', '2025-03-04 16:44:53', '2025-04-07 11:44:08'),
(193, 'App\\Models\\SalesModel', 1, 'sales_token', '042bb461f76489507ad7fd8f0964891163fde636dddec966f3fa1f6b55e4e09f', '[\"*\"]', '2025-03-05 13:04:22', '2025-04-07 11:44:10', '2025-03-05 12:08:51', '2025-04-07 11:44:10'),
(194, 'App\\Models\\User', 3, 'remember_token', 'd362b7aa9f5ee6bb8b5854135b51fbb8f03dba8307c4b863d1b6488ed1a97175', '[\"*\"]', '2025-03-05 13:02:28', '2025-04-07 11:44:08', '2025-03-05 13:02:22', '2025-04-07 11:44:08'),
(195, 'App\\Models\\SalesModel', 1, 'sales_token', 'a18bf11d9d45122a4dd0919f2ff0632807dcfea8ef0d2e06b2a0bb85474c9a81', '[\"*\"]', '2025-03-05 13:38:38', '2025-04-07 11:44:10', '2025-03-05 13:30:13', '2025-04-07 11:44:10'),
(196, 'App\\Models\\SalesModel', 1, 'sales_token', 'a749a897a77f1b0aa4c8cf6b7f11868115821aeec99e52c26fc9dad10911dc84', '[\"*\"]', '2025-03-05 15:10:41', '2025-04-07 11:44:10', '2025-03-05 14:55:08', '2025-04-07 11:44:10'),
(197, 'App\\Models\\SalesModel', 1, 'sales_token', '7267548f6d6f998046ce70433726087763b5a279cbf57c63dc792b0c252236fc', '[\"*\"]', '2025-03-05 18:18:26', '2025-04-07 11:44:10', '2025-03-05 17:27:40', '2025-04-07 11:44:10'),
(198, 'App\\Models\\User', 1, 'remember_token', '557a117b06cf8792cb443ad9d13e032371c74a97a756a796e7c05a1c2dc298f4', '[\"*\"]', '2025-03-05 17:34:48', NULL, '2025-03-05 17:34:44', '2025-03-05 17:34:48'),
(199, 'App\\Models\\User', 3, 'remember_token', '0f560b2974b9ae4ca8a86d7872a0e4f575989e440b734dd0da71b98a3e385a49', '[\"*\"]', '2025-03-05 17:35:11', '2025-04-07 11:44:08', '2025-03-05 17:34:48', '2025-04-07 11:44:08'),
(200, 'App\\Models\\SalesModel', 1, 'sales_token', '18458afe6e56a868bcdd41ce6ce74cbd17fc18c16d26fb611c33c39bdaa311cd', '[\"*\"]', '2025-03-05 20:17:55', '2025-04-07 11:44:10', '2025-03-05 19:51:47', '2025-04-07 11:44:10'),
(201, 'App\\Models\\SalesModel', 1, 'sales_token', '0faaf0804cdce5eb0d67ae4f73d60521cb6be59cb5d2b91148d2436d8af1bdd7', '[\"*\"]', '2025-03-05 20:23:38', '2025-04-07 11:44:10', '2025-03-05 20:21:26', '2025-04-07 11:44:10'),
(202, 'App\\Models\\SalesModel', 1, 'sales_token', '020df61e53761fd1bcf12c3cda13872460276f713044ee5af2d129450bfbc92d', '[\"*\"]', '2025-03-06 01:51:59', '2025-04-07 11:44:10', '2025-03-06 01:51:58', '2025-04-07 11:44:10'),
(203, 'App\\Models\\SalesModel', 1, 'sales_token', '132fc9ce4d1c9574532614c689d03180cce42592d2a2fdd3247ae0f591e98450', '[\"*\"]', '2025-03-06 11:17:14', '2025-04-07 11:44:10', '2025-03-06 10:58:37', '2025-04-07 11:44:10'),
(204, 'App\\Models\\SalesModel', 1, 'sales_token', 'f97fb349274a5c7aa8dd35b89db760ddd89867cc31b7e436cacbe37e8322231d', '[\"*\"]', '2025-03-06 11:12:37', '2025-04-07 11:44:10', '2025-03-06 11:01:20', '2025-04-07 11:44:10'),
(205, 'App\\Models\\SalesModel', 1, 'sales_token', '48c6a81ffb48ca4f79e4314e4968035ef6a18f0225933c255ee013b5b30f9ced', '[\"*\"]', '2025-03-06 11:06:15', '2025-04-07 11:44:10', '2025-03-06 11:06:10', '2025-04-07 11:44:10'),
(206, 'App\\Models\\SalesModel', 1, 'sales_token', 'c37fc6a57160ef4931459afc4fd72ceddf1c3d7468c6ff7d40db9fba1035334c', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-06 12:02:36', '2025-04-07 11:44:10'),
(207, 'App\\Models\\SalesModel', 1, 'sales_token', '5cf01ee2b15337bb8a557a817b8aa5911b92cdd9b67962131bd3a3906e54d4b0', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-06 12:03:16', '2025-04-07 11:44:10'),
(208, 'App\\Models\\SalesModel', 1, 'sales_token', '04021c263039c83432097b4446dba6f9fcc2f509638a63da6b9cb4d71c8d93b0', '[\"*\"]', '2025-03-06 12:08:02', '2025-04-07 11:44:10', '2025-03-06 12:07:03', '2025-04-07 11:44:10'),
(209, 'App\\Models\\SalesModel', 1, 'sales_token', '3d9bbcd4fcc43ccdb6421fb71228ab9052d25798e7a4bb4395279f74a40226c3', '[\"*\"]', '2025-03-06 12:31:39', '2025-04-07 11:44:10', '2025-03-06 12:13:40', '2025-04-07 11:44:10'),
(210, 'App\\Models\\SalesModel', 1, 'sales_token', '53c36a932c8163fe64379214d67063d8040d8a0845602a2629b8670ffc86f9f9', '[\"*\"]', '2025-03-06 12:47:18', '2025-04-07 11:44:10', '2025-03-06 12:40:35', '2025-04-07 11:44:10'),
(211, 'App\\Models\\SalesModel', 1, 'sales_token', 'be2af0855bae4f375c76e8048862d5d81c2b70f09289868f18b610c916cf448e', '[\"*\"]', '2025-03-06 12:41:57', '2025-04-07 11:44:10', '2025-03-06 12:41:46', '2025-04-07 11:44:10'),
(212, 'App\\Models\\SalesModel', 1, 'sales_token', 'cc18f888c0d46eda35cae978d502ca32ebe166190587eba834fe5d6fcb5107d8', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-06 12:56:52', '2025-04-07 11:44:10'),
(213, 'App\\Models\\SalesModel', 1, 'sales_token', 'e565b22975415b0dd9c1e0830bcebad79b9f0dd14138c5b6de1b10c5475a70f8', '[\"*\"]', '2025-03-06 13:22:15', '2025-04-07 11:44:10', '2025-03-06 12:57:32', '2025-04-07 11:44:10'),
(214, 'App\\Models\\SalesModel', 1, 'sales_token', 'f8efb9ab867a3b49526147cf44a69cb9847520335bb31b90535054ef1246faa8', '[\"*\"]', '2025-03-06 13:42:53', '2025-04-07 11:44:10', '2025-03-06 13:34:07', '2025-04-07 11:44:10'),
(215, 'App\\Models\\User', 3, 'remember_token', '4c1cacfdd4719ab653f81e513b378fe744830bad77fde48d0810a625b6bc5d76', '[\"*\"]', '2025-03-06 13:35:00', '2025-04-07 11:44:08', '2025-03-06 13:34:57', '2025-04-07 11:44:08'),
(216, 'App\\Models\\User', 3, 'remember_token', '48df64a9903b7577322fd510affb9a5690f9286aa2cb5cb2bc92d12195dd18ff', '[\"*\"]', '2025-03-06 13:37:09', '2025-04-07 11:44:08', '2025-03-06 13:36:14', '2025-04-07 11:44:08'),
(217, 'App\\Models\\User', 3, 'remember_token', '7234c1ad280dca082a71a733deeeb69c2625d5b32393433a61066b29f86350b0', '[\"*\"]', '2025-03-06 13:42:45', '2025-04-07 11:44:08', '2025-03-06 13:39:02', '2025-04-07 11:44:08'),
(218, 'App\\Models\\SalesModel', 1, 'sales_token', '11c5198ce67c814d1db029dd10b5076a44cf08b0e9ff55861ab36c5eca8d2c7f', '[\"*\"]', '2025-03-06 13:59:45', '2025-04-07 11:44:10', '2025-03-06 13:45:23', '2025-04-07 11:44:10'),
(219, 'App\\Models\\SalesModel', 1, 'sales_token', 'eeea66fb03cfc6643bc92989a309f9ea8bb6e4a9c51ba64240c6035f54dfea65', '[\"*\"]', '2025-03-06 16:18:01', '2025-04-07 11:44:10', '2025-03-06 16:17:26', '2025-04-07 11:44:10'),
(220, 'App\\Models\\User', 1, 'remember_token', '980bd0e7c5e260cfafce99386656aab4e0ded3e4e8ec13281c9e15c943e93a3e', '[\"*\"]', '2025-03-06 16:25:02', NULL, '2025-03-06 16:19:42', '2025-03-06 16:25:02'),
(221, 'App\\Models\\User', 3, 'remember_token', '4ccfce38096e5a806fe2c7237a43c7a5b55fe717c2e5c88a147fc4311b0bea20', '[\"*\"]', '2025-03-06 16:20:22', '2025-04-07 11:44:08', '2025-03-06 16:20:18', '2025-04-07 11:44:08'),
(222, 'App\\Models\\SalesModel', 4, 'sales_token', '0175924da6c74b9385946af39d2d18a68c8b3db5548a6278adda757898557207', '[\"*\"]', '2025-03-06 17:05:23', '2025-04-07 11:44:10', '2025-03-06 16:24:33', '2025-04-07 11:44:10'),
(223, 'App\\Models\\User', 3, 'remember_token', 'a467cf65cbc3fe35a1732bf536daa729e3b425dbf9bd2f4afc10974fdf6438b2', '[\"*\"]', '2025-03-06 17:19:37', '2025-04-07 11:44:08', '2025-03-06 16:25:02', '2025-04-07 11:44:08'),
(224, 'App\\Models\\User', 3, 'remember_token', '089370fa0e30f8477310c928509e877e6e2f8f33c76ec48de288b5004c4adafe', '[\"*\"]', NULL, '2025-04-07 11:44:08', '2025-03-06 16:45:30', '2025-04-07 11:44:08'),
(225, 'App\\Models\\SalesModel', 1, 'sales_token', '014e0124de5167673aac4b3b5f82c332823bf655b748d4929e09e55c9130b4f2', '[\"*\"]', '2025-03-06 17:12:37', '2025-04-07 11:44:10', '2025-03-06 17:10:49', '2025-04-07 11:44:10'),
(226, 'App\\Models\\SalesModel', 1, 'sales_token', '1c480be0a18ecdc343b4369605678ef7fb0e82b290cd4993dec37e038306c072', '[\"*\"]', '2025-03-06 17:47:02', '2025-04-07 11:44:10', '2025-03-06 17:13:57', '2025-04-07 11:44:10'),
(227, 'App\\Models\\SalesModel', 1, 'sales_token', '9fe8798308297aeb33f044a30ce8b4a4935734b74dd102481b9f0f5cafc46505', '[\"*\"]', '2025-03-06 18:24:33', '2025-04-07 11:44:10', '2025-03-06 18:22:59', '2025-04-07 11:44:10'),
(228, 'App\\Models\\User', 3, 'remember_token', '46de917f1a2f4031f6113a98fc459908d60d0bf5c09c61e6740ba028052cad80', '[\"*\"]', '2025-03-06 20:02:07', '2025-04-07 11:44:08', '2025-03-06 20:01:26', '2025-04-07 11:44:08'),
(229, 'App\\Models\\User', 3, 'remember_token', '0d159e1dbfc18c482b0b331bbcf49d316abc4ac8a52cd4771808fb68daeb86fd', '[\"*\"]', '2025-03-07 11:50:24', '2025-04-07 11:44:08', '2025-03-07 11:33:04', '2025-04-07 11:44:08'),
(230, 'App\\Models\\User', 3, 'remember_token', '96fadbad4bd3f8a5ad2f06df3e880111074544ed8257fa0fbc970eae8d74425d', '[\"*\"]', '2025-03-07 12:14:49', '2025-04-07 11:44:08', '2025-03-07 11:50:41', '2025-04-07 11:44:08'),
(231, 'App\\Models\\User', 1, 'remember_token', '62b1f9e81ea9e0450e725ca721c2f9c6d7986f4760d7ed6bce5809c5dda2a50e', '[\"*\"]', '2025-03-07 12:25:10', NULL, '2025-03-07 12:15:18', '2025-03-07 12:25:10'),
(232, 'App\\Models\\User', 3, 'remember_token', '0cd8927251f231462b3cc1ec99e7d4f3afd67957c63eb59a9923bac19e6a7bae', '[\"*\"]', '2025-03-07 12:28:40', '2025-04-07 11:44:08', '2025-03-07 12:25:10', '2025-04-07 11:44:08'),
(233, 'App\\Models\\SalesModel', 1, 'sales_token', '1acfe95bc549bb8e8880f0c9196ebaa33f9846b5676e12b328b062d54ff028cf', '[\"*\"]', '2025-03-07 12:27:51', '2025-04-07 11:44:10', '2025-03-07 12:26:53', '2025-04-07 11:44:10'),
(234, 'App\\Models\\User', 1, 'remember_token', '7dc1112c207f0e491eddb1f5d93a4c3c90d5e537d7455f2c6a1d8f21885184f8', '[\"*\"]', '2025-03-07 13:08:15', NULL, '2025-03-07 13:00:23', '2025-03-07 13:08:15');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(235, 'App\\Models\\User', 3, 'remember_token', 'd144417a17b8441efd64cd96acb249b49b00bdd930033dae0cef56b730eba534', '[\"*\"]', '2025-03-07 13:23:37', '2025-04-07 11:44:08', '2025-03-07 13:08:15', '2025-04-07 11:44:08'),
(236, 'App\\Models\\User', 1, 'remember_token', 'c79e673242e00dc5d18e0fea131ded8ff0f04a42b5439aa15d2cca18e8077282', '[\"*\"]', '2025-03-07 15:23:10', NULL, '2025-03-07 14:23:22', '2025-03-07 15:23:10'),
(237, 'App\\Models\\User', 3, 'remember_token', '0b54705f461b6f890b9618bd07de60633b083dc2abef336e1083816b44f7e0e6', '[\"*\"]', '2025-03-07 15:22:57', '2025-04-07 11:44:08', '2025-03-07 14:35:22', '2025-04-07 11:44:08'),
(238, 'App\\Models\\User', 3, 'remember_token', 'e5a66662c913573335766c7042b4ba16681ded9e9a9f7a41d30e0551a4b7dcf5', '[\"*\"]', '2025-03-07 16:20:59', '2025-04-07 11:44:08', '2025-03-07 16:18:18', '2025-04-07 11:44:08'),
(239, 'App\\Models\\SalesModel', 1, 'sales_token', '9164e4d1f7467f9324bcf144bbb00184bea5291f38613f6eef35c970640ea242', '[\"*\"]', '2025-03-07 18:19:54', '2025-04-07 11:44:10', '2025-03-07 18:19:38', '2025-04-07 11:44:10'),
(240, 'App\\Models\\SalesModel', 1, 'sales_token', '85faa2a25367812da1a745af67f55cbe2420e861196c2ddc3ffd0de487185021', '[\"*\"]', '2025-03-07 20:27:10', '2025-04-07 11:44:10', '2025-03-07 20:26:29', '2025-04-07 11:44:10'),
(241, 'App\\Models\\User', 3, 'remember_token', 'cc5cb2159acb1b228b026976fa1bf59b06e726e204ae395930231631d60e783a', '[\"*\"]', '2025-03-07 20:27:55', '2025-04-07 11:44:08', '2025-03-07 20:27:45', '2025-04-07 11:44:08'),
(242, 'App\\Models\\User', 1, 'remember_token', '2d6633eaa90e66c1c3da7a2502f5766cb005f705521ca949e424e8e26ba7ac93', '[\"*\"]', '2025-03-09 15:10:18', NULL, '2025-03-09 15:10:18', '2025-03-09 15:10:18'),
(243, 'App\\Models\\User', 3, 'remember_token', '12ac41a884731a7da606f6117ad8d0f96886acf2c5ca812160e10d34ae716f35', '[\"*\"]', '2025-03-10 10:05:34', '2025-04-07 11:44:08', '2025-03-10 10:04:55', '2025-04-07 11:44:08'),
(244, 'App\\Models\\User', 3, 'remember_token', 'a7cae2fe2b6db397fe54e7886c56e257d73a2018831fa8af6b89994c3d7eea9d', '[\"*\"]', NULL, '2025-04-07 11:44:08', '2025-03-10 10:18:03', '2025-04-07 11:44:08'),
(245, 'App\\Models\\User', 3, 'remember_token', '597e10ea88aa72aad3a6a4325c613bc9bd09c12a5cf180b7996e4634d99230a7', '[\"*\"]', '2025-03-10 10:23:32', '2025-04-07 11:44:08', '2025-03-10 10:18:13', '2025-04-07 11:44:08'),
(246, 'App\\Models\\SalesModel', 1, 'sales_token', 'fd28f16c233b6735a196ae621f18ce6e314ac03f4d9840feb9767ec75edbd27e', '[\"*\"]', '2025-03-10 12:16:43', '2025-04-07 11:44:10', '2025-03-10 12:14:50', '2025-04-07 11:44:10'),
(247, 'App\\Models\\SalesModel', 1, 'sales_token', 'c8f1eaa6bc732319d35bae8f09446d7fed61dc071732fc4cee8e5b40bc9884e5', '[\"*\"]', '2025-03-10 12:21:42', '2025-04-07 11:44:10', '2025-03-10 12:21:27', '2025-04-07 11:44:10'),
(248, 'App\\Models\\SalesModel', 1, 'sales_token', 'fdf7b554f0acdc3e26b95c0538ab3f6ed70fcef158c38bcad03e19f9bb048a68', '[\"*\"]', '2025-03-10 12:28:19', '2025-04-07 11:44:10', '2025-03-10 12:22:22', '2025-04-07 11:44:10'),
(249, 'App\\Models\\SalesModel', 1, 'sales_token', 'fd849ad07a2d7fc231115318371894ab0647378b88c7ed1716d7ac644bd38810', '[\"*\"]', '2025-03-10 12:31:02', '2025-04-07 11:44:10', '2025-03-10 12:30:48', '2025-04-07 11:44:10'),
(250, 'App\\Models\\SalesModel', 1, 'sales_token', 'ee213f223a16b24c48f5ed205b5fec279f1ddc3813f9bb89061358390734f6e8', '[\"*\"]', '2025-03-10 13:47:41', '2025-04-07 11:44:10', '2025-03-10 13:43:10', '2025-04-07 11:44:10'),
(251, 'App\\Models\\SalesModel', 1, 'sales_token', '2e90309ead1e2da9cb4935e009cdfe760af7c2a0864e51eaa483928417bfd396', '[\"*\"]', '2025-03-10 14:01:43', '2025-04-07 11:44:10', '2025-03-10 14:01:17', '2025-04-07 11:44:10'),
(252, 'App\\Models\\User', 1, 'remember_token', '600ec9f2cddb414295a768bbdd8baecba685929d842b3fdc4d2fde1bb0be496a', '[\"*\"]', '2025-03-10 16:27:08', NULL, '2025-03-10 16:27:02', '2025-03-10 16:27:08'),
(253, 'App\\Models\\User', 3, 'remember_token', 'a4afe46726b1f79828bf25234359db3497d9c743b0a613f08e53982351108acd', '[\"*\"]', '2025-03-10 16:31:36', '2025-04-07 11:44:08', '2025-03-10 16:27:08', '2025-04-07 11:44:08'),
(254, 'App\\Models\\User', 3, 'remember_token', '75ab86a4cdc3978b0e1492a9b9b54ad0bc0481888ad2e566b3eb989005d89fab', '[\"*\"]', '2025-03-10 16:46:33', '2025-04-07 11:44:08', '2025-03-10 16:32:51', '2025-04-07 11:44:08'),
(255, 'App\\Models\\User', 3, 'remember_token', 'e3817cfc08c8e7a773290392629092d5735e58ece7db40673bb6c9a88b9b8659', '[\"*\"]', '2025-03-10 18:19:20', '2025-04-07 11:44:08', '2025-03-10 18:06:41', '2025-04-07 11:44:08'),
(256, 'App\\Models\\SalesModel', 1, 'sales_token', '1b5973295bee13feaa77d4f88f360e11ddefd51a3c08611a7dadb27ea1ab9fe2', '[\"*\"]', '2025-03-10 18:16:44', '2025-04-07 11:44:10', '2025-03-10 18:15:38', '2025-04-07 11:44:10'),
(257, 'App\\Models\\SalesModel', 1, 'sales_token', '90b35dbeed6c3e34e76d7f61698a8b375fd6f4d710bf7d2cea25cc22b7772c92', '[\"*\"]', '2025-03-11 10:42:07', '2025-04-07 11:44:10', '2025-03-11 10:13:53', '2025-04-07 11:44:10'),
(258, 'App\\Models\\SalesModel', 1, 'sales_token', '94f1f0ba64f4b5d120f51045b3419ceb60e5f13a4ba4031ad008c39dc03cf954', '[\"*\"]', '2025-03-11 10:55:58', '2025-04-07 11:44:10', '2025-03-11 10:23:37', '2025-04-07 11:44:10'),
(259, 'App\\Models\\SalesModel', 1, 'sales_token', '927a9d7f5f198fabf5bf552ac4b1d7d10dbdfeb9473065b31eebf15546f08ba2', '[\"*\"]', '2025-03-11 10:49:01', '2025-04-07 11:44:10', '2025-03-11 10:44:44', '2025-04-07 11:44:10'),
(260, 'App\\Models\\SalesModel', 1, 'sales_token', '70d2e31162d84854fb35c9b00710a9c3314bce9a9ef16c99f848497d26e96caf', '[\"*\"]', '2025-03-11 11:00:34', '2025-04-07 11:44:10', '2025-03-11 10:51:11', '2025-04-07 11:44:10'),
(261, 'App\\Models\\User', 3, 'remember_token', '8492a229d73001c18dcfcbf3ad968919b58dd93f61ce40a6ac0f474e94ed3fb8', '[\"*\"]', '2025-03-11 10:57:17', '2025-04-07 11:44:08', '2025-03-11 10:54:52', '2025-04-07 11:44:08'),
(262, 'App\\Models\\User', 3, 'remember_token', 'a1a106ae5483818cafdf6407a1245bfebf7fe691100811fae97b6b8efdc3ab39', '[\"*\"]', '2025-03-11 11:25:31', '2025-04-07 11:44:08', '2025-03-11 11:01:36', '2025-04-07 11:44:08'),
(263, 'App\\Models\\User', 3, 'remember_token', '3d61e0b58fa6d1a25e337651b4efcbf05e12ca117e658d6ae15df61686447fcd', '[\"*\"]', '2025-03-11 11:26:10', '2025-04-07 11:44:08', '2025-03-11 11:25:36', '2025-04-07 11:44:08'),
(264, 'App\\Models\\SalesModel', 1, 'sales_token', '92ab7c895d133c070bf2f653ea58987736fdb5dde9b94b2bf9f583463e566fb7', '[\"*\"]', '2025-03-11 13:08:29', '2025-04-07 11:44:10', '2025-03-11 13:07:43', '2025-04-07 11:44:10'),
(265, 'App\\Models\\User', 1, 'remember_token', 'a379b765c4dd5a2888d33367def580aa6b52cf1a911411b81438b705b8f68d6d', '[\"*\"]', '2025-03-11 15:59:25', NULL, '2025-03-11 15:59:24', '2025-03-11 15:59:25'),
(266, 'App\\Models\\SalesModel', 1, 'sales_token', 'f28a421dc241ebe023bdc35112684a4e86ea771a59a23c69a27caddc76736d6d', '[\"*\"]', '2025-03-11 17:05:56', '2025-04-07 11:44:10', '2025-03-11 16:56:04', '2025-04-07 11:44:10'),
(267, 'App\\Models\\User', 1, 'remember_token', '9f2c8aeeac1c92bb93d3c5d91f3d2607c0bf53e8682d9ea1d85d9fd3ea3112d1', '[\"*\"]', '2025-03-13 13:16:54', NULL, '2025-03-13 13:09:30', '2025-03-13 13:16:54'),
(268, 'App\\Models\\SalesModel', 5, 'sales_token', 'ec0e05821dc1efe4e92b66982e65b3b5327b84a264bb0bee766e74414c7dd067', '[\"*\"]', '2025-03-13 13:19:35', '2025-04-18 13:49:33', '2025-03-13 13:13:14', '2025-04-18 13:49:33'),
(269, 'App\\Models\\User', 4, 'remember_token', '8ef2bf37f74ab75563e5845c77a7487ce9a4d30c44d75f8a387684029ca56cf9', '[\"*\"]', '2025-03-13 13:18:29', '2025-04-14 02:20:19', '2025-03-13 13:16:54', '2025-04-14 02:20:19'),
(270, 'App\\Models\\User', 1, 'remember_token', '6fd54fa10e793cfc304e6914260c535927d35da2dd3f10caa1869de896b13377', '[\"*\"]', '2025-03-13 14:54:51', NULL, '2025-03-13 14:41:38', '2025-03-13 14:54:51'),
(271, 'App\\Models\\User', 4, 'remember_token', '90d5c38ffaba540aaefd68c15c10446db1a96d6f00a3fd2fbfb5fbd80ff2062b', '[\"*\"]', '2025-03-13 15:14:46', '2025-04-14 02:20:19', '2025-03-13 14:42:03', '2025-04-14 02:20:19'),
(272, 'App\\Models\\User', 1, 'remember_token', '5021963910983bbfcdbcc595dae79c396ee7861920c095f4d89be4cd6da6cf63', '[\"*\"]', '2025-03-13 14:46:14', NULL, '2025-03-13 14:46:02', '2025-03-13 14:46:14'),
(273, 'App\\Models\\SalesModel', 5, 'sales_token', '3bd23c13ddfb7bba0bacc83087ae9f1fb0fd0779831537a756a4977b08962993', '[\"*\"]', '2025-03-13 16:48:45', '2025-04-18 13:49:33', '2025-03-13 16:20:33', '2025-04-18 13:49:33'),
(274, 'App\\Models\\User', 1, 'remember_token', '7a4ff28a898f299b26f591dfb08eed0eaccd48ed89b9d464ecc082670cb11af5', '[\"*\"]', '2025-03-13 16:21:50', NULL, '2025-03-13 16:21:42', '2025-03-13 16:21:50'),
(275, 'App\\Models\\User', 4, 'remember_token', '798cdeb408b1daff7bbb4981e8f6d54f0895774f189904d25f8439d7dcb39288', '[\"*\"]', '2025-03-13 16:59:03', '2025-04-14 02:20:19', '2025-03-13 16:21:58', '2025-04-14 02:20:19'),
(276, 'App\\Models\\SalesModel', 5, 'sales_token', '38f8169988cccc3dd35d8bdf5a2a053104adb2b3d43a100d8ec8c95104f35488', '[\"*\"]', '2025-03-13 16:58:16', '2025-04-18 13:49:33', '2025-03-13 16:49:11', '2025-04-18 13:49:33'),
(277, 'App\\Models\\SalesModel', 5, 'sales_token', 'e69ef137f86f1fe6e288d9d3b110b7aca05287624dd35b185c3958d853a731cb', '[\"*\"]', '2025-03-13 16:59:14', '2025-04-18 13:49:33', '2025-03-13 16:58:27', '2025-04-18 13:49:33'),
(278, 'App\\Models\\SalesModel', 5, 'sales_token', 'f574f6cd159d75867c0f5cfc6cdcfa8c58b11d41946f37b3c600fb02bcf1e24d', '[\"*\"]', '2025-03-13 17:20:43', '2025-04-18 13:49:33', '2025-03-13 16:59:57', '2025-04-18 13:49:33'),
(279, 'App\\Models\\User', 4, 'remember_token', 'd52a039b05eca5482708755de3fc24c3740faf87fcb600de924aa45cc452463f', '[\"*\"]', '2025-03-13 17:35:58', '2025-04-14 02:20:19', '2025-03-13 17:33:37', '2025-04-14 02:20:19'),
(280, 'App\\Models\\SalesModel', 1, 'sales_token', '155cb7e4241b76f908b59c0179e0f1d66173c8b5c08c9d21e1d6fb36347d6000', '[\"*\"]', '2025-03-17 12:32:15', '2025-04-07 11:44:10', '2025-03-17 12:30:05', '2025-04-07 11:44:10'),
(281, 'App\\Models\\User', 1, 'remember_token', '3a540f8e582205876d043f70550100cfc9bff137c1debe96b7e88f4706584765', '[\"*\"]', '2025-03-17 15:35:34', NULL, '2025-03-17 15:35:34', '2025-03-17 15:35:34'),
(282, 'App\\Models\\SalesModel', 1, 'sales_token', 'c064eecb23754449fada3ffe5c6ab0847415e7d91086f2b8e938c6d5d41b8275', '[\"*\"]', '2025-03-17 15:51:13', '2025-04-07 11:44:10', '2025-03-17 15:50:20', '2025-04-07 11:44:10'),
(283, 'App\\Models\\SalesModel', 1, 'sales_token', 'ec4377b0574384ddce6ed84f21ca2db40bdced3539e178362ecc15597a57a683', '[\"*\"]', '2025-03-17 15:58:14', '2025-04-07 11:44:10', '2025-03-17 15:57:47', '2025-04-07 11:44:10'),
(284, 'App\\Models\\SalesModel', 1, 'sales_token', 'e8c1a9e4e8d91998ffb7c3e47a1c338f3ddbf640421e55135daaa0fdfb84af37', '[\"*\"]', '2025-03-17 16:26:14', '2025-04-07 11:44:10', '2025-03-17 16:26:11', '2025-04-07 11:44:10'),
(285, 'App\\Models\\SalesModel', 1, 'sales_token', 'd2e1da6785a37f8a277d6dae7ac0a6134e3e0c638e3a3cfd992c1faf208c65dd', '[\"*\"]', '2025-03-17 16:32:33', '2025-04-07 11:44:10', '2025-03-17 16:32:28', '2025-04-07 11:44:10'),
(286, 'App\\Models\\SalesModel', 1, 'sales_token', 'b30089567a37b3ad7cf57c07b8cfdeec65174ef738224ab448169c3bd174dc84', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-18 16:16:18', '2025-04-07 11:44:10'),
(287, 'App\\Models\\SalesModel', 1, 'sales_token', '48bf2bccdfff883e19144d900b688485eeaf821a2388415ccfbaf5b6b5ae60b6', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-18 16:16:32', '2025-04-07 11:44:10'),
(288, 'App\\Models\\SalesModel', 1, 'sales_token', 'cb9b9bd10f37c08db4a036d29d1756559248851b9e18c280de1433c3436d01bd', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-18 16:20:07', '2025-04-07 11:44:10'),
(289, 'App\\Models\\SalesModel', 1, 'sales_token', '9f79745f9c1e38eb373b43d03b1c099a5f5f3bb7c80ba1a7bba3b90bdacc4f3f', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-18 16:24:10', '2025-04-07 11:44:10'),
(290, 'App\\Models\\SalesModel', 1, 'sales_token', '3bb4fc2d1a3edefa1be2a37f06c45ffb6e6aa29ac56f2a67b590b1851ac5572c', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-18 16:25:12', '2025-04-07 11:44:10'),
(291, 'App\\Models\\SalesModel', 1, 'sales_token', 'dd2ac7ce68d9334b516b4b65337856d1415e4099823115606f3b427415e967e6', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-18 16:25:23', '2025-04-07 11:44:10'),
(292, 'App\\Models\\SalesModel', 1, 'sales_token', '0144e8d85cd53f7d6c76dc2ef889e25a126fe42eebc4577f5b3e8a202b94a099', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-18 16:40:56', '2025-04-07 11:44:10'),
(293, 'App\\Models\\User', 3, 'remember_token', '0e08ae433744f02148945ed7663c20583db7e13f16ec45efd2c4ed515a1c5471', '[\"*\"]', '2025-03-18 18:51:21', '2025-04-07 11:44:08', '2025-03-18 18:25:07', '2025-04-07 11:44:08'),
(294, 'App\\Models\\User', 3, 'remember_token', '806b9fc95ba0e25baae69adfba182d717757e6cff2e5c9708165d6777a561862', '[\"*\"]', '2025-03-18 19:24:16', '2025-04-07 11:44:09', '2025-03-18 19:18:06', '2025-04-07 11:44:09'),
(295, 'App\\Models\\SalesModel', 1, 'sales_token', '84bcb00310758f5974dd43883293fb620184e4452d13cf71562c39461ae29c10', '[\"*\"]', '2025-03-18 19:23:30', '2025-04-07 11:44:10', '2025-03-18 19:21:09', '2025-04-07 11:44:10'),
(296, 'App\\Models\\SalesModel', 1, 'sales_token', 'ff1b2c33429305942f95da87996e85c6881ba000b83ac3d000a76c0e135e69bf', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-18 20:51:06', '2025-04-07 11:44:10'),
(297, 'App\\Models\\SalesModel', 1, 'sales_token', '177a31e955cfd7fc356d4262e86a6fe031e4157ddaa08a9a40f51dc1010ad986', '[\"*\"]', '2025-03-18 21:49:29', '2025-04-07 11:44:10', '2025-03-18 20:52:45', '2025-04-07 11:44:10'),
(298, 'App\\Models\\User', 1, 'remember_token', 'b84c942e73d7f00f5166238bc962a085dbcba58c4beb54888d691f40ee2b829a', '[\"*\"]', '2025-03-20 13:04:00', NULL, '2025-03-20 13:02:43', '2025-03-20 13:04:00'),
(299, 'App\\Models\\User', 1, 'remember_token', 'e1b65b8373a0fa3d49b5f6174af62b2e2ff24072d19391150eb1537f703208ae', '[\"*\"]', '2025-03-20 14:25:34', NULL, '2025-03-20 14:23:01', '2025-03-20 14:25:34'),
(300, 'App\\Models\\SalesModel', 5, 'sales_token', 'cd2acc69e55611d426a609c507df63ac1d9fa204128d3b450da747993014fe8c', '[\"*\"]', '2025-03-20 15:20:37', '2025-04-18 13:49:33', '2025-03-20 14:23:26', '2025-04-18 13:49:33'),
(301, 'App\\Models\\User', 4, 'remember_token', '225927723a728f982bb6a643b618b94258380cc9511209a52f069bc7ef6fc306', '[\"*\"]', '2025-03-20 15:21:09', '2025-04-14 02:20:19', '2025-03-20 14:25:34', '2025-04-14 02:20:19'),
(302, 'App\\Models\\User', 1, 'remember_token', '5eb3877d64b12e62822747830a2f0479cd6a37869487314a43731f25660f577a', '[\"*\"]', '2025-03-20 15:32:45', NULL, '2025-03-20 15:32:40', '2025-03-20 15:32:45'),
(303, 'App\\Models\\User', 4, 'remember_token', '6f63025a97150623cfd752a98577ca14ea067d88e2c00873d7ff5feb81d9d1f0', '[\"*\"]', '2025-03-20 15:32:47', '2025-04-14 02:20:19', '2025-03-20 15:32:45', '2025-04-14 02:20:19'),
(304, 'App\\Models\\SalesModel', 5, 'sales_token', '4deb6754bdd8be1f533a7ff639076b2b7a566d4fa519ac38dad55fb01153658b', '[\"*\"]', '2025-03-20 15:43:19', '2025-04-18 13:49:33', '2025-03-20 15:43:14', '2025-04-18 13:49:33'),
(305, 'App\\Models\\SalesModel', 5, 'sales_token', '5d588356edf2d2533973ade6f006418d6920e70fb397d1d66817c55bac328aa5', '[\"*\"]', '2025-03-20 15:43:37', '2025-04-18 13:49:33', '2025-03-20 15:43:35', '2025-04-18 13:49:33'),
(306, 'App\\Models\\User', 3, 'remember_token', '6fd21ab25deda39aa7d1150a0f0fd1ad2d847dfd1a2f358e5804ce7d1d30e9e6', '[\"*\"]', '2025-03-21 12:13:01', '2025-04-07 11:44:09', '2025-03-21 12:12:55', '2025-04-07 11:44:09'),
(307, 'App\\Models\\User', 1, 'remember_token', 'bf7a5cf80485d0fadbeebed014da49ef6a17fe596cd9a74c2e9f4fad5c347aec', '[\"*\"]', '2025-03-21 13:49:24', NULL, '2025-03-21 12:51:05', '2025-03-21 13:49:24'),
(308, 'App\\Models\\User', 1, 'remember_token', '48498e1ddbc0fc1991f8511723fd8e839525cf3ea987ce938790aad2ec3179d4', '[\"*\"]', '2025-03-24 16:25:49', NULL, '2025-03-24 16:25:19', '2025-03-24 16:25:49'),
(309, 'App\\Models\\User', 1, 'remember_token', 'ea99ce5e0ff0207a40fad19b549be68fc9314e7bf50e4a063deffd97decd7100', '[\"*\"]', '2025-03-24 18:24:17', NULL, '2025-03-24 18:23:52', '2025-03-24 18:24:17'),
(310, 'App\\Models\\User', 4, 'remember_token', 'ed6157292d12d04d35b85fd99eae8e7f5246cffcdfcfd0cea2dbf01eb867ba0f', '[\"*\"]', '2025-03-24 18:24:21', '2025-04-14 02:20:19', '2025-03-24 18:24:17', '2025-04-14 02:20:19'),
(311, 'App\\Models\\SalesModel', 1, 'sales_token', '1c2f6a0447b593500210bc28ace044d3c0290fbce01420384a27514161ecd511', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-25 11:54:52', '2025-04-07 11:44:10'),
(312, 'App\\Models\\SalesModel', 1, 'sales_token', 'ac016c9d58bf4560d74e0b4a95906cff682b5f404f77dc39dcf81a0d472449d9', '[\"*\"]', '2025-03-25 11:58:04', '2025-04-07 11:44:10', '2025-03-25 11:57:34', '2025-04-07 11:44:10'),
(313, 'App\\Models\\SalesModel', 1, 'sales_token', '26f64d2a5f3c81c941ba76f89e4d746a763fd5317583bbdce1bb71e7221bf127', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-25 12:10:06', '2025-04-07 11:44:10'),
(314, 'App\\Models\\SalesModel', 1, 'sales_token', '8a7b0dc65338dca93343c5cecb1078a9effa353bd9c0e148ac4ce547a9ef6b36', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-25 12:14:46', '2025-04-07 11:44:10'),
(315, 'App\\Models\\SalesModel', 1, 'sales_token', 'e8be50962400ed971d3792ca9c0a36692b10b4328c4700c41ac6bf43c0d0808c', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-25 12:27:57', '2025-04-07 11:44:10'),
(316, 'App\\Models\\SalesModel', 1, 'sales_token', '41118d8c89e26e287a7810f49683da8a85a1868c304e58095235ad489dc60e0d', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-25 12:33:05', '2025-04-07 11:44:10'),
(317, 'App\\Models\\User', 3, 'remember_token', '438918687340f49148a819739d5a0c935ee952acc95baf5f39a89947f0793cca', '[\"*\"]', '2025-03-25 17:28:32', '2025-04-07 11:44:09', '2025-03-25 17:28:27', '2025-04-07 11:44:09'),
(318, 'App\\Models\\SalesModel', 1, 'sales_token', '83f599ed2db90ae895af334cc7b05232aaa63e885eb019ce788a8592ad4cd805', '[\"*\"]', '2025-03-26 11:17:33', '2025-04-07 11:44:10', '2025-03-26 10:23:06', '2025-04-07 11:44:10'),
(319, 'App\\Models\\SalesModel', 1, 'sales_token', 'c7e90da355301c02973d57939f45a5b169b5486e07ee6b1d9219ea0a4b13e7ff', '[\"*\"]', '2025-03-26 10:39:47', '2025-04-07 11:44:10', '2025-03-26 10:38:24', '2025-04-07 11:44:10'),
(320, 'App\\Models\\User', 3, 'remember_token', '66d6bab2bb066203173e43b943b9e8c0f0f206b080d00d1e0cdda12cf68a715c', '[\"*\"]', '2025-03-26 10:57:36', '2025-04-07 11:44:09', '2025-03-26 10:40:24', '2025-04-07 11:44:09'),
(321, 'App\\Models\\SalesModel', 1, 'sales_token', '3dadf2b39c4d1f265a66e577f310552bbff2f278be435272b5b2b96af11b147f', '[\"*\"]', '2025-03-26 11:13:21', '2025-04-07 11:44:10', '2025-03-26 10:52:26', '2025-04-07 11:44:10'),
(322, 'App\\Models\\SalesModel', 1, 'sales_token', 'f0fffd0751f269c299e2496db0bdab591f60eca8b56d1afd62b274f2192494b4', '[\"*\"]', '2025-03-26 19:06:59', '2025-04-07 11:44:10', '2025-03-26 18:59:42', '2025-04-07 11:44:10'),
(323, 'App\\Models\\User', 3, 'remember_token', '096d2795b24594786dcf38c12f3de964719c91330858664e0d6bad80d0ced6e2', '[\"*\"]', '2025-03-27 12:23:48', '2025-04-07 11:44:09', '2025-03-27 12:10:10', '2025-04-07 11:44:09'),
(324, 'App\\Models\\SalesModel', 1, 'sales_token', '85395580d77b0c9b7e346a98a87531adbd4a5de05253e9936cb671802a3d9d27', '[\"*\"]', '2025-03-27 12:17:35', '2025-04-07 11:44:10', '2025-03-27 12:16:37', '2025-04-07 11:44:10'),
(325, 'App\\Models\\SalesModel', 1, 'sales_token', '3709de479d08a36f88fccb05d23c68a48c45b77391aa1f6ef83059ad36b78064', '[\"*\"]', '2025-03-27 12:23:28', '2025-04-07 11:44:10', '2025-03-27 12:22:26', '2025-04-07 11:44:10'),
(326, 'App\\Models\\User', 1, 'remember_token', '17168a4f6592f3faa1eded2c0fd0cb867c0fb717c4b61f92b9be3e592539a628', '[\"*\"]', '2025-03-27 14:48:10', NULL, '2025-03-27 14:48:10', '2025-03-27 14:48:10'),
(327, 'App\\Models\\SalesModel', 1, 'sales_token', '92262971dd9e0e6b6acf3d8295e8a467e6bb236264aa8123570fd19c60f2789a', '[\"*\"]', '2025-03-27 17:17:44', '2025-04-07 11:44:10', '2025-03-27 17:14:30', '2025-04-07 11:44:10'),
(328, 'App\\Models\\User', 3, 'remember_token', 'a46ef92d5c4416d06b87915508ee8ad484785abca6ca3ac3288386f2bce3875d', '[\"*\"]', '2025-03-27 17:17:35', '2025-04-07 11:44:09', '2025-03-27 17:16:23', '2025-04-07 11:44:09'),
(329, 'App\\Models\\SalesModel', 1, 'sales_token', 'aad675d0aa4dc96790240ac123308eaa7b4f34b42123eb428863ef3f1adff201', '[\"*\"]', '2025-03-27 17:36:26', '2025-04-07 11:44:10', '2025-03-27 17:36:13', '2025-04-07 11:44:10'),
(330, 'App\\Models\\SalesModel', 1, 'sales_token', 'bd77158c42ade3b2a90eaa495a252d8de1e9334e69f311b88b6c07319e95e013', '[\"*\"]', NULL, '2025-04-07 11:44:10', '2025-03-27 17:48:52', '2025-04-07 11:44:10'),
(331, 'App\\Models\\SalesModel', 1, 'sales_token', '8206ccb7b057b10923ea08d15e14d5dc87113f193a45d705e153bffe69ce872b', '[\"*\"]', '2025-03-27 17:58:37', '2025-04-07 11:44:10', '2025-03-27 17:53:19', '2025-04-07 11:44:10'),
(332, 'App\\Models\\SalesModel', 5, 'sales_token', '15183f762f8ef8bc4dc02ccf16d18b31fa5d2241c5101bd24706b88831b3a2ee', '[\"*\"]', '2025-03-28 00:47:30', '2025-04-18 13:49:33', '2025-03-28 00:43:03', '2025-04-18 13:49:33'),
(333, 'App\\Models\\User', 1, 'remember_token', '0b020342efbed979d7db0a889f6b0f7d9de572f531e4585c389f548576ef3edb', '[\"*\"]', '2025-03-28 14:03:42', NULL, '2025-03-28 14:02:45', '2025-03-28 14:03:42'),
(334, 'App\\Models\\User', 4, 'remember_token', '7d8ad669148c91b82b47e2905c16f4905cf54a9c5c6ef0ec888c60600e1aeaa0', '[\"*\"]', '2025-03-28 14:41:27', '2025-04-14 02:20:19', '2025-03-28 14:03:39', '2025-04-14 02:20:19'),
(335, 'App\\Models\\SalesModel', 5, 'sales_token', '62b61c0e95dd8a1dfd5cc37be642e60d9101b35f9ccf6b76b36dc04d45085fec', '[\"*\"]', '2025-03-28 14:16:01', '2025-04-18 13:49:33', '2025-03-28 14:14:44', '2025-04-18 13:49:33'),
(336, 'App\\Models\\SalesModel', 5, 'sales_token', '697d6138eb52b43de30e0f77e115651d1a95732afdb676f4c32cfd620ff1eb19', '[\"*\"]', '2025-03-28 15:06:38', '2025-04-18 13:49:33', '2025-03-28 14:16:51', '2025-04-18 13:49:33'),
(337, 'App\\Models\\User', 1, 'remember_token', 'bf4c87f15deee76a422b927100f480cf2e90667a8990c718cdf8a2d973f58f8f', '[\"*\"]', '2025-03-28 15:23:23', NULL, '2025-03-28 15:05:48', '2025-03-28 15:23:23'),
(338, 'App\\Models\\SalesModel', 5, 'sales_token', '2f6949aa8113be5b8351740aa2f475185341dfed1474f7a41f9f41a53a06257f', '[\"*\"]', '2025-03-28 15:07:07', '2025-04-18 13:49:33', '2025-03-28 15:07:04', '2025-04-18 13:49:33'),
(339, 'App\\Models\\User', 4, 'remember_token', '6dfb2065a76aa4d489e28b7d379d601700fe1d14c80e85b5d8e383a64f3bd272', '[\"*\"]', '2025-03-28 15:23:12', '2025-04-14 02:20:19', '2025-03-28 15:07:56', '2025-04-14 02:20:19'),
(340, 'App\\Models\\User', 1, 'remember_token', '2e0d0e4752d9108fbf1f59f67f419be0e712d4f38876de149728d779188c7188', '[\"*\"]', '2025-03-28 16:58:17', NULL, '2025-03-28 16:15:16', '2025-03-28 16:58:17'),
(341, 'App\\Models\\User', 4, 'remember_token', '5c00b10d22a13f75b8edb14e43144bc02f6040ad900fb7e97e5fd51e65519c35', '[\"*\"]', '2025-03-28 17:03:08', '2025-04-14 02:20:19', '2025-03-28 16:18:55', '2025-04-14 02:20:19'),
(342, 'App\\Models\\User', 1, 'remember_token', 'b9976198f2b9edc01c0a6db2029c66df8ed74bb22748164f7abedbe6b22ee949', '[\"*\"]', '2025-03-28 19:49:19', NULL, '2025-03-28 19:34:24', '2025-03-28 19:49:19'),
(343, 'App\\Models\\User', 5, 'remember_token', '432175adba0cd9d47d4192e874e9f1a93f28d63a6408ac29d1d140f6967c1536', '[\"*\"]', '2025-03-28 20:11:47', '2025-04-14 02:17:37', '2025-03-28 19:49:48', '2025-04-14 02:17:37'),
(344, 'App\\Models\\SalesModel', 5, 'sales_token', '1e04a910cdccc48e6baa63edd8a2a2c4510a28e8a2c78cc12a274f48d3cc426a', '[\"*\"]', '2025-03-28 19:54:15', '2025-04-18 13:49:33', '2025-03-28 19:54:12', '2025-04-18 13:49:33'),
(345, 'App\\Models\\User', 4, 'remember_token', 'b04f72b66230f7a364a81208d9affc7ae56c3fc2b410bd4bce47e428e0c5941a', '[\"*\"]', '2025-03-28 20:11:54', '2025-04-14 02:20:19', '2025-03-28 20:11:47', '2025-04-14 02:20:19'),
(346, 'App\\Models\\User', 1, 'remember_token', '3cc7c64a3831cf5a5aa157ff00dba7a64e9502c8c66a2628e41087b03f6a9a28', '[\"*\"]', '2025-03-29 02:51:17', NULL, '2025-03-29 02:50:52', '2025-03-29 02:51:17'),
(347, 'App\\Models\\User', 4, 'remember_token', '22309f1aa7308ee30f160fdcc12662b74554ab0c0827632264ff2c352962bd04', '[\"*\"]', '2025-03-29 03:03:50', '2025-04-14 02:20:19', '2025-03-29 02:51:17', '2025-04-14 02:20:19'),
(348, 'App\\Models\\User', 1, 'remember_token', 'd4dbb18e6a50a53579b784943e6d4fd647e79ae9acd43c903ac9f1c3a9b2d1d4', '[\"*\"]', '2025-03-31 16:30:40', NULL, '2025-03-31 16:29:11', '2025-03-31 16:30:40'),
(349, 'App\\Models\\User', 1, 'remember_token', 'f71f01b62707df3977583662fa19ba15a11edd3225c2c270518e5377370e4d13', '[\"*\"]', '2025-03-31 18:03:44', NULL, '2025-03-31 17:54:42', '2025-03-31 18:03:44'),
(350, 'App\\Models\\User', 1, 'remember_token', 'c6dfab1edb3c4e315f1206fe959b5c4dcc8a17f010eec7d13e6f3d95ab82f6db', '[\"*\"]', '2025-04-01 15:31:28', NULL, '2025-04-01 15:29:05', '2025-04-01 15:31:28'),
(351, 'App\\Models\\User', 3, 'remember_token', '1dd2eacd5dc868522a8345bcbd090d49f16b02fd8155b02d85f695f372d6f6a3', '[\"*\"]', '2025-04-01 15:38:57', '2025-04-07 11:44:09', '2025-04-01 15:31:28', '2025-04-07 11:44:09'),
(352, 'App\\Models\\User', 3, 'remember_token', '509e0417b8200feb4a2c047626eeb331b9004ca77199318409f29101b501b207', '[\"*\"]', '2025-04-01 18:20:16', '2025-04-07 11:44:09', '2025-04-01 18:19:55', '2025-04-07 11:44:09'),
(353, 'App\\Models\\User', 3, 'remember_token', '265bcc2bca9dd0cad634a7f8d1e629a701a8b967e1ebd631f5ebf9e36474e2a0', '[\"*\"]', '2025-04-02 12:24:10', '2025-04-07 11:44:09', '2025-04-02 12:24:08', '2025-04-07 11:44:09'),
(354, 'App\\Models\\User', 1, 'remember_token', 'bed3d2d5f07949746871bc630beb99b36a86bb594355ae428d9f02dfdb81e296', '[\"*\"]', '2025-04-02 12:25:08', NULL, '2025-04-02 12:24:32', '2025-04-02 12:25:08'),
(355, 'App\\Models\\User', 3, 'remember_token', 'ad358ac83a3a7c43a852589d08fc468f1a0f153a97def63a2f93699020742f53', '[\"*\"]', '2025-04-02 12:28:08', '2025-04-07 11:44:09', '2025-04-02 12:25:15', '2025-04-07 11:44:09'),
(356, 'App\\Models\\User', 3, 'remember_token', '6f63079da640ad2bd7c42f032a1487d5f44cf64b85cb7001b448e2553c8df9ae', '[\"*\"]', '2025-04-02 14:02:08', '2025-04-07 11:44:09', '2025-04-02 13:56:22', '2025-04-07 11:44:09'),
(357, 'App\\Models\\User', 1, 'remember_token', 'd8f12dc1a48cfb7dc1f6b5c7e9c363f8cbdd041a0637ea25383d442a0d776d94', '[\"*\"]', '2025-04-04 15:26:00', NULL, '2025-04-04 15:15:24', '2025-04-04 15:26:00'),
(358, 'App\\Models\\User', 3, 'remember_token', '73a3f2b28b1b4cb85a8b8f74700c8a5387b8c09995047edc1b7b12d922994111', '[\"*\"]', '2025-04-04 15:18:06', '2025-04-07 11:44:09', '2025-04-04 15:16:51', '2025-04-07 11:44:09'),
(359, 'App\\Models\\User', 3, 'remember_token', '2277d3bcf1741930ac08e3288f69e4379f57d1d40a7a8efbafc971548c128012', '[\"*\"]', '2025-04-04 15:18:40', '2025-04-07 11:44:09', '2025-04-04 15:18:40', '2025-04-07 11:44:09'),
(360, 'App\\Models\\User', 3, 'remember_token', '20b8e4ad0c774e6e0da563f35998d7f678cdc3caa26586754d40a11a3c885134', '[\"*\"]', '2025-04-04 15:40:12', '2025-04-07 11:44:09', '2025-04-04 15:26:00', '2025-04-07 11:44:09'),
(361, 'App\\Models\\User', 1, 'remember_token', '7cd825b1a3f69b961a27d349489a35d0af96966617bd9075f187d0b388e68895', '[\"*\"]', '2025-04-07 11:50:18', NULL, '2025-04-07 11:27:30', '2025-04-07 11:50:18'),
(362, 'App\\Models\\User', 4, 'remember_token', 'c4e09320ab393f6d19c35197cff9829a9fb2e81de934241fa7b52f5ea8adae44', '[\"*\"]', '2025-04-07 11:27:40', '2025-04-14 02:20:19', '2025-04-07 11:27:39', '2025-04-14 02:20:19'),
(363, 'App\\Models\\User', 4, 'remember_token', '2b966b0e1831dd64a253166898e3dbe52fc5deef6bf2be350c4c18fb3a990628', '[\"*\"]', '2025-04-07 11:27:56', '2025-04-14 02:20:19', '2025-04-07 11:27:55', '2025-04-14 02:20:19'),
(364, 'App\\Models\\User', 3, 'remember_token', 'f73bf8b26b4f24f2b76a2031a25a5cfb29093adbfc7602f2dea501274054d0a3', '[\"*\"]', '2025-04-07 11:28:03', '2025-04-07 11:44:09', '2025-04-07 11:28:01', '2025-04-07 11:44:09'),
(365, 'App\\Models\\User', 3, 'remember_token', '37f5a1b35f1ecd3fa25f39a29126a9bb56d01635dfa9b68316021b00d251e506', '[\"*\"]', '2025-04-07 11:40:24', '2025-04-07 11:44:09', '2025-04-07 11:28:25', '2025-04-07 11:44:09'),
(366, 'App\\Models\\User', 3, 'remember_token', 'b5328ef106b95929b224802b29473b32843bdc87a5ac93e159b56a6170168be0', '[\"*\"]', '2025-04-07 11:44:09', NULL, '2025-04-07 11:44:08', '2025-04-07 11:44:09'),
(367, 'App\\Models\\User', 3, 'remember_token', '3b273ad4bc7ae935b74c3657b993eee341cd7d57524b61134d2dc51ce246775e', '[\"*\"]', '2025-04-08 11:30:20', NULL, '2025-04-08 11:30:08', '2025-04-08 11:30:20'),
(368, 'App\\Models\\User', 1, 'remember_token', '4b717e204e2f9e567f2308ddbe5d616596d532fed3c63f04e8476e4a68f8f676', '[\"*\"]', '2025-04-13 18:37:45', NULL, '2025-04-13 18:32:13', '2025-04-13 18:37:45'),
(369, 'App\\Models\\User', 4, 'remember_token', '663be0f83279d2662fffec14a26f45854b22438a092d2081a0cd099adb9214a7', '[\"*\"]', '2025-04-13 18:37:52', '2025-04-14 02:20:19', '2025-04-13 18:37:45', '2025-04-14 02:20:19'),
(370, 'App\\Models\\User', 1, 'remember_token', 'a29be435bb9057f2c450415c580cf97c033666f62d095d1992fe8f7be9bfb33e', '[\"*\"]', '2025-04-14 02:22:59', NULL, '2025-04-14 01:53:27', '2025-04-14 02:22:59'),
(371, 'App\\Models\\User', 4, 'remember_token', '7d8f2fd38bb8a114355ece445a3ff17dd2d82c45f0db1e6406a3cd040ab94e0c', '[\"*\"]', '2025-04-14 02:06:33', '2025-04-14 02:20:19', '2025-04-14 01:53:40', '2025-04-14 02:20:19'),
(372, 'App\\Models\\SalesModel', 5, 'sales_token', 'f27b67010bf5a19d04820e06becc60d9744d6d0a6cf90d9ef71e4c6b875f416c', '[\"*\"]', NULL, '2025-04-18 13:49:33', '2025-04-14 02:07:08', '2025-04-18 13:49:33'),
(373, 'App\\Models\\SalesModel', 5, 'sales_token', 'a2c46dd239bdc79ed5cf68445ceb57714ac1970c8afde05a0dbbd14f7b5418ef', '[\"*\"]', NULL, '2025-04-18 13:49:33', '2025-04-14 02:09:42', '2025-04-18 13:49:33'),
(374, 'App\\Models\\SalesModel', 5, 'sales_token', '50e878336e4fbf19068f0408baa0eaf720b1c884e0aac25af16d03f4a5e8c3b9', '[\"*\"]', NULL, '2025-04-18 13:49:33', '2025-04-14 02:11:48', '2025-04-18 13:49:33'),
(375, 'App\\Models\\User', 4, 'remember_token', '9e5b3ae85e9c2d72cfbbc0aa62bc8e26ded88962d4a937d70481b3a5b894c8c0', '[\"*\"]', '2025-04-14 02:18:58', '2025-04-14 02:20:19', '2025-04-14 02:18:57', '2025-04-14 02:20:19'),
(376, 'App\\Models\\User', 4, 'remember_token', '873414f0532dae6f51f491c4633280cbe6433b63b94701850c409030144b28ba', '[\"*\"]', '2025-04-14 02:19:52', '2025-04-14 02:20:19', '2025-04-14 02:19:52', '2025-04-14 02:20:19'),
(377, 'App\\Models\\SalesModel', 5, 'sales_token', '9d49b41eb8f7151b83ebc43ec85972897bafa005b3d77ac5feea99de1dd32f5e', '[\"*\"]', NULL, '2025-04-18 13:49:33', '2025-04-14 02:21:02', '2025-04-18 13:49:33'),
(378, 'App\\Models\\SalesModel', 5, 'sales_token', 'c3aef8da734d84aa12ea76977ae5b98802bee783c0a5d30f513eccbc03ef108a', '[\"*\"]', NULL, '2025-04-18 13:49:33', '2025-04-14 02:21:49', '2025-04-18 13:49:33'),
(379, 'App\\Models\\User', 5, 'remember_token', '568e1f8933b75d23e6157c18ef85d0c8f635aebf6ca9a342142754a57cd5279d', '[\"*\"]', '2025-04-14 02:26:14', NULL, '2025-04-14 02:23:31', '2025-04-14 02:26:14'),
(380, 'App\\Models\\User', 1, 'remember_token', '7f4e670327388c80e46e01b520031c1d47108e604c6e2a1a35a7d38f0ff332cc', '[\"*\"]', '2025-04-14 02:54:43', NULL, '2025-04-14 02:27:32', '2025-04-14 02:54:43'),
(381, 'App\\Models\\User', 4, 'remember_token', '8b1138e80001b1ca00334093fabc1fd98f4024b198e8262c6732ad05fdb2674f', '[\"*\"]', '2025-04-14 02:54:33', NULL, '2025-04-14 02:37:28', '2025-04-14 02:54:33'),
(382, 'App\\Models\\SalesModel', 5, 'sales_token', 'ea0e1c4602ee09ae7fa29873c010c8826b7d841d140e11abfa143e379f5f5ab2', '[\"*\"]', NULL, '2025-04-18 13:49:33', '2025-04-14 09:16:28', '2025-04-18 13:49:33'),
(383, 'App\\Models\\SalesModel', 5, 'sales_token', 'e875f2e1b7e85df81fe1550a7e62c316a62ee8168360b1672216519be4e27b85', '[\"*\"]', NULL, '2025-04-18 13:49:33', '2025-04-14 16:03:11', '2025-04-18 13:49:33'),
(384, 'App\\Models\\User', 3, 'remember_token', 'f651250754033fe1d8336f81e1dc40bbf85a6b2b79b67232962e80479bc09972', '[\"*\"]', '2025-04-16 10:12:54', NULL, '2025-04-16 10:12:53', '2025-04-16 10:12:54'),
(385, 'App\\Models\\User', 3, 'remember_token', '6662d50ccc0ff843dcfd4fee5f1fc095d0ec4b9c167523c2d5b601f5ed73bdff', '[\"*\"]', '2025-04-16 10:13:13', NULL, '2025-04-16 10:13:13', '2025-04-16 10:13:13'),
(386, 'App\\Models\\SalesModel', 5, 'sales_token', 'fb1078e9eea4ddece217751ce049c760525d52b2556f49e1812d8296f866dbb4', '[\"*\"]', NULL, '2025-04-18 13:49:33', '2025-04-17 15:40:05', '2025-04-18 13:49:33'),
(387, 'App\\Models\\User', 3, 'remember_token', '65ef859a7080f104620e9816582d07927e0ee88389b98dece3f2dbc1f91a8c4c', '[\"*\"]', '2025-04-17 17:09:53', NULL, '2025-04-17 16:48:09', '2025-04-17 17:09:53'),
(388, 'App\\Models\\SalesModel', 1, 'sales_token', '147d7b65e73a3f1fcb7d4b579a19235b2a7441e7d332521069e62307678f0b60', '[\"*\"]', '2025-04-17 16:50:39', NULL, '2025-04-17 16:49:22', '2025-04-17 16:50:39'),
(389, 'App\\Models\\SalesModel', 1, 'sales_token', '0a440c1f3707442513fecd704125a720ff61b8a8f4692326f893d24e961777f3', '[\"*\"]', '2025-04-17 16:51:49', NULL, '2025-04-17 16:51:28', '2025-04-17 16:51:49'),
(390, 'App\\Models\\SalesModel', 1, 'sales_token', '05e45116d8e9eb12bd8b44fe4af3132c6b070bcf083c587fcdd5f0de771f3c51', '[\"*\"]', NULL, NULL, '2025-04-17 17:08:27', '2025-04-17 17:08:27'),
(391, 'App\\Models\\SalesModel', 1, 'sales_token', '43e78ad51ce0dd8fb6c134da0885f7b14bc663538dd42ea6e2d70cfc628c30ab', '[\"*\"]', NULL, NULL, '2025-04-17 17:11:40', '2025-04-17 17:11:40'),
(392, 'App\\Models\\SalesModel', 1, 'sales_token', 'abf201e8ea271c5413509ada5cf82f23d4b7bbbc6ed60cfa68dc72987c327481', '[\"*\"]', NULL, NULL, '2025-04-17 17:15:33', '2025-04-17 17:15:33'),
(393, 'App\\Models\\SalesModel', 1, 'sales_token', '34140fe54c6ef140064d7664e14bd046e3f6dcb0c2bb675a97465a50f83d6f92', '[\"*\"]', NULL, NULL, '2025-04-17 17:15:51', '2025-04-17 17:15:51'),
(394, 'App\\Models\\SalesModel', 1, 'sales_token', '290ccd70384546016eee0c972f014a9d8f81d5accb39929a1d66488c280f9218', '[\"*\"]', '2025-04-17 17:24:10', NULL, '2025-04-17 17:18:07', '2025-04-17 17:24:10'),
(395, 'App\\Models\\SalesModel', 1, 'sales_token', '296f915c2c0adf42c5e8560c96eed43cee5a74d172f9b8328aa8184c2e76ad64', '[\"*\"]', NULL, NULL, '2025-04-17 17:18:42', '2025-04-17 17:18:42'),
(396, 'App\\Models\\SalesModel', 1, 'sales_token', 'ae88a4c1e6eeb1fc01600b1115fb346f7095739eeaa8535a730b2536e24d386c', '[\"*\"]', NULL, NULL, '2025-04-17 17:24:57', '2025-04-17 17:24:57'),
(397, 'App\\Models\\SalesModel', 1, 'sales_token', '11ccb8fa8aca734cf72d8a5431b0e03eee67c046bc26af1bd097d686ef8952eb', '[\"*\"]', NULL, NULL, '2025-04-17 17:26:26', '2025-04-17 17:26:26'),
(398, 'App\\Models\\SalesModel', 1, 'sales_token', '7b303c19bd5abd3bf78dc35b5a1d324ee48f5056d9431bfcca23763b05b4e61c', '[\"*\"]', NULL, NULL, '2025-04-17 17:26:29', '2025-04-17 17:26:29'),
(399, 'App\\Models\\SalesModel', 1, 'sales_token', '736893abca4d040bfdbeddd29a3a4afc288e9c86479961c00e6f5e83160b52b8', '[\"*\"]', NULL, NULL, '2025-04-17 17:26:40', '2025-04-17 17:26:40'),
(400, 'App\\Models\\SalesModel', 1, 'sales_token', '7dd61177d400e2e1b8b1e716eba09cd7e41488c7eae11bc1198ce835c2e9bd99', '[\"*\"]', NULL, NULL, '2025-04-17 17:28:55', '2025-04-17 17:28:55'),
(401, 'App\\Models\\SalesModel', 1, 'sales_token', 'e11f26f3b93b4e094e7a50d867605d3f9a941eb24e423c04e2a2921f5b89767e', '[\"*\"]', NULL, NULL, '2025-04-17 17:29:18', '2025-04-17 17:29:18'),
(402, 'App\\Models\\SalesModel', 1, 'sales_token', '2a75946b2363b04b92d545ab01c308f4860fab0c2db2943dd4b69b2e8aec059a', '[\"*\"]', '2025-04-17 17:32:58', NULL, '2025-04-17 17:30:47', '2025-04-17 17:32:58'),
(403, 'App\\Models\\SalesModel', 1, 'sales_token', 'fca971ff48b088a63327338ed7906d0d873a3210ec73f0fe8ac1c1b76a000279', '[\"*\"]', NULL, NULL, '2025-04-17 17:31:00', '2025-04-17 17:31:00'),
(404, 'App\\Models\\SalesModel', 5, 'sales_token', '5c733c03d0ab7e802e990d5dd8e3b68fea665474c2da3173a3ccde5a61be4c03', '[\"*\"]', '2025-04-17 21:34:27', '2025-04-18 13:49:33', '2025-04-17 21:33:25', '2025-04-18 13:49:33'),
(405, 'App\\Models\\SalesModel', 5, 'sales_token', '4be601f5b8672b91e4eef9ddf19890036f2fbb072c6bd23492c274bc794f6518', '[\"*\"]', '2025-04-18 13:42:29', '2025-04-18 13:49:33', '2025-04-18 13:41:29', '2025-04-18 13:49:33'),
(406, 'App\\Models\\User', 5, 'remember_token', '57c963a17339dc2e35306b4b884bd1fda478a24ad24fbcabf2d25701ce37917e', '[\"*\"]', '2025-04-18 13:49:57', NULL, '2025-04-18 13:46:42', '2025-04-18 13:49:57'),
(407, 'App\\Models\\SalesModel', 5, 'sales_token', 'f042cc2aa30857eb4951109a156abe23b12b4c2edc44b66dd1691f930a75e657', '[\"*\"]', '2025-04-18 13:49:12', '2025-04-18 13:49:33', '2025-04-18 13:49:08', '2025-04-18 13:49:33'),
(408, 'App\\Models\\SalesModel', 5, 'sales_token', '79a01e076491f5ca10b59445346b0e73d4b705bed28d37a670560c0f09f42564', '[\"*\"]', '2025-04-18 14:09:54', NULL, '2025-04-18 13:49:41', '2025-04-18 14:09:54'),
(409, 'App\\Models\\User', 4, 'remember_token', 'e377f3f8bf3d9ff0d0ccc3d3c0d5dd95f51e76106e68e01bb59f02b07e94ffea', '[\"*\"]', '2025-04-18 14:20:05', NULL, '2025-04-18 13:49:57', '2025-04-18 14:20:05'),
(410, 'App\\Models\\User', 1, 'remember_token', '0baca0b8583538f16ffcb551d77cb4dcaaa39d0df1fdd6bddd919bcaad12c949', '[\"*\"]', '2025-04-19 01:38:45', NULL, '2025-04-19 01:04:59', '2025-04-19 01:38:45'),
(411, 'App\\Models\\User', 4, 'remember_token', '835415bb427024c6f004c7dce274b69e9a7011b982246ea8805a77c853186c0e', '[\"*\"]', '2025-04-19 01:21:18', NULL, '2025-04-19 01:05:11', '2025-04-19 01:21:18'),
(412, 'App\\Models\\User', 4, 'remember_token', '1849ce0100fd09f99b52d26bc1d79702cdc39ce7a51000717268952f2ab28785', '[\"*\"]', '2025-04-19 01:35:50', NULL, '2025-04-19 01:23:00', '2025-04-19 01:35:50'),
(413, 'App\\Models\\User', 5, 'remember_token', '6ce9ddb300daa419a05f41e2a4cd8da9a65280a017aa6c2b2315fea56476a809', '[\"*\"]', '2025-04-19 01:47:51', NULL, '2025-04-19 01:39:20', '2025-04-19 01:47:51'),
(414, 'App\\Models\\User', 1, 'remember_token', '1e4327860bc6b97417dd729116890d65137fc74d026c14df23e57ef759207e6a', '[\"*\"]', '2025-04-19 01:48:21', NULL, '2025-04-19 01:48:02', '2025-04-19 01:48:21'),
(415, 'App\\Models\\User', 5, 'remember_token', '2cb3467275c91c3629bb9cc43707288d488df1c756d55b938d43dcb189f37f4f', '[\"*\"]', '2025-04-19 02:05:35', NULL, '2025-04-19 02:00:16', '2025-04-19 02:05:35'),
(416, 'App\\Models\\User', 1, 'remember_token', 'a537d5b772d139a32a3072558dc6bf7dcb5634d5f1acaf7083830df4e9281d11', '[\"*\"]', '2025-04-19 12:34:40', NULL, '2025-04-19 12:34:25', '2025-04-19 12:34:40'),
(417, 'App\\Models\\User', 4, 'remember_token', 'dc59cb8fe419344c762e837bef91149e78438dceb39c4058b43072dae4bfb4dc', '[\"*\"]', '2025-04-19 12:44:15', NULL, '2025-04-19 12:34:40', '2025-04-19 12:44:15'),
(418, 'App\\Models\\User', 4, 'remember_token', 'cf7a63ce04416d04d5dd352d20440b033a70335fa66f6d040375295962f283f5', '[\"*\"]', '2025-04-19 13:39:55', NULL, '2025-04-19 13:39:05', '2025-04-19 13:39:55'),
(419, 'App\\Models\\User', 1, 'remember_token', '762b75bf8b542af6a6e6558b94598bb5a59409b59a33c5082da124f3a4547706', '[\"*\"]', '2025-04-20 00:49:10', NULL, '2025-04-20 00:49:02', '2025-04-20 00:49:10'),
(420, 'App\\Models\\User', 4, 'remember_token', '633839176544ec7fb8f692c26562df80a03228a91e85599a419c3402e94b572a', '[\"*\"]', '2025-04-20 00:49:11', NULL, '2025-04-20 00:49:10', '2025-04-20 00:49:11'),
(421, 'App\\Models\\User', 3, 'remember_token', 'c17df611ca7f7ae20b6c7c6118eb6b93d170e1660e550f32d0f00083896f1488', '[\"*\"]', '2025-04-22 15:10:04', NULL, '2025-04-22 15:09:09', '2025-04-22 15:10:04');

-- --------------------------------------------------------

--
-- Table structure for table `pois`
--

CREATE TABLE `pois` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `map_icon_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `group_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poi_id` int(11) DEFAULT NULL,
  `regaykar_user_id` bigint(20) UNSIGNED NOT NULL,
  `coordinates` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` enum('pending','reject','approved') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `sales_agent_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pois`
--

INSERT INTO `pois` (`id`, `name`, `description`, `map_icon_id`, `group_id`, `group_name`, `poi_id`, `regaykar_user_id`, `coordinates`, `active`, `created_at`, `updated_at`, `status`, `sales_agent_id`, `deleted_at`) VALUES
(1, 'Home S3', '', 3, 14, 'S3', 822, 3, '{\"lat\":35.60012469360138,\"lng\":45.38986444473267}', 0, '2025-02-20 15:56:07', '2025-04-22 15:10:04', 'approved', 0, '2025-04-22 15:10:04'),
(2, 'Suli Court', '', 9, 14, 'S3', 824, 3, '{\"lat\":35.56659719855399,\"lng\":45.38444638252259}', 0, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(3, 'Bala', '', 9, 14, 'S3', 825, 3, '{\"lat\":35.56227708625476,\"lng\":45.44086396694184}', 0, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(4, 'Bala2', '', 10, 14, 'S3', 826, 3, '{\"lat\":35.56197161495303,\"lng\":45.44024705886841}', 0, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(5, 'Bala3', '', 17, 14, 'S3', 827, 3, '{\"lat\":35.561753420453236,\"lng\":45.44090688228607}', 0, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(6, 'guradiya', 'home', 102, 17, 'indore', 838, 3, '{\"lat\":22.63429269379353,\"lng\":75.97320556640626}', 1, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(7, 'vijay nagar', 'square', 9, 17, 'indore', 841, 3, '{\"lat\":22.749345,\"lng\":75.902783}', 1, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(8, 'Bangali Square', 'for Bangali Square', 9, 17, 'indore', 842, 3, '{\"lat\":22.71979347684744,\"lng\":75.90639511656497}', 1, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(9, 'Home', 'for Home', 9, 17, 'indore', 843, 3, '{\"lat\":22.725688,\"lng\":75.894501}', 1, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(10, 'Robot Square', 'for Robot Square', 9, 17, 'indore', 844, 3, '{\"lat\":22.749345,\"lng\":75.902783}', 1, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(11, 'Khajrana', 'for Khajrana', 9, 17, 'indore', 845, 3, '{\"lat\":22.731599,\"lng\":75.901987}', 1, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(12, 'marimat', 'marimat', 26, 17, 'indore', 846, 3, '{\"lat\":22.72306960227235,\"lng\":75.89467048645021}', 1, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(13, 'Palasiya', 'Palasiya', 132, 17, 'indore', 847, 3, '{\"lat\":22.72557700161967,\"lng\":75.88805347681047}', 1, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(14, 'Ganesh Cap', 'Ganesh Cap', 125, 17, 'indore', 848, 3, '{\"lat\":22.72551762614269,\"lng\":75.89230611920358}', 1, '2025-02-20 15:56:07', '2025-02-20 15:56:07', 'approved', 0, NULL),
(15, 'Ganesh Cap 2', 'ganesh cap', 16, 0, NULL, 849, 3, '{\"lat\":22.725522574100083,\"lng\":75.89234769344331}', 0, '2025-02-20 15:56:07', '2025-03-06 16:34:55', 'approved', 0, NULL),
(16, 'hastyar house', '', 1, 0, NULL, 850, 3, '{\"lat\":36.162933101024734,\"lng\":44.08326655626298}', 0, '2025-02-20 15:56:07', '2025-03-06 16:34:55', 'approved', 0, NULL),
(17, 'gasha', '', 131, 0, NULL, 851, 3, '{\"lat\":36.2037857732583,\"lng\":44.11996454000473}', 0, '2025-02-20 15:56:07', '2025-03-10 16:28:54', 'approved', 0, NULL),
(18, 'netsoft', '', 1, 0, NULL, 852, 3, '{\"lat\":36.2474887326867,\"lng\":44.019061177968986}', 0, '2025-02-20 15:56:07', '2025-03-06 16:34:55', 'approved', 0, NULL),
(19, 'bnj group', '', 1, 0, NULL, 853, 3, '{\"lat\":36.24338626319109,\"lng\":44.041630625642945}', 0, '2025-02-20 15:56:07', '2025-03-06 16:34:55', 'approved', 0, NULL),
(20, 'zozeg ', '', 1, 0, NULL, 854, 3, '{\"lat\":36.248997495537935,\"lng\":44.05421018469497}', 0, '2025-02-20 15:56:07', '2025-03-06 16:34:55', 'approved', 0, NULL),
(21, 'super market', '', 1, 0, NULL, 855, 3, '{\"lat\":36.24432077551164,\"lng\":43.98982912285646}', 0, '2025-02-20 15:56:07', '2025-03-06 16:34:55', 'approved', 0, NULL),
(22, 'Khajrana', 'for Khajrana', NULL, NULL, NULL, NULL, 3, '{\"lat\":22.731598999999999222154656308703124523162841796875,\"lng\":75.9019870000000054233169066719710826873779296875}', 0, '2025-03-01 11:47:44', '2025-04-22 15:10:04', 'reject', 0, '2025-04-22 15:10:04'),
(23, 'Khajrana', 'for Khajrana', NULL, NULL, NULL, NULL, 3, '{\"lat\":22.731598999999999222154656308703124523162841796875,\"lng\":75.9019870000000054233169066719710826873779296875}', 0, '2025-03-01 11:52:08', '2025-04-22 15:10:04', 'reject', 0, '2025-04-22 15:10:04'),
(24, 'Test', 'Test', NULL, NULL, NULL, NULL, 1, '{\"lat\":\"22.7257316\",\"lng\":\"75.8943448\"}', 0, '2025-03-04 13:15:44', '2025-03-04 13:15:44', 'pending', 0, NULL),
(25, 'Test', 'Test', NULL, NULL, NULL, NULL, 1, '{\"lat\":\"22.7257199\",\"lng\":\"75.8943503\"}', 0, '2025-03-04 13:24:31', '2025-03-04 13:24:31', 'pending', 0, NULL),
(26, 'Test', 'Test', NULL, NULL, NULL, NULL, 1, '{\"lat\":\"22.7257025\",\"lng\":\"75.8943558\"}', 0, '2025-03-04 16:18:42', '2025-03-04 16:18:42', 'pending', 0, NULL),
(27, 'Test', 'Test', NULL, NULL, NULL, NULL, 1, '{\"lat\":\"22.7257025\",\"lng\":\"75.8943558\"}', 0, '2025-03-04 16:19:01', '2025-03-04 16:19:01', 'pending', 0, NULL),
(28, 'Test', 'Teat', NULL, NULL, NULL, NULL, 3, '{\"lat\":\"22.7257007\",\"lng\":\"75.8943502\"}', 0, '2025-03-04 16:37:09', '2025-04-22 15:10:04', 'reject', 0, '2025-04-22 15:10:04'),
(29, 'Khajrana', 'for Khajrana', 9, NULL, NULL, NULL, 3, '{\"lat\":22.731598999999999222154656308703124523162841796875,\"lng\":75.9019870000000054233169066719710826873779296875}', 0, '2025-03-06 12:08:02', '2025-04-22 15:10:04', 'reject', 0, '2025-04-22 15:10:04'),
(30, 'dsa', 'sad', 1, NULL, NULL, NULL, 3, '{\"lat\":36.19760311603673841318595805205404758453369140625,\"lng\":44.01517677477760770443637738935649394989013671875}', 0, '2025-03-06 13:10:20', '2025-04-22 15:10:04', 'reject', 0, '2025-04-22 15:10:04'),
(31, 'ASD', 'this is a test description.', 1, NULL, NULL, 862, 3, '{\"lat\":36.19760311603673841318595805205404758453369140625,\"lng\":44.01517677477760770443637738935649394989013671875}', 1, '2025-03-06 13:13:32', '2025-04-22 15:10:04', 'approved', 0, '2025-04-22 15:10:04'),
(32, 'sad', 'sad', 9, 0, NULL, 865, 3, '{\"lat\":36.19760311603674,\"lng\":44.01517677477761}', 1, '2025-03-06 13:14:59', '2025-03-27 12:18:03', 'approved', 1, NULL),
(33, 'testignis', 'ignis testing ', 3, 0, NULL, 856, 3, '{\"lat\":29.709705400410677,\"lng\":51.20897681219503}', 0, '2025-03-06 13:37:01', '2025-03-06 16:34:55', 'approved', 0, NULL),
(34, 'Test', 'Testing map icon', 9, 0, NULL, 858, 3, '{\"lat\":36.19099714723768,\"lng\":44.009301234592215}', 0, '2025-03-06 13:37:40', '2025-03-06 16:34:55', 'approved', 0, NULL),
(35, 'Brij office', 'Office', 1, NULL, NULL, NULL, 3, '{\"lat\":22.150177877001933524070409475825726985931396484375,\"lng\":76.03221910636426628116169013082981109619140625}', 0, '2025-03-06 16:42:53', '2025-04-22 15:10:04', 'reject', 0, '2025-04-22 15:10:04'),
(36, 'Affice', 'Uuu', 9, 0, NULL, 859, 3, '{\"lat\":1.9996246464875005,\"lng\":1.998780490460881}', 0, '2025-03-06 16:56:23', '2025-03-10 16:28:54', 'approved', 0, NULL),
(37, 'ganganbag indores', 'hjhjh', 12, 0, NULL, 875, 3, '{\"lat\":22.731599,\"lng\":75.901987}', 1, '2025-03-07 12:27:51', '2025-03-27 12:18:03', 'approved', 1, NULL),
(38, 'ganganbag indore', NULL, 9, NULL, NULL, NULL, 3, '{\"lat\":22.731598999999999222154656308703124523162841796875,\"lng\":75.9019870000000054233169066719710826873779296875}', 1, '2025-03-07 20:27:10', '2025-04-22 15:10:04', 'approved', 1, '2025-04-22 15:10:04'),
(39, 'string', 'string', 1, 0, NULL, 860, 3, '{\"lat\":54.91550070170091,\"lng\":23.94092559814453}', 1, '2025-03-10 16:46:32', '2025-04-22 15:10:04', 'approved', NULL, '2025-04-22 15:10:04'),
(40, 'string', 'string', 1, 0, NULL, 861, 3, '{\"lat\":54.91550070170091,\"lng\":23.94092559814453}', 1, '2025-03-10 18:06:47', '2025-04-22 15:10:04', 'approved', NULL, '2025-04-22 15:10:04'),
(41, 'sagar', NULL, 9, NULL, NULL, NULL, 3, '{\"lat\":22.731598999999999222154656308703124523162841796875,\"lng\":75.9019870000000054233169066719710826873779296875}', 1, '2025-03-10 18:16:13', '2025-04-22 15:10:04', 'approved', 1, '2025-04-22 15:10:04'),
(42, 'sagar sagar', NULL, 9, 17, NULL, NULL, 3, '{\"lat\":22.731598999999999222154656308703124523162841796875,\"lng\":75.9019870000000054233169066719710826873779296875}', 1, '2025-03-10 18:16:44', '2025-04-22 15:10:04', 'approved', 1, '2025-04-22 15:10:04'),
(43, 'test', 'test test test', 9, 13, 'S1', 864, 3, '{\"lat\":36.200962351832885,\"lng\":44.01530549103466}', 1, '2025-03-11 10:53:15', '2025-03-11 10:57:17', 'approved', 1, NULL),
(44, 'Test diva', '', 9, 0, NULL, 863, 3, '{\"lat\":54.91550070170091,\"lng\":23.94092559814453}', 1, '2025-03-11 10:57:17', '2025-03-11 10:57:17', 'approved', NULL, NULL),
(45, 'SL- Netsoft test', 'Test', 9, 19, 'secondGroupTest', 866, 4, '{\"lat\":36.24744894803106,\"lng\":44.0191711485386}', 1, '2025-03-13 13:15:41', '2025-04-18 13:58:42', 'approved', 5, NULL),
(46, 'Test2', '', 12, 19, 'secondGroupTest', 867, 4, '{\"lat\":36.20317175062353,\"lng\":43.95962905779016}', 1, '2025-03-13 16:24:47', '2025-04-18 13:58:42', 'approved', NULL, NULL),
(47, 'TestAppPoi2', NULL, 3, 18, NULL, NULL, 4, '{\"lat\":36.24925806717049425742516177706420421600341796875,\"lng\":44.01719570159912819917735760100185871124267578125}', 1, '2025-03-13 16:40:04', '2025-04-19 13:39:10', 'approved', 5, '2025-04-19 13:39:10'),
(48, 'test', 'sda', 1, NULL, NULL, NULL, 3, '{\"lat\":36.199092279588143128421506844460964202880859375,\"lng\":44.01552001812974168615255621261894702911376953125}', 0, '2025-03-18 21:12:07', '2025-04-22 15:10:04', 'pending', 1, '2025-04-22 15:10:04'),
(49, 'NetSoft', 'Test App', 9, 0, NULL, 868, 4, '{\"lat\":36.24728515877361,\"lng\":44.01923149824143}', 1, '2025-03-20 14:25:21', '2025-04-19 13:39:10', 'approved', 5, '2025-04-19 13:39:10'),
(50, 'Test atconz', NULL, 19, NULL, NULL, NULL, 4, '{\"lat\":36.24731968800437442723705316893756389617919921875,\"lng\":44.02672290802001953125}', 1, '2025-03-20 14:41:59', '2025-04-19 13:39:10', 'approved', 5, '2025-04-19 13:39:10'),
(51, 'Itali2 without desc', NULL, 18, NULL, NULL, NULL, 4, '{\"lat\":36.24178168182360337823411100544035434722900390625,\"lng\":44.05144214630127663667735760100185871124267578125}', 1, '2025-03-20 14:49:58', '2025-04-19 13:39:10', 'approved', 5, '2025-04-19 13:39:10'),
(52, 'Mass with desc changed in ReBeen Platform', 'Desc', 9, 0, NULL, 870, 4, '{\"lat\":36.22970101383407,\"lng\":44.064960479736335}', 1, '2025-03-20 14:50:45', '2025-03-28 14:33:53', 'approved', 5, NULL),
(53, 'Hawler without desc but in platform', 'Platform desc', 9, 18, 'TestServerGroup', 869, 4, '{\"lat\":36.216025830119705,\"lng\":44.07586097717286}', 1, '2025-03-20 14:51:32', '2025-04-18 13:58:42', 'approved', 5, NULL),
(54, 'Khajrana', 'for Khajrana', 9, 0, NULL, 873, 3, '{\"lat\":22.731599,\"lng\":75.901987}', 1, '2025-03-26 10:39:47', '2025-03-27 12:18:03', 'approved', 1, NULL),
(55, 'test indore', 'testesttest', 9, 0, NULL, 874, 3, '{\"lat\":\"37.421998333333335\",\"lng\":\"-122.084\"}', 1, '2025-03-26 10:56:11', '2025-03-27 12:18:03', 'approved', 1, NULL),
(56, 'Khajrana', 'test', 9, 0, NULL, 871, 3, '{\"lat\":22.731599,\"lng\":75.901987}', 1, '2025-03-27 12:18:03', '2025-03-27 12:18:03', 'approved', NULL, NULL),
(57, 'test', 'abc', 9, 0, NULL, 872, 3, '{\"lat\":36.19909227958814,\"lng\":44.01552001812974}', 1, '2025-03-27 12:18:03', '2025-03-27 12:18:03', 'approved', NULL, NULL),
(58, 'Abc242', 'Twst', 67, 0, NULL, 876, 3, '{\"lat\":36.197472104282234,\"lng\":44.015656798585304}', 1, '2025-03-27 12:23:28', '2025-04-01 15:31:44', 'approved', 1, NULL),
(59, 'test', 'test', 1, 17, 'indore', NULL, 3, '{\"lat\":\"37.421998333333335\",\"lng\":\"-122.084\"}', 0, '2025-03-27 17:53:54', '2025-04-22 15:10:04', 'pending', 1, '2025-04-22 15:10:04'),
(60, 'Home', 'Home Desc', 10, 0, NULL, 877, 4, '{\"lat\":36.24087763870751,\"lng\":44.05062675476074}', 1, '2025-03-28 00:47:30', '2025-04-19 13:39:10', 'approved', 5, '2025-04-19 13:39:10'),
(61, 'عربي', 'کوردیە', 24, 19, 'secondGroupTest', 878, 4, '{\"lat\":36.242307867528325,\"lng\":44.05162453651429}', 1, '2025-03-28 14:20:04', '2025-04-18 13:58:42', 'approved', 5, NULL),
(62, 'تازە', 'تەتەو', 20, NULL, NULL, 879, 4, '{\"lat\":36.21758490577123978937379433773458003997802734375,\"lng\":44.028277583420276641845703125}', 1, '2025-03-28 14:23:56', '2025-04-19 13:39:10', 'approved', 5, '2025-04-19 13:39:10'),
(63, 'گومرگ', '', 8, 0, NULL, 880, 4, '{\"lat\":36.17858781767603,\"lng\":43.92250835895539}', 1, '2025-03-28 14:30:54', '2025-04-14 02:38:03', 'approved', NULL, NULL),
(64, 'PlatformPOI Test', '', 18, 18, 'TestServerGroup', 881, 4, '{\"lat\":36.22990814076692,\"lng\":44.06386077404022}', 1, '2025-03-28 17:02:33', '2025-03-28 17:03:08', 'approved', NULL, NULL),
(65, 'Rigal', 'Test', 7, NULL, NULL, NULL, 3, '{\"lat\":36.19127260718071426026654080487787723541259765625,\"lng\":44.008744269374034274733276106417179107666015625}', 0, '2025-04-17 17:32:04', '2025-04-22 15:10:04', 'pending', 1, '2025-04-22 15:10:04'),
(66, 'Test', 'Test', 110, NULL, NULL, NULL, 3, '{\"lat\":\"22.725543333333334\",\"lng\":\"75.89431166666667\"}', 0, '2025-04-17 17:32:58', '2025-04-22 15:10:04', 'pending', 1, '2025-04-22 15:10:04'),
(67, 'Itali2 test', 'دیسکریپشن', 9, 0, NULL, 884, 4, '{\"lat\":36.2428860895621,\"lng\":44.04839515686036}', 1, '2025-04-17 21:34:06', '2025-04-18 13:58:42', 'approved', 5, NULL),
(68, 'New home test', 'تێستی ماڵێ', 33, 19, 'secondGroupTest', 883, 4, '{\"lat\":36.228015709395776866585947573184967041015625,\"lng\":44.04514029622078652437267010100185871124267578125}', 1, '2025-04-18 13:42:29', '2025-04-18 13:57:37', 'approved', 5, NULL),
(69, 'قەڵات', 'قەڵات', 1, NULL, NULL, 885, 4, '{\"lat\":36.1912963444545567881505121476948261260986328125,\"lng\":44.00990009307862038667735760100185871124267578125}', 1, '2025-04-18 14:09:54', '2025-04-18 14:10:14', 'approved', 5, NULL),
(70, 'test1', '', 1, 19, 'secondGroupTest', 886, 4, '{\"lat\":35.569149010092275,\"lng\":45.42345964895504}', 1, '2025-04-18 14:18:31', '2025-04-18 14:18:31', 'approved', NULL, NULL),
(71, 'Test3', '', 16, 0, NULL, 888, 4, '{\"lat\":35.56980876746775,\"lng\":45.426255584025064}', 1, '2025-04-18 14:18:31', '2025-04-18 14:18:31', 'approved', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `regaykar_plans`
--

CREATE TABLE `regaykar_plans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `sale_agent_id` bigint(20) UNSIGNED NOT NULL,
  `activation_date` date NOT NULL,
  `device_id` int(11) NOT NULL,
  `device_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `regaykar_plans`
--

INSERT INTO `regaykar_plans` (`id`, `group_id`, `user_id`, `sale_agent_id`, `activation_date`, `device_id`, `device_name`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 3, 1, '2025-03-18', 1, 'NS-Hastyar', 0, '2025-03-18 19:20:55', '2025-03-19 05:00:12', NULL),
(2, 2, 4, 5, '2025-03-20', 2, 'NST- GD S1', 0, '2025-03-20 15:19:15', '2025-03-21 05:00:10', NULL),
(3, 1, 3, 1, '2025-03-26', 1, 'NS-Hastyar', 0, '2025-03-26 10:42:51', '2025-03-27 05:00:12', NULL),
(4, 1, 3, 1, '2025-03-27', 2, 'NST- GD S1', 0, '2025-03-27 17:17:26', '2025-03-28 05:00:13', NULL),
(5, 2, 4, 5, '2025-03-28', 2, 'NST- GD S1', 0, '2025-03-28 14:06:52', '2025-03-29 05:00:14', NULL),
(6, 2, 4, 5, '2025-04-13', 2, 'NST- GD S1', 0, '2025-04-14 01:55:03', '2025-04-14 05:00:13', NULL),
(7, 1, 3, 1, '2025-04-17', 2869, 'ignismob', 0, '2025-04-17 17:09:53', '2025-04-18 05:00:11', NULL),
(8, 2, 4, 5, '2025-04-19', 2, 'NST- GD S1', 0, '2025-04-19 01:26:26', '2025-04-20 05:00:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `name`, `username`, `password`, `remember_token`, `user_id`, `is_active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'shail', 'shail', '$2y$10$2gthjiDu/qn5JTm3SoJ8I.T54pVs6uJ.W2f/RhO.jRmfEDvpC4x9u', '403|Nzjd31H3ZQrdKXlbQw7xYn1BcegshhDK7LEGzVhP2481bd09', 3, 1, '2025-01-23 01:15:00', '2025-04-17 17:31:00', NULL),
(2, 'akshat', 'akshat', '$2y$10$BGtiDRFzGkmPG.OPb7PkA.yjUlbNWr0VbOMTgv9d6H9MQdLjMRZh.', NULL, 3, 1, '2025-01-23 01:15:21', '2025-04-07 11:44:24', NULL),
(3, 'apeksha', 'apeksha', '$2y$10$A4g.YjpojyLhrzQdXTRxseLkRPK4WccKyCPBVNCTb6gHRRr26YdQe', NULL, 3, 1, '2025-02-10 13:59:19', '2025-04-07 11:44:24', NULL),
(4, 'Hastyar', 'hastyar', '$2y$10$t0hA4cqH6ZQ2D7uvtmrQVuB7P6D24J4oDoidih5xrLG1Reh6ymVEW', '222|AXsd8vYmjrYJeTGSlwMmKCgWnunK9SFc8b8bDlcnc16e2f82', 3, 1, '2025-02-19 01:33:34', '2025-04-07 11:44:24', NULL),
(5, 'salah', 'salah', '$2y$10$RD683M1cGIT3ehjtUFFSKOS.g7.5I7rf5lFlcNpDpkJNhfBAy.Xfe', '408|E1RfpMlY9MtXVt4WMJRMkzoaduPqvGo0a5v4tPTG010754ac', 4, 1, '2025-03-13 13:12:36', '2025-04-18 13:49:41', NULL),
(6, 'Lisa', 'Lisa', '$2y$10$HdVVtTJNRoagDB02AJoaw.7bC1nywQvy28GybPymIFRZzPzieJjPO', NULL, 4, 1, '2025-03-13 14:54:51', '2025-04-14 02:21:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `servers`
--

CREATE TABLE `servers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `server_url` varchar(255) NOT NULL,
  `platform` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `servers`
--

INSERT INTO `servers` (`id`, `name`, `server_url`, `platform`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ReBeenGPS', 'https://fleet.rebeengps.com', 'GPSWOX', '2025-01-15 01:24:06', '2025-01-15 01:24:06', NULL),
(2, 'NetSoftGPS', 'https://gps.netsoftiq.com', 'GPSWOX', '2025-01-15 01:24:40', '2025-01-15 01:24:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `server_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('superadmin','admin','user') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `api_key` text COLLATE utf8mb4_unicode_ci,
  `created_by` bigint(20) DEFAULT NULL,
  `remember_token` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  `history_duration` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `server_id`, `mobile_number`, `address`, `role`, `api_key`, `created_by`, `remember_token`, `created_at`, `updated_at`, `is_active`, `history_duration`, `deleted_at`) VALUES
(1, 'admin', '$2y$10$2gthjiDu/qn5JTm3SoJ8I.T54pVs6uJ.W2f/RhO.jRmfEDvpC4x9u', 'admin', NULL, NULL, NULL, NULL, 'superadmin', NULL, NULL, '419|Lv6AmD32RTZ0pEqEo3r9jl0v22XWcabzxegVjnAE6ab1ae61', NULL, '2025-04-20 00:49:02', 1, NULL, NULL),
(2, 'kapil', '$2y$10$2gthjiDu/qn5JTm3SoJ8I.T54pVs6uJ.W2f/RhO.jRmfEDvpC4x9u', 'kapil', NULL, NULL, NULL, NULL, 'admin', NULL, NULL, '28|VWvqwysEtFyScmxp86gE3brTsi9q64ijrgL4OsgQ56b3f06c', '2025-01-23 01:10:35', '2025-04-14 02:22:59', 1, NULL, NULL),
(3, 'kapil', '$2y$10$y.dOdTDzhPMq/cV8nDcp/el3FvfjiSPEIabZFZre/2J2MakF1rgN.', NULL, NULL, '1', '9234233334', 'indore', 'user', '$2y$10$Wk928m8qz7aNTvG5U5eO/.IR8t5px1WIDw9pyRjlpXnM6RcKafccy', NULL, '421|iWZa5MyBr90k5nb46hAQKJ1qlHRPe9tRweGfOGhjf4bc42cd', '2025-01-23 01:13:27', '2025-04-22 15:09:09', 1, 120, NULL),
(4, 'salah', '$2y$10$8iOCRe/hLvV8U6jXDDdSGOCRWeBERkEtI4CPNOCm.NZBIClAERLpa', NULL, NULL, '1', '0123456789', '123', 'user', '$2y$10$eoBig7P585iX9xf3nizSJexl9GDXX2.dNZWOqQ6YN6L5XAtk0x/xO', NULL, '420|xr8ZyhsPNmRFcLt9Z0WnT75MzsOjQJTsIkhdssfT493fc974', '2025-03-13 13:11:08', '2025-04-20 00:49:10', 1, 90, NULL),
(5, 'SalahAdmin', '$2y$10$4pxMbocAkMUQbNI/hvDJWuIlx74ge.Wk9r7y8IWTwU7vnQqSLHvBa', 'SalahAdmin', NULL, NULL, NULL, NULL, 'admin', NULL, NULL, '415|hIwg0Rb9VVeu0QvHjqoYA0wp3ZIyl9JrcSetax4Gac8066de', '2025-03-28 16:17:06', '2025-04-19 02:00:16', 1, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assigned_pois`
--
ALTER TABLE `assigned_pois`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assigned_pois_group_id_foreign` (`group_id`),
  ADD KEY `assigned_pois_poi_id_foreign` (`poi_id`);

--
-- Indexes for table `assigned_servers`
--
ALTER TABLE `assigned_servers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_server_id` (`server_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groups_user_id_foreign` (`user_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `pois`
--
ALTER TABLE `pois`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pois_regaykar_user_id_foreign` (`regaykar_user_id`);

--
-- Indexes for table `regaykar_plans`
--
ALTER TABLE `regaykar_plans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `regaykar_plans_user_id_foreign` (`user_id`),
  ADD KEY `regaykar_plans_sale_agent_id_foreign` (`sale_agent_id`),
  ADD KEY `regaykar_plans_group_id_foreign` (`group_id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_user_id_foreign` (`user_id`);

--
-- Indexes for table `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `url` (`server_url`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assigned_pois`
--
ALTER TABLE `assigned_pois`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `assigned_servers`
--
ALTER TABLE `assigned_servers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=422;

--
-- AUTO_INCREMENT for table `pois`
--
ALTER TABLE `pois`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `regaykar_plans`
--
ALTER TABLE `regaykar_plans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `servers`
--
ALTER TABLE `servers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
