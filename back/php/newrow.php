<?php
	include('../../join/delicious.php');

	$newcategarray = $_REQUEST['newcategarray'];

	// echo json_encode($newcategarray);

	$newcategories = '("'.implode('"), ("', $newcategarray).'")';
	// echo $newcategories;


	mysql_query("truncate table categories");
	mysql_query("insert into categories (name) values ".$newcategories);


?>