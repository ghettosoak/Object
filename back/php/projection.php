<?php

include('../../join/delicious.php');

$projector = $_REQUEST['projector'];

$inforesult = mysql_query("select object_id, name, client, category, date_launched, total_hours, project_text, link, coord_y, coord_z from objects where object_id =".$projector);
$cateresult = mysql_query("select distinct category from objects");
$shapresult = mysql_query("select img from shapeshifter_individual where object_key =".$projector);
$cellresult = mysql_query("select cell_id, img, txt from cells where object_key =".$projector);

$individ = array();
// $individ['data'] = array();
$individ['data'] = array();
$individ['categories'] = array();
$individ['shapeshifters'] = array();
$individ['cells'] = array();

while ($inforow = mysql_fetch_assoc($inforesult)){
	$individ['data'] = $inforow;
}

while ($infocate = mysql_fetch_assoc($cateresult)){
	array_push($individ['categories'], $infocate['category']);
}

while ($infoshape = mysql_fetch_assoc($shapresult)){
	array_push($individ['shapeshifters'], $infoshape['img']);
}

// $infocate = mysql_fetch_assoc($cateresult);

// for ($i = 1; $i <= 10; $i++) {
// 	$individ['categories'][$i] = $infocate[$i];
// }

while ($cellrow = mysql_fetch_assoc($cellresult)){
	$thecells = array("cell_id" => $cellrow['cell_id'], "img" => $cellrow['img'], "txt" => $cellrow['txt']);

    $individ['cells'][] = $thecells;

    // array_push($individ[$cellrow['cells']], $thecells );
}


// echo jsonReadable(json_encode($individ, JSON_HEX_APOS));
// echo json_encode($individ);

if ($_REQUEST['debug']) {
	echo (jsonReadable(json_encode($individ)));
}
else {
	echo json_encode($individ);
}

?>