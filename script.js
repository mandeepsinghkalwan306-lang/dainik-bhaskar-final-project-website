 /* ── collapsible day sections ── */
  function toggleDay(header) {
    const body   = header.nextElementSibling;
    const toggle = header.querySelector('.day-toggle');
    const isOpen = !body.classList.contains('collapsed');
    body.classList.toggle('collapsed', isOpen);
    toggle.textContent = isOpen ? '▶' : '▼';
  }

  /* collapse all on load; keep first open */
  document.querySelectorAll('.day-body').forEach((body, i) => {
    if (i !== 0) {
      body.classList.add('collapsed');
      body.previousElementSibling.querySelector('.day-toggle').textContent = '▶';
    }
  });

  /* ── scroll-to-top button ── */
  const scrollBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  });

  /* ── nav active link highlight ── */
  const sections = document.querySelectorAll('section[id], div.day-section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--accent)'
        : '';
    });
  });

  /* ── feedback form ── */
  function submitFeedback() {
    const name    = document.getElementById('fb-name').value.trim();
    const comment = document.getElementById('fb-comment').value.trim();
    const rating  = document.querySelector('input[name="rating"]:checked');

    if (!name || !comment || !rating) {
      alert('Please fill in your name, a rating, and a comment before submitting.');
      return;
    }

    document.getElementById('feedback-inputs').style.display = 'none';
    document.getElementById('feedback-success').style.display = 'block';
  }

  /* ── smooth day-nav scroll ── */
  document.querySelectorAll('.day-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        /* open that day if collapsed */
        const body = target.querySelector('.day-body');
        const header = target.querySelector('.day-header');
        if (body && body.classList.contains('collapsed')) {
          toggleDay(header);
        }
      }
    });
  });