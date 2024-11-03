let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

displayTasks();

let close = document.getElementById("close");
close.addEventListener("click", function () {
  document.getElementById("overlay").classList.toggle("hidden");
});
function openForm() {
  document.getElementById("overlay").classList.toggle("hidden");
}

/*************************************************add NewTask********************************* */
function NewTask() {

  let titer = document.getElementById("titel").value.trim();
  let Priority = document.getElementById("priority").value;
  let status = document.getElementById("status").value;
  let date = document.getElementById("deadline").value.trim();
  let description = document.getElementById("desc").value.trim();

  
if(!titer ||  !Priority || !status || !date || !description){
  alert("Please fill all fields");
  return;
}
if(date  < new Date().toISOString().split("T")[0]){
  alert("Please enter a valid date");
  return;
}

let newTask = {
    id: Date.now(),
    titer,
    Priority,
    Status: status,
    Date: date,
    Description: description,
};

  let existsTask = tasks.some((e) => e.titer === newTask.titer);

  if (!existsTask){
    tasks.unshift(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    document.getElementById("overlay").classList.add("hidden"); 
  }else {
        let confirmAdd = confirm(
          "This task already exists. Do you want to add it again?"
        );
        if (confirmAdd) {
          tasks.unshift(newTask);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          displayTasks();
          document.getElementById("overlay").classList.add("hidden"); 
        }
        else {
          console.log("task not added");
          return;
        }
      }
  document.getElementById("titel").value = "";
  document.getElementById("priority").value = "";
  document.getElementById("status").value = "";
  document.getElementById("deadline").value = "";
  document.getElementById("desc").value = "";
}
/****************************************show tasks************************************/
function displayTasks() {
  let parent_todo = document.getElementById("todo");
  let parent_doing = document.getElementById("doing");
  let parent_done = document.getElementById("done");

  parent_todo.innerHTML = "";
  parent_doing.innerHTML = "";
  parent_done.innerHTML = "";

  let todo_stat = 0;
  let doing_stat = 0;
  let done_stat = 0;

  tasks.forEach((task) => {
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

    item.className = `border-2 w-80 items-start p-4 rounded-xl bg-gray-300 hover:opacity-70  `;
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
/******************************delete Task******************************** */
function delete_task(key) {
  if (confirm("Are you sure you want to delete this task?")) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((e) => e.id !== key);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
  }
}
/***************************Edit Task**********************************/
function edit_task(taskId) {
  let taskIndex = tasks.findIndex(e => e.id === taskId);

  if (taskIndex === -1) return;

  let task = tasks[taskIndex];
  let detailsSection = document.getElementById("details");
  detailsSection.classList.toggle("hidden");

  detailsSection.innerHTML = `
    <div class="rounded-lg bg-white p-6 max-w-md mx-auto w-full border border-gray-200 p-10">
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
                                   <select id="priority1" class="font-bold bg-transparent cursor-default outline-none border-none">
                                      <option value="${task.Priority}" selected disabled>${task.Priority}</option>
                                      <option value="P1">P1</option>
                                      <option value="P2">P2</option>
                                      <option value="P3">P3</option>
                                    </select>
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
                                      <option value="${task.Status}" selected disabled>${task.Status}</option>
                                      <option value="ToDo">ToDo</option>
                                      <option value="Doing">Doing</option>
                                      <option value="Done">Done</option>
                                    </select>
                                    </span>
                                  </p>
                              </div>
                              <div class="mb-4">
                                  <p class="text-gray-600"><strong>Deadline:</strong> <span><input type="text" id="deadline1" value="${task.Date}" /></span></p>
                              </div>
                              <div class="flex justify-end mt-6 gap-2">
                                <button class="bg-green-400 text-white px-8 py-2 rounded-md hover:bg-green-600" id="edit_task">Save Changes</button>
                              </div>
      </div>
  `; 

  document.getElementById("edit_task").onclick = function () {
    task.titer = document.getElementById("titel1").value;
    task.Priority = document.getElementById("priority1").value;
    task.Status = document.getElementById("status1").value;
    task.Date = document.getElementById("deadline1").value;
    task.Description = document.getElementById("desc1").value;

    tasks[taskIndex] = task;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    detailsSection.classList.add("hidden");
  };
  document.getElementById("close_details").addEventListener("click", function () {
          detailsSection.classList.toggle("hidden");
    });
}

