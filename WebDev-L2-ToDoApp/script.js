const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function updateTaskCount() {
    const remainingTasks = tasks.filter(task => !task.completed).length;

    taskCount.textContent =
        remainingTasks === 1
            ? "1 task remaining"
            : `${remainingTasks} tasks remaining`;
}

function renderTasks() {
    taskList.innerHTML = "";

    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateTaskCount();
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

clearCompletedBtn.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);

    saveTasks();
    renderTasks();
});

renderTasks();