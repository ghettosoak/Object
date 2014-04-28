<?php

include('join/delicious.php');

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
<html id="top" lang="en">
	<head>
		<title>ob.ject</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		
		<link rel="shortcut icon" href="img/favicon.ico" />
		<link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
		
		<link rel="stylesheet" type="text/css" href="css/master.css" />
		<script>
			if (window.innerWidth <= 568){
				window.location = 'm';
			}
		</script>
	</head>
	<body>
		<div id="master">
			<img src="img/apple-touch-icon.png" id="classy"/>
			<div id="edit"></div>
			<div id="movement" class="second">
				<div class="me">
					<div class="me_img">
						<?php
							echo '<div id="me_clean" style="background-image:url(join/img/me/clean/'.$mike.'.jpg);"></div>';
							echo '<div id="me_blur" style="background-image:url(join/img/me/blur/'.$mike.'.jpg);"></div>';
						?>						
					</div>

					<div class="meme me_x1 me_y1"> 
						<div id="megrey"></div>
						<p>my name is <br /><span>mike</span></p>
					</div>

					<?php
						while ($metext = mysql_fetch_assoc($txt)){
							echo '<div class="me_x'.$me_x++.' me_y'.$me_y.' me_bit">
									<p>'.$metext['txt'].'</p>
								</div>';
							if ($me_x > 4){
								$me_x = 1;
								$me_y++;
							}
						}
					?>
					<div class="me_x3 me_y4 me_bit">
						<p>Get in touch <a href="mailto:e@ject.ch">here.</a></p>
					</div>
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
						<img src="img/back_left.png" id="point" />
					</div>
				</div>
				<div class="grid">
					<div class="stats"></div>
					<div class="floater">
						<div class="floaters floatLeft"></div>
						<div class="floaters floatRight"></div>
					</div>
				</div>
			</div>
			<div id="nope">
				<h1>NOPE</h1>
				<p>this site does not support internet explorer.</p>
				<p>at all.</p>
				<p>come back with something that doesn't make my blood boil.<br /></p>
				<p>deal with it,<br />m</p>
			</div>
		</div>

		<script src='js/master-m.js'></script>

		<?php		

		echo "<script>
		if (navigator.userAgent.toLowerCase().indexOf('msie') === -1){
			var cubedescend = " . json_encode($first) . "
			cubeinit(cubedescend.nav.cubes);
			shapeshifterload(cubedescend.nav.shapeshifter);
			animate();
		}else document.getElementById('master').className = 'old';
		</script>";

		?>

		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-31902149-2', 'ject.ch');
		  ga('send', 'pageview', {
		   'page': location.pathname + location.search  + location.hash
		  });

		</script>
		

	</body>
</html>

