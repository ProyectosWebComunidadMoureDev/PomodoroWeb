import {TIMER_CONFIG, POMODORO} from "./pomodoro.js"

const wt_minutes_input = document.getElementById("worktime_minutes");
const bt_minutes_input = document.getElementById("breaktime_minutes");
const rt_minutes_input = document.getElementById("resttime_minutes");
const auto_start = document.getElementById("auto_start");
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
    TIMER_CONFIG.work.minutes = parseInt(wt_minutes_input.value);
    TIMER_CONFIG.break.minutes = parseInt(bt_minutes_input.value);
    TIMER_CONFIG.rest.minutes = parseInt(rt_minutes_input.value);
    POMODORO.completeCycle = rest_interval.value;
    POMODORO.auto_start = auto_start.checked;
    close_modal();
})

cancel_settings.addEventListener("click", () => {
    close_modal();
});

window.addEventListener("load", () => {
    load_data();
});

function load_data() {
    wt_minutes_input.value = TIMER_CONFIG.work.minutes;
    bt_minutes_input.value = TIMER_CONFIG.break.minutes;
    rt_minutes_input.value = TIMER_CONFIG.rest.minutes;
    rest_interval.value = POMODORO.completeCycle;
    auto_start.checked = POMODORO.auto_start;
}