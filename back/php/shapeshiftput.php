<?php

include('../../join/delicious.php');

$upload_dir = '../img/shapeshift/';
$allowed_ext = array('jpg','jpeg','png','gif');

$projected = $_REQUEST['projectnumbershapeshift'];

if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
	exit_status('Error! Wrong HTTP method!');
}

if(array_key_exists('shap',$_FILES) && $_FILES['shap']['error'] == 0 ){
	
	$shap = $_FILES['shap'];

	$escapedname = str_replace(' ', '%20', $shap['name']);

	mysql_query("insert into shapeshifter_individual(object_key, img) values(".$projected.", 'img/shapeshift/".$escapedname."')");

	if(!in_array(get_extension($shap['name']),$allowed_ext)){
		exit_status('Only '.implode(',',$allowed_ext).' files are allowed!');
	}

	$line = implode('		', array( date('r'), $_SERVER['REMOTE_ADDR'], $shap['size'], $shap['name']));
	file_put_contents('log.txt', $line.PHP_EOL, FILE_APPEND);		

	if(move_uploaded_file($shap['tmp_name'], $upload_dir.$shap['name'])){
		exit_status('File was uploaded successfuly!');
	}
}

exit_status('Something went wrong with your upload!');

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