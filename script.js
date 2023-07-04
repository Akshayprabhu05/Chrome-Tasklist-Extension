// script.js

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('task');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    // Create a new task item
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');

    // Create a checkbox and label for the task
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', updateTaskStatus);

    const label = document.createElement('label');
    label.textContent = taskText;

    // Create a delete button for the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);

    // Append checkbox, label, and delete button to the task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(deleteButton);

    // Append the task item to the task list
    taskList.appendChild(taskItem);

    // Clear the task input field
    taskInput.value = '';

    // Update task count
    updateTaskCount();

    // Save tasks to local storage
    saveTasksToLocalStorage();
  }
}

// Function to update the task status (completed or not)
function updateTaskStatus(event) {
  const checkbox = event.target;
  const taskItem = checkbox.parentElement;

  if (checkbox.checked) {
    taskItem.classList.add('completed');
  } else {
    taskItem.classList.remove('completed');
  }

  // Update task count
  updateTaskCount();

  // Save tasks to local storage
  saveTasksToLocalStorage();
}

// Function to delete a task
function deleteTask(event) {
  const deleteButton = event.target;
  const taskItem = deleteButton.parentElement;

  // Remove the task item from the task list
  taskItem.remove();

  // Update task count
  updateTaskCount();

  // Save tasks to local storage
  saveTasksToLocalStorage();
}

// Function to update the task count (completed and remaining tasks)
function updateTaskCount() {
  const completedCount = document.querySelectorAll('.completed').length;
  const remainingCount = document.querySelectorAll('li:not(.completed)').length;

  const completedCountElement = document.getElementById('completed-count');
  const remainingCountElement = document.getElementById('remaining-count');

  completedCountElement.textContent = completedCount;
  remainingCountElement.textContent = remainingCount;
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  const taskList = document.getElementById('task-list');
  const tasks = [];

  // Loop through each task item and save its text and status
  taskList.querySelectorAll('li').forEach((taskItem) => {
    const taskText = taskItem.querySelector('label').textContent;
    const isCompleted = taskItem.classList.contains('completed');
    tasks.push({ text: taskText, completed: isCompleted });
  });

  // Convert the tasks array to JSON and store it in local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage and populate the task list
function loadTasksFromLocalStorage() {
  const tasksJSON = localStorage.getItem('tasks');
  if (tasksJSON) {
    const tasks = JSON.parse(tasksJSON);

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    // Loop through the tasks and recreate the task items
    tasks.forEach((task) => {
      const taskItem = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', updateTaskStatus);

      const label = document.createElement('label');
      label.textContent = task.text;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', deleteTask);

      taskItem.appendChild(checkbox);
      taskItem.appendChild(label);
      taskItem.appendChild(deleteButton);

      if (task.completed) {
        taskItem.classList.add('completed');
      }

      taskList.appendChild(taskItem);
    });

    // Update task count
    updateTaskCount();
  }
}

// Add event listener to the "Add" button when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  const addTaskButton = document.getElementById('addTaskButton');
  addTaskButton.addEventListener('click', addTask);

  // Load tasks from local storage when the DOM is loaded
  loadTasksFromLocalStorage();
});
