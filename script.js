// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Reset scroll to top on refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            navbar.style.top = '0';
            navbar.style.width = '100.5%';
            navbar.style.borderRadius = '0';
            navbar.style.borderLeft = 'none';
            navbar.style.borderRight = 'none';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
            navbar.style.top = '1.5rem';
            navbar.style.width = '90%';
            navbar.style.borderRadius = '16px';
            navbar.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Scroll Progress & Back to Top Logic
window.addEventListener('scroll', () => {
    const scrollBar = document.getElementById('scrollBar');
    const backToTop = document.getElementById('backToTop');
    
    // Calculate scroll percentage
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Update progress bar
    if (scrollBar) {
        scrollBar.style.width = scrolled + "%";
    }
    
    // Toggle Back to Top button
    if (backToTop) {
        if (winScroll > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
});

// Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Add active state to nav links on scroll
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Hover effect for certification cards (tilt effect simulation)
    const cards = document.querySelectorAll('.cert-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) translateY(0) rotateX(0) rotateY(0)`;
        });
    });
});

// Catalog Modal Logic
function openCatalog() {
    const modal = document.getElementById('catalogModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeCatalog() {
    const modal = document.getElementById('catalogModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('catalogModal');
    if (event.target == modal) {
        closeCatalog();
    }
}

function filterCatalog(category) {
    const items = document.querySelectorAll('.catalog-item');
    const tabs = document.querySelectorAll('.tab-btn');
    
    // Update tabs
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if(tab.innerText.toLowerCase() === category || (category === 'all' && tab.innerText === 'All')) {
            tab.classList.add('active');
        }
    });

    // Filter items
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-cat') === category) {
            item.style.display = 'block';
            item.style.animation = 'none';
            void item.offsetWidth; // Trigger reflow
            item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
}
