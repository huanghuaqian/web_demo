<?php
	header("Content-type:application/json;charset=utf-8");
	include "connect.php"; 
	$newsid=$_GET['newsid'];
	$sql= "SELECT * FROM `news` WHERE id={$newsid}";
	$retval = mysql_query($sql,$conn);	
	if(!$retval )
	{
	  die('插入数据库失败: ' . mysql_error());
	}
	$arr=array();
	while($row=mysql_fetch_assoc($retval)){
		array_push($arr, array(
							   'newsid'=>$row['id'],						   
							   'newstype'=>$row["newstype"],
						       'newsimg'=>$row['newsimg'],
						       'newstime'=>$row['newstime'],
						       'newssrc'=>$row['newssrc'],
						       'newstitle'=>$row['newstitle'])
		           );
	}
	echo json_encode ( $arr);
	mysql_close($conn);	
?>