// Selecciona todos los elementos con la clase draggable
const draggables = document.querySelectorAll('.draggable');
const tasks_window = document.getElementById("tasks");
const tab_tasks = document.getElementById("tab-tasks");

// Añadir tab_tasks_resp para soporte responsive
const tab_tasks_resp = document.getElementById("tab-tasks-resp");

// Selecciona el elemento con el id pomodoro_core
const container = document.getElementById('pomodoro_core');

// Resetea el zIndex para que la última ventana siempre esté arriba
function resetzIndex() {
    const allWindows = [...document.querySelectorAll('.screen')];
    allWindows.forEach((window) => {
        window.style.zIndex = 1;
    });
}

// Por cada elemento draggable de la lista de draggables
draggables.forEach(draggable => {
    // Selecciona el header de la ventana
    const header = draggable.querySelector('.header');
    
    // Botones de control de ventanas
    
    const minimize = draggable.querySelector('.minimize');
    const maximize = draggable.querySelector('.maximize');
    const close = draggable.querySelector('.close');
    
    // Si tiene header le añadimos el evento mousedown al header
    if (header) {
        header.addEventListener('mousedown', onMouseDown);        
    } else {
        // En caso contrario el evento controla toda la ventana
        draggable.addEventListener('mousedown', onMouseDown);        
    }

    // Si la ventana tiene botones de control se les añade el evento
    if (minimize) {
        minimize.addEventListener("click", function () {
            draggable.classList.toggle("minimize");
            tasks_window.hidden = true;
            tab_tasks.hidden = false;
            tab_tasks_resp.hidden = false;
        });
        close.addEventListener("click", function(){
            draggable.classList.toggle("minimize");
            tasks_window.hidden = true;
            tab_tasks.hidden = false;
            tab_tasks_resp.hidden = false;
        });
    }

    function onMouseDown(event) {
        // Prevenir comportamiento por defecto
        event.preventDefault();
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        
        if (draggable.classList.contains("draggable")) {
            resetzIndex();
            draggable.style.zIndex = 2;
        }        
        const rect = draggable.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        
        function onMouseMove(event) {
            let newX = event.clientX - offsetX;
            let newY = event.clientY - offsetY;
            
            // Corregir límites del contenedor
            newX = Math.max(containerRect.left, Math.min(newX, containerRect.right - rect.width));
            newY = Math.max(containerRect.top, Math.min(newY, containerRect.bottom - rect.height));

            draggable.style.left = `${newX}px`;
            draggable.style.top = `${newY}px`;            
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }

});
