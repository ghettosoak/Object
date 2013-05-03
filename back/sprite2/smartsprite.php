<?PHP
require_once("tsmartsprite.php");
// 4 cli version

//if (isset($argv) && isset($argv[1])) {
//	$attr = explode('=' ,$argv[1] );
	$css_filename = ( $argv[1] );

	 if (empty($argv[1]))
	 	 echo "Usage...\n";
	 else {
	 	$ss =& new tsmartsprite($css_filename);
	 }

//}
?>