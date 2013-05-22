<?php

include('../../join/delicious.php');

$upload_dir = '../img/shapeshift/';
$allowed_ext = array('jpg','jpeg','png','gif');

$projected = $_REQUEST['projectnumbershapeshift'];

if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
	exit_status('Error! Wrong HTTP method!');
}

if(array_key_exists('shap',$_FILES) && $_FILES['shap']['error'] == 0 ){

	if (!is_dir($upload_dir.$projected)) {
	    mkdir($upload_dir.$projected);         
	}
	
	$shap = $_FILES['shap'];

	$escapedname = str_replace(' ', '%20', $shap['name']);

	mysql_query("insert into shapeshifter_individual(object_key, img) values(".$projected.", 'img/shapeshift/".$projected."/new_".$escapedname."')");

	$thelatestnumber = mysql_insert_id();

	if(!in_array(get_extension($shap['name']),$allowed_ext)){
		exit_status('Only '.implode(',',$allowed_ext).' files are allowed!');
	}

	$line = implode('		', array( date('r'), $_SERVER['REMOTE_ADDR'], $shap['size'], $shap['name']));
	file_put_contents('log.txt', $line.PHP_EOL, FILE_APPEND);		

	if(move_uploaded_file($shap['tmp_name'], $upload_dir."/".$projected."/".$shap['name'])){

		$image = imagecreatefromjpeg($upload_dir."/".$projected."/".$shap['name']);
		$filename = $upload_dir."/".$projected."/new_".$shap['name'];

		$thumb_width = 351;
		$thumb_height = 351;

		$width = imagesx($image);
		$height = imagesy($image);

		$original_aspect = $width / $height;
		$thumb_aspect = $thumb_width / $thumb_height;

		if ( $original_aspect >= $thumb_aspect ){
		   // If image is wider than thumbnail (in aspect ratio sense)
		   $new_height = $thumb_height;
		   $new_width = $width / ($height / $thumb_height);
		}else{
		   // If the thumbnail is wider than the image
		   $new_width = $thumb_width;
		   $new_height = $height / ($width / $thumb_width);
		}

		$thumb = imagecreatetruecolor( $thumb_width, $thumb_height );

		// Resize and crop
		imagecopyresampled($thumb,
		                   $image,
		                   0 - ($new_width - $thumb_width) / 2, // Center the image horizontally
		                   0 - ($new_height - $thumb_height) / 2, // Center the image vertically
		                   0, 0,
		                   $new_width, $new_height,
		                   $width, $height);
		imagejpeg($thumb, $filename, 80);

		unlink($upload_dir."/".$projected."/".$shap['name']);

		echo json_encode(array('status'=>'Uploaded & Cropped!', 'number'=>$thelatestnumber));
		exit;
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