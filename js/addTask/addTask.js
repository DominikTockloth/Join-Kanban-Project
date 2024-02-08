/***********************************************  This part is for sorting contacts in list and get the initals of contacts for the list  *****************************/

/**
 * This function sorts the contacts by the first letter of the firstName
 * @param {array} allContacts - array with all contacts
 * @returns 
 */
function sortContactListByFirstName(allContacts) {
    return allContacts.sort(function (a, b) {
        const firstNameA = (a.name || "").split(" ")[0];
        const firstNameB = (b.name || "").split(" ")[0];
        return firstNameA.localeCompare(firstNameB);
    });
}


/**
 * This function takes a name as input and returns the initials of the first and last names (if present).
 * @param {string} name - name of the contact
 * @returns 
 */
function getFirstLetter(name) {
    const nameParts = (name || "").split(" "); // Split the name into parts based on spaces.
    const firstNameLetter = nameParts[0][0]; // Get the initial of the first name.
    const lastNameLetter = nameParts.length > 1 ? nameParts[1][0] : ""; // Get the initial of the last name (if present).
    return `${firstNameLetter}${lastNameLetter}`; // Combine and return the initials.
}

/*********************************************************************************************************************************************************************/

/**********************************************  This part is for handling the priority buttons and changes the prio images   ******************************************/


/**
 * This function changes the urgent-priority-task and switch the other priorities back, 
 * if they have been already selected.
*/
function changeUrgentTask(urgentTask, mediumTask, imgUrgent, imgMedium, lowTask, imgLow) {
    if (urgentTask.classList.contains('back-white')) {
        switchUrgentTask(urgentTask, imgUrgent, true);
    } else {
        switchUrgentTask(urgentTask, imgUrgent, false);
    }
    if (mediumTask.classList.contains('back-medium')) {
        switchMediumTask(mediumTask, imgMedium);
    }
    if (lowTask.classList.contains('back-low')) {
        switchLowTask(lowTask, imgLow);
    }
}
 

/**
 * This function changes the medium-priority-task and switch the other priorities back, 
 * if they have been already selected.
*/
function changeMediumTask(urgentTask, mediumTask, imgUrgent, imgMedium, lowTask, imgLow) {
    if (mediumTask.classList.contains('back-white')) {
        switchMediumTask(mediumTask, imgMedium, true)
    } else {
        switchMediumTask(mediumTask, imgMedium, false)
    }
    if (urgentTask.classList.contains('back-urgent')) {
        switchUrgentTask(urgentTask, imgUrgent);
    }
    if (lowTask.classList.contains('back-low')) {
        switchLowTask(lowTask, imgLow);
    }
}
 

/**
 * This function changes the low-priority-task and switch the other priorities back, 
 * if they have been already selected.
*/
function changeLowTask(urgentTask, mediumTask, imgUrgent, imgMedium, lowTask, imgLow) {
    if (lowTask.classList.contains('back-white')) {
        switchLowTask(lowTask, imgLow , true);
    } else {
        switchLowTask(lowTask, imgLow , false);
    }
    if (urgentTask.classList.contains('back-urgent')) {
        switchUrgentTask(urgentTask, imgUrgent);
    }
    if (mediumTask.classList.contains('back-medium')) {
        switchMediumTask(mediumTask, imgMedium);
    }
}
 

function switchUrgentTask(urgentTask, imgUrgent, isSwitched) {
    if (isSwitched) {
        // Changes the background color and image of urgent priority
        urgentTask.classList.remove('back-white');
        urgentTask.classList.add('back-urgent');
        urgentTask.classList.add('prio-choosed');
        imgUrgent.src = '/assets/img/urgent_white.svg';
    } else {
        // Changes the background color and image back of urgent priority
        urgentTask.classList.remove('back-urgent');
        urgentTask.classList.add('back-white');
        urgentTask.classList.remove('prio-choosed');
        imgUrgent.src = '/assets/img/urgent_red.svg';
    }
}


// Changes the background color and image of medium priority
function switchMediumTask(mediumTask, imgMedium, isSwitched) {
    if (isSwitched) {
        mediumTask.classList.remove('back-white');
        mediumTask.classList.add('back-medium');
        mediumTask.classList.add('prio-choosed');
        imgMedium.src = '/assets/img/medium_white.svg';
    } else {
        mediumTask.classList.remove('back-medium');
        mediumTask.classList.add('back-white');
        mediumTask.classList.remove('prio-choosed');
        imgMedium.src = '/assets/img/medium_yellow.svg';
    }

}


// Changes the background color and image of low priority
function switchLowTask(lowTask, imgLow, isSwitched) {
    if (isSwitched) {
        lowTask.classList.remove('back-white');
        lowTask.classList.add('back-low');
        lowTask.classList.add('prio-choosed')
        imgLow.src = '/assets/img/low_white.svg';
    } else {
        lowTask.classList.remove('back-low');
        lowTask.classList.add('back-white');
        lowTask.classList.remove('prio-choosed')
        imgLow.src = '/assets/img/low_green.svg';
    }

}

/*********************************************  This listener is for closing the lists in Add Task , if you click outside the specific div   ****************************/

// Function to close lists if clicked outside
document.addEventListener('mousedown', function (event) {
    // Check if the clicked element is not inside the category list
    let categoryList = document.getElementById('category-list');
    let contactList = document.getElementById('assign-list-content');
    if (!categoryList.contains(event.target) && !categoryList.classList.contains('d-none')) {
        toggleCategoryList();
    }

    // Check if the clicked element is not inside the assign list
    if (!contactList.contains(event.target) && !contactList.classList.contains('d-none')) {
        closeAssignList();
    }

    // Check if the clicked element is not inside the subtask input
    if (!document.getElementById('subtask').contains(event.target)) {
        resetBorderColorSubtaskInput();
    }
});

