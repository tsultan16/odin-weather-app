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

export const loadMenuPage = () => {

    // clear out all existing content first
    clearAllContent();

    // render content elements one by one
    const header = document.createElement("h1");
    header.textContent = "Menu";
    content.appendChild(header);
    
    const logo_container = document.createElement("div");
    logo_container.id = "logo-container";
    const logo = document.createElement("img");
    logo.src = logoImage;
    logo.id = "logo";
    logo_container.appendChild(logo)
    addContent(logo_container);
    
    createMenuSection("Appetizers", appetizers);
    createMenuSection("Soups & Salads", soupsAndSalads);
    createMenuSection("Pasta", pasta);
    createMenuSection("Main Courses", mainCourses);
    createMenuSection("Woodfire Pizza", pizza);
    createMenuSection("Desserts", desserts);
    createMenuSection("Beverages", beverages);
   
};



const createMenuSection = (name, items) => {
    const tagline_header = document.createElement("h2");
    tagline_header.classList.add("menu-section-header");
    const tagline = document.createElement("em");
    tagline.textContent = name;
    tagline_header.appendChild(tagline);
    addContent(tagline_header); 

    const list = document.createElement("ul");
    list.classList.add("menu-section");
    items.forEach( (item_info) => {
        list.appendChild(createMenuItem(item_info));
    });
    addContent(list);

};


const createMenuItem = (item_info) => {
    const listItem = document.createElement("li");
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("menu-item");
    
    const namePriceDiv = document.createElement("div");
    namePriceDiv.classList.add("menu-item-name-price");
    const name = document.createElement("h4");
    name.classList.add("menu-item-name");
    name.textContent = item_info[0];
    const price = document.createElement("div");
    price.classList.add("menu-item-price");
    price.textContent = item_info[2];
    namePriceDiv.appendChild(name);
    namePriceDiv.appendChild(price);
    
    const desc = document.createElement("p");
    desc.classList.add("menu-item-desc");
    desc.textContent = item_info[1];
    
    itemDiv.appendChild(namePriceDiv);
    itemDiv.appendChild(desc);
    listItem.appendChild(itemDiv);
    
    return listItem;
}

// Appetizers
const appetizers = [
    ["Bruschetta al Pomodoro", "Grilled bread topped with fresh tomatoes, basil, garlic, and olive oil.", 8.95],
    ["Caprese Salad", "Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic glaze.", 10.95],
    ["Arancini", "Crispy risotto balls stuffed with mozzarella and served with marinara sauce.", 9.95],
    ["Calamari Fritti", "Lightly breaded calamari, fried to perfection, served with marinara and lemon aioli.", 12.95],
    ["Prosciutto and Melon", "Thinly sliced prosciutto paired with fresh, sweet melon.", 11.95]
  ];
  
  // Soups and Salads
  const soupsAndSalads = [
    ["Minestrone Soup", "A hearty vegetable soup with a touch of Italian herbs.", 7.95],
    ["Tuscan Soup", "Creamy soup with Italian sausage, potatoes, and kale.", 8.95],
    ["Caesar Salad", "Crisp romaine lettuce, Parmesan, croutons, and Caesar dressing.", 9.95],
    ["Arugula Salad", "Arugula salad with shaved Parmesan, cherry tomatoes, and lemon vinaigrette.", 10.95],
    ["Tuscan Bread Salad", "Rustic Tuscan salad with bread, tomatoes, cucumbers, and red onions.", 11.95]
  ];
  
  // Pasta
  const pasta = [
    ["Spaghetti Carbonara", "Classic Roman pasta with pancetta, egg, Pecorino Romano, and black pepper.", 16.95],
    ["Fettuccine Alfredo", "Creamy Alfredo sauce served over fettuccine noodles.", 15.95],
    ["Lasagna", "Layers of pasta, rich meat sauce, ricotta, and mozzarella, baked to perfection.", 17.95],
    ["Penne Arrabbiata", "Spicy tomato sauce with garlic, chili flakes, and fresh parsley.", 14.95],
    ["Linguine with Clams", "Linguine with fresh clams, garlic, olive oil, and white wine sauce.", 19.95],
    ["Spinach and Ricotta Ravioli", "Homemade ravioli stuffed with ricotta and spinach in a sage butter sauce.", 18.95]
  ];
  
  // Main Courses
  const mainCourses = [
    ["Chicken Parmesan", "Breaded chicken cutlet topped with marinara and mozzarella, served with spaghetti.", 19.95],
    ["Veal Saltimbocca", "Veal topped with prosciutto and sage in a white wine sauce.", 22.95],
    ["Florentine Steak", "Grilled Florentine-style T-bone steak, seasoned with olive oil and sea salt.", 29.95],
    ["Baked Sea Bass", "Oven-baked Mediterranean sea bass with lemon and herbs.", 25.95],
    ["Eggplant Parmesan", "Baked eggplant layered with marinara, mozzarella, and Parmesan.", 17.95]
  ];
  
  // Pizza
  const pizza = [
    ["Margherita", "Classic pizza with tomato sauce, fresh mozzarella, and basil.", 14.95],
    ["Pepperoni", "Spicy pepperoni, mozzarella, and tomato sauce.", 16.95],
    ["Four Cheese", "A blend of mozzarella, gorgonzola, Parmesan, and fontina cheeses.", 18.95],
    ["Prosciutto and Arugula", "Prosciutto, arugula, mozzarella, and shaved Parmesan.", 19.95],
    ["Mushroom and Truffle", "Wild mushrooms, truffle oil, mozzarella, and herbs.", 20.95]
  ];
  
  // Desserts
  const desserts = [
    ["Tiramisu", "Layers of espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa.", 8.95],
    ["Cannoli", "Crispy pastry shells filled with sweet ricotta cream.", 7.95],
    ["Panna Cotta", "Silky smooth vanilla custard with a berry compote.", 8.95],
    ["Gelato", "Authentic Italian ice cream. Choose from chocolate, pistachio, or vanilla.", 6.95],
    ["Affogato", "Vanilla gelato 'drowned' in a shot of hot espresso.", 7.95],
    ["Limoncello Cheesecake", "Creamy lemon cheesecake with a graham cracker crust.", 9.95]
  ];
  
  // Beverages
  const beverages = [
    ["Espresso", "", 3.95],
    ["Cappuccino", "", 4.95],
    ["Italian Soda", "Flavors: Blood Orange, Lemon, or Pomegranate.", 4.50],
    ["San Pellegrino Sparkling Water", "", 3.95],
    ["House Red or White Wine (Glass)", "", 8.95],
    ["Prosecco", "Sparkling Italian wine.", 9.95]
  ];









