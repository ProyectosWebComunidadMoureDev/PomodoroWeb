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
let rounds = false;
let counter = 0; // VUELTAS DEL TEMPORIZADOR
let nocounter = 0; // SE SETEA A 0, Y EN EL COMIENZO DEL TEMPORIZADOR SE SUMA 1 HASTA QUE SE COMPLETE PARA RESTARLO Y SUMAR 1 A COUNTER PARA CONFIRMAR QUE FINALIZO Y NO FUE CANCELADO
let cycle_resttime = 0; // ESTA VARIABLE AUMENTARA CADA 4 CICLOS COMPLETOS, O SEA CUANDO COUNTER SEA IGUAL A 4 PARA QUE SE IGUALE AL OBJETO HABLADO EN GRUPO "initialData.cyclesCompleted = cycle_resttime"
let totalSegundos = 0;
let totalSeconds;

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
    // console.log(percentage);
}

/* A LA FUNCIÓN setProgress HAY QUE PASARLE EL PORCENTAJE RESTANTE */
/* EMPIEZA CON UN 100% Y TERMINA EN 0% */
//let test = 75; setProgress(test);
/* *************************************************** */
/* *************************************************** */
/* *************************************************** */

// ALARMA

const ALARM_WARNING = document.getElementById('alarm')

/* *************************************************** */
/* ************** **  STATUS BAR  ** **************** */
/* ************************************************* */

const worktime_btn = document.getElementById("worktime_btn");
const worktime_btn_resp = document.getElementById("worktime_btn_resp");
const breaktime_btn = document.getElementById("breaktime_btn");
const breaktime_btn_resp = document.getElementById("breaktime_btn_resp");
const resttime_btn = document.getElementById("resttime_btn");
const resttime_btn_resp = document.getElementById("resttime_btn_resp");
const start_btn = document.getElementById("startbutton");
const pause_btn = document.getElementById("pausebutton");
const clock = document.getElementById("clock");


worktime_btn.addEventListener("click", function () {
    changeMode(0);
});

worktime_btn_resp.addEventListener("click", function () {
    changeMode(0);
});

breaktime_btn.addEventListener("click", function () {
    changeMode(1);
});
breaktime_btn_resp.addEventListener("click", function () {
    changeMode(1);
});

resttime_btn.addEventListener("click", function () {
    changeMode(2);
});
resttime_btn_resp.addEventListener("click", function () {
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

    console.log(workTime)
    console.log(breakTime)
    console.log(restTime)

    workTime ? pomodoroMins = workTime_Mins :
        breakTime ? pomodoroMins = breakTime_Mins :
            restTime ? pomodoroMins = restTime_Mins : console.log("ERROR");

    workTime ? changeColor("--blue-color") :
        breakTime ? changeColor("--orange-color") :
            restTime ? changeColor("--green-color") :
                console.log("ERROR");

    workTime ? worktime_btn.classList.add('work') : worktime_btn.classList.remove('work');
    workTime ? worktime_btn_resp.classList.add('work') : worktime_btn_resp.classList.remove('work');
    breakTime ? breaktime_btn.classList.add('brake') : breaktime_btn.classList.remove('brake');
    breakTime ? breaktime_btn_resp.classList.add('brake') : breaktime_btn_resp.classList.remove('brake');
    restTime ? resttime_btn.classList.add('rest') : resttime_btn.classList.remove('rest');
    restTime ? resttime_btn_resp.classList.add('rest') : resttime_btn_resp.classList.remove('rest');

    start_btn.classList.remove('active');
    pause_btn.classList.remove('active');

    mins.innerText = pomodoroMins;
    secs.innerText = "00";
}

start_btn.addEventListener('click', () => {
    if (workTime) {
        totalSeconds = workTime_Mins * 60 + parseInt(secs.innerHTML);
        rounds = false
        workerMode()
        blockModes()
        if(nocounter < 1){
            nocounter++
        }
        console.log('NOCOUNTER: ', nocounter)
    } else if (breakTime) {
        totalSeconds = breakTime_Mins * 60 + parseInt(secs.innerHTML);
        workerMode()
    } else {
        totalSeconds = restTime_Mins * 60 + parseInt(secs.innerHTML);
        workerMode()
    }
    startMode()
})

pause_btn.addEventListener('click', () => {
    pauseTimer()
})

function workerMode() {
    totalSegundos = parseInt(mins.innerHTML) * 60 + parseInt(secs.innerHTML);
    if (worker) worker.terminate();

    worker = new Worker("./script/worker.js");
    worker.postMessage({ action: "start", time: totalSegundos });
    worker.onmessage = function (e) {
        if (e.data.finished) {
            worker.terminate();

            if (nocounter > 0) {
                nocounter--
                counter++
                console.log('NO COUNTER: ', nocounter)
                console.log('COUNTER: ', counter)
            }

            TIMER.addEventListener('mouseover', () => {
                if (ALARM_WARNING) {
                    ALARM_WARNING.pause()
                    ALARM_WARNING.currentTime = 0
                }
            })

            if(breakTime==true && counter==0){
                console.log('breakTime')
                unlockModes()
                pauseMode()
                ALARM_WARNING.currentTime = 0
                ALARM_WARNING.play()
                return
            }

            if(restTime==true && counter==0){
                console.log('restTime')
                unlockModes()
                pauseMode()
                ALARM_WARNING.play()
                worktime_btn.click()
                return
            }

            if (rounds == true) {
                unlockModes()
                worktime_btn.click()
                pauseMode()
                blockModes()
            } else {
                unlockModes()
                if (counter == 4) {
                    console.log('se cumplieron las 4 rondas')
                    resttime_btn.click()
                    pauseMode()
                    start_btn.click()
                    ALARM_WARNING.play();
                    rounds = true
                    blockModes()
                    counter = 0;
                    cycle_resttime++
                    unlockModes()
                } else {
                    breaktime_btn.click()
                    pauseMode()
                    start_btn.click()
                    ALARM_WARNING.play();
                    rounds = true
                    blockModes()
                }
            }
        } else {
            let min = Math.floor(e.data.timeLeft / 60);
            let sec = e.data.timeLeft % 60;
            mins.innerHTML = min.toString().padStart(2, "0");
            secs.innerHTML = sec.toString().padStart(2, "0");
            setProgress((e.data.timeLeft * 100) / totalSeconds);
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

function pauseMode() {
    start_btn.disabled = false;
    pause_btn.disabled = true
}

function startMode() {
    start_btn.disabled = true;
    pause_btn.disabled = false;
}

function blockModes() {
    worktime_btn.disabled = true
    breaktime_btn.disabled = true
    resttime_btn.disabled = true
}

function unlockModes() {
    worktime_btn.disabled = false
    breaktime_btn.disabled = false
    resttime_btn.disabled = false
}

worktime_btn.click()