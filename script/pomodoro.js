/* *************************************************** */
/* ************** *  CIRCULAR PROGRESS  ** *********** */
/* *************************************************** */
const TIMER = document.getElementById('timer');
//const mins = document.getElementById("mins");
//const secs = document.getElementById("secs");

const segments = document.querySelectorAll('#clock span');
const separator = document.getElementById("separator");
const separator_two = document.getElementById("separator_two");

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
let tiempoRestante = 0;
let running = false;
let inpause = false;
let sec = 0;

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

pomodoroMins = workTime_Mins;
pomodoroSecs = 0;
tiempoTotal = pomodoroMins * 60 + pomodoroSecs;

totalSegundos = pomodoroMins * 60 + pomodoroSecs;
segundos_restantes = totalSeconds;
tiempoRestante = totalSegundos;
const numbers = {
    0: "1110111",
    1: "0010010",
    2: "1011101",
    3: "1011011",
    4: "0111010",
    5: "1101011",
    6: "1101111",
    7: "1010010",
    8: "1111111",
    9: "1111011"    
};

function updateclock(m, mm, s, ss) {
    draw_number(parseInt(m), "first_minutes");
    draw_number(parseInt(mm), "second_minutes");
    draw_number(parseInt(s), "first_seconds");
    draw_number(parseInt(ss), "second_seconds");
}

function draw_number(number, id) {    
    const segments = numbers[number];
    const digit = document.getElementById(id);
    const elements = digit.querySelectorAll('span');
    elements.forEach((element, index) => {
        if (segments[index] == 0) {
            element.classList.add("novisible");
        } else {
            element.classList.remove("novisible");
        }
    }); 
}

function setProgress(percentage) {
    const offset = (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
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
    //mins.style.color = 'var(' + colorVar + ')';
    //secs.style.color = 'var(' + colorVar + ')';
    //clock.style.color = 'var(' + colorVar + ')';
    segments.forEach((span) => {
        span.style.backgroundColor = 'var(' + colorVar + ')';
    });
    separator.style.backgroundColor = 'var(' + colorVar + ')';
    separator_two.style.backgroundColor = 'var(' + colorVar + ')';
    //incircle.setAttribute("fill", "rgba(144, 144, 144, .05)");
    //const colorVars = getComputedStyle(document.documentElement).getPropertyValue(colorVar).trim();
    //incircle.setAttribute("fill", colorVars+"07");
}

function changeMode(mode) {
    
    //pauseTimer();

    mode == 0 ? workTime = true : workTime = false;
    mode == 1 ? breakTime = true : breakTime = false;
    mode == 2 ? restTime = true : restTime = false;    

    workTime ? pomodoroMins = workTime_Mins :
        breakTime ? pomodoroMins = breakTime_Mins :
            restTime ? pomodoroMins = restTime_Mins : console.log("ERROR");
    
    
    segundos_restantes = totalSeconds;

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

    //mins.innerText = pomodoroMins;
    //secs.innerText = "00";
    let minutos = "00";
    let segundos = "00";
    minutos = (pomodoroMins.toString());
    segundos = (pomodoroSecs.toString());
    if (minutos.length < 2) {
        minutos = "0" + minutos;
    }
    if (segundos.length < 2) {
        segundos = "0" + segundos;
    }
    updateclock(minutos[0], minutos[1], segundos[0], segundos[1]);    
}

start_btn.addEventListener('click', () => {    
    if (!running && !inpause) {
        running = true;
        start_btn.classList.add("active");
        if (workTime) {
            totalSeconds = workTime_Mins * 60;
            totalSeconds = pomodoroMins * 60;            
            rounds = false
            workerMode()
            blockModes()
            if(nocounter < 1){
                nocounter++
            }
            console.log('NOCOUNTER: ', nocounter)
        } else if (breakTime) {
            totalSeconds = breakTime_Mins * 60;
            workerMode()
        } else {
            totalSeconds = restTime_Mins * 60;
            workerMode()
        }
        startMode();
    } else if (inpause) {
        running = true;
        rounds = false
        pause_btn.classList.remove("active");
        start_btn.classList.add("active");
        pause_btn.disabled = false;
        totalSeconds = tiempoRestante;
        workerMode();
        inpause = false;
        blockModes();
        if(nocounter < 1){
            nocounter++;
        }
        console.log('NOCOUNTER: ', nocounter);
    }
})

pause_btn.addEventListener('click', () => {
    if (!inpause && running) {
        inpause = true;
        running = false;
        pause_btn.classList.add("active");
        start_btn.classList.remove("active");
        pauseTimer();
    }
})

function workerMode() {
    if (worker) {
        worker.terminate();
        //totalSegundos = totalSeconds;
    } else {
        totalSegundos = pomodoroMins * 60;
    }
    tiempoRestante = totalSeconds;

    worker = new Worker("./script/worker.js");
    worker.postMessage({ action: "start", time: tiempoRestante});
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

            if(breakTime==true && counter!=0){
                console.log('breakTime')
                unlockModes()
                totalSegundos = workTime_Mins * 60;
                worktime_btn.click();
                running = false;
                inpause = false;
                pauseMode();
                ALARM_WARNING.currentTime = 0;
                ALARM_WARNING.play()
                return
            }

            if(restTime==true && counter!=0){
                console.log('restTime')
                unlockModes()
                pauseMode()
                ALARM_WARNING.play()
                worktime_btn.click()
                return
            }

            if (rounds == true) {
                running = false;
                inpause = false;
                unlockModes()
                worktime_btn.click()
                pauseMode()
                blockModes()
            } else {
                unlockModes()
                if (counter == 2) {
                    running = false;
                    inpause = false;
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
                    totalSegundos = breakTime_Mins*60;
                    pauseMode()
                    running = false;
                    inpause = false;
                    start_btn.click()
                    ALARM_WARNING.play();
                    rounds = true
                    blockModes()
                }
            }            
        } else {
            let min = Math.floor(e.data.timeLeft / 60);
            sec = e.data.timeLeft % 60;
            //mins.innerHTML = min.toString().padStart(2, "0");
            //secs.innerHTML = sec.toString().padStart(2, "0");
            setProgress((e.data.timeLeft*100)/totalSegundos);
            minutos = (min.toString());
            segundos = (sec.toString());
            tiempoRestante = e.data.timeLeft;

            if (minutos.length < 2) {
                minutos = "0" + minutos;
            }
            if (segundos.length < 2) {
                segundos = "0" + segundos;
            }
            updateclock(minutos[0], minutos[1], segundos[0], segundos[1]);
            blink_separators();
        }
    }
}

function blink_separators() {
    if (segundos%2) {
        separator.style.opacity = .6;
        separator_two.style.opacity = .6;
    } else {
        separator.style.opacity = 1;
        separator_two.style.opacity = 1;
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
    setProgress(100);
}

worktime_btn.click()