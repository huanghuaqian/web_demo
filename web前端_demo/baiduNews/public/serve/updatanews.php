<?php
	header("Content-type:application/json;charset=utf-8");
	include "connect.php";
	$newstype=$_POST["newstype"];
	$newstitle=$_POST["newstitle"];
	$newsimg=$_POST["newsimg"];
	$newstime=$_POST["newstime"];
	$newssrc=$_POST["newssrc"];
	$newsid=$_POST["newsid"];
	$sql= "UPDATE `news` SET `newstitle`='{$newstitle}', `newstype`='{$newstype}', `newsimg`='{$newsimg}', `newstime`='{$newstime}', `newssrc`='{$newssrc}' WHERE id='{$newsid}'";
	$retval = mysql_query($sql,$conn);	
	if(!$retval )
	{
	  die('插入数据库失败: ' . mysql_error());
	}
	echo json_encode(array('success'=>'ok'));
	mysql_close($conn);	
?>