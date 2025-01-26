// this class only responsible for storing/modifying the data for a todo item
export class toDo {
    static id = 0;

    constructor (title, description, dueDate, started=false, priority=null) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.started = started;
        this.priority = priority;
        this.completed = false;
        this.id = toDo.id
        toDo.id++;
    }

    complete () {
        this.completed = true;
    }

    print() {
        return `${this.title}, ${this.description}, ${this.dueDate.toLocaleDateString()}, ${this.priority}`;
    }


};

// this class only responsible for storing/modifying a list of todo items
export class Project {

    constructor (title="Default") {
        this.title = title;
        this.toDoItems = {};
    }

    addToDoItem (item) {
        this.toDoItems[item.id] = item;
    }

    removeToDoItem (item_id) {
        delete this.toDoItems[item_id]
    }

    getToDoItem (item_id) {
        return this.toDoItems[item_id];
    }

    // need a way to track percentage completed, i.e. fraction of items completed

}




// sample task creation
let sample_task_id = 0;

export function createSampleTask() {
    // assign random date and priority 
    const p = ["low", "medium", "high"][Math.floor(Math.random()*3)];
    const item = new toDo(`title${sample_task_id}`, `desc${sample_task_id}`, randomDate(), false, p);
    sample_task_id++;

    return item;
}

// create a random date between [from, to] range
function randomDate (from = new Date(2025, 0, 21), to = new Date(2025, 11, 31)) {
    const rand = Math.floor(Math.random()*2);
    // randomly choose between random date and current date
    return [new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime())), new Date()][rand]
}









