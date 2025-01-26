// import tasksImage from "./images/tasks.svg";
// import projectsImage from "./images/projects.svg";
// import plusImage from "./images/plus.svg";
// import avatarImage from "./images/avatar.svg";
// import settingsImage from "./images/settings.svg";
// import editImage from "./images/edit.svg";
// import {toDo, Project, createSampleTask} from "./toDo.js";


const content = document.querySelector("#content");
const loc = document.querySelector("#current_location");
const temp = document.querySelector("#current_temperature");

let DEFAULT_LOCATION = 'Melbourne';
const FORECAST_DAYS = 15;
const API_KEY = '4G7BU7TV8PA554USAZK7L53UU';

const clearContent = () => {
    while (content.lastChild) {
        content.lastChild.remove();
    }
};


const callWeatherAPI = async (url) => {
    try {
        // fetch data from API
        const response = await fetch(url);
        if (! response.ok) {
            throw new Error(`Error response status: ${response.status}`);
        }

        // parse the json response
        const data = await response.json();
        console.log('API call successful!');
        // cache data to local storage
        writeToCache(url, data);
        return data;

    } catch (error) {
        console.log(error.message);
    }
};


const getWeatherData = (location) => {
   
    const dateToday = new Date();
    const dateAfter = new Date(dateToday.valueOf())
    dateAfter.setDate(dateAfter.getDate() + FORECAST_DAYS);

    const date1 = dateToday.toISOString().split('T')[0];
    const date2 = dateAfter.toISOString().split('T')[0]; 

    console.log(date1);
    console.log(date2);

    // make API call to obtain weather forecast (with metric units option)
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?unitGroup=metric&key=${API_KEY}`;    
    console.log(url);
    
    // make API call if cached data not available
    // localStorage.clear()
    let data = readFromCache(url);
    if (data === null) {
        data = callWeatherAPI(url);
    }

    return data
};


const writeToCache = (url, data) => {
    console.log('Adding data string to local storage')
    localStorage.setItem(url, JSON.stringify(data));
};

const readFromCache = (url) => {
    const cached = JSON.parse(localStorage.getItem(url)) || null;
    return cached
};



export const loadMainPage = async () => {

    // clear out all existing content first
    // clearContent();
    const data = await getWeatherData(DEFAULT_LOCATION);
    console.log(data);


    // add current location and temp to header
    const current_loc = data.resolvedAddress;
    const current_temp =  data.currentConditions.temp;
    loc.textContent = current_loc;
    temp.textContent = current_temp;

    // body.appendChild(content);


};


const convertCtoF = (tempC) => {
    return (tempC * 9/5) + 32;
};


const convertFtoC = (tempF) => {
    return (tempF - 32) * 5/9;
};



