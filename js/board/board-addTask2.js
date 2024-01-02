

/********************************************** Eventlistener to check , if category list and contact list is already loaded *******************************/

/**
 * Close category list if clicked outside.
 * @param {MouseEvent} event - The mouse event object.
 */
function closeCategoryListOnClickOutside(event) {
  var categoryList = document.getElementById('category-list');
  if (categoryList && isElementVisible(categoryList) && !categoryList.contains(event.target)) {   // Check if the clicked element is not inside the category list
    closeCategoryList();
  }
}

/**
 * Close assign list if clicked outside.
 * @param {MouseEvent} event - The mouse event object.
 */
function closeAssignListOnClickOutside(event) {
  var assignListContent = document.getElementById('assign-list-content');
  // Check if the clicked element is not inside the assign list
  if (assignListContent && isElementVisible(assignListContent) && !assignListContent.contains(event.target)) {
    closeAssignList();
  }
}

/**
 * Check the visibility of an element.
 * @param {HTMLElement} element - The HTML element to check.
 * @returns {boolean} True if the element is visible, otherwise false.
 */
function isElementVisible(element) {
  return element.offsetWidth > 0 && element.offsetHeight > 0;
}

// Add event listeners after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('mousedown', closeCategoryListOnClickOutside);  // Add event listener for category list
  document.body.addEventListener('mousedown', closeAssignListOnClickOutside); // Add event listener for assign list
});


/**++++++++++++++++++++++++++++++++++++++++++++ Shows the contacts in contact list in AddTask overlay board.html ******************************************************************/

/**
 * This function returns the contacts in Add Task Contact list
 * @param {string} firstLetter 
 * @param {string} bgColor 
 * @param {number} i 
 * @param {string} contactname 
 * @returns html div
 */
function showContactsToAssignInList(firstLetter, bgColor, i, contactname) {
  return   /* HTML  */  `  <div class="list-content" id="user-select${i}">
  <div class="contacts">
      <div class="avatar" style="background-color:${bgColor}" id="user${i}">
          <span class="font-25">${firstLetter}</span>
      </div>
      <label for="user${i}" class="contact-name">${contactname}</label>
  </div>
      <!-- Verknüpfen Sie das label-Element mit der Checkbox -->
      <div >
          <input type="checkbox" id="user-checkbox-${i}"  onclick="toggleCheckbox(${i})">
      </div>
</div> `;
}

/************************************************* Shows the added subtasks in subtask container in AddTask overlay board.html*************************************************/

/**
 * @param {number} numberOfSubtasks
 * @param {string} subtask 
  */
function showSubTasksInContainer(numberOfSubtasks, subtask) {
  return   /*  HTML  */ `
      <div  class="subtasks subtask-added" id="subtask${numberOfSubtasks}">
        <div>
            <li>${subtask}</li>
        </div>
        <div style="margin-right: 40px; display:flex; gap:5px;" ><img src="assets/img/edit-pencil.png" id="edit-pencil" onclick="openSubtaskEditor('${numberOfSubtasks}' , '${subtask}')"><span>|</span><img src="assets/img/delete.png" onclick="deleteSubtask('${numberOfSubtasks}')"></div>
    </div>
  `;
}


/***************************************************   Shows the subtask editor for the specific subtask   ************************************************************/

function showEditorOfSubtask(numberOfSubtasks, subtask) {
  return /* HTML */ `
  <div id="${numberOfSubtasks}" class="edit-container">
  <input type="text" value="${subtask}" id="editor-${numberOfSubtasks}" class="subtask-editor-input">
  <div class="subtask-btn">
    <div><img src="assets/img/checked-hook.png" onclick="saveNewSubtaskValue('${numberOfSubtasks}' ,'editor-${numberOfSubtasks}')"></div>
    <span>|</span>
    <div><img src="assets/img/delete.png" onclick="deleteSubtask('${numberOfSubtasks}')"></div>
  </div>
</div>
  `;
}

/***************************************************   Shows the new subtask editor value  **************************************************************************/

function showNewSubtaskValue(numberOfSubtasks, newSubtaskValue) {
  return /* HTML */ `
   <div  class="subtasks subtask-added">
      <div>
          <li>${newSubtaskValue}</li>
      </div>
      <div class="subtask-images"><img src="assets/img/edit-pencil.png" id="edit-pencil" onclick="openSubtaskEditor('${numberOfSubtasks}' , '${subtask}')"><span>|</span><img src="assets/img/delete.png" onclick="deleteSubtask('${numberOfSubtasks}')"></div>
  </div>
  `;
}

/*********************************************************  Shows Add task overlay with status to do   ****************************************************************/

function showOverlayToDo() {
  return /* HTML */ `
  <div class="edit-task-container">
      <div class="exit-edit-task">
        <div style="font-size: 30px; font-weight: 600;">Add Task</div>
        <div class="exit"><span onclick="closeAddTaskOverlay()">X</span></div>
      </div>
      <div class="scroll-container">
        <div class="edit-task-main">
          <div class="sub-container">
            <div class="column margin-bottom"><span class="font">Title<span class="required" style="margin-left: 8px;">*
                  required</span></span>
              <input type="text" placeholder="Enter title" id="title" class="input input-font color-bl" required
                onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)">
            </div>
            <div class="column margin-bottom"><span class="font">Description<span class="required"
                  style="margin-left: 8px;">* required</span></span>
              <textarea type="text" id="description" placeholder="Enter a description"
                class="input input-font input-size color-bl" cols="30" rows="8" required
                onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)"></textarea>
            </div>
            <div class="column margin-bottom" id="assigned-contact-list">
              <span class="font">Assigned to</span>
              <div class="align" style="height: 37px;" id="ctc-cont"> <input disabled type="text"
                  placeholder="Select contacts to assign" class="input input-font border-style black"
                  id="input-contact">
                <button id="btn-contact"><img src="assets/img/dropdown-arrow.png" onclick="toggleAssignList()"
                    id="dropdown-arrow"><img src="assets/img/close.png" class="d-none" id="close-list"
                    onclick="closeAssignList()"></button>
              </div>
              <div class="contact-list d-none" id="assign-list-content">
              </div>
            </div>
            <div class="selected-contacts" id="selected-contacts"></div>
          </div>
          <div class="border"></div>
          <div class="sub-container">
            <div class="column margin-bottom"><span class="font">Due date<span class="required"
                  style="margin-left: 8px;">* required</span></span>
              <input type="date" id="date" class="input input-font color-bl" required onfocus="changeBorderColor(this)"
                onblur="resetBorderColor(this)">
            </div>
            <div class="column margin-bottom"><span class="font">Prio</span>
              <div class="priority" id="prio-container">
                <div class="input input-font align gap back-white padd-resp prio-cont" id="urgent"
                  onclick="switchTaskPriority('urgent')"> Urgent <img src="assets/img/urgent_red.svg" id="img-urgent">
                </div>
                <div class="input input-font align gap back-medium prio-choosed padd-resp prio-cont" id="medium"
                  onclick="switchTaskPriority('medium')"> Medium <img src="assets/img/medium_white.svg"
                    id="img-medium">
                </div>
                <div class="input input-font align gap back-white padd-resp prio-cont" id="low"
                  onclick="switchTaskPriority('low')">
                  Low<img src="assets/img/low_green.svg" id="img-low"></div>
              </div>
            </div>
            <div class="column margin-bottom"><span class="font">Category <span class="required"
                  style="margin-left: 8px;">* required</span></span>
              <div class="align" id="input-category">
                <div id="category-text" class="input input-font border-style black" style="width: 100%;"><span
                    style="font-size: 18px; font-weight: 400;">Select Task
                    Category</span></div>
                <button id="btn-category"><img src="assets/img/dropdown-arrow.png" id="open-category"
                    onclick="toggleCategoryList()">
                  <img src="assets/img/clear.svg" id="close-category" class="d-none"
                    onclick="toggleCategoryList()"></button>
              </div>
              <div class="category-list d-none" id="category-list"></div>
            </div>

            <div class="column margin-bottom"><span class="font">Subtasks</span>
              <div class="align resp-subtask "> <input type="text" placeholder="Add new subtask" id="subtask"
                  class="input input-font border-style black color-bl" onfocus="toggleBorderColor('subtask', 'btn-subtask');">
                <button id="btn-subtask"><img src="assets/img/plus-sign.png" onclick="addSubTask()"></button>
              </div>
            </div>
            <ul class="subtask-container" id="subtask-container">
            </ul>
          </div>
        </div>
      </div>
      <div class="save-btn">
        <div class="clear" onclick="clearAddTaskForm()" id="clear">Clear X</div>
        <button class="button not-allowed" onclick="createTask('toDo')" id="btn-create" disabled>
          <span>Create Task</span> <img src="assets/img/checked.png" />
        </button>
      </div>
    </div>
  `;
}

/***************************************************  Shows Add task overlay with status in progress  **********************************************************/


function showOverlayInProgress() {
  return /* HTML */ `
    <div class="edit-task-container">
      <div class="exit-edit-task">
        <div style="font-size: 30px; font-weight: 600;">Add Task</div>
        <div class="exit"><span onclick="closeAddTaskOverlay()">X</span></div>
      </div>
      <div class="scroll-container">
        <div class="edit-task-main">
          <div class="sub-container">
            <div class="column margin-bottom"><span class="font">Title<span class="required" style="margin-left: 8px;">*
                  required</span></span>
              <input type="text" placeholder="Enter title" id="title" class="input input-font color-bl" required
                onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)">
            </div>
            <div class="column margin-bottom"><span class="font">Description<span class="required"
                  style="margin-left: 8px;">* required</span></span>
              <textarea type="text" id="description" placeholder="Enter a description"
                class="input input-font input-size color-bl" cols="30" rows="8" required
                onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)"></textarea>
            </div>
            <div class="column margin-bottom" id="assigned-contact-list">
              <span class="font">Assigned to</span>
              <div class="align" style="height: 37px;" id="ctc-cont"> <input disabled type="text"
                  placeholder="Select contacts to assign" class="input input-font border-style black"
                  id="input-contact">
                <button id="btn-contact"><img src="assets/img/dropdown-arrow.png" onclick="toggleAssignList()"
                    id="dropdown-arrow"><img src="assets/img/close.png" class="d-none" id="close-list"
                    onclick="closeAssignList()"></button>
              </div>
              <div class="contact-list d-none" id="assign-list-content">
              </div>
            </div>
            <div class="selected-contacts" id="selected-contacts"></div>
          </div>
          <div class="border"></div>
          <div class="sub-container">
            <div class="column margin-bottom"><span class="font">Due date<span class="required"
                  style="margin-left: 8px;">* required</span></span>
              <input type="date" id="date" class="input input-font color-bl" required onfocus="changeBorderColor(this)"
                onblur="resetBorderColor(this)">
            </div>
            <div class="column margin-bottom"><span class="font">Prio</span>
              <div class="priority" id="prio-container">
                <div class="input input-font align gap back-white padd-resp prio-cont" id="urgent"
                  onclick="switchTaskPriority('urgent')"> Urgent <img src="assets/img/urgent_red.svg" id="img-urgent">
                </div>
                <div class="input input-font align gap back-medium prio-choosed padd-resp prio-cont" id="medium"
                  onclick="switchTaskPriority('medium')"> Medium <img src="assets/img/medium_white.svg"
                    id="img-medium">
                </div>
                <div class="input input-font align gap back-white padd-resp prio-cont" id="low"
                  onclick="switchTaskPriority('low')">
                  Low<img src="assets/img/low_green.svg" id="img-low"></div>
              </div>
            </div>
            <div class="column margin-bottom"><span class="font">Category <span class="required"
                  style="margin-left: 8px;">* required</span></span>
              <div class="align" id="input-category">
                <div id="category-text" class="input input-font border-style black" style="width: 100%;"><span
                    style="font-size: 18px; font-weight: 400;">Select Task
                    Category</span></div>
                <button id="btn-category"><img src="assets/img/dropdown-arrow.png" id="open-category"
                    onclick="toggleCategoryList()">
                  <img src="assets/img/clear.svg" id="close-category" class="d-none"
                    onclick="toggleCategoryList()"></button>
              </div>
              <div class="category-list d-none" id="category-list"></div>
            </div>

            <div class="column margin-bottom"><span class="font">Subtasks</span>
              <div class="align resp-subtask "> <input type="text" placeholder="Add new subtask" id="subtask"
                  class="input input-font border-style black color-bl" onfocus="toggleBorderColor('subtask', 'btn-subtask');">
                <button id="btn-subtask"><img src="assets/img/plus-sign.png" onclick="addSubTask()"></button>
              </div>
            </div>
            <ul class="subtask-container" id="subtask-container">
            </ul>
          </div>
        </div>
      </div>
      <div class="save-btn">
        <div class="clear" onclick="clearAddTaskForm()" id="clear">Clear X</div>
        <button class="button not-allowed" onclick="createTask('inProgress')" id="btn-create" disabled>
          <span>Create Task</span> <img src="assets/img/checked.png" />
        </button>
      </div>
    </div>
  
  `;
}

/*********************************************************** Shows Add task overlay with status awaiting feedback ***********************************************/

function showOverlayAwaitingFeedback() {
  return /* HTML */ `
    <div class="edit-task-container">
      <div class="exit-edit-task">
        <div style="font-size: 30px; font-weight: 600;">Add Task</div>
        <div class="exit"><span onclick="closeAddTaskOverlay()">X</span></div>
      </div>
      <div class="scroll-container">
        <div class="edit-task-main">
          <div class="sub-container">
            <div class="column margin-bottom"><span class="font">Title<span class="required" style="margin-left: 8px;">*
                  required</span></span>
              <input type="text" placeholder="Enter title" id="title" class="input input-font color-bl" required
                onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)">
            </div>
            <div class="column margin-bottom"><span class="font">Description<span class="required"
                  style="margin-left: 8px;">* required</span></span>
              <textarea type="text" id="description" placeholder="Enter a description"
                class="input input-font input-size color-bl" cols="30" rows="8" required
                onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)"></textarea>
            </div>
            <div class="column margin-bottom" id="assigned-contact-list">
              <span class="font">Assigned to</span>
              <div class="align" style="height: 37px;" id="ctc-cont"> <input disabled type="text"
                  placeholder="Select contacts to assign" class="input input-font border-style black"
                  id="input-contact">
                <button id="btn-contact"><img src="assets/img/dropdown-arrow.png" onclick="toggleAssignList()"
                    id="dropdown-arrow"><img src="assets/img/close.png" class="d-none" id="close-list"
                    onclick="closeAssignList()"></button>
              </div>
              <div class="contact-list d-none" id="assign-list-content">
              </div>
            </div>
            <div class="selected-contacts" id="selected-contacts"></div>
          </div>
          <div class="border"></div>
          <div class="sub-container">
            <div class="column margin-bottom"><span class="font">Due date<span class="required"
                  style="margin-left: 8px;">* required</span></span>
              <input type="date" id="date" class="input input-font color-bl" required onfocus="changeBorderColor(this)"
                onblur="resetBorderColor(this)">
            </div>
            <div class="column margin-bottom"><span class="font">Prio</span>
              <div class="priority" id="prio-container">
                <div class="input input-font align gap back-white padd-resp prio-cont" id="urgent"
                  onclick="switchTaskPriority('urgent')"> Urgent <img src="assets/img/urgent_red.svg" id="img-urgent">
                </div>
                <div class="input input-font align gap prio-choosed back-medium padd-resp prio-cont" id="medium"
                  onclick="switchTaskPriority('medium')"> Medium <img src="assets/img/medium_white.svg"
                    id="img-medium">
                </div>
                <div class="input input-font align gap back-white padd-resp prio-cont" id="low"
                  onclick="switchTaskPriority('low')">
                  Low<img src="assets/img/low_green.svg" id="img-low"></div>
              </div>
            </div>
            <div class="column margin-bottom"><span class="font">Category <span class="required"
                  style="margin-left: 8px;">* required</span></span>
              <div class="align" id="input-category">
                <div id="category-text" class="input input-font border-style black" style="width: 100%;"><span
                    style="font-size: 18px; font-weight: 400;">Select Task
                    Category</span></div>
                <button id="btn-category"><img src="assets/img/dropdown-arrow.png" id="open-category"
                    onclick="toggleCategoryList()">
                  <img src="assets/img/clear.svg" id="close-category" class="d-none"
                    onclick="toggleCategoryList()"></button>
              </div>
              <div class="category-list d-none" id="category-list"></div>
            </div>

            <div class="column margin-bottom"><span class="font">Subtasks</span>
              <div class="align resp-subtask "> <input type="text" placeholder="Add new subtask" id="subtask"
                  class="input input-font border-style black color-bl" onfocus="toggleBorderColor('subtask', 'btn-subtask');">
                <button id="btn-subtask"><img src="assets/img/plus-sign.png" onclick="addSubTask()"></button>
              </div>
            </div>
            <ul class="subtask-container" id="subtask-container">
            </ul>
          </div>
        </div>
      </div>
      <div class="save-btn">
        <div class="clear" onclick="clearAddTaskForm()" id="clear">Clear X</div>
        <button class="button not-allowed" onclick="createTask('awaitingFeedback')" id="btn-create" disabled>
          <span>Create Task</span> <img src="assets/img/checked.png" />
        </button>
      </div>
    </div>
  `;
}