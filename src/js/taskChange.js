
import { loadTasks,renderTasks } from './loadTask';

let tasks = await loadTasks();


export function addTask() 
{
    showAddTaskForm();
}


function showAddTaskForm() {
    const popup = document.getElementById('task-form-popup');
    popup.style.display = 'block'; // Show the form
}

export function closeAddTaskForm() {
    const popup = document.getElementById('task-form-popup');
    popup.style.display = 'none'; // Hide the form
}

// Handle the form submission
export function handleAddTask(event) {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('task-due').value;
    const priority = document.getElementById('task-priority').value;
    const important = document.getElementById('task-important').checked;


    // Create a new task object
    const newTask = {
        project_id: "1",         
        task_id: (tasks.length + 1).toString(),
        title,
        desc,
        dueDate,
        priority,
        done: "false", // Task is initially not done
        important: important.toString(),
    };

    console.log(tasks);
    // Here we would update the serverside json..
    tasks.push(newTask);
    console.log(tasks);
    // Close the popup form after submission
    closeAddTaskForm();

    // Refresh the tasks list
    renderTasks(tasks);
}

// Initialize the Add Task Button and Form
export function initAddTaskForm() {
    const form = document.getElementById('task-form');
    const closeBtn = document.getElementById('close-btn');

    // Close the form when the close button is clicked
    closeBtn.addEventListener('click', closeAddTaskForm);

    // Handle form submission
    form.addEventListener('submit', handleAddTask);
}
