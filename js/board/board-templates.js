/***************************************************************  HTML of the task cards on board  ********************************************************************/

// This renders the single tasks on board.html
function showTaskElementInBoard(title, category, description, priorityImg, numberOfSubtasks, id) {
  return /* HTML */`<div class="progress-content" onclick="openDetailTaskCard(${id})" id="task-div-${id}" draggable = "true" ondragstart ="dragTo(${id})" ondragend="stopDragTo(${id})">
 <div style="display:flex">   <div class="progress-cont-headline" id="category-${id}">
      <h4>${category}</h4> 
    </div>
    <div class="arrows d-none">
    ${allTasks[getTaskPosition(allTasks, id)].status !== "doneTask" ? `
      <img src="assets/img/arrow-down.png" onclick="moveTaskToStatusBelow(${id}) ; stopCloseDiv(event)" id="arrow-down" style="margin-left:10px">
     ` : ''}
      ${allTasks[getTaskPosition(allTasks, id)].status !== "toDo" ? `
      <img src="assets/img/arrow-up.png" onclick="moveTaskToStatusAbove(${id}) ; stopCloseDiv(event)" id="arrow-up" style="margin-left:10px">
      ` : ''}
      </div></div>
    <div class="column">
      <span>${title}</span> <p>${description}</p>
    </div>
    <div class="users">
      <div class="flex" style="width:50%" id="selected-contacts-container-${id}"> 
      </div>
      ${priorityImg !== "" ? /* HTML*/ `  <div class="prio-img-container"><img src="../${priorityImg}" /></div>
    </div>`
      : ''}
  ${numberOfSubtasks > 0 ? /*html*/`
    <div class="subtask-content">
      <div class="progressbar-container">
        <div class="progress-bar" role="progressbar" id="progressbar-${id}" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
      </div> 
       
      <div class="subtask-counter">
        <div> <span id="checked-subtasks-${id}">0</span>
          <span>/</span>
          <span id="subtasks-length-${id}">${numberOfSubtasks}</span>
        </div>
        <span>Subtasks</span>
      </div>
    </div>
  </div>`: ''}
  `;
}

/* **************************************************************  HTML of the detail task view  *************************************************************************/

// This renders the detail view of the specific task
function showDetailViewOfTask(i, id, category, title, description, date, priority, priorityImg, subtasks) {
  return /* HTML */ `<div class="progress-content-overlay" id="detail-card-${id}" >
  <div class="progress-cont-headline-overlay" >
    <div id="category-detail-${i}" style="border-radius:10px">
      <h4 class="edit-task-h4">${category}</h4>
    </div>
    <div class="hover align" id="exit"><span class="fw-600 fs-25 " onclick="closeDetailTaskCard(${id})">X</span></div>
  </div>
  <span class="edit-task-span">${title} </span>
  
  <p class="p-edit-task mar-top">${description}</p>
  <div style="display:flex; gap:20px" class="mar-top mar-bot"><p class="p-edit-task mar-top">Due date :</p><p class="p-edit-task mar-top">${date}</p></div>
  
  ${priorityImg !== "" ? /*html*/ `
  <div class="flex-edit mar-top mar-bot">
    <p class="p-edit-task" style="margin-right:28px">
      Priority :
    </p><span class="span-edit">${priority}</span><img src="../${priorityImg}" class="img-edit">
  </div>
  `: ''}
  <p class="p-edit-task fw-600 mar-top mar-bot">Assigned To:</p>
  <div class="scroll-container">
  <div class="users-edit" id="selected-contacts-detail-${id}"></div>
   </div>
  ${subtasks.length > 0 ? /*html*/ `
  <div class="subtasks-edit"><span>Subtasks</span></div>
  <div id="subtasks-${i}"></div>
    `: ''}
  <div class="edit-delete" >
    <div class="edit-delete-content" ><img src="assets/img/delete.png" class="img">
      <p onclick="deleteTask('${i}')">Delete</p> | 
    </div>
    <div class="edit-delete-content" onclick="openTaskEditor('${title}', '${description}' , '${date}' , '${id}' , '${i}')"><img src="assets/img/edit-pencil.png" class="img">
      <p>Edit</p>
    </div>
  </div>
</div>
  `;
}

/**************************************************   HTML of the subtasks rendered in detail card view    *************************************************************/
/**
 * This function creates all subtasks inside the array "subtask"
 * @param {string} itemSubtask - subtask-array 
 * @param {number} i - specific number of detailed task (task) -used as ID
 * @param {number} j - specific number of subtask
 * @param {string} statusSubtask 
 * @returns created subtask
 */
function subtasksOfDetailView(itemSubtask, i, j, statusSubtask) {
  return /* HTML */ `
  <div class="sub-content">
  <input type="checkbox" id="checkbox-${i}-${j}" class="checkbox" ${statusSubtask ? 'checked' : ''}>
  <span class="p-edit-task" id="subtask-${i}-${j}">${itemSubtask}</span> 
</div>
  `;
}

/******************************************************   HTML of Edit Task overlay in board.html    *******************************************************************/
/**
 * This function creates the edit task overlay of specific task
 */
function showEditTaskView(title, description, dateFormatted, id, i) {
  return /* HTML */`
 <div class="edit-task-container" id="task-editor-card-${id}">
      <div class="exit-edit-task">
        <div style="font-size: 30px; font-weight: 600;">Edit</div>
        <div class="exit"><span onclick="closeEditTaskOverlay(id)">X</span></div>
      </div>
      <div class="scroll-container">
        <div class="edit-task-main">
          <div class="sub-container">
            <div class="column margin-bottom"><span class="font">Title</span>
              <input type="text" value="${title}" id="edit-title-${id}" class="input input-font color-bl" required
                onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)">
            </div>
            <div class="column margin-bottom"><span class="font">Description</span>
              <textarea type="text"  id="edit-description-${id}" value="${description}"
                class="input input-font input-size color-bl" cols="30" rows="8" required onfocus="changeBorderColor(this)"
                onblur="resetBorderColor(this)">${description}</textarea>
            </div>
            <div class="column margin-bottom" id="assigned-contact-list">
              <span class="font">Assigned to</span>
              <div class="align" style="height: 37px;z-index:1;"> <input disabled type="text"
                  placeholder="Select contacts to assign" class="input input-font border-style black"
                  id="input-contact-editor">
                <button id="btn-contact-editor"><img src="assets/img/dropdown-arrow.png" onclick="toggleContactListEditor(${id})"
                    id="dropdown-arrow-editor"><img src="assets/img/close.png" class="d-none" id="close-contacts-editor"
                    onclick="toggleContactListEditor(${id})"></button>
              </div>
              <div class="contact-list d-none" id="editor-contact-list${id}">
              </div>
            </div>
            <div class="selected-contacts" id="editor-selected-contacts${id}"></div>
          </div>
          <div class="border"></div>
          <div class="sub-container">
            <div class="column margin-bottom"><span class="font">Due date</span>
              <input type="date" id="edit-date-${id}" class="input input-font color-bl"  required onfocus="changeBorderColor(this)"
                onblur="resetBorderColor(this)" value="${dateFormatted}">
            </div>
            <div class="column margin-bottom"><span class="font">Prio</span>
              <div class="priority">
                <div class="input input-font align gap back-white padd-resp" id="urgent-${id}"
                  onclick="switchTaskPriorityInEditor('urgent', ${id})"> Urgent <img src="assets/img/urgent_red.svg" id="img-urgent-${id}">
                </div>
                <div class="input input-font align gap back-white padd-resp" id="medium-${id}"
                  onclick="switchTaskPriorityInEditor('medium', ${id})"> Medium<img src="assets/img/medium_yellow.svg" id="img-medium-${id}">
                </div>
                <div class="input input-font align gap back-white padd-resp" id="low-${id}"
                  onclick="switchTaskPriorityInEditor('low', ${id})">
                  Low<img src="assets/img/low_green.svg" id="img-low-${id}"></div>
              </div>
            </div>
            
            <div class="column margin-bottom"><span class="font">Subtasks</span>
              <div class="align resp-subtask"> <input type="text" placeholder="Add new subtask" id="subtask-input-editor-${id}"
                  class="input input-font border-style black color-bl" onfocus="changeBorderColorSubtaskInputInEditor(${id})"
                  onblur="resetBorderColorSubtaskInputInEditor(${id})">
                <button id="btn-subtask-editor-${id}" class="btn-sbt-editor"><img src="assets/img/plus-sign.png" onclick="addSubTaskInEditor(${id})"></button>
              </div>
            </div>
            <ul class="subtask-container" id="edit-subtask-container-${id}">

            </ul>
          </div>
        </div>
      </div>
      <div class="save-btn">
        <div><button class="button" style="justify-content: center;" id="btn-create" onclick="saveTheEditedTask(${id} , ${i})"><span>Save</span> <img
              src="assets/img/checked.png"></button></div>
      </div>
    </div>
  `;
}

/**************************************************        Shows the excisting subtasks in task editor     ********************************************************/

/** 
 * This function shows the excisting subtasks in task editor
*/
function renderExcistingSubTasksInTaskEditor(subta, id, j) {
  return   /*  HTML  */ `
    <div  class="subtasks subtask-added-editor" id="subtask-edit-${id}-${j}">
      <div>
          <li>${subta}</li>
      </div>
      <div style="margin-right: 40px;"><img src="assets/img/delete.png" onclick="deleteSubTaskInEditor('subtask-edit-${id}-${j}')"></div>
  </div>
`;
}

/*************************************************  Shows the added subtasks in the editor in subtask container  *****************************************************/

/**
 * @param {number} numberOfSubtasks
 * @param {string} subtask 
  */
function showSubTasksInEditorContainer(idOfSubtask, subtask) {
  return   /*  HTML  */ `
    <div  class="subtasks subtask-added-editor" id="${idOfSubtask}">
      <div>
          <li>${subtask}</li>
      </div>
      <div style="margin-right: 40px;"><img src="assets/img/delete.png" onclick="deleteSubTaskInEditor('${idOfSubtask}')"></div>
  </div>
`;

}

/**************************************************   Shows contact list in task-editor in board.html   *******************************************************************/
/**
 * This function returns the contacts in Add Task Contact list
 * @param {string} firstLetter 
 * @param {string} bgColor 
 * @param {number} i 
 * @param {string} contactname 
 * @returns html div
 */
function showContactsInTaskEditor(firstLetter, bgColor, id, i, contactname) {
  return   /* HTML  */  `  <div class="list-content" id="user-select-${id}-${i}" >
          <div class="contacts">
            <div class="avatar" style="background-color:${bgColor}" id="user${i}"><span class="font-25">${firstLetter}</span>
              </div><span class="contact-name">${contactname}</span> 
              </div>
            <div> <input type="checkbox" id="user-checkbox-${id}-${i}" onclick="changeCheckboxInEditor(${id} , ${i})"></div>
               </div> `;
}

