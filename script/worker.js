let totalSegundos;

// Recibir el tiempo inicial desde el script principal
self.onmessage = function (e) {
    if (e.data.action === "start") {
        totalSegundos = e.data.time;
        speed = e.data.speed;
        runTimer();
    } else if (e.data.action === "pause") {
        clearInterval(self.interval);
    }
};

// Función que maneja el temporizador
function runTimer() {
    self.interval = setInterval(() => {
        if (totalSegundos > 0) {
            totalSegundos--;
            self.postMessage({ timeLeft: totalSegundos });
        } else {
            clearInterval(self.interval);
            self.postMessage({ finished: true });
        }
    }, speed);
}