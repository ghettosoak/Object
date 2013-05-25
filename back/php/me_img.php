<?php

	header("Content-Type: image/jpeg");

	include('../../join/delicious.php');

	$upload_dir = '../../join/img/me/clean/';
	$allowed_ext = array('jpg','jpeg','png','gif');

	// $projector = $_REQUEST['projectnumbercell'];
	// $microprojector = $_REQUEST['cellnumbercell'];

	if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
		exit_status('Error! Wrong HTTP method!');
	}

	if(array_key_exists('me_image',$_FILES) && $_FILES['me_image']['error'] == 0 ){
		
		$me_image = $_FILES['me_image'];

		$escapedname = str_replace(' ', '%20', $me_image['name']);

		
		$status = mysql_query("show table status like 'mebg'");
		$thestatus = mysql_fetch_array($status, MYSQL_ASSOC);

		$nextimg = $thestatus['Auto_increment'];

		mysql_query("insert into mebg (bg) values('../join/img/me/clean/".$nextimg.".jpg')");

		if(!in_array(get_extension($me_image['name']),$allowed_ext)){
			exit_status('Only '.implode(',',$allowed_ext).' files are allowed!');
		}
		
		if(move_uploaded_file($me_image['tmp_name'], $upload_dir.$nextimg.'.jpg')){

			// header('Content-Type: image/png');

			// $blurs = 30;
			// $image = imagecreatefromjpeg('../../join/img/me/clean/'.$nextimg.'.jpg');

			// // echo json_encode(array('status'=>$str));

			// for ($i = 0; $i < 30; $i++) {
			//     imagefilter($image, IMG_FILTER_GAUSSIAN_BLUR);
			// }

			// imagejpeg($image, '../../join/img/me/blur/'.$nextimg.'.jpg');
			// imagedestroy($image);


			// $blurs = 30;
			// $image = imagecreatefromjpeg("../../join/img/me/clean/"..".jpg");
			// for ($i = 0; $i < $blurs; $i++) {
			//     imagefilter($image, IMG_FILTER_GAUSSIAN_BLUR);
			// }
			// imagejpeg($image, '../../join/img/me/blur/43.jpg');
			// imagedestroy($image);

			echo json_encode(array('img_id'=>$nextimg));
			exit;

			// exit_status('SUCCESS');
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