import "./styles.css";

import {toggleNav} from './js/sidebar';
import {toggleMode, initMode} from './js/lightdark';
import {search_task } from "./js/searchbar";
import {display_ct} from "./js/datetime";
import {getIncompleteTasks, renderTasks} from "./js/loadTask.js";
import {addTask} from "./js/taskChange"; 

/* Turn all these into globally accessible functions. */ 
window.toggleNav = toggleNav;
window.toggleMode = toggleMode;
window.search_task = search_task;
window.addTask = addTask;

// Run the clock function when the page loads

display_ct();


initMode();

// Display page in correct mode


//Render default value
const currentTasks = await getIncompleteTasks();
renderTasks(currentTasks);
