// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved dark mode preference
    const darkModeSaved = localStorage.getItem('darkMode') === 'true';
    
    // Apply dark mode if saved preference exists
    if (darkModeSaved) {
      document.documentElement.classList.add('dark');
    }
    
    // Create dark mode toggle button
    const nav = document.querySelector('nav .container');
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = darkModeSaved ? 
      '<i class="fas fa-sun text-yellow-500"></i>' : 
      '<i class="fas fa-moon text-gray-600 dark:text-blue-400"></i>';
    darkModeToggle.className = 'ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition';
    darkModeToggle.setAttribute('id', 'darkModeToggle');
    
    // Add dark mode toggle to navbar
    nav.appendChild(darkModeToggle);
    
    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', function() {
      const isDarkMode = document.documentElement.classList.toggle('dark');
      localStorage.setItem('darkMode', isDarkMode);
      this.innerHTML = isDarkMode ? 
        '<i class="fas fa-sun text-yellow-500"></i>' : 
        '<i class="fas fa-moon text-gray-600 dark:text-blue-400"></i>';
    });
    
    // Mobile menu functionality
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Create mobile menu content
    mobileMenu.className = 'fixed top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-50 py-4 px-6 transition-all duration-300 transform -translate-y-full opacity-0';
    
    // Add links to mobile menu
    const menuLinks = [
      { href: '#about', text: 'About' },
      { href: '#interests', text: 'Interests' },
      { href: '#projects', text: 'Projects' },
      { href: '#skills', text: 'Skills' },
      { href: '#experience', text: 'Experience' },
      { href: '#contact', text: 'Contact' }
    ];
    
    menuLinks.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'block py-3 px-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition';
      a.textContent = link.text;
      
      // Close menu when a link is clicked
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-y-0', 'opacity-100');
        mobileMenu.classList.add('-translate-y-full', 'opacity-0');
        menuOpen = false;
        menuToggle.innerHTML = '<i class="fas fa-bars text-xl"></i>';
      });
      
      mobileMenu.appendChild(a);
    });
    
    // Mobile menu toggle functionality
    let menuOpen = false;
    menuToggle.addEventListener('click', function() {
      menuOpen = !menuOpen;
      
      if (menuOpen) {
        mobileMenu.classList.remove('-translate-y-full', 'opacity-0');
        mobileMenu.classList.add('translate-y-0', 'opacity-100');
        this.innerHTML = '<i class="fas fa-times text-xl"></i>';
      } else {
        mobileMenu.classList.remove('translate-y-0', 'opacity-100');
        mobileMenu.classList.add('-translate-y-full', 'opacity-0');
        this.innerHTML = '<i class="fas fa-bars text-xl"></i>';
      }
    });
    
    // Adjust hero section padding on the right side
    const heroContent = document.querySelector('.hero-section .container > div:first-child');
    if (heroContent) {
      heroContent.classList.add('pr-4', 'md:pr-8', 'lg:pr-12');
    }
  
    // Canvas animation in footer
    const canvas = document.getElementById('footerCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match the footer
    function resizeCanvas() {
      const footer = document.querySelector('footer');
      canvas.width = footer.offsetWidth;
      canvas.height = footer.offsetHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particles class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, 255, ${Math.random() * 0.5 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particle array
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Connect particles with lines if they're close enough
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 150, 255, ${0.1 * (1 - distance/100)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
  });