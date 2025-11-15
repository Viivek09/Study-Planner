document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const titleInput = document.getElementById("title");
  const subjectSelect = document.getElementById("subject");
  const deadlineInput = document.getElementById("deadline");
  const taskList = document.getElementById("task-list");
  const filterSubject = document.getElementById("filter-subject");
  const emptyMsg = document.getElementById("empty-msg");

  let tasks = [];

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const subject = subjectSelect.value;
    const deadline = deadlineInput.value;

    if (!title) return;

    const task = {
      id: Date.now(),
      title,
      subject,
      deadline,
      done: false,
    };

    tasks.push(task);
    taskForm.reset();
    renderTasks();
  });

  filterSubject.addEventListener("change", () => {
    renderTasks();
  });

  function renderTasks() {
    taskList.innerHTML = "";

    const filtered = tasks.filter((task) => {
      if (filterSubject.value === "All") return true;
      return task.subject === filterSubject.value;
    });

    if (filtered.length === 0) {
      emptyMsg.style.display = "block";
    } else {
      emptyMsg.style.display = "none";
    }

    filtered.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task";

      const mainDiv = document.createElement("div");
      mainDiv.className = "task-main";

      const title = document.createElement("p");
      title.className = "task-title";
      title.textContent = task.title;

      const meta = document.createElement("p");
      meta.className = "task-meta";

      const subjectText = `Subject: ${task.subject}`;
      const deadlineText = task.deadline
        ? ` | Deadline: ${task.deadline}`
        : "";

      meta.textContent = subjectText + deadlineText;

      const subjectBadge = document.createElement("span");
      subjectBadge.className = "badge badge-subject";
      subjectBadge.textContent = task.subject;

      mainDiv.appendChild(title);
      mainDiv.appendChild(meta);
      mainDiv.appendChild(subjectBadge);

      if (task.done) {
        const doneBadge = document.createElement("span");
        doneBadge.className = "badge badge-done";
        doneBadge.textContent = "Done";
        mainDiv.appendChild(doneBadge);
      }

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "task-actions";

      const doneBtn = document.createElement("button");
      doneBtn.className = "action-btn mark-done";
      doneBtn.textContent = task.done ? "Undo" : "Mark Done";
      doneBtn.addEventListener("click", () => toggleDone(task.id));

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "action-btn delete";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteTask(task.id));

      actionsDiv.appendChild(doneBtn);
      actionsDiv.appendChild(deleteBtn);

      li.appendChild(mainDiv);
      li.appendChild(actionsDiv);

      taskList.appendChild(li);
    });
  }

  function toggleDone(id) {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    renderTasks();
  }

  function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
  }

  renderTasks();
});
