
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

const date = new Date("2024-12-06T16:00:00.000Z");
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


btnInviteFriend.addEventListener("click", () => {
    inviteFriendModal.showModal();
    inviteFriendModal.style.display = "flex";
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