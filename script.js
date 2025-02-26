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

    // Improved Cat Facts API with fallback and retries
    async function fetchCatFact() {
        const factElement = document.getElementById("fact");
        factElement.innerText = "Loading cat fact...";
        
        // Array of cat facts to use as fallback
        const fallbackFacts = [
            "Cats spend 70% of their lives sleeping.",
            "A group of cats is called a 'clowder'.",
            "Cats can make over 100 vocal sounds while dogs can only make about 10.",
            "A cat's purr vibrates at a frequency of 25 to 150 hertz, which can promote healing.",
            "Cats have five toes on their front paws but only four on their back paws.",
            "A cat can jump 5 times its height in a single bound.",
            "A cat's nose print is unique, like a human's fingerprint."
        ];
        
        try {
            // Try the main cat fact API
            const response = await Promise.race([
                fetch("https://catfact.ninja/fact"),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
            ]);
            
            const data = await response.json();
            
            if (data && data.fact) {
                factElement.innerText = data.fact;
                return;
            }
        } catch (error) {
            console.error('Primary API error:', error);
            
            try {
                // Try alternate cat API
                const backupResponse = await Promise.race([
                    fetch("https://meowfacts.herokuapp.com/"),
                    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
                ]);
                
                const backupData = await backupResponse.json();
                
                if (backupData && backupData.data && backupData.data[0]) {
                    factElement.innerText = backupData.data[0];
                    return;
                }
            } catch (backupError) {
                console.error('Backup API error:', backupError);
                // Continue to fallback
            }
        }
        
        // Use fallback if both APIs fail
        const randomFact = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
        factElement.innerText = randomFact;
    }

    // Call fetchCatFact when page loads
    fetchCatFact();

    // Extra Credit: Mouse Event Interactivity
    document.querySelector('.interactive-element').addEventListener('mousemove', (e) => {
        const { x, y } = e.currentTarget.getBoundingClientRect();
        const rotateX = (e.clientY - y - 150) / 10;
        const rotateY = (e.clientX - x - 150) / 10;
        
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
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
});
