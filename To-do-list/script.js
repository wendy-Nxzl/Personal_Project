// Get references to HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskContainer = document.getElementById("taskContainer");
const downloadButton = document.getElementById("downloadButton");

let tasks = [];

// Function to create a new task item
function createTask() {
  const taskText = taskInput.value.trim();
  
  if (taskText !== "") {
    const taskItem = document.createElement("div");
    taskItem.classList.add("taskItem");
    
    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    
    const taskLabel = document.createElement("label");
    taskLabel.textContent = taskText;
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = " Delete";
    
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteButton);
    
    taskContainer.appendChild(taskItem);
    
    //Add the task to the tasks array
    tasks.push(taskText);

    // Clear the input field after adding a task
    taskInput.value = "";
  }
}

// Function to generate the task list as a text file and trigger download
function downloadTaskList() {
    const taskListText = tasks.join("\n");
    const blob = new Blob([taskListText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "taskList.txt";
    link.click();
  }
  
  // Event listener for adding a task
  addTaskButton.addEventListener("click", createTask);
  
  // Event listener for marking a task as completed or deleting a task
  taskContainer.addEventListener("click", function (event) {
    const target = event.target;
  
    if (target.tagName === "BUTTON") {
      target.parentNode.remove(); // Delete the task item
  
      // Remove the task from the tasks array
      const taskText = target.previousElementSibling.textContent;
      const taskIndex = tasks.indexOf(taskText);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
      }
    } else if (
      target.tagName === "INPUT" &&
      target.type === "checkbox"
    ) {
      const taskLabel = target.nextElementSibling;
      taskLabel.classList.toggle("completed"); // Toggle the completed class
    }
  });
  
  // Event listener for download button
  downloadButton.addEventListener("click", downloadTaskList);