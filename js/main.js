document.addEventListener('DOMContentLoaded', () => {

  // ---- NAV BURGER ----
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      const spans = burger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.transform = '';
      }
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.querySelectorAll('span').forEach(s => s.style.transform = '');
      });
    });
  }

  // ---- PORTFOLIO FILTER ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioRows = document.querySelectorAll('.portfolio-row');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      let idx = 1;
      portfolioRows.forEach(row => {
        if (filter === 'all' || row.getAttribute('data-cat') === filter) {
          row.classList.remove('hidden');
          row.querySelector('.portfolio-row__num').textContent = String(idx).padStart(2, '0');
          idx++;
        } else {
          row.classList.add('hidden');
        }
      });
    });
  });

  // ---- COUNTER ANIMATION ----
  const counters = document.querySelectorAll('.stat-num');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  function animateCounter(el) {
    const text = el.textContent;
    const hasPlus = text.startsWith('+');
    const hasPercent = text.endsWith('%');
    const hasJ = text.includes('j');
    const num = parseInt(text.replace(/\D/g, ''));
    if (isNaN(num) || num < 10) return;
    let current = 0;
    const step = Math.ceil(num / 40);
    const interval = setInterval(() => {
      current = Math.min(current + step, num);
      let display = hasPlus ? '+' : '';
      display += current;
      if (hasPercent) display += '%';
      if (hasJ) display += ' j';
      el.textContent = display;
      if (current >= num) clearInterval(interval);
    }, 35);
  }

  // ---- SCROLL REVEAL ----
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.service-item, .prix-card, .process-item, .temoignage, .portfolio-row').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ${i * 0.05}s ease, transform 0.5s ${i * 0.05}s ease`;
    revealObs.observe(el);
  });

  // ---- CONTACT FORM ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Demande envoyée !';
      btn.style.background = '#22c55e';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Envoyer ma demande';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  }

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- DUPLICATE TICKER for infinite loop ----
  const track = document.getElementById('tickerTrack');
  if (track) {
    const items = track.innerHTML;
    track.innerHTML = items + items;
  }

});
