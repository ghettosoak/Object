<?php

// header('Content-type:application/json');

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

function escapeJsonString($value) { # list from www.json.org: (\b backspace, \f formfeed)
    $escapers = array("\\", "/", "\"", "\n", "\r", "\t", "\x08", "\x0c");
    $replacements = array("\\\\", "\\/", "\\\"", "\\n", "\\r", "\\t", "\\f", "\\b");
    $result = str_replace($escapers, $replacements, $value);
    return $result;
}

function proper_array_diff($a, $b) {
    $map = $out = array();
    foreach($a as $val) $map[$val] = 1;
    foreach($b as $val) unset($map[$val]);
    return array_keys($map);
}

mysql_connect("localhost", "root", "root");
mysql_select_db("ob.ject");


?>