import { loadSettings } from "./settings";
import darkModeIcon from '../img/DarkMode.svg';
import lightModeIcon from '../img/LightMode.svg';

const settings = await loadSettings();
let modeStatus= settings?.theme;
const modeIcon = document.querySelector("#modeIcon");

/* Switch to darkMode*/
function darkMode() {
    modeIcon.src = lightModeIcon; // Use the imported image path
    modeIcon.alt = "Light Mode";
    document.body.classList.toggle("dark-mode");
    modeStatus='light';
  }
  
  /* Switch to lightMode */
function lightMode() {
    modeIcon.src = darkModeIcon; // Use the imported image path
    modeIcon.alt = "Dark Mode";
    document.body.classList.toggle("dark-mode");
    modeStatus='dark';
  } 

   /* toggle Modes */
export function toggleMode() {
    modeStatus=='dark' ? lightMode() : darkMode();
}

/* Initialize page mode on load */
export function initMode() {

  // Apply the mode based on the saved settings
  if (modeStatus === 'dark') {
      darkMode();  // If dark mode is saved, apply dark mode
  } else {
      lightMode();  // If light mode is saved, apply light mode
  }
}