// import tasksImage from "./images/tasks.svg";
// import projectsImage from "./images/projects.svg";
// import plusImage from "./images/plus.svg";
// import avatarImage from "./images/avatar.svg";
// import settingsImage from "./images/settings.svg";
// import editImage from "./images/edit.svg";
// import {toDo, Project, createSampleTask} from "./toDo.js";


// const body = document.querySelector("body");


const clearBody = () => {
    while (body.lastChild) {
        body.lastChild.remove();
    }
};




export const loadMainPage = () => {

    // clear out all existing content first
    clearAllContent();

    const content = document.createElement("div");
    content.id = "content";



    addContent(content);


};


