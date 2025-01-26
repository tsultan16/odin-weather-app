import {allTodoItems, allProjects, loadMainPage} from "./mainPage.js";
import {toDo, Project, createSampleTask} from "./toDo.js";

import "./style.css";

const numSamples = 20;
const default_project = new Project();
allProjects[default_project.title] = default_project;

for (let i=0; i < numSamples; i++) {
    const item = createSampleTask();
    console.log(item);
    default_project.addToDoItem(item);
    allTodoItems[item.id] = item;
}

// console.log(proj);
// console.log(proj.toDoItems);

// load the home page
loadMainPage()



