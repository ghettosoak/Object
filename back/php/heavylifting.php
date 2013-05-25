<?php

	include('../../join/delicious.php');

	// include('sprite.php');

	$number = $_REQUEST['number'];
	$data = $_REQUEST['data'];
	$shapeshifters = $_REQUEST['shapeshifters'];
	$celltext = $_REQUEST['celltext'];
	$age = $_REQUEST['isnew'];

	$watcher = array();

	array_push($watcher, $age);

	if ($age == "false"){

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

	}else{
		mysql_query('insert into objects(
			name, client, category, date_launched, total_hours, project_text, link, coord_y, coord_z
			) values(
			"'.$data['name'].'",
			"'.$data['client'].'",
			"'.$data['category'].'",
			"'.$data['date_launched'].'",
			"'.$data['total_hours'].'",
			"'.$data['project_text'].'",
			"'.$data['link'].'",
			"'.$data['coord_y'].'",
			"'.$data['coord_z'].'"
		)');

		array_push($watcher, "DATA CREATED");
	}

	// $shapresult = mysql_query("select shapeshifter_id from shapeshifter_individual where object_key =".$projector);

	$madewith = mysql_query("select madewith from shapeshifters_sprite where object_key = ".$number);
	$madewithrow = mysql_fetch_array($madewith, MYSQL_NUM);

	$madewithlove = explode(', ', $madewithrow[0]);

	$diffff = array_diff($shapeshifters, $madewithlove);

	
	// array_push($watcher, implode(', ', $shapeshifters));
	// array_push($watcher, implode(', ', $madewithrow));
	// array_push($watcher, implode(', ', $diffff));

	if (count($diffff) > 0){
		$path = '../../join/img/shapeshift/'.$number.'/';
		$sprite_name = 'sprite_'.$number;
		$final_sprite_location = '../../join/img/shapeshift/';

		echo $path."\n";
		echo $sprite_name."\n";
		echo $final_sprite_location."\n";

		include('sprite.php');

		mysql_query('update shapeshifters_sprite set madewith = "'.implode(', ', $shapeshifters).'", img = "img/shapeshifter/sprite_'.$number.'.png" where object_key = '.$number);

	}else array_push($watcher, "NO SPRITE CREATED");

	foreach ($celltext as $celltextpos => $celltextcontent){
		mysql_query('update cells set txt = "'.$celltextcontent.'" where cell_id = '.$celltextpos);
	}

	array_push($watcher, "CELL TEXTS UPDATED");
	array_push($watcher, "KTHX");

	echo json_encode($watcher);

?>