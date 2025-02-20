const estatisticsData = {
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



/**
 * observerObjectData convierte un objeto en un Proxy que vigila los accesos y modificaciones.
 * - Lanza un error si se accede a una propiedad inexistente.
 * - Verifica que el tipo de dato sea correcto antes de modificarlo.
 * - Guarda automáticamente los cambios en localStorage.
 */
function observerObjectData(object) {
    return new Proxy(object, {
        get(object, property) {
            // Si la propiedad no existe, lanza un error
            if (!(property in object)) {
                throw new Error(`La propiedad "${prop}" no existe en initialData`);
            }

            let value = object[ property ]

            // Si el valor es un objeto, lo hace observable también (usando recursividad)

            return ((typeof value === "object") && (value !== null))
                ? observerObjectData(value)
                : value;

        },

        // Intercepta cuando se intenta modificar una propiedad del objeto observado
        set(object, property, value) {
            // Verifica que el tipo de dato sea el mismo que el original
            if (typeof object[ property ] !== typeof value) {
                throw new Error(`Tipo de dato incorrecto para la propiedad "${property}"`)
            }

            // Muestra un mensaje en la consola indicando que se ha actualizado
            console.log(`El objeto estatisticsData ha sido actualizado y almacenado en localStorage.`);

            // Asigna el nuevo valor a la propiedad
            object[ property ] = value;

            // Guarda los cambios en localStorage
            localStorage.setItem('storageData', JSON.stringify(estatisticsData));

            return true;
        },
    })
}

/**
 * Crea una versión observable de estatisticsData usando observerObjectData.
 * - Esto permite detectar accesos y modificaciones en el objeto.
 * - Cualquier cambio en proxyData se reflejará en estatisticsData y se guardará en localStorage automáticamente.
 * - Es importante trabajar con proxyData en lugar de estatisticsData para mantener la vigilancia activa.
 */


const proxyData = observerObjectData(estatisticsData);

/**
 * updateDataFromLocalStorage recupera los datos de localStorage y actualiza estatisticsData.
 * - Si hay datos guardados, los parsea y los aplica a estatisticsData.
 * - Mantiene la referencia original del objeto para que el Proxy siga funcionando.
 * - Actualiza arrays y objetos sin perder propiedades existentes.
 */
function updateDataFromLocalStorage() {
    const dataFromStorage = localStorage.getItem('storageData');

    if (dataFromStorage) {
        const parsedData = JSON.parse(dataFromStorage);

        // Actualiza las propiedades de estatisticsData con los datos guardados
        for (let key in estatisticsData) {
            if (parsedData.hasOwnProperty(key)) {
                if (Array.isArray(estatisticsData[ key ])) {
                    estatisticsData[ key ].length = 0; // Vacía el array
                    estatisticsData[ key ].push(...parsedData[ key ]); // Copia los nuevos valores
                } else if (typeof estatisticsData[ key ] === 'object' && estatisticsData[ key ] !== null) {
                    Object.assign(estatisticsData[ key ], parsedData[ key ]); // Copia propiedades sin perder la referencia
                } else {
                    estatisticsData[ key ] = parsedData[ key ]; // Reemplaza valores primitivos
                }
            }
        }
    }
}

updateDataFromLocalStorage(estatisticsData);

function addModeTimeProxyData(modeTime, completed = true, nocompleted = false) {

    if (nocompleted) proxyData[modeTime].nocompleted++;

    (completed) ? proxyData[modeTime].completed++ : proxyData[modeTime].nocompleted--;

};

function addCyclesCompleted() {
    proxyData.cyclesCompleted++
}


function addTaskToProxyData(object){
    if (typeof object !== "object"){
        throw new Error('El argumento tiene que ser un objeto');
    }
    proxyData.tasksList.push(object)
    console.log('Se ha añadido una nueva tarea');
}

function deleteTaskProxyData(id){
    const taskIndex = proxyData.tasksList.findIndex(task => task.taskid=== id);


    if(taskIndex!==-1){
        proxyData.tasksList.splice(taskIndex, 1);
        console.log(`Tarea con taskid ${taskid} eliminada.`);
    }else{
        console.warn(`Tarea con taskid ${taskid} no encontrada.`);
    }
}


addModeTimeProxyData("workTime",true);
addModeTimeProxyData(true);
