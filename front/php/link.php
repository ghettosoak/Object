<?php

include('../../join/delicious.php');

$pass = $_REQUEST['pass'];

$check = mysql_query('select id, whom from login where passkey = "'.$pass.'"');

$logic = mysql_fetch_assoc($check);

if (count($logic['id']) == 1){
	// echo 'yeah!';

	// $editor = 
	include('../../back/index.php');
	echo $editor;
}else exit;

// $logins = array();

// while ($logic = mysql_fetch_assoc($check)) $logins[] = $logic['id'];

// echo json_encode($logins);

?>

