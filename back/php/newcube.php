<?php

include('../../join/delicious.php');

$newshoes = array();

$thelast = mysql_query('select object_id from objects order by object_id desc limit 1');
$thelatest = mysql_fetch_array($thelast, MYSQL_NUM);

$newshoes['number'] = $thelatest[0]+1;

echo json_encode($newshoes);

?>