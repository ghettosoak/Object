<?php

	include('../../join/delicious.php');

	// include('sprite.php');

	$number = $_REQUEST['number'];
	$data = $_REQUEST['data'];
	$shapeshifters = $_REQUEST['shapeshifters'];
	$celltext = $_REQUEST['celltext'];

	$watcher = array();

	mysql_query('update objects set 
		name = "'.$data['name'].'",
		client = "'.$data['client'].'",
		category = "'.$data['category'].'",
		date_launched = "'.$data['date_launched'].'",
		total_hours = "'.$data['total_hours'].'",
		project_text = "'.$data['project_text'].'",
		link = "'.$data['link'].'",
		coord_y = "'.$data['coord_y'].'",
		coord_z = "'.$data['coord_z'].'"
	where object_id = '.$number);

	array_push($watcher, "DATA UPDATED");

	// $shapresult = mysql_query("select shapeshifter_id from shapeshifter_individual where object_key =".$projector);

	$madewith = mysql_query("select madewith from shapeshifters_sprite where object_key = ".$number);
	$madewithrow = mysql_fetch_array($madewith, MYSQL_NUM);

	$madewithlove = explode(', ', $madewithrow[0]);

	$diffff = proper_array_diff($shapeshifters, $madewithlove);

	
	// echo implode(', ', $shapeshifters)."\n";
	// echo implode(', ', $madewithrow)."\n";
	// echo implode(', ', $diffff)."\n";

	if (count($diffff) > 0){
		$path = '../img/shapeshift/'.$number.'/';
		$sprite_name = 'sprite_'.$number;
		$final_sprite_location = '../img/shapeshift/';

		include('sprite.php');

		mysql_query('update shapeshifters_sprite set madewith = "'.implode(', ', $shapeshifters).'", img = "img/shapeshifter/sprite_'.$number.'.png" where object_key = '.$number);

		array_push($watcher, "SPRITE CREATED");
	}else array_push($watcher, "NO SPRITE CREATED");

	foreach ($celltext as $celltextpos => $celltextcontent){
		mysql_query('update cells set txt = "'.$celltextcontent.'" where cell_id = '.$celltextpos);
	}

	array_push($watcher, "CELL TEXTS UPDATED");
	array_push($watcher, "KTHX");

	echo json_encode($watcher);

?>