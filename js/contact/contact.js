let initals = [];

/**
 * Loads the data from backend and contact list
 */
async function initContactList() {
  await init();
  loadContactList();
}


/**
 * Loads data of users , allContacts and tasks from backend
 */
async function loadCompleteData() {
  try {
    users = JSON.parse(await getItem("users"));
    allContacts = JSON.parse(await getItem("allContacts"));
    allTasks = JSON.parse(await getItem("allTasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}


/** This function adds a new contact and pushs it to the allContacts array,
 *  and saves it to the backend
 */
async function addContact() {
  const name = document.getElementById("name");
  const mail = document.getElementById("mail");
  const number = document.getElementById("number");
  const contact = {
    name: name.value,
    email: mail.value,
    number: number.value,
    backgroundcolor: chooseBackgroundColor(),
  };
  checkValueOfAddContact();
  allContacts.push(contact);
 await setItem("allContacts", JSON.stringify(allContacts));
  clearAddContactForm();
  loadContactList();
  closeAddContactOverlay();
}


/**
 * Wait for the DOM to be fully loaded before attaching event listeners.
 * Add event listeners for changes in the input fields
 */
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('name')?.addEventListener('input', checkValueOfAddContact);
  document.getElementById('mail')?.addEventListener('input', checkValueOfAddContact);
  document.getElementById('number')?.addEventListener('input', checkValueOfAddContact);
});


/**
 * Check the values of input fields and update the status of the 'Add' button.
 * @type {string}  Get the value of the 'name' input field.
 * @type {string} Get the value of the 'mail' input field.
 * @type {string}  Get the value of the 'number' input field.
 */
function checkValueOfAddContact() {
  let nameInput = document.getElementById('name').value;
  let mailInput = document.getElementById('mail').value;
  let numberInput = document.getElementById('number').value;
  let addBtn = document.getElementById('add-btn');
  if (nameInput !== '' && mailInput !== '' && numberInput !== '') { // Check if all input fields are filled
    addBtn.disabled = false;  // Enable the 'Add' button and remove the 'not-allowed' class
    addBtn.classList.remove('not-allowed');
  } else {
    addBtn.disabled = true;  // Disable the 'Add' button if any input field is empty
  }
}


/** This function sets style to the overlay and makes ist visible ,
 * and fills the inputs with values of the editing contact
 * @param {number} i number of contact editor 
 */
function editContact(i) {
  let editContainer = document.getElementById('edit-contact-container');
  editContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
  editContainer.style.zIndex = '100';
  editContainer.innerHTML = '';
  editContainer.innerHTML += showEditContactOverlay(i);
  document.getElementById('name-edit').value = valueCheckForUndefined(allContacts[i]['name']);
  document.getElementById('mail-edit').value = valueCheckForUndefined(allContacts[i]['email']);
  document.getElementById('number-edit').value = valueCheckForUndefined(allContacts[i]['number']);
  document.getElementById('letter-div').style.backgroundColor += allContacts[i]['backgroundcolor'];
}

/**
 * @param {number} i - number of task
 */
async function saveEditedContact(i) {
  allContacts[i].name = document.getElementById('name-edit').value;
  allContacts[i].email = document.getElementById('mail-edit').value;
  allContacts[i].number = document.getElementById('number-edit').value;
  closeEditContactOverlay();
  await setItem("allContacts", JSON.stringify(allContacts));
  loadContactList();
  showContactDetails(i);
}


/**
 * @param {string or number} value 
 * @returns the value or an empty string 
 */
function valueCheckForUndefined(value) {
  return value !== undefined ? value : '';
}


/**
 * This function deletes the contact from the array and backend,
 * runs a disappear animation and refreshes the contact list
 * @param {number} i
 */
async function deleteContact(i) {
  allContacts.splice(i, 1);
  await setItem("allContacts", JSON.stringify(allContacts));
  contactDisappear();
  loadContactList();
}


/**
 * This is an animation to hide the deleted contact
 */
function contactDisappear() {
  let contactDetailContainer = document.getElementById("detail-contact");
  contactDetailContainer.classList.remove("appear");
  contactDetailContainer.classList.add("disappear");
}


/**
 * This function renders the contact list to the contacts container and sets the HTML
 */
function loadContactList() {
  let contactsContainer = document.getElementById("contacts-container");
  contactsContainer.innerHTML = "";
  initials = [];
  sortContactListByFirstName(allContacts);
  for (let i = 0; i < allContacts.length; i++) {
    const contact = allContacts[i];
    const firstLetter = getFirstLetter(contact["name"]);
    const firstInitial = firstLetter[0];
    const backgroundColor = contact.backgroundcolor;
    checkFirstLetter(firstInitial);
    if (initials[i] != "blank") {
      contactsContainer.innerHTML += mainLetter(firstInitial);
    }
    contactsContainer.innerHTML += contactInList(contact, i);
    document.getElementById(`avatar${i}`).style.backgroundColor =
      backgroundColor;
  }
}


/**
 * Shows the detailed version of contacts
 * Adds classlist 'appear'
 * Removes classlist 'disappear'
 * @param {String} i
 */
function showContactDetails(i) {
  resetContactSelection();
  let contactDetailContainer = document.getElementById("detail-contact");
  contactDetailContainer.innerHTML = "";
  const contact = allContacts[i];
  const backgroundColor = contact.backgroundcolor;
  contactDetailContainer.innerHTML += contactDetails(i);
  document.getElementById(`avatar-big-bg${i}`).style.backgroundColor = backgroundColor;
  contactDetailContainer.classList.add("appear");
  contactDetailContainer.classList.remove("disappear");
  showContactDetailsMobile();
  checkValue(contact);
  const selectedContact = document.getElementById(`contact-content-${i}`);
  selectedContact.classList.add('contact-clicked');
}


function resetContactSelection() {
  // Alle Kontakte zurücksetzen
  const allContactsContent = document.querySelectorAll('.contacts-content');
  allContactsContent.forEach(contactContent => {
    contactContent.classList.remove('contact-clicked');
  });
}


/**
 * @param {string} contact - specific contact get checked for phone
 * number , if doesnt exist = div stays empty
  */
function checkValue(contact) {
  if (!contact.number) {
    document.getElementById('contact-phonenumber').innerHTML = '';
  }
}

// This function chooses a random bg color from array backgroundColors
function chooseBackgroundColor() {
  const randombackgroundColor = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[randombackgroundColor];
}


/**
 * Clears the Add Contact form.
 */
function clearAddContactForm() {
  const nameInput = document.getElementById('name');
  const mailInput = document.getElementById('mail');
  const numberInput = document.getElementById('number');
  nameInput.value = '';
  mailInput.value = '';
  numberInput.value = '';
}


// Opens the  Add Contact Overlay
function openAddContactOverlay() {
  document.getElementById('add-contact-overlay').style.display = 'flex';
}


// Closes  Add Contact Overlay
function closeAddContactOverlay() {
  clearAddContactForm();
  document.getElementById('add-contact-overlay').style.display = 'none';
}


/**
 * This function shows contact details at smaller screen sizes
 */
function showContactDetailsMobile() {
  var screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (screenWidth < 750) {
    document.getElementById("container-right").classList.remove("d-none");
    document.getElementById("scrollbar").classList.add("d-none");
    document.getElementById("contact-detail-arrow").classList.remove("d-none");
  } else {
    document.getElementById("container-right").classList.add("d-none");
    document.getElementById("scrollbar").classList.remove("d-none");
    document.getElementById("contact-detail-arrow").classList.add("d-none");
  }
}


/**
 * This function sorts the contacts by the first letter of the firstName
 * @param {array} allContacts - all existing contacts get sorted
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
 * @param {string} name 
 * @returns 
 */
function getFirstLetter(name) {
  const nameParts = (name || "").split(" "); // Split the name into parts based on spaces.
  const firstNameLetter = nameParts[0][0]; // Get the initial of the first name.
  const lastNameLetter = nameParts.length > 1 ? nameParts[1][0] : ""; // Get the initial of the last name (if present).
  return `${firstNameLetter}${lastNameLetter}`; // Combine and return the initials.
}


//close edit task overlay in board.html 
function closeEditContactOverlay() {
  let editContainer = document.getElementById('edit-contact-container');
  editContainer.style.backgroundColor = 'unset';
  editContainer.style.zIndex = '-15';
  editContainer.innerHTML = '';
}


/**
 * 
 */
function showContactList() {
  document.getElementById("container-right").classList.add("d-none");
  document.getElementById("scrollbar").classList.remove("d-none");
  document.getElementById("contact-detail-arrow").classList.add("d-none");
}


function checkFirstLetter(firstInitial) {
  if (!initials.includes(firstInitial)) {
    initials.push(firstInitial);
  } else {
    initials.push("blank");
  }
}



