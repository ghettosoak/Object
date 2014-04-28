<?php

include('../../join/delicious.php');


$reprecateg = mysql_query("select distinct category from objects");
$totalcateg = mysql_query("select name from categories");

$cubes = array();
$cubes['cubes'] = array(); 
$cubes['rep_cat'] = array();
$cubes['tot_cat'] = array();

while ($rep = mysql_fetch_assoc($reprecateg)){
    array_push($cubes['rep_cat'], $rep['category']);
}

while ($all = mysql_fetch_assoc($totalcateg)){
    array_push($cubes['tot_cat'], $all['name']);
}

$categ_list = '"'.implode('", "', $cubes['tot_cat']).'"';

$gathered = mysql_query("select object_id, category, coord_y, coord_z from objects order by field (category, ".$categ_list.")");

while ($row = mysql_fetch_assoc($gathered)){
	$coords = array("y" => $row['coord_y'], "z" => $row['coord_z']);
    $cubes['cubes'][$row['category']][$row['object_id']] = $coords;
}

echo json_encode($cubes);

?>