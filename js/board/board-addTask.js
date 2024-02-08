/**
 * All values of the created task get pushed to array allTasks
 */
async function createTask(status) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let category = categorySelected();
    let priority = prioritySelected();
    let priorityImage = priorityImageSelected();
    let contact = contactSelected();
    let bgContact = backgroundOfSelectedContact();
    let subtasks = selectedSubtasks();
    let task = {
        'title': title,
        'description': description,
        'date': date,
        'category': category,
        'priority': priority,
        'priorityImage': priorityImage,
        'contacts': contact,
        'bgContact': bgContact,
        'subtasks': subtasks,
        'statusOfSubtasks': Array(subtasks.length).fill(false), // Create a new array with the same length as 'subtasks' and initialize all elements to 'false'.
        'status': status,
        'id': createdId(),
    };
    allTasks.push(task);
    await setItem("allTasks", JSON.stringify(allTasks));
    closeAddTaskOverlay();
    renderTasksByStatus();
}


/**********************************************   This part sets an id for every task and raises it by 1 from the highest id of allTasks    ******************************/
/**
 * Here gets an id created for every task
 * @returns - id
 */
function createdId() {
    let id;
    if (allTasks.length === 0) {
        id = 0;
    }
    else {
        id = highestId() + 1;
    }
    return id;
}


/*
* Find the highest ID among all tasks.
* @function
* @returns {number} The highest ID found in the `allTasks` array.
*/
function highestId() {
    let highestId = -1;   // Initialize the variable to store the highest ID to -1.
    for (let i = 0; i < allTasks.length; i++) {   // Loop through all tasks in the 'allTasks' array.
        if (allTasks[i].id > highestId) {// Check if the current task's ID is greater than the current 'highestId'. 
            highestId = allTasks[i].id;// If the current task's ID is higher, update 'highestId' with the new value.
        }
    }
    return highestId;   // Return the highest ID found in the 'allTasks' array.
}

/**************************************************  This part sets the contacts and the contact background color for the avatars  for create task function    ***********/

/**
 * All selected contacts from the list get pushed to array contactsSelected
 * @returns -  Thearray with selected contacts 
 */
function contactSelected() {
    let contactsSelected = [];
    let contactChecked = document.querySelectorAll('.list-content.is-checked');
    contactChecked.forEach(contact => {
        let contactDiv = contact.querySelector('label.contact-name');
        let contactname = contactDiv.textContent;
        contactsSelected.push(contactname);
    });
    return contactsSelected;
}


/**
 * All background colors of the selected contacts get pushed to array contactsSelectedBgColor
 * @returns - array with background-colors
 */
function backgroundOfSelectedContact() {
    let contactsSelectedBgColor = [];
    let contactChecked = document.querySelectorAll('.list-content.is-checked');
    contactChecked.forEach(contact => {
        let idOfContact = contact.id; // Id of the selected contact element
        let i = idOfContact.charAt([11]); // Id gets extracted
        //Gets the bgColor from id=`user${i}` and pushs it to the array
        let bgColorOfContact = window.getComputedStyle(document.getElementById(`user${i}`)).backgroundColor;
        contactsSelectedBgColor.push(bgColorOfContact);
    });
    return contactsSelectedBgColor;
}

/********************************************************   This part sets the priority and priority image for the create task function     **************************/

/**
 * This function gets the specific priority.innerText
 * @returns - priority
 */
function prioritySelected() {
    let priorityUrgent = document.getElementById('urgent');
    let priorityMedium = document.getElementById('medium');
    let priorityLow = document.getElementById('low');
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
 * The image of the selected priority gets returned
 * @returns priorityImg
 */
function priorityImageSelected() {
    let priorityUrgent = document.getElementById('urgent');
    let priorityMedium = document.getElementById('medium');
    let priorityLow = document.getElementById('low');
    let priorityImg = '';
    if (priorityUrgent.classList.contains('back-urgent')) {
      priorityImg = '/assets/img/prio-urgent.png';
    }
    if (priorityMedium.classList.contains('back-medium')) {
        priorityImg = '/assets/img/prio-medium.png';
    }
    if (priorityLow.classList.contains('back-low')) {
        priorityImg = '/assets/img/prio-low.png';
    }
    return priorityImg;
}


/*****************************************  This part sets the category and subtasks for the create task function   ****************************************************/

/**
 * Retrieves the text content of the element with the 'selected' class.
 * @returns {string} The text content of the selected element, or an empty string if no element with the 'selected' class is found.
 */
function categorySelected() {
    let category = document.querySelector('.selected'); // Select the element with the 'selected' class
    // Check if the element with the 'selected' class exists
    // If it exists, return its text content; otherwise, return an empty string
    return category ? category.innerText : '';
}


/**
 * Retrieves the text content of all elements with the 'subtask-added' class.
 * @returns {Array} An array containing the text content of all 'subtask-added' elements.
 */
function selectedSubtasks() {
    let elementsOfSubtasks = document.querySelectorAll('.subtask-added'); // Select all elements with the 'subtask-added' class
    let subtasks = [];  // Initialize an empty array to store subtask text content
    // Iterate through each 'subtask-added' element and add its text content to the 'subtasks' array
    elementsOfSubtasks.forEach(elementsOfSubtask => {
        subtasks.push(elementsOfSubtask.innerText);
    });
    // Return the array containing the text content of all 'subtask-added' elements
    return subtasks;
}

/************************************************ This is the part of the subtask editor ******************************************************************************/


/**
 * This function opens the subtask editor
 * @param {string} numberOfSubtasks - ID of specific added subtask
 * @param {string} subtask - value of old subtask
 * showInputEditor() -> addTask-templates.js
 */
function openSubtaskEditor(numberOfSubtasks, subtask) {
    let container = document.getElementById(`subtask${numberOfSubtasks}`);
    container.innerHTML = '';
    container.innerHTML += showEditorOfSubtask(numberOfSubtasks, subtask);
}


/**
 * This function opens the subtask editor
 * @param {string} numberOfSubtasks - ID of edited subtask
 * @param {string} inputId - id of new input value
 * showInputEditor() -> addTask-templates.js
 */
function saveNewSubtaskValue(numberOfSubtasks, inputId) {
    let container = document.getElementById(`subtask${numberOfSubtasks}`);
    let newSubtaskValue = document.getElementById(`${inputId}`).value;
    container.innerHTML = '';
    container.innerHTML += showNewSubtaskValue(numberOfSubtasks, newSubtaskValue);
}


/****************************************************  This part clears the add task form resets all values back  *******************************************************/

/**
 * This function clears all of  the Add Task inputs,
 * is used after the filled Task form is pushed to allTasks and by clicking the clear button
 */
function clearAddTaskForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    resetPriorityBtn();
    resetCategory();
    resetSelectedContacts();
    document.getElementById('subtask').value = '';
    document.getElementById('subtask-container').innerHTML = '';
}


/**
 * This function deletes the subtask from subtask-container
 * @param {string} numberOfSubtasks
 */
function deleteSubtask(numberOfSubtasks) {
    let subtaskToDelete = document.getElementById(`subtask${numberOfSubtasks}`);
    if (subtaskToDelete) {
        subtaskToDelete.remove();
    }
}
/**
 * This function clears the contact dropdown 
 */
function resetSelectedContacts() {
    let contacts = document.querySelectorAll('.is-checked');
    contacts.forEach(contact => {
        contact.classList.remove('is-checked');
        let checkboxId = contact.querySelector('input[type="checkbox"]').id;
        document.getElementById(checkboxId).checked = false;
    });
    pushSelectedContacts();
}


/**
 * The function clears the category by changing the innerText of the input
 * to "Select Task Category"
 */
function resetCategory() {
    let text = document.getElementById('category-text');
    text.firstElementChild.innerText = "Select Task Category";
    selectCategory('');
}


/**
 * This function resets the priority buttons
 */
function resetPriorityBtn() {
    let urgentTask = document.getElementById('urgent');
    let mediumTask = document.getElementById('medium');
    let lowTask = document.getElementById('low');
    let imgUrgent = document.getElementById('img-urgent');
    let imgMedium = document.getElementById('img-medium');
    let imgLow = document.getElementById('img-low');
    changeButtonsOfPriorityBack(urgentTask, mediumTask, lowTask, imgUrgent, imgMedium, imgLow);
}


/**
 * The selected priority button gets changed back to normal
 * @param {string} urgentTask 
 * @param {string} mediumTask 
 * @param {string} lowTask 
 * @param {string} imgUrgent 
 * @param {string} imgMedium 
 * @param {string} imgLow 
 */
function changeButtonsOfPriorityBack(urgentTask, mediumTask, lowTask, imgUrgent, imgMedium, imgLow) {
    if (urgentTask.classList.contains('back-urgent')) {
        switchUrgentTaskBack(urgentTask, imgUrgent);
    }
    if (mediumTask.classList.contains('back-medium')) {
        switchMediumTaskBack(mediumTask, imgMedium);
    }
    if (lowTask.classList.contains('back-low')) {
        switchLowTaskBack(lowTask, imgLow);
    }
}

// Close Add Task Overlay
function closeAddTaskOverlay() {
    document.getElementById('add-task-overlay').style.display = 'none';
    clearAddTaskForm();
}


/*****************************************************  Eventlistener for add task overlays to set date of today into the date input  *********************/

/**
 * This eventlistener is to set the input date to the actual date ,
 * and no dates older can be choosen !! 
 */
function setDateToInput() {
    let today = new Date();
    let dateOfToday = today.toISOString().split('T')[0];
    document.getElementById('date').value = dateOfToday;
    date.min = dateOfToday; // min-attribute to the input
};


/************************************************************   Add Task overlays   ***********************************************************************************/
/**
 * This function displays the Add Task overlays with the specific status
 */
function openOverlayToDo() {
    let container = document.getElementById('add-task-overlay');
    container.innerHTML = '';
    container.style.display = 'flex';
    container.innerHTML += showOverlayToDo();
    showContactsToAssign();
    setDateToInput();
    attachEventListeners();
}


function openOverlayInProgress() {
    let container = document.getElementById('add-task-overlay');
    container.innerHTML = '';
    container.style.display = 'flex';
    container.innerHTML += showOverlayInProgress();
    showContactsToAssign();
    setDateToInput();
    attachEventListeners();
}

function openOverlayAwaitingFeedback() {
    let container = document.getElementById('add-task-overlay');
    container.innerHTML = '';
    container.style.display = 'flex';
    container.innerHTML += showOverlayAwaitingFeedback();
    showContactsToAssign();
    setDateToInput();
    attachEventListeners();
}
/******************************************************************************************************************************************************/

/***********************************************  Eventlisteners attached to the add task Overlays functions *************************************************/
/**
 * This eventlistener is for checking the values of inputs and innerText of category div
 * if inputs are empty and category text is "Select Task Category" , button stays disabled
 */ 
function attachEventListeners() { 
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const dateInput = document.getElementById('date');
    const text = document.getElementById('category-text');
    const btn = document.getElementById('btn-create');

    // Add input event listeners to the text fields
    titleInput.addEventListener('input', checkInputValues);
    descriptionInput.addEventListener('input', checkInputValues);
    dateInput.addEventListener('input', checkInputValues);

    const observer = new MutationObserver(function () {
        // Use setTimeout to ensure asynchronous execution
        setTimeout(checkInputValues, 0);
    });

    // Observe changes in the category text
    observer.observe(text, { subtree: true, childList: true });

    // Call the initial checkInputValues
    checkInputValues();

    /**
     * Function to check input values and update button state
     */
    function checkInputValues() {
        // Trim and get values from input fields
        let title = titleInput.value.trim();
        let description = descriptionInput.value.trim();
        let date = dateInput.value.trim();
        let categoryText = text.firstElementChild.innerText.trim();

        // Check if all fields are filled and category text is changed
        updateButtonState(title, description, date, categoryText);
    }

    /**
     * Function to update button state based on input values
     * @param {string} title - The trimmed value of the title input
     * @param {string} description - The trimmed value of the description input
     * @param {string} date - The trimmed value of the date input
     * @param {string} categoryText - The trimmed value of the category text
     */
    function updateButtonState(title, description, date, categoryText) {
        // Check if all fields are filled and category text is changed
        if (title !== '' && description !== '' && date !== '' && categoryText !== "Select Task Category") {
            // Enable the button
            btn.disabled = false;
            btn.classList.remove('not-allowed');
        } else {
            // Disable the button
            btn.disabled = true;
            btn.classList.add('not-allowed');
        }
    }
}





