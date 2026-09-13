/* ==========================================================================
   HSA & SONS - DOORS & WOOD SPECIALISTS
   Main JavaScript File: main.js
   Web Technologies - Assignment 01
   ========================================================================== */

// Wait for the HTML document to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------------
     1. Mobile Hamburger Menu Toggle
     Purpose: Toggles the mobile navigation menu when the user clicks
     the hamburger icon on smaller screens (tablets & phones).
     ------------------------------------------------------------------------ */
  var hamburger = document.getElementById('hamburgerBtn');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      // Toggle 'show' class on the menu list to slide/display it
      navLinks.classList.toggle('show');
      // Toggle 'active' class on hamburger icon for cross animation
      hamburger.classList.toggle('active');
    });

    // Close menu when any navigation link inside it is clicked
    var links = navLinks.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. Hero Image Slider / Carousel (Used on index.html)
     Purpose: Cycles through featured door banners automatically and allows
     manual control via Next/Prev buttons and clickable indicator dots.
     ------------------------------------------------------------------------ */
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.slider-dot');
  var prevBtn = document.getElementById('prevSlide');
  var nextBtn = document.getElementById('nextSlide');
  var currentSlide = 0;
  var slideInterval;

  if (slides.length > 0) {
    // Function to activate a specific slide by its index number
    function showSlide(index) {
      // Wrap around if index goes out of bounds
      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      }

      // Remove 'active' class from all slides and dots
      slides.forEach(function (slide) {
        slide.classList.remove('active');
      });
      dots.forEach(function (dot) {
        dot.classList.remove('active');
      });

      // Add 'active' class to current slide and corresponding dot
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
      }
    }

    // Go to next slide
    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    // Go to previous slide
    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    // Event listeners for Previous and Next buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        resetAutoPlay();
      });
    }

    // Event listeners for dots
    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        showSlide(index);
        resetAutoPlay();
      });
    });

    // Auto-advance slides every 5 seconds
    function startAutoPlay() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
      clearInterval(slideInterval);
      startAutoPlay();
    }

    // Initialize slider
    showSlide(0);
    startAutoPlay();
  }

  /* ------------------------------------------------------------------------
     3. Category Filter Tabs (Used on products.html & gallery.html)
     Purpose: Dynamically filters door cards based on selected category
     (e.g., 'all', 'solid-wood', 'ply-doors', 'pvc-fiber') without page refresh.
     ------------------------------------------------------------------------ */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var filterItems = document.querySelectorAll('.filter-item');

  if (filterButtons.length > 0 && filterItems.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Remove active class from all filter buttons
        filterButtons.forEach(function (btn) {
          btn.classList.remove('active');
        });

        // Add active class to the clicked button
        this.classList.add('active');

        // Get the target filter category from data-filter attribute
        var filterValue = this.getAttribute('data-filter');

        // Loop through each product/gallery card
        filterItems.forEach(function (item) {
          var itemCategory = item.getAttribute('data-category');

          if (filterValue === 'all' || itemCategory === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. Interactive Modal Lightbox (Used on gallery.html & products.html)
     Purpose: Opens a modal pop-up displaying a larger view of the door,
     along with detailed specifications when the user clicks 'View Details'.
     ------------------------------------------------------------------------ */
  var modal = document.getElementById('doorModal');
  var modalCloseBtn = document.getElementById('modalCloseBtn');
  var viewDetailBtns = document.querySelectorAll('.btn-view-detail');

  if (modal && viewDetailBtns.length > 0) {
    var modalImg = document.getElementById('modalImage');
    var modalTitle = document.getElementById('modalTitle');
    var modalDesc = document.getElementById('modalDescription');
    var modalWoodType = document.getElementById('modalWoodType');
    var modalUsage = document.getElementById('modalUsage');

    viewDetailBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();

        // Retrieve data attributes attached to the clicked button
        var title = this.getAttribute('data-title') || 'Custom Door';
        var imgSrc = this.getAttribute('data-img') || '';
        var desc = this.getAttribute('data-desc') || 'Premium wood door crafted with seasoned timber.';
        var wood = this.getAttribute('data-wood') || 'Solid Timber';
        var usage = this.getAttribute('data-usage') || 'Interior / Main Entrance';

        // Update modal content
        if (modalImg) modalImg.src = imgSrc;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalWoodType) modalWoodType.textContent = wood;
        if (modalUsage) modalUsage.textContent = usage;

        // Display modal
        modal.classList.add('active');
      });
    });

    // Close modal when close button is clicked
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', function () {
        modal.classList.remove('active');
      });
    }

    // Close modal when clicking outside the content box
    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.classList.remove('active');
      }
    });

    // Close modal when pressing the Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. Client-Side Form Validation (Used on contact.html)
     Purpose: Validates user input for the Quote & Inquiry form.
     Checks required fields, phone number format, and email format.
     Provides clear error and success visual states.
     ------------------------------------------------------------------------ */
  var contactForm = document.getElementById('quoteForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      // Prevent actual form submission to keep user on the page
      event.preventDefault();

      // Get input elements
      var nameInput = document.getElementById('fullName');
      var phoneInput = document.getElementById('phoneNumber');
      var emailInput = document.getElementById('emailAddress');
      var doorSelect = document.getElementById('doorType');
      var messageInput = document.getElementById('projectDetails');
      var formAlert = document.getElementById('formAlert');

      // Track form validity
      var isValid = true;

      // Helper function to show error on a field
      function showError(inputElement, errorMessage) {
        var parent = inputElement.parentElement;
        var errorSpan = parent.querySelector('.error-message');
        if (errorSpan) {
          errorSpan.textContent = errorMessage;
          errorSpan.style.display = 'block';
        }
        inputElement.classList.add('input-error');
        isValid = false;
      }

      // Helper function to clear error on a field
      function clearError(inputElement) {
        var parent = inputElement.parentElement;
        var errorSpan = parent.querySelector('.error-message');
        if (errorSpan) {
          errorSpan.textContent = '';
          errorSpan.style.display = 'none';
        }
        inputElement.classList.remove('input-error');
      }

      // 1. Validate Full Name (At least 3 letters)
      if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
        showError(nameInput, 'Please enter your full name (minimum 3 characters).');
      } else {
        clearError(nameInput);
      }

      // 2. Validate Phone Number (Must be a 11-digit Pakistani phone number or valid mobile)
      var phonePattern = /^03[0-9]{9}$|^(\+92)[0-9]{10}$|^[0-9]{10,12}$/;
      var cleanPhone = phoneInput.value.trim().replace(/[\s-]/g, '');
      if (!cleanPhone || !phonePattern.test(cleanPhone)) {
        showError(phoneInput, 'Please enter a valid contact number (e.g. 03001234567).');
      } else {
        clearError(phoneInput);
      }

      // 3. Validate Email Address (Standard basic email format check)
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address.');
      } else {
        clearError(emailInput);
      }

      // 4. Validate Door Category Selection
      if (!doorSelect.value || doorSelect.value === '') {
        showError(doorSelect, 'Please select the door category you are interested in.');
      } else {
        clearError(doorSelect);
      }

      // 5. Validate Project Details / Message (At least 10 characters)
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError(messageInput, 'Please provide brief details or measurements (at least 10 characters).');
      } else {
        clearError(messageInput);
      }

      // If all fields are valid, show success notification and reset form
      if (isValid) {
        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = '<strong>Thank you!</strong> Your quote request has been received. Our Lahore branch representative will contact you shortly.';
          formAlert.style.display = 'block';
        }

        // Reset the form fields
        contactForm.reset();

        // Scroll to alert so user sees confirmation
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        if (formAlert) {
          formAlert.className = 'form-alert error';
          formAlert.innerHTML = '<strong>Error:</strong> Please correct the highlighted fields above.';
          formAlert.style.display = 'block';
        }
      }
    });
  }

});
