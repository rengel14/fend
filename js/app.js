// Start Helper Functions
function CalcPercent(rect){
    let top = rect.top;
    let bot = (rect.bottom - window.innerHeight);
    let size = window.innerHeight + bot - top;
    let percent = 0;
    if(bot <= 0 && top >= 0){
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
// End Helper Functions

// Begin Main Functions
document.addEventListener("DOMContentLoaded", function(){
    // builds the nav menu

    //finds all elements with a data-nav attribute and records the value of that attribute
    const main = document.querySelector('main');
    children = main.children;
    let navs = [];
    for(child of children){
        navs.push(child.getAttribute('data-nav'));
    }

    navs = navs.slice(1); //removes first element (which is always header) from attribute list

    //turns attribute list into html list items for the nav menu
    let tempString = "";
    for(nav of navs){
        tempString = tempString + '\n<li data-nav="' + nav + '">' + nav + '</li>';
    }
    tempString = tempString.concat("\n");
    const list = document.querySelector('#navbar__list');
    list.innerHTML = tempString;

    //sets first section header as active on document loaded
    let activeSection = document.querySelectorAll('[data-nav="' + navs[0] + '"]');
    activeSection[0].classList.add("active");
    activeSection[1].classList.add("active");

    // Add class 'active' to section when taking up most screen space

    //set up scroll lock timer to avoid event spamming multiple times during scrolling
    let timer = null;
    window.onscroll = function(){
        let index = -1;
        if(timer !== null){
            this.clearTimeout(timer);
        }
        timer = this.setTimeout(function() {
            //calculates which element is taking up the most screen space
            let percents = [];
            for(nav of navs){
                const target = document.querySelectorAll('[data-nav="' + nav + '"]');
                const area = target[1].getBoundingClientRect();
                const percent = CalcPercent(area);
                percents.push(percent);
            }
            const max = Math.max(...percents);

            //gets the index of that element and sets it to active after un-setting other elements
            index = percents.indexOf(max);
            const lastActive = document.querySelector(".active");
            if(lastActive !== null){
                lastActive.classList.remove("active");
            }
            activeSection = document.querySelectorAll('[data-nav="' + navs[index] + '"]');
            activeSection[0].classList.add("active");
            activeSection[1].classList.add("active");
        }, 100); //Currently uses 100ms delay
    };

    // Build menu 
    const dropdown = document.getElementById("dropdown");
    const navbar = document.getElementById("navbar__list")
    dropdown.onmouseenter = function() {
        navbar.style.display = "block";
    }
    document.getElementsByClassName("navbar__menu")[0].onmouseleave = function() {
        navbar.style.display = "none";
    }

    // Scroll to section on menu section click
    for(nav of navs){
        const target = document.querySelectorAll('[data-nav="' + nav + '"]');
        target[0].onclick = function(){
            target[1].scrollIntoView();

            // Set sections as active
            const active = document.querySelector(".active");
            if(active !== null){
                active.classList.remove("active");
            }
            target[1].classList.add("active");

            navbar.style.display = "none";
        };
    }
});