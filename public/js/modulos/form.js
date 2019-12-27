
//VALIDATION AND GET DATA FROM REGISTER FORM
const $registerForm = document.getElementById('registerForm');

$registerForm.addEventListener('submit', async e => {
    e.preventDefault();

    //VALIDATE DATA FROM CLIENT
    const name = document.getElementById('register_username');
    const password = document.getElementById('register_password');
    const confirm_password = document.getElementById('confirm_password');

    if(name.value == "" || name.value.length > 30 || name.value.length < 6){
        invalidMessage(name, 'Nombre de usuario debe tener entre 6 y 30 caracteres');
    }else if(names.indexOf(name.value) > -1){
        invalidMessage(name, 'El nombre de usuario ya existe');
    }else{
        validFeedback(name);
    }

    if(password.value == "" || password.value.length < 6){
        invalidMessage(password, 'La contraseña debe tener mas de 5 caracteres');
    }else if(confirm_password.value !== password.value){
        invalidMessage(password, 'Las contraseñas no coinciden');
    }else{
        validFeedback(password);
    }
    
    //VALIDATE DATA FROM SERVER
    const formData = new FormData($registerForm);
    
    const errors = await fetch('servidor/scripts/validate-register.php', {
        method: 'POST',
        body: formData
    })
    .then(resp => resp.json());

    if( ("password" in errors) || ("name" in errors)){
        if(document.querySelectorAll(".is-invalid").length === 0){
            for(const error in errors) {
                const input = error === "name" ? name : password; 
                invalidMessage(input, errors[error]);   
            } 
        }
    }else{
        location.reload();
    }
});

//VALIDATION AND GET DATA FROM LOGIN FORM
const $loginForm = document.getElementById('loginForm');

$loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    
    const name = document.getElementById('username');
    const password = document.getElementById('password');

    if(name.value == ""){
        invalidMessage(name, 'Debes ingresar tu nombre de usuario');
    }else if(names.indexOf(name.value) === -1){
        invalidMessage(name, "El usuario no existe.");
    }else{
        validFeedback(name);
    }

    if(password.value == "" || password.value.length < 6){
        invalidMessage(password, 'Contraseña incorrecta.');
    }

    //VALIDATE DATA FROM SERVER
    const formData = new FormData($loginForm);
 
    const errors = await fetch('servidor/scripts/validate-login.php', {
        method: 'POST',
        body: formData
    })
    .then(resp => resp.json());


    if( ("password" in errors) || ("name" in errors)){
        if(document.querySelectorAll(".is-invalid").length === 0){
            for(const error in errors) {
                const input = error === "name" ? name : password; 
                invalidMessage(input, errors[error]);   
            } 
        }
    }else{
        location.reload(); 
    }
});



/// FUNCTIONS 

var names; // async!!!! GET NAMES FROM DB FOR VALIDATE REGISTER AND LOGIN
( async () => {
    names = await fetch('servidor/scripts/get-user-names.php') 
                .then(resp => resp.json())
                .catch(e => console.error(e));

})();


// VALIDATE MESSAGES
function invalidMessage(input, message){
    const element = document.createElement('div');
    
    input.classList.add('is-invalid');
    element.classList.add('invalid-feedback');
    element.innerHTML = message;

    input.after(element);
    setTimeout(() => element.remove(), 3000);
}

function validFeedback(input){  
    input.classList.remove('is-invalid');  
    input.classList.add('is-valid');
}

