const ui = new UI;

const mainContainer = document.getElementById("main");
const btnContainerFinger = document.getElementById("finger-container");
const btnOpenStats = document.getElementById('openStats');
const elementTime = document.getElementById('time');
const timeList = document.getElementById("time-list");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const $welcomeMessage = document.getElementById('welcome-message');

var tiempo = 0;
var tiempoPulsado = 0;
var intervalo;
var bandera = false;
var timesCant = 1;



// EVENTS /////////////////////////////////////////////////////////////////////
const $btnShowLogin = document.getElementById("btnShowLogIn");

if ($btnShowLogin != null) {
    $btnShowLogin.addEventListener("click", () => {
        ui.animationIn(loginModal);
        mainContainer.style.opacity = "0.3";
        document.removeEventListener("keypress", spaceEventPress);
        document.removeEventListener("keyup", spaceEventUp);
    });

    document.getElementById("btnCloseLogin").addEventListener("click", () => {
        ui.animationOut(loginModal);
        mainContainer.style.opacity = "1";
        document.addEventListener("keypress", spaceEventPress);
        document.addEventListener("keyup", spaceEventUp);
    });

    document.getElementById("btnShowRegister").addEventListener("click", () => {
        ui.animationIn(registerModal);
        ui.animationOut(loginModal);
    });

    document.getElementById("btnCloseRegister").addEventListener("click", () => {
        ui.animationOut(registerModal);
        mainContainer.style.opacity = "1";
        document.removeEventListener("keypress", spaceEventPress);
        document.removeEventListener("keyup", spaceEventUp);
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
    window.scrollTo({
        top: screen.height - 80,
        behavior: 'smooth',
    });
});


timeList.addEventListener("click", e => {
    ui.persistTime(e.target);
    ui.deletTime(e.target);
    if(e.target.name === 'delete'){

    }
    
    if(e.target.name === 'save'){
        const timeContent = e.target.parentElement.parentElement;
        const time = timeContent.querySelector('span').textContent;
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
window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
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

        let i = -5;
        let toDown = setInterval(() => {
            i += 1;
            $welcomeMessage.style.top = i + "%";
            if (i > 5) clearInterval(toDown);
        }, 30);

        setTimeout(() => {
            let toUp = setInterval(() => {
                i -= 0.6;
                $welcomeMessage.style.top = i + "%";
                if (i < -5) {
                    clearInterval(toUp);
                    $welcomeMessage.style.display = "none";
                }
            }, 30);
        }, 3000);

        (async () => {
            const times = await fetch("servidor/scripts/get-times.php").then(res => res.json());

            times.forEach((time, i) => {
                ui.insertTimeInList(time[0], time[1]);
            });

            const $btnTimesSaved = document.getElementsByName('save');

            $btnTimesSaved.forEach((btn) => {
                ui.persistTime(btn);
            });


        })();
    }
};



