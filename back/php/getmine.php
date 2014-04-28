<?php

	include('../../join/delicious.php');

	$img = mysql_query("select mebg_id, bg from mebg");
	$txt = mysql_query("select metxt_id, txt from metxt");

	$me = array();
	$me['imgs'] = array();
	$me['txts'] = array();

	while ($theimgs = mysql_fetch_array($img)){
		$me['imgs'][] = array("id" => $theimgs['mebg_id'], "img" => $theimgs['bg']);
	}

	while ($thetxts = mysql_fetch_array($txt)){
		$me['txts'][] = array("id" => $thetxts['metxt_id'], "txt" => escapeJsonString($thetxts['txt']));
	}

	// echo jsonReadable(json_encode($me));

	echo json_encode($me);

?>