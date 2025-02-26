document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("theme-toggle");
    const body = document.body;

    // ✅ Fix Safari: Check localStorage OR system preference
    if (localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
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

    // Environmental Facts API Integration
    async function fetchEnvironmentalFact() {
        const factElement = document.getElementById('fact');
        factElement.innerText = "Loading...";
        try {
            const response = await fetch('https://api.api-ninjas.com/v1/facts?category=environment', {
                headers: {
                    'X-Api-Key': 'XDnNM9iCgVEFlg93XiG4Qg==OgCW0zFLcCbUD0fJ' 
                }
            });
            
            if (!response.ok) throw new Error('API request failed');
            
            const data = await response.json();
            if (data && data.length > 0) {
                factElement.innerText = data[0].fact;
            } else {
                throw new Error('No fact received');
            }
        } catch (error) {
            factElement.innerText = "Failed to load environmental fact. Please try again later.";
            console.error('Error:', error);
        }
    }
    
    // ✅ Extra Credit: Mouse Event Interactivity
    document.querySelector('.interactive-element').addEventListener('mousemove', (e) => {
        const { x, y } = e.currentTarget.getBoundingClientRect();
        const rotateX = (e.clientY - y - 150) / 10;
        const rotateY = (e.clientX - x - 150) / 10;
        
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Initialize
    fetchEnvironmentalFact();
});
