<?php

header('Content-type:application/json');

function jsonReadable($json, $html=FALSE) { 
    $tabcount = 0; 
    $result = ''; 
    $inquote = false; 
    $ignorenext = false; 
    
    if ($html) { 
        $tab = "&nbsp;&nbsp;&nbsp;"; 
        $newline = "<br/>"; 
    } else { 
        $tab = "\t"; 
        $newline = "\n"; 
    } 
    
    for($i = 0; $i < strlen($json); $i++) { 
        $char = $json[$i]; 
        
        if ($ignorenext) { 
            $result .= $char; 
            $ignorenext = false; 
        } else { 
            switch($char) { 
                case '{': 
                    $tabcount++; 
                    $result .= $char . $newline . str_repeat($tab, $tabcount); 
                    break; 
                case '}': 
                    $tabcount--; 
                    $result = trim($result) . $newline . str_repeat($tab, $tabcount) . $char; 
                    break; 
                case ',': 
                    $result .= $char . $newline . str_repeat($tab, $tabcount); 
                    break; 
                case '"': 
                    $inquote = !$inquote; 
                    $result .= $char; 
                    break; 
                case '\\': 
                    if ($inquote) $ignorenext = true; 
                    $result .= $char; 
                    break; 
                default: 
                    $result .= $char; 
            } 
        } 
    } 
    
    return $result; 
} 

mysql_connect("localhost", "root", "root");
mysql_select_db("ob.ject");
$result = mysql_query("select object_id, category, coord_y, coord_z from objects");

$cubes = array();

while ($row = mysql_fetch_assoc($result)){
	// array_push($cubes,$row);
	//$cubes[$row['category']]['category'] = $row['category'];

	$coords = array("y" => $row['coord_y'], "z" => $row['coord_z']);

	//$cubes[$row['category']][] = $coords;
    // array_push($cubes[$row['category']], $coords );
    $cubes[$row['category']][$row['object_id']] = $coords;
}


echo jsonReadable(json_encode($cubes));




















?>