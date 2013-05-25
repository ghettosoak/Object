<?php

// if (!is_dir('cool')) {
// 	    mkdir('cool');         
// 	}
	include('../../join/delicious.php');

	header('Content-Type: image/png');

	$blurs = 30;
	$image = imagecreatefromjpeg('../../join/img/me/clean/1.jpg');
	for ($i = 0; $i < $blurs; $i++) {
	    imagefilter($image, IMG_FILTER_GAUSSIAN_BLUR);
	}
	imagejpeg($image, '../../join/img/me/blur/14.jpg');
	imagedestroy($image);

?>