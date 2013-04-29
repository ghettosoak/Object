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
    <link rel="stylesheet" type="text/css" href="../type/type.css"/>
    <link rel="stylesheet" type="text/css" href="../css/master.css" />

    <!--<script type="text/javascript" src="js/lib/jquery.js"></script>-->
</head>

<body>
	<div class="master">
		<form action="upload.php" method="post" enctype="multipart/form-data">
		  <p>Image1 :<input name="image[]" type="file" /></p>
		  <p>Image2 :<input name="image[]" type="file" /></p>
		  <p>Image3 :<input name="image[]" type="file" /></p>
		  <input type="submit" name="submit" value="Submit" />
		</form>

		<?php
		// include('configdb.php');

		

		?>
	</div>
<script type="text/javascript" src="../js/master-m.js"></script>
</body>
</html>