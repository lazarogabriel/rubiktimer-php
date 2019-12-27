<?php 

    require_once('../db.php');
    require_once('../validator.php');
    require_once('../user.php');
    
    $db = new Dbjson('../users.json');
    $validator = new Validator();

    $errors = [];

    if($_POST){
        $errors = $validator->validateRegister($_POST, $db);
        if(count($errors) === 0){
            $user = new User($_POST['username'], $_POST['password']);
    
            $db->registerUser($user, "../");

            session_start();
            $_SESSION['username'] = $user->getName();
            $_SESSION['times'] = $user->getTimes();
        }
    
        echo json_encode($errors);
    }

    

    