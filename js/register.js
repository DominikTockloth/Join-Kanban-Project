let users = [];
let allTasks = [];
let allContacts = [];
let numberOfSubtasks = 0;
let categories = ['Technical Task', 'User Story'];
let backgroundColors = ['#9327FF', '#FC71FF', 'FF8937', '75D432', '#FFBB2B', '#1FD7C1', '#FF4646', '#29ABE2', 'D331D0', '#00BEE8'];
let editTaskId;
let editTaskIndex;
let editTaskModeOnOrOff = false;
let userIsLoggedIn;

window.addEventListener('load', init);


async function init() {
  await loadCompleteData();
  await includeHTML();
  hideMenu();
  if (window.location.pathname === '/index.html') {
    setTimeout(() => {
      showLogIn();
    }, 1500);
  }
  if (window.location.pathname === '/index.html' || window.location.pathname === '/signIn.html' || window.location.pathname === '/help.html' || window.location.pathname === '/legalNotice.html' || window.location.pathname === '/privacy.html') {
    !setViewInCurrentMenu();
  }
  else {
    setViewInCurrentMenu();
  }
}

async function initIndex() {
  await loadCompleteData();
  setTimeout(() => {
    showLogIn();
  }, 1350);
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


/**
 * Displays the first letters of the loggedIn user in header
 */
function greetUserLoggedIn() {
  let initalsbox = document.getElementById("initals-box");
  let firstLetters = getFirstLetter(userIsLoggedIn);
  initalsbox.innerHTML = firstLetters;
}

/**
 * Saves the information of the registred user to array users ,
 * if user is not in allContacts array , it gets pushed to it too.
 */
async function registerUser() {
  let user = userInformationSetUp(); // user information 
  users.push(user); // Gets pushed to users array
  pushUsersToContactsArray(user); // If not included at allContacts , pushed too .
  await setItem("users", JSON.stringify(users));  // Information saved to backend
  showSignInScreen();
}


/**
 * This function handles guest or user log in
 * If user logs in - function checkingForUserExistence() 
 * @param {string} user 
 */
async function userLogIn(user) {
  if (user === "Guest") {
    userIsLoggedIn = await setItem("userLoggedIn", user);
    window.location.href = "summary.html";
  } else {
    checkingForUserEmailExistence(user);
  }
}


/**
 * Checks in SignIn.html if password and confirm password match
*/
function passwordValidation(pageView) {
  let password = document.getElementById("password").value;
  let passwordConfirmed = document.getElementById("passwordconfirm").value;
  let passwordConfirmedInput = document.getElementById("passwordconfirm");
  checkMatchingPasswords(password, passwordConfirmed, passwordConfirmedInput, pageView);
  clearCustomValidation(passwordConfirmedInput);
}


/**
 *  Checks in SignIn.html if password and confirm password match
 * @param {string} password - value of input password
 * @param {string} passwordConfirmed - value of input password confirmation
 * @param {string} passwordConfirmedInput - input of password confirmation
 */
async function checkMatchingPasswords(password, passwordConfirmed, passwordConfirmedInput) {
  if (password !== passwordConfirmed) {
    passwordConfirmedInput.setCustomValidity("Passwords do not match");
    passwordConfirmedInput.reportValidity();
    clearCustomValidation(passwordConfirmedInput);
  } else {
    checkingForUserExistence();
  }
}


/**
 * This function checks , if the email value is existing in the users array
 */
function checkingForUserExistence() {
  let emailLogInInput = document.getElementById("email");
  let useremail = emailLogInInput.value;
  if (Array.isArray(users)) {
    let emailExistence = users.some(user => user.email === useremail);
    if (emailExistence) {
      let mailInput = document.getElementById("email");
      mailInput.setCustomValidity("E-Mail does already exist");
      mailInput.reportValidity();
      clearCustomValidation(mailInput);
    } else {
      registerUser();
      clearCustomValidation(emailLogInInput);
    }
  }
}


/**
 * 
 * @param {string} useremail - value of Log In input , gets compared to the already existing emails in users
 */
function checkingForUserEmailExistence() {
  let passwordOfLogIn = document.getElementById("password").value;
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let useremail = user.email;
    if (user.email === useremail) {
      let passwordOfUser = user.password;
      let nameOfUser = user.name;
      logInPasswordCheck(passwordOfUser, passwordOfLogIn, nameOfUser);
    }
  }
}


/**
 * This function compares the password of log in with the saved password of user
 * @param {string} passwordOfUser - password of user , which is saved in users array
 * @param {string} passwordOfLogIn - password value of log in input
 * @param {string} nameOfUser - name of user , which is saved in users array
 */
async function logInPasswordCheck(passwordOfUser, passwordOfLogIn, nameOfUser) {
  if (passwordOfUser === passwordOfLogIn) {
    userIsLoggedIn = await setItem("userLoggedIn", nameOfUser);
    window.location.href = "summary.html";
  }
  else {
    let passwordLogInInput = document.getElementById("password");
    passwordLogInInput.setCustomValidity("Incorrect password !!!");
    passwordLogInInput.reportValidity();
    clearCustomValidation(passwordLogInInput);
  }
}


/**
 * Check for passwords , if correct function showSignInScreen() 
 */
function userRegistrationCorrect() {
  if (passwordValidation()) {
    showSignInScreen();
  }
}

/**
 * This function checks if user is added to contacts by comparing the email values
 */
async function pushUsersToContactsArray(user) {
  let isUserAlreadyInContacts = allContacts.some(
    (contact) => contact.email === user.email
  );
  if (!isUserAlreadyInContacts) {
    allContacts.push(user);
    await setItem("allContacts", JSON.stringify(allContacts));
  }
}

/**
 * This function sets the information of a registrated user
 * @returns userInformation
 */
function userInformationSetUp() {
  let username = document.getElementById("user").value;
  let useremail = document.getElementById("email").value;
  let userpassword = document.getElementById("password").value;
  let userInformation = {
    name: username,
    email: useremail,
    password: userpassword,
    backgroundcolor: chooseBackgroundColor(),
  };
  return userInformation;
}


/*
* This function clears the registration form and shows an popup for sign in succsessfull
*/
function showSignInScreen() {
  clearForm(); // The registration form gets cleared
  document.getElementById("signin-succsess").classList.remove("d-none"); // Sign in successfull gets displayed
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}


// Clears the validation input
function clearCustomValidation(input) {
  input.addEventListener("input", function () {
    input.setCustomValidity("");
    input.reportValidity();
  });
}


// Clears the Sign In Formular
function clearForm() {
  user.value = "";
  email.value = "";
  password.value = "";
  passwordconfirm.value = "";
}


// This function takes a name as input and returns the initials of the first and last names (if present).
function getFirstLetter(name) {
  const nameParts = (name || "").split(" "); // Split the name into parts based on spaces.
  const firstNameLetter = nameParts[0][0]; // Get the initial of the first name.
  const lastNameLetter = nameParts.length > 1 ? nameParts[1][0] : ""; // Get the initial of the last name (if present).
  return `${firstNameLetter}${lastNameLetter}`; // Combine and return the initials.
}


/**
 *  Displays the initials of the logged in user or guest in the header
 */
function showInitalsInHeader() {
  let initalsbox = document.getElementById("initals-box");
  let firstLetters = getFirstLetter(userIsLoggedIn);
  initalsbox.innerHTML = firstLetters;
}


// This function adds and removes classlists to change images and enables Sign Up Button
function changeCheckboxToFilled() {
  document.getElementById("checkbox-empty").classList.add("d-none");
  document.getElementById("checkbox-filled").classList.remove("d-none");
  document.getElementById("signupBtn").disabled = false;
}


// This function adds and removes classlists to change images and disables Sign Up Button
function changeCheckboxToEmpty() {
  document.getElementById("checkbox-empty").classList.remove("d-none");
  document.getElementById("checkbox-filled").classList.add("d-none");
  document.getElementById("signupBtn").disabled = true;
}


// This function activates Log in animation
function showLogIn() {
  document.getElementById("login-head").classList.remove("login-visible");
  document.getElementById("login-main").classList.remove("login-visible");
}


// This function handles the including of HTML templates 
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let response = await fetch(file);
    if (response.ok) {
      element.innerHTML = await response.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}


/**
 * Sets the view in the current menu based on the window's location.
 * Extracts the id from the current page's URL and adds a CSS class to the corresponding menu element.
 */
function setViewInCurrentMenu() {
  let currentView = window.location.pathname; // The current view's path from the window location.
  let lastSlashIndex = currentView.lastIndexOf('/'); // The index of the last slash ('/') in the current view's path.
  let dotIndex = currentView.lastIndexOf('.'); // The index of the last dot ('.') in the current view's path.
  let id = currentView.substring(lastSlashIndex + 1, dotIndex); //  The id extracted from the current view's path between the last slash and last dot.
  let menuElement = document.getElementById("sub-menu-" + id); // The menu element corresponding to the extracted id.
  if (menuElement) {  // Checks if the menu element exists before adding the CSS class
    menuElement.classList.add('clicked'); //Adds the 'clicked' CSS class to highlight the current menu element.
  }
}


/**
 * Hides the menu based on the current page URL.
 * If the current page is 'help.html', 'privacy.html', or 'legalNotice.html',
 * the menu will be hidden.
 */
function hideMenu() {
  let menuDiv = document.getElementById('info-menu');
  let currentPath = window.location.pathname;
  if (currentPath.includes('help.html') || currentPath.includes('privacy.html') || currentPath.includes('legalNotice.html')) {
    menuDiv.style.display = 'none';
  }
}




