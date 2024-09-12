import { loadInformation } from "./createsesions.js";

//Dropdown menu
const toggleBtn = document.getElementById("toggle_btn");
const dropDownMenu = document.getElementById("dropdown_menu");
const dropDownMenuOptions = dropDownMenu.querySelectorAll(`a`);

//Dropdown Menu
toggleBtn.addEventListener("click", () => {
    dropDownMenu.classList.toggle(`open`);
})

dropDownMenuOptions.forEach(option => {
    option.addEventListener(`click`, () => {
        dropDownMenu.classList.remove('open');
    })
})

window.onload = retriveData();

function retriveData() {
    fetch(`../documents/information.json`).then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }
        return response.json();
    }).then(data => {
        loadInformation(data, true);
    }).catch(error => {
        console.error(`Hubo un error cargando la información ${error}`);
    }) 
}
