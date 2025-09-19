

 
class ProductCarousel {
  constructor() {
    this.productRow = document.getElementById('productRow');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.products = this.productRow.querySelectorAll('.product-card');
    
    this.currentIndex = 0;
    this.itemsPerPage = this.getItemsPerPage();
    this.maxIndex = Math.max(0, this.products.length - this.itemsPerPage);
    
    this.init();
  }
  
  getItemsPerPage() {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 768) return 3;
    if (width >= 480) return 2;
    return 1;
  }
  
  init() {
    this.updateCarousel();
    this.updateButtons();
    
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.itemsPerPage = this.getItemsPerPage();
      this.maxIndex = Math.max(0, this.products.length - this.itemsPerPage);
      this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
      this.updateCarousel();
      this.updateButtons();
    });
    
    // Auto-play functionality
    this.startAutoPlay();
    
    // Pause auto-play on hover
    this.productRow.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.productRow.addEventListener('mouseleave', () => this.startAutoPlay());
  }
  
  updateCarousel() {
    const cardWidth = this.products[0].offsetWidth;
    const gap = 20;
    const translateX = -(this.currentIndex * (cardWidth + gap));
    this.productRow.style.transform = `translateX(${translateX}px)`;
  }
  
  updateButtons() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
  }
  
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
      this.updateButtons();
    }
  }
  
  next() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.updateCarousel();
      this.updateButtons();
    }
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      if (this.currentIndex >= this.maxIndex) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      this.updateCarousel();
      this.updateButtons();
    }, 3000);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProductCarousel();
});


    


document.addEventListener('DOMContentLoaded', function () {
  var heroEl = document.querySelector('#heroCarousel');
  if (!heroEl) return;

  // Explicitly initialize the carousel to ensure autoplay runs
  var carousel = new bootstrap.Carousel(heroEl, {
    interval: 5000,   // 5s
    ride: 'carousel', // start automatically
    pause: false,     // do NOT pause on hover
    wrap: true
  });

  // animation function: remove and re-add .animate to replay
  function animateSlide() {
    var activeContent = heroEl.querySelector('.carousel-item.active .hero-content');
    if (!activeContent) return;
    activeContent.classList.remove('animate');
    // force reflow so animation restarts
    void activeContent.offsetWidth;
    setTimeout(function () { activeContent.classList.add('animate'); }, 20);
  }

  // run on initial load
  animateSlide();

  // replay after each slide completes
  heroEl.addEventListener('slid.bs.carousel', animateSlide);

  // --- Edge case: if your carousel is inside a hidden tab/modal on load ---
  // call carousel.cycle() & animateSlide() once it becomes visible.
});


  const openBtn = document.getElementById("openPopup");
    const closeBtn = document.getElementById("closePopup");
    const popupOverlay = document.getElementById("popupOverlay");

    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      popupOverlay.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      popupOverlay.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.style.display = "none";
      }
    });