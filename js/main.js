/* ══════════════════════════════════════════
   PORTFOLIO — MAIN JAVASCRIPT
   CAKPOVI Victorine Emmanuella
   ══════════════════════════════════════════ */

/* ── Mobile Menu ── */
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
        document.getElementById('navLinks').classList.remove('active');
    });
});

/* ── Navbar scroll effect ── */
window.addEventListener('scroll', function () {
    var nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

/* ── Active nav link highlight ── */
var sections = document.querySelectorAll('section');

window.addEventListener('scroll', function () {
    var scrollPos = window.scrollY + 100;
    sections.forEach(function (section) {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            var id = section.getAttribute('id');
            document.querySelectorAll('.nav-links a').forEach(function (a) {
                a.classList.remove('active');
                if (a.getAttribute('href') === '#' + id) {
                    a.classList.add('active');
                }
            });
        }
    });
});

/* ── Typing effect ── */
(function () {
    var phrases = [
        'Étudiante en Génie Mécanique',
        'Passionnée de Mécatronique',
        'Future Ingénieure en Robotique',
        'Conception & Automatisation'
    ];
    var el = document.getElementById('typed-text');
    var phraseIdx = 0;
    var charIdx = 0;
    var deleting = false;

    function type() {
        var current = phrases[phraseIdx];

        if (deleting) {
            el.textContent = current.substring(0, charIdx--);
            if (charIdx < 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(type, 400);
                return;
            }
            setTimeout(type, 30);
        } else {
            el.textContent = current.substring(0, charIdx++);
            if (charIdx > current.length) {
                deleting = true;
                setTimeout(type, 2000);
                return;
            }
            setTimeout(type, 60);
        }
    }

    type();
})();

/* ── Scroll Reveal ── */
var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
});

document.querySelectorAll('.reveal-3d').forEach(function (el) {
    revealObserver.observe(el);
});

/* ── Contact Form ── */
function handleSubmit(event) {
    event.preventDefault();
    alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
    event.target.reset();
}

/* ── Lightbox (PPP) ── */
function openLightbox(src) {
    var lightbox = document.getElementById('lightbox');
    var img = document.getElementById('lightbox-img');
    img.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
});

/* ══════════════════════════════════════════
   PARTICLE ANIMATION (Canvas)
   ══════════════════════════════════════════ */
(function () {
    var canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 60;
    var mouse = { x: null, y: null };

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    canvas.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', function () {
        mouse.x = null;
        mouse.y = null;
    });

    var colors = [
        'rgba(233, 30, 140, ',   // pink
        'rgba(8, 145, 178, ',    // cyan
        'rgba(249, 168, 212, '   // pink light
    ];

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + '0.3)';
            ctx.fill();

            // Draw connections between particles
            for (var j = i + 1; j < particles.length; j++) {
                var p2 = particles[j];
                var dx = p.x - p2.x;
                var dy = p.y - p2.y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = 'rgba(233, 30, 140, ' + (0.08 - dist / 2000) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Draw connections to mouse
            if (mouse.x !== null) {
                var dxM = p.x - mouse.x;
                var dyM = p.y - mouse.y;
                var distM = Math.sqrt(dxM * dxM + dyM * dyM);

                if (distM < 180) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = 'rgba(8, 145, 178, ' + (0.18 - distM / 1000) + ')';
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
})();
