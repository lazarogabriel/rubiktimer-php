<?php 
    session_start();

    require_once('../db.php');

    $db = new Dbjson('../users.json');

    if(isset($_SESSION['username'])){
        
        $times = $db->getTimes($_SESSION['username']);

        echo json_encode($times);
    }

    exit;
