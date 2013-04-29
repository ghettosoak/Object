
		<?php
		// include('configdb.php');

		$uploadDir = 'upload/';

		if(isset($_POST['submit'])) {

		    $image = array();

		    foreach($_FILES['image']['name'] as $index => $name) {

		        if($_FILES['image']['error'][$index] == 4) {
		            continue;
		        }

		        if($_FILES['image']['error'][$index] == 0) {

		            $fileName = $_FILES['image']['name'][$index];
		            $tmpName  = $_FILES['image']['tmp_name'][$index];
		            $fileSize = $_FILES['image']['size'][$index];
		            $fileType = $_FILES['image']['type'][$index];

		            if(($fileType == "image/gif"   ||
		                $fileType == "image/jpeg"  ||
		                $fileType == "image/pjpeg" ||
		                $fileType == "image/png"   ||
		                $fileType == "image/x-png") && 
		                $fileSize < 500000) {

		                $imagePath = $uploadDir . $fileName;

		                $result = @move_uploaded_file($tmpName, $imagePath);
		                if (!$result) {
		                    echo "Error uploading";
		                    exit;
		                }
		                $image[] = $imagePath;
		            }
		        }
		    }
		    // Save images to database
		    $nbImage = count($image);
		    // if($nbImage) {

		    //     $sql = "INSERT INTO picture (image1, image2, image3) VALUES (";
		    //     for($i=0; $i<$nbImage; $i++) {
		    //         if($i) $sql .= ",";
		    //         $sql .= "\"".$image[$i]."\"";
		    //     }
		    //     $sql .= ")";

		    //     @mysql_query($sql);
		    // }
		}

		?>