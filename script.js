document.addEventListener("DOMContentLoaded", function () {
    // ✅ Dark Mode Toggle (Persist Setting)
    const themeToggle = document.getElementById("theme-toggle");
    const isDarkMode = localStorage.getItem("dark-mode") === "true";

    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", themeToggle.checked);
    });

    // ✅ Fetch Random Cat Fact
    async function fetchCatFact() {
        try {
            const response = await fetch("https://catfact.ninja/fact");
            const data = await response.json();
            document.getElementById("fact").innerText = data.fact;
        } catch (error) {
            document.getElementById("fact").innerText = "Failed to load cat fact.";
        }
    }

    fetchCatFact();

    // ✅ Extra Credit: Mouse Event Interactivity
    document.querySelector('.interactive-element').addEventListener('mousemove', (e) => {
        const { x, y } = e.currentTarget.getBoundingClientRect();
        const rotateX = (e.clientY - y - 150) / 10;
        const rotateY = (e.clientX - x - 150) / 10;
        
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});
