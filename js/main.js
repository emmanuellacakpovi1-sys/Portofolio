/* ══════════════════════════════════════════
   PORTFOLIO — MAIN JAVASCRIPT
   CAKPOVI Victorine Emmanuella
   ══════════════════════════════════════════ */

/* ── Apply Admin Overrides from localStorage ── */
(function applyContent() {
    var raw = localStorage.getItem('portfolioData');
    if (!raw) return;
    var d;
    try { d = JSON.parse(raw); } catch(e) { return; }

    function q(sel) { return document.querySelector(sel); }
    function qa(sel) { return document.querySelectorAll(sel); }
    function setHtml(sel, val) { var el = q(sel); if (el && val) el.innerHTML = val; }
    function setText(sel, val) { var el = q(sel); if (el && val) el.textContent = val; }
    function setImg(sel, val) { var el = q(sel); if (el && val) el.src = val; }
    function setHref(sel, val) { var el = q(sel); if (el && val) el.href = val; }

    // Hero
    if (d.hero) {
        var h = d.hero;
        setText('.hero-eyebrow', h.eyebrow);
        if (h.firstName && h.lastName) {
            var ht = q('.hero-title');
            if (ht) ht.innerHTML = h.firstName + ' <span class="hero-title-accent">' + h.lastName + '</span>';
        }
        var hb = q('.hero-badge span:last-child');
        if (hb && h.badge) hb.textContent = h.badge;
        setText('.hero-sub', h.tagline);
        if (h.photo) setImg('.hero-photo-frame img', h.photo);
        // Update typing phrases in main.js (override via global)
        if (h.phrases) window._adminPhrases = h.phrases.split('\n').filter(function(p) { return p.trim(); });
    }

    // About
    if (d.about) {
        var ab = d.about;
        var bios = q('.about-text');
        if (bios) {
            var ps = bios.querySelectorAll('p');
            if (ps[0] && ab.p1) ps[0].innerHTML = ab.p1;
            if (ps[1] && ab.p2) ps[1].innerHTML = ab.p2;
            if (ps[2] && ab.p3) ps[2].innerHTML = ab.p3;
        }
        var stats = qa('.stat-item');
        if (stats[0]) { stats[0].querySelector('.stat-number').textContent = ab.s1n || ''; stats[0].querySelector('.stat-label').textContent = ab.s1l || ''; }
        if (stats[1]) { stats[1].querySelector('.stat-number').textContent = ab.s2n || ''; stats[1].querySelector('.stat-label').textContent = ab.s2l || ''; }
        if (stats[2]) { stats[2].querySelector('.stat-number').textContent = ab.s3n || ''; stats[2].querySelector('.stat-label').textContent = ab.s3l || ''; }
        if (ab.photo) setImg('.about-img-frame img', ab.photo);
    }

    // Skills
    if (d.skills) {
        var skCards = qa('.skill-card');
        d.skills.forEach(function(sk, i) {
            var card = skCards[i];
            if (!card) return;
            var t = card.querySelector('h3'); if (t && sk.title) t.textContent = sk.title;
            var desc = card.querySelector('.skill-desc'); if (desc && sk.desc) desc.textContent = sk.desc;
            var pct = card.querySelector('.skill-pct'); if (pct && sk.bar) pct.textContent = sk.bar + '%';
            var fill = card.querySelector('.skill-bar-fill'); if (fill && sk.bar) fill.style.width = sk.bar + '%';
            var tagEl = card.querySelector('.skill-bar-label span:first-child'); if (tagEl && sk.tags) tagEl.textContent = sk.tags.split(',')[0];
            var tagsWrap = card.querySelector('.skill-tags');
            if (tagsWrap && sk.tags) {
                tagsWrap.innerHTML = '';
                sk.tags.split(',').forEach(function(tag) {
                    var s = document.createElement('span');
                    s.textContent = tag.trim();
                    tagsWrap.appendChild(s);
                });
            }
        });
    }

    // Projects
    if (d.projects) {
        var prCards = qa('.project-card');
        d.projects.forEach(function(pr, i) {
            var card = prCards[i];
            if (!card) return;
            var title = card.querySelector('h3'); if (title && pr.title) title.textContent = pr.title;
            var desc = card.querySelector('p'); if (desc && pr.desc) desc.textContent = pr.desc;
            var year = card.querySelector('.project-meta'); if (year && pr.year) year.innerHTML = '<span class="material-icons">history</span> ' + pr.year;
            if (pr.image) {
                var img = card.querySelector('.project-img img');
                if (img) img.src = pr.image;
            }
            var tagsWrap = card.querySelector('.project-tags');
            if (tagsWrap && pr.tags) {
                tagsWrap.innerHTML = '';
                pr.tags.split(',').forEach(function(tag) {
                    var s = document.createElement('span');
                    s.textContent = tag.trim();
                    tagsWrap.appendChild(s);
                });
            }
        });
    }

    // Gallery
    if (d.gallery) {
        var glItems = qa('.masonry-item');
        d.gallery.forEach(function(g, i) {
            var item = glItems[i];
            if (!item) return;
            if (g.image) { var img = item.querySelector('img'); if (img) img.src = g.image; }
            var ov = item.querySelector('.masonry-overlay'); if (ov && g.label) ov.textContent = g.label;
        });
    }

    // PPP
    if (d.ppp) {
        var pppText = q('.ppp-text p');
        if (pppText && d.ppp.intro) pppText.innerHTML = d.ppp.intro;
        var items = qa('.ppp-highlight-item span');
        if (d.ppp.highlights) {
            var lines = d.ppp.highlights.split('\n').filter(function(l) { return l.trim(); });
            items.forEach(function(span, i) { if (lines[i]) span.textContent = lines[i]; });
        }
    }

    // Contact
    if (d.contact) {
        var ct = d.contact;
        var infoAs = qa('.contact-info a');
        if (infoAs[0]) { infoAs[0].textContent = ct.email; if (ct.emailhref) infoAs[0].href = ct.emailhref; }
        if (infoAs[1]) { infoAs[1].textContent = ct.phone; if (ct.phonehref) infoAs[1].href = ct.phonehref; }
    }
})();

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
    var phrases = window._adminPhrases || [
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
        'rgba(17, 82, 212, ',    // primary blue
        'rgba(124, 58, 237, ',   // purple
        'rgba(6, 182, 212, '     // cyan
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
                    ctx.strokeStyle = 'rgba(17, 82, 212, ' + (0.10 - dist / 2000) + ')';
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
                    ctx.strokeStyle = 'rgba(124, 58, 237, ' + (0.20 - distM / 1000) + ')';
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
})();
