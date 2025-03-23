import {Task, TaskManager} from './taskHandler'
import {toggleNav} from './sidebar';
import {toggleMode, initMode} from './lightdark';
import {search_task } from "./searchbar";
import {display_ct} from "./datetime";

export class UI{
    constructor(){
        this.TaskManager = new TaskManager;
        this.init();
    }

    init(){
        console.log("init");
        //Adding EventHandlers
        initMode();
        display_ct();
        
        this.initEvents();
    }

    initEvents(){
        console.log("initEvents")
        document.querySelector("#sidebar-btn").addEventListener('click',toggleNav);
        document.querySelector("#lightdark").addEventListener('click',toggleMode);
        document.querySelector("#addTask").addEventListener('click',this.showAddTaskForm);
        document.querySelector("#close-btn").addEventListener('click',this.closeAddTaskForm);
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

    handleFormSubmit(e) {
        e.preventDefault();
        const title = document.querySelector("#title").value.trim();
        if (title.length > 0) {
            const task = new Task(
                document.querySelector("#title").value,
                document.querySelector("#description").value,
                document.querySelector("#duedate").value,
                document.querySelector(".current-priority").textContent,
                document.querySelector("#category").value
            );
            this.taskManager.addTask(task);
            this.renderTasks(this.taskManager.getTasks());
            this.updateCategory();
            this.closeForm();
        };
    };

    setPriority(btn) {
        document.querySelectorAll(".priority-btn").forEach(otherBtn => otherBtn.classList.remove("current-priority"));
        btn.classList.add("current-priority");
    };

    filterTasksByCategory(btn) {
        document.querySelectorAll(".options-btns").forEach(otherBtn => otherBtn.classList.remove("active-btn"));
        btn.classList.add("active-btn");
        const category = btn.value;

        let tasks;
        if (this.isPendingView) {
            tasks = category === "all"
                ? this.taskManager.getPendingTasks()
                : this.taskManager.getTasksByCategory(category).filter(task => !task.isComplete);
        } else {
            tasks = category === "all"
                ? this.taskManager.getTasks()
                : this.taskManager.getTasksByCategory(category);
        };

        this.renderTasks(tasks);
    };

    updateCategory() {
        const category = document.querySelector("#category").value;
        document.querySelectorAll(".options-btns").forEach(btn => {
            btn.classList.remove("active-btn");
            if (btn.value === category) {
                btn.classList.add("active-btn");
            };
        });
    };

    renderTasks(tasks) {
        const ul = document.querySelector("ul");
        ul.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "task-box";
            li.style.backgroundColor = this.getPriorityColor(task.priority);
            li.innerHTML = `
                <input type="checkbox" id="todo-${index}" ${task.isComplete ? 'checked' : ''} />
                <label class="custom-checkbox" for="todo-${index}">
                </label>
                <label for="todo-${index}" class="task-text">
                    <p class="taskbox-category">${task.category}</p>
                    <p class="taskbox-title todo-title">${task.title}</p>
                    <p class="taskbox-description todo-description">${task.description}</p>
                </label>
                <button class="delete-btn">
                </button>
            `;
            ul.appendChild(li);

            const deleteBtn = li.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", () => {
                this.taskManager.deleteTask(index);
                this.renderTasks(this.taskManager.getTasks());
            });

            const checkBox = li.querySelector("input");
            checkBox.addEventListener("change", () => {
                this.taskManager.toggleTaskCompletion(index);
                this.renderTasks(this.taskManager.getTasks());
            });
        });
    };

    getPriorityColor(priority) {
        switch (priority) {
            case "Low":
                return "#B2DFB2"; 
            case "Medium":
                return "#FFD699"; 
            case "High":
                return "#FFCACA";
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