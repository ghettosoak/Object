<?php

include('../join/delicious.php');

$cubes = mysql_query("select object_id, category, coord_y, coord_z from objects");
$shapeshift = mysql_query("select object_key, img, madewith from shapeshifters_sprite");
$ids = mysql_query("select mebg_id from mebg");
$txt = mysql_query("select txt from metxt");

$first = array();

$first['nav'] = array();
$first['nav']['cubes'] = array();
$first['nav']['shapeshifter'] = array();

$first['me'] = array();
$first['me']['txt'] = array();

while ($onecube = mysql_fetch_assoc($cubes)){
	$coords = array("y" => $onecube['coord_y'], "z" => $onecube['coord_z']);
    $first['nav']['cubes'][$onecube['category']][$onecube['object_id']] = $coords;
}

while ($oneshapeshift = mysql_fetch_assoc($shapeshift)){
    $first['nav']['shapeshifter'][$oneshapeshift['object_key']] = array('img' => $oneshapeshift['img'], 'count' => count(explode(', ', $oneshapeshift['madewith'])));
}

$me_ids = array();

while ($theids = mysql_fetch_array($ids)){
	array_push($me_ids, $theids['mebg_id']);
}

$mike = $me_ids[rand(0, count($me_ids)-1)];

$me_x = 2;
$me_y = 1;

?>

<!doctype html>
<html lang="en">
	<head>
		<title>ob.ject</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		
		<link rel="stylesheet" type="text/css" href="css/master.css" />

		<!-- WHOA WHOA WHOA -->
		<!-- <link rel="stylesheet" type="text/css" href="css/mobile.css" /> -->

		<script>

			if (window.innerWidth <= 568){
				// if (window.location.hash.search(/^#!?redirect/) != 0){
				// 	var start = document.createElement('link');			
				// 	start.setAttribute('rel', 'stylesheet');
				// 	start.type = 'text/css';
				// 	start.href = 'css/mobile.css';
				// 	document.head.appendChild(start);
				// }
			}
		</script>
	</head>
	<body>
		<div id="master">
			<div id="edit"></div>
			<div id="movement" class="second">
				<div class="me">
					<div class="me_img">
						<?php
							echo '<div id="me_clean"><img src="../join/img/me/clean/'.$mike.'.jpg" /></div>';
							echo '<div id="me_blur"><img src="../join/img/me/blur/'.$mike.'.jpg" /></div>';
						?>						
					</div>

					<div class="meme me_x1 me_y1"> 
						<div id="megrey"></div>
						<p>my name is <br /><span>mike</span></p>
					</div>

					<?php
						while ($metext = mysql_fetch_assoc($txt)){
							echo '<div class="me_x'.$me_x++.' me_y'.$me_y.' me_bit">
									<div class="me_float">
										<div class="me_txt">
											<p>'.$metext['txt'].'</p>
										</div>
									</div>
								</div>';
							if ($me_x > 4){
								$me_x = 1;
								$me_y++;
							}
						}
					?>
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

				           	<?php
					           	// while ($oneshapeshift = mysql_fetch_assoc($shapeshift)){
					           	//     // $oneshapeshift['object_key']
					           	//     // $oneshapeshift['img']
					           	//     // $oneshapeshift['madewith']
					           	//     echo '<image height=​499% width=​107% href=​'.$oneshapeshift['img'].' x=​0 y=​0 clip-path=​url(#hex-mask)​ preserveAspectRatio=​xMidYMin id=​ssi_'.$oneshapeshift['object_key'].' class=​ssi data-count='.count(explode(', ',$oneshapeshift['madewith'])).'>​</image>​';
					           	//     // echo "<image height=​\"499%\" width=​\"107%\" href=​\"../​join/​img/​shapeshift/​sprite_23.png\" x=​\"0\" y=​\"0\" clip-path=​\"url(#hex-mask)​\" preserveAspectRatio=​\"xMidYMin slice\" id=​\"ssi_23\" class=​\"ssi\">​</image>​";
					           	// }
				           	?>

				           	<!-- <image height=​"499%" width=​"107%" href=​"../​join/​img/​shapeshift/​sprite_23.png" x=​"0" y=​"0" clip-path=​"url(#hex-mask)​" preserveAspectRatio=​"xMidYMin slice" id=​"ssi_23" class=​"ssi">​</image>​ -->

				           <!-- <image id="ssi01" class="ssi" clip-path="url(#hex-mask)" height="499%" width="107%" x="-3.5%" y="0" xlink:href="img/p/sh/1.jpg" preserveAspectRatio="xMidYMin slice" /> -->
						</svg>
					</div>
				</div>
				<div class="red">
					
					<div class="left">
						<p class="title">OB.JECT</p>
						<p class="who">?</p>
						<p class="copyright">&copy;&nbsp;&nbsp;2014 MTOBF</p>
						<input tabindex="1" type="password" id="trial" />
					</div>
					<div class="middle">
						<div id="loadr">
							<div id="l1"></div>
						</div>
					</div>
					<div class="right">
						<p id="instruct">
							click to expand<br />
							drag to navigate
						</p>
						<img src="img/back_left.png" id="point" />
						<div class="crumb">
							<div id="crumbput"></div>
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
		<script src="js/lib/three.min.54.js"></script>
		<script src="js/lib/CSS3DRenderer.js"></script>
		<script src="js/lib/tween.min.js"></script>
		<script src="js/lib/jquery.isotope.min.js"></script>
		<script src="js/lib/jquery.animate-colors-min.js"></script>
		<script src="js/lib/sha512.js"></script>

		<script src="js/lib/quo.js"></script>
		<script src="js/lib/jquery.pep.min.js"></script>
		
		<script src='js/launch.js'></script>
		<script src='js/cubecontrol.js'></script>
		<script src='js/shapeshifter.js'></script>
		<script src='js/loadr.js'></script>
		<script src='js/project.js'></script>
		<script src='js/me.js'></script>
		<script src='js/link.js'></script>

		<?php		

		echo "<script>
			var cubedescend = " . json_encode($first) . "
			cubeinit(cubedescend.nav.cubes);
			shapeshifterload(cubedescend.nav.shapeshifter);
			animate();
		</script>";

		?>

		

	</body>
</html>
