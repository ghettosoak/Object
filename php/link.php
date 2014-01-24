<?php

include('../join/delicious.php');

$pass = $_REQUEST['pass'];

$check = mysql_query('select id, whom from login where passkey = "'.$pass.'"');

$logic = mysql_fetch_assoc($check);

if (count($logic['id']) == 1){
	$editor = include('../back/index.php');
	echo $editor;
}else{
	echo 'FUCK YOU';
};

?>

