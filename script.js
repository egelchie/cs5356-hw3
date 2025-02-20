document.addEventListener("DOMContentLoaded", function () {
    let profileImage = document.getElementById("profile-pic");

    if (profileImage) {
        profileImage.addEventListener("mouseover", function () {
            profileImage.style.transform = "scale(1.1) rotate(5deg) perspective(1px)";
            profileImage.style.transition = "transform 0.3s ease-in-out";
        });

        profileImage.addEventListener("mouseout", function () {
            profileImage.style.transform = "scale(1) rotate(0deg) perspective(1px)";
        });
    } else {
        console.error("Profile picture not found.");
    }

    // Mouse event interactivity for profile image
    let profileImage = document.querySelector("img");

    if (profileImage) {
        // Hover effect: scale up and rotate
        profileImage.addEventListener("mouseover", function () {
            profileImage.style.transform = "scale(1.1) rotate(5deg)";
            profileImage.style.transition = "transform 0.3s ease-in-out";
        });

        // Mouse leaves: reset to normal
        profileImage.addEventListener("mouseout", function () {
            profileImage.style.transform = "scale(1) rotate(0deg)";
        });
    }
});
