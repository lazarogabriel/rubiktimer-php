<?php 
    session_start();

    if(isset($_SESSION['times'])){
        echo json_encode($_SESSION['times']);
        exit;
    }
