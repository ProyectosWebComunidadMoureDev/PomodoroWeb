import {TIMER_CONFIG, POMODORO, initPomodoro, updatePomodoroModes} from "./pomodoro.js"
import {mySettingsData, checkLocalStorageData, updateSettingsData} from "./data.js"

const wt_minutes_input = document.getElementById("worktime_minutes");
const bt_minutes_input = document.getElementById("breaktime_minutes");
const rt_minutes_input = document.getElementById("resttime_minutes");
const auto_start = document.getElementById("auto_start");
const music = document.getElementById("music");
const rest_interval = document.getElementById("rest_interval");


const btn_settings = document.getElementById("btn_settings");
const close_btn = document.getElementById("settings-close");
const save_settings = document.getElementById("save-settings");
const cancel_settings = document.getElementById("cancel-settings");

btn_settings.addEventListener("click", () => {
    load_data();
    document.getElementById("settings").style.display = "block";
});

close_btn.addEventListener("click", () => {
    close_modal();
});

function close_modal() {
    document.getElementById("settings").style.display = "none";
}

save_settings.addEventListener("click", () => {
    save_data();    
})

cancel_settings.addEventListener("click", () => {
    close_modal();
});

window.addEventListener("load", () => {
    load_data();
    updatePomodoroModes();
});

function save_data() {
    TIMER_CONFIG.work.minutes = parseInt(wt_minutes_input.value);
    TIMER_CONFIG.break.minutes = parseInt(bt_minutes_input.value);
    TIMER_CONFIG.rest.minutes = parseInt(rt_minutes_input.value);    
    POMODORO.completeCycle = rest_interval.value;
    POMODORO.auto_start = auto_start.checked;
    POMODORO.music = music.checked;
    mySettingsData.workMode = TIMER_CONFIG.work.minutes;
    mySettingsData.breakMode = TIMER_CONFIG.break.minutes;
    mySettingsData.restMode = TIMER_CONFIG.rest.minutes;
    mySettingsData.autoStart = POMODORO.auto_start;
    mySettingsData.completeCycle = POMODORO.completeCycle;
    mySettingsData.music = POMODORO.music;
    close_modal();
    updateSettingsData();
    updatePomodoroModes();
}

function load_data() {
    checkLocalStorageData();
    TIMER_CONFIG.work.minutes = mySettingsData.workMode;
    TIMER_CONFIG.break.minutes = mySettingsData.breakMode;
    TIMER_CONFIG.rest.minutes = mySettingsData.restMode;
    wt_minutes_input.value = mySettingsData.workMode;
    bt_minutes_input.value = mySettingsData.breakMode;
    rt_minutes_input.value = mySettingsData.restMode;
    rest_interval.value = mySettingsData.completeCycle;
    auto_start.checked = mySettingsData.autoStart;
    music.checked = mySettingsData.music;    
}
