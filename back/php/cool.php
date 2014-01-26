<?php

	// header("Content-Type: image/jpeg");

	// include('../../join/delicious.php');

	// $nextimg = 59;

	// // $blurs = 30;
	// $theImage = imagecreatefromjpeg("../../join/img/me/clean/".$nextimg.".jpg");
	// // for ($i = 0; $i < $blurs; $i++) {
	//     // imagefilter($image, IMG_FILTER_GAUSSIAN_BLUR);
	// // }

	echo 'lets do this!';

	if (!extension_loaded('imagick'))
	    echo 'imagick not installed';
	else echo 'fuck yeah!';

// header('Content-type: image/jpeg');

// $image = new Imagick("../../join/img/me/clean/".$nextimg.".jpg");

// $image->blurImage(5,3);

// echo 'yeah!';

	// imagefilter($theImage, IMG_FILTER_GAUSSIAN_BLUR);

	// // imagefilter($theImage, IMG_FILTER_PIXELATE, 50);

	// imagejpeg($theImage, '../../join/img/me/blur/'.$nextimg.'.jpg');
	
	// imagedestroy($theImage);

	// echo '<br />' . $nextimg . '<br />FUCK YEAH';

?>