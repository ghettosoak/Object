<?php

include('../../join/delicious.php');

$upload_dir = '../../join/img/cells/';
$allowed_ext = array('jpg','jpeg','png','gif');

$projector = $_REQUEST['projectnumbercell'];
$microprojector = $_REQUEST['cellnumbercell'];

if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
	exit_status('Error! Wrong HTTP method!');
}

if(array_key_exists('pic',$_FILES) && $_FILES['pic']['error'] == 0 ){
	
	$pic = $_FILES['pic'];

	$escapedname = str_replace(' ', '%20', $pic['name']);

	mysql_query("update cells set object_key =".$projector.", img = 'join/img/cells/".$escapedname."' where cell_id = ".$microprojector);

	if(!in_array(get_extension($pic['name']),$allowed_ext)){
		exit_status('Only '.implode(',',$allowed_ext).' files are allowed!');
	}

	$line = implode('		', array( date('r'), $_SERVER['REMOTE_ADDR'], $pic['size'], $pic['name']));
	file_put_contents('log.txt', $line.PHP_EOL, FILE_APPEND);		
	
	if(move_uploaded_file($pic['tmp_name'], $upload_dir.$pic['name'])){
		exit_status('SUCCESS');
	}
}

exit_status('FUCK');

function exit_status($str){
	echo json_encode(array('status'=>$str));
	exit;
}

function get_extension($file_name){
	$ext = explode('.', $file_name);
	$ext = array_pop($ext);
	return strtolower($ext);
}
?>