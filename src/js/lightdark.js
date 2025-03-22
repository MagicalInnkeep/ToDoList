let modeStatus=0;

import darkModeIcon from '../img/DarkMode.svg';
import lightModeIcon from '../img/LightMode.svg';

const modeIcon = document.querySelector("#modeIcon");

/* Switch to darkMode*/
function darkMode() {
    modeIcon.src = lightModeIcon; // Use the imported image path
    modeIcon.alt = "Light Mode";
    document.body.classList.toggle("dark-mode");
    modeStatus=1;
  }
  
  /* Switch to lightMode */
function lightMode() {
    modeIcon.src = darkModeIcon; // Use the imported image path
    modeIcon.alt = "Dark Mode";
    document.body.classList.toggle("dark-mode");
    modeStatus=0;
  } 

   /* toggle Modes */
export function toggleMode() {
    modeStatus==1 ? lightMode() : darkMode();
}

