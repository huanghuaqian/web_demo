<?php
$conn = mysql_connect("localhost", "root", "");
	
	if(! $conn )
	{
	  die('连接失败: ' . mysql_error());
	}	
	//选择数据库
	$db=mysql_select_db("baidunews");
    mysql_query("set names utf8",$conn);
	if(!$db){
		die("连接数据库baidunews失败".mysql_error());
	}
?>