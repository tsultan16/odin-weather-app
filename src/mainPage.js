import tasksImage from "./images/tasks.svg";
import projectsImage from "./images/projects.svg";
import plusImage from "./images/plus.svg";
import avatarImage from "./images/avatar.svg";
import settingsImage from "./images/settings.svg";
import editImage from "./images/edit.svg";
import {toDo, Project, createSampleTask} from "./toDo.js";


const body = document.querySelector("body");
const PRIORITY_MAP = {"low": "!", "medium": "!!", "high": "!!!"};
export const allTodoItems = {};
export const allProjects = {};

export const addContent = (HTMLelement) => {
    body.appendChild(HTMLelement);
};


const clearAllContent = () => {
    while (body.lastChild) {
        body.lastChild.remove();
    }
};

export const loadMainPage = () => {

    // clear out all existing content first
    clearAllContent();

    const content = document.createElement("div");
    content.id = "content";
    const sidebar = createSidebar();
    const user_info = createUserInfo();
    const main_panel = createMainPanel();
    const footer = createFooter();
    content.appendChild(sidebar);
    content.appendChild(user_info);
    content.appendChild(main_panel);
    content.appendChild(footer);
    addContent(content);

    const current_date = new Date().toDateString();    
    for (let id in allTodoItems) {
        if (!allTodoItems[id].completed) {
            // add incomplete tasks to up next panel
            addTaskToPanel(allTodoItems[id], "up-next");
        
            if (allTodoItems[id].dueDate.toDateString() === current_date) {
                // add completed tasks to recently completed panel
                addTaskToPanel(allTodoItems[id], "due-today");
            }    

        } else {
            // add completed tasks to recently completed panel
            addTaskToPanel(allTodoItems[id], "recently-completed");
        }

    }

};


const loadAllProjectsPage = () => {
    // clear out all existing content first
    clearAllContent();
    const content = document.createElement("div");
    content.id = "content";
    const user_info = createUserInfo();
    const footer = createFooter();

    const container = document.createElement("div");
    container.id = "all-projects-container";
    const section = createMainPanelSection("All Projects", "all-projects");
    container.appendChild(section);

    content.appendChild(user_info);
    content.appendChild(container);
    content.appendChild(footer);
    addContent(content);
    
    for (let title in allProjects) {
        addProjectToPanel(allProjects[title], section);
    }
};


const loadProjectDetails = (proj) => {
    // clear out all existing content first
    clearAllContent();
    const content = document.createElement("div");
    content.id = "content";
    const user_info = createUserInfo();
    const footer = createFooter();

    const section = createMainPanelSection(proj.title, "all-todos");
    console.log("All todos section: ", section);

    // add tasks to section panel
    const tasks = proj.toDoItems; 
    for (let task_id in tasks) {
        const task = tasks[task_id];
        console.log("Adding task: ", task)
        addTaskToPanel(task, "all-todos", section.lastChild);
    }

    // need add/remove tasks feature
    // need a back to main page button
    
    content.appendChild(user_info);
    content.appendChild(section);
    content.appendChild(footer);
    addContent(content);

};



const loadNewProjectPage = () => {
    // clear out all existing content first
    clearAllContent();
    const content = document.createElement("div");
    content.id = "content";
    const user_info = createUserInfo();
    const footer = createFooter();


    const form_container = document.createElement("div");
    form_container.id = "form-container";
    
    const form = document.createElement("form");
    form.id = "new-project-form";
    
    const form_heading = document.createElement("h4");
    form_heading.id = "project-form-heading";
    form_heading.textContent = "Project";
    const title_input = createFormInput("Title", "text", true);
        
    const button_container = document.createElement("div");
    button_container.classList.add("button-container");
    const confirm_button =  document.createElement("button");
    confirm_button.type = "button";
    confirm_button.id = "confirm-button"; 
    confirm_button.textContent = "Confirm";
    const cancel_button =  document.createElement("button");
    cancel_button.type = "button";
    cancel_button.id = "cancel-button"; 
    cancel_button.textContent = "Cancel";
    button_container.appendChild(confirm_button);
    button_container.appendChild(cancel_button);
    
    form.appendChild(form_heading);
    form.appendChild(title_input);
    form.appendChild(button_container);   
    form_container.appendChild(form);

    content.appendChild(user_info);
    content.appendChild(form_container);
    content.appendChild(footer);
    addContent(content);

    // handle button click
    confirm_button.addEventListener("click", (e) => {
        console.log("Clicked confirm.");

        // create new project
        allProjects[title_input.value] = new Project(title_input.value);
        console.log("Created a new project: ", allProjects[title_input.value] );

        // render All Projects Page
        loadAllProjectsPage();

    });
    allProjects[title_input.value] 
    cancel_button.addEventListener("click", cancelButtonHandler);

}



const loadToDoEditPage  = (item = null) => {
    // clear out all existing content first
    clearAllContent();
    const content = document.createElement("div");
    content.id = "content";
    const user_info = createUserInfo();
    const footer = createFooter();

    const form_container = document.createElement("div");
    form_container.id = "form-container";
    const form = document.createElement("form");
    form.id = "todo-form";
    const form_heading = document.createElement("h4");
    form_heading.id = "todo-form-heading";
    form_heading.textContent = "ToDo Item";

    const title_input = createFormInput("Task Title", "text", true);
    const description_input = createFormTextArea("Description");
    const date = createFormInput("Date", "date", true);
    const priority = createSelectInput("Priority", ["Low", "Medium", "High"]);

    const button_container = document.createElement("div");
    button_container.classList.add("button-container");
    const confirm_button =  document.createElement("button");
    confirm_button.type = "button";
    confirm_button.id = "confirm-button"; 
    confirm_button.textContent = "Confirm";
    const cancel_button =  document.createElement("button");
    cancel_button.type = "button";
    cancel_button.id = "cancel-button"; 
    cancel_button.textContent = "Cancel";
    button_container.appendChild(confirm_button);
    button_container.appendChild(cancel_button);

    form.appendChild(form_heading);
    form.appendChild(title_input);
    form.appendChild(description_input);
    form.appendChild(date);    
    form.appendChild(priority);    
    form.appendChild(button_container);    
    form_container.appendChild(form);
    
    content.appendChild(user_info);
    content.appendChild(form_container);
    content.appendChild(footer);
    addContent(content);

    if (item != null) {
        title_input.value = item.title;
        description_input.value = item.description;
        date.value = item.dueDate.toISOString().split('T')[0];
        priority.lastChild.value = item.priority;
        confirm_button.addEventListener("click", (e) => {
            console.log("Clicked on confirm button.");
            console.log(priority);
            // get updated input values
            let title_input = document.querySelector("#todo-title-input").value;
            const description_input = document.querySelector("#todo-description-input").value;
            const date_input = new Date(document.querySelector("#todo-date-input").value + 'T00:00');
            const priority_input = document.querySelector("#todo-priority-input").value;
        
            title_input = (title_input.length > 0) ? title_input : "Untitled";
            console.log("Form Inputs: ", title_input, description_input, date_input, priority_input);
        
            // update task object
            item.title = title_input;
            item.description = description_input;
            item.dueDate = date_input;
            item.priority = priority_input;
        
            // render main page again
            loadMainPage();
        });

    } else {
        confirm_button.addEventListener("click", confirmButtonHandlerNew);
    }    

    cancel_button.addEventListener("click", cancelButtonHandler);

};

const confirmButtonHandlerNew = (e) => {
    console.log("Clicked on confirm button.");
    // get input values
    let title_input = document.querySelector("#todo-title-input").value;
    const description_input = document.querySelector("#todo-description-input").value;
    const date_input = (document.querySelector("#todo-date-input").value !== "") ? new Date(document.querySelector("#todo-date-input").value + 'T00:00') : new Date();
    const priority_input = document.querySelector("#todo-priority-input").value;

    title_input = (title_input.length > 0) ? title_input : "Untitled";
    console.log("Form Inputs: ", title_input, description_input, date_input, priority_input);

    // create new task object
    // return {title: title_input, description: description_input, date: date_input, priority: priority_input};
    const todo =  new toDo(title_input, description_input, date_input, false, priority_input);
    allTodoItems[todo.id] = todo;

    // render main page again
    loadMainPage();
};


const cancelButtonHandler = (e) => {
    console.log("Clicked on cancel button.");
    // render mainpage again
    loadMainPage();
};


const createFormInput = (name, type, required) => {
    const input = document.createElement("input");
    input.type = type;
    input.id = `todo-${name.toLowerCase()}-input`; 
    input.classList.add("form-input");
    input.name = `todo-${name.toLowerCase()}`;
    input.required = required;
    input.placeholder = name;
    return input;
};

const createFormTextArea = (name) => {
    const text_area = document.createElement("textarea");
    text_area.id = `todo-${name.toLowerCase()}-input`; 
    text_area.classList.add("form-input");
    text_area.name = `todo-${name.toLowerCase()}`;
    text_area.placeholder = name;
    return text_area;
};

const createSelectInput = (name, options) => {
    const input = document.createElement("div");

    const label = document.createElement("label");
    label.for = `todo-${name.toLowerCase()}-input`;
    label.textContent = name;
    const select = document.createElement("select");
    select.id = `todo-${name.toLowerCase()}-input`; 
    select.classList.add("form-input");
    select.name = `todo-${name.toLowerCase()}`;

    options.forEach(element => {
        const option = document.createElement("option");
        option.value = element.toLowerCase();
        option.textContent = element;
        select.appendChild(option);
    });

    input.appendChild(label);
    input.appendChild(select);
    return input;
};

const createCheckboxInput = (todo, panel) => {
    const input = document.createElement("input");
    input.id = `checkbox-input-${panel}-${todo.id}`;
    input.type = "checkbox"; 
    input.dataset.id = String(todo.id);
    input.name = `todo-checkbox`;
    input.checked = todo.completed;

    // add click handler for checkbox
    input.addEventListener("change", (e) => {
        const target = e.target;
        const task_id = parseInt(target.dataset.id);
        console.log(`Clicked checkbox for task id ${task_id}. Checked status: ${target.checked}`);
        // change task completion state
        allTodoItems[task_id].completed = target.checked;
        // rerender page
        loadMainPage();
    });

    return input;
};


export const createSidebar = () => {
    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";

    const section1 = document.createElement("div");
    section1.classList.add("sidebar-section");
    const tasks = createSidebarItem("All Tasks", "all-tasks-button", tasksImage);
    const projects = createSidebarItem("All Projects", "all-projects-button", projectsImage);
    section1.appendChild(tasks);
    section1.appendChild(projects);

    const section2 = document.createElement("div");
    section2.classList.add("sidebar-section");
    const new_project = createSidebarItem("New Project", "new-project-button", plusImage);
    const new_todo = createSidebarItem("New Todo", "new-todo-button", plusImage);
    section2.appendChild(new_project);
    section2.appendChild(new_todo);

    sidebar.appendChild(section1);
    sidebar.appendChild(section2);
    
    // handle sidebar button clicks 
    sidebar.addEventListener("click", (event) => {
        const target_id = event.target.id;
        console.log(`Clicked on ${target_id}!`);
        
        switch (target_id) {
            case "new-todo-button":
                loadToDoEditPage();
                break;
            
            case "new-project-button":
                loadNewProjectPage();
                break;

            case "all-projects-button":
                loadAllProjectsPage();
                break;    
        }
    }); 

    return sidebar;

};

const createSidebarItem = (text, button_id, icon) => {
    const section = document.createElement("div");
    section.classList.add("sidebar-item");
    const section_icon = document.createElement("img");
    section_icon.src = icon;
    section_icon.classList.add("sidebar-icon");
    const section_button = document.createElement("button");
    section_button.type = "button";
    section_button.id = button_id;
    section_button.textContent = text;
    section.appendChild(section_icon);
    section.appendChild(section_button);
    return section;
};


const createUserInfo = () => {
    const user_info = document.createElement("div");
    user_info.id = "user-info";
    
    const date = document.createElement("div");
    date.id = "today-date";
    date.textContent = new Date().toString().split(" ").slice(0,4).join(" "); 

    const app_title = document.createElement("h2");
    app_title.id = "today-date";
    app_title.textContent = "My Todo List App"; 


    const user = document.createElement("div");
    user.id = "user";
    const name = document.createElement("p");
    name.textContent = "Tanzid Sultan"; // hard-coded for now
    const avatar_icon = document.createElement("img");
    avatar_icon.src = avatarImage;
    avatar_icon.id = "avatar";
    user.appendChild(name);
    user.appendChild(avatar_icon)
    
    user_info.appendChild(date);
    user_info.appendChild(app_title);
    user_info.appendChild(user);
    return user_info;

};


const createMainPanel = () => {
    const main_panel = document.createElement("div");
    main_panel.id = "main-panel";

    const due_today = createMainPanelSection("Due Today", "due-today");
    const up_next = createMainPanelSection("Up Next", "up-next");
    const recently_completed = createMainPanelSection("Recently Completed", "recently-completed");
    main_panel.appendChild(due_today);
    main_panel.appendChild(up_next);
    main_panel.appendChild(recently_completed);
    return main_panel;
    
}

const createMainPanelSection = (name, id, cls = null) => {
    const section = document.createElement("div");
    section.id = id;
    if (cls !== null) {
        section.classList.add(cls);
    }
    const section_h4 = document.createElement("h4");
    section_h4.textContent = name;
    const container = document.createElement("div");
    container.classList.add("task-container");    
    section.appendChild(section_h4);
    section.append(container);
    return section;
}

const createFooter = () => {
    const footer = document.createElement("footer");
    
    const icon = document.createElement("img");
    icon.src = settingsImage;
    icon.classList.add("sidebar-icon");
 
    const button = document.createElement("button");
    button.type = "button";
    button.id = "settings-button";
    button.textContent = "Settings"
    
    footer.appendChild(icon);
    footer.appendChild(button);
    return footer;
};


// add and render a todo item in the up next section of main panel
const addTaskToPanel = (todo, panel="up-next", task_container=null) => {
    let container;
    if (task_container === null) {
        container = document.querySelector(`#${panel} > .task-container`);
    } else {
        container = task_container;
    }

    // create a task card
    const card = document.createElement("div");
    card.classList.add("panel-card");

    const task_details = document.createElement("div");
    task_details.classList.add("task-details");
    const title = document.createElement("div");
    title.classList.add("task-title");
    title.textContent = todo.title;
    
    const priority = document.createElement("div");
    priority.classList.add("task-priority");
    // priority.textContent = "!".repeat(todo.priority);
    priority.textContent = PRIORITY_MAP[todo.priority];
    const checkbox = createCheckboxInput(todo, panel);
    

    task_details.appendChild(checkbox);
    task_details.appendChild(title);
    if (panel !== "due-today") {
        const due = document.createElement("div");
        // due.textContent = todo.dueDate.toLocaleDateString();
        due.textContent = todo.dueDate.toString().split(" ").slice(1,4).join(" ");
        due.classList.add("task-due-date");
        
        task_details.appendChild(due);
    }
    task_details.appendChild(priority);

    const edit_icon = createTodoEditIcon(todo);

    card.appendChild(task_details);
    card.appendChild(edit_icon);
    container.appendChild(card);
    console.log(`Added task to Up Next: ${todo.print()}`);
};


// add and render a todo item in the up next section of main panel
const addProjectToPanel = (proj, section) => {
    const container = section.lastChild;

    // create a project card
    const card = document.createElement("div");
    card.classList.add("panel-card");

    const task_details = document.createElement("div");
    task_details.classList.add("task-details");
    const title = document.createElement("div");
    title.classList.add("task-title");
    title.textContent = proj.title;
    task_details.appendChild(title);

    // add click handler for showing project details page
    card.addEventListener("click", (e) => {
        console.log(`Clicked on project: ${proj.title}`);
        loadProjectDetails(proj);

    });

    card.appendChild(task_details);
    container.appendChild(card);
    console.log(`Added project to All Projects panel: ${proj.title}`);
};


const createTodoEditIcon = (todo) => {
    const edit_icon = document.createElement("img");
    edit_icon.src = editImage;
    edit_icon.classList.add("task-edit-icon");

    // add the task id to data attribute, will need later for editing
    edit_icon.dataset.id = String(todo.id);

    // add click handler for edit icon
    edit_icon.addEventListener("click", (e) => {
        const target = e.target;
        const task_id = parseInt(target.dataset.id);
        console.log(`Clicked edit for task id ${task_id} in Up Next Panel`);
        loadToDoEditPage(todo);

    });
    return edit_icon;

}; 























