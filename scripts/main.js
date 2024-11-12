// Get nav-hamburger elemet & links list
let navBurger = document.querySelector(".header__nav-hamburger");
let linksList = document.querySelector(".header__nav__links");

// Add click event to the dom
document.addEventListener("click", (e) => {
    // Check if the linkList has active class and the clicked elmement isn't navBurger
    if (linksList.classList.contains("active") && e.target !== navBurger) {
        // remove active class
        linksList.classList.remove("active");

        navBurger.classList.remove("active");
    }
});
// Add click event to the hamburger element
navBurger.addEventListener("click", (e) => {
    // Stop propagation
    e.stopPropagation();
    // When it clicked toggle active class on it
    navBurger.classList.toggle("active");

    // When it clicked toggle active class on links list
    linksList.classList.toggle("active");
});

// Add scroll event to the widnow
window.addEventListener(
    "scroll",
    () => {
        // Check if the linkList has active class
        if (linksList.classList.contains("active")) {
            // remove active class
            linksList.classList.remove("active");

            navBurger.classList.remove("active");
        }
    },
    { passive: true }
);

const navLinks = document.querySelectorAll(".header__nav__link a");
const sections = document.querySelectorAll("section");

// Function to add the active class based on the section in view
function updateActiveLink() {
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 80;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            const id = section.getAttribute("id");
            if (id) {
                const activeLink = document.querySelector(`a[href="#${id}"]`);
                setActiveLink(activeLink.parentElement);
            }
        }
    });
}

// Function to set active class on clicked link
function setActiveLink(activeLink) {
    if (
        activeLink !== document.querySelector(".header__nav__link.active") &&
        activeLink !== null
    ) {
        navLinks.forEach((link) => {
            link.parentElement.classList.remove("active");
        });
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }
}

// Scroll event listener to update active link as user scrolls
window.addEventListener("scroll", updateActiveLink, { passive: true });

// Call on load to set active class if page is loaded in a scrolled state
updateActiveLink();

// Add Event click to the links in nav
navLinks.forEach((li) => {
    li.addEventListener("click", (e) => {
        // Get the element which gonna have the active class
        let { parentElement: link } = e.target;

        // remove active class form links
        navLinks.forEach((link) => {
            link.parentElement.classList.remove("active");
        });

        // add active class to selected element
        link.classList.add("active");
    });
});
// Script for owl carousel library
$(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    margin: 0,
    stagePadding: false,
});

// Get The checkbox of theme toggle
let theme = document.querySelector("label.theme-toggle input");

// Add change Event to the checkbox
theme.addEventListener("change", () => {
    // check if checkbox is checked
    if (theme.checked) {
        // add dark-mode class to the body
        document.body.classList.add("dark-mode");

        // make the theme = dark in local storage
        window.localStorage.setItem("theme", "dark");
    } else {
        // If it's not checked then remove the dark-mode class
        document.body.classList.remove("dark-mode");

        // make the theme = light in local storage
        window.localStorage.setItem("theme", "light");
    }
});

// check local storage for theme
if (localStorage.getItem("theme") === "dark") {
    // add dark-mode class to the body
    document.body.classList.add("dark-mode");

    // toggle the checkbox to be checked
    theme.checked = true;
}
