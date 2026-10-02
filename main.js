/**
 * Daffa Aliefiandy Yudhistira - Portfolio Scripts
 * 2026 Modern Interactive Features (Clean Light Theme)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // 1. SCROLL PROGRESS BAR & BACK TO TOP BUTTON
  // ========================================================
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================================================
  // 2. MOBILE MENU TOGGLE
  // ========================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      if (menuIcon) {
        if (isHidden) {
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
        } else {
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-times');
        }
      }
    });

    // Close when clicking any nav link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (menuIcon) {
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
        }
      });
    });
  }

  // ========================================================
  // 3. ACTIVE NAV LINK HIGHLIGHTING
  // ========================================================
  const sections = document.querySelectorAll('section[id], header');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('text-blue-600', 'font-bold');
            link.classList.remove('text-slate-600');
          } else {
            link.classList.remove('text-blue-600', 'font-bold');
            link.classList.add('text-slate-600');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  // ========================================================
  // 4. HERO TYPING EFFECT
  // ========================================================
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const roles = [
      "Technology Enthusiast",
      "Expert Generalist",
      "Information Systems @ Telkom University",
      "Full-Stack Web & Software Developer",
      "Ex-APTRG Lab Research Intern",
      "Garuda Hacks 7.0 Participant"
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeLoop() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        charIdx--;
        typingSpeed = 35;
      } else {
        charIdx++;
        typingSpeed = 80;
      }

      typingElement.textContent = currentRole.substring(0, charIdx);

      if (!isDeleting && charIdx === currentRole.length) {
        typingSpeed = 1900; // Pause at full string
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // ========================================================
  // ========================================================
  // 5. CERTIFICATE FILTER & REAL-TIME SEARCH
  // ========================================================
  const certContainer = document.getElementById('certContainer');
  const certCards = certContainer ? Array.from(certContainer.querySelectorAll('.cert-card')) : [];
  const allCertCards = Array.from(document.querySelectorAll('.cert-card'));
  const filterBtns = document.querySelectorAll('.cert-filter-btn');
  const certSearch = document.getElementById('certSearch');
  const noCertsMsg = document.getElementById('noCertsMsg');
  const countAll = document.getElementById('countAll');

  if (countAll) {
    countAll.textContent = certCards.length;
  }

  let currentCategory = 'all';
  let currentSearchQuery = '';

  function applyCertFilter() {
    let visibleCount = 0;

    certCards.forEach(card => {
      const category = card.dataset.category || '';
      const title = (card.dataset.title || '').toLowerCase();
      const issuer = (card.dataset.issuer || '').toLowerCase();
      const desc = (card.dataset.desc || '').toLowerCase();

      const matchesCat = (currentCategory === 'all' || category === currentCategory);
      const matchesSearch = !currentSearchQuery || 
        title.includes(currentSearchQuery) || 
        issuer.includes(currentSearchQuery) || 
        desc.includes(currentSearchQuery);

      if (matchesCat && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (noCertsMsg) {
      if (visibleCount === 0) {
        noCertsMsg.classList.remove('hidden');
      } else {
        noCertsMsg.classList.add('hidden');
      }
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'font-bold');
        b.classList.add('text-slate-600', 'font-semibold');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'font-bold');
      btn.classList.remove('text-slate-600');

      currentCategory = btn.dataset.filter;
      applyCertFilter();
    });
  });

  if (certSearch) {
    certSearch.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      applyCertFilter();
    });
  }

  // ========================================================
  // 6. CERTIFICATE LIGHTBOX MODAL & ZOOM
  // ========================================================
  const lightbox = document.getElementById('certLightbox');
  const modalImg = document.getElementById('modalImg');
  const modalImgWrapper = document.getElementById('modalImgWrapper');
  const modalTitle = document.getElementById('modalTitle');
  const modalIssuer = document.getElementById('modalIssuer');
  const modalDesc = document.getElementById('modalDesc');
  const modalIndex = document.getElementById('modalIndex');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const prevCertBtn = document.getElementById('prevCertBtn');
  const nextCertBtn = document.getElementById('nextCertBtn');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');

  let activeCertIndex = 0;
  let zoomLevel = 1;
  let activeModalPool = [];

  function getVisibleCertCards() {
    return certCards.filter(card => !card.classList.contains('hidden'));
  }

  function openLightbox(card) {
    if (certCards.includes(card)) {
      activeModalPool = getVisibleCertCards();
      activeCertIndex = activeModalPool.indexOf(card);
    } else {
      // Timeline documentation or external modal item
      const timelineCards = Array.from(document.querySelectorAll('#experiences .cert-card'));
      activeModalPool = timelineCards.length > 0 ? timelineCards : [card];
      activeCertIndex = activeModalPool.indexOf(card);
    }

    if (activeCertIndex === -1) activeCertIndex = 0;
    renderLightboxItem();

    if (lightbox) {
      lightbox.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      lightbox.classList.add('opacity-100');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
        resetZoom();
      }, 250);
    }
  }

  function resetZoom() {
    zoomLevel = 1;
    if (modalImgWrapper) {
      modalImgWrapper.style.transform = `scale(1)`;
    }
  }

  function renderLightboxItem() {
    resetZoom();
    if (!activeModalPool || activeModalPool.length === 0) return;

    const card = activeModalPool[activeCertIndex];
    if (!card) return;

    const title = card.dataset.title || '';
    const issuer = card.dataset.issuer || '';
    const desc = card.dataset.desc || '';
    const imgUrl = card.dataset.img || '';

    if (modalTitle) modalTitle.textContent = title;
    if (modalIssuer) modalIssuer.textContent = issuer;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalImg) modalImg.src = imgUrl;
    if (modalDownloadBtn) modalDownloadBtn.href = imgUrl;
    if (modalIndex) modalIndex.textContent = `${activeCertIndex + 1} of ${activeModalPool.length}`;
  }

  function navigateCert(direction) {
    if (!activeModalPool || activeModalPool.length === 0) return;

    activeCertIndex = (activeCertIndex + direction + activeModalPool.length) % activeModalPool.length;
    renderLightboxItem();
  }

  allCertCards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
  });

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (prevCertBtn) prevCertBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateCert(-1); });
  if (nextCertBtn) nextCertBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateCert(1); });

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (zoomLevel < 2.5) {
        zoomLevel += 0.25;
        modalImgWrapper.style.transform = `scale(${zoomLevel})`;
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (zoomLevel > 0.75) {
        zoomLevel -= 0.25;
        modalImgWrapper.style.transform = `scale(${zoomLevel})`;
      }
    });
  }

  // Close on backdrop click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (lightbox && !lightbox.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateCert(-1);
      if (e.key === 'ArrowRight') navigateCert(1);
    }
  });

  // ========================================================
  // 7. 1-CLICK COPY EMAIL BUTTON
  // ========================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyText = document.getElementById('copyText');
  const targetEmail = "daffaaliefiandy@gmail.com";

  if (copyEmailBtn && copyText) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(targetEmail);
        copyText.textContent = "Copied! ✓";
        copyEmailBtn.classList.add('bg-emerald-100', 'text-emerald-800');
        copyEmailBtn.classList.remove('bg-blue-50', 'text-blue-700');

        setTimeout(() => {
          copyText.textContent = "Copy Email";
          copyEmailBtn.classList.remove('bg-emerald-100', 'text-emerald-800');
          copyEmailBtn.classList.add('bg-blue-50', 'text-blue-700');
        }, 2500);
      } catch (err) {
        window.location.href = `mailto:${targetEmail}`;
      }
    });
  }

  // ========================================================
  // 8. INTERACTIVE CONTACT FORM
  // ========================================================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const subject = document.getElementById('formSubject').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !subject || !message) {
        showStatus("Please complete all required fields.", false);
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>`;

      setTimeout(() => {
        const mailtoUri = `mailto:daffaaliefiandy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
        
        showStatus("Thank you! Opening your email client to send your message...", true);
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-paper-plane text-xs"></i><span>Send Message</span>`;
        
        window.location.href = mailtoUri;
        contactForm.reset();
      }, 900);
    });

    function showStatus(msg, isSuccess) {
      if (!formStatus) return;
      formStatus.textContent = msg;
      formStatus.classList.remove('hidden');
      if (isSuccess) {
        formStatus.className = "p-3.5 rounded-xl text-xs font-semibold text-center bg-emerald-100 text-emerald-800 border border-emerald-200";
      } else {
        formStatus.className = "p-3.5 rounded-xl text-xs font-semibold text-center bg-red-100 text-red-800 border border-red-200";
      }
    }
  }

  // ========================================================
  // 9. FOOTER PARTICLE CANVAS ANIMATION
  // ========================================================
  const footerCanvas = document.getElementById('footerCanvas');
  if (footerCanvas) {
    const ctx = footerCanvas.getContext('2d');
    let width = footerCanvas.width = footerCanvas.offsetWidth;
    let height = footerCanvas.height = footerCanvas.offsetHeight;

    window.addEventListener('resize', () => {
      if (footerCanvas.offsetWidth > 0 && footerCanvas.offsetHeight > 0) {
        width = footerCanvas.width = footerCanvas.offsetWidth;
        height = footerCanvas.height = footerCanvas.offsetHeight;
      }
    }, { passive: true });

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.4 + 0.15;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = `rgba(147, 197, 253, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = Math.min(30, Math.floor(width / 40));
    const particles = Array.from({ length: particleCount }, () => new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.strokeStyle = `rgba(147, 197, 253, ${(1 - dist / 100) * 0.2})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

});