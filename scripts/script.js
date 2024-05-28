
// Text elements for contact form
const firstName = document.getElementById("fname");
const emailSender = document.getElementById("emailsender");
const subject = document.getElementById("subject");
const comment = document.getElementById("comment");
const btnSendEmail = document.getElementById("send-email-button");

const emailMessageModal = document.getElementById("email_message");
const btnInviteFriend = document.getElementById("btn_invite_friend");

// Invite friend modal
const inviteFriendModal = document.getElementById("invite_friend");
const btnCancelInvitation = document.getElementById("invitation_cancel_button");
const btnSendInvitation = document.getElementById("invitation_send_button")
const txtHostName = document.getElementById(`host_name`);
const txtEmailGuest = document.getElementById(`email_guest`);

const toggleBtn = document.getElementById("toggle_btn");
const dropDownMenu = document.getElementById("dropdown_menu");

// Elements for date and time in event area
const showDateTime = document.getElementById("date_time");
const showTimeZone = document.getElementById("time_zone");

// Error elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const commentError = document.getElementById("commentError");

// Event elements
const btnJoinEvent = document.getElementById("button_join_event");


const date = new Date("2024-05-28T09:53:00.000Z");
const oneHourBeforeEvent = new Date(date.getTime() - 60 * 60 * 1000);
console.log(`this is one hour before`,oneHourBeforeEvent);
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
dateOptions.timeZoneName = "long";
let dateString = date.toLocaleDateString('es-ES', dateOptions);
let timeString = date.toLocaleTimeString('es-ES', timeOptions);
const showDate = dateString.split(',');


showDateTime.innerText = showDate[0] + showDate[1] + ' ' + timeString;
showTimeZone.innerText = showDate[2];

toggleBtn.addEventListener("click", () => {
    dropDownMenu.classList.toggle('open');
})

btnSendEmail.addEventListener("click", () => {
    let sendEmail = true;
    sendEmail = validateFormEmail();
    emailMessageModal.showModal()
            emailMessageModal.style.display = "flex";
            setTimeout(function() {
                emailMessageModal.style.display = "none";
                emailMessageModal.close();
            }, 3000);

    /*if (sendEmail) {
        emailjs.init("IJgiBa0KaSMTs4014");
        let params = {
            to_name: "Fredy Rompich",
            from_name: firstName.value,
            message: comment.value,
            subject: subject.value,
        };
        
        let serviceID = "service_contact_form";
        let templateID = "contact_template";
        emailjs.send(serviceID, templateID, params)
        .then(res => {
            emailMessageModal.showModal()
            emailMessageModal.style.display = "flex";
            setTimeout(function() {
                emailMessageModal.style.display = "none";
                emailMessageModal.close();
            }, 3000);
        })
        .catch(err => {
            alert("esto es en catch", err.message);
        });
        
    }*/
    
})


//----- BUTTON JOIN EVENT ----
btnJoinEvent.disabled = true;

btnJoinEvent.addEventListener(`click`, () => {
    window.open(`https://us04web.zoom.us/j/72949553754?pwd=aaS3qhM9FYkvrWPeN2QGo3ykX97abb.1`);
})


//---- COUNTDOWN FOR ACTIVATE JOIN EVENT BUTTON
function checkTime() {
    const now = new Date();
    if (now >= oneHourBeforeEvent) {
        activateButton();
    } else {
        // Calcula el tiempo restante y establece un temporizador
        const timeUntilActivation = oneHourBeforeEvent - now;
        console.log(timeUntilActivation);
        setTimeout(activateButton, timeUntilActivation);
    }
}

function activateButton() {
    btnJoinEvent.disabled = false;
}

checkTime();


//------ BUTTONS FOR MODAL INVITE A FRIEND 
btnInviteFriend.addEventListener("click", () => {
    txtHostName.value = ``;
    txtEmailGuest.value = ``;
    txtHostName.style.border = "1px solid #ccc";
    txtEmailGuest.style.border = "1px solid #ccc";
    inviteFriendModal.showModal();
    inviteFriendModal.style.display = "flex";
})

btnSendInvitation.addEventListener(`click`, () => {
    let sendInvitation = true;
    sendInvitation = validateInviteFriendForm();
    console.log(sendInvitation);
    if (sendInvitation) {
        alert(`Enviado`);
        inviteFriendModal.style.display = "none";
        inviteFriendModal.close();
    }
})

btnCancelInvitation.addEventListener("click", () => {
    inviteFriendModal.style.display = "none";
    inviteFriendModal.close();
})


// -------- CONTACT FORM VALIDATION --------//
function validateFormEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let noError = true;
    firstName.style.border = "1px solid #ccc";
    emailSender.style.border = "1px solid #ccc";
    subject.style.border = "1px solid #ccc";
    comment.style.border = "1px solid #ccc";
    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    comment.textContent = "";

    if (firstName.value === '') {
        nameError.textContent = "Ingresa tu nombre";
        firstName.style.border = "1px solid #f90a0a";
        noError = false;
    } 

    const validEmail = emailRegex.test(emailSender.value);

    if(!validEmail) {
        console.log("Entra aqui")
        emailError.textContent = "Ingresa un email valido";
        emailSender.style.border = "1px solid #f90a0a";
        noError = false;
    }
    
    if (subject.value === '') {
        subjectError.textContent = "Ingresa información en este campo";
        subject.style.border = "1px solid #f90a0a";
        noError = false;
    }

    if (comment.value.length < 20 ) {
        commentError.textContent = "Comentario debe de contener al menos 20 caracteres";
        comment.style.border = "1px solid #f90a0a";
        btnSendEmail.style.marginTop = "10px";
        noError = false;
    }
    return noError;
}

function validateInviteFriendForm() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let noError = true;
    txtHostName.style.border = "1px solid #ccc";
    txtEmailGuest.style.border = "1px solid #ccc";
   

    if (txtHostName.value == ``) {
        txtHostName.style.border = "1px solid #f90a0a";
        noError = false;
    }

    const validEmail = emailRegex.test(emailSender.value);

    if(!validEmail) {
        emailError.textContent = "Ingresa un email valido";
        txtEmailGuest.style.border = "1px solid #f90a0a";
        noError = false;
    }

    return noError;
}

//Prevent to close modal-dialog with key ESC
document.addEventListener(`keydown`, function(event) {
    if (event.key === `Escape`) {
        const modals = document.querySelectorAll(`dialog[open]`);
        modals.forEach(modal => {
            event.preventDefault();
        });
    }
})