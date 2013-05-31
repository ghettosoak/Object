<?php

include('../../join/delicious.php');

$project = $_REQUEST['project'];

$going = mysql_query('select img, txt from cells where object_key = '.$project);

$goods = array();

while ($cell = mysql_fetch_assoc($going)){
    $goods[] = array('img' => $cell['img'], 'txt' => $cell['txt']);
}

echo json_encode($goods)


?>