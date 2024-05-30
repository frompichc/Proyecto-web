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
const spanHostNameError = document.getElementById(`host_name_error`);
const spanEmailGuestError = document.getElementById(`email_guest_error`);

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

btnSendEmail.addEventListener("click", () => {
    let sendEmail = true;
    sendEmail = validateFormEmail();
    /*emailMessageModal.showModal()
            emailMessageModal.style.display = "flex";
            setTimeout(function() {
                emailMessageModal.style.display = "none";
                emailMessageModal.close();
            }, 3000);*/

    if (sendEmail) {
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
                firstName.value = ``;
                emailSender.value = ``;
                subject.value = ``;
                comment.value = ``;
                cleanContactForm();
                emailMessageModal.style.display = "none";
                emailMessageModal.close();

            }, 3000);
        })
        .catch(err => {
            alert("Error enviando mensaje", err.message);
            firstName.value = ``;
            emailSender.value = ``;
            subject.value = ``;
            comment.value = ``;
            cleanContactForm();
        });
    }    
})



/*
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
        setTimeout(activateButton, timeUntilActivation);
    }
}

function activateButton() {
    btnJoinEvent.disabled = false;
}

checkTime();
*/




//------ BUTTONS FOR MODAL INVITE A FRIEND 
btnInviteFriend.addEventListener("click", () => {
    txtHostName.value = ``;
    txtEmailGuest.value = ``;
    cleanInvitationForm();
    inviteFriendModal.showModal();
    inviteFriendModal.style.display = "flex";
})

btnSendInvitation.addEventListener(`click`, () => {
    let sendInvitation = true;
    sendInvitation = validateInviteFriendForm();
    if (sendInvitation) {
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
        loadInformation(data[0]);
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

function loadInformation(data) {
    console.info(data);
    const wrapperJoinEvent = document.getElementById(`wrapper_join_event`);
    //data.forEach(item => {
        console.info(data.title);
        const joinEventDiv = document.createElement(`div`);
        const topicDiv = document.createElement(`div`);
        const topicImage = document.createElement(`img`);
        const topicDivLevel1 = document.createElement(`div`);
        const topicDivLevel2 = document.createElement(`div`);
        const topicDivTimeZone = document.createElement(`div`);
        const topicSpan = document.createElement(`span`)
        const topicButton = document.createElement(`button`);
        const topicImgDateTime = document.createElement(`img`);

        joinEventDiv.className = `join_event`;
        topicDiv.className = `topic`;
        topicImage.className = `topic logo`;
        topicSpan.className = `topic title`;
        topicDivTimeZone.className = `timezone`;
        topicButton.className = `button`;

        joinEventDiv.id = `join_event`;
        topicDivTimeZone.id = `date_time`;
        topicButton.id = `button_join_event`;

        topicSpan.innerHTML = data.title;

        const date = new Date(data.date_time);
        const oneHourBeforeEvent = new Date(date.getTime() - 60 * 60 * 1000);
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        dateOptions.timeZoneName = "long";
        let dateString = date.toLocaleDateString('es-ES', dateOptions);
        let timeString = date.toLocaleTimeString('es-ES', timeOptions);
        const showDate = dateString.split(',');

        topicImgDateTime.src = `../resources/date_time.svg`;
        topicImage.src = data.url_img;
        topicButton.textContent = `Únete al evento`;

        wrapperJoinEvent.appendChild(joinEventDiv);
        joinEventDiv.appendChild(topicDiv);
        topicDiv.appendChild(topicImage);
        topicDiv.appendChild(topicDivLevel1);
        topicDivLevel1.appendChild(topicSpan);
        topicDivLevel1.appendChild(topicDivLevel2);
        topicDivLevel2.appendChild(topicDivTimeZone);
        topicDivTimeZone.appendChild(topicImgDateTime);
        topicDivTimeZone.innerHTML += showDate[0] + showDate[1] + ' ' + timeString;
        topicDivLevel2.appendChild(topicButton);
        topicButton.addEventListener(`click`, () => {
            window.open(data.url_zoom);
        })


    //})
}
