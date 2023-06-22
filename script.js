// Global variable to store the todo list tasks
var todoList = [];

// Function to add a new task to the list
function addTask() {
  var newTaskInput = document.getElementById('newTaskInput');
  var newTaskName = newTaskInput.value;
  // console.log(newTaskName);

  // Create a task object with an ID and name
  var task = {
    // id: Date.now(),
    name: newTaskName
  };

  // Add the task to the todo list
  todoList.push(task);

  // Clear the input field
  newTaskInput.value = '';

  // Refresh the task list
  displayTasks();
}

// Function to display the tasks in the list
function displayTasks() {
  var taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  // Iterate over the todo list and create list items for each task
  for (var i = 0; i < todoList.length; i++) {
    var task = todoList[i];

    var listItem = document.createElement('li');
    listItem.innerHTML = task.name;

    // Add buttons for editing and deleting the task
    var editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', createEditTaskHandler(task, listItem));
    listItem.appendChild(editButton);

    var deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', createDeleteTaskHandler(task, listItem));
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  }
}

// Function  for editing a task
function createEditTaskHandler(task, listItem) {
  return function() {
    var taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.value = task.name;

    var saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.addEventListener('click', function() {
      task.name = taskNameInput.value;
      listItem.removeChild(taskNameInput);
      listItem.removeChild(saveButton);
      displayTasks();
    });


    var cancelButton = document.createElement('button');
    cancelButton.innerText = 'cancel';
    cancelButton.addEventListener("click", function() {
      taskNameInput.value = taskNameInput; // Reset the input field to the original value
      displayTasks()
    });

    listItem.innerHTML = '';
    listItem.appendChild(taskNameInput);
    listItem.appendChild(saveButton);
    listItem.appendChild(cancelButton);

  };
}

// Function  for deleting a task
function createDeleteTaskHandler(task, listItem) {
  return function() {
    var taskIndex = todoList.indexOf(task);
    if (taskIndex >-1) {
      todoList.splice(taskIndex, 1);
      listItem.parentNode.removeChild(listItem);
    }
  };
}

// Initial display of tasks
// displayTasks();