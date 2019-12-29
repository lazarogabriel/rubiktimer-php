<?php 

    session_start();

    require_once('../db.php');

    $db = new Dbjson('../users.json');

    if($_POST && isset($_SESSION['username'])){

        $db->deleteTime($_SESSION['username'], floatval($_POST['time']), '../');
    }
    

    exit;