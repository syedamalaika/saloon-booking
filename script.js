document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Services Data
    const services = [
        {
            name: 'Hair Styling & Cut',
            price: '$85+',
            image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop',
            desc: 'Expert cutting and styling tailored to your unique features.'
        },
        {
            name: 'Bridal Makeup',
            price: '$150+',
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1771&auto=format&fit=crop',
            desc: 'Look stunning on your special day with our professional makeup artists.'
        },
        {
            name: 'Skin Rejuvenation',
            price: '$120+',
            image: 'https://images.unsplash.com/photo-1570172619380-2126436bd302?q=80&w=2070&auto=format&fit=crop',
            desc: 'Luxury facial treatments to bring out your natural glow.'
        }
    ];

    // 3. Render Services
    const renderServices = () => {
        const container = document.getElementById('services-container');
        if (!container) return;

        container.innerHTML = services.map(s => `
            <div class="col-lg-4">
                <div class="service-card">
                    <div class="service-img-wrapper">
                        <img src="${s.image}" alt="${s.name}">
                    </div>
                    <div class="service-info text-start">
                        <p class="text-primary fw-bold mb-1">${s.price}</p>
                        <h4 class="mb-2">${s.name}</h4>
                        <p class="small opacity-75 mb-0">${s.desc}</p>
                    </div>
                </div>
            </div>
        `).join('');
    };
    renderServices();

    // 4. Time Slot Selection
    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
        '05:00 PM', '06:00 PM', '07:00 PM'
    ];

    const slotContainer = document.getElementById('timeSlots');
    if (slotContainer) {
        slotContainer.innerHTML = timeSlots.map(time => `
            <div class="col-4 col-md-3">
                <div class="time-slot" data-time="${time}">${time}</div>
            </div>
        `).join('');

        const slots = document.querySelectorAll('.time-slot');
        slots.forEach(slot => {
            slot.addEventListener('click', () => {
                slots.forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
            });
        });
    }

    // 5. Booking Form Handling
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const selectedSlot = document.querySelector('.time-slot.selected');
            if (!selectedSlot) {
                alert('Please select a time slot for your appointment.');
                return;
            }

            const button = bookingForm.querySelector('button');
            const originalText = button.innerHTML;

            button.disabled = true;
            button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';

            setTimeout(() => {
                button.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Appointment Booked!';
                button.classList.replace('btn-luxury', 'btn-success');

                // Reset after 3 seconds
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = originalText;
                    button.classList.replace('btn-success', 'btn-luxury');
                    bookingForm.reset();
                    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                }, 3000);
            }, 1500);
        });
    }

    // 6. Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });

                // Close mobile navbar if open
                const navCollapse = document.getElementById('navbarNav');
                if (navCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

});
