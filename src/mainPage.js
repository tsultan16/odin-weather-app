// import tasksImage from "./images/tasks.svg";
// import projectsImage from "./images/projects.svg";
// import plusImage from "./images/plus.svg";
// import avatarImage from "./images/avatar.svg";
// import settingsImage from "./images/settings.svg";
// import editImage from "./images/edit.svg";
// import {toDo, Project, createSampleTask} from "./toDo.js";


const content = document.querySelector("#content");

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



export const loadMainPage = async (temperature_units, location) => {

    const loc = document.querySelector("#current_location");
    const temp = document.querySelector("#current_temperature");
    const units = document.querySelector("#temp-units");

    // clear out all existing content first
    // clearContent();
    const data = await getWeatherData(location);
    console.log(data);


    // add current location and temp to header
    const current_temp =  convertTemp(data.currentConditions.temp, temperature_units);
    loc.textContent = data.resolvedAddress;
    temp.textContent = current_temp;
    units.textContent = temperature_units;
    
    // render current weather panel and append to content grid
    content.appendChild(createCurrentWeatherPanel(data, temperature_units));

    console.log("Loaded main page!");
};

const convertUTC = (date) => {
    const date_UTC = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return date_UTC;
};

const getTime12hr = (date) => {
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
};

const getDate = (date) => {
    // Day DD MM YY
    //return date.toString().split(' ').slice(0, 4).join(' ');

    // DD MM
    return date.toString().split(' ').slice(1, 3).join(' ');
}

const getTargetDate = (date_local, tzoffset) => {
    // first convert my local time to UTC
    const date_UTC = convertUTC(date_local)

    // apply tzoffset to get the local time for target
    const date_target = new Date(date_UTC.getTime() + tzoffset * 3600 * 1000); // convert offset from hours to milli sec
    return date_target;
}

const createCurrentWeatherPanel = (data, temperature_units) => {
    const current_temp =  data.currentConditions.temp;
    const units = temperature_units; 

    // find local date-time at target location  
    const date_local = new Date();
    const tzoffset = data.tzoffset;
    const date_target = getTargetDate(date_local, tzoffset); 
    const datetime_target = `${getDate(date_target)}, ${getTime12hr(date_target)}`;
    
    // console.log("Target local time: ", date_target, current_time);
    // console.log("My local date time: ", date_local, `${getDate(date_local)}, ${getTime12hr(date_local)}`);
    // console.log("Target tzoffset: ", tzoffset);
    

    const current_weather_cell = createDivElement("", "current-weather-cell", null);
    const current_weather = createDivElement("", "current-weather", null);
    
    const current_weather_header = createDivElement("", "current-weather-header", null);
    current_weather_header.appendChild(createSpanElement("Current Weather", null, null));
    current_weather_header.appendChild(createSpanElement(datetime_target, "time", null));

    const current_weather_content = createDivElement("", "current-weather-content", null);

    const temp_container = createDivElement("", "temp-container", null);
    const actual_temp = createDivElement(`${convertTemp(current_temp, units)} ${units}`, "actual-temp", null);
    const feels_like = createDivElement(`Feels Like  ${convertTemp(data.currentConditions.feelslike, units)} ${units}`, "feels-like", null);
    const conditions = createDivElement(data.currentConditions.conditions, "conditions", null);
    temp_container.appendChild(actual_temp);    
    temp_container.appendChild(feels_like);    
    temp_container.appendChild(conditions);
    
    const other = createDivElement("", "other-weather", null);
    const wind_speed = createDivElement(`Wind Speed  ${data.currentConditions.windspeed} km/h`, "wind-speed", null);
    const visibility = createDivElement(`Visibility  ${data.currentConditions.visibility} km`, "wind-speed", null);
    const humidity = createDivElement(`Humidity  ${data.currentConditions.humidity} %`, "wind-speed", null);
    other.appendChild(wind_speed);
    other.appendChild(visibility);
    other.appendChild(humidity);
    
    current_weather_content.appendChild(temp_container);
    current_weather_content.appendChild(other);
    current_weather.appendChild(current_weather_header);
    current_weather.appendChild(current_weather_content);
    current_weather_cell.appendChild(current_weather);
    // console.log(current_weather);

    return current_weather_cell;
};


const createDivElement = (text="", id=null, cls=null) => {
    const elem = document.createElement("div");
    elem.textContent = text;
    if (id) {
        elem.id = id
    }
    if (cls) {
        elem.classList.add(cls);
    }
    return elem
};

const createSpanElement = (text="", id=null, cls=null) => {
    const elem = document.createElement("span");
    elem.textContent = text;
    if (id) {
        elem.id = id
    }
    if (cls) {
        elem.classList.add(cls);
    }
    return elem
}


const convertTemp = (tempC, units) => {
    if (units === "°F") {
        return Math.round(convertCtoF(tempC));
    } else {
        return Math.round(tempC);
    }
}

const convertCtoF = (tempC) => {
    return (tempC * 9/5) + 32;
};


// const convertFtoC = (tempF) => {
//     return (tempF - 32) * 5/9;
// };



