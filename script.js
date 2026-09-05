// ==================== Page Transition Animation ==================== 
document.addEventListener('DOMContentLoaded', () => {
  // Add slide-in animation to main on page load
  const main = document.querySelector('main');
  if (main) {
    main.style.animation = 'slideInRight 0.6s ease-out';
  }

  // Handle navigation with slide-out animation
  const navLinks = document.querySelectorAll('.nav-links a, .nav-brand');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only add transition for navigation links, not the logo on homepage
      if (href && !href.includes('#') && href !== window.location.pathname) {
        e.preventDefault();
        
        if (main) {
          main.style.animation = 'slideOutLeft 0.6s ease-in forwards';
        }
        
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });

  // ==================== Navigation Active State ==================== 
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ==================== Hamburger Menu ==================== 
  const hamburger = document.querySelector('.hamburger');
  const navLinksMenu = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksMenu.classList.remove('active');
      });
    });
  }

  // ==================== Scroll Fade-In Animation ==================== 
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all content cards, project cards, terminals, contact links, and placeholders
  document.querySelectorAll('.content-card, .project-card, .terminal, .contact-link, .placeholder-box').forEach(el => {
    observer.observe(el);
  });
});

// ==================== Respect prefers-reduced-motion ==================== 
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.documentElement.style.scrollBehavior = 'auto';
  document.querySelector('main').style.animation = 'none';
}
