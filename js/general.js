document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");
    const offset = 50;

    navItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = item.getAttribute("data-target");
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: "smooth"
                });
            }
            closeMenu();
        });
    });

    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const menuOverlay = document.getElementById("menu-overlay");
    const closeMenuButton = document.getElementById("close-menu");

    const openMenu = () => {
        menu.classList.add("active");
        menuOverlay.classList.add("active");
    };

    const closeMenu = () => {
        menu.classList.remove("active");
        menuOverlay.classList.remove("active");
    };

    hamburger?.addEventListener("click", openMenu);
    closeMenuButton?.addEventListener("click", closeMenu);
    menuOverlay?.addEventListener("click", closeMenu);

    const adjustNavOnScroll = () => {
        const navElements = document.querySelectorAll("#topnav, #groß, #klein");
        navElements.forEach(nav => {
            if (window.scrollY > 50) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        });
    };

    window.addEventListener("scroll", adjustNavOnScroll);
});



/*Hannah
start reservation process by clicking on button*/
document.getElementById("reserveButton").addEventListener("click", wechseln);
function wechseln(){
	document.getElementById("reservationStart").style.display = "none";
	document.getElementById("reservationsDataCustomer").style.display = "block";
}


/* Manuel
send Reservation*/
document.getElementById("reservationForm").addEventListener("submit", sendSwitch);
function sendSwitch(){
	event.preventDefault();
	document.getElementById("reservationDataCustomer").style.display = "none";
	document.getElementById("successfulReservation").style.display = "block";
}
