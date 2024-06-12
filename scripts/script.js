import { loadInformation } from "./createsesions.js";

// Text elements for contact form
const firstName = document.getElementById("fname");
const emailSender = document.getElementById("emailsender");
const subject = document.getElementById("subject");
const comment = document.getElementById("comment");
const btnSendEmail = document.getElementById("send-email-button");
const bntLoadingContact = document.getElementById(`loading_button_contact`);

const emailMessageModal = document.getElementById("email_message");
const btnInviteFriend = document.getElementById("btn_invite_friend");

// Invite friend modal
const inviteFriendModal = document.getElementById("invite_friend");
const btnCancelInvitation = document.getElementById("invitation_cancel_button");
const btnSendInvitation = document.getElementById("invitation_send_button")
const txtHostName = document.getElementById(`host_name`);
const txtEmailGuest = document.getElementById(`email_guest`);
const spanHostNameError = document.getElementById(`host_name_error`);
const spanEmailGuestError = document.getElementById(`email_guest_error`);
const btnLoadingInvite = document.getElementById(`loading_button_invite`);

//Dropdown menu
const toggleBtn = document.getElementById("toggle_btn");
const dropDownMenu = document.getElementById("dropdown_menu");
const dropDownMenuOptions = dropDownMenu.querySelectorAll(`a`);


// Error elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const commentError = document.getElementById("commentError");



//Dropdown Menu
toggleBtn.addEventListener("click", () => {
    dropDownMenu.classList.toggle(`open`);
})


dropDownMenuOptions.forEach(option => {
    option.addEventListener(`click`, () => {
        dropDownMenu.classList.remove('open');
    })
})


//Send Email in contact Form
btnSendEmail.addEventListener("click", () => {
    let sendEmail = true;
    //sendEmail = validateFormEmail();

    if (sendEmail) {
        btnSendEmail.style.display = `none`;
        bntLoadingContact.style.display = `grid`;

        emailjs.init("IJgiBa0KaSMTs4014");
        let params = {
            to_name: "Fredy Rompich",
            from_name: firstName.value,
            reply_to: emailSender.value,
            message: comment.value,
            subject: subject.value,
        };
        
        /*let serviceID = "service_contact_form";
        let templateID = "contact_template";
        emailjs.send(serviceID, templateID, params)
        .then(res => {*/
            createMessage(
                `Muchas gracias`,
                `Hemos recibido tus comentarios, nos comuncaremos contigo pronto.`,
                `resources/email_sent.svg`
            );
            //Progress bar
            const progressBar = document.getElementById(`progress_bar_notification`);
            emailMessageModal.showModal();
            
            progressBar.style.setProperty(`--width`, 0);
            emailMessageModal.style.display = "flex";
            const intervalID = setInterval(() => {
                const computedStyle = getComputedStyle(progressBar);
                const width = parseFloat(computedStyle.getPropertyValue(`--width`)) || 0;
                console.log(width);
                progressBar.style.setProperty(`--width`, width + .15);
            }, 0)

            setTimeout(() => {               
                firstName.value = ``;
                emailSender.value = ``;
                subject.value = ``;
                comment.value = ``;
                cleanContactForm();
                emailMessageModal.style.display = "none";
                emailMessageModal.close();
                btnSendEmail.style.display = `inline`;
                bntLoadingContact.style.display = `none`;
                clearInterval(intervalID);
            }, 5000);

/*})
        .catch(err => {
            alert(`Ocurrió un error al enviar el correo electronico ${err.message}`);
            firstName.value = ``;
            emailSender.value = ``;
            subject.value = ``;
            comment.value = ``;
            cleanContactForm();
        });*/
    }    
})


//------ BUTTONS FOR MODAL INVITE A FRIEND 
btnInviteFriend.addEventListener("click", () => {
    txtHostName.value = ``;
    txtEmailGuest.value = ``;
    cleanInvitationForm();
    inviteFriendModal.showModal();
    
    inviteFriendModal.style.display = "flex";
})

//Send email in invite a friend form
btnSendInvitation.addEventListener(`click`, () => {
    let sendEmail = true;
    //sendEmail = validateInviteFriendForm();

    if(sendEmail) {
        btnSendInvitation.style.display = `none`;
        btnLoadingInvite.style.display = `grid`;

        /*emailjs.init("IJgiBa0KaSMTs4014");
        let params = {
            from_name: txtHostName.value,
            to_email: txtEmailGuest.value,
        };
        let serviceID = "service_contact_form";
        let templateID = "invitation_template";
        emailjs.send(serviceID, templateID, params)
        .then(res => {*/
            createMessage(
                `Muchas gracias`,
                `La invitación se ha enviado a tu amigo.`,
                `resources/email_sent.svg`
            );
            //Progress bar
            const progressBar = document.getElementById(`progress_bar_notification`);
            progressBar.style.setProperty(`--width`, 0);
            emailMessageModal.showModal()
            const intervalID = setInterval(() => {
                const computedStyle = getComputedStyle(progressBar);
                const width = parseFloat(computedStyle.getPropertyValue(`--width`)) || 0;
                console.log(width);
                progressBar.style.setProperty(`--width`, width + .15);
            }, 0)
            emailMessageModal.style.display = "flex";
            setTimeout(() => {
                txtHostName.value = ``;
                txtEmailGuest.value = ``;
                emailMessageModal.style.display = "none";
                emailMessageModal.close();
                inviteFriendModal.style.display = "none";
                inviteFriendModal.close();
                btnSendInvitation.style.display = `inline`;
                btnLoadingInvite.style.display = `none`;
                clearInterval(intervalID);
            }, 5000);
        /*})
        .catch(err => {
            alert(`Ocurrió un error al enviar el correo electronico ${err.message}`);
            txtHostName.value = ``;
            txtEmailGuest.value = ``;
        });*/
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
    cleanContactForm();

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
    cleanInvitationForm();
    
    if (txtHostName.value == ``) {
        txtHostName.style.border = "1px solid #f90a0a";
        spanHostNameError.textContent = `Ingresa tu nombre`;
        noError = false;
    }

    const validEmail = emailRegex.test(txtEmailGuest.value);

    if(!validEmail) {
        txtEmailGuest.style.border = "1px solid #f90a0a";
        spanEmailGuestError.textContent = "Ingresa un email válido";
        noError = false;
    }

    return noError;
}

function cleanContactForm() {
    firstName.style.border = "1px solid #ccc";
    emailSender.style.border = "1px solid #ccc";
    subject.style.border = "1px solid #ccc";
    comment.style.border = "1px solid #ccc";
    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    commentError.textContent = "";
}

function cleanInvitationForm() {
    txtHostName.style.border = "1px solid #ccc";
    txtEmailGuest.style.border = "1px solid #ccc";
    spanHostNameError.textContent = ``;
    spanEmailGuestError.textContent = ``;
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


window.onload = retriveData();

function retriveData() {
    fetch(`../documents/faq.json`).then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }
        return response.json();
    }).then(data => {
        loadFaq(data);
    }).catch(error => {
        console.error(`Hubo un error cargando la información ${error}`);
    })

    fetch(`../documents/information.json`).then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }
        return response.json();
    }).then(data => {
        loadInformation(data[0], false);
    }).catch(error => {
        console.error(`Hubo un error cargando la información ${error}`);
    }) 
}

function loadFaq(data) {
    const wrapperFaq = document.getElementById(`wrapper_frequent_questions`);
    data.forEach(item => {
        const faqDiv = document.createElement(`div`);
        const faqDivIntern = document.createElement(`div`);
        const faqTitle = document.createElement(`h3`);
        const faqText = document.createElement(`p`);

        faqDiv.className = `how_works`;

        faqTitle.innerHTML = item.title;
        faqText.innerHTML = item.text;

        wrapperFaq.appendChild(faqDiv);
        faqDiv.appendChild(faqDivIntern);
        faqDivIntern.appendChild(faqTitle);
        faqDivIntern.appendChild(faqText);
    })
}

function createMessage(title, message, img) {

    emailMessageModal.innerHTML = ``;

    const divContainerImg = document.createElement(`div`);
    const imgMessage = document.createElement(`img`);
    const divContainerMsg = document.createElement(`div`);
    const progressBar = document.createElement(`div`);
    const tittleMessage = document.createElement(`h2`);
    const textMessage = document.createElement(`p`)

    divContainerImg.className = `image`;
    imgMessage.src = img;
    divContainerImg.appendChild(imgMessage);

    tittleMessage.innerText = title;
    textMessage.innerText = message;
    divContainerMsg.appendChild(tittleMessage);
    divContainerMsg.appendChild(textMessage);

    progressBar.className = `progress-bar`;
    progressBar.id = `progress_bar_notification`;

    emailMessageModal.appendChild(divContainerImg);
    emailMessageModal.appendChild(divContainerMsg);
    emailMessageModal.appendChild(progressBar);
}
