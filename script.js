AOS.init({
  duration: 900,
  once: true
});

function openTab(tabName, el) {
  const contents = document.querySelectorAll("#resume .tab-content");
  for (let i = 0; i < contents.length; i++) {
    contents[i].classList.remove("active");
  }

  const btns = document.querySelectorAll("#resume .tab-btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
  }

  const targetTab = document.getElementById(tabName);
  if (targetTab) {
    targetTab.classList.add("active");
  }
  if (el) {
    el.classList.add("active");
  }
}

const textElement = document.getElementById("typewriter-text");

const phrases = [
  "Flutter Developer",
  "Ai Agent and chatbot Expert",
  "Full Stack Web Developer",
  "Mobile App Developer",
  "Software Engineer"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    textElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 400);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 90);
  }
}

// INTERSECTION OBSERVER FOR SCROLL-BASED ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated layout components
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll(
    'section, .section-title, .timeline-item, .skill-item, .project-row, .service-card, .info-card, .highlight-box, .scroll-slide-left, .scroll-slide-right'
  );
  
  elements.forEach(el => {
    observer.observe(el);
  });
});

// FIXED 3D CARDS LOGIC - Only tracks mouse relative to the card being actively hovered
document.addEventListener('DOMContentLoaded', () => {
  const allCards = document.querySelectorAll('.skill-item, .service-card, .info-card, .tab-btn, .social-icon-btn');

  allCards.forEach(card => {
    const isReduced = card.classList.contains('skill-item') || 
                      card.classList.contains('service-card') || 
                      card.classList.contains('info-card') ||
                      card.classList.contains('social-icon-btn');
    
    const divisor = isReduced ? 20 : 10;
    const translateZVal = isReduced ? '5px' : '10px';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / divisor;
      const rotateY = (centerX - x) / divisor;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZVal})`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
});

// ENHANCED 3D FLUID TILT + COORDINATE GLARE TRACKING FOR CORE IMAGES
document.addEventListener('DOMContentLoaded', () => {
  const imageContainers = document.querySelectorAll('.interactive-3d-image');

  imageContainers.forEach(container => {
    let ticking = false;
    const glareSheet = container.querySelector('.image-glare');

    container.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((centerY - y) / centerY) * 12;
          const rotateY = ((x - centerX) / centerX) * 12;

          // Track glare angle parameters
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;

          const img = container.querySelector('img');
          if (img) {
            img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
          }
          
          if (glareSheet) {
            glareSheet.style.opacity = '1';
            glareSheet.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, transparent 60%)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    container.addEventListener('mouseleave', () => {
      window.requestAnimationFrame(() => {
        const img = container.querySelector('img');
        
        if (img) {
          img.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        }
        if (glareSheet) {
          glareSheet.style.opacity = '0';
        }
      });
    });
  });
});

// FLOATING ANIMATION FOR ELEMENTS
const floatingElements = document.querySelectorAll('.image-wrapper, .highlight-box');
floatingElements.forEach((el, index) => {
  const delay = index * 0.3;
  el.style.animation = `floatAnim 4s ease-in-out infinite`;
  el.style.animationDelay = `${delay}s`;
});

document.addEventListener('DOMContentLoaded', () => {
  typeEffect();

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields!');
        return;
      }

      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';

      function sendEmail() {
        if (typeof emailjs === 'undefined') {
          console.log('EmailJS not ready, retrying...');
          setTimeout(sendEmail, 500);
          return;
        }

        const templateParams = {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
          to_email: 'muhtayyabofficial@gmail.com'
        };

        console.log('Sending with EmailJS:', templateParams);

        emailjs.send('service_j1rxyxp', 'template_xcqtdh8', templateParams)
          .then(function(response) {
            console.log('✅ Email sent successfully!', response);
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
            btn.disabled = false;
            btn.textContent = 'Send Message';
          })
          .catch(function(error) {
            console.error('❌ Failed to send email:', error);
            alert('Error: ' + (error.text || 'Failed to send message. Please try again.'));
            btn.disabled = false;
            btn.textContent = 'Send Message';
          });
      }

      sendEmail();
    });
  }
});