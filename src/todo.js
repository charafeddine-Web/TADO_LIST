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

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

let close = document.getElementById("close");

close.addEventListener("click", function () {
  document.getElementById("overlay").classList.toggle("hidden");
});

function openForm() {
  document.getElementById("overlay").classList.toggle("hidden");
}

/*************************************************add NewTask********************************* */
function NewTask() {
  
  // let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  let titer = document.getElementById("titel").value.trim();
  let Priority = document.getElementById("priority").value;
  let status = document.getElementById("status").value;
  let date = document.getElementById("deadline").value.trim();
  let description = document.getElementById("desc").value.trim();

  let newTask = {
    id: Date.now(),
    titer: titer,
    Priority: Priority,
    Status: status,
    Date: date,
    Description: description,
  };

  // const regex = /^[a-zA-Z0-9\s]+$/;

  // if (newTask.titer.length > 0 && regex.test(newTask.titer)) {
  //     tasks.push(newTask);
  // } else {
  //     alert("Invalid title");
  //     console.log("Le titre n'est pas valide.");
  // }
  if (!titer) {
    alert("Title cannot be empty.");
    return;
  }
  if (!Priority) {
    alert("Priority cannot be empty.");
    return;
  }
  if (!status) {
    alert("Status cannot be empty.");
    return;
  }
  if (!date) {
    alert("Deadline cannot be empty.");
    
  }

  let existsTask = tasks.some((e) => e.titer === newTask.titer);

  if (!existsTask) {
    tasks.unshift(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    let confirmAdd = confirm(
      "This task already exists. Do you want to add it again?"
    );
    if (confirmAdd) {
      tasks.unshift(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    else {
      console.log("task not added");
      return;
    }
  }
  // localStorage.setItem("tasks", JSON.stringify(tasks));

  // titer.value = "";
  // Priority.value = "";
  // status.value = "";
  // date.value = "";
  // description.value = "";


  displayTasks();

}

/*****************************************************************show tasks*/
function displayTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log("Tasks data:", tasks);

  let parent_todo = document.getElementById("todo");
  let parent_doing = document.getElementById("doing");
  let parent_done = document.getElementById("done");

  parent_todo.innerHTML = "";
  parent_doing.innerHTML = "";
  parent_done.innerHTML = "";

  let todo_stat = 0;
  let doing_stat = 0;
  let done_stat = 0;

  tasks.forEach((task,key) => {
    let item = document.createElement("div");

    let bgColorClass =
      task.Priority === "P1"
        ? "bg-red-400"
        : task.Priority === "P2"
        ? "bg-yellow-500"
        : task.Priority === "P3"
        ? "bg-green-400"
        : "bg-gray-400";

    item.setAttribute("draggable", "true");

    item.className = `border-2 w-80 items-start p-4 rounded-xl bg-gray-300 hover:opacity-70 cursor-not-allowed `;
    item.innerHTML = `
            <div class="flex justify-between pb-2">
                <h1 class="text-xl font-bold">${task.titer}</h1>
                <p class="font-bold p-1 rounded-xl ${bgColorClass}">${task.Priority}</p>
            </div><hr>
            <h3 class="text-gray-500 mb-2">${task.Date}</h3>
            <div class="flex justify-end gap-3">
                <img src="../Assets/edit.png" alt="icon edit" width="20px" onclick="edit_task(${task.id})" class="cursor-pointer hover:opacity-50 ">
                <img src="../Assets/delete.png" alt="icon delete" width="20px" onclick="delete_task(${task.id})" class="cursor-pointer hover:opacity-50 ">
            </div>
            `;

    switch (task.Status) {
      case "ToDo":
        parent_todo.appendChild(item);
        todo_stat++;
        break;
      case "Doing":
        parent_doing.appendChild(item);
        doing_stat++;
        break;
      case "Done":
        parent_done.appendChild(item);
        done_stat++;
        break;
      default:
        parent_todo.appendChild(item);
        break;
    }

    let stat_todo = document.getElementById("stat-todo");
    stat_todo.textContent = `${todo_stat}`;

    let stat_doing = document.getElementById("stat-doing");
    stat_doing.textContent = `${doing_stat}`;

    let stat_done = document.getElementById("stat-done");
    stat_done.textContent = `${done_stat}`;
  });
}

/*****************************Show Plus Details******************************** */

// document.addEventListener("DOMContentLoaded", displayTasks());
// console.table(localStorage.getItem("tasks"));


/******************************delete Task******************************** */
function delete_task(key) {
  if (confirm("Are you sure you want to delete this task?")) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((e) => e.id !== key);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    // Refresh the page to update the task list
    location.reload();
  }
}


function edit_task(taskId) { 

  let taskIndex = tasks.findIndex(e => e.id === taskId);

  // if (taskIndex === -1) {
  //   console.log("Task not found with the given ID:", taskId);
  //   return;
  // }

  let task = tasks[taskIndex];

  let detailsSection = document.getElementById("details");
  detailsSection.classList.remove("hidden"); 
  detailsSection.innerHTML = ""; 

  let child = document.createElement("div");
  child.className = "bg-white rounded-xl";

  child.innerHTML = `
      <div class="rounded-lg p-6 max-w-md mx-auto w-full border border-gray-200 p-10">
                            <div class="flex justify-between">
                                <h2 class="text-2xl font-bold mb-4 text-gray-800">Task Details</h2>
                                <img src="../Assets/closed.gif" id="close_details" alt="" width="50" class="cursor-pointer">
                            </div><br>
                            <div class="mb-4">
                                <p class="text-gray-600"><strong class="text-gray-400">Title:</strong> 
                                 <span class="font-bold">
                                    <input type="text" id="titel1" class="font-bold bg-transparent cursor-default outline-none border-none" value="${task.titer}" />
                                  </span>
                                </p>
                            </div>
                            <div class="mb-4">
                               <p class="text-gray-600"><strong class="text-gray-400">Description:</strong> 
                                 <span class="font-bold">
                                    <input type="text" id="desc1" class="font-normal bg-transparent cursor-default outline-none border-none" value="${task.Description}" />
                                  </span>
                                </p>
                            </div>
                            <div class="mb-4">
                                <p class="text-gray-600"><strong class="text-gray-400">Priority:</strong> 
                                 <span class="font-bold">
                                    <input type="text" id="priority1" class="font-bold bg-transparent cursor-default outline-none border-none" value="${task.Priority}" />
                                  </span>
                                </p>
                            </div>
                            <div class="mb-4">
                                <p class="text-gray-600"><strong>Status:</strong> 
                                  <span class="${
                                    task.Status === "ToDo"
                                      ? "text-red-500"
                                      : task.Status === "Doing"
                                      ? "text-yellow-500"
                                      : "text-green-500"
                                  } font-bold">
                                  <select id="status1" class="font-bold bg-transparent cursor-default outline-none border-none">
                                    <option value="${task.Status}">${task.Status}</option>
                                    <option value="ToDo">ToDo</option>
                                    <option value="Doing">Doing</option>
                                    <option value="Done">Done</option>
                                  </select>
                                  </span>
                                </p>
                            </div>
                            <div class="mb-4">
                                <p class="text-gray-600"><strong>Deadline:</strong> <span><input type="text" id="deadline" value="${task.Date}" /></span></p>
                            </div>
                            <div class="flex justify-end mt-6 gap-2">
                                <button class="bg-green-400 text-white px-8 py-2 rounded-md hover:bg-green-600" id="edit_task" >Save Changes</button>
                            </div>
    </div>
    `;
  detailsSection.appendChild(child);

   document.getElementById("close_details").addEventListener("click", function () {
      detailsSection.classList.toggle("hidden");
  });

  
}

function Update_task(taskId) {

  // let index = tasks.findIndex(e => e.id === taskId); 
document.getElementById('edit_task').addEventListener('click',
  function() {
    if (taskId > -1) {
      let task = tasks[taskId];
  
        task.titer = document.getElementById("titel1").value;
        task.Priority = document.getElementById("priority1").value;
        task.Status = document.getElementById("status1").value;
        task.Date = document.getElementById("deadline1").value;
        task.Description = document.getElementById("desc1").value;
  
        tasks[taskId] = task;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
        document.getElementById("details").classList.add("hidden");
      }
  }
)
  
  }





  displayTasks();


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
