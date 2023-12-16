let nav = document.querySelector("header nav");
let icons = document.querySelector("header .icons");

// Add Click Event For The Header Icons
icons.onclick = function () {
    nav.classList.toggle("show");
};

// get the checkbox for color mode
let colorMode = nav.querySelector("label input");

if (localStorage.getItem("black") === "true") {
    colorMode.checked = true;
}

ChangeColor();

colorMode.onchange = ChangeColor;

// Create The Observer
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("showen");
            entry.target.classList.remove("hidden");
        }
    });
});

// Get All Sections with hidden class to add animation on scroll
let hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((ele) => observer.observe(ele));

// Get All Images In Project Section
let images = [...document.querySelectorAll(".project img")];
let imagesCount = images.length;

// Get next and prev buttons
let prev = document.querySelector(".project .prev");
let next = document.querySelector(".project .next");

// Add Count To Check The Image Index
let count = 0;

prev.onclick = prevImage;
next.onclick = nextImage;

// Get Bullets Ul
let bulletsUl = document.querySelector(".project ul.bullets");

// Add Li bullet to The bullets Ul
for (let i = 0; i < imagesCount; i++) {
    // Create The Li Element
    let li = document.createElement("li");

    // Add Index Attribute To the li
    li.setAttribute("data-index", i);

    // Add Class Active To The First Li
    if (i === 0) {
        li.classList.add("active");
    }

    // Add Bullet Class To All Li
    li.classList.add("bullet");

    // Add Li To Bullets Ul
    bulletsUl.appendChild(li);
}

let bulletsLi = [...document.querySelectorAll(".project ul.bullets li")];

// Add CLick Event For The Li
bulletsLi.forEach((bullet) => {
    bullet.onclick = function () {
        // Get The Index
        count = +this.getAttribute("data-index");

        changeImage();
    };
});

// Get The Images Slider
let slider = document.querySelector(".project .images");

// Varaibles For Track Touch
let startX,
    endX,
    dealtaX,
    threhold = 100;

// Add Touch Event For The Images Slider
slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
    dealtaX = startX - endX;
});

slider.addEventListener("touchend", (e) => {
    if (dealtaX > 0) {
        updateCountPlus();
        changeImage();
    } else if (dealtaX < 0) {
        updateCountMinus();
        changeImage();
    }
    dealtaX = null;
});

/* Start Function */
// Change Image If the next button cliked
function prevImage(e) {
    updateCountMinus();
    changeImage();
}
function nextImage() {
    updateCountPlus();
    changeImage();
}

// Change Image Function
function changeImage() {
    // Remove All Active Class
    removeActive();

    // Add Active Class To the Next/Prev Image
    images[count].classList.add("active");

    bulletsLi.forEach((bullet, index) => {
        if (index === count) {
            bullet.classList.add("active");
        }
    });
}

// Funcion To Add white-mode class to body
function ChangeColor() {
    if (colorMode.checked) {
        localStorage.setItem("black", "true");
        document.body.classList.remove("white-mode");
    } else {
        localStorage.setItem("black", "false");
        document.body.classList.add("white-mode");
    }
}

// Function To Remove All Active Class From The Images And Li
function removeActive() {
    images.forEach((img) => img.classList.remove("active"));

    bulletsLi.forEach((bullet) => bullet.classList.remove("active"));
}

// Sub 1 From Count Value
function updateCountMinus() {
    if (count > 0) {
        count--;
    } else if (count === 0) {
        count = imagesCount - 1;
    }
}

// Add 1 For Count Value
function updateCountPlus() {
    if (count < imagesCount - 1) {
        count++;
        changeImage();
    } else if (count === imagesCount - 1) {
        count = 0;
        changeImage();
    }
}
