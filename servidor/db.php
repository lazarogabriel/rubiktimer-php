<?php

    include_once 'user.php';

    Class Dbjson {

        protected $data;
        

        public function __construct(string $file_name){
            $this->data = json_decode(file_get_contents($file_name));
        }

        public function getUsers(){
            return $this->data->users;
        }

        public function getUserByName(string $user_name){

            foreach($this->data->users as $user){
                if($user->name == $user_name)return $user;
            }

            return NULL;
        }
        
        public function getNames(): array{
            $names = [];
            foreach($this->data->users as $user)$names[] = $user->name;  
            
            return $names;
        }
        public function registerUser(User $user, string $dir = null): void{
            $obj->name = $user->getName();
            $obj->password = $user->getPassword();
            $obj->times = $user->getTimes();
            
            $this->data->users[] = $obj;

            file_put_contents($dir . 'users.json', json_encode($this->data));
        }

        public function insertTime(string $user_name, int $time): void{
            
        }



    }

?>
