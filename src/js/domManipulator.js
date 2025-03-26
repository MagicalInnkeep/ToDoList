import {Task, TaskManager} from './taskHandler'
import {toggleNav} from './sidebar';
import {toggleMode, initMode} from './lightdark';
import {search_task } from "./searchbar";
import {display_ct} from "./datetime";

export class UI{
    constructor(){
        this.taskManager = new TaskManager;
        console.log(this.taskManager);
        this.init();
    }

    init(){
        console.log("init");
        //Adding EventHandlers
        initMode();
        display_ct();
        
        this.initEvents();
        this.renderTasks(this.taskManager.getTasks());
    }

    initEvents(){
        console.log("initEvents")
        document.querySelector("#sidebar-btn").addEventListener('click',toggleNav);
        document.querySelector("#lightdark").addEventListener('click',toggleMode);
        document.querySelector("#newTask").addEventListener('click',this.showAddTaskForm);
        document.querySelector("#close-btn").addEventListener('click',this.closeAddTaskForm);
        document.querySelector("#task-form").addEventListener('submit',(event) => this.handleFormSubmit(event));

    }

    showAddTaskForm() {
        const popup = document.getElementById('task-form-popup');
        popup.style.display = 'block'; // Show the form
    }
    
    closeAddTaskForm() {
        const popup = document.getElementById('task-form-popup');
        popup.style.display = 'none'; // Hide the form
    }
    

    emptyForm() {
        document.querySelector("#title").value = "";
        document.querySelector("#description").value = "";
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        document.querySelector("#duedate").value = `${year}-${month}-${day}`;
    };

    handleFormSubmit(event){
        console.log("hoi");
        event.preventDefault();
        const task = new Task(
            document.querySelector("#task-title").value,
            document.querySelector("#task-desc").value,
            document.querySelector("#task-due").value,
            document.querySelector("#task-priority").value,
            document.querySelector("#task-category").value
        );
        console.log(task);
        this.taskManager.addTask(task);
        this.renderTasks(this.taskManager.getTasks().filter(task => !task.isComplete));
        this.closeAddTaskForm();
    };

    setPriority(btn) {
        document.querySelectorAll(".priority-btn").forEach(otherBtn => otherBtn.classList.remove("current-priority"));
        btn.classList.add("current-priority");
    };

    filterTasksByCategory(btn) {
        document.querySelectorAll(".options-btns").forEach(otherBtn => otherBtn.classList.remove("active-btn"));
        btn.classList.add("active-btn");
        const category = btn.value;

        let tasks = this.taskManager.getTasksByCategory(category).filter(task => !task.isComplete);

        this.renderTasks(tasks);
    };


    renderTasks(tasks) {
        const tasksDiv = document.querySelector('.tasks');
        tasksDiv.innerHTML = ""; // Clear existing tasks

        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item');

            taskElement.innerHTML = `
                <input type="checkbox" id="todo-${index}" ${task.isComplete ? 'checked' : ''} />
                <label class="custom-checkbox" for="todo-${index}">
                </label>
                <label for="todo-${index}" class="task-text">
                    <div class="task-header">
                    <p class="taskbox-category">${task.category}</p>
                    <p class="due-date">${task.dueDate}</p>
                    </div>
                    <p class="taskbox-title todo-title">${task.title}</p>
                    <p class="taskbox-description todo-description">${task.description}</p>
                </label>
                <button class="delete-btn">
                </button>
            `;
            taskElement.style.borderLeftColor=this.getPriorityColor(task.priority);
            tasksDiv.appendChild(taskElement);
            const deleteBtn = taskElement.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", () => {
                this.taskManager.deleteTask(index);
                this.renderTasks(this.taskManager.getTasks());
            });
            const checkBox = taskElement.querySelector("input");
            checkBox.addEventListener("change", () => {
                this.taskManager.toggleTaskCompletion(index);
                this.renderTasks(this.taskManager.getTasks());
            });
        });
    };

    getPriorityColor(priority) {
        switch (priority) {
            case "low":
                return "#1da811"; 
            case "medium":
                return "#a88a11"; 
            case "high":
                return "#c9231a";
            default:
                return "#FFFFFF"; 
        };
    };

    showPendingTasks() {
        this.isPendingView = true; 
        const previewContainer = document.querySelector(".toppreview-container");
        previewContainer.style.display = "none"; 
        const mainElement = document.querySelector("main");
        mainElement.style.paddingTop = "2rem";
        const pendingTasks = this.taskManager.getPendingTasks();
        this.renderTasks(pendingTasks);
    };

    showAllTasks() {
        this.isPendingView = false; 
        const previewContainer = document.querySelector(".toppreview-container");
        previewContainer.style.display = "flex"; 
        const mainElement = document.querySelector("main");
        mainElement.style.paddingTop = "0rem"; 
        this.renderTasks(this.taskManager.getTasks());
    };

    setActiveHeaderButton(btn) {
        document.querySelectorAll(".header-btns").forEach(otherBtn => otherBtn.classList.remove("headerbtn-line"));
        btn.classList.add("headerbtn-line");
    };

}