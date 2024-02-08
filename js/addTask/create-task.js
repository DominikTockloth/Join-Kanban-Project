
async function init() {
    await loadCompleteData();
    await includeHTML();
    hideMenu();
    if (window.location.pathname === '/index.html') {
      setTimeout(() => {
        showLogIn();
      }, 1500);
    }
    if(window.location.pathname === '/Join/addTask.html' || 'addTask.html' || '/Join/.board.html' || 'board.html)'){
        addTaskRender();
    }
    if (window.location.pathname === '/index.html' || window.location.pathname === '/signIn.html' || window.location.pathname === '/help.html' || window.location.pathname === '/legalNotice.html' || window.location.pathname === '/privacy.html') {
      !setViewInCurrentMenu();
    }
    else {
      setViewInCurrentMenu();
    }
  }

  function addTaskRender(){
    showContactsToAssign();
  }


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
    clearAddTaskForm();
    showMessageAddedToBoard();
}

/*****************************************  This part sets an id for every task and raises it by 1 from the highest id of allTasks   ********************************/
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

/**************************************  This part sets the contacts and the contact background color for the avatars  for create task function   **********************/
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

/*************************************** This part sets the priority and priority image for the create task function   *************************************************/
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

/*****************************************  This part is for checking values of the inputs and enables button if filled   ********************************************/
/**
 * This eventlistener is for checking the values of inputs and innerText of category div
 * if inputs are empty and category text is "Select Task Category" , button stays disabled
 * */
document.addEventListener("DOMContentLoaded", function () {
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const dateInput = document.getElementById('date');
    const text = document.getElementById('category-text');
    const btn = document.getElementById('btn-create');
    [titleInput, descriptionInput, dateInput].forEach(input => input.addEventListener('input', checkInputValues));
    const observer = new MutationObserver(() => setTimeout(checkInputValues, 0));
    observer.observe(text, { subtree: true, childList: true });
    function checkInputValues() {
        const inputs = [titleInput, descriptionInput, dateInput];
        const categoryText = text.firstElementChild.innerText.trim();
        const allFilled = inputs.every(input => input.value.trim() !== '');
        const isValidCategory = categoryText !== "Select Task Category";
        btn.disabled = !(allFilled && isValidCategory);
        btn.classList.toggle('not-allowed', btn.disabled);
    }
});

/******************************************     This displays a message on screen , when task got added to board   **************************************************/

function showMessageAddedToBoard() {
    let message = document.getElementById('add-task-to-board-overlay');
    message.style.display = 'flex';
    setTimeout(() => {
        window.location.href = 'board.html';
    }, 2500);
}