//Sophie

document.addEventListener("DOMContentLoaded", function () {
    // Selects navigation items and defines an offset for smooth scrolling behavior
    const navItems = document.querySelectorAll(".nav-item");
    const offset = 50;

    // Adds click event listeners to navigation items for smooth scrolling and menu closure
    navItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = item.getAttribute("data-target");
            const targetElement = document.getElementById(targetId);

            // Scrolls smoothly to the target element with a specified offset
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: "smooth"
                });
            }
            closeMenu(); // Closes the navigation menu
        });
    });

    // References to elements involved in opening and closing the menu
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const menuOverlay = document.getElementById("menu-overlay");
    const closeMenuButton = document.getElementById("close-menu");

    // Function to open the menu by adding active classes
    const openMenu = () => {
        menu.classList.add("active");
        menuOverlay.classList.add("active");
    };

    // Function to close the menu by removing active classes
    const closeMenu = () => {
        menu.classList.remove("active");
        menuOverlay.classList.remove("active");
    };

    // Attaches event listeners to handle menu open/close interactions
    hamburger?.addEventListener("click", openMenu);
    closeMenuButton?.addEventListener("click", closeMenu);
    menuOverlay?.addEventListener("click", closeMenu);

    // Adjusts navigation bar style based on scroll position
    const adjustNavOnScroll = () => {
        const navElements = document.querySelectorAll("#topnav, #big, #small");
        navElements.forEach(nav => {
            if (window.scrollY > 50) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        });
    };

    // Adds a scroll event listener to dynamically adjust navigation styles
    window.addEventListener("scroll", adjustNavOnScroll);
});



/*Hannah
start reservation process by clicking on button*/
document.getElementById("reserveButton").addEventListener("click", wechseln);
function wechseln(){
	document.getElementById("reservationStart").style.display = "none";
	document.getElementById("reservationDataCustomer").style.display = "block";
}


/* Manuel
send Reservation*/
document.getElementById("reservationForm").addEventListener("submit", sendSwitch);
function sendSwitch(){
	event.preventDefault();
	document.getElementById("reservationDataCustomer").style.display = "none";
	document.getElementById("successfulReservation").style.display = "block";
}
