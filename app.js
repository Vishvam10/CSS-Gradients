// UTILITY FUNCTIONS

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
} 
function rgbToHex(r, g, b) {
    return "#"+ componentToHex(r) + componentToHex(g) + componentToHex(b);
}


// COPY CSS

const copyIcon = document.querySelectorAll(".copy");
var container = document.querySelector('.container');
var cardContainer = document.querySelector('.card-container');
var utils = document.querySelector('.utilities');
const nav = document.querySelector(".navigation");
const navContainer = document.querySelector(".nav-container");
var addGradient = document.querySelector('.add-gradient')
var gradientForm = addGradient.childNodes[3];
console.log(gradientForm);
const darkSwitch = navContainer.childNodes[5];

// var bookmarkTab = document.querySelector('.bookmark-tab')
// var btCards = document.querySelectorAll('.bookmark-tab-card');

var i;

function oldBrowserSupport(condition, style) {
    if(condition == "true") {
        var input = document.getElementById('myInput').value = 
        `background: ${style};
        \nbackground: -webkit-${style};
        \nbackground: -moz-${style};
        \nbackground: -ms-${style};
        \nbackground: -o-${style};
        `
    } else {
        var input = document.getElementById('myInput').value = `background: ${style}`;
    }
    return input;
}

function copyCSS(e, condition) {
    var trigger = e.target.dataset.number;
    const gradient = document.getElementById(`gradient-${trigger}`);
    const styleCSS = window.getComputedStyle(gradient).backgroundImage;

    var inp = oldBrowserSupport(condition, styleCSS)
    console.log(inp);

    document.getElementById("inpbtn").click();  
    var copied = document.querySelectorAll(".copied");
    copied[trigger-1].classList.toggle("hide")
    setTimeout(function() {
        var copied = document.querySelectorAll(".copied");
        copied[trigger-1].classList.toggle("hide");
    }, 750);
}

for(i=0; i< copyIcon.length; i++) {
    copyIcon[i].addEventListener("click", e => {
        var condition = navContainer.childNodes[3].dataset.comp;
        copyCSS(e, condition);
    })
}

function copyToClipboard() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

const allCards = document.querySelectorAll(".card")

// GRADIENT SHADOWS 

function gradient(e) {
    var color1 = e.childNodes[7].childNodes[1].style.backgroundColor;
    var color2 = e.childNodes[7].childNodes[3].style.backgroundColor;
    e.style.boxShadow = `-.1rem -.1rem 1.2rem ${color1}, .1rem .1rem 1.2rem ${color2}`;
}

function nogradient(e) {
    e.style.boxShadow = "0 0.4rem 0.6rem rgba(50, 50, 50, 0.3)";
}

// UPDATE THE CIRCLES

var circles = [];

for(i=0; i<allCards.length; i++) {

    var gradients = allCards[i].firstElementChild.children[0];

    var gradientsCSS = window.getComputedStyle(gradients).backgroundImage;
    var c1 = gradientsCSS.split('rgb')[1].slice(0, -2);
    var c2 = gradientsCSS.split('rgb')[2].slice(0, -1);

    // FOR RGB VALUES
    
    var str = "rgba"
    var color1 = str.concat(c1); 
    var color2 = str.concat(c2); 

    var rgbColors = [color1, color2]

    var numberOfCircles = allCards[i].children[3].childElementCount;

    var j;
    for(j=0; j<numberOfCircles; j++) {
        const c = document.getElementById(`circle-${i+1}-${j}`);
        circles.push(c);
        c.style.backgroundColor = rgbColors[j]; 
    }
}

const allCircles = document.querySelectorAll(".circle");
for(i=0; i<allCircles.length; i++) {

    allCircles[i].addEventListener("click", e => {
        var trigger = e.target.dataset.index;
        const circle = document.getElementById(`circle-${trigger}`);
        const circleBg = window.getComputedStyle(circle).backgroundColor;
        var inp = document.getElementById('myInput').value = circleBg;
        document.getElementById("inpbtn").click();  
    });

}

// MENU

function navigationToggle(x) {
    x.classList.toggle("change");
}

nav.addEventListener("click", e => {
    navContainer.classList.toggle("hide")
})

// ADD GRADIENTS 

function createGradientCard(gname, color1, color2, id) {
    
    const gradientCardMarkup = 
    `
        <div class="card">
            <div class="gradient">
                <span id="gradient-${id}"></span>
            </div>
            <div class="icons">
                <ion-icon name="copy-outline"  data-number="${id}"></ion-icon>
                <div class="bookmark">
                    <ion-icon name="bookmark-outline" data-pos="${id}"></ion-icon>
                </div>
            </div>
            <span class="name">${gname}</span>
            <div class="circle-container">
                <span id="circle-${id}-0" class="circle c"data-index="-${id}-0"></span>
                <span id="circle-${id}-1" class="circle c" data-index="${id}-1"></span>
            </div>
        </div>
    `    
    cardContainer.insertAdjacentHTML('beforeend', gradientCardMarkup); 

    const gr = document.getElementById(`gradient-${id}`);
    gr.style.background = "linear-gradient(to right, " + color1 + ", " + color2 + ")";

    const c1 = document.getElementById(`circle-${id}-0`);
    const c2 = document.getElementById(`circle-${id}-1`);

    c1.style.backgroundColor = `${color1}`;
    c2.style.backgroundColor = `${color2}`;
}

addGradient.childNodes[1].addEventListener("click", e => {
    gradientForm.classList.toggle("hide-tab")
})

const submitButton = document.querySelector('.submit');

submitButton.childNodes[1].addEventListener("click", e => {

    const gradientName = document.getElementById('g-name').value;
    const color1 = document.getElementById('color-1').value;
    const color2 = document.getElementById('color-2').value;
    const id = cardContainer.childElementCount + 1;

    createGradientCard(gradientName, color1, color2, id);
})


// DARK THEME

darkSwitch.addEventListener("click", e => {

    const sw = navContainer.childNodes[3];
    container.classList.toggle("dt-container")
    
    var cards = document.querySelectorAll('.card');
    for(i=0; i<cards.length; i++) {
        cards[i].classList.toggle("dt-card")
    }

    var primaryHeading = document.querySelector('.primary-heading');
    primaryHeading.classList.toggle("dt-primary-heading");

    var nameOfGradient = document.querySelectorAll('.name');
    for(i=0; i<nameOfGradient.length; i++) {
        nameOfGradient[i].classList.toggle('dt-name');
    }

    var links = document.querySelectorAll('link')

    for(i=0; i<links.length; i++) {
        links[i].classList.toggle('dt-link')
    }

    // utils.classList.toggle('dt-bookmarks-outline')
    // bookmarkTab.classList.toggle('dt-tab');

    // for(i=0; i<btCards.length; i++) {
    //     btCards[i].classList.toggle('dt-tab-cards');
    // }

    gradientForm.classList.toggle("dt-add-gradient-form");
    console.log(gradientForm.childNodes);
    gradientForm.childNodes[1].classList.toggle("dt-gname")   
    console.log(gradientForm.childNodes[7].childNodes);
    var inp = gradientForm.childNodes[5].childNodes;
    console.log(inp);
    inp[1].classList.toggle("dt-color");
    inp[5].classList.toggle("dt-color");
})

// OLDER VERSION SUPPORT

function compatibilty(ele) {
    if(ele.dataset.comp == "false") {
        ele.dataset.comp = "true";
        var comp = document.querySelector(".comp");
        comp.childNodes[1].textContent = "Older Browser Support Enabled";
        comp.classList.toggle("hide");
        setTimeout(function() {
            comp.classList.toggle("hide");
        }, 750)

    } else {
        ele.dataset.comp = "false";
        var comp = document.querySelector(".comp");
        comp.childNodes[1].textContent = "Older Browser Support Disabled";
        comp.classList.toggle("hide");
        setTimeout(function() {
            comp.classList.toggle("hide");
        }, 750)
    }
}

// BOOKMARKS - COMING SOON

const comingSoonTab = document.querySelector(".coming-soon-tab");
const bookmarks = utils.childNodes[1];
bookmarks.addEventListener("click", e => {
    comingSoonTab.classList.toggle("hide")
    setTimeout(function() {
        comingSoonTab.classList.toggle("hide")
    }, 750)
})

