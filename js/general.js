document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(function(item) {
        item.addEventListener("click", function(e) {
            e.preventDefault();

            const targetId = item.getAttribute("data-target");
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const menuOverlay = document.getElementById("menu-overlay");
    const closeMenu = document.getElementById("close-menu");

    hamburger.addEventListener("click", function() {
        menu.classList.add("active");
        menuOverlay.classList.add("active");
    });

    closeMenu.addEventListener("click", function() {
        menu.classList.remove("active");
        menuOverlay.classList.remove("active");
    });

    menuOverlay.addEventListener("click", function() {
        menu.classList.remove("active");
        menuOverlay.classList.remove("active");
    });

    navItems.forEach(function(item) {
        item.addEventListener("click", function() {
            menu.classList.remove("active");
            menuOverlay.classList.remove("active");
        });
    });

    const nav = document.getElementById("topnav");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });
    
    const nav1 = document.getElementById("groß");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            nav1.classList.add("scrolled");
        } else {
            nav1.classList.remove("scrolled");
        }
    });

    const nav2 = document.getElementById("klein");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            nav2.classList.add("scrolled");
        } else {
            nav2.classList.remove("scrolled");
        }
    });
});




function reserve(){
    document.getElementbyClassName("reservationsTwo").style.display = "block";
}
