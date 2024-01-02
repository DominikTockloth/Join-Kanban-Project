
/******************************************************  This part opens the specific task to edit   ******************************************************************/
/**This function renders the editor for the specific task
 *@param {string} title value of input title
 *@param {string} description  value of input description
 * @param {string} date value of the input date
 *@param {number} id id of task
 *@param {number} i   index of task
 */
function openTaskEditor(title, description, date, id, i) {
    closeDetailTaskCard(id);
    editTaskModeOnOrOff = true;
    document.getElementById('edit-task-overlay').classList.remove('d-none');
    let container = document.getElementById('edit-task-overlay');
    let editedDate = date.split('/');
    let dateFormatted = `${editedDate[2]}-${editedDate[1]}-${editedDate[0]}`;
    container.innerHTML = '';
    container.innerHTML += showEditTaskView(title, description, dateFormatted, id, i);
    showSubtasksInEditor(id, i);
    renderContactsInEditor(id, i);
    editTaskIdAndIndex(id, i);
    refreshEditorWithMatchingContacts(id, i);
    refreshSelectedPriorityInEditor(id, i);
}

/*****************************************************  This sets the id for edit task   *******************************************************************************/
/**
 * Here gets the edited task its id and index
 * @param {number} id - id of task 
 * @param {number} i  - index of task 
 */
function editTaskIdAndIndex(id, i) {
    editTaskId = id;
    editTaskIndex = i;
}


/****************************************************  This part is for the subtasks function in the editor   ***********************************************************/
/**
 * @param {number} id - number of editor
 * This function adds new subtasks in editor
  */
function addSubTaskInEditor(id) {
    let subtask = document.getElementById(`subtask-input-editor-${id}`).value;
    let subtaskcontainer = document.getElementById(`edit-subtask-container-${id}`);
    let idOfSubtask = `subtask${numberOfSubtasks}`;
    if (subtask.length > 0) {
        subtaskcontainer.innerHTML += showSubTasksInEditorContainer(idOfSubtask, subtask);
        numberOfSubtasks++;
    }
    document.getElementById(`subtask-input-editor-${id}`).value = '';
}

/**
 * This function renders the subtasks of the array tasks in editor
 * Used to show existing subtask
 * @param {string} id - id of editor
 * @param {string} i - index of task
 */
function showSubtasksInEditor(id, i) {
    let subtasks = allTasks[i].subtasks;
    if (subtasks) {
        let container = document.getElementById(`edit-subtask-container-${id}`);
        container.innerHTML = '';
        subtasks.forEach((subta, j) => {
            container.innerHTML += renderExcistingSubTasksInTaskEditor(subta, id, j);
        });
    }
}

/**
 * This function deletes the new added subtasks
 * @param {string} subtaskID - id of added subtasks
 */
function deleteSubTaskInEditor(subtaskID) {
    let subtaskElement = document.getElementById(subtaskID);
    if (subtaskElement) {
        subtaskElement.remove();
    }
}

/*******************************************************  This part handles all functions for the contacts in the task editor   ***************************************/
/**
 * This function renders all contacts in editor contact list
 * @param {number} id - id of editor
 */
function renderContactsInEditor(id) {
    let contactcontainer = document.getElementById(`editor-contact-list${id}`);
    contactcontainer.innerHTML = '';
    sortContactListByFirstName(allContacts);
    for (let i = 0; i < allContacts.length; i++) {
        const contact = allContacts[i];
        const contactname = contact.name;
        const firstLetter = getFirstLetter(contact.name);
        const bgColor = contact.backgroundcolor;
        contactcontainer.innerHTML += showContactsInTaskEditor(firstLetter, bgColor, id, i, contactname);
    }
}

/**
 * This function moves the selected contacts into the div underneath
 * @param {number} id - id of editor
 */
function pushSelectedContactsInEditor(id) {
    let selectedContactEditContainer = document.getElementById(`editor-selected-contacts${id}`);
    selectedContactEditContainer.innerHTML = '';
    addedContact = false;
    for (let i = 0; i < allContacts.length; i++) {
        if (higlightEditorContactSelected(id, i)) {
            const contact = allContacts[i];
            showSelectedContactsInEditor(selectedContactEditContainer, contact, i);
            addedContact = true;
        }
    }
}

/**
 * This function shows the selected contacts inside of the div 
 * @param {string} selectedContactEditContainer - added contacts div
 * @param {number} id - id of editor
 * @param {number} i - index of allContacts
 */
function showSelectedContactsInEditor(selectedContactEditContainer, contact, id, i) {
    const bgColorContact = contact.backgroundcolor;
    const firstLetters = getFirstLetter(contact.name);
    selectedContactEditContainer.innerHTML += `<div class="avatar-checked" style="background-color:${bgColorContact}" id="user-select-${id}-${i}">
    <span class="font-25">${firstLetters}</span>
     </div>`;
}

/**
 * 
 * @param {number} i -index of task editor 
 * @returns  a condition , if checkbox is checked and classlist is-checked is added
 */
function higlightEditorContactSelected(id, i) {
    let selected = document.getElementById(`user-select-${id}-${i}`);
    let selectedcheckbox = document.getElementById(`user-checkbox-${id}-${i}`);
    return selected.classList.contains('is-checked-editor') && selectedcheckbox.checked;
}

/**
 * This function compares the added contacts of each task with the selection of the contacts dropdown in editor
 * @param {number} id - id of editor
 * @param {number} i - index of task
 */
function refreshEditorWithMatchingContacts(id, i) {
    const contactsOfTask = allTasks[i].contacts; // Kontakte aus der Aufgabe
    if (!contactsOfTask) {
        return; // Keine Aufgabenkontakte vorhanden, nichts zu überprüfen
    }
    for (let j = 0; j < allContacts.length; j++) {
        const contact = allContacts[j];
        const contactname = contact.name;
        if (contactsOfTask.includes(contactname)) {
            checkSelectedContactsWithAlreadySelectedContacts(id, j, contact, contactname);
        }
    }
}

/**
 * This function updates the added contacts of each task with the selection of the contacts dropdown in editor
 * @param {number} i - index of allContacts
 * @param {string} contactname - name of contacts in 
 * @param {string} contact - array allContacts
 */
function checkSelectedContactsWithAlreadySelectedContacts(id, i, contact, contactname) {
    const firstLetters = getFirstLetter(contactname);
    const bgColorContact = contact.backgroundcolor;
    const selected = document.getElementById(`user-select-${id}-${i}`);
    const checkbox = document.getElementById(`user-checkbox-${id}-${i}`);
    checkbox.checked = false;
    if (!selected.classList.contains('is-checked-editor')) {
        selected.classList.add('is-checked-editor');
    }
    checkbox.checked = true;
    showAlreadySelectedContactsInEditor(id, i, bgColorContact, firstLetters);
}

/**
 * Here get the already selected contacts render in the div = editor-selected-contacts
 * @param {number} i - index of allContacts
 * @param {string} firstLetters - first letters of  the specific contact
 * @param {string} bgColorContact - background-color of contact
 */
function showAlreadySelectedContactsInEditor(id, i, bgColorContact, firstLetters) {
    let selectedContactEditContainer = document.getElementById(`editor-selected-contacts${id}`);
    let selected = document.getElementById(`user-select-${id}-${i}`);
    let checkbox = document.getElementById(`user-checkbox-${id}-${i}`);
    if (selected.classList.contains('is-checked-editor') && checkbox.checked) {
        selectedContactEditContainer.innerHTML += /*html*/ `<div class="avatar-checked" style="background-color:${bgColorContact}" id="user-select${i}">
        <span class="font-25">${firstLetters}</span>
         </div>`;
    }
}


/**************************************************  This part handles the checkboxes in edit task contact list   ******************************************************/
/**
 * This function handles the checkboxes in task editor
 * @param {number} id - id of task
 * @param {number} i - number of task
 */
function changeCheckboxInEditor(id, i) {
    let selected = document.getElementById(`user-select-${id}-${i}`);
    let checkbox = document.getElementById(`user-checkbox-${id}-${i}`);
    if (!selected.classList.contains('is-checked-editor')) {
        selected.classList.add('is-checked-editor');
        checkbox.checked = true;
        pushSelectedContactsInEditor(id);
    } else {
        selected.classList.remove('is-checked-editor');
        checkbox.checked = false;
    }
    pushSelectedContactsInEditor(id);
}

/**
 * Eventlistener for the edit task checkboxes
 */
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('[id^="user-checkbox"]'); //`user-checkbox${i}-${id}`
    checkboxes.forEach((checkbox, i) => {
        checkbox.addEventListener('change', () => {
            changeCheckboxInEditor(i);
        });
        pushSelectedContactsInEditor();
    });
});


// This function closes the edit task overlay in board.html
function closeEditTaskOverlay() {
    let overlay = document.getElementById('edit-task-overlay');
    overlay.classList.add('d-none');
  }

