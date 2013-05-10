<?php

include('../../join/delicious.php');

// include('sprite.php');

$number = $_REQUEST['number'];
$data = $_REQUEST['data'];
$shapeshifters = $_REQUEST['shapeshifters'];
$celltext = $_REQUEST['celltext'];

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

echo 'DATA UPDATED // ';


// $shapresult = mysql_query("select shapeshifter_id from shapeshifter_individual where object_key =".$projector);

$madewith = mysql_query("select madewith from shapeshifter_sprite where object_key =".$projector);
$madewithlove = explode(', ', $madewith);
$diffff = array_diff($shapeshifters, $madewithlove);

if (count($diffff) > 0){
	$path = '../img/shapeshift/'.$number.'/';
	$sprite_name = 'sprite_'.$number;
	$final_sprite_location = '../img/shapeshift/';

	include('sprite.php');


	echo 'SPRITE CREATED // ';
}else echo 'NO SPRITE CREATED // ';

foreach ($celltext as $celltextpos => $celltextcontent){
	mysql_query('update cells set txt = "'.$celltextcontent.'" where cell_id = '.$celltextpos);
}

echo 'CELL TEXTS UPDATED // KTHX';

?>