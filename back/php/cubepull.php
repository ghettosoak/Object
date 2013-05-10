<?php

include('../../join/delicious.php');

$result = mysql_query("select object_id, category, coord_y, coord_z from objects");
$cateresult = mysql_query("select distinct category from objects");


$cubes = array();
$cubes['cubes'] = array(); 
$cubes['categories'] = array();

while ($row = mysql_fetch_assoc($result)){
	// array_push($cubes,$row);
	//$cubes[$row['category']]['category'] = $row['category'];

	$coords = array("y" => $row['coord_y'], "z" => $row['coord_z']);

	//$cubes[$row['category']][] = $coords;
    // array_push($cubes[$row['category']], $coords );
    $cubes['cubes'][$row['category']][$row['object_id']] = $coords;
}

while ($infocate = mysql_fetch_assoc($cateresult)){
    array_push($cubes['categories'], $infocate['category']);
}

echo jsonReadable(json_encode($cubes));






?>