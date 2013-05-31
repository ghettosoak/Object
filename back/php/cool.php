<?php

// if (!is_dir('cool')) {
// 	    mkdir('cool');         
// 	}
	include('../../join/delicious.php');

	function my_array_diff($a, $b) {
	    $map = $out = array();
	    foreach($a as $val) $map[$val] = 1;
	    foreach($b as $val) if(isset($map[$val])) $map[$val] = 0;
	    foreach($map as $val => $ok) if($ok) $out[] = $val;
	    return $out;
	}

	$a = array('A', 'B', 'C', 'D');
	$b = array('A', 'B', 'C', 'D', 'E');

	print_r(my_array_diff($a, $b));

?>