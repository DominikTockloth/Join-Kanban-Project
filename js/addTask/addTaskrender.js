
/***************************************************  This part handles the checkboxes and the selected contacts *******************************************************/
/**
 * Toggle the checkbox state and update styling. 
 * @param {number} i - Index of the checkbox and corresponding element.
 */
function toggleCheckbox(i) {
    let selected = document.getElementById(`user-select${i}`);
    let checkbox = document.getElementById(`user-checkbox-${i}`);
    if (!selected.classList.contains('is-checked')) {
        selected.classList.add('is-checked');
        checkbox.checked = true;
        pushSelectedContacts();
    } else {
        selected.classList.remove('is-checked');
        checkbox.checked = false;
    }
    pushSelectedContacts();
}


/**
 * Add event listeners to checkboxes for handling changes.
 */
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('[id^="user-checkbox"]');
    checkboxes.forEach((checkbox, i) => {
        checkbox.addEventListener('change', () => {
            toggleCheckbox(i);
        });
        pushSelectedContacts();
    });
});


/**
 * Update the selected contacts container based on checkbox states.
 */
function pushSelectedContacts() {
    let selectedcontactcontainer = document.getElementById('selected-contacts');
    selectedcontactcontainer.innerHTML = '';
    addedContact = false;
    for (let i = 0; i < allContacts.length; i++) {
        if (selectedContactHighlightted(i)) {
            const contact = allContacts[i];
            showSelectedContacts(selectedcontactcontainer, contact, i);
            addedContact = true;
        }
    }
}


/**
 * 
 * @param {string} selectedcontactcontainer  - div , which displays the selected contacts
 * @param {string} contact - specific contact which is selected
 * @param {number} i - number of contact
 */
function showSelectedContacts(selectedcontactcontainer, contact, i) {
    const bgColorContact = contact.backgroundcolor;
    const firstLetters = getFirstLetter(contact.name);
    selectedcontactcontainer.innerHTML += `<div class="avatar-checked" style="background-color:${bgColorContact}" id="user-select${i}">
    <span class="font-25">${firstLetters}</span>
     </div>`;
}


/** 
 * returns , when contact and checkbox are selected and checked
*/
function selectedContactHighlightted(i) {
    let selected = document.getElementById(`user-select${i}`);
    let selectedcheckbox = document.getElementById(`user-checkbox-${i}`);
    return selected.classList.contains('is-checked') && selectedcheckbox.checked;
}

/*************************************************************************************************************************************************************************/

/********************************************  This part is to render contact -, category lists **************************************************************************/


/**
 * Loads excisting contacts to the contact list
*/
function showContactsToAssign() {
    let contactcontainer = document.getElementById('assign-list-content');
    contactcontainer.innerHTML = '';
    sortContactListByFirstName(allContacts);
    for (let i = 0; i < allContacts.length; i++) {
        const contact = allContacts[i];
        const contactname = contact.name;
        const firstLetter = getFirstLetter(contact.name);
        const bgColor = contact.backgroundcolor;
        contactcontainer.innerHTML += showContactsToAssignInList(firstLetter, bgColor, i, contactname);
    }
}


/**
 * This function renders the categories in the list 
 * and updates the text from  function updateCategoryName(choosenCategory)
 * @param {string} categorySelected  
*/
function selectCategory(categorySelected) {
    let categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        let categoryIsSelected = category == categorySelected ? 'selected' : '';
        categoryList.innerHTML += /* HTML */`
        <div class="list-content pa-le ${categoryIsSelected}" id="category-id${i}" onclick="updateCategoryName(this)" style="color: #3c3f43;">${category}</div>`;
    }
}
/************************************************************************************************************************************************************************/

/*****************************************************  This part is for updating the category and subtask values  **************************************************** */
/**
 * This function changes the inner.Text to the choosen category
 * @param {string} choosenCategory - choosen category
 */
function updateCategoryName(choosenCategory) {
    let categoryText = document.getElementById('category-text');
    categoryText.firstElementChild.innerText = choosenCategory.innerText;
    selectCategory(choosenCategory.innerText);
    toggleCategoryList(); // closeCategoryList();
}


/**
 * This function adds a new subtask to the subtask-container
 * and raises the idOfSubtask by 1.
 * showSubTasksInContainer() -> addTask-templates.js
 * The value of input gets cleared
 */
function addSubTask() {
    changeBorderColorSubtaskInput();
    let subtask = document.getElementById('subtask').value;
    let subtaskcontainer = document.getElementById('subtask-container');
    let idOfSubtask = `subtask${numberOfSubtasks}`;
    if (subtask.length > 0) {
        subtaskcontainer.innerHTML += showSubTasksInContainer(idOfSubtask, subtask)
        numberOfSubtasks++;
    }
    document.getElementById('subtask').value = '';
    resetBorderColorSubtaskInput();
}


function openSubtaskEditor(numberOfSubtasks, subtask) {
    let container = document.getElementById(`subtask${numberOfSubtasks}`);
    container.innerHTML = '';
    container.innerHTML += showEditorOfSubtask(numberOfSubtasks, subtask)
}


function saveNewSubtaskValue(numberOfSubtasks, inputId) {
    let container = document.getElementById(`subtask${numberOfSubtasks}`);
    let newSubtaskValue = document.getElementById(`${inputId}`).value;
    container.innerHTML = '';
    container.innerHTML += showNewSubtaskValue(numberOfSubtasks, newSubtaskValue);
}
/**************************************************************************************************************************************************************************/

// Clears the validation input
function clearCustomValidation(input) {
    input.addEventListener("input", function () {
        input.setCustomValidity("");
        input.reportValidity();
    });
}

/****************************************************** This part is for opening and closeing all lists  *****************************************************************/
function toggleCategoryList() {
    if (document.getElementById('category-list').classList.contains('d-none')) {
        document.getElementById('category-list').classList.remove('d-none');
        document.getElementById('open-category').classList.add('d-none');
        document.getElementById('close-category').classList.remove('d-none');
        selectCategory();
        toggleBorderColor('category-text', 'btn-category');
    } else {
        toggleBorderColor('category-text', 'btn-category');
        document.getElementById('category-list').classList.add('d-none');
        document.getElementById('open-category').classList.remove('d-none');
        document.getElementById('close-category').classList.add('d-none');
    }
}


function toggleAssignList() {
    if (document.getElementById('assign-list-content').classList.contains('d-none')) {// Open Assign list and change the border color to blue  
        document.getElementById('assign-list-content').classList.remove('d-none');
        document.getElementById('dropdown-arrow').classList.add('d-none');
        document.getElementById('close-list').classList.remove('d-none');
        toggleBorderColor('input-contact', 'btn-contact');;
    } else { // Close Assign list and change the border color back to grey
        toggleBorderColor('input-contact', 'btn-contact');
        document.getElementById('assign-list-content').classList.add('d-none');
        document.getElementById('dropdown-arrow').classList.remove('d-none');
        document.getElementById('close-list').classList.add('d-none');
    }
}

function closeAssignList() {
    toggleBorderColor('input-contact', 'btn-contact');
    document.getElementById('assign-list-content').classList.add('d-none');
    document.getElementById('dropdown-arrow').classList.remove('d-none');
    document.getElementById('close-list').classList.add('d-none');
}


/******************************************************  This part sets border colors of inputs   ************************************************************************/
function toggleBorderColor(elementId, btnId) {
    let input = document.getElementById(elementId);
    let btn = document.getElementById(btnId);

    if (input.style.borderColor === 'rgb(209, 209, 209)' || input.style.borderColor === '') {
        input.style.borderColor = '#29ABE2';
        btn.style.borderColor = '#29ABE2';
    } else {
        input.style.borderColor = '#D1D1D1';
        btn.style.borderColor = '#D1D1D1';
    }
}



