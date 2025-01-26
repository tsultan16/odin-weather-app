import {loadMainPage} from "./mainPage.js";
import "./style.css";


let temperature_units = "°C";

// add temp unit toggle switch event listener
const toggle = document.querySelector("#temp-toggle");
toggle.addEventListener("change", (event) => {
    if (event.target.checked) {
        console.log("Changed temp units to Farenheit.");
        temperature_units = "°F"
    } else {
        console.log("Changed temp units to Celcius.");
        temperature_units = "°C"
    }
    // re-render main page with new temperature units
    loadMainPage(temperature_units);
});

// load the main page
loadMainPage(temperature_units)



