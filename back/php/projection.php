<?php

include('../../join/delicious.php');

$projector = $_REQUEST['projector'];

$inforesult = mysql_query("select object_id, name, client, category, date_launched, total_hours, project_text, link, coord_y, coord_z from objects where object_id =".$projector);
$shapresult = mysql_query("select shapeshifter_id, img from shapeshifter_individual where object_key =".$projector);
$cellresult = mysql_query("select cell_id, img, txt from cells where object_key =".$projector);

$individ = array();
$individ['data'] = array();
$individ['shapeshifters'] = array();
$individ['cells'] = array();

while ($inforow = mysql_fetch_assoc($inforesult)){
	$individ['data'] = $inforow;
}

while ($infoshape = mysql_fetch_assoc($shapresult)){
	$theshapeshi = array("shapeshifter_id" => $infoshape['shapeshifter_id'], "img" => $infoshape['img']);
	$individ['shapeshifters'][] = $theshapeshi;
}

while ($cellrow = mysql_fetch_assoc($cellresult)){
	$thecells = array("cell_id" => $cellrow['cell_id'], "img" => $cellrow['img'], "txt" => $cellrow['txt']);
    $individ['cells'][] = $thecells;
}

if ($_REQUEST['debug']) {
	echo (jsonReadable(json_encode($individ)));
}
else {
	echo json_encode($individ);
}

?>