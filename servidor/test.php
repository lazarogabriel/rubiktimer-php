<?php 

    require_once('db.php');
    require_once('user.php');

    $db = new Dbjson('users.json');

    $db->deleteTime('Lazzaro', 0.86, '../');

?>
