<?php

include('../join/delicious.php');

$result = mysql_query("select object_id, category, coord_y, coord_z from objects");

$cubes = array();

while ($row = mysql_fetch_assoc($result)){
	// array_push($cubes,$row);
	//$cubes[$row['category']]['category'] = $row['category'];

	$coords = array("y" => $row['coord_y'], "z" => $row['coord_z']);

	//$cubes[$row['category']][] = $coords;
    // array_push($cubes[$row['category']], $coords );
    $cubes[$row['category']][$row['object_id']] = $coords;
}


echo jsonReadable(json_encode($cubes));




















?>