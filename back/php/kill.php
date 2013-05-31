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

		unlink('../../join/img/shapeshift/sprite_'.$project.'.png');

		// $madewith = mysql_query("select madewith from shapeshifters_sprite where object_key =".$project);
		// $madewithrow = mysql_fetch_array($madewith, MYSQL_NUM);

		// $madewithlove = explode(', ', $madewithrow[0]);

		// $remover = array_diff($madewithlove, array($field));

		// $likeitwasneverthere = implode(', ', $remover);

		// $deed = mysql_query("update shapeshifters_sprite set madewith = '".$likeitwasneverthere."' where object_key = ".$project);


	}else{
		$aim = array("cells", "cell_id");
	}

	mysql_query('delete from '.$aim[0].' where '.$aim[1].' = '.$field.' and object_key = '.$project);

	// mysql_query('delete from '.$aim[0].' where '.$aim[1].' = '.$field.' and object_key = '.$project);
	echo $field." in ".$target." deleted...";
?>