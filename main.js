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

// Change Image If the next button cliked
function prevImage() {
    if (count > 0) {
        count--;
        changeImage();
    }
}
function nextImage() {
    if (count < imagesCount - 1) {
        count++;
        changeImage();
    }
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
