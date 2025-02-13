const tabTasks = document.getElementById('tab-tasks');
const tabTasksresp = document.getElementById('tab-tasks-resp');
const tasksWindow = document.getElementById('tasks');
const taskWindowControls = document.getElementById('tasks-window-controls');
const tasksList = document.getElementById('task-list');
const moreItems = document.getElementById('more-items');
const formNewTask = document.getElementById('add-task');
const formConfirmDeleteTask = document.getElementById('task-deleteConfirmation');


let draggedItem = null;

//insert new task
const insertTask=(item)=>{
  const tasksItems = tasksWindow.querySelectorAll('li');
  // busca la ultima tarea sin terminar para inserta la nueva tarea
  let lastNonFinishedTask = null;
  for (let i = 0; i < tasksItems.length; i++) {
    if (!tasksItems[i].classList.contains('task-finished')) {
      lastNonFinishedTask = tasksItems[i];
    }
  }
  //insertamos la tarea
  if (lastNonFinishedTask) {
    tasksList.insertBefore(item, lastNonFinishedTask.nextSibling);
  } else {
    tasksList.appendChild(item);
  }
}

//edit task
const editTask = (form, itemIndex) => {
  const itemsArray = Array.from(tasksList.children);
  const itemToEdit = itemsArray[itemIndex];

  itemToEdit.querySelector('.task-text').innerText = form.querySelector('#task-name').value;

  if (form.querySelector('#task-finish').checked) {
    itemToEdit.classList.add('task-finished');
    itemToEdit.draggable=false;
  } else {
    itemToEdit.classList.remove('task-finished');
    itemToEdit.draggable=true;
  }
}

//delete task
const deleteTask = (item) => {
  formConfirmDeleteTask.querySelector("#task-delete-name").innerText = item.querySelector(".task-text").innerText;  
  tasksList.hidden = true;
  moreItems.hidden = true;

  formConfirmDeleteTask.addEventListener('click', (e) => {
    if (e.target.type === 'button') {
      closeForm(formConfirmDeleteTask);
    } else if (e.target.type === 'submit') {
      e.preventDefault();
      item.remove();
      closeForm(formConfirmDeleteTask);
    } else {
      return;
    }
  });
}

//add task
const addNewTask = (form) => {
  const tasksItems = tasksWindow.querySelectorAll('li');

  // se crea el nuevo elemento
  const taskName = form.querySelector('#task-name').value.trim();
  const taskStateFinished = form.querySelector('#task-finish').checked;
  const finishClass = taskStateFinished ? "task-finished" : "";
  const item = document.createElement('li');

  console.log(tasksList.getAttribute('data-minimized'));
  console.log(tasksItems);

  item.classList.add("task");
  if (tasksList.getAttribute('data-minimized') === "true" && !tasksItems[1].classList.contains('task-finished')) {
    item.style.display = 'none';
  }
  if (finishClass) { item.classList.add(finishClass) }
  item.draggable=taskStateFinished ? false:true;

  item.innerHTML = `
    <span class="task-text">${taskName}</span>
    <div class="task-buttons">
      <button class="edit"><img src="./img/svg/edit.svg"></button>
      <button class="finish"><img src="./img/svg/check.svg"></button>
      <button class="delete"><img src="./img/svg/delete.svg"></button>
    </div>
  `;
  //insertamos la tarea
  insertTask(item);

  // Añadimos eventos drag and drop
  item.addEventListener("dragstart", (e) => {
    draggedItem = item;
    e.dataTransfer.effectAllowed = "move";
  });

  item.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  item.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggedItem !== item) {
      const draggedIndex = Array.from(tasksList.children).indexOf(draggedItem);
      const targetIndex = Array.from(tasksList.children).indexOf(item);

      if (draggedIndex < targetIndex) {
        tasksList.insertBefore(draggedItem, item.nextSibling);
      } else {
        tasksList.insertBefore(draggedItem, item);
      }
    }
  });

}

//submit form
const submitAddForm = (form) => {
  const itemIndex = form.getAttribute('data-item');
  if (itemIndex === null) {
    addNewTask(form);
  } else {
    editTask(form, itemIndex);
  }
  closeForm(form);
};

//close form
const closeForm = (form) => {
  form.removeAttribute('data-submit');
  //form.reset();
  form.hidden = true;
  tasksList.hidden = false;
  if (tasksList.getAttribute('data-minimized') === "true") {
    moreItems.hidden = false;
  }
}

//open form
const openAddForm = (itemToEdit = "") => {
  tasksList.hidden = true;
  formNewTask.hidden = false;
  moreItems.hidden = true

  if (!itemToEdit) {
    formNewTask.reset();
    formNewTask.removeAttribute('data-item');
  } else {
    const itemsArray = Array.from(tasksList.children);
    const itemIndex = itemsArray.indexOf(itemToEdit);
    formNewTask.setAttribute('data-item', itemIndex);
    formNewTask.querySelector('#task-name').value = itemToEdit.querySelector('.task-text').innerText;
    if (itemToEdit.classList.contains('task-finished')) {
      formNewTask.querySelector('#task-finish').checked = true;
    }
  }
}

// Formulario
const handleFormEvent = (event) => {
  const form = event.target.closest('form');
  if (event.target.type === 'checkbox') {
    return;
  } else if (event.type === 'submit') {
    event.preventDefault();
    submitAddForm(form);
  } else if (event.target.matches('button[class="form-cancel"]')) {
    closeForm(form);
  }
}

// Items de tareas
const handleTaskControl = (e) => {
  const itemClicked = e.target.closest('li');
  if (itemClicked.id === 'new-task') {
    openAddForm();
  } else {
    const taskButton = e.target.closest('button');
    if (!taskButton) {
      return
    } else if (taskButton.classList.contains('finish')) {
      itemClicked.classList.add('task-finished');
      if (tasksList.getAttribute('data-minimized') === "true") {
        itemClicked.style.display = 'none';
      }
    } else if (taskButton.classList.contains('delete')) {
      tasksList.hidden = true;
      formConfirmDeleteTask.hidden = false;
      deleteTask(itemClicked);
    } else if (taskButton.classList.contains('edit')) {
      openAddForm(itemClicked);
    }
  }
}

//close Task Window
const closeTaskWindow = () => {
  tabTasks.hidden = false;
  tabTasksresp.hidden = false;
  tasksWindow.hidden = true;
  closeForm(formNewTask);
  closeForm(formConfirmDeleteTask);
}
//maximize Task Window
const maximizeTaskWindow = () => {
  const tasks = document.querySelectorAll(".task");
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].style.display = 'flex';
  }
  tasksList.setAttribute('data-minimized', 'false');
  moreItems.hidden = true;
}
//minimize TAsk Window
const minimizeTaskWindow = () => {
  const tasks = document.querySelectorAll(".task");
  if (tasks.length > 0) {
    const startIndex = tasks[0].classList.contains('task-finished') ? 0 : 1;
    for (let i = startIndex; i < tasks.length; i++) {
      tasks[i].style.display = 'none';
    }
    tasksList.setAttribute('data-minimized', 'true');
    moreItems.hidden = false;
  }
}

// coltroles de la ventana
const handleWindowControl = (e) => {
  const action = e.target.id;


  switch (action) {
    case "tasks-close":
      closeTaskWindow();
      break;
    case "tasks-maximize":
      maximizeTaskWindow();
      break;
    case "tasks-minimize":
      minimizeTaskWindow();
      break;
    default:
      break;
  }
}

//---------------------//
//   EVENT LISTENERS   //
//---------------------//

// Pestaña
tabTasks.addEventListener('click', () => {
  tabTasks.hidden = true;
  tabTasksresp.hidden = true;
  tasksWindow.hidden = false;
});
tabTasksresp.addEventListener('click', () => {
  tabTasks.hidden = true;
  tabTasksresp.hidden = true;
  tasksWindow.hidden = false;
});

taskWindowControls.addEventListener("click", handleWindowControl);
tasksList.addEventListener("click", handleTaskControl);
formNewTask.addEventListener('click', handleFormEvent);
formNewTask.addEventListener('submit', handleFormEvent);


