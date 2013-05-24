<?php
	include('../../join/delicious.php');

	$cubekiller = $_REQUEST['target'];

	mysql_query('delete from objects where object_id = '.$cubekiller);

	$ransom = array();

	array_push($ransom, "CUBE ".$cubekiller." DELETED");

	echo json_encode($ransom);
?>