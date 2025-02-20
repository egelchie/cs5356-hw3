document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("theme-toggle");
    const body = document.body;

    // ✅ Load stored theme preference
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        toggleSwitch.checked = true;
    }

    // ✅ Toggle Dark Mode on Click
    toggleSwitch.addEventListener("change", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // ✅ Fetch Random Cat Fact (API Call)
    fetch('https://catfact.ninja/fact')
        .then(response => response.json())
        .then(data => {
            document.getElementById('fact').innerText = data.fact;
        })
        .catch(error => {
            document.getElementById('fact').innerText = "Failed to load fact.";
        });
});
