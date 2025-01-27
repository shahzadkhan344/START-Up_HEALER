// navbar>>>>>>>>>>>>>>>>>
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});




$(document).ready(function () {
    // Initialize Owl Carousel
    $('.reviews-carousel').owlCarousel({
        items: 3, // Number of slides visible at once
        loop: true, // Infinite loop
        dots: true, // Enable pagination dots
        nav: false, // No navigation arrows
        autoplay: false, // Disable autoplay
        margin: 0, // Spacing between items
        responsive: {
            0: {
                items: 1, // 1 slide visible on small screens
            },
            600: {
                items: 2, // 2 slides visible on medium screens
            },
            1000: {
                items: 3, // 3 slides visible on large screens
            },
        },
        onChanged: updateActiveDot, // Custom function for updating active dot
    });

    // Function to update active dot
    function updateActiveDot(event) {
        const currentIndex = event.page.index; // Get current slide page index
        $('.owl-dot').removeClass('active'); // Remove 'active' from all dots
        $('.owl-dot').eq(currentIndex).addClass('active'); // Add 'active' to the current dot
    }

    // Add click event listener for dots
    $('.owl-dot').on('click', function () {
        const dotIndex = $(this).index(); // Get index of clicked dot
        $('.reviews-carousel').trigger('to.owl.carousel', [dotIndex * 3, 300]); // Navigate to the corresponding slide group
    });
});





// Toggle the navbar visibility on mobile
document.getElementById('navbar-toggle').addEventListener('click', function() {
    const navbarItems = document.querySelector('.navbar-items');
    navbarItems.classList.toggle('show');
});




const Slides = document.querySelector('.carousel-slides');
const indicators = document.querySelectorAll('.carousel-slides-indicators span');
const totalSlides = Slides.children.length; 
let CurrentIndex = 0; 

function getVisibleSlides() {
    return window.innerWidth <= 768 ? 1 : 4;
}

function setupInfiniteLoop() {
    const visibleSlides = getVisibleSlides();
    for (let i = 0; i < visibleSlides; i++) {
        Slides.appendChild(Slides.children[i].cloneNode(true));
    }
}

function updateIndicators() {
    const visibleSlides = getVisibleSlides();
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === Math.floor(CurrentIndex / visibleSlides) % indicators.length);
    });
}

function scrollToSlide(index) {
    const slideWidth = Slides.children[0].offsetWidth + 10; 
    Slides.style.transition = 'transform 0.5s ease-in-out';
    Slides.style.transform = `translateX(-${index * slideWidth}px)`;
    updateIndicators();
}

function resetPosition() {
    const visibleSlides = getVisibleSlides();
    if (CurrentIndex >= totalSlides) {
        CurrentIndex = 0;
        Slides.style.transition = 'none'; 
        const slideWidth = Slides.children[0].offsetWidth + 10;
        Slides.style.transform = `translateX(-${CurrentIndex * slideWidth}px)`;
    }
}

function autoScroll() {
    CurrentIndex++;
    scrollToSlide(CurrentIndex);
    setTimeout(resetPosition, 500); 
}

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        CurrentIndex = index * getVisibleSlides(); 
        scrollToSlide(CurrentIndex);
    });
});

setupInfiniteLoop();

setInterval(autoScroll, 2500);

window.addEventListener('resize', () => {
    scrollToSlide(CurrentIndex);
});
