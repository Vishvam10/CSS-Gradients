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
var i;

for(i=0; i< copyIcon.length; i++) {
    copyIcon[i].addEventListener("click", e => {
        var trigger = e.target.dataset.number;
        const gradient = document.getElementById(`gradient-${trigger}`);
        const styleCSS = window.getComputedStyle(gradient).backgroundImage;
        var inp = document.getElementById('myInput').value = `background: ${styleCSS},\nbackground: -webkit-${styleCSS}`;
        console.log(inp);
        document.getElementById("inpbtn").click();  
        var copied = document.querySelectorAll(".copied");
        copied[trigger-1].classList.toggle("hide")
        setTimeout(function() {
            var copied = document.querySelectorAll(".copied");
            copied[trigger-1].classList.toggle("hide");
        }, 750);
    });
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
    e.style.boxShadow = `-.1rem -.1rem 1.6rem ${color1}, .1rem .1rem 1.6rem ${color2}`
}

function nogradient(e) {
    e.style.boxShadow = "0 0.4rem 0.6rem rgba(50, 50, 50, 0.3)";
}


// UPDATE THE CIRCLES

var circles = [];

for(i=0; i<allCards.length; i++) {

    var gradients = allCards[i].firstElementChild.children[0];

    var gradientsCSS = window.getComputedStyle(gradients).backgroundImage;
    console.log(gradientsCSS);
    var c1 = gradientsCSS.split('rgb')[1].slice(0, -2);
    var c2 = gradientsCSS.split('rgb')[2].slice(0, -1);
    console.log(c1);
    // FOR RGB VALUES
    
    var str = "rgba"
    var color1 = str.concat(c1); 
    var color2 = str.concat(c2); 
    console.log(color1);
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
        console.log(circleBg);
        // const circleBgInHex = circleBg.replace('(','').replace(')', '').replace('rgb', '').replace(/,/g, '').split(' ');
        // FOR HEX VALUES
        // var hexColor = rgbToHex(parseInt(circleBgInHex[0]), parseInt(circleBgInHex[1]), parseInt(circleBgInHex[2]));
        var inp = document.getElementById('myInput').value = circleBg;
        document.getElementById("inpbtn").click();  
    });

}

// MENU

const nav = document.querySelector(".navigation");
const navContainer = document.querySelector(".nav-container");
const darkSwitch = navContainer.childNodes[3];

function navigationToggle(x) {
    x.classList.toggle("change");
}

nav.addEventListener("click", e => {
    // console.log("Clicked");
    navContainer.classList.toggle("hide")
})

// ADD GRADIENTS 

var addGradient = document.querySelector('.add-gradient')
var gradientForm = document.querySelector('.add-gradient-form')

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
    console.log("Clicked Submit Button");

    const gradientName = document.getElementById('g-name').value;
    const color1 = document.getElementById('color-1').value;
    const color2 = document.getElementById('color-2').value;
    const id = cardContainer.childElementCount + 1;
    // console.log(gradientName, color1, color2, id);
    createGradientCard(gradientName, color1, color2, id);
})


// DARK THEME

darkSwitch.addEventListener("click", e => {

    console.log("Clicked")

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

    var links = document.querySelectorAll('.link')

    for(i=0; i<links.length; i++) {
        links[i].classList.toggle('dt-link')
    }

    var bookmarkTab = document.querySelector('.bookmark-tab')
    var btCards = document.querySelectorAll('.bookmark-tab-card');
    var utils = document.querySelector('.utilities');

    utils.classList.toggle('dt-bookmarks-outline')
    bookmarkTab.classList.toggle('dt-tab');

    for(i=0; i<btCards.length; i++) {
        btCards[i].classList.toggle('dt-tab-cards');
    }

})

