<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="theme-color" content="#1F334B">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Rubik Timer</title>
    <link href="public/img/favicon.ico" rel="icon" type="image/x-icon"/>
    <link rel="stylesheet" href="public/css/bootstrap.css">
    <link rel="stylesheet" href="public/css/animate.css">
    <link rel="stylesheet" href="public/css/main.css">
</head>
<body>

    <?php if(isset($_SESSION['username'])): ?>
        <div id="welcome-message" class="text-center" style="display: none;">
            Welcome <span id="userName" class="font-weight-bold"><?= $_SESSION['username'] ?></span>
        </div>  
    <?php endif; ?>
    
    <?php if(!isset($_SESSION['username'])): ?>
        <div class="authModal align-items-center justify-content-center animated" style="display: none;">

            <div id="loginModal" class="col-xl-3 col-md-5 col-sm-6 p-3 ">
                <span id="btnCloseLogin" class="float-right">X</span>
                <h1>Login</h1>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="username">Nombre de usuario:</label>
                        <input name="username" id="username" type="text" class="form-control" autocomplete="off" placeholder="Tu nombre de usuaruio...">
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña:</label>
                        <input name="password" id="password" type="password" class="form-control" placeholder="Tu contraseña...">
                    </div>
                    <small class="pl-2">No tenes una cuenta? <span id="btnShowRegister" class="text-primary">Registrarme</span></small>
                    <input name="login" type="submit" class="mt-2 btn btn-dark btn-md btn-block" value="Login">
                </form>
                
            </div>
        </div>

        <div class="authModal align-items-center justify-content-center animated" style="display: none;">

            <div id="registerModal" class="col-xl-3 col-md-5 col-sm-6 p-3">

                <span id="btnCloseRegister" class="float-right">X</span>
                <h1>Register</h1>
                <form id="registerForm">
                    <div class="form-group">
                        <label for="register_username">Nombre de usuario:</label>
                        <input name="username" id="register_username" type="text" class="form-control" autocomplete="off" placeholder="Un nombre de usuario...">
                    </div>
                
                    <div class="form-group">
                        <label for="register_password">Contraseña:</label>
                        <input name="password" id="register_password" type="password" class="form-control" placeholder="Una contraseña...">
                    </div>
                
                    <div class="form-group">
                        <label for="confirm_password">Confirmar contraseña:</label>
                        <input name="confirm_password" id="confirm_password" type="password" class="form-control" placeholder="Confirma la contraseña...">
                    </div>
                    <input name="register" type="submit" class="mt-2 btn btn-dark btn-md btn-block" value="Register">
                    
                </form>
                
            </div>
        </div>
        <?php endif; ?>


    <div id="main" class="container-fluid h-100  flex-column align-items-center text-light">

        <div class="text-center mt-5">
            <?php if(isset($_SESSION['username'])): ?> 
                <a  href="servidor/scripts/session-destroy.php" class="text-warning">Logout</a>
            <?php else: ?>
                <a href="#" id="btnShowLogIn" class="text-warning">Login</a>
            <?php endif; ?>

            <h1 class="text-center pb-5">Rubik Timer</h1>
            <h2 id="time" class="text-muted">0.00</h2>
        </div>

        <div id="finger-container">
            <div class="circle"></div>
            <div class="circle2"></div>
            <div class="finger">
                <img id="huellaPulgar" src="public/img/fingerprint-solid.svg">
            </div>
        </div>

    </div>

    <div id="slide" class="d-flex flex-column text-dark">
        <div id="openStats" class="align-self-center text-center">
            <img id="arrow" src="public/img/angle-up-solid.svg" class="pt-1" width="25" >
            <h2>Tiempos</h2>
        </div>

        <div id="stats" class="container mt-3">
            <div id="time-list" class="row mx-auto"></div>
        </div>
        
    
        <div class="p-3 mt-auto">
            <div class="text-center text-secondary">
                <span >&copy; 2019 Todos los derechos reservados <br>Hecho por <a href="http://www.lazzaro.website/" target="_blank">Lazzaro</a></span>       
            </div>
        </div>
        
    </div>

    <div id="preloader" class="align-items-center justify-content-center" style="display: flex;">
        <img src="public/img/preloader_cube.gif" alt="">
    </div>

    <script type="text/javascript" src="public/js/pressure.min.js"></script>
    <script type="text/javascript" src="public/js/modulos/ui.js"></script>
    <?php if(!isset($_SESSION['username'])): ?> 
        <script type="text/javascript" src="public/js/modulos/form.js"></script> 
    <?php endif; ?>
    <script type="text/javascript" src="public/js/main.js"></script>

</body>
</html>
