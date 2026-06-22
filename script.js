/* =============================================
   IEEE IGNITE — JavaScript
   ============================================= */

/* =============================================
   1. NAVBAR — Scroll & Highlight
   ============================================= */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Scroll → sticky glass effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightActiveNav();
});

// Highlight active nav link on scroll
function highlightActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      closeMobileMenu();
    }
  });
});



/* =============================================
   2. HAMBURGER / MOBILE MENU
   ============================================= */
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

function openMobileMenu() {
  hamburger.classList.add('open');
  navLinksEl.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  hamburger.classList.remove('open');
  navLinksEl.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.contains('open');
  isOpen ? closeMobileMenu() : openMobileMenu();
});

// Close on click outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    closeMobileMenu();
  }
});

// Auto-close when resized back to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 769) {
    closeMobileMenu();
  }
});

// Close on scroll (if menu is open)
window.addEventListener('scroll', () => {
  if (navLinksEl.classList.contains('open') && window.scrollY > 80) {
    closeMobileMenu();
  }
}, { passive: true });


/* =============================================
   3. PARTICLE GENERATOR (Hero Section)
   ============================================= */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#8b5cf6', '#a78bfa', '#ec4899', '#7c3aed', '#06b6d4'];

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size     = Math.random() * 3 + 1;
    const left     = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay    = -(Math.random() * 15);
    const color    = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(particle);
  }
}

createParticles();


/* =============================================
   4. EVENT FILTERING
   ============================================= */
const filterBtns  = document.querySelectorAll('.filter-btn');
const eventCards  = document.querySelectorAll('.event-card');
const noResults   = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');

let activeFilter = 'all';
let searchQuery  = '';

function applyFilters() {
  let visibleCount = 0;

  eventCards.forEach((card, index) => {
    const category = card.getAttribute('data-category');
    const title    = card.querySelector('.card-title').textContent.toLowerCase();
    const desc     = card.querySelector('.card-desc').textContent.toLowerCase();

    const matchesFilter = activeFilter === 'all' || category === activeFilter;
    const matchesSearch = searchQuery === '' ||
                          title.includes(searchQuery) ||
                          desc.includes(searchQuery);

    if (matchesFilter && matchesSearch) {
      card.classList.remove('hidden');
      card.style.animationDelay = `${visibleCount * 0.06}s`;
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

// Filter button clicks
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    activeFilter = btn.getAttribute('data-filter');
    applyFilters();
  });
});

// Search input
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  searchClear.classList.toggle('visible', searchQuery.length > 0);
  applyFilters();
});

// Clear search
searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  searchClear.classList.remove('visible');
  searchInput.focus();
  applyFilters();
});

// Filter shortcut from footer links
document.getElementById('footer-ev-technical').addEventListener('click', () => {
  document.getElementById('filter-technical').click();
});
document.getElementById('footer-ev-professional').addEventListener('click', () => {
  document.getElementById('filter-professional').click();
});
document.getElementById('footer-ev-interactive').addEventListener('click', () => {
  document.getElementById('filter-interactive').click();
});


/* =============================================
   5. SCHEDULE TABS
   ============================================= */
const schedTabs    = document.querySelectorAll('.sched-tab');
const schedPanels  = document.querySelectorAll('.schedule-table-wrapper');

schedTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-day');

    schedTabs.forEach(t => t.classList.remove('active'));
    schedPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});


/* =============================================
   6. FAQ ACCORDION
   ============================================= */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all open items (single open at a time)
    faqItems.forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Toggle clicked item
    if (!isOpen) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
    }
  });
});


/* =============================================
   7. SCROLL REVEAL ANIMATIONS
   ============================================= */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to animate on scroll — each group gets its own stagger counter
// so later groups (FAQ, stats, headers) don't inherit a huge accumulated delay.
const revealGroups = [
  document.querySelectorAll('.about-card'),
  document.querySelectorAll('.event-card'),
  document.querySelectorAll('.sched-row:not(.header-row)'),
  document.querySelectorAll('.faq-item'),
  document.querySelectorAll('.stat'),
  document.querySelectorAll('.section-header'),
];

revealGroups.forEach(group => {
  Array.from(group).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.25s ease ${i * 0.03}s, transform 0.25s ease ${i * 0.03}s`;
    revealObserver.observe(el);
  });
});

// Add revealed class logic
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(styleSheet);


/* =============================================
   8. KNOW MORE BUTTON (Modal)
   ============================================= */
const eventDetails = {
  'btn-webdev': {
    title: '🌐 Web Development Workshop',
    category: 'Technical',
    details: 'Build production-ready web apps from scratch. This intensive workshop covers HTML5, CSS3, JavaScript ES6+, responsive design principles, and an introduction to React. You\'ll leave with a deployed portfolio project.',
    duration: '3 Hours | 40 Seats',
    prerequisites: 'Basic computer knowledge. No prior coding experience required.',
  },
  'btn-ai': {
    title: '🤖 AI & Machine Learning Session',
    category: 'Technical',
    details: 'Explore artificial intelligence with hands-on exercises. Topics include supervised learning, neural networks, Python (NumPy, pandas, scikit-learn), and building your first ML model with real datasets.',
    duration: '2.5 Hours | 35 Seats',
    prerequisites: 'Basic Python knowledge preferred.',
  },
  'btn-coding': {
    title: '💻 Coding Challenge',
    category: 'Technical',
    details: 'A competitive programming contest with 4 levels of difficulty — from beginner to expert. Problems span data structures, algorithms, and computational thinking. Top 3 winners get prizes.',
    duration: '4 Hours | 60 Seats',
    prerequisites: 'Knowledge of at least one programming language (C/C++/Python/Java).',
  },
  'btn-resume': {
    title: '📄 Resume Building',
    category: 'Professional',
    details: 'Work one-on-one with HR professionals and senior engineers to craft a resume that stands out. Learn ATS optimization, action verbs, quantifying achievements, and formatting for tech roles.',
    duration: '2 Hours | 30 Seats',
    prerequisites: 'Bring your current resume (or start fresh). Laptop recommended.',
  },
  'btn-linkedin': {
    title: '🤝 LinkedIn & Networking Workshop',
    category: 'Professional',
    details: 'Learn how to craft a compelling LinkedIn profile, connect strategically with industry professionals, and leverage LinkedIn for internship and job hunting. Live profile reviews included.',
    duration: '1.5 Hours | 50 Seats',
    prerequisites: 'Create a LinkedIn account before attending.',
  },
  'btn-career': {
    title: '🚀 Career Guidance Talk',
    category: 'Professional',
    details: 'Industry veterans from top companies share their journeys, career strategies, and advice for fresh graduates. Topics: core vs. IT, GATE vs. placements, higher studies, and entrepreneurship.',
    duration: '2 Hours | 100 Seats',
    prerequisites: 'None. Open to all.',
  },
  'btn-quiz': {
    title: '🧠 Tech Quiz',
    category: 'Interactive',
    details: 'A thrilling team quiz covering electronics, CS fundamentals, current tech trends, and pop-science. Teams of 3. Rapid-fire rounds, visual rounds, and an exciting buzzer finale.',
    duration: '1.5 Hours | 80 Seats',
    prerequisites: 'Team of 3. Register as a team.',
  },
  'btn-pitch': {
    title: '💡 Innovation Pitch',
    category: 'Interactive',
    details: 'Got a game-changing idea? Pitch it to a panel of investors, faculty, and industry experts. Present a 5-minute pitch, get 3 minutes of Q&A. Best pitch wins seed funding mentorship and prizes.',
    duration: '3 Hours | 25 Teams',
    prerequisites: 'Submit a one-page idea brief during registration.',
  },
  'btn-problem': {
    title: '🧩 Problem-Solving Challenge',
    category: 'Interactive',
    details: 'Teams are handed a real-world engineering or social problem. Ideate, prototype, and present a solution in 2.5 hours. Judged on creativity, feasibility, and presentation.',
    duration: '2.5 Hours | 40 Seats',
    prerequisites: 'Teams of 4. Multi-disciplinary teams encouraged.',
  },
};

// Create modal
const modal = document.createElement('div');
modal.id = 'event-modal';
modal.innerHTML = `
  <div class="modal-backdrop" id="modal-backdrop"></div>
  <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <button class="modal-close" id="modal-close" aria-label="Close">✕</button>
    <div class="modal-category" id="modal-category"></div>
    <h2 class="modal-title" id="modal-title"></h2>
    <p class="modal-details" id="modal-details"></p>
    <div class="modal-info-row">
      <div class="modal-info"><span>⏱ Duration & Seats</span><p id="modal-duration"></p></div>
      <div class="modal-info"><span>📋 Prerequisites</span><p id="modal-prereq"></p></div>
    </div>
    <a href="#register" class="btn-primary modal-register-btn" id="modal-register-btn"><span>Register for this Event</span></a>
  </div>
`;
document.body.appendChild(modal);

// Modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
  #event-modal {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  #event-modal.show { display: flex; }

  .modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(8px);
    animation: fadeInBack 0.2s ease;
  }
  @keyframes fadeInBack { from { opacity: 0; } to { opacity: 1; } }

  .modal-box {
    position: relative;
    background: #0f0f1e;
    border: 1px solid rgba(139,92,246,0.35);
    border-radius: 24px;
    padding: 40px;
    max-width: 560px;
    width: 100%;
    animation: modalSlide 0.3s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 0 60px rgba(109,40,217,0.3);
  }
  @keyframes modalSlide {
    from { opacity: 0; transform: scale(0.9) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  .modal-close {
    position: absolute;
    top: 16px; right: 16px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: #94a3b8;
    width: 36px; height: 36px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
  }
  .modal-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

  .modal-category {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #a78bfa;
    background: rgba(139,92,246,0.12);
    border: 1px solid rgba(139,92,246,0.25);
    border-radius: 100px;
    padding: 4px 14px;
    display: inline-block;
    margin-bottom: 16px;
  }

  .modal-title {
    font-family: 'Orbitron', monospace;
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 16px;
    line-height: 1.3;
  }

  .modal-details {
    font-size: 0.9rem;
    color: #94a3b8;
    line-height: 1.75;
    margin-bottom: 28px;
  }

  .modal-info-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 28px;
  }

  .modal-info {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 14px 16px;
  }

  .modal-info > span {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #a78bfa;
    display: block;
    margin-bottom: 6px;
  }

  .modal-info > p {
    font-size: 0.85rem;
    color: #e2e8f0;
    line-height: 1.5;
  }

  .modal-register-btn {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 480px) {
    .modal-box { padding: 28px 20px; }
    .modal-title { font-size: 1.1rem; }
    .modal-info-row { grid-template-columns: 1fr; }
  }
`;
document.head.appendChild(modalStyles);

// Open modal
document.querySelectorAll('.card-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const btnId  = e.currentTarget.id;
    const data   = eventDetails[btnId];
    if (!data) return;

    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-title').textContent    = data.title;
    document.getElementById('modal-details').textContent  = data.details;
    document.getElementById('modal-duration').textContent = data.duration;
    document.getElementById('modal-prereq').textContent   = data.prerequisites;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});


/* =============================================
   9. COUNTER ANIMATION (Stats)
   ============================================= */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = document.querySelectorAll('.stat-num');
      const targets  = [9, 2, 500, 20];
      const suffixes = ['+', '', '+', '+'];
      statNums.forEach((el, i) => {
        animateCounter(el, targets[i], suffixes[i]);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const ctaSection = document.querySelector('.cta-section');
if (ctaSection) statsObserver.observe(ctaSection);


/* =============================================
   10. INIT
   ============================================= */
// Initial highlight check
highlightActiveNav();
applyFilters();

console.log('%c IEEE IGNITE 🔥 ', 'background:#6d28d9;color:#fff;font-size:1.2rem;font-weight:bold;padding:8px 16px;border-radius:8px;');
console.log('%c Spark. Build. Innovate. ', 'color:#a78bfa;font-size:0.9rem;');
