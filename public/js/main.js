const ui = new UI;

const $username = document.getElementById('userName');
const mainContainer = document.getElementById('main');
const btnContainerFinger = document.getElementById('finger-container');
const btnOpenStats = document.getElementById('openStats');
const elementTime = document.getElementById('time');
const timeList = document.getElementById('time-list');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const $welcomeMessage = document.getElementById('welcome-message');
const $modalAuth = document.querySelectorAll('.authModal');


var tiempo = 0;
var tiempoPulsado = 0;
var intervalo;
var bandera = false;
var timesCant = 1;



// EVENTS /////////////////////////////////////////////////////////////////////
const $btnShowLogin = document.getElementById("btnShowLogIn");

if ($btnShowLogin != null) {
    $btnShowLogin.addEventListener("click", () => {
        $modalAuth[0].classList.remove('slideOutUp');
        $modalAuth[0].style.display = 'flex';
        $modalAuth[0].classList.add('slideInDown');
        mainContainer.style.opacity = "0.3";
        document.removeEventListener("keypress", spaceEventPress);
        document.removeEventListener("keyup", spaceEventUp);
    });

    document.getElementById("btnCloseLogin").addEventListener("click", () => {
        $modalAuth[0].classList.remove('slideInDown');
        $modalAuth[0].classList.add('slideOutUp');
        mainContainer.style.opacity = "1";
        document.addEventListener("keypress", spaceEventPress);
        document.addEventListener("keyup", spaceEventUp);
    });

    document.getElementById("btnShowRegister").addEventListener("click", () => {
        $modalAuth[0].classList.remove('slideInDown');
        $modalAuth[0].classList.add('slideOutUp');
        $modalAuth[1].classList.remove('slideOutUp');
        $modalAuth[1].style.display = 'flex';
        $modalAuth[1].classList.add('slideInDown');
    });

    document.getElementById("btnCloseRegister").addEventListener("click", () => {
        $modalAuth[1].classList.remove('slideInDown');
        $modalAuth[1].classList.add('slideOutUp');
        mainContainer.style.opacity = "1";
        document.addEventListener("keypress", spaceEventPress);
        document.addEventListener("keyup", spaceEventUp);
    });
}


btnContainerFinger.addEventListener("click", () => {
    bandera ? playStopCronometro() : "";
});

// CLICK EVENT
Pressure.set(btnContainerFinger, {
    start: () => {
        tiempoPulsado++;
        document.body.style.background = "#742121";  //ROJO
        if (bandera === true) playStopCronometro();
    },
    end: () => {
        document.body.style.background = "#1F334B"; //AZUL
    },
    endDeepPress: () => {
        document.body.style.background = "#1F334B"; //AZUL
        bandera = true;
        playStopCronometro();
    },
    startDeepPress: () => {
        document.body.style.background = "#1F4B2A";  // VERDE
    }

}, { only: 'mouse' });
// END CLICK EVENT


// TOUCH SCREEN EVENT
Pressure.set(btnContainerFinger, {
    change: () => {
        tryPlay();
    },
    end: () => {
        Play();
    }
}, { only: 'touch' });
// END TOUCH SCREEN EVENT

// SPACE KEY EVENT
document.addEventListener("keypress", spaceEventPress);
document.addEventListener("keyup", spaceEventUp);

function spaceEventPress(e) {
    e = e || window.event;
    let charCode = e.keyCode || e.which;
    if (charCode === 32) tryPlay();
    e.preventDefault();
};

function spaceEventUp(e) {
    e = e || window.event;
    let charCode = e.keyCode || e.which;
    if (charCode === 32) Play();

};
// END SPACE KEY EVENT

btnOpenStats.addEventListener('click', () => {
    // document.getElementById('arrow').style.transform =  'rotate(180deg)';
    window.scrollTo({
        top: screen.height - 80,
        behavior: 'smooth',
    });
});


timeList.addEventListener("click", e => {
    ui.persistTime(e.target);
    ui.deletTime(e.target);

    const timeContent = e.target.parentElement.parentElement;
    const time = timeContent.querySelector('span').textContent;

    if(e.target.name === 'delete' && $username){
        const formData = new FormData();
        formData.append('time', time);

        fetch('servidor/scripts/delete-time.php', {
            method: 'POST',
            body: formData
        });
       
    }       

    if(e.target.name === 'save' && $username){
        const date = timeContent.querySelector('small').textContent;

        const formData = new FormData();
        formData.append('time', time);
        formData.append('date', date);

        fetch("servidor/scripts/save-time.php", {
                method: 'POST',
                body: formData
        });
        
    }

});

// END EVEENTSSS /////////////////////////////////////////////////////////////


// CRONOMETER FUNCTIONS //////////////////////////////////////////////////////
function tryPlay() {
    tiempoPulsado++;
    document.body.style.background = "#742121";
    if (bandera) playStopCronometro();
    if (tiempoPulsado > 20) document.body.style.background = "#1F4B2A";
}

function Play() {
    document.body.style.background = "#1F334B";
    if (tiempoPulsado < 20) return;
    tiempoPulsado = 0;
    bandera = true;
    playStopCronometro();
}

function playStopCronometro() {
    if (tiempo === 0) {
        elementTime.classList = "start";
        intervalo = setInterval(() => {
            tiempo += 0.01;
            elementTime.textContent = tiempo.toFixed(2);
        }, 10);
    } else {
        elementTime.classList = "stop";
        ui.insertTimeInList(tiempo);
        bandera = false;
        timesCant++;
        tiempo = 0;
        clearInterval(intervalo);
    }
};


// REMOVE OPTIONS DEFAULTS WHEN TOUCH LONG IN MOBILE DEVICESS
window.oncontextmenu =  e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
};


////// PRELOEADER
window.onload = () => {
    const $preloader = document.getElementById("preloader");
    var i = 1;

    var fadeInAnimation = setInterval(() => {
        i -= 0.1;
        $preloader.style.opacity = i;
        if (i <= 0) {
            clearInterval(fadeInAnimation);
            $preloader.style.display = "none";
        }
    }, 20);


    if ($welcomeMessage != null) {

        $welcomeMessage.style.display = 'block';
        $welcomeMessage.classList.add('message' ,'messageLogSucces','animated', 'slideInDown');

        setTimeout(  () => {
            $welcomeMessage.classList.add('slideOutUp');
        }, 2500);

        (async () => {
            const times = await fetch("servidor/scripts/get-times.php").then(res => res.json());

            times.forEach( time => ui.insertTimeInList(time[0], time[1]) );

            const $btnTimesSaved = document.getElementsByName('save');

            $btnTimesSaved.forEach((btn) => {
                ui.persistTime(btn);
            });


        })();
    }
};



