<?php
    include_once 'db.php';
    
    Class Validator {
        
        public function validateLogin(array $data, Dbjson $db): array{

            $errors = [];
            $user = $db->getUserByName($data['username']);

            foreach($data as $i => $value){
                if(!is_array($value))
                    $data[$i] = trim($value);
            }

            if(empty($data['username']) || $data['username'] === ""){
                $errors['name'] = "El nombre de usuario esta vacio.";
            }elseif(!$user){
                $errors['name'] = "El usuario no existe.";
            }

            if(empty($data['password'])){
                $errors['password'] = "La contraseña esta vacio.";
            }elseif($user){
                if(!password_verify($data['password'], $user->password))
                    $errors['password'] = "Las contraseñas es incorrecta.";
            }

            return $errors;
        }

        public function validateRegister(array $data, Dbjson $db): array{

            $errors = [];

            foreach($data as $i => $value){
                if(!is_array($value))
                $data[$i] = trim($value);
            }

            if(empty($data['username']) || $data['username'] === ""){
                $errors['name'] = "El nombre de usuario esta vacio.";
            }elseif(strlen($data['username']) <  5  || strlen($data['username']) >  25 ){
                $errors['name'] = "El nombre debe tener entre 4 y 25 caracteres.";
            }elseif($db->getUserByName($data['username'])){
                $errors['name'] = "El nombre de usuario ya existe.";
            }

            if(empty($data['password'])){
                $errors['password'] = "La contraseña esta vacia.";
            }elseif($data['password'] != $data['confirm_password']){
                $errors['password'] = "Las contraseñas no coinciden";
            }

            return $errors;
        }

    }