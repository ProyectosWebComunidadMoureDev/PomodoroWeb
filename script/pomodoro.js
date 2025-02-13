/* *************************************************** */
/* ************** *  CIRCULAR PROGRESS  ** *********** */
/* *************************************************** */

const mins = document.getElementById("mins");
const secs = document.getElementById("secs");

// Configuración del Tiempo para cada modo
let workTime = true; let workTime_Mins = 25;
let breakTime = false; let breakTime_Mins = 5;
let restTime = false; let restTime_Mins = 15;

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
pomodoroMins = parseInt(mins.innerText);
pomodoroSecs = parseInt(secs.innerText);
tiempoTotal = pomodoroMins*60 + pomodoroSecs;

function setProgress(percentage) {    
    const offset =  (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    console.log(offset);
}

/* A LA FUNCIÓN setProgress HAY QUE PASARLE EL PORCENTAJE RESTANTE */
/* EMPIEZA CON UN 100% Y TERMINA EN 0% */    
let test = 75; setProgress(test);
/* *************************************************** */
/* *************************************************** */
/* *************************************************** */


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
const clock =  document.getElementById("clock");


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