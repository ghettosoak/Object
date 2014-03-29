<?php

include('../join/delicious.php');

$catCount = mysql_query("select category, count(*) from objects group by category");
$cubes = mysql_query("select object_id, category, coord_y, coord_z from objects");
$ids = mysql_query("select mebg_id from mebg");


$first = array();

$first['nav'] = array();
$first['nav']['cubes'] = array();

$first['me'] = array();

while ($onecube = mysql_fetch_assoc($cubes)){
    $first['nav']['cubes'][$onecube['category']][$onecube['object_id']] = $coords;
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
		
		<link rel="shortcut icon" href="img/favicon.ico" />
		<link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
		
		<link rel="stylesheet" type="text/css" href="css/master.css" />
	</head>
	<body>
		<div id="master">

			<div id="top">
				<div class="cube">
				    <div class="cubefront"></div>
				    <div class="cubeback"></div>
				    <div class="cuberight"></div>
				    <div class="cubeleft"></div>
				    <div class="cubetop"></div>
				    <div class="cubebottom"></div>
				</div>
				<p>ob.ject</p>
				<span class="down"></span>
			</div>

			<div id="work">
				<?php
					while ($cat = mysql_fetch_assoc($catCount)){
						$catProj = mysql_query('select object_id, name from objects where category = "' . $cat['category'] . '"');
						echo '<div class="categoryContainer shut" data-closed="' . ( ($cat['count(*)'] * 50) + 50) . '" data-open="' . ( ($cat['count(*)'] * 50) + 300) . '">';
							echo '<div class="head"><p>' . $cat['category'] . '</p></div>';
							while ($proj = mysql_fetch_assoc($catProj)){
								echo '<div class="project">';
									echo '<div class="title" data-pointer="' . $proj['object_id'] . '"><p>' . $proj['name'] . '</p></div>';
									echo '<div class="view"><div class="long"></div></div>';
								echo '</div>';
							}
						echo '</div>';
					}
				?>
			</div>

			<div id="about">
				<div class="me_bg">
					<?php
						echo '<div id="clean" style="background-image:url(../join/img/me/clean/'.$mike.'.jpg);" /></div>';
						echo '<div id="blur" style="background-image:url(../join/img/me/blur/'.$mike.'.jpg);" /></div>';
					?>						
				</div>

				<div class="question"><span><p>?</p></span></div>
				<div class="text">
					<p>
						Mike Fischer is a designer / developer from Chicago. This is his work.
						<br /><br />
						This site is the baby brother version of its desktop counterpart. Come back on something larger to see some real fireworks.
					</p>
				</div>
			</div>

			<div id="love">
				<p>&hearts; 2014 MTOBF</p>
			</div>
		</div>		

		<script src="js/lib/jquery-1.8.3.min.js"></script>
		
		<script src='js/master.js'></script>

		<?php		

		// echo "<script>
		// 	var descend = ".json_encode($first)."
		// 	shapeshifterload(descend.nav.shapeshifter);
		// 	cubegenerator(descend.nav.cubes)
		// 	iammike(descend.me.txt, descend.me.img)
		// </script>";

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
