<?php

include('../../join/delicious.php');

$mitosis = array();

mysql_query('insert into cells () values ()');
$thelatest = mysql_insert_id();

$mitosis['number'] = $thelatest;

echo json_encode($mitosis);

?>