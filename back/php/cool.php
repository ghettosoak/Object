<?php

// if (!is_dir('cool')) {
// 	    mkdir('cool');         
// 	}
	include('../../join/delicious.php');

	$projected = 23;
	$escapedname = 'yeah';

		mysql_query("insert into shapeshifter_individual(object_key, img) values('".$projected."', 'join/img/shapeshift/".$projected."/new_".$escapedname."')");


?>