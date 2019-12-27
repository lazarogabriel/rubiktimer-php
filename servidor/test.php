<?php 
    var_dump(realpath('servidor') );die;

    require_once('db.php');
    require_once('user.php');

    $db = new Dbjson('../users.json');
    $validator = new Validator();

    $user = new User();
?>
