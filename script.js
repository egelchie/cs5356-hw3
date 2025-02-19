document.addEventListener("DOMContentLoaded", function () {
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
