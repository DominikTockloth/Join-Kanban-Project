let amountOfTasks = [];
let deadlinesOfTasks = [];
let taskToDo = 0;
let taskInProgress = 0;
let taskAwaitingFeedback = 0;
let taskDone = 0;
let taskUrgent = 0;
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


/**
 * init - loads all data , HTML templates and initals in header
 * greet user - displays the logged in user in div right and refreshes the greet time
 */
async function initSummary() {
  await init();
  greetUser();
  allTasksAmount();
  countAmountOfTasks('amountTaskProgress', 'inProgress', taskInProgress, 'status',);
  countAmountOfTasks('amountTaskAwaitFeedback', 'awaitingFeedback', taskAwaitingFeedback, 'status',);
  countAmountOfTasks('amountTaskToDo', 'toDo', taskToDo, 'status',);
  countAmountOfTasks('amountTaskDone', 'doneTask', taskDone, 'status',);
  countAmountOfTasks('amountTaskUrgent', 'Urgent', taskUrgent, 'priority');
  refreshDeadline();
}

// Loads data and HTML templates
async function init() {
  await includeHTML();
  await loadCompleteData();
  showInitalsInHeader();
}

/**
 * This function counts the amount of allTasks and displays it in the specific div
 */
function allTasksAmount() {
  let container = document.getElementById('amountOfTasks');
  amountOfTasks = allTasks.length;
  container.innerHTML = `${amountOfTasks}`;
}

/**
 * 
 * @param {string} contentId - id of the counter in summary
 * @param {string} status - id of column in board
 * @param {string} numberOfTask - tasks of every column
 * @param {array} sortOfArray - status of the array
 */
function countAmountOfTasks(contentId, status, numberOfTask, sortOfArray) {
  let div = document.getElementById(contentId);
  for (let i = 0; i < allTasks.length; i++) {
    const task = allTasks[i];
    if (task[sortOfArray] == status) {
      numberOfTask++;
    }
  }
  div.innerHTML = numberOfTask;
}


/**
 * Here get the deadlines of allTasks updated and displayed in div
 */
function refreshDeadline() {
  for (let i = 0; i < allTasks.length; i++) {
    let date = allTasks[i]['date'];
    deadlinesOfTasks.push(date);
  }
  date = datesSorted(deadlinesOfTasks);
  formateTheDate();
}


/**
 * Here get the dates of allTasks sorted 
 * @param {string} dates - deadline of every task
 */
function datesSorted(dates) {
  return dates.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  });
}


/**
 * Here gets the date of task formatted
 */
function formateTheDate() {
  let divDeadline = document.getElementById('deadline');
  let upcomigDeadline = deadlinesOfTasks[0];
  let date = new Date(upcomigDeadline)
  let day = date.getDate();
  let monthNumber = date.getMonth();
  let year = date.getFullYear();
  let month = months[monthNumber];
  divDeadline.innerHTML = `${month} ${day}, ${year}`;
}


/**
 * Loads data of users , allContacts and tasks from backend
 */
async function loadCompleteData() {
  try {
    users = JSON.parse(await getItem("users"));
    allContacts = JSON.parse(await getItem("allContacts"));
    // tasks = JSON.parse(await getItem('task'));
  } catch (e) {
    console.error("Loading error:", e);
  }
}


/**
 * if guest log in , summary.html gets loaded
 * if user log in , check for existence of user
 * @param {string} user 
 */
async function userLogIn(user) {
  if (user === "Guest") {
    userIsLoggedIn = await setItem("userLoggedIn", user);
    window.location.href = "summary.html";
  } else {
    checkingForUserExistence("user");
  }
}


/**
 * This function displays the logged in user and refreshes greet time
 */
function greetUser() {
  showLoggedInUser();
  greetDaytime();
}


/**
 *  Displays the initials of the logged in user or guest in the header
 */
function showInitalsInHeader() {
  let initalsbox = document.getElementById("initals-box");
  let firstLetters = getFirstLetter(userIsLoggedIn);
  initalsbox.innerHTML = firstLetters;
}


/**
 * Displays the name of logged in user or guest in summary html in container on right side
 */
function showLoggedInUser() {
  let userbox = document.getElementById("logged-in-user");
  let loggedinuser = userIsLoggedIn;
  userbox.innerHTML = loggedinuser;
}


/**
 * This function gets the current hours and displays the correct greeting by daytime
 */ 
function greetDaytime() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let greetContainer = document.getElementById("daytime");
  if (hours > 0 && hours < 12) {
    greetContainer.innerHTML = "Good Morning,";
  }
  if (hours >= 12 && hours < 18) {
    greetContainer.innerHTML = "Good Afternoon,";
  }
  if (hours > 18 && hours < 24) {
    greetContainer.innerHTML = "Good Evening,";
  }
}


// Includes the HTML templates
async function includeHTML() {
  userIsLoggedIn = await getItem("userLoggedIn");
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
  setViewInCurrentMenu();
}