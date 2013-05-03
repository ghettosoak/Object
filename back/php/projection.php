<?php

include('../../join/delicious.php');

$projector = $_REQUEST['projector'];

$inforesult = mysql_query("select name, client, category, date_launched, total_hours, project_text, link, coord_y, coord_z from objects where object_id =".$projector);
$cellresult = mysql_query("select cell_id, img, txt from cells where object_key =".$projector);

$individ = array();
// $individ['data'] = array();
$individ['data'] = array();
$individ['cells'] = array();

while ($inforow = mysql_fetch_assoc($inforesult)){
	$individ['data'] = $inforow;
	// array_push($individ, $inforow);
}

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