/* *************************************************** */
/* ************** *  CIRCULAR PROGRESS  ** *********** */
/* *************************************************** */
const TIMER = document.getElementById('timer');
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");

// Configuración del Tiempo para cada modo
let workTime = true; let workTime_Mins = 25;
let breakTime = false; let breakTime_Mins = 5;
let restTime = false; let restTime_Mins = 15;
let worker;
let rounds = false

// Selecciona cada uno de los círculos
const circle = document.querySelector(".progress-ring__circle");
const outcircle = document.querySelector(".out-ring__circle");
const incircle = document.querySelector(".in-ring__circle");

// Radio del círculo
const radius = circle.r.baseVal.value;
const inradius = incircle.r.baseVal.value;
const outradius = outcircle.r.baseVal.value;

// Perímetro del círculo (longitud del trazo)
const circumference = 2 * Math.PI * radius;
const incircumference = 2 * Math.PI * inradius;
const outcircumference = 2 * Math.PI * outradius;

// Establecer el perímetro como stroke-dasharray
circle.style.strokeDasharray = `${circumference} ${circumference}`;
incircle.style.strokeDasharray = `${incircumference} ${incircumference}`;
outcircle.style.strokeDasharray = `${outcircumference} ${outcircumference}`;

circle.style.strokeDashoffset = circumference;
incircle.style.strokeDashoffset = incircumference;
outcircle.style.strokeDashoffset = outcircumference;

const inoffset = incircumference - 1 * incircumference;
incircle.style.strokeDashoffset = inoffset;

const outoffset = outcircumference - 1 * outcircumference;
outcircle.style.strokeDashoffset = outoffset;

// Minutos y Segundos del timer
let pomodoroMins;
let pomodoroSecs;
let tiempoTotal;
pomodoroMins = parseInt(mins.innerText);
pomodoroSecs = parseInt(secs.innerText);
tiempoTotal = pomodoroMins * 60 + pomodoroSecs;

function setProgress(percentage) {
    const offset = (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    console.log(offset);
}

/* A LA FUNCIÓN setProgress HAY QUE PASARLE EL PORCENTAJE RESTANTE */
/* EMPIEZA CON UN 100% Y TERMINA EN 0% */
let test = 75; setProgress(test);
/* *************************************************** */
/* *************************************************** */
/* *************************************************** */

// ALARMA

const ALARM_WARNING = document.getElementById('alarm')

/* *************************************************** */
/* ************** **  STATUS BAR  ** **************** */
/* ************************************************* */

const worktime_btn = document.getElementById("worktime_btn");
const breaktime_btn = document.getElementById("breaktime_btn");
const resttime_btn = document.getElementById("resttime_btn");
const start_btn = document.getElementById("startbutton");
const pause_btn = document.getElementById("pausebutton");
const clock = document.getElementById("clock");

worktime_btn.addEventListener("click", function () {
    changeMode(0);
});

breaktime_btn.addEventListener("click", function () {
    changeMode(1);
});

resttime_btn.addEventListener("click", function () {
    changeMode(2);
});

function changeColor(colorVar) {
    circle.style.stroke = 'var(' + colorVar + ')';
    outcircle.style.stroke = 'var(' + colorVar + ')';
    incircle.style.stroke = 'var(' + colorVar + ')';
    mins.style.color = 'var(' + colorVar + ')';
    secs.style.color = 'var(' + colorVar + ')';
    clock.style.color = 'var(' + colorVar + ')';
}

function changeMode(mode) {
    mode == 0 ? workTime = true : workTime = false;
    mode == 1 ? breakTime = true : breakTime = false;
    mode == 2 ? restTime = true : restTime = false;

    workTime ? pomodoroMins = workTime_Mins :
        breakTime ? pomodoroMins = breakTime_Mins :
            restTime ? pomodoroMins = restTime_Mins : console.log("ERROR");

    workTime ? changeColor("--blue-color") :
        breakTime ? changeColor("--orange-color") :
            restTime ? changeColor("--green-color") :
                console.log("ERROR");

    workTime ? worktime_btn.classList.add('work') : worktime_btn.classList.remove('work');
    breakTime ? breaktime_btn.classList.add('brake') : breaktime_btn.classList.remove('brake');
    restTime ? resttime_btn.classList.add('rest') : resttime_btn.classList.remove('rest');

    start_btn.classList.remove('active');
    pause_btn.classList.remove('active');

    mins.innerText = pomodoroMins;
    secs.innerText = "00";
}

start_btn.addEventListener('click', () => {
    if (workTime) {
        workerMode()
    } else if (breakTime) {
        workerMode()
    } else {
        workerMode()
    }
    startMode()
})

pause_btn.addEventListener('click', () => {
    pauseTimer()
})

function workerMode() {
    let totalSegundos = parseInt(mins.innerHTML) * 60 + parseInt(secs.innerHTML);
    if (worker) worker.terminate();

    worker = new Worker("./script/worker.js");
    worker.postMessage({ action: "start", time: totalSegundos });
    worker.onmessage = function (e) {
        if (e.data.finished) {
            worker.terminate();

            TIMER.addEventListener('mouseover', () => {
                if (ALARM_WARNING) {
                    ALARM_WARNING.pause()
                    ALARM_WARNING.currentTime = 0
                }
            })
            if (rounds == true) {
                worktime_btn.click()
                pauseMode()
            }
            if (rounds == false) {
                breaktime_btn.click()
                pauseMode()
                start_btn.click()
                ALARM_WARNING.currentTime = 0
                ALARM_WARNING.play();
                rounds = true
            }
        } else {
            workTime = true
            let min = Math.floor(e.data.timeLeft / 60);
            let sec = e.data.timeLeft % 60;
            mins.innerHTML = min.toString().padStart(2, "0");
            secs.innerHTML = sec.toString().padStart(2, "0");
        }
    }
}

// Función para pausar el temporizador
function pauseTimer() {
    if (worker) {
        worker.postMessage({ action: "pause" });
        worker.terminate();
        pauseMode()
    }
}

function pauseMode(){
    start_btn.disabled = false;
    pause_btn.disabled = true
}

function startMode() {
    start_btn.disabled = true;
    pause_btn.disabled = false;
}