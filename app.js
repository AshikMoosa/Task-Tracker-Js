//Define UI vars
const form = document.querySelector("#task-form");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".collection");
const taskInput = document.querySelector("#task");

//loadEvent Listener
loadEventListeners();

//definition loadEvenetListener
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

//get tasks
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    //create list elemt to add task items
    const li = document.createElement("li");

    //add class to li
    li.className = "collection-item";

    //create text node and add to li
    li.appendChild(document.createTextNode(task));

    //create hyper link
    const link = document.createElement("a");

    //add class to link
    link.className = "delete-item secondary-content";

    //add icon to html
    link.innerHTML = "<i class='fa fa-remove'></i>";

    //append link to li
    li.appendChild(link);

    //add to collection
    taskList.appendChild(li);
  });
}

//add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  //create list elemt to add task items
  const li = document.createElement("li");

  //add class to li
  li.className = "collection-item";

  //create text node and add to li
  li.appendChild(document.createTextNode(taskInput.value));

  //create hyper link
  const link = document.createElement("a");

  //add class to link
  link.className = "delete-item secondary-content";

  //add icon to html
  link.innerHTML = "<i class='fa fa-remove'></i>";

  //append link to li
  li.appendChild(link);

  //add to collection
  taskList.appendChild(li);

  //Store in LS
  storeTaskInLocalStorage(taskInput.value);

  //clear input after adding
  taskInput.value = "";

  //prevent defaults
  e.preventDefault();
}

//Store tasks
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Do you want to remove?")) {
      e.target.parentElement.parentElement.remove();

      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

  e.preventDefault();
}

//remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //clear from LS
  clearTasksFromLocalStorage();
}

//clear from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//filter task
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
