
// This function chooses a random bg color from array backgroundColors
function chooseBackgroundColor() {
    const randombackgroundColor = Math.floor(Math.random() * backgroundColors.length);
    return backgroundColors[randombackgroundColor];
}


/**
 *  Displays the initials of the logged in user or guest in the header
 */
function showInitalsInHeader() {
    let initalsbox = document.getElementById("initals-box");
    let firstLetters = getFirstLetter(userIsLoggedIn);
    initalsbox.innerHTML = firstLetters;
}


function goToSummary(){
    window.location.href = 'summary.html';
}

function goToBoard(){
    window.location.href = 'board.html';
}

function goToContacts(){
    window.location.href = 'contacts.html';
}

function goToAddTask(){
    window.location.href = 'addTask.html';
}

//Changes border color of inputs
function changeBorderColor(input) {
    input.style.borderColor = '#29ABE2'
}


// Resets border color of inputs , when not on focus
function resetBorderColor(input) {
    input.style.borderColor = '#D1D1D1'; // Ändern Sie die Farbe auf die gewünschte Standardfarbe
}


// Get to Board by clicking on summary container
function getToBoard() {
    window.location.href = 'board.html';
}


// Open popup by clicking on avatar in header
function openPopUp() {
    document.getElementById('popUp').style.display = 'flex';
}


// Close popup by clicking on popup in header
function closePopUp() {
    document.getElementById('popUp').style.display = 'none';
}














