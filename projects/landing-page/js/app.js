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
function CalcPercent(rect){
    let top = rect.top;
    let bot = (rect.bottom - window.innerHeight);
    let size = window.innerHeight + bot - top;
    let percent = 0;
    if(bot < 0 && top > 0){
        percent = 1;
    }
    if(bot > 0 && top > 0)
    {
        percent = (size - bot)/size;
    }
    if(bot < 0 && top < 0){
        percent = (size + top)/size;
    }
    return percent;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
document.addEventListener("DOMContentLoaded", function(){
    const main = document.querySelector('main');
    children = main.children;
    let navs = [];
    for(child of children){
        navs.push(child.getAttribute('data-nav'));
    }
    navs = navs.slice(1); //removes first element which is always header
    let tempString = "";
    for(nav of navs){
        tempString = tempString + '\n<li data-nav="' + nav + '">' + nav + '</li>';
    }
    tempString = tempString.concat("\n");
    const list = document.querySelector('#navbar__list');
    list.innerHTML = tempString;
    list.style.color = "black"

    // Add class 'active' to section when near top of viewport
    let timer = null;
    window.onscroll = function(){
        let index = -1;
        if(timer !== null){
            this.clearTimeout(timer);
        }
        timer = this.setTimeout(function() {
            let percents = [];
            for(nav of navs){
                const target = document.querySelectorAll('[data-nav="' + nav + '"]');
                const area = target[1].getBoundingClientRect();
                const percent = CalcPercent(area);
                percents.push(percent);
            }
            const max = Math.max(...percents);
            index = percents.indexOf(max);
            const active = document.querySelector(".your-active-class");
            active.classList.remove("your-active-class");
            // console.log(navs[index]);
            // console.log(percents)
            document.querySelector('[data-nav="' + navs[index] + '"]').classList.add("your-active-class");
        }, 100);
    };

    // Scroll to anchor ID using scrollTO event
    

    /**
     * End Main Functions
     * Begin Events
     * 
    */

    // Build menu 

    // Scroll to section on link click
    for(nav of navs){
        const target = document.querySelectorAll('[data-nav="' + nav + '"]');
        target[0].onclick = function(){
            target[1].scrollIntoView();
        };
    }
    // Set sections as active

});