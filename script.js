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

    // Cat Facts API with improved error handling
    console.log("Starting cat fact fetch...");
    
    async function fetchCatFact() {
        const factElement = document.getElementById('fact');
        
        if (!factElement) {
            console.error("Cat fact element not found in DOM");
            return;
        }
        
        factElement.innerText = "Loading...";
        
        try {
            console.log("Fetching cat fact from API...");
            let response;
            let data;
            let success = false;
            
            // Try primary API first
            try {
                response = await fetch('https://catfact.ninja/fact');
                console.log("Primary Cat API Response:", response);
                
                if (response.ok) {
                    data = await response.json();
                    if (data && data.fact) {
                        success = true;
                    }
                }
            } catch (primaryApiError) {
                console.error("Primary Cat API failed:", primaryApiError);
                // Will try fallback API
            }
            
            // If primary API failed, try fallback API
            if (!success) {
                console.log("Trying fallback Cat API...");
                response = await fetch('https://meowfacts.herokuapp.com/');
                console.log("Fallback Cat API Response:", response);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                data = await response.json();
                
                if (data && data.data && data.data.length > 0) {
                    factElement.innerText = data.data[0];
                    return;
                }
            } else {
                // Primary API succeeded
                factElement.innerText = data.fact;
                return;
            }
            
            // If we get here, both APIs failed
            throw new Error("Both cat fact APIs failed");
            
        } catch (error) {
            console.error("Error fetching cat fact:", error);
            factElement.innerText = "Cats have five toes on their front paws but only four toes on their back paws.";
        }
    }
    
    // Fetch cat fact on page load
    fetchCatFact();
    
    // Handle refresh button for cat facts
    const catFactRefreshBtn = document.getElementById('cat-fact-refresh');
    if (catFactRefreshBtn) {
        catFactRefreshBtn.addEventListener('click', fetchCatFact);
    } else {
        console.warn("Cat fact refresh button not found in DOM");
    }

    // Quotable API - Random Quotes
    async function fetchQuote() {
        const quoteText = document.getElementById("quote-text");
        const quoteAuthor = document.getElementById("quote-author");
        
        if (!quoteText || !quoteAuthor) {
            console.error("Quote elements not found in DOM");
            return;
        }
        
        quoteText.innerText = "Loading...";
        quoteAuthor.innerText = "—";
        
        try {
            console.log("Fetching quote from primary API...");
            let response;
            let data;
            let success = false;
            
            // Try primary API first
            try {
                response = await fetch("https://api.quotable.io/random");
                console.log("Primary Quote API Response:", response);
                
                if (response.ok) {
                    data = await response.json();
                    if (data && data.content && data.author) {
                        quoteText.innerText = `"${data.content}"`;
                        quoteAuthor.innerText = `— ${data.author}`;
                        success = true;
                    }
                }
            } catch (primaryApiError) {
                console.error("Primary Quote API failed:", primaryApiError);
                // Will try fallback API
            }
            
            // If primary API failed, try fallback API
            if (!success) {
                console.log("Trying fallback Quote API...");
                response = await fetch("https://type.fit/api/quotes");
                console.log("Fallback Quote API Response:", response);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                data = await response.json();
                
                if (data && data.length > 0) {
                    // Get a random quote from the array
                    const randomQuote = data[Math.floor(Math.random() * data.length)];
                    quoteText.innerText = `"${randomQuote.text}"`;
                    quoteAuthor.innerText = `— ${randomQuote.author || "Unknown"}`;
                    return;
                }
            }
            
            // If we get here, both APIs failed or returned invalid data
            if (!success) {
                throw new Error("Both quote APIs failed");
            }
        } catch (error) {
            console.error("Error fetching quote:", error);
            // Fallback quotes
            const fallbackQuotes = [
                { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
                { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
                { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" }
            ];
            const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
            quoteText.innerText = `"${randomFallback.text}"`;
            quoteAuthor.innerText = `— ${randomFallback.author}`;
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
