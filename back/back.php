<!doctype html>
<!--[if lt IE 7]>  <html class="ie ie8 ie7 ie6" lang="en"> <![endif]-->
<!--[if IE 7]>     <html class="ie ie8 ie7" lang="en"> <![endif]-->
<!--[if IE 8]>     <html class="ie ie8" lang="en"> <![endif]-->
<!--[if IE]>       <html class="ie" lang="en"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1" />
    <!-- <link rel="stylesheet" type="text/css" href="type/type.css"/> -->
    <link rel="stylesheet" type="text/css" href="css/master.css" />

    <!--<script type="text/javascript" src="js/lib/jquery.js"></script>-->
</head>

<body>
	<div class="old_master">
		<div id="be_move">
			<div class="projects">
				<div id="oversight">
					<div id="add_project">
						<img src="img/plus_large.png" id="add_project_plus"/>
						<img src="img/minus_large.png"/>
					</div>
					<div id="add_row">
						<img src="img/addrow.png" /><p>add row</p>
						<div id="row_list">
							<li class="rowselectable" data-after="first"></li>
						</div>
					</div>
					<div id="oversight_sight"></div>
				</div>
				<div class="divide"><div></div></div>
				<div class="details">
					<div class="info">
						<h3>Info</h3>
						<div><p>Name:</p> <input tabindex="1" type="text" id="info_name"><br /></div>
						<div><p>Client:</p> <input tabindex="1" type="text" id="info_client"><br /></div>
						<div><p>Category:</p> 
							<!-- <input tabindex="1" type="text" id="info_category"> -->
							<div id="info_category">
								<div id="info_category_open"></div>
								<div id="info_category_carousel"></div>
							</div>
							<br />
						</div>
						<div><p>Date Launched:</p> <input tabindex="1" type="text" id="info_datelaunch"><br /></div>
						<div><p>Total Hours:</p> <input tabindex="1" type="text" id="info_hours"><br /></div>
						<div><p>Link:</p> <input tabindex="1" type="text" id="info_link"><br /></div>
						<div><p>Text</p><textarea tabindex="16" id="info_text"></textarea></div>
					</div>
					<div class="coords">
						<h3>Coordinates</h3>
						<div id="coord_y_hold">
							<p>Y:</p>
							<input tabindex="1" type="text" class="coord_inp" id="coord_y">
							<img src="img/down.png" class="coord_button cb_down" id="coord_y_down" />
							<img src="img/up.png" class="coord_button cb_up" id="coord_y_up" />
							<br />
						</div>
						<div id="coord_z_hold">
							<p>Z:</p>
							<input tabindex="1" type="text" class="coord_inp" id="coord_z">
							<img src="img/down.png" class="coord_button cb_down" id="coord_z_down" />
							<img src="img/up.png" class="coord_button cb_up" id="coord_z_up" />
							<br />
						</div>
					</div>
					<div class="shapeshifter_collect">
						<h3>Shapeshifter <span>(<= 10)</span></h3>
						<div id="shapeshifterhopper"></div>
					</div>
				</div>
				<div class="divide"><div></div></div>
				<div class="cells">
					<div class="cell_top">
						<div id="cell_add"><img src="img/plus_small.png" /></div>
						<h3>Cells</h3>
					</div>
					<div id="cell_put"></div>
				</div>
			</div>

			<div class="about">
				<div id="meimgs"></div>
				<div id="mebits"></div>
			</div>
		</div>

		<div class="side">
			<div id="save"><p>Save</p></div>
			<div class="switcher">
				<div id="switch_01"><p>Projects</p></div>
				<div id="switch_02"><p>About</p></div>
				<div id="switch_03"><div><p>Site</p></div></div>
			</div>
		</div>
	</div>


<script src="js/lib/three.min.54.js"></script>
<script src="js/lib/CSS3DRenderer.js"></script>
<script src="js/lib/tween.min.js"></script>
<script src="js/lib/underscore-min.js"></script>

<script src="js/lib/jquery.js"></script>
<script src="js/lib/jquery.tmpl.min.js"></script>
<script src="js/lib/jquery.filedrop.js"></script>

<script src='../join/descend.js'></script>

<script type="text/javascript" src="js/projects-m.js"></script>
<script type="text/javascript" src="js/about-m.js"></script>

</body>
</html>