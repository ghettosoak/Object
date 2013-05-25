<?php
	include('../../join/delicious.php');
	$martyr = $_REQUEST['kill'];
	mysql_query('delete from mebg where mebg_id = '.$martyr);
	echo json_encode($martyr.' DESTROYED');
?>