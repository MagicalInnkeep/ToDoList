let modeStatus=0;

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function darkMode() {
    document.getElementById("lightdark").textContent="🌙";
    document.body.classList.toggle("dark-mode");
    modeStatus=1;
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function lightMode() {
    document.getElementById("lightdark").textContent="☀️";
    document.body.classList.toggle("dark-mode");
    modeStatus=0;
  } 

export function toggleMode() {
    modeStatus==1 ? lightMode() : darkMode();
}


