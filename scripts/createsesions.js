export function loadInformation(data, isList) {
    const wrapperJoinEvent = document.getElementById(`wrapper_join_event`);
    if (isList) {   
        data.forEach(item => {
            fillInformation(item, wrapperJoinEvent);
        })
    } else {
            fillInformation(data, wrapperJoinEvent);
    }
};

function fillInformation(item, wrapperJoinEvent) {
        console.info(item.title);
        const joinEventDiv = document.createElement(`div`);
        const topicDiv = document.createElement(`div`);
        const topicImage = document.createElement(`img`);
        const topicDivLevel1 = document.createElement(`div`);
        const topicDivLevel2 = document.createElement(`div`);
        const topicDivTimeZone = document.createElement(`div`);
        const topicSpan = document.createElement(`span`)
        const topicButton = document.createElement(`button`);
        const topicImgDateTime = document.createElement(`img`);
        const topicMessage = document.createElement(`span`);

        joinEventDiv.className = `join_event`;
        topicDiv.className = `topic`;
        topicImage.className = `topic logo`;
        topicSpan.className = `topic title`;
        topicDivTimeZone.className = `timezone`;
        topicButton.className = `button`;


        joinEventDiv.id = `join_event`;
        topicDivTimeZone.id = `date_time`;
        topicButton.id = `button_join_event`;

        topicSpan.innerHTML = item.title;
        topicMessage.innerHTML = `<strong>* El botón para unirse al evento se habilitara cuando la fecha y hora se aproximen</strong>`;

        topicMessage.style.color = `#051B36`;

        const date = new Date(item.date_time);
        const oneHourBeforeEvent = new Date(date.getTime() - 60 * 60 * 1000);
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        dateOptions.timeZoneName = "long";
        let dateString = date.toLocaleDateString('es-ES', dateOptions);
        let timeString = date.toLocaleTimeString('es-ES', timeOptions);
        const showDate = dateString.split(',');

        topicImgDateTime.src = `../resources/date_time.svg`;
        topicImage.src = item.url_img;
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
      
        if (item.button) {
            topicDivLevel2.appendChild(topicButton);
            topicButton.addEventListener(`click`, () => {
                window.open(item.url_zoom);
            })
        } else {
            topicDivLevel2.appendChild(topicMessage);
        }
}

