/**
 * This function saves the edited task with the changed values
 * @param {number} id - id of task
 * @param {number} i - number of task
 */
function saveTheEditedTask(id, i) {
    editTaskModeOnOrOff = false;
    const newEditedTask = allTasks[i];
    let inputTitle = document.getElementById(`edit-title-${id}`).value;
    let inputDescription = document.getElementById(`edit-description-${id}`).value;
    let inputDate = document.getElementById(`edit-date-${id}`).value;
    let priority = prioritySelectedInEditor(id);
    let priorityImg = priorityImageSelectedInEditor(id);
    let contacts = contactSelectedInEditor();
    let bgContact = backgroundOfSelectedContactInEditor();
    let subtasks = selectedSubtasksInEditor();
    editedTaskValuesPush(newEditedTask, inputTitle, inputDescription, inputDate, priority, priorityImg, contacts, bgContact, subtasks);
    closeEditTaskOverlay();
    renderTasksByStatus();
}

/***************************************************  This part sets all new values of the edited task    ***********************************************************/
/**
 * This function pushes all gathered infos of the editor inside of the array tasks
 * @param {string} newEditedTask - array tasks
 * @param {string} inputTitle - allTasks input of title
 * @param {string} inputDescription - allTasks input of textarea
 * @param {string} inputDate- allTasks input of  date
 * @param {string} priorityImg - allTasks priority image
 * @param {string} priority - allTasks priority
 * @param {string} contacts - allTasks contact
 * @param {string} subtasks - allTasks subtasks
 * @param {string} bgContact - allTasks backgrouncolors of contacts
 */
function editedTaskValuesPush(newEditedTask, inputTitle, inputDescription, inputDate, priority, priorityImage, contacts, bgContact, subtasks) {
    newEditedTask.title = inputTitle;
    newEditedTask.description = inputDescription;
    newEditedTask.date = inputDate;
    newEditedTask.priority = priority;
    newEditedTask.priorityImage = priorityImage;
    newEditedTask.contacts = contacts;
    newEditedTask.bgContact = bgContact;
    newEditedTask.subtasks = subtasks;
}


/**
 * All selected contacts from the list get pushed to array contactsSelected
 * @returns -  The array with selected contacts in editor
 */
function contactSelectedInEditor() {
    let editorContactsSelected = [];
    let contactChecked = document.querySelectorAll('.list-content.is-checked-editor');
    contactChecked.forEach(contact => {
        let contactDiv = contact.querySelector('span.contact-name');
        let contactname = contactDiv.textContent;
        editorContactsSelected.push(contactname);
    });
    return editorContactsSelected;
}


/**
 * All background colors of the selected contacts get pushed to array contactsSelectedBgColor
 * @returns - array with background-colors in editor
 */
function backgroundOfSelectedContactInEditor() {
    let editorContactsSelected = contactSelectedInEditor();
    let bgContact = [];
    for (let i = 0; i < editorContactsSelected.length; i++) {
        let contactSelected = editorContactsSelected[i];
        for (let j = 0; j < allContacts.length; j++) {
            let contact = allContacts[j];
            if (contact.name === contactSelected) {
                bgContact.push(contact.backgroundcolor);
                break;
            }
        }
    }
    return bgContact;
}


/**
 * Retrieves the text content of all elements with the 'subtask-added' class.
 * @returns {Array} An array containing the text content of all 'subtask-added' elements.
 */
function selectedSubtasksInEditor() {
    let elementsOfSubtasks = document.querySelectorAll('.subtask-added-editor'); // Select all elements with the 'subtask-added' class
    let subtasks = [];  // Initialize an empty array to store subtask text content
    // Iterate through each 'subtask-added' element and add its text content to the 'subtasks' array
    elementsOfSubtasks.forEach(elementsOfSubtask => {
        subtasks.push(elementsOfSubtask.innerText);
    });
    return subtasks; // Return the array containing the text content of all 'subtask-added' elements
}


/**
 * This function gets the specific priority.innerText
 * @returns - priority
 */
function prioritySelectedInEditor(id) {
    let priorityUrgent = document.getElementById(`urgent-${id}`);
    let priorityMedium = document.getElementById(`medium-${id}`);
    let priorityLow = document.getElementById(`low-${id}`);
    let priority = '';
    if (priorityUrgent.classList.contains('back-urgent')) {
        priority = priorityUrgent.innerText;
    } else if (priorityMedium.classList.contains('back-medium')) {
        priority = priorityMedium.innerText
    } else if (priorityLow.classList.contains('back-low')) {
        priority = priorityLow.innerText;
    }
    return priority;
}


/**
 * The image of the selected priority in editor gets returned
 * @param {number} id - id of editor
 * @returns priorityImg
 */
function priorityImageSelectedInEditor(id) {
    let priorityUrgent = document.getElementById(`urgent-${id}`);
    let priorityMedium = document.getElementById(`medium-${id}`);
    let priorityLow = document.getElementById(`low-${id}`);
    let priorityImage = '';
    if (priorityUrgent.classList.contains('back-urgent')) {
        priorityImage = '/assets/img/prio-urgent.png';
    }
    if (priorityMedium.classList.contains('back-medium')) {
        priorityImage = '/assets/img/prio-medium.png';
    }
    if (priorityLow.classList.contains('back-low')) {
        priorityImage = '/assets/img/prio-low.png';
    }
    return priorityImage;
}


/**
 * This function determines the priorities and priority-imgages of in editor
 * @param {number} id - id of editor
 * @param {number} i - index of tasks
 */
function refreshSelectedPriorityInEditor(id, i) {
    const task = allTasks[i]
    let priority = task.priority;
    let urgentTask = document.getElementById(`urgent-${id}`);
    let mediumTask = document.getElementById(`medium-${id}`);
    let lowTask = document.getElementById(`low-${id}`);
    let imgUrgent = document.getElementById(`img-urgent-${id}`);
    let imgMedium = document.getElementById(`img-medium-${id}`);
    let imgLow = document.getElementById(`img-low-${id}`);
    taskEditorHighlightPriorityBoxes(priority, urgentTask, mediumTask, lowTask, imgUrgent, imgMedium, imgLow);
}


/**
 * This function highlights the priority-box in editor, which has the same priority as in the array tasks 
 * @param {string} priority - priority in task
 * @param {string} urgent - id of urgent-box in editor
 * @param {string} imgUrgent - id of urgent-img in editor
 * @param {string} medium - id of medium in editor
 * @param {string} imgMedium - id of medium-img in editor
 * @param {string} low - id of low-box in editor
 * @param {string} imgLow-id of low-img in editor
 */
function taskEditorHighlightPriorityBoxes(priority, urgentTask, mediumTask, lowTask, imgUrgent, imgMedium, imgLow) {
    if (priority) {
        if (priority === 'Urgent') {
            switchUrgentTask(urgentTask, imgUrgent);
        } else if (priority === 'Medium') {
            switchMediumTask(mediumTask, imgMedium);
        } else if (priority === 'Low') {
            switchLowTask(lowTask, imgLow);
        }
    }
}


/**This function creates vars for elements and and executes the toggle-function
 * This function toggles the priority-boxes inside of the editor
 * @param {string} priority - 'priority-name'
 * @param {number} id - id of editor
 */
function switchTaskPriorityInEditor(priority, id) {
    let urgentTask = document.getElementById(`urgent-${id}`);
    let mediumTask = document.getElementById(`medium-${id}`);
    let lowTask = document.getElementById(`low-${id}`);
    let imgUrgent = document.getElementById(`img-urgent-${id}`);
    let imgMedium = document.getElementById(`img-medium-${id}`);
    let imgLow = document.getElementById(`img-low-${id}`);
    change(priority, urgentTask, mediumTask, imgUrgent, imgMedium, lowTask, imgLow);
}

