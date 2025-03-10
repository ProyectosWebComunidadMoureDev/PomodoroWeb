/* ************** *  OBJETOS  ** *********** */
const TIMER_CONFIG = {
    work: { minutes: 25, color: '--blue-color', button: `worktime_btn`, button_resp: `worktime_btn_resp`  },
    break: { minutes: 5, color: '--orange-color', button: `breaktime_btn`, button_resp: `breaktime_btn_resp` },
    rest: { minutes: 15, color: '--green-color', button: `resttime_btn`, button_resp: `resttime_btn_resp` }
};

const POMODORO = {
    mode : "work",
    roundsCompleted: 0,
    totalSeconds: 0,
    remainingTime: 0,
    completeCycle: 4,
    speed_clock: 1000,
    speed_miniclock: 200
};

const CIRCLES = {
    work: { circle: null, complete: null, circumference: 0 },
    break: { circle: null, complete: null, circumference: 0 },
    rest: { circle: null, complete: null, circumference: 0 }
};

const WORKERS = {
    worker: {
        time: () => POMODORO.remainingTime,
        speed: POMODORO.speed_clock,
        instance: null,
        onMessage: (e) => {
            if (e.data.finished) {
                timerComplete();
            } else {
                POMODORO.remainingTime = e.data.timeLeft;
                setProgress((e.data.timeLeft*100)/POMODORO.totalSeconds);
                formatClock(e.data.timeLeft);
            }
        }
    },
    miniworker: {
        time: () => POMODORO.remainingTime * (POMODORO.speed_clock / POMODORO.speed_miniclock),
        speed: POMODORO.speed_miniclock,
        instance: null,
        onMessage: (e) => {
            if (!e.data.finished) {
                const circle = CIRCLES[POMODORO.mode].complete;
                if (circle) {
                    circle.style.strokeDashoffset = (POMODORO.remainingTime + e.data.timeLeft);
                }
                POMODORO.remainingTime = e.data.timeLeft/(POMODORO.speed_clock / POMODORO.speed_miniclock);
                setProgress((POMODORO.remainingTime*100)/POMODORO.totalSeconds);
            }
        }
    }
};


// Segmentos del display
const NUMBERS = {
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
/* ************** *  OBJETOS  ** *********** */

/* DOM */
/* ************** *  CIRCULAR PROGRESS  ** *********** */
const TIMER = document.getElementById('timer');
// Selecciona cada uno de los círculos
const circle = document.querySelector(".progress-ring__circle");
const outcircle = document.querySelector(".out-ring__circle");
const incircle = document.querySelector(".in-ring__circle");

CIRCLES.work.circle = document.querySelector(".worktime_circle");
CIRCLES.work.complete = document.getElementById("wt_complete_circle");
CIRCLES.break.circle = document.querySelector(".breaktime_circle");
CIRCLES.break.complete = document.getElementById("bt_complete_circle");
CIRCLES.rest.circle = document.querySelector(".resttime_circle");
CIRCLES.rest.complete = document.getElementById("rt_complete_circle");

const wt_circle = document.querySelector(".worktime_circle");
const wt_complete_circle = document.getElementById("wt_complete_circle");
const bt_circle = document.querySelector(".breaktime_circle");
const bt_complete_circle = document.getElementById("bt_complete_circle");
const rt_circle = document.querySelector(".resttime_circle");
const rt_complete_circle = document.getElementById("rt_complete_circle");


// Radio del círculo
const radius = circle.r.baseVal.value;
const inradius = incircle.r.baseVal.value;
const outradius = outcircle.r.baseVal.value;
// Radio del círculo
const wt_radius = wt_circle.r.baseVal.value;
const bt_radius = bt_circle.r.baseVal.value;
const rt_radius = rt_circle.r.baseVal.value;
const wt_circumference = 2 * Math.PI * wt_radius;
const bt_circumference = 2 * Math.PI * bt_radius;
const rt_circumference = 2 * Math.PI * rt_radius;
wt_circle.style.strokeDasharray = `${wt_circumference} ${wt_circumference}`;
bt_circle.style.strokeDasharray = `${bt_circumference} ${bt_circumference}`;
rt_circle.style.strokeDasharray = `${rt_circumference} ${rt_circumference}`;

// Perímetro del círculo (longitud del trazo)
const circumference = 2 * Math.PI * radius;
const incircumference = 2 * Math.PI * inradius;
const outcircumference = 2 * Math.PI * outradius;

circle.style.strokeDashoffset = circumference;
incircle.style.strokeDashoffset = incircumference;
outcircle.style.strokeDashoffset = outcircumference;

const inoffset = incircumference - 1 * incircumference;
incircle.style.strokeDashoffset = inoffset;

const outoffset = outcircumference - 1 * outcircumference;
outcircle.style.strokeDashoffset = outoffset;

// Establecer el perímetro como stroke-dasharray
circle.style.strokeDasharray = `${circumference} ${circumference}`;
incircle.style.strokeDasharray = `${incircumference} ${incircumference}`;
outcircle.style.strokeDasharray = `${outcircumference} ${outcircumference}`;

/* ************** **  SEGMENTS  ** **************** */
const segments = document.querySelectorAll('#clock span');
const separator = document.getElementById("separator");
const separator_two = document.getElementById("separator_two");
/* ************** **  POMODORO MODES  ** **************** */
const worktime_btn = document.getElementById(TIMER_CONFIG.work.button);
const worktime_btn_resp = document.getElementById(TIMER_CONFIG.work.button_resp);
const breaktime_btn = document.getElementById(TIMER_CONFIG.break.button);
const breaktime_btn_resp = document.getElementById(TIMER_CONFIG.break.button_resp);
const resttime_btn = document.getElementById(TIMER_CONFIG.rest.button);
const resttime_btn_resp = document.getElementById(TIMER_CONFIG.rest.button_resp);
/* ************** **  POMODORO BUTTONS  ** **************** */
const start_btn = document.getElementById("startbutton");
const pause_btn = document.getElementById("pausebutton");
const clock = document.getElementById("clock");
// ALARMA
const ALARM_WARNING = document.getElementById('alarm');
/* DOM */

/* ************** *  VARIABLES  ** *********** */
let worker = null;
let miniworker = null;

// Minutos y Segundos del timer
let pomodoroMins = 0;
let pomodoroSecs = 0;
let totalSeconds = 0;
let leftSeconds = 0;

/* ************** *  VARIABLES  ** *********** */

/* ************** **  LISTENERS  ** **************** */
worktime_btn.addEventListener("click", function () {setMode("work");});
worktime_btn_resp.addEventListener("click", function () {setMode("work");});
breaktime_btn.addEventListener("click", function () {setMode("break");});
breaktime_btn_resp.addEventListener("click", function () {setMode("break");});
resttime_btn.addEventListener("click", function () {setMode("rest");});
resttime_btn_resp.addEventListener("click", function () {setMode("rest");});
start_btn.addEventListener("click", function () {startPomodoro();});
pause_btn.addEventListener("click", function () {pausePomodoro();});
TIMER.addEventListener('mouseover', function () {stopAlarm();});
/* ************** **  LISTENERS  ** **************** */

/* ************** **  FUNCTIONS  ** **************** */
function setMode(mode) {
    stopWorker();
    if (!(mode in TIMER_CONFIG)) {
        console.error("Modo inválido");
        return;
    }
    POMODORO.mode = mode;
    POMODORO.totalSeconds = TIMER_CONFIG[POMODORO.mode].minutes * 60;
    POMODORO.remainingTime = POMODORO.totalSeconds;
    desactiveButton(start_btn);
    desactiveButton(pause_btn);
    pause_btn.disabled = true;
    changeColor(TIMER_CONFIG[mode].color);        
    formatClock(POMODORO.totalSeconds);
    setProgress(100);
}

function desactiveButton(btn) {
    btn.classList.remove("active");
    btn.disabled = false;
}
function activeButton(btn) {
    btn.classList.add("active");
    btn.disabled = true;
}

function formatClock(seconds) {
    let pomodoroMins = Math.floor(seconds / 60);
    let pomodoroSecs = seconds % 60;

    let minutesStr = pomodoroMins.toString().padStart(2, '0');
    let secondsStr = pomodoroSecs.toString().padStart(2, '0');
    updateclock(minutesStr[0], minutesStr[1], secondsStr[0], secondsStr[1]);
    blink_separators();
}

function changeColor(colorVar) {
    let color = `var(${colorVar})`;
    [circle, outcircle, incircle].forEach(el => el.style.stroke = color);
    [separator, separator_two].forEach(el => el.style.backgroundColor = color);    
    segments.forEach(el => { el.style.backgroundColor = color; });
    [worktime_btn, breaktime_btn, resttime_btn, worktime_btn_resp, breaktime_btn_resp, resttime_btn_resp].forEach(btn => {
        btn.style.border = `1px solid var(--gray-color)`;
    });
    const activeButtons = {
        'work': [worktime_btn, worktime_btn_resp],
        'break': [breaktime_btn, breaktime_btn_resp],
        'rest': [resttime_btn, resttime_btn_resp]
    }[POMODORO.mode];
    if (activeButtons) {
        activeButtons.forEach(btn => {
            btn.style.border = `3px solid ${color}`;
        });
    }
}


function startPomodoro() {
    /*
    grabar en localstorage nocompletado +1
    */
    //blockModes();
    activeButton(start_btn);
    desactiveButton(pause_btn);
    stopWorker();
    startWorkers();    
}

function pausePomodoro() {
    activeButton(pause_btn);
    desactiveButton(start_btn);
    stopWorker();    
}

function timerComplete() {
    /*
    grabar en localstorage nocompletado -1
    */
    stopWorker();
    POMODORO.mode === "work" && POMODORO.roundsCompleted++;
    playAlarm();
    if (POMODORO.roundsCompleted > 0 && POMODORO.roundsCompleted % POMODORO.completeCycle === 0) {
        setMode("rest");
        POMODORO.roundsCompleted = 0;
    } else {
        if (POMODORO.mode == "work") {
            setMode("break");
            setTimeout(() => {
                startPomodoro();
            }, 2000);
        } else {
            setMode("work");
        }
    }
}

function startWorkers() {
    Object.entries(WORKERS).forEach(([key, config]) => {
        config.instance = new Worker("../script/worker.js");
        config.instance.onmessage = config.onMessage;
        config.instance.postMessage({
            action: "start",
            time: config.time(),
            speed: config.speed
        });
    });
};

function stopWorker() {
    Object.values(WORKERS).forEach(config => {
        if (config.instance) {
            config.instance.terminate();
            config.instance = null;
        }
    });
}

function updateclock(m, mm, s, ss) {
    draw_number(parseInt(m), "first_minutes");
    draw_number(parseInt(mm), "second_minutes");
    draw_number(parseInt(s), "first_seconds");
    draw_number(parseInt(ss), "second_seconds");
}

function draw_number(number, id) {    
    const segments = NUMBERS[number];
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

function blink_separators() {
    const opacity = POMODORO.remainingTime % 2 ? 0.6 : 1;
    [separator, separator_two].forEach(el => el.style.opacity = opacity);    
}

function setProgress(percentage) {    
    const offset = (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

function blockModes() {
    worktime_btn.disabled = true;
    breaktime_btn.disabled = true;
    resttime_btn.disabled = true;
}

function unlockModes() {
    worktime_btn.disabled = false;
    breaktime_btn.disabled = false;
    resttime_btn.disabled = false;
}
function playAlarm() {
    ALARM_WARNING.play();
}

function stopAlarm() {
    ALARM_WARNING.pause();
    ALARM_WARNING.currentTime = 0;
}
/* ************** **  FUNCTIONS  ** **************** */

window.addEventListener("load", (event) => {
    setProgress(100);
    setMode("work");    
    setCircleOffsets('work', wt_circle, wt_complete_circle, wt_circumference);
    setCircleOffsets('break', bt_circle, bt_complete_circle, bt_circumference);
    setCircleOffsets('rest', rt_circle, rt_complete_circle, rt_circumference);
    ['work', 'break', 'rest'].forEach(mode => {
        const element = document.getElementById(`${mode}time_mins`);
        element.innerText = TIMER_CONFIG[mode].minutes.toString().padStart(2, '0');
    });
});

function setCircleOffsets(mode, circle, complete_circle, circumference) {
    const minutes = TIMER_CONFIG[mode].minutes;
    const offset = (minutes / 60) * circumference;
    circle.style.strokeDashoffset = circumference - offset;
    complete_circle.style.strokeDashoffset = minutes * 60 * (1 + POMODORO.speed_clock/POMODORO.speed_miniclock);
}
