document.addEventListener("DOMContentLoaded", function () {
    // ✅ Fix Rotation Effect
    let profileImage = document.getElementById("profile-pic");

    if (profileImage) {
        profileImage.addEventListener("mouseover", function () {
            profileImage.style.transform = "scale(1.1) rotate(5deg)";
            profileImage.style.transition = "transform 0.3s ease-in-out";
        });

        profileImage.addEventListener("mouseout", function () {
            profileImage.style.transform = "scale(1) rotate(0deg)";
        });
    } else {
        console.error("Profile picture not found.");
    }

    // ✅ Fix Cat API Fetching
    fetch('https://catfact.ninja/fact')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('fact').innerText = data.fact;
        })
        .catch(error => {
            console.error('Error fetching cat fact:', error);
            document.getElementById('fact').innerText = "Failed to load fact. Try again later.";
        });
});
