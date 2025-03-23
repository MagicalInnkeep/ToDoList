import { loadSettings } from "./settings";

export async function loadTasks() {
    try {
        const response = await fetch('./data.json');  // Fetch the JSON data
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();  // Parse JSON response
        return data.tasks || [];  // Return only the tasks array, or an empty array if no tasks
    } catch (error) {
        console.error("Error loading tasks, using default:", error);
        return [];  // Provide fallback as an empty array
    }
}


export async function filterTasks(filter){
    const data = await loadTasks();
    return data.filter(task => {
        return (
            (!filters.project_id || task.project_id === filters.project_id) &&
            (!filters.priority || task.priority === filters.priority) &&
            (!filters.title || task.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.done === undefined || task.done === filters.done) // Allow filtering by done status (true/false)
        );
    });
}

export async function getIncompleteTasks() {
    const settings = await loadSettings();
    const tasksToShow = settings?.tasksToShow || 10;
    const data = await loadTasks();

    return data
        .filter(task => task.done !== "true") // Filter only tasks that are NOT completed
        .slice(0, tasksToShow); // Get first # tasks
}

export function renderTasks(tasks) {
    const tasksDiv = document.querySelector('.tasks');
    tasksDiv.innerHTML = ""; // Clear existing tasks


    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');

        taskElement.innerHTML = `
            <div class="task-header">
                <h3>${task.title}</h3>
            </div>
            <p class="task-desc">${task.desc}</p>
            <div class="task-footer">
                <span class="due-date">${task.dueDate ? `Due: ${task.dueDate}` : "No due date"}</span>
            </div>
        `;

        tasksDiv.appendChild(taskElement);
    });
}
