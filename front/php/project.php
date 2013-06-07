<?php

include('../../join/delicious.php');

$project = $_REQUEST['project'];

$going = mysql_query('select img, txt from cells where object_key = '.$project);

$info = mysql_query('select name, client, date_launched, total_hours, project_text, link from objects where object_id = '.$project);

$goods = array();
$goods['cells'] = array();
$goods['stat'] = array();

while ($cell = mysql_fetch_assoc($going)){
    $goods['cells'][] = array('img' => $cell['img'], 'txt' => $cell['txt']);
}

while ($bit = mysql_fetch_assoc($info)){
    $goods['stat'] = $bit;
}


echo json_encode($goods);


?>