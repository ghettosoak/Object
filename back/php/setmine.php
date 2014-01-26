<?php
	include('../../join/delicious.php');

	$newtxt = $_REQUEST['newtxt'];
	$newimg = $_REQUEST['imgsession'];
	$response = array();

	$thenewtext = '("'.implode('"), ("', $newtxt).'")';

	mysql_query("truncate table metxt");

	mysql_query("insert into metxt (txt) values ".$thenewtext);

	array_push($response, 'TEXT UPDATED');

	if (count($newimg) > 0){
		foreach($newimg as $blurring){
			array_push($response, intval($blurring));

			// $image = imagecreatefromjpeg('../../join/img/me/clean/'.$blurring.'.jpg');
			// for ($i = 0; $i < 30; $i++) {
			//     imagefilter($image, IMG_FILTER_GAUSSIAN_BLUR);
			// }
			// imagejpeg($image, "../../join/img/me/blur/'.$blurring.'.jpg");
			// imagedestroy($image);


			$image = new Imagick("../../join/img/me/clean/".$blurring.".jpg");

			$image -> blurImage(25,25);

			$image -> writeImage('../../join/img/me/blur/'.$blurring.'.jpg');
		}
		array_push($response, 'IMAGES BLURRED');
	}

	echo json_encode($response);

?>