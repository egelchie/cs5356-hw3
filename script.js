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

    // Debug: Check if element exists
    const factElement = document.getElementById('fact');
    console.log('Fact element:', factElement);

    // Simple Cat Facts API implementation with debugging
    console.log('Starting cat fact fetch...');
    fetch('https://catfact.ninja/fact')
        .then(response => {
            console.log('API Response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Cat fact data:', data);
            if (factElement) {
                factElement.innerText = data.fact;
            } else {
                console.error('Fact element not found in DOM');
            }
        })
        .catch(error => {
            console.error('Error fetching cat fact:', error);
            if (factElement) {
                factElement.innerText = "Failed to load fact. Try again later.";
            }
        });

    // Quotable API - Random Quotes
    async function fetchQuote() {
        const quoteText = document.getElementById("quote-text");
        const quoteAuthor = document.getElementById("quote-author");
        
        quoteText.innerText = "Loading...";
        quoteAuthor.innerText = "—";
        
        try {
            const response = await fetch("https://api.quotable.io/random");
            
            if (!response.ok) {
                throw new Error("Couldn't fetch a quote");
            }
            
            const data = await response.json();
            
            // Display the quote
            quoteText.innerText = `"${data.content}"`;
            quoteAuthor.innerText = `— ${data.author}`;
            
        } catch (error) {
            console.error("Error fetching quote:", error);
            quoteText.innerText = ""The future belongs to those who believe in the beauty of their dreams."";
            quoteAuthor.innerText = "— Eleanor Roosevelt";
        }
    }
    
    // Fetch quote on page load
    fetchQuote();
    
    // Get new quote when button is clicked
    const newQuoteBtn = document.getElementById("new-quote-btn");
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener("click", fetchQuote);
    }
});
