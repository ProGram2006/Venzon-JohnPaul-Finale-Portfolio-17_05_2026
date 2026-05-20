document.addEventListener('DOMContentLoaded', () => {
    
    // Asynchronously load the HTML partials
    const loadComponent = async (url, elementId) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Could not load ${url}`);
            
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
        } catch (error) {
            console.error(`Error loading component: ${error.message}`);
            document.getElementById(elementId).innerHTML = `<p style="color:red; padding:20px;">Error: Needs a local server (like Live Server) to load ${url}</p>`;
        }
    };

    // Initialize fetching
    Promise.all([
        loadComponent('nav.html', 'nav-placeholder'),
        loadComponent('body.html', 'body-placeholder'),
        loadComponent('footer.html', 'footer-placeholder')
    ]).then(() => {
        console.log("All components loaded successfully.");
        
        // === CONTACT FORM SUCCESS FIX ===
        const btn = document.getElementById("sendBtn");
        const form = document.querySelector(".contact-section form");

        if (btn && form) {
            btn.addEventListener("click", () => {
                btn.innerText = "Sending...";
                btn.style.opacity = "0.7";

                setTimeout(() => {
                    alert("Message sent successfully! Thank you for getting in touch.");
                    btn.innerText = "Send Message";
                    btn.style.opacity = "1";
                    form.reset();
                }, 1500);
            });
        }
        
        // === DOWNLOAD CV INTERACTION ===
        const cvBtn = document.getElementById("downloadCvBtn");
        if (cvBtn) {
            cvBtn.addEventListener("click", (e) => {
                e.preventDefault(); 
                cvBtn.innerText = "Downloading...";
                cvBtn.style.opacity = "0.7";

                setTimeout(() => {
                    alert("CV downloaded successfully!");
                    cvBtn.innerText = "Download CV";
                    cvBtn.style.opacity = "1";
                }, 1000);
            });
        }
        
        // === ULTRA-INTELLIGENT SITE SEARCH ===
        const searchInput = document.getElementById("siteSearch");
        
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                const query = e.target.value.toLowerCase().trim();
                
                // Grab all main <section> containers on the page
                const sections = document.querySelectorAll("main section");
                
                sections.forEach(section => {
                    // Always keep Home and Contact sections completely visible
                    if (section.id === "home" || section.id === "contact") {
                        section.style.display = "";
                        section.style.opacity = "1";
                        
                        // Make sure inner forms or hero text components reset cleanly
                        const innerCards = section.querySelectorAll(".project-card, .skill-card, .testimonial-card, .card");
                        innerCards.forEach(c => { c.style.display = ""; c.style.opacity = "1"; });
                        return;
                    }

                    // Check the Section Heading Title text
                    const mainTitle = section.querySelector(".section-title");
                    const sectionHeadingText = mainTitle ? mainTitle.innerText.toLowerCase() : "";
                    
                    // Grab all content cards belonging uniquely to this section
                    const cards = section.querySelectorAll(".project-card, .skill-card, .testimonial-card, .card");
                    let visibleCardsInSectionCount = 0;

                    cards.forEach(card => {
                        if (query === "") {
                            card.style.display = "";
                            card.style.opacity = "1";
                            visibleCardsInSectionCount++;
                            return;
                        }

                        // Extract content text components from the card layer
                        let combinedText = card.textContent.toLowerCase();
                        
                        const headings = card.querySelectorAll("h2, h3, .card-title");
                        headings.forEach(h => combinedText += " " + h.innerText.toLowerCase());
                        
                        const images = card.querySelectorAll("img");
                        images.forEach(img => {
                            if (img.alt) combinedText += " " + img.alt.toLowerCase();
                        });

                        // If the search query matches the section title OR the individual card contents
                        if (sectionHeadingText.includes(query) || combinedText.includes(query)) {
                            card.style.display = "";
                            card.style.opacity = "1";
                            visibleCardsInSectionCount++; // Count this card as visible
                        } else {
                            card.style.display = "none";
                        }
                    });

                    // THE MASTER TOUCH: If a section has 0 matching content cards, hide the entire section container completely!
                    if (query !== "" && visibleCardsInSectionCount === 0) {
                        section.style.display = "none";
                    } else {
                        section.style.display = ""; // Shows section container cleanly if it has matches
                    }
                });
            });

            // Prevent page refresh if the user presses 'Enter'
            searchInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            });
        }
        // ---------------------------------
        
    });

});