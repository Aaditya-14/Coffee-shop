document.addEventListener('DOMContentLoaded', () => {

    // Hamburger Menu for Mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Sticky Navbar on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Fade-in animation on scroll
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start animation a bit sooner
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // Simple contact form submission alert
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Gallery Lightbox
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const closeBtn = document.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightbox.style.display = 'block';
                lightboxImg.src = item.src;
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
        }

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Cart functionality removed

    // --- Buy & Rate handlers for menu items ---
    function createToast(text) {
        const t = document.createElement('div');
        t.className = 'toast';
        t.textContent = text;
        document.body.appendChild(t);
        setTimeout(() => t.classList.add('visible'), 10);
        setTimeout(() => t.classList.remove('visible'), 2000);
        setTimeout(() => document.body.removeChild(t), 2400);
    }

    // Rating modal (simple)
    function openRatingModal(itemName, onRate) {
        const modal = document.createElement('div');
        modal.className = 'rating-modal';
        modal.innerHTML = `
            <div class="rating-box">
                <h3>Rate ${itemName}</h3>
                <div class="stars">
                    <button data-value="1">★</button>
                    <button data-value="2">★</button>
                    <button data-value="3">★</button>
                    <button data-value="4">★</button>
                    <button data-value="5">★</button>
                </div>
                <div style="margin-top:1rem; text-align:right;"><button class="btn btn-secondary close-rate">Cancel</button></div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelectorAll('.stars button').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.getAttribute('data-value');
                onRate(parseInt(val, 10));
                document.body.removeChild(modal);
            });
        });

        modal.querySelector('.close-rate').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    document.querySelectorAll('.menu-item').forEach(item => {
        const name = item.querySelector('h3') ? item.querySelector('h3').textContent : 'Item';
        const buyBtn = item.querySelector('.buy-btn');
        const rateBtn = item.querySelector('.rate-btn');

        if (buyBtn) {
            buyBtn.addEventListener('click', () => {
                createToast(`Added ${name} to your order (demo)`);
            });
        }

        if (rateBtn) {
            rateBtn.addEventListener('click', () => {
                openRatingModal(name, (rating) => {
                    createToast(`You rated ${name} ${rating}★`);
                    // store locally (demo)
                    const key = `rating_${name.replace(/\s+/g,'_')}`;
                    localStorage.setItem(key, String(rating));
                });
            });
        }
    });

    // minimal styles for toast and modal
    const style = document.createElement('style');
    style.textContent = `
    .toast{position:fixed;right:20px;bottom:20px;background:#333;color:#fff;padding:0.6rem 1rem;border-radius:6px;opacity:0;transform:translateY(10px);transition:opacity .2s,transform .2s;z-index:2000}
    .toast.visible{opacity:1;transform:translateY(0)}
    .rating-modal{position:fixed;left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);z-index:2000}
    .rating-box{background:#fff;padding:1.5rem;border-radius:8px;max-width:320px;width:90%;text-align:center}
    .rating-box .stars button{font-size:1.6rem;background:none;border:none;cursor:pointer;color:#ccc;margin:0 4px}
    .rating-box .stars button:hover{color:#f5a623}
    `;
    document.head.appendChild(style);
});