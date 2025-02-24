# Documentación del Proyecto Pomodoro Web
![image](https://github.com/user-attachments/assets/bd01b0b5-3c56-499e-8467-ce542ff33bbc)

## 📌 1. Introducción

### Descripción del Proyecto

PomodoroWeb es una aplicación web basada en la técnica de gestión del tiempo Pomodoro.

Permite a los usuarios dividir su trabajo en intervalos de enfoque y descanso para mejorar la productividad.

### Objetivo y Funcionalidad Principal
El objetivo principal del proyecto es proporcionar una herramienta simple y efectiva para gestionar el tiempo de trabajo mediante sesiones cronometradas. Los usuarios pueden:

- Iniciar, pausar y reiniciar un temporizador Pomodoro.
- Configurar la duración de los intervalos de trabajo y descanso.
- Hacer seguimiento de sus sesiones para mejorar su productividad.

### Público Objetivo
PomodoroWeb está diseñado para:

- Estudiantes que desean mejorar su concentración.
- Profesionales que buscan optimizar su tiempo de trabajo.
- Cualquier persona interesada en aplicar la técnica Pomodoro en su rutina diaria.

## 📌 2. Funcionamiento del Temporizador
El temporizador Pomodoro en la aplicación funciona siguiendo la metodología estándar de la técnica Pomodoro:

### 1. Inicio de sesión de trabajo:
  - El usuario presiona el botón "Iniciar".
  - El temporizador comienza a contar regresivamente desde la duración configurada (por defecto, 25 minutos).
  - Se activa una animación visual para indicar que la sesión está en curso.

### 2. Pausa:
  - El usuario puede presionar "Pausar" para detener temporalmente el temporizador.
  
### 3. Finalización de una sesión:
  - Cuando el temporizador llega a cero, se activa una alerta sonora y/o visual.
  - Se inicia automáticamente el periodo de descanso si la opción de auto-inicio está activada. (pendiente de implementar)

### 4. Modo de descanso:
  - Tras finalizar una sesión de trabajo, comienza el temporizador de descanso.
  - Se diferencia entre descansos cortos (5 minutos) y largos (15 minutos), dependiendo de la cantidad de sesiones completadas.

### 5. Registro de sesiones:
  - Se almacena el número de sesiones completadas para que el usuario pueda llevar un seguimiento de su productividad.

El código que controla estas funcionalidades está en script/pomodoro.js, gestionando los estados del temporizador y la interacción con la interfaz de usuario.

## 📌 3. Estructura del Proyecto
### HTML
- **index.html**: Estructura principal de la aplicación Pomodoro
### CSS
- **css/styles.css**: Estilos principales y diseño de la interfaz
- **css/variables.css**: Variables CSS para colores y configuraciones globales
- **css/reset.css**: Reset de estilos CSS para consistencia entre navegadores
### JS
- **script/main.js**: Código principal para la interacción de la aplicación.
- **script/taskList.js**: Manejo de la lista de tareas del usuario.
- **script/pomodoro.js**: Lógica principal del temporizador
- **script/worker.js**: Worker para el manejo del temporizador en segundo plano
- **script/dragdrop.js**: Sistema drag&drop para la ventanas

## 📌 4. Tecnologías Utilizadas
- HTML5 – Para la estructura del contenido.
- CSS3 – Para la presentación y diseño responsivo.
- JavaScript – Para la interactividad y manejo de eventos.

## 📌 5. Estructura HTML
El archivo HTML principal es index.html, el cual contiene la estructura base de la aplicación Pomodoro. Este archivo se organiza en distintas secciones:

![Pomodoro_HTML](https://github.com/user-attachments/assets/2e57e926-0bba-4efd-857f-888c67098e11)

- Encabezado (`<header>`): Contiene el título de la aplicación, el menú y los botones para los distintos estados del Pomodoro (work, break y rest).
- Contenedor principal (`<main>`): Se divide en varios `<section>`:
  - `pomodoro_section`
    - `tabs`: Botones para desplegar las pantallas de Tareas y Estadísticas.
    - `pomodoro_core`: Contiene el `timer`.
    - `pomodoro_bottom`: Botones de START y PAUSE.
  - `pomodoro-description`: Explicación de la técnica Pomodoro.
  - `comunity-description`: La Comunidad.
  - `tasks`: Ventana de Tareas, oculta por defecto.
  - `statistics`: Ventana de Estadísticas, oculta por defecto.
- Pie de página (`<footer>`): Información sobre el proyecto. Enlaces a los distintos equipos que formaron parte del proyecto y a La Comunidad de Moure

## 📌 6. Variables CSS
Las siguientes variables están definidas en css/variables.css y se utilizan para mantener una coherencia en los colores, tipografía y tamaños dentro de la aplicación.
### Colores
```css
:root {    
  --bg-color-main: #1A1A1A; /* Color de Fondo */
  --bg-color-alt: #212121;  /* Color de Fondo Secundario */
  --gray-color: #515151;    /* Color Gris */   
  --blue-color: #3EB0F9;    /* Color Azul */        
  --green-color: #00aa47;   /* Color Verde */    
  --red-color: #FF0000;     /* Color Rojo */
  --orange-color: #ff5500;  /* Color Naranja */
  --yellow-color: #ffa61e;  /* Color Amarillo */
  --purple-color: #7D00FE;  /* Color Morado */
  --white-color: #f5f5f5;   /* Color Blanco */
  --clock_color: #3EB0F9;
}
```
### Tipografía
```css
:root {
    --font-family-main: "Poppins";
    --text-color-main: #f5f5f5;    
}
```
### Tamaños de Fuente
```css
:root {
    --font-size-xxsmall: 0.5rem;
    --font-size-xsmall: 0.75rem;
    --font-size-small: 0.875rem;
    --font-size-medium: 1rem;
    --font-size-regular: 1.25rem;
    --font-size-large: 1.5rem;
    --font-size-xlarge: 1.75rem;
    --font-size-xxlarge: 2.5rem;
    --font-size-xxxlarge: 4.5rem;       
}
```
### Dimensiones de Elementos del Reloj Pomodoro
```css
:root {
    --segment_width: 45px;
    --segment_height: 10px;
    --digits_space: 80px;
}
```

## 📌 7. JavaScript
### 📁 main.js
Script para el manejo del menú de navegación.
#### Elementos DOM
- **menuBtn**: Botón para abrir/cerrar el menú
- **menuContent**: Contenedor del menú desplegable
### Event Listeners
- **click (window)**: Cierra el menú al hacer clic fuera
- **keydown (window)**: Cierra el menú al presionar Escape
- **click (menuBtn)**: Alterna el estado del menú
### Funciones
- **openMenu()**
  - Abre el menú
  - Añade la clase 'show'
  - Actualiza aria-expanded a true
  - Establece el foco en el menú

- **closeMenu()**
  - Cierra el menú
  - Remueve la clase 'show'
  - Actualiza aria-expanded a false

- **toggleMenu()**
  - Alterna entre abrir y cerrar el menú
  - Verifica el estado actual con aria-expanded
  - Llama a openMenu() o closeMenu() según corresponda

### 📁 worker.js
Web Worker para manejar el temporizador en segundo plano.
#### Variables
- **totalSegundos**: Almacena el tiempo restante en segundos
#### Event Handlers
- **onmessage**
  - Maneja los mensajes recibidos del script principal
  - Acciones:
    - "start": Inicia el temporizador con el tiempo especificado
    - "pause": Detiene el temporizador
#### Funciones
- **runTimer()**
  - Inicia el intervalo del temporizador
  - Decrementa totalSegundos cada segundo
  - Envía mensajes al script principal:
    - `{ timeLeft: totalSegundos }`: Actualización del tiempo restante
    - `{ finished: true }`: Cuando el temporizador llega a cero
#### Comunicación
- **Mensajes Recibidos**
  ```javascript
  { 
    action: "start" | "pause",
    time: number // Solo para action "start"
  }
- **Mensajes Enviados**
```javascript
{ timeLeft: number } | { finished: true }
```

### 📁 taskList.js
Gestión de la lista de tareas y su interfaz.
#### Elementos DOM
- **tabTasks, tabTasksresp**: Pestañas para mostrar/ocultar ventana de tareas
- **tasksWindow**: Ventana principal de tareas
- **taskWindowControls**: Controles de la ventana (minimizar, maximizar, cerrar)
- **tasksList**: Lista de tareas
- **moreItems**: Botón para mostrar más tareas
- **formNewTask**: Formulario para añadir/editar tareas
- **formConfirmDeleteTask**: Formulario de confirmación para eliminar tareas
#### Variables Globales
- **draggedItem**: Elemento siendo arrastrado en drag & drop
#### Funciones Principales
##### Gestión de Tareas
- **insertTask(item)**: Inserta una nueva tarea en la lista
- **editTask(form, itemIndex)**: Edita una tarea existente
- **deleteTask(item)**: Elimina una tarea
- **addNewTask(form)**: Crea y añade una nueva tarea
##### Gestión de Formularios
- **submitAddForm(form)**: Procesa el envío del formulario
- **closeForm(form)**: Cierra un formulario
- **openAddForm(itemToEdit)**: Abre el formulario para añadir/editar
- **handleFormEvent(event)**: Maneja eventos del formulario
##### Control de Ventana
- **closeTaskWindow()**: Cierra la ventana de tareas
- **maximizeTaskWindow()**: Maximiza la ventana
- **minimizeTaskWindow()**: Minimiza la ventana
- **handleWindowControl(e)**: Maneja los controles de ventana
##### Eventos de Tareas
- **handleTaskControl(e)**: Maneja acciones sobre las tareas
  - Marcar como completada
  - Editar
  - Eliminar
#### Características
- Drag & Drop para reordenar tareas
- Minimización/maximización de ventana
- Marcado de tareas completadas
- Confirmación para eliminar tareas
- Responsive (versión móvil y escritorio)

### 📁 dragdrop.js
Este código permite gestionar la funcionalidad de ventanas arrastrables en una interfaz de usuario.

Se pueden mover, minimizar y cerrar las ventanas dentro de un contenedor predefinido.
#### Elementos Seleccionados
- `draggables`: Selecciona todos los elementos con la clase `draggable`.
- `tasks_window`: Elemento con el ID `tasks`, ventana con la interfaz de tareas.
- `tab_tasks`: Elemento con el ID `tab-tasks`, botón para abrir la ventana de tareas.
- `tab_tasks_resp`: Elemento con el ID `tab-tasks-resp`, versión responsive del botón.
- `container`: Elemento con el ID `pomodoro_core`, contenedor principal de las ventanas.
#### Funcionalidad
1. Resetear zIndex
La función `resetzIndex()` establece el zIndex de todas las ventanas a 1, asegurando que la última ventana arrastrada quede en primer plano.
2. Configuración de Eventos
Para cada elemento en draggables:
- Se obtiene el `header` para detectar eventos de arrastre.
- Se seleccionan los botones `minimize`, `maximize` y `close` si existen.
- Se asigna un evento `mousedown` al `header` o al elemento `draggable` completo si no tiene `header`.
- Se asignan eventos a los botones de minimizar y cerrar:
  - Minimizar (`minimize`): Alterna la clase `minimize` y oculta `tasks_window`, mostrando `tab_tasks` y `tab_tasks_resp`.
  - Cerrar (`close`): Se ejecuta la misma acción que el botón de minimizar.
3. Manejo del Arrastre
Cuando se detecta un `mousedown` en una ventana:
- Se previene el comportamiento por defecto.
- Se añade `mousemove` y `mouseup` al documento.
- Se ajusta el `zIndex` para traer la ventana al frente.
- Se calculan las posiciones iniciales y se establecen límites dentro del container.
- Durante `mousemove`, la posición de la ventana se actualiza respetando los límites.
- En `mouseup`, se eliminan los eventos de movimiento.

### 📁 pomodoro.js
Script principal que maneja la funcionalidad del temporizador Pomodoro.
#### Objetos Principales
##### TIMER_CONFIG
Configuración de los diferentes modos del temporizador
- **work**: { minutes: 25, color: '--blue-color' }
- **break**: { minutes: 5, color: '--orange-color' }
- **rest**: { minutes: 15, color: '--green-color' }
##### POMODORO
Estado global del temporizador
- **mode**: Modo actual ('work', 'break', 'rest')
- **roundsCompleted**: Contador de rondas completadas
- **totalSeconds**: Duración total en segundos
- **remainingTime**: Tiempo restante en segundos
- **completeCycle**: Número de ciclos para descanso largo (4)
##### NUMBERS
Configuración de segmentos para el display de 7 segmentos
- Representación binaria de números (0-9)
- Cada dígito: 7 bits para los segmentos
#### Elementos DOM
- **Círculos de Progreso**: circle, outcircle, incircle
- **Display**: segments, separator, separator_two
- **Botones de Modo**: worktime_btn, breaktime_btn, resttime_btn
- **Botones de Control**: start_btn, pause_btn
- **Audio**: ALARM_WARNING
#### Funciones Principales
##### Control del Temporizador
- **setMode(mode)**: Configura el modo del temporizador
- **startPomodoro()**: Inicia el temporizador
- **pausePomodoro()**: Pausa el temporizador
- **timerComplete()**: Maneja la finalización del temporizador
- **stopWorker()**: Detiene el worker del temporizador
##### Display y UI
- **formatClock(seconds)**: Formatea el tiempo para el display
- **updateclock(m, mm, s, ss)**: Actualiza los dígitos del display
- **draw_number(number, id)**: Dibuja un número en el display
- **blink_separators()**: Hace parpadear los separadores
- **setProgress(percentage)**: Actualiza el círculo de progreso
- **changeColor(colorVar)**: Cambia el color según el modo
##### Control de Estados
- **blockModes()**: Deshabilita los botones de modo
- **unlockModes()**: Habilita los botones de modo
- **playAlarm()**: Reproduce la alarma
- **stopAlarm()**: Detiene la alarma
#### Características
- Display de 7 segmentos
- Círculo de progreso animado
- Cambio de colores por modo
- Worker para el temporizador
- Alarma sonora
- Modos responsive


## 📌 8. Mantenimiento y Contribución
### Guía para desarrollo y mejoras
### Cómo reportar errores y sugerencias
## 📌 9. Futuras Mejoras
### Funcionalidades planeadas o ideas para mejorar el proyecto
