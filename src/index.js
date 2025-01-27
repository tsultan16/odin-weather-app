import {loadMainPage} from "./mainPage.js";
import "./style.css";

let location = 'Melbourne'; // set to melbourne by default
let temperature_units = "°C";

// add form input event listener
const input = document.querySelector("#location-input");
const form = document.querySelector("form");

// input.addEventListener("input", (event) => {
//     const loc_input = event.target.value;
//     console.log("Form Input: ", loc_input);
// });


form.addEventListener("submit", (event) => {
    location = input.value;
    // prevent default submission HTTP request
    event.preventDefault();
    console.log("Submitted form with input: ", location);

    // clear out form and re-render main page
    input.value = "";
    loadMainPage(temperature_units, location);
});

// add temp unit toggle switch event listener
const toggle = document.querySelector("#temp-toggle");
const celcius = document.querySelector("#celcius");
const farenheit = document.querySelector("#farenheit");

toggle.addEventListener("change", (event) => {
    if (event.target.checked) {
        console.log("Changed temp units to Farenheit.");
        temperature_units = "°F";
       
    } else {
        console.log("Changed temp units to Celcius.");
        temperature_units = "°C";
    }
    celcius.classList.toggle("toggled");
    farenheit.classList.toggle("toggled");
    
    // re-render main page with new temperature units
    loadMainPage(temperature_units, location);
});

// load the main page
loadMainPage(temperature_units, location)



