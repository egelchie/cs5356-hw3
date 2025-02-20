document.addEventListener("DOMContentLoaded", function () {
    // Fetch random cat fact
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
