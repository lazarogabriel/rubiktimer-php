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

        public function saveTime(string $user_name, array $time, string $dir = null): void{

            foreach($this->data->users as $user){
                if($user->name === $user_name){
                    $user->times[] = $time;
                    break;
                }   
            }

            file_put_contents($dir . 'users.json', json_encode($this->data));
        }
        
        public function deleteTime(string $user_name, float $time, string $dir = null){

            foreach($this->data->users as $user){
                if($user->name === $user_name){
                    
                    foreach($user->times as $i => $date_and_time){
                        if($date_and_time[0] === $time){
                            unset($user->times[$i]);
                            $user->times = array_values($user->times);

                            break;
                        }
                    }

                    break;
                }   
            }

            file_put_contents($dir . 'users.json', json_encode($this->data));

        }

        public function getTimes(string $user_name): array{

            foreach($this->data->users as $user){

                if($user->name === $user_name) return $user->times;
                
            }

        }


    }

?>
