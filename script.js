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

    // Cat Facts API
    async function fetchCatFact() {
        const factElement = document.getElementById("fact");
        factElement.innerText = "Loading...";
        
        try {
            const response = await fetch("https://catfact.ninja/fact");
            if (!response.ok) throw new Error('Failed to fetch cat fact');
            
            const data = await response.json();
            if (data && data.fact) {
                factElement.innerText = data.fact;
            } else {
                throw new Error('No fact received');
            }
        } catch (error) {
            console.error('Error:', error);
            factElement.innerText = "Did you know? Cats spend 70% of their lives sleeping!";
        }
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
