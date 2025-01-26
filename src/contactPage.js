import logoImage from "./images/restaurant-logo.svg";

const content = document.querySelector("#content");

export const addContent =  (HTMLelement) => {
    content.appendChild(HTMLelement);
};


const clearAllContent = () => {
    while (content.lastChild) {
        content.lastChild.remove();
    }
};

export const dayListItem = (day, open_hour, close_hour) => {
    const item = document.createElement("li");
    item.textContent = `${day} - ${open_hour}pm to ${close_hour}am`;
    return item;
};

export const loadContactPage = () => {

    // clear out all existing content first
    clearAllContent();

    // render content elements one by one
    const header = document.createElement("h1");
    header.textContent = "Contact Us";
    content.appendChild(header);
    
    const logo_container = document.createElement("div");
    logo_container.id = "logo-container";
    const logo = document.createElement("img");
    logo.src = logoImage;
    logo.id = "logo";
    logo_container.appendChild(logo)
    addContent(logo_container);
    
    const opening_hours = document.createElement("div");
    opening_hours.id = "opening-hours";
    const opening_hours_header = document.createElement("h2");
    const opening_hours_text = document.createElement("em");
    opening_hours_text.textContent = "Opening Hours";
    const opening_hours_list = document.createElement("ul");
    const days = [["Mon", 5, 12], ["Tue", 5, 12], ["Wed", 5, 12], ["Thu", 5, 12], ["Fri", 5, 2], ["Sat", 5, 2]];
    days.forEach( (e) => {
        opening_hours_list.appendChild(dayListItem(e[0], e[1], e[2]));
    });
    opening_hours_header.appendChild(opening_hours_text)
    opening_hours.appendChild(opening_hours_header);
    opening_hours.appendChild(opening_hours_list);
    addContent(opening_hours);
   
    const location = document.createElement("div");
    location.id = "location";
    const location_header = document.createElement("h2");
    const location_header_text = document.createElement("em");
    location_header_text.textContent = "Location";
    const location_text = document.createElement("p");
    location_text.textContent = "12 Astral Lane, Ethereal City, VX";
    location_header.appendChild(location_header_text)
    location.appendChild(location_header);  
    location.appendChild(location_text);    
    addContent(location);

    const phone = document.createElement("div");
    phone.id = "location";
    const phone_header = document.createElement("h2");
    const phone_header_text = document.createElement("em");
    phone_header_text.textContent = "Phone";
    const phone_text1 = document.createElement("p");
    phone_text1.textContent = "02-5756 4218";
    const phone_text2 = document.createElement("p");
    phone_text2.textContent = "02-6120 3975";
    phone_header.appendChild(phone_header_text)
    phone.appendChild(phone_header);  
    phone.appendChild(phone_text1);    
    phone.appendChild(phone_text2);    
    addContent(phone);


};






