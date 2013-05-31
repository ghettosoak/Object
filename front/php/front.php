<?php

include('../../join/delicious.php');


$cubes = mysql_query("select object_id, category, coord_y, coord_z from objects");
$shapeshift = mysql_query("select object_key, img, madewith from shapeshifters_sprite");
$ids = mysql_query("select mebg_id from mebg");
$txt = mysql_query("select txt from metxt");

$first = array();

$first['nav'] = array();
$first['nav']['cubes'] = array();
$first['nav']['shapeshifter'] = array();

$first['me'] = array();
$first['me']['txt'] = array();
// $first['me']['img'] = array();

while ($onecube = mysql_fetch_assoc($cubes)){
	$coords = array("y" => $onecube['coord_y'], "z" => $onecube['coord_z']);
    $first['nav']['cubes'][$onecube['category']][$onecube['object_id']] = $coords;
}

while ($oneshapeshift = mysql_fetch_assoc($shapeshift)){
    $first['nav']['shapeshifter'][$oneshapeshift['object_key']] = array('img' => $oneshapeshift['img'], 'count' => count(explode(', ', $oneshapeshift['madewith'])));
}

$me_ids = array();

while ($theids = mysql_fetch_array($ids)){
	array_push($me_ids, $theids['mebg_id']);
}

$first['me']['img'] = $me_ids[rand(0, count($me_ids)-1)];

while ($metext = mysql_fetch_assoc($txt)){
	$first['me']['txt'][] = $metext['txt'];
}

echo jsonReadable(json_encode($first));

?>