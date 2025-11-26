// Enhanced navbar scroll effect with 3D
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
    navbar.style.transform = 'translateZ(20px)';
  } else {
    navbar.classList.remove('scrolled');
    navbar.style.transform = 'translateZ(0)';
  }
  
  // Hide/show navbar on scroll (optional enhancement)
  if (currentScroll > lastScroll && currentScroll > 500) {
    // Scrolling down
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (navLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', setActiveNav);

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Enhanced counter animation with 3D effect
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  // Add initial 3D transform
  element.style.transform = 'translateZ(0)';
  element.style.transition = 'transform 0.3s ease';
  
  const timer = setInterval(() => {
    current += increment;
    
    // Add pulsing 3D effect during counting
    const scale = 1 + Math.sin(current / target * Math.PI) * 0.1;
    element.style.transform = `scale(${scale}) translateZ(${scale * 10}px)`;
    
    if (current >= target) {
      element.textContent = target.toLocaleString();
      element.style.transform = 'scale(1) translateZ(0)';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('aos-animate');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with data-aos attribute
const animatedElements = document.querySelectorAll('[data-aos]');
animatedElements.forEach(element => observer.observe(element));

// Animate hero stats when visible
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        animateCounter(stat, target);
      });
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}



// Enhanced parallax effect for gradient orbs with 3D
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.gradient-orb');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.06;
    const x = (mouseX - 0.5) * 100 * speed;
    const y = (mouseY - 0.5) * 100 * speed;
    const z = index * 10;
    orb.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
  });
});

// Parallax scroll effect for sections
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.mockup-card, .step-visual');
  
  parallaxElements.forEach((element, index) => {
    const speed = (index % 2 === 0) ? 0.5 : -0.5;
    const yPos = scrolled * speed * 0.1;
    if (element.classList.contains('step-visual')) {
      element.style.transform = `translateY(${yPos}px)`;
    }
  });
});

// Enhanced 3D Mockup card tilt effect
const mockupCards = document.querySelectorAll('.mockup-card');

mockupCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

// 3D Tilt effect for feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) translateZ(20px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// 3D Tilt effect for team member cards
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) translateZ(20px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// 3D Tilt effect for analytics cards
const analyticsCards = document.querySelectorAll('.analytics-card');
analyticsCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 18;
    const rotateY = (centerX - x) / 18;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateZ(20px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// 3D Tilt effect for integration cards
const integrationCards = document.querySelectorAll('.integration-card');
integrationCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) translateZ(20px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Enhanced button ripple effect with 3D
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    // Add 3D press effect
    this.style.transform = 'scale(0.98) translateZ(0)';
    setTimeout(() => {
      this.style.transform = '';
    }, 100);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
  
  // Add magnetic effect for premium feel
  button.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const moveX = x * 0.15;
    const moveY = y * 0.15;
    
    this.style.transform = `translate(${moveX}px, ${moveY}px) translateZ(20px)`;
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// Add ripple animation styles dynamically
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Scroll progress indicator
function updateScrollProgress() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.pageYOffset / scrollHeight) * 100;
  
  let progressBar = document.getElementById('scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: var(--color-primary);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
  }
  
  progressBar.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Initialize animations on page load
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger initial animations
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }
});

// Handle CTA button clicks
const ctaButtons = document.querySelectorAll('a[href="#demo"], a[href="#contact"]');
ctaButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = button.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Create floating particles for 3D effect
function createFloatingParticles() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    heroSection.appendChild(particle);
  }
}

// Create floating background shapes
function createFloatingShapes() {
  const body = document.body;
  const shapesContainer = document.createElement('div');
  shapesContainer.className = 'floating-shapes';
  
  for (let i = 1; i <= 3; i++) {
    const shape = document.createElement('div');
    shape.className = `shape shape-${i}`;
    shapesContainer.appendChild(shape);
  }
  
  body.insertBefore(shapesContainer, body.firstChild);
}

// Initialize 3D effects on load with stagger
window.addEventListener('load', () => {
  setTimeout(() => createFloatingParticles(), 500);
  setTimeout(() => createFloatingShapes(), 300);
  
  // Add loaded class for transitions
  document.body.classList.add('page-loaded');
  
  // Trigger navbar animation
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.style.transform = 'translateY(0)';
    navbar.style.opacity = '1';
  }
});

// Page load animation
const navbarInit = document.getElementById('navbar');
if (navbarInit) {
  navbarInit.style.transform = 'translateY(-100%)';
  navbarInit.style.opacity = '0';
  navbarInit.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
}

// Smooth 3D reveal on scroll
const reveal3DElements = document.querySelectorAll('.feature-card, .team-member, .analytics-card, .step');

const reveal3DObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) translateZ(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

reveal3DElements.forEach(element => {
  reveal3DObserver.observe(element);
});

// 3D button depth effect on click
const all3DButtons = document.querySelectorAll('.btn');
all3DButtons.forEach(button => {
  button.addEventListener('mousedown', () => {
    button.style.transform = 'translateY(0) translateZ(0) scale(0.98)';
  });
  
  button.addEventListener('mouseup', () => {
    button.style.transform = '';
  });
});

// Enhanced scroll-triggered animations with 3D transforms
const scroll3DElements = document.querySelectorAll('.dashboard-mockup, .mini-stat');

const scroll3DObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'perspective(1000px) rotateX(0) translateY(0) translateZ(0)';
    }
  });
}, { threshold: 0.2 });

scroll3DElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'perspective(1000px) rotateX(10deg) translateY(30px) translateZ(-50px)';
  element.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
  scroll3DObserver.observe(element);
});



// Console branding
console.log('%c🎓 Smart Attendance System', 'font-size: 20px; font-weight: bold; color: #21808d;');
console.log('%c💻 Developed by Code Breakers Group', 'font-size: 14px; color: #626c71;');
console.log('%c👥 Team:', 'font-size: 12px; font-weight: bold;');
console.log('%c   • Arun Poddar\n   • Nazish Ali\n   • Prithvi Raj\n   • Aman\n   • Wasit\n   • Yassin\n   • Chandrashekhar Das', 'font-size: 11px; color: #626c71;');
console.log('%c✨ Premium 3D Enhanced Version', 'font-size: 12px; font-style: italic; color: #32b8c6;');
console.log('%cFeatures: Advanced 3D transforms • Glassmorphism • Parallax effects • Premium animations', 'font-size: 10px; color: #777;');