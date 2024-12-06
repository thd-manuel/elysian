function myFunction() {
	document.getElementById("demo").innerHTML = "Paragraph changed.";
}

<!-- Navigation zum hoch runter scrollen -->
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav-item[data-target]").forEach(item => {
        item.addEventListener("click", () => {
            const targetId = item.getAttribute("data-target");
            const targetElement = targetId === "Anfang" ? null : document.getElementById(targetId);

            if (targetId === "Anfang") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
