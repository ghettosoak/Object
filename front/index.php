<!DOCTYPE html>
<html lang="en">
	<head>
		<title>object_v0020</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		
		<link rel="stylesheet" type="text/css" href="css/master.css" />
	</head>
	<body>
		<div class="master">
			<div class="movement">
				<div class="me">
					<div class="me_img">
						<div id="me_clean"></div>
						<div id="me_blur"></div>
					</div>

					<div class="meme me_x1 me_y1"> 
						<div id="megrey"></div>
						<p>my name is <br /><span>mike</span></p>
					</div>
					<div class="me01 me_x2 me_y1 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me02 me_x3 me_y1 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me03 me_x4 me_y1 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me04 me_x1 me_y2 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me05 me_x2 me_y2 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me06 me_x3 me_y2 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me07 me_x4 me_y2 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me08 me_x1 me_y3 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me09 me_x2 me_y3 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me10 me_x3 me_y3 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me11 me_x4 me_y3 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me12 me_x1 me_y4 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me13 me_x2 me_y4 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="me14 me_x3 me_y4 me_bit"><div class="me_float"><div class="me_txt"></div></div></div>
					<div class="meback me_x4 me_y4">
						<div id="mebackwhite"></div>
						<img src="img/back_right.png" />
					</div>
				</div>
				<div class="front">
					<div id="cubic"></div>
					<div id="shapeshifter">
						<svg class="svg-graphic" id="cubeshape" width="137" height="149" viewBox="0 0 137 149" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
							<g>
				               <clipPath id="hex-mask">
				                    <polygon points="0,30 68.444,1 138,30 137,116 68.624,149 1,116" />
				                </clipPath>
				           	</g>

				           <!-- <image id="ssi01" class="ssi" clip-path="url(#hex-mask)" height="499%" width="107%" x="-3.5%" y="0" xlink:href="img/p/sh/1.jpg" preserveAspectRatio="xMidYMin slice" /> -->
						</svg>
					</div>
				</div>
				<div class="red">
					
					<div class="left">
						<p class="title">OB.JECT</p>
						<p class="who">?</p>
						<p class="copright">&copy; 2013 MTO'BF</p>
					</div>
					<div class="middle">

					</div>
					<div class="right">
						<p id="instruct">
							click to expand<br />
							drag to navigate
						</p>
						<img src="img/back_left.png" id="point" />
						<div class="crumb">
							<div class="crumbput"></div>
						</div>
					</div>
					
				</div>
				<div class="grid">
					<div class="floater"></div>
				</div>
			</div>
		</div>

		

		<script src="js/lib/jquery-1.8.3.min.js"></script>
		<script src="js/lib/underscore-min.js"></script>
		<script src="js/lib/jquery.transit.min.js"></script>
		<script src="js/lib/three.min.54.js"></script>
		<script src="js/lib/CSS3DRenderer.js"></script>
		<script src="js/lib/tween.min.js"></script>
		<script src="js/lib/jquery.isotope.min.js"></script>
		<script src="js/lib/blur.dev.js"></script>
		<script src="js/lib/jquery.animate-colors-min.js"></script>
		<script src="js/lib/jquery.animate-shadow-min.js"></script>
		<script src="js/lib/selectivizr-min.js"></script>

		
		<script src='js/launch.js'></script>
		<script src='js/cubecontrol.js'></script>
		<script src='js/shapeshifter.js'></script>
		<script src='js/project.js'></script>
		<script src='js/me.js'></script>

		<?php

		// include('../join/delicious.php');

		// $cubes = mysql_query("select object_id, category, coord_y, coord_z from objects");
		// $shapeshift = mysql_query("select object_key, img from shapeshifters_sprite");
		// $ids = mysql_query("select mebg_id from mebg");
		// $txt = mysql_query("select txt from metxt");

		// $first = array();

		// $first['nav'] = array();
		// $first['nav']['cubes'] = array();
		// $first['nav']['shapeshifter'] = array();

		// $first['me'] = array();
		// $first['me']['txt'] = array();
		// // $first['me']['img'] = array();

		// while ($onecube = mysql_fetch_assoc($cubes)){
		// 	$coords = array("y" => $onecube['coord_y'], "z" => $onecube['coord_z']);
		//     $first['nav']['cubes'][$onecube['category']][$onecube['object_id']] = $coords;
		// }

		// while ($oneshapeshift = mysql_fetch_assoc($shapeshift)){
		//     $first['nav']['shapeshifter'][$oneshapeshift['object_key']] = $oneshapeshift['img'];
		// }

		// $me_ids = array();

		// while ($theids = mysql_fetch_array($ids)){
		// 	array_push($me_ids, $theids['mebg_id']);
		// }

		// $first['me']['img'] = $me_ids[rand(0, count($me_ids)-1)];

		// while ($metext = mysql_fetch_assoc($txt)){
		// 	$first['me']['txt'][] = $metext['txt'];
		// }

		// echo "<script>
		// 	var descend = ".json_encode($first)."
		// 	shapeshifterload(descend.nav.shapeshifter);
		// 	cubegenerator(descend.nav.cubes)
		// 	iammike(descend.me.txt, descend.me.img)
		// </script>";

		?>

	</body>
</html>
