
export function display_ct() {
   var CDate = new Date()
   var NewDate=CDate.toDateString(); 
   NewDate = NewDate + " - " + CDate.toLocaleTimeString();
   document.querySelector('#ct').innerHTML = NewDate;
   setTimeout(display_ct, 1000); 
 }