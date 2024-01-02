
/******************************************* Shows the avatar with main letters of each contact in contact list  *************************************/
function mainLetter(firstInitial) {
    return /**  HTML */`
<div class="contacts"><span class="font-25">${firstInitial}</span></div>
`
}

/**************************************************   Shows every excisting contact in contact list   **************************************************/
/**
 * 
 * @param {string} contact 
 * @param {number} i 
 * @returns 
 */
function contactInList(contact, i) {
    return /** HTML */`
    <div class="contacts-content"  onclick="showContactDetails(${i})" id="contact-content-${i}"><div class="avatar" id="avatar${i}"><span>${getFirstLetter(allContacts[i]['name'])}</span></div>
    <div class="column gap" onclick="showContactDetails(${i})">
        <p class="font-18 margin-end">${contact['name']}</p>
        <p class="blue margin margin-end">${contact['email']}</p>
    </div>
</div>
    `
}

/**************************************************   Shows the detailed contact information   ***********************************************************/
/**
 * 
 * @param {number} i 
 * @returns 
 */
function contactDetails(i) {
    return  /** HTML */`<div class="content-head">
<div class="avatar-big" id="avatar-big-bg${i}"><span>${getFirstLetter(allContacts[i]['name'])}</span></div>
<div class="contact">
    <h3>${allContacts[i]['name']}</h3>
    <div class="edit">
        <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;"
            onclick="editContact(${i})"> <img src="assets/img/pencil-frameless.png" class="image">
            <span>Edit</span></div>
        <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="deleteContact(${i})"><img
                src="assets/img/delete.png" class="image"><span>Delete</span></div>
    </div>
</div>
</div>
<div style=" margin-top: 65px;"><span style="font-size: 26px; font-weight: 400;">Contact
    Information</span></div>
<div style="margin-top: 50px;">
<div style="font-weight: 700; font-size: 16px; margin-bottom: 15px;">E-Mail</div>
<div style="color:#007CEE;"><a href=mailto:"${allContacts[i]['mail']}">${allContacts[i]['email']}</a></div>
</div>
<div style="margin-top: 50px;">
<div style="font-weight: 700; font-size: 16px; margin-bottom: 15px;">Phone</div>
<div style="font-weight: 500; font-size: 16px;" id="contact-phonenumber">${allContacts[i]['number']}</div>
</div>
`
}

/************************************************** Shows the edit contact overlay with the values of each contact ******************/
function showEditContactOverlay(i) {
    return /**  HTML */ ` <div class="overlay-container">
    <div class="over-cont-top align column" id="edit-overlay-left">
        <div class="logo-container"><img src="assets/img/logo-white.png" style="height: 60px; width: 60px;" id="logo-edit-overlay">
             <div style="font-weight: 600; font-size: 20px; cursor: pointer;"
                   onclick="closeEditContactOverlay()" id="close-edit-overlay"> X</div></div>
        <div>
            <h1 id="edit-overlay-headline">Edit Contact</h1>
        </div>
        <div><span style="font-size: 20px; font-weight: 400;" id="task-span">Tasks are better with a team!</span></div>
        <div class="border-overlay" id="edit-overlay-border"></div>
    </div>
    <div class="over-cont-bottom">
       <div class="avatar-edit" id="letter-div"><span>${getFirstLetter(allContacts[i]['name'])}</span>
             </div>
        <div class="center">
       
        <div class="add-contact">
            <div class="contact-input"><input required type="text" placeholder="Name"
                    class="login-content" id="name-edit"><img src="assets/img/person.png" class="margin-left"
                    style="height: 24px; width: 24px;"></div>
            <div class="contact-input"><input required type="email" placeholder="Email"
                    class="login-content" id="mail-edit"><img src="assets/img/mail.png" class="margin-left"
                    style="height: 20px; width: 20px;"></div>
            <div class="contact-input"><input required type="tel" placeholder="Phone"
                    class="login-content" id="number-edit"><img src="assets/img/phone.png" class="margin-left"
                    style="height: 24px; width: 24px;"></div>
            <div class="flex" style="gap: 50px; margin-top: 30px;"><button class="cancel" id="edit-overlay-cancel"  onclick="closeEditContactOverlay()"><span>
            Cancel</span></button>
                <button class="save-btn" id="edit-overlay-save" onclick="saveEditedContact(${i})">Save <img src="assets/img/checked.png"
                        class="image"></button>
            </div>
        </div>
        
    </div>
</div>
    `;
}


