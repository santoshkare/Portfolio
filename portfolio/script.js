// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out'
  });
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // Counter animation for stats
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      
      const inc = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(() => animateCounters(), 1);
      } else {
        counter.innerText = target;
      }
    });
  };
  
  // Start counter animation when stats section is in view
  const statsSection = document.querySelector('.about-stats');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  if (statsSection) {
    observer.observe(statsSection);
  }
  
  // Form submission handling
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwEXWU2IxcGyqwS7q89rB8LTYm64hX4HcwHcKI6c37JczoiAqWx8DYjBBGdKuVodAxA/exec';
  const form = document.forms['submit-to-google-sheet'];
  const msg = document.getElementById("msg");
  
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
          msg.innerHTML = "Message sent successfully!";
          setTimeout(() => msg.innerHTML = "", 5000);
          form.reset();
        })
        .catch(error => {
          console.error('Error!', error.message);
          msg.innerHTML = "Error sending message. Please try again.";
          setTimeout(() => msg.innerHTML = "", 5000);
        });
    });
  }
  
  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});