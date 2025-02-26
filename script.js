document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle (Persist Setting)
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

    // 3D tilt effect for dog pictures
    const dogPics = document.querySelectorAll("#gallery img");
    
    dogPics.forEach(pic => {
        pic.addEventListener("mousemove", (e) => {
            const rect = pic.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / 10) * -1;
            const rotateY = (x - centerX) / 10;
            
            pic.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        pic.addEventListener("mouseleave", () => {
            pic.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
            pic.style.transition = "transform 0.5s ease";
        });
    });

    // Bored API - Random Activity Suggestions
    async function fetchActivity() {
        const activityText = document.getElementById("activity-text");
        const activityType = document.getElementById("activity-type");
        const activityParticipants = document.getElementById("activity-participants");
        const activityPrice = document.getElementById("activity-price");
        
        activityText.innerText = "Finding something fun to do...";
        
        try {
            const response = await fetch("https://www.boredapi.com/api/activity");
            
            if (!response.ok) {
                throw new Error("Couldn't fetch an activity");
            }
            
            const data = await response.json();
            
            // Display the activity data
            activityText.innerText = data.activity;
            activityType.innerText = `Type: ${data.type.charAt(0).toUpperCase() + data.type.slice(1)}`;
            activityParticipants.innerText = `Participants: ${data.participants}`;
            
            // Convert price to stars (0-4)
            const priceStars = data.price === 0 ? "Free" : 
                              data.price < 0.3 ? "$" : 
                              data.price < 0.6 ? "$$" : 
                              data.price < 0.9 ? "$$$" : "$$$$";
            
            activityPrice.innerText = `Price: ${priceStars}`;
            
        } catch (error) {
            console.error("Error fetching activity:", error);
            activityText.innerText = "Try learning a new skill or calling an old friend!";
            activityType.innerText = "Type: Suggestion";
            activityParticipants.innerText = "Participants: 1+";
            activityPrice.innerText = "Price: Varies";
        }
    }
    
    // Fetch activity on page load
    fetchActivity();
    
    // Get new activity when button is clicked
    const newActivityBtn = document.getElementById("new-activity-btn");
    if (newActivityBtn) {
        newActivityBtn.addEventListener("click", fetchActivity);
    }
});
