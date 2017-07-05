<?php
	header("Content-type:application/json;charset=utf-8");
	include "connect.php";
	$newstype=$_POST["newstype"];
	$newstitle=$_POST["newstitle"];
	$newsimg=$_POST["newsimg"];
	$newstime=$_POST["newstime"];
	$newssrc=$_POST["newssrc"];
	$sql= "INSERT INTO `news`( `newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`) VALUES ('{$newstype}','{$newstitle}','{$newsimg}','{$newstime}','{$newssrc}')";
	$retval = mysql_query($sql,$conn);	
	if(!$retval )
	{
	  die('插入数据库失败: ' . mysql_error());
	}
	echo json_encode(array('success'=>'ok'));
	mysql_close($conn);	
?>