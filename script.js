document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("theme-toggle");

    // ✅ Check local storage for user preference
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleSwitch.checked = true;
    }

    // ✅ Toggle Dark Mode on Click
    toggleSwitch.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode");

        // ✅ Save User Preference
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // ✅ Fetch Random Cat Fact
    fetch('https://catfact.ninja/fact')
        .then(response => response.json())
        .then(data => {
            document.getElementById('fact').innerText = data.fact;
        })
        .catch(error => {
            document.getElementById('fact').innerText = "Failed to load fact.";
        });
});
