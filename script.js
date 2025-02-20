document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("theme-toggle");

    // ✅ Check local storage for user's last theme preference
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    // ✅ Toggle Theme on Button Click
    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        // ✅ Save User Preference in Local Storage
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});
