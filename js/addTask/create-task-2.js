
/****************************************************  This part is for clearing the AddTask form values and resets contacts/prio-btn/category and subtasks  ************/


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


/**
 * This eventlistener is to set the input date to the actual date ,
 * and no dates older can be choosen !! 
 */
document.addEventListener("DOMContentLoaded", function () {
    let today = new Date();
    let dateOfToday = today.toISOString().split('T')[0];
    document.getElementById('date').value = dateOfToday;
    date.min = dateOfToday; // min-attribute to the input
});