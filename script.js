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

        // ✅ Save User Preference in Local Storage
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});
