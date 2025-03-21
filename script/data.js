import {updatePomodoroModes} from "./pomodoro.js"
import { POMODORO, TIMER_CONFIG } from "./pomodoro.js";
const statisticsData = {
    cyclesCompleted: 0,
    workTime: { completed: 0, nocompleted: 0 },
    breakTime: { completed: 0, nocompleted: 0 },
    restTime: { completed: 0, nocompleted: 0 },
    tasks: { completed: 0, nocompleted: 0 },
    tasksList: [
        {
            taskid:1,
            taskName: "Aprender JavaScript",
            completed: false,
            createdAt: "2025-02-08T12:34:56.789Z",
            totalWorkTime: null
        }
    ]
};

const settingsData = {
    workMode : 25,
    breakMode: 5,
    restMode: 15,
    autoStart: true,
    completeCycle: 4, 
    music: true
}

let  myStatisticsData = {}
let mySettingsData = {}

function checkLocalStorageData() {
    const localStorageData = JSON.parse(localStorage.getItem('statisticsData'));
    const localStorageSettings = JSON.parse(localStorage.getItem('settingsData'));
    if (!localStorageData) {
        console.log("No hay datos statisticsData en el localStorage, se guardan los datos por defecto.");
        localStorage.setItem('statisticsData', JSON.stringify(statisticsData));
    }
    if (!localStorageSettings) {
        console.log("No hay datos settingsData en el localStorage, se guardan los datos por defecto");
        localStorage.setItem('settingsData', JSON.stringify(settingsData));
    }
    myStatisticsData = JSON.parse(localStorage.getItem('statisticsData'));
    mySettingsData = JSON.parse(localStorage.getItem('settingsData'));
}

function updateSettingsData() {
    localStorage.setItem('settingsData', JSON.stringify(mySettingsData));
    localStorage.setItem('statisticsData', JSON.stringify(myStatisticsData));
    updatePomodoroModes();
}

function pomodoroCompleted(mode, completed) {
    if (!(mode in TIMER_CONFIG)) {
        console.error("El modo no existe");
        return;
    }
    const modeProperty = mode + "Time";
    if (!completed) {
        myStatisticsData[modeProperty].nocompleted += 1;
    } else {
        myStatisticsData[modeProperty].nocompleted -= 1;
        myStatisticsData[modeProperty].completed += 1;
    }
    updateSettingsData();
}

export { mySettingsData, checkLocalStorageData, updateSettingsData, pomodoroCompleted }

