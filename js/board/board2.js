/**************************************************  This part handles every function which is to the drag and drop events in board.html   *******************************/

function dropToStatus(status) {
  let taskPosition = getTaskPosition(allTasks, currentDraggedElement);
  allTasks[taskPosition]['status'] = status;
  renderTasksByStatus();
  setItem("allTasks", JSON.stringify(allTasks));
}


/** 
 * @param {number} id - id of task 
 */
function dragTo(id) {
  currentDraggedElement = id;
  transformTask(id);
  statusOfCurrentDraggedElement(id);
}

/** 
 * @param {number} id - id of task 
 */
function stopDragTo(id) {
  stopTransformTask(id);
}


/**
 * This function moves the task to the status column above (only in responsive)
 * @param {number} id - id of task
 */
function moveTaskToStatusAbove(id) {
  currentDraggedElement = id;
  let actualStatus = allTasks[getTaskPosition(allTasks, id)].status;
  let status = statusTask[statusTask.indexOf(actualStatus) - 1];
  dropToStatus(status);
}


/**
 * This function moves the task to the status column below (only in responsive)
 * @param {number} id - id of task
 */
function moveTaskToStatusBelow(id) {
  currentDraggedElement = id;
  let actualStatus = allTasks[getTaskPosition(allTasks, id)].status;
  let status = statusTask[statusTask.indexOf(actualStatus) + 1];
  dropToStatus(status);
}

/**
 * This function is for letting div being clickable
 */
function stopCloseDiv(event) {
  event.stopPropagation();
}

/**
 * This function transforms the task by start dragging
 * @param {number} id - id of the task
 */
function transformTask(id) {
  document.getElementById(`task-div-` + id).classList.add('rotate');
}


/**
 * This function stops transforming the task by stop dragging
 * @param {number} id - id of the task
 */
function stopTransformTask(id) {
  document.getElementById(`task-div-` + id).classList.remove('rotate');
}


/**
 * This function gets the dragging position of a task
 * @param {number} id - id of task
 */
function statusOfCurrentDraggedElement(id) {
  let position = getTaskPosition(allTasks, id);
  let statusOfElement = allTasks[position]['status'];
}

/**
 * Without this function , its not possible to start the drag and drop
 * @param {symbol} event 
 */
function allowDrop(event) {
  event.preventDefault();
}

/************************************************  This part is for checking the status columns in board and displaying the specific message  ****************************/
/**
 * This function checks, if a task exists in one of the columns
 * @param {array} array - statusTask
 * @param {string} status - Div container with specific status
 */
function checkStatusContainer(taskArray, status) {
  let toDo = document.getElementById('toDo');
  let inProgress = document.getElementById('inProgress');
  let awaitingFeedback = document.getElementById('awaitingFeedback');
  let done = document.getElementById('doneTask');
  if (taskArray.length === 0 && status === "toDo") {
    showTaskMessage(toDo, "No tasks to do");
  }
  if (taskArray.length === 0 && status === "inProgress") {
    showTaskMessage(inProgress, "No tasks in progress");
  }
  if (taskArray.length === 0 && status === "awaitingFeedback") {
    showTaskMessage(awaitingFeedback, "No tasks await feedback");
  }
  if (taskArray.length === 0 && status === "doneTask") {
    showTaskMessage(done, "No tasks are done");
  }
}

/**
 * This function shows a message  if in column is no task existing
 * @param {*} container 
 * @param {string} message 
 */
function showTaskMessage(div, message) {
  div.innerHTML += ` 
  <div class="task-container"> <span style="color: #A8A8A8;" class="center">${message}</span></div>
  `;
}

/******************************************* This part handles prio images and prio buttons in board.html   *********************************************************/

/**
 *  This function creates vars for elements and and executes the toggle-function
 * @param {string} priority - contains ID of the respective priority box
 */
function switchTaskPriority(priority) {
  let urgentTask = document.getElementById('urgent');
  let mediumTask = document.getElementById('medium');
  let lowTask = document.getElementById('low');
  let imgUrgent = document.getElementById('img-urgent');
  let imgMedium = document.getElementById('img-medium');
  let imgLow = document.getElementById('img-low');
  change(priority, urgentTask, mediumTask, imgUrgent, imgMedium, lowTask, imgLow);
}


/**
* This function starts the toggle for the specififc priority
* @param {string} priority - refers to togglePriority
* @param {string} urgent - ID of urgent-priority
* @param {string} medium - ID of medium-priority 
* @param {string} imgUrgent - ID of urgent-image
* @param {string} imgMedium- ID of medium-image 
* @param {string} low - ID of low-priority 
* @param {string} imgLow - ID of low-image 
*/
function change(priority, urgentTask, mediumTask, imgUrgent, imgMedium, lowTask, imgLow) {
  if (priority === 'urgent') {
    changeUrgentTask(urgentTask, mediumTask, imgUrgent, imgMedium, lowTask, imgLow);
  }
  if (priority === 'medium') {
    changeMediumTask(urgentTask, mediumTask, imgUrgent, imgMedium, lowTask, imgLow);
  }
  if (priority === 'low') {
    changeLowTask(urgentTask, mediumTask, imgUrgent, imgMedium, lowTask, imgLow);
  }
}


/**
* This function changes the urgent-priority-task and switch the other priorities back, 
* if they have been already selected.
*/
function changeUrgentTask(urgentTask, mediumTask, imgUrgent, imgMedium, lowTask, imgLow) {
  if (urgentTask.classList.contains('back-white')) {
    switchUrgentTask(urgentTask, imgUrgent);
  } else {
    switchUrgentTaskBack(urgentTask, imgUrgent);
  }
  if (mediumTask.classList.contains('back-medium')) {
    switchMediumTaskBack(mediumTask, imgMedium);
  }
  if (lowTask.classList.contains('back-low')) {
    switchLowTaskBack(lowTask, imgLow);
  }
}


/**
* This function changes the medium-priority-task and switch the other priorities back, 
* if they have been already selected.
*/
function changeMediumTask(urgentTask, mediumTask, imgUrgent, imgMedium, lowTask, imgLow) {
  if (mediumTask.classList.contains('back-white')) {
    switchMediumTask(mediumTask, imgMedium);
  } else {
    switchMediumTaskBack(mediumTask, imgMedium);
  }
  if (urgentTask.classList.contains('back-urgent')) {
    switchUrgentTaskBack(urgentTask, imgUrgent);
  }
  if (lowTask.classList.contains('back-low')) {
    switchLowTaskBack(lowTask, imgLow);
  }
}


/**
* This function changes the low-priority-task and switch the other priorities back, 
* if they have been already selected.
*/
function changeLowTask(urgentTask, mediumTask, imgUrgent, imgMedium, lowTask, imgLow) {
  if (lowTask.classList.contains('back-white')) {
    switchLowTask(lowTask, imgLow);
  } else {
    switchLowTaskBack(lowTask, imgLow);
  }
  if (urgentTask.classList.contains('back-urgent')) {
    switchUrgentTaskBack(urgentTask, imgUrgent);
  }
  if (mediumTask.classList.contains('back-medium')) {
    switchMediumTaskBack(mediumTask, imgMedium);
  }
}


// Changes the background color and image of urgent priority
function switchUrgentTask(urgentTask, imgUrgent) {
  urgentTask.classList.remove('back-white');
  urgentTask.classList.add('back-urgent');
  urgentTask.classList.add('prio-choosed');
  imgUrgent.src = 'assets/img/urgent_white.svg';
}


// Changes the background color and image back of urgent priority
function switchUrgentTaskBack(urgentTask, imgUrgent) {
  urgentTask.classList.remove('back-urgent');
  urgentTask.classList.add('back-white');
  urgentTask.classList.remove('prio-choosed');
  imgUrgent.src = 'assets/img/urgent_red.svg';
}


// Changes the background color and image of medium priority
function switchMediumTask(mediumTask, imgMedium) {
  mediumTask.classList.remove('back-white');
  mediumTask.classList.add('back-medium');
  mediumTask.classList.add('prio-choosed');
  imgMedium.src = 'assets/img/medium_white.svg';
}


// Changes the background color and image back of medium priority
function switchMediumTaskBack(mediumTask, imgMedium) {
  mediumTask.classList.remove('back-medium');
  mediumTask.classList.add('back-white');
  mediumTask.classList.remove('prio-choosed');
  imgMedium.src = 'assets/img/medium_yellow.svg';
}


// Changes the background color and image of low priority
function switchLowTask(lowTask, imgLow) {
  lowTask.classList.remove('back-white');
  lowTask.classList.add('back-low');
  lowTask.classList.add('prio-choosed')
  imgLow.src = 'assets/img/low_white.svg';
}


// Changes the background color and image back of low priority
function switchLowTaskBack(lowTask, imgLow) {
  lowTask.classList.remove('back-low');
  lowTask.classList.add('back-white');
  lowTask.classList.remove('prio-choosed')
  imgLow.src = 'assets/img/low_green.svg';
}

/******************************************  Opens and closes the contact list in task editor   *********************************************************************/
/**
 * Toggle the visibility of the contact list in the Add Task HTML and change the border color to blue.
 * @param {string} id - The identifier for the editor.
 */
function toggleContactListEditor(id) {
  const editorContactList = document.getElementById(`editor-contact-list${id}`);
  const dropdownArrowEditor = document.getElementById('dropdown-arrow-editor');
  const closeContactsEditor = document.getElementById('close-contacts-editor');
  if (editorContactList.classList.contains('d-none')) {
    editorContactList.classList.remove('d-none');
    dropdownArrowEditor.classList.add('d-none');
    closeContactsEditor.classList.remove('d-none');
    changeBorderColorContactListEditor(id);
  } else {
    editorContactList.classList.add('d-none');
    dropdownArrowEditor.classList.remove('d-none');
    closeContactsEditor.classList.add('d-none');
    resetBorderColorContactListEditor(id);
  }
}

/*********************************************  Changes the border-color of the search bar  ***********************************************************************/
/**
 * Toggle the border color of the search bar.
 * @param {string} color - The color to set for the border.
 */
function setBorderColorSearchBar(color) {
  let input = document.getElementById('search');
  let btn = document.getElementById('search-btn');
  input.style.borderColor = color;
  btn.style.borderColor = color;
}

function changeBorderColorSearchBar() {
  setBorderColorSearchBar('#29ABE2');
}


function resetBorderColorSearchBar() {
  setBorderColorSearchBar('#D1D1D1');
}

/********************************************** Changes the border-color of contact list in task editor  *************************************************************/
/**
 * Toggle the border color of the contact list in the editor.
 * @param {string} id - The identifier for the editor.
 * @param {string} color - The color to set for the border.
 */
function setBorderColorContactListEditor(id, color) {
  let input = document.getElementById('input-contact-editor');
  let btn = document.getElementById('btn-contact-editor');
  input.style.borderColor = color;
  btn.style.borderColor = color;
}

function changeBorderColorContactListEditor(id) {
  setBorderColorContactListEditor(id, '#29ABE2');
}

function resetBorderColorContactListEditor(id) {
  setBorderColorContactListEditor(id, '#D1D1D1');
}

/*********************************************  Changes border-color of subtask input in  task editor  **************************************************************/
/**
 * Toggle the border color of subtask input and button in the editor.
 * @param {string} id - The identifier for the editor.
 * @param {string} color - The color to set for the border.
 */
function setBorderColorSubtaskInputInEditor(id, color) {
  let input = document.getElementById(`subtask-input-editor-${id}`);
  let btn = document.getElementById(`btn-subtask-editor-${id}`);
  input.style.borderColor = color;
  btn.style.borderLeft = 'none';
  btn.style.borderColor = color;
}

function changeBorderColorSubtaskInputInEditor(id) {
  setBorderColorSubtaskInputInEditor(id, '#29ABE2');
}

function resetBorderColorSubtaskInputInEditor(id) {
  setBorderColorSubtaskInputInEditor(id, '#D1D1D1');
}

/*********************************************   Changes border-color of the subtask input in add task overlay   ************************************************/
function setBorderColorSubtaskInput(color) {
  let input = document.getElementById('subtask');
  let btn = document.getElementById('btn-subtask');
  input.style.borderColor = color;
  btn.style.borderLeft = 'none';
  btn.style.borderColor = color;
}

function changeBorderColorSubtaskInput() {
  setBorderColorSubtaskInput('#29ABE2');
}

function resetBorderColorSubtaskInput() {
  setBorderColorSubtaskInput('#D1D1D1');
}

/*************************************************************************************************************************************************************/

//Opens contact list in board.html
function openContactListInBoardHTML() {
  document.getElementById('open-contact').classList.add('d-none');
  document.getElementById('close-contact').classList.remove('d-none');
  document.getElementById('contact-list-board').classList.remove('d-none');
}


//Close contact list in board.html
function closeContactListInBoardHTML() {
  document.getElementById('open-contact').classList.remove('d-none');
  document.getElementById('close-contact').classList.add('d-none');
  document.getElementById('contact-list-board').classList.add('d-none');
}


// Handles the category list in add task overlay board.html
function toggleCategoryListAddTaskOverlayInBoardHTML() {
  const openButton = document.getElementById('open');
  const closeButton = document.getElementById('close');
  const categoryList = document.getElementById('category-list-board');
  if (openButton.classList.contains('d-none')) {
    openButton.classList.remove('d-none');
    closeButton.classList.add('d-none');
    categoryList.classList.add('d-none');
  } else {
    openButton.classList.add('d-none');
    closeButton.classList.remove('d-none');
    categoryList.classList.remove('d-none');
  }
}




