
// const Tasks =[
//     {
//         titre:"maquettage",
//         description:"créer des maquette pour une application web Todo List",
//         statut:"To DO",
//         date:"10-20-2024",
//         priority:"P1",
//         color:"red"
//     },
   
// ];

/*******************************change color by priority ***********************/

// let priority=document.getElementById('priority');
// function changepriority(){

// }




let close=document.getElementById('close');

close.addEventListener('click',function(){
    document.getElementById("overlay").classList.toggle("hidden");
})

function openForm() {
    document.getElementById("overlay").classList.toggle("hidden");
}

/*************************************************add NewTask********************************* */
function NewTask(){

    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    let titer=document.getElementById('titel').value.trim();
    let Priority=document.getElementById('priority').value.trim();
    let status=document.getElementById('status');
    let color=document.getElementById('color').value.trim();
    let date=document.getElementById('deadline').value.trim();
    let description=document.getElementById('desc').value.trim();
    
    let newTask = {
        id:Date.now(),
        titer: titer,
        Priority: Priority,
        status:status,
        Color: color,
        Date: date,
        Description: description
    };

    
    // validation_titer=()=>{
    //     if(newTask.Titer.length !== ""){
    //         tasks.push(newTask);
    //     }
    // }

    existsTask=tasks.some(e=>e.titer === newTask.titer);
    if(!existsTask){
        tasks.push(newTask);
    }else{
        let confirmAdd = confirm("This task already exists. Do you want to add it again?");
        if(confirmAdd){
            tasks.push(newTask);
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    id.value="",
    titer.value = "";
    Priority.value= ""
    status.value = "";
    color.value = "";
    date.value = "";
    description.value = "";

    displayTasks();
}
/*****************************************************************show tasks*/
function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];


console.log("Tasks data:", tasks); 
    let parent = document.getElementById('todo');
    parent.innerHTML = "";
    
    tasks.forEach((task, key) => {
        let item = document.createElement('div');
         let bgColorClass = 
         task.Priority === "P1" ? "bg-red-400" :
         task.Priority === "P2" ? "bg-orange-400" : 
         task.Priority === "P3" ? "bg-green-400" : 
         "bg-gray-400"; 
        item.className = `border-2 w-80   items-start p-4 rounded-xl ${bgColorClass}`;
        item.innerHTML = `
            <h1 class="text-xl font-bold">${task.titer}</h1>
            <h3 class="text-gray-500 h-6">${task.description}</h3>
            <h3 class="text-gray-400">${task.date}</h3>
            <button class="bg-red-500 text-black p-1 mt-2 rounded" onclick="delete_task(${key})">Delete</button>
            <button class="bg-blue-500 text-black p-1 mt-2 rounded" onclick="delete_task(${key})">Edit</button>
        `;

        parent.appendChild(item);
    });

}


document.addEventListener("DOMContentLoaded",displayTasks())
console.log(localStorage.getItem("tasks"));


/******************************delete Task******************************** */
function delete_task(key){
    let tasks = JSON.parse(localStorage.getItem("tasks"))|| [];
    tasks.splice(key,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    displayTasks();
}








/****************************************************  afficher plus content *******************/
// document.addEventListener("DOMContentLoaded", () => {
//     const textElement = document.getElementById("text");
//     const button = document.getElementById("toggleButton");
    
//     let isExpanded = false;

//     button.addEventListener("click", () => {
//         if (isExpanded) {
//             textElement.classList.add("max-h-20");
//             textElement.classList.remove("h-auto");
//             button.textContent = " plus";
//         } else {
//             textElement.classList.remove("max-h-20");
//             textElement.classList.add("h-auto");
//             button.textContent = " moins";
//         }
//         isExpanded = !isExpanded;
//     });
// });
