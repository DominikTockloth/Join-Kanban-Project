let statusTask = ['toDo', 'inProgress', 'awaitingFeedback', 'doneTask'];
let currentDraggedElement;


// This function loads all tasks to board and runs the init function
async function initBoard() {
  await init();
  renderTasksByStatus();
}


// This function loads all data from backend , includes header and sidebar , shows the initals in header
async function init() {
  await loadCompleteData();
  await includeHTML();
  showInitalsInHeader();
}


/**
 * Loads data of users , allContacts and tasks from backend
 */
async function loadCompleteData() {
  try {
    users = JSON.parse(await getItem("users"));
    allContacts = JSON.parse(await getItem("allContacts"));
    allTasks = JSON.parse(await getItem("allTasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}


/**
 * This function renders allTasks by its status
 */
function renderTasksByStatus() {
  renderTasks('toDo');
  renderTasks('inProgress');
  renderTasks('awaitingFeedback');
  renderTasks('doneTask');
}


/**
 * This function renders all task cards from array allTasks
 */
function renderTasks(status) {
  let statusTask = allTasks.filter(t => t['status'] == status);
  let container = document.getElementById(status);
  container.innerHTML = '';
  for (let i = 0; i < statusTask.length; i++) {
    const task = statusTask[i];
    let title = task.title;
    let category = task.category;
    let description = task.description;
    let priorityImg = task.priorityImage;
    let subtasks = task.subtasks;
    let numberOfSubtasks = subtasks.length;
    let id = task.id;
    let contacts = task.contacts;
    let taskPosition = getTaskPosition(allTasks, id);
    container.innerHTML += showTaskElementInBoard(title, category, description, priorityImg, numberOfSubtasks, id, contacts);
    changeBgColorCategory(category, `category-${id}`);
    renderTasksDetailView(taskPosition, id);
    showContactsSelected(task, id, contacts);
  }
  checkStatusContainer(statusTask, status);
}


/**
 * This function renders the detail task cards of the clicked task in board
 * @param {number} i  number of the single detailed task
 */
function renderTasksDetailView(i, id) {
  let container = document.getElementById('detail-task-overlay');
  container.innerHTML = '';
  let task = allTasks[i];
  let title = task.title;
  let category = task.category;
  let description = task.description;
  let date = changeDateFormat(task.date);
  let contacts = task.contacts;
  let priority = task.priority;
  let priorityImg = task.priorityImage;
  let subtasks = task.subtasks;
  container.innerHTML += showDetailViewOfTask(i, id, category, title, description, date, priority, priorityImg, contacts, subtasks);
  showSubtasksInDetailView(subtasks, i, id);
  checkedSubtasksUpdate(i, id);
  changeBgColorCategory(category, `category-detail-${i}`);
  showContactsSelectedInDetail(task, contacts, id);
}


/**
 * This function renders all existing subtasks
 * @param {string} subtasks - array inside of the array ""tasks
 * @param {number} i - speicfic number of detailed task (task) - used as id
 */
function showSubtasksInDetailView(subtasks, i, id) {
  let contentSubtask = document.getElementById(`subtasks-${i}`);
  if (contentSubtask) {
    contentSubtask.innerHTML = '';
    if (subtasks && subtasks.length > 0) {
      for (let j = 0; j < subtasks.length; j++) {
        const itemSubtask = subtasks[j];
        const statusSubtask = allTasks[i].statusOfSubtasks[j];
        contentSubtask.innerHTML += subtasksOfDetailView(itemSubtask, i, j, statusSubtask);
      }
      changeCheckboxesOfSubtasks(i, id);
    }
  }
}


/** In this function get the checkboxes of tasks updated
 * @param {number} i - index of task
 * @param {number} id - id of task
 */
function changeCheckboxesOfSubtasks(i, id) {
  const checkboxesSubtasks = document.querySelectorAll(`#subtasks-${i} input[type = "checkbox"]`);
  checkboxesSubtasks.forEach((checkbox, j) => {
    checkbox.addEventListener('change', () => {
      allTasks[i].statusOfSubtasks[j] = checkbox.checked;
      checkedSubtasksUpdate(i, id);
    });
  });
}


/**
 * Here gets checked if a checkbox is checked
 * @param {number} i - index of task
 * @param {number} id - id of task
 */
function checkedSubtasksUpdate(i, id) {
  const checkboxesSubtasks = document.querySelectorAll(`#subtasks-${i} input[type = "checkbox"]`);
  subtaskCheckedCount = 0;
  checkboxesSubtasks.forEach((checkbox) => {
    if (checkbox.checked) {
      subtaskCheckedCount++;
    }
  });
  const checkedSubtasksText = document.getElementById(`checked-subtasks-${id}`);
  if (checkedSubtasksText) {
    checkedSubtasksText.textContent = subtaskCheckedCount.toString();
  }
  taskProgressbarUpdate(id);
  setItem("allTasks", JSON.stringify(allTasks));
}


/** Here gets the progressbar of each task updated
 * @param {number} id - id of the single task 
 */
function taskProgressbarUpdate(id) {
  const checkedSubtasksText = document.getElementById(`checked-subtasks-${id}`);
  const allSubtasksText = document.getElementById(`subtasks-length-${id}`);
  const subtaskProgressBar = document.getElementById(`progressbar-${id}`);
  if (checkedSubtasksText && allSubtasksText && subtaskProgressBar) {
    let subtaskChecked = checkedSubtasksText.innerText;
    let allCheckedSubtasks = allSubtasksText.innerText;
    let percent = subtaskChecked / allCheckedSubtasks;
    percent = Math.round(percent * 100);
    subtaskProgressBar.style.width = `${percent}%`;
  }
}


/**
 * This function gets the position of a task
 * @param {array} array 
 * @param {number} id 
 * @returns 
 */
function getTaskPosition(array, id) {
  let taskPosition;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      taskPosition = i;
      break;
    }
  }
  return taskPosition;
}


/**
  This function shows the selected contacts in detail view of task
 * @param {string} task - array allTasks[i]
 * @param {string} contact - array allTasks[i].contact
 * @param {number} id - id of tasks
 */
function showContactsSelectedInDetail(task, contacts, id) {
  let container = document.getElementById(`selected-contacts-detail-${id}`);
  let colorBg = task.bgContact;
  if (contacts) {
    container.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
      renderContactsInDetailTaskView(contacts, colorBg, i, container);
    }
  }
}


/**
 * This function creates the selected contacts in the detailed task
 * @param {string} contact - allTasks.contacts
 * @param {string} bgColor - task.contactsBg
 * @param {number} i - index of contact-array
 * @param {string} container - div `selected-contacts-detail-${id}`
 */
function renderContactsInDetailTaskView(contacts, colorBg, i, container) {
  let selectedContact = contacts[i];
  let firstLetters = getFirstLetter(selectedContact);
  let contactBgColor = colorBg[i];
  container.innerHTML += /* HTML */` <div class="flex-edit">
<div class="avatar-edit" style="background-color:${contactBgColor}"><span style="font-weight:400 ;">${firstLetters}</span></div>
<div>
  <p class="p-edit-task">${selectedContact}</p>
</div>
</div>`;
}


/**
 * @param {string} contact - contacts of the specific task
 * @param {number} id - id of task
 * @param {string} task 
  */
function showContactsSelected(task, id, contacts) {
  let content = document.getElementById(`selected-contacts-container-${id}`);
  let backgroundColor = task.bgContact;
  let contactCounter = contacts.length - 4;
  if (contacts) {
    content.innerHTML = '';
    let selectedContacts = [];
    for (let i = 0; i < Math.min(contacts.length, 4); i++) {
      const selectedContact = contacts[i];
      const firstLetters = getFirstLetter(selectedContact);
      const selectedContactBg = backgroundColor[i];
      selectedContacts.push(/*HTML*/`
      <div class="avatar-board" style="background-color:${selectedContactBg}">${firstLetters}</div>`
      );
    }
    if (contacts.length > 4) {
      selectedContacts.push(/*HTML*/`
      <div class="avatar-board" style="background-color:black">+${contactCounter}</div>`
      );
    }
    content.innerHTML = selectedContacts.join('');
  }
}


/** Here gets the date formatted
 * @param {string} stringOfDate - date from allTasks array
 * returns the formatted date
 */
function changeDateFormat(stringOfDate) {
  let date = new Date(stringOfDate);
  let day = date.getDate().toString().padStart(2, '0');
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
}


/**
 * This function switches the backgroundcolor of the category from task
 * @param {*} category - category of task loaded from array "allTasks"
 * @param {*} id - ID of specific task
 */
function changeBgColorCategory(category, id) {
  let categoryDiv = document.getElementById(id);
  if (category === 'Technical Task') {
    categoryDiv.style.backgroundColor = '#FF4646';
  } else if (category === 'User Story') {
    categoryDiv.style.backgroundColor = '#00BEE8';
  }
}


/**
 *  This function takes a name as input and returns the initials of the first and last names (if present).
 * @param {string} name 
 * @returns 
 */
function getFirstLetter(name) {
  const nameParts = (name || "").split(" "); // Split the name into parts based on spaces.
  const firstNameLetter = nameParts[0][0]; // Get the initial of the first name.
  const lastNameLetter = nameParts.length > 1 ? nameParts[1][0] : ""; // Get the initial of the last name (if present).
  return `${firstNameLetter}${lastNameLetter}`; // Combine and return the initials.
}


/**
 *  This function deletes the detailed task selected
 * @param {number} i - number of task
 */
function deleteTask(i) {
  allTasks.splice(i, 1);
  setItem("allTasks", JSON.stringify(allTasks));
  renderTasksByStatus();
  closeDetailTaskCard();
}


/**
 * This function is for searching specific tasks
 */
function searchingForTasks() {
  const searchInput = document.getElementById('search').value.toLowerCase();
  if (searchInput !== 0) {
    tasksFilterByTitle(searchInput);
  }
  else {
    renderTasksByStatus();
  }
}


/**
 * This function filters the tasks by value of input
 * @param {string} searchInput 
 */
function tasksFilterByTitle(searchInput) {
  for (let i = 0; i < allTasks.length; i++) {
    const titleOfTask = allTasks[i]['title'].toLowerCase();
    const descriptionOfTask = allTasks[i]['description'].toLowerCase();
    const id = allTasks[i].id;
    const containerOfTask = document.getElementById(`task-div-${id}`);
    if (!titleOfTask.includes(searchInput.toLowerCase()) && !descriptionOfTask.includes(searchInput.toLowerCase())) {
      letTaskDisapear(containerOfTask);
    }
    else {
      letTaskAppear(containerOfTask);
    }
  }
}


/** This function shows the divs of tasks, which do match
 * with the value of the search input
 * @param {string} containerOfTask - its the id of the specific task 
 */
function letTaskAppear(containerOfTask) {
  if (containerOfTask !== null) {
    containerOfTask.style.display = 'block';
  }
}


/** This function hides the divs of tasks, which dont match
 * with the value of the search input
 * @param {string} containerOfTask - its the id of the specific task 
 */
function letTaskDisapear(containerOfTask) {
  if (containerOfTask !== null) {
    containerOfTask.style.display = 'none';
  }
}


// Opens the detailed card of the clicked task
function openDetailTaskCard(id) {
  let taskPosition = getTaskPosition(allTasks, id);
  document.getElementById('detail-task-overlay').style.display = 'flex';
  renderTasksDetailView(taskPosition, id);
}


function closeDetailTaskCard(id){
  document.getElementById('detail-task-overlay').style.display = 'none';
}