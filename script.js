const form = document.querySelector("form");
const taskInput = document.querySelector("#new-task");
const taskList = document.querySelector("#items");
const completeList = document.querySelector(".complete-list ul");

const oldTasks = JSON.parse(localStorage.getItem("tasks")) ?? ["Sample task-1"];
console.log(oldTasks);

function renderCompletedTask(li) {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });
  li.appendChild(deleteBtn);

  completeList.appendChild(li);
}
function completeTask(checkbox) {
  const li = checkbox.parentElement;
  li.querySelector('input[type="checkbox"]').remove();

  renderCompletedTask(li);
}

function renderTask() {
  let li ="";
  oldTasks.forEach((taskValue) => {
    li += `<li><input type="checkbox" onchange="completeTask(this)" /><label> ${taskValue}</label></li>`;
  });

  taskList.innerHTML = li;
}

renderTask();


form.addEventListener("submit", (e) => {
  e.preventDefault();
  oldTasks.push(taskInput.value);
  localStorage.setItem("tasks", JSON.stringify(oldTasks));
  renderTask();
  taskInput.value = "";
});
