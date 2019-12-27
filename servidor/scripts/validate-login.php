<?php 

    require_once('../db.php');
    require_once('../validator.php');
    
    $db = new Dbjson('../users.json');
    $validator = new Validator();

    $errors = [];

    if($_POST){
        $errors = $validator->validateLogin($_POST, $db);
        if(count($errors) === 0){
            
            $user = $db->getUserByName($_POST['username']);

            session_start();
            $_SESSION['username'] = $user->name;
            $_SESSION['times'] = $user->times;
        }
        echo json_encode($errors);
    }