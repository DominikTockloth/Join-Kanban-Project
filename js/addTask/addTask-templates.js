/**************************************************   Shows the contacts in contact list  ********* ******************************************************************/

/**
 * This function returns the contacts in Add Task Contact list
 * @param {string} firstLetter 
 * @param {string} bgColor 
 * @param {number} i 
 * @param {string} contactname 
 * @returns html div
 */
function showContactsToAssignInList(firstLetter, bgColor, i, contactname) {
  return   /* HTML  */  ` 
  <div class="list-content" id="user-select${i}">
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
</div>
`;
}


/***************************************************   Shows the added subtasks in subtask container   **************************************************************/

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
      <div class="subtask-images"><img src="assets/img/edit-pencil.png" id="edit-pencil" onclick="openSubtaskEditor('${numberOfSubtasks}' , '${subtask}')"><span>|</span><img src="assets/img/delete.png" onclick="deleteSubtask('${numberOfSubtasks}')"></div>
  </div>
`;
}

/***************************************************   Shows the subtask editor for the specific subtask   ******************************************************/

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

/***************************************************   Shows the new subtask editor value  *******************************************************************/

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