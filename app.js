const form = document.getElementById('form');
const input = document.getElementById('input');
const tasksUL = document.getElementById('tasks');

const tasks = JSON.parse(localStorage.getItem('tasks'));

if (tasks) {
  tasks.forEach((task) => addTask(task));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  addTask();
});

function addTask(task) {
  let taskText = input.value;

  if (task) {
    taskText = task.text;
  }

  if (taskText) {
    const taskEl = document.createElement('li');
    if (task && task.completed) {
      taskEl.classList.add('completed');
    }

    taskEl.innerText = taskText;

    taskEl.addEventListener('click', () => {
      taskEl.classList.toggle('completed');
      updateLS();
    });

    taskEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      taskEl.remove();
      updateLS();
    });

    tasksUL.appendChild(taskEl);

    input.value = '';

    updateLS();
  }
}

function updateLS() {
  tasksElement = document.querySelectorAll('li');

  const tasks = [];

  tasksElement.forEach((taskEl) => {
    tasks.push({
      text: taskEl.innerText,
      completed: taskEl.classList.contains('completed'),
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
