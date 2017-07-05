<?php
	header("Content-type:application/json;charset=utf-8");
	include "connect.php";
	$newsid=$_POST['newsid'];
	$sql= "DELETE FROM `news` WHERE id={$newsid}";
	$retval = mysql_query($sql,$conn);	
	if(!$retval )
	{
	  die('插入数据库失败: ' . mysql_error());
	}
	echo json_encode(array('success'=>'ok'));
	mysql_close($conn);	
?>