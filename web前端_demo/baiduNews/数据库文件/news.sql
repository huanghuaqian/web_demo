-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-06-01 10:55:16
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `news`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL COMMENT '自动增长',
  `newstype` char(200) COLLATE utf8_croatian_ci NOT NULL,
  `newstitle` varchar(200) COLLATE utf8_croatian_ci NOT NULL,
  `newsimg` varchar(200) COLLATE utf8_croatian_ci NOT NULL,
  `newstime` datetime NOT NULL,
  `newssrc` char(100) COLLATE utf8_croatian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci COMMENT='百度新闻';

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`) VALUES
(1, '百家', '李隽：骂刘士余有什么用 卖者有责买者自负', 'https://t12.baidu.com/it/u=771110678,2700177524&fm=173&s=50907D9D520E17EF14B859650300C060&w=218&h=146&img.JPEG', '2017-06-08 00:00:00', 'souhui'),
(2, '百家', '阿里巴巴CEO张勇：马云现在看问题就像外星人俯瞰地球', 'https://t12.baidu.com/it/u=632787266,3714102990&fm=173&s=5ABA31C54A723F9460344CE903007013&w=218&h=146&img.JPEG', '2017-05-17 19:00:00', 'xinhua'),
(6, '精选', '喀布尔袭击事件幸存者：这里每天都在发生爆炸', 'https://t11.baidu.com/it/u=2734933687,2436647705&fm=173&s=2CF26987CCAA549ED9A1E0DA01005093&w=218&h=146&img.JPEG', '2017-03-14 00:00:00', '搜狐I'),
(7, '精选', '男子涉醉驾被查 纵身撞车还怒怼警察:我俩单挑', 'https://t10.baidu.com/it/u=695125929,968174318&fm=173&s=C020BEF74A5104C4A8B8EB2D0300704C&w=218&h=146&img.JPEG', '2017-06-13 00:00:00', '热门'),
(53, '精选', '疑因36岁博士女儿不结婚 南宁一男子挥刀砍向妻女', 'https://t11.baidu.com/it/u=2557896010,2310580941&fm=173&s=EEE4CD4ACF8C177AD24115350300D050&w=218&h=146&img.JPEG', '2017-01-11 00:00:00', '凤凰11'),
(54, '精选', '王炯履新河南省委副书记 此前任江苏省委组织部长', 'https://t10.baidu.com/it/u=4283684238,3856986200&fm=173&s=FE34C54FAEE590C64E7D791B03008082&w=218&h=146&img.JPEG', '2017-01-27 00:00:00', '六一'),
(55, '社会', '马斯克:如果美国退出巴黎气候协定 他将退出白宫经济顾问委员会', 'https://t12.baidu.com/it/u=3906914423,22704639&fm=173&s=FAA1716C889964551E6C4C920300D093&w=218&h=146&img.JPG', '2017-02-16 00:00:00', '六一'),
(56, '社会', '邓文迪的传奇人生，在她面前都是小儿科', 'https://t10.baidu.com/it/u=1151159877,673802932&fm=173&s=467216C1027A0A31119869210300E050&w=218&h=146&img.GIF', '2017-03-16 00:00:00', 'CD'),
(57, '百家', '桑文锋：创业是场持久战，我希望能重构中国互联网的数据根基', 'https://t11.baidu.com/it/u=1907741833,2571213325&fm=173&s=7C071774446113056F8422C50300F0A3&w=218&h=146&img.JPEG', '2017-03-24 00:00:00', 'CDM');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动增长', AUTO_INCREMENT=58;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
