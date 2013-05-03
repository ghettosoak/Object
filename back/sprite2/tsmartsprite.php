<?PHP
/**
 * class tsmartsprite
 *
 * @author Alexander Kaupp <tanila@tanila.de>
 * @version 0.3.3
 * @package tdev_smartsprite
 *
 * Licence: GPL (hope it is uesful, keep me informed if you make any changes)
 *
 *
 *@todo 	dockblocks, finish, verbosity set by args
 *
 *@filesource
 */

error_reporting(E_ALL);
//class_exists('tcssparser') || require_once('tcssparser.php');

class tsmartsprite {
	var $cssParser = 0;
	var $version = '0.3.2';
	var $verbose = false;
	// css-file to parse
	var $_filename = '';
	// the content of the original file
	var $_fileCntOrig = '';
	// the content of the parsed file
	var $_fileCntParsed = '';
	// Folder to store temporary files (write access 4 the webserver)
	var $_tmpFolder = '';
	// regExes 4 parsing
	var $regExSpriteName	= '/sprite:\s*(.*);/i';
//	var $regExSpriteUrl 		= '/sprite-image:\s*url\([\'|\"](.*)[\'|\"]\);/i';
	var $regExSpriteUrl 		= '/sprite-image:\s*url\((.*)\);/i';
	var $regExSpriteLayout	= '/sprite-layout:\s*(.*);/i';
	var $refExSpriteMargin	= '/sprite-margin:\s*(.*);/i';
		// containing an array with string global sprite definitions
	var $_spriteDefs = array();
	var $sprites = array();
	// the file prefix for the generated css file
	var $_fileprefix = '-sprite.css';
	var $_filestrippedprefix = '-sprite-min.css';

	// path where tmp files will be stored in...
	var $_tmpPath = '';
	// the working dir = tmpdir + hostname
	var $currentDir = '';
	var $image_types = array(
		IMAGETYPE_GIF=>'gif',				//1=GIF
		IMAGETYPE_JPEG=>'jpg',			//2=JPG
		IMAGETYPE_PNG=>'png',			//3=PNG
		IMAGETYPE_SWF=>'swf',			//4=SWF
		IMAGETYPE_PSD=>'psd',			//5=PSD
		IMAGETYPE_BMP=>'bmp',		//6=BMP
		IMAGETYPE_TIFF_II=>'tiff',			//7=TIFF(intelbyteorder)
		IMAGETYPE_TIFF_MM=>'tiff',		//8=TIFF(motorolabyteorder)
		IMAGETYPE_JPC=>'jpc',				//9=JPC
		IMAGETYPE_JP2=>'jp2',				//10=JP2
		IMAGETYPE_JPX=>'jpf',				//11=JPXYes!jpfextensioniscorrectforJPXimagetype
		IMAGETYPE_JB2=>'jb2',				//12=JB2
		IMAGETYPE_SWC=>'swc',			//13=SWC
		IMAGETYPE_IFF=>'aiff',				//14=IFF
		IMAGETYPE_WBMP=>'wbmp',	//15=WBMP
		IMAGETYPE_XBM=>'xbm'			//16=XBM
		);

	function tsmartsprite($_filename='') {

// This is availabe in the next version
//$this->cssParser =& new tcssparser($_filename);
//$this->cssParser->getCssContentNonIE();

		if ($this->verbose)
		echo "\nsmartsprite Version: $this->version\nAuthor: Alexander Kaupp 2008\nFor more information visit: www.tanila.de\n\n";

		$this->chkGDVersion();
		$this->setFilename($_filename);

		$this->collectImageInfos();
		$this->sortImagesByHeight();
		$this->createSpriteImages();
		$this->replaceBGIMGStrings();
		if ($this->verbose)
		echo "\nsmartsprite creation successful\n\nHave a nice day :)\n\n";



	} // tsmartsprite

function setFilename($_filename,$tmppath=''){

	if (empty($_filename) ) die ("Error: No css-file specified!\n\n");
	if (!file_exists($_filename)) die("Error: File: $_filename not found!\n\n");
	$this->_filename = $_filename;
//	$this->_outfile = rtrim($_filename,'.css').$this->_fileprefix;
	$this->_outfile = basename($_filename,".css").$this->_fileprefix;
	$this->_outfilestripped = rtrim($this->_filename,'.css').$this->_filestrippedprefix;
	$this->readFileContent();
} // setFilename

function chkGDVersion(){
	$gdInfo = @gd_info();
	if ($gdInfo) {
		$gdVersion = $gdInfo['GD Version'];
		if ($this->verbose)
		echo "Using: GD_lib $gdVersion \n\n";
	} else die ( "ERROR: no GD Library found.\n" );
}

function getFilename(){
	return $this->_filename;
}

function readFileContent(){
	$_fn = $this->getFilename();
	if (is_readable($_fn)) {
		if($this->verbose) echo "Reading File: $_fn ... \n";
	} else die("ERROR: Can not read File $_fn please check file permissions!");

	// setting original file contetnt
	$this->_fileCntOrig = file_get_contents  ( $_fn );
	// copy original file parsed file content
	$this->_fileCntParsed = $this->_fileCntOrig;

	if ( empty($this->_fileCntOrig) ) die("The css-file: .$_fn has no content! \n\n");
	$this->parseSpriteDefs();
}

// finds the sprite definition:
// Example:
// /** sprite: mysprite;
// 	 sprite-image: url('../img/sprite.gif');
//	 sprite-margin: 20;
//	 sprite-layout: horizontal */
function parseSpriteDefs(){
	if ($this->verbose)
	echo "\nParsing file: $this->_filename \n\n";
	$this->_spriteDefs = array();
	$_matches = '';
	$_starttag = '\/\*\*\s+';
	$_endtag = '\*\/';
	$_spritetag = '\s+.*;?\s+.*\s+';
	$_regExSpriteDef = '/'.$_starttag.'sprite\s*:.*;'.$_spritetag.$_spritetag.$_endtag.'/i';

	$_cnt = $this->_fileCntOrig;
	preg_match_all($_regExSpriteDef,$_cnt,$_matches);

	$_i=0;
	$_matches = $_matches[0];
	foreach($_matches as $match){
		$this->_spriteDefs[$_i]= $match;
		if ($this->verbose)
		echo "Sprite definition found:\n\n$match \n";
		// remove matches in parsed file
		$this->_fileCntParsed = preg_replace($_regExSpriteDef,'',$this->_fileCntParsed);
		$_i++;
	}
	if (!$this->_spriteDefs) die("ERROR: No sprite Definition found in $this->_filename or syntax error! \n Nothing to do for me!\n\n");
	$this->parseSpriteProperties();
}

function parseSpriteProperties(){
	if ($this->verbose)
	echo "\nParsing Sprite Image References:\n";
	foreach($this->_spriteDefs as $spritedef) {
		$_spritename = $this->parseString($this->regExSpriteName ,$spritedef);
		if (!empty($_spritename))
			$url= trim($this->parseString($this->regExSpriteUrl ,$spritedef),'\'\""');
			$this->sprites[$_spritename]['url']		= $url;
			$this->sprites[$_spritename]['filename'] = $this->sprites[$_spritename]['url'];//basename($this->sprites[$_spritename]['url']);
			$this->sprites[$_spritename]['imagetype'] = $this->getFileExtToImgType($this->sprites[$_spritename]['filename']);
			$this->sprites[$_spritename]['layout']	= $this->parseString($this->regExSpriteLayout ,$spritedef);
			$this->sprites[$_spritename]['margin'] = $this->parseString($this->refExSpriteMargin ,$spritedef);
			$this->sprites[$_spritename]['width'] = 0;
			$this->sprites[$_spritename]['height'] = 0;
			$M = intval( $this->sprites[$_spritename]['margin'] );
			$this->sprites[$_spritename]['margin'] = $M;
			$URL = $this->sprites[$_spritename]['url'];
			$FN = $this->sprites[$_spritename]['filename'];
			$LO = $this->sprites[$_spritename]['layout'];
			if ($this->verbose)
			echo "\nSprite Informations found for: $_spritename: \nUrl:\t\t$URL\nFilename:\t$FN\nLayout:\t\t$LO\nMargin:\t\t$M\n";
			$this->sprites[$_spritename]['images'] = $this->collectSpriteImgRefs($_spritename,$this->_fileCntOrig);
	}
}

function parseString($_regExe,$_str) {
	$_matches = '';
	preg_match($_regExe,$_str,$_matches);
	return (isset($_matches[1])) ? $_matches[1] : '';
}

function collectSpriteImgRefs($_ssRefName,$_str){
	if ($this->verbose)
	echo "\nParsing Image references for: $_ssRefName: \n\n";
	$_result = array();
	$_matches = '';
	$_starttag = '\/\*\*\s+';
	$_endtag = '\s*\*\/';

	$_regEx = '/background[-image]*:\s*url\((.*)\)(\s*.*);\s*'.$_starttag.'sprite-ref:\s*'.$_ssRefName.'; '.$_endtag.'/i';
	preg_match_all($_regEx,$_str,$_matches);
	$_replace_strs = $_matches[0];
	$_file_locs = $_matches[1];
	$_suffixes =$_matches[2];
	$i=0;
	foreach ($_file_locs as $_file_loc => $value) {
		$value = trim($value,'\'\""');
		$_imagename = $value;
		$_result[$_imagename]['file_location'] = $value;
		if ($this->verbose)
		echo "Image definition found: $value \n";

		$_result[$_imagename]['replace_string'] = $_replace_strs[$i];
		$_result[$_imagename]['urlsuffix'] = $_suffixes[$i];
		$_result[$_imagename]['repeat'] = $this->getBGImgRepeat( $_suffixes[$i] );
		$_result[$_imagename]['align'] = $this->getBGImgAlign( $_suffixes[$i] );
		$i++;
	}
	if ($this->verbose)
	echo "\n";
	return $_result;
}

function getBGImgRepeat($str){
	$_result = 'no-repeat';
	$str = str_replace(';','',$str);
	$str = strtolower($str);
	$arr= explode(' ',$str);
	if (in_array('repeat-x',$arr)) $_result = 'repeat-x';
	if (in_array('repeat-y',$arr)) $_result = 'repeat-y';
	return $_result;
}
function getBGImgAlign($str){
	$_result = '';
	$str = str_replace(';','',$str);
	$str = strtolower($str);
	$arr= explode(' ',$str);
	if (in_array('left',$arr)) $_result = 'left';
	if (in_array('right',$arr)) $_result = 'right';
	return $_result;
}

function getAlign($str){
// Todo: top bottom;
}
function collectImageInfos(){
	foreach($this->sprites as $spritekey => $spriteval ) {
		$imgdefs = &$spriteval['images'];
		foreach( $imgdefs as $spriteimagekey => $spriteimagevalue ){
			if ($this->verbose)
			echo "Fetching Image-File Properties for file : $spriteimagekey\t";
			$fullfilename = dirname($this->_filename).'/'.$spriteimagekey;
//			die($fullfilename);
			if (file_exists($fullfilename) ) {
				list($width, $height, $type) = getimagesize($fullfilename );
				$this->sprites[$spritekey]['images'][$spriteimagekey]['width'] = $width;
				$this->sprites[$spritekey]['images'][$spriteimagekey]['height'] = $height;
				$this->sprites[$spritekey]['images'][$spriteimagekey]['type'] = $type;
				if ($this->verbose)
				echo "width:$width;\theight:\t$height;\ttype:$type;\n";
			} else  die( "\nERROR: File not Found: $fullfilename\n");
		}	// img loop
	} // sprite loop
}

function replaceBGIMGStrings() {
	if ($this->verbose)
	echo "Replacing Image References...\n";
	foreach($this->sprites as $sprite ) {
		$sprite_bgurl = 'background: url(\''.$sprite['url'].'\')';
		$_imagelocations = $sprite['images'];
		 if ($_imagelocations) {
		foreach( $_imagelocations as $_imglocation => $_imglocationvalue) {
			$top  = $_imglocationvalue['spritepos_top'];
			$left = $_imglocationvalue['spritepos_left'];

			$suffix = $_imglocationvalue['urlsuffix'].';';
			$_bgpostr = 'background-position: -'.$left.'px -'.$top.'px;';

switch ($_imglocationvalue['align']) {
	case 'left': $_imglocationvalue['spritepos_left']=0;
		break;
	case 'right':$_bgpostr='background-position: right -'.$top.'px;';
		break;
}

			$_repl = $sprite_bgurl.$suffix.$_bgpostr;
			$this->_fileCntParsed = str_replace($_imglocationvalue['replace_string'],$_repl,$this->_fileCntParsed);
		} // image loop
		} // if images
	} // Sprite-Loop
		if ($this->verbose)
		echo "Writing smartsprite css file...\n";
		$filename =$this->_outfile;
		$filename = dirname($this->_filename).'/'.$filename;

		$handle = @fopen($filename, "w");
		if (!$handle) die("ERROR: Can not write to: $filename");
		fwrite ($handle, $this->_fileCntParsed);
		fclose($handle);
}

function sortImagesByHeight() {
	if ($this->verbose)
	echo "\nSorting Images... \n";
	foreach ($this->sprites as $spritekey => $spritevalue) {
		$_sum_width  = 0;
		$_sum_height = 0;
		$_max_width = 0;
		$_max_height = 0;
		$_widthtarr = array();
		$_heighttarr = array();
		$_layout = $spritevalue['layout'];
		$_imagelocations = $spritevalue['images'];
		$_margin = $this->sprites[$spritekey]['margin'];
		if ($_imagelocations) {
			foreach ($_imagelocations as $image => $imagevalue) {
				$_widthtarr[$image] = $imagevalue['width'];
				$_heighttarr[$image] = $imagevalue['height'];
				$_sum_width  += $imagevalue['width']+$_margin ;
				$_sum_height += $imagevalue['height']+$_margin ;
			}	// sprite images loop
				$_sum_width  += $_margin;
				$_sum_height +=$_margin;
				$_max_width = max($_widthtarr);
				$_max_height = max($_heighttarr);
				$_min_width = min($_widthtarr);
				$_min_height = min($_heighttarr);
				switch ($_layout) {
					case 'horizontal':
						array_multisort($_heighttarr, SORT_NUMERIC,SORT_DESC, $this->sprites[$spritekey]['images']);
						$this->sprites[$spritekey]['height'] = $_max_height;
						$this->sprites[$spritekey]['width']  = $_sum_width;
						break;
					case 'vertical':
						array_multisort($_widthtarr, SORT_NUMERIC,SORT_DESC, $this->sprites[$spritekey]['images']);
						$this->sprites[$spritekey]['height'] = $_sum_height;
						$this->sprites[$spritekey]['width']  = $_max_width;
						break;
				}
		if ($this->verbose)
		echo "Calculating Sprite positions...\n";
		$_sum_width  = $_margin;
		$_sum_height = $_margin;
		switch ($_layout) {
			case 'horizontal':
				$_sum_height = 0;
				break;
			case 'vertical':
				$_sum_width = 0;
				break;
		}
		foreach ($this->sprites[$spritekey]['images'] as $imagekey => $imagevalue) {

switch ($this->sprites[$spritekey]['images'][$imagekey]['align']) {
	case 'left': $this->sprites[$spritekey]['images'][$imagekey]['spritepos_left']=0;
		break;
	case 'right': $this->sprites[$spritekey]['images'][$imagekey]['spritepos_left']=$_max_width-$this->sprites[$spritekey]['images'][$imagekey]['width'];//$w-3; //-$imgleft = $imagevalue['width'];
		break;
}

			switch ($_layout) {
				case 'horizontal':
					$this->sprites[$spritekey]['images'][$imagekey]['spritepos_top'] = $_sum_height;
					$this->sprites[$spritekey]['images'][$imagekey]['spritepos_left'] = $_sum_width;
					$_sum_width += $this->sprites[$spritekey]['images'][$imagekey]['width']+$_margin;
					break;
				case 'vertical':
					$this->sprites[$spritekey]['images'][$imagekey]['spritepos_top'] = $_sum_height;
					$this->sprites[$spritekey]['images'][$imagekey]['spritepos_left'] = $_sum_width;
					//$_sum_height += $_imagelocations[$imagekey]['height']+$_margin;
					$_sum_height += $this->sprites[$spritekey]['images'][$imagekey]['height']+$_margin;
					break;
				}
			}	// sprite images loop
		}	// if no images
	}	// Sprite loop
//	$this->replaceBGIMGStrings();
}

function createSpriteImages() {
	if ($this->verbose)
	echo "Creating smartsprite file...\n";
	foreach ($this->sprites as $spritekey => $spritevalue) {
		$_imagelocations = &$this->sprites[$spritekey]['images'];
		$filename = $this->sprites[$spritekey]['filename'];
		if ($_imagelocations) {
			$w = $this->sprites[$spritekey]['width'];
			$h = $this->sprites[$spritekey]['height'];

$fileEXT = substr($this->sprites[$spritekey]['filename'], -3);

if ( $fileEXT == 'png')  $image = imagecreatetruecolor($w,$h);
if ( $fileEXT == 'gif')  $image = imagecreatetruecolor($w,$h);
if ( $fileEXT == 'jpg')  $image = imagecreatetruecolor($w,$h);

// $image = imagecreate($w,$h);

// todo:
// wenn png
//			$image = imagecreatetruecolor($w,$h);//imagecreate($w,$h);
// wenn giff
//			$image = imagecreate($w,$h);//imagecreate($w,$h);


if ($fileEXT !='jpg') {
				imagealphablending($image,false);
			imagesavealpha($image,true);
  $transparent = imagecolorallocatealpha($image, 255, 255, 255, 127);
	$transparent = imagecolorallocatealpha($image,255, 255, 255, 127);
	imagecolortransparent($image,$transparent);

	imagefilledrectangle($image, 0, 0, $w, $h, $transparent);
} else {
	$transparent = imagecolorallocate($image,255, 255, 255);	// white
	imagefilledrectangle($image, 0, 0, $w, $h, $transparent);
}

			foreach ($_imagelocations as $_image => $imagevalue) {
				$subimg = $this->loadImageFromFile($imagevalue);

switch ($imagevalue['align']) {
	case 'left': $imagevalue['spritepos_left']=0;
		break;
	case 'right': $imagevalue['spritepos_left']=$w-$imagevalue['width'];//$w-3; //-$imgleft = $imagevalue['width'];
		break;
}

// stretching to full width:
	switch ($imagevalue['repeat']) {
		case 'repeat-x':
			imagecopyresampled($image,$subimg,$imagevalue['spritepos_left'],$imagevalue['spritepos_top'],0,0,$w,$imagevalue['height'],$imagevalue['width'],$imagevalue['height']);
			break;
		case 'repeat-y':
			imagecopyresampled($image,$subimg,$imagevalue['spritepos_left'],$imagevalue['spritepos_top'],0,0,$imagevalue['width'],$h,$imagevalue['width'],$imagevalue['height']);
			break;
		default:
			imagecopy($image,$subimg,$imagevalue['spritepos_left'],$imagevalue['spritepos_top'],0,0,$imagevalue['width'],$imagevalue['height']);
	}

			}	// image loop
			$this->safeImageToFile($image,$this->sprites[$spritekey]['imagetype'],$filename);
		}	// if images existant
	}	// Sprite loop
}

function getFileExtToImgType($_fileName) {
	$_fileName = strtolower($_fileName);
	$_fileExt = end(explode('.', $_fileName));
	$i=1;
	foreach ( $this->image_types as $imagetype) {
		if ($imagetype == $_fileExt) return $i;
		$i++;
	}
}

function loadImageFromFile($imageInfo) {
	$_result = 0;
	$filelocation = $imageInfo['file_location'];
	$filelocation = dirname($this->_filename).'/'.$filelocation;

	switch ($imageInfo['type']) {
		case 1 : $_result = @imagecreatefromgif($filelocation);
			break;
		case 2 : $_result = @imagecreatefromjpeg($filelocation);
			break;
		case 3 : $_result = @imagecreatefrompng($filelocation);
			break;
		case 4 : $_result = @imagecreatefromswf($filelocation);
			break;
		case 6 : $_result = @imagecreatefromwbmp($filelocation);
			break;
		case 15 : $_result = @imagecreatefromxbm($filelocation);
			break;
	}
	if (! $_result) die("ERROR: Can not open file: $filelocation\n");
	return $_result;
}

function safeImageToFile($imgres,$imgtype,$filename) {
	$filename = dirname($this->_filename).'/'.$filename;
	if ($this->verbose)
	echo "Writing smartsprite file: $filename ...\n";
	$_result = 0;
	switch ($imgtype) {
		case 1 : $_result = @imagegif($imgres,$filename);
			break;
		case 2 : $_result = @imagejpeg($imgres,$filename);
			break;
		case 3 : $_result = @imagepng($imgres,$filename);
			break;
		default: $_result = @imagegif($imgres,$filename);
	}
	ImageDestroy($imgres);
	if (!$_result) die("ERROR: Can not write smartsprite file to: $filename\n");

	//echo "Writing smartsprite Base64Encoded image file: $filename...\n";
	//$this->writeBase64EncodedFile($filename);

}

function writeBase64EncodedFile($file, $mime='image/png') {
  $contents = file_get_contents($file);
  $base64   = base64_encode($contents);

  		$filename =$file.'.bas64';
		$handle = @fopen($filename, "w");
		if (!$handle) die("ERROR: Can not write to: $filename");
		fwrite ($handle, $base64);
		fclose($handle);
	// background-image:url(<echo data_url('menu_background.png','image/png'));
 	//return ('data:' . $mime . ';base64,' . $base64);
}

} // class tsmartsprite

?>
