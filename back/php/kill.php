<?php
	include('../../join/delicious.php');

	$target = $_REQUEST['target'];
	$project = $_REQUEST['project'];
	$field = $_REQUEST['field'];

	if ($target === "shapeshifter"){
		$aim = array("shapeshifter_individual", "shapeshifter_id");
		
		$sudden = mysql_query('select img from shapeshifter_individual where shapeshifter_id = '.$field);
		$suddendeath = mysql_fetch_array($sudden, MYSQL_NUM);
		echo $suddendeath[0];

		unlink("../".$suddendeath[0]);
	}else{
		$aim = array("cells", "cell_id");
	}

	mysql_query('delete from '.$aim[0].' where '.$aim[1].' = '.$field.' and object_key = '.$project);

	// mysql_query('delete from '.$aim[0].' where '.$aim[1].' = '.$field.' and object_key = '.$project);
	echo $field." in ".$target." deleted...";
?>