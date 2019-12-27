<?php
    require_once('../db.php');
    $db = new Dbjson('../users.json');

    $names = $db->getNames();

    if($names){
        echo json_encode($names);
    }else{
        echo json_encode("error");
    }
    
?>