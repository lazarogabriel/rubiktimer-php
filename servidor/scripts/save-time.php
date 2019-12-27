<?php
    session_start();

    require_once('../db.php');

    $db = new Dbjson('../users.json');

    if($_POST && isset($_SESSION['username'])){
        $time = [floatval($_POST['time']), $_POST['date']];
        $db->saveTime($_SESSION['username'], $time, '../');
        
    }
    
