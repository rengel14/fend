/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
document.addEventListener("DOMContentLoaded", function(){
    const main = document.querySelector('main');
    children = main.children;
    let ids = [];
    for(child of children){
        ids.push(child.getAttribute('data-nav'));
    }
    let tempString = "";
    for(id of ids.slice(1)){
        tempString = tempString.concat("\n<li>", id, "</li>");
    }
    tempString = tempString.concat("\n");
    const list = document.querySelector('#navbar__list');
    list.innerHTML = tempString;
});

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active
