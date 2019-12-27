<?php 

    Class User {
        private $name;
        private $password;
        private $times;

        public function __construct(string $name, string $password){
            $this->name = $name;
            $this->password = password_hash($password, PASSWORD_BCRYPT);
            $this->times = [];
        }

        public function getName(): string{
            return $this->name;
        }

        public function getPassword(): string{
            return $this->password;
        }

        public function getTimes(): array{
            return $this->times;
        }

        public function setName(string $name): void{
            $this->name = $name;
        }

        public function setPassword(string $password): void{
            $this->name = password_hash($password);
        }

        public function setTimes(array $times): void{
            $this->name = $times;
        }

    }

