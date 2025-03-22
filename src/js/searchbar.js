import jsonData from '../data/data.json';

let data =  jsonData.tasks;

export function search_task() {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let x = document.querySelector('#list-holder');
    x.innerHTML = "";
    
    // If input is empty, stop execution (clears list)
    if (input.trim() === "") return;

    for (let i = 0; i < data.length; i++) {
      let obj = data[i];
  
      // Check if any field contains the search input
      let matches = Object.values(obj).some(value => 
        typeof value === "string" && value.toLowerCase().includes(input)
      );
  
      if (matches) {
        const elem = document.createElement("li");
        elem.innerHTML = `${obj.title} - ${obj.desc}`;
        x.appendChild(elem);
      }
    }
  }