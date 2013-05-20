<?php
	include('../../join/delicious.php');

	$target = $_REQUEST['target'];
	$project = $_REQUEST['project'];
	$field = $_REQUEST['field'];

	if ($target === "shapeshifter") $aim = array("shapeshifter_individual", "shapeshifter_id");
	else $aim = array("cells", "cell_id");

	mysql_query('delete from '.$aim[0].' where '.$aim[1].' = '.$field.' and object_key = '.$project);
	echo $field." in ".$target." deleted...";
?>