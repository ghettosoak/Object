<?php

	include('../../join/delicious.php');

	$ids = mysql_query("select mebg_id from mebg");

	$me_ids = array();

	while ($theids = mysql_fetch_array($ids)){
		array_push($me_ids, $theids['mebg_id']);
	}

	echo $me_ids[rand(0, count($me_ids)-1)];

?>