/* ══════════════════════════════════════════
   ADMIN PANEL — admin.js
   CAKPOVI Victorine Emmanuella
   ══════════════════════════════════════════ */

var DEFAULT_PW = 've2026';  // ← Mot de passe par défaut (ne pas supprimer)

/* ── Defaults (valeurs par défaut du site) ── */
var DEFAULTS = {
    hero: {
        eyebrow: 'CAKPOVI',
        firstName: 'Victorine',
        lastName: 'Emmanuella',
        badge: 'Disponible pour opportunités',
        tagline: 'Concevoir des systèmes intelligents à la croisée de la mécanique, de l\'électronique et de l\'automatisation.',
        phrases: 'Étudiante en Génie Mécanique\nPassionnée de Mécatronique\nFuture Ingénieure en Robotique\nConception & Automatisation',
        photo: null
    },
    about: {
        p1: 'Je suis étudiante en deuxième année de <strong>Génie Mécanique</strong>, passionnée par la mécatronique et les systèmes automatisés intelligents. Je m\'intéresse à la conception mécanique, à la robotique et à l\'intégration de composants électroniques dans des systèmes fonctionnels.',
        p2: 'Je développe mes compétences à travers la <strong>modélisation 3D</strong>, l\'analyse de systèmes mécaniques et l\'étude des technologies d\'automatisation.',
        p3: 'Mon objectif est de devenir <strong>ingénieure en mécatronique</strong> et de contribuer à l\'innovation technologique industrielle.',
        s1n: '2', s1l: 'Années d\'études',
        s2n: '3+', s2l: 'Projets réalisés',
        s3n: '4', s3l: 'Domaines maîtrisés',
        photo: null
    },
    skills: [
        { title: 'Conception & CAO', desc: 'Modélisation et prototypage 3D pour systèmes mécaniques complexes.', bar: 90, tags: 'Dessin tech., Assemblages' },
        { title: 'Mécanique', desc: 'Analyse structurelle, résistance des matériaux et cinématique.', bar: 85, tags: 'Statique, Dynamique' },
        { title: 'Mécatronique', desc: 'Intégration de capteurs, actionneurs et unités de contrôle électronique.', bar: 80, tags: 'Arduino, Capteurs' },
        { title: 'Informatique Technique', desc: 'Calcul scientifique et simulation de systèmes pour la vérification ingénierie.', bar: 75, tags: 'Outils CAE, MATLAB' }
    ],
    projects: [
        { title: 'Modélisation 3D d\'un système mécanique', desc: 'Conception complète d\'un mécanisme en CAO avec simulation du mouvement. Modélisation d\'engrenage avec précision des dimensions et des tolérances.', tags: 'CAD, 3D, Simulation', year: '2024', image: null },
        { title: 'Analyse d\'un système mécatronique', desc: 'Étude du fonctionnement d\'un système combinant mécanique, électronique et contrôle. Travaux pratiques en automatisation et montage de circuits.', tags: 'Mécatronique, Électronique', year: '2024', image: null },
        { title: 'Travaux pratiques en atelier mécanique', desc: 'Usinage et fabrication de pièces mécaniques sur machine-outil. Maîtrise des techniques de tournage et respect des tolérances dimensionnelles.', tags: 'Usinage, Fabrication', year: '2023', image: null }
    ],
    gallery: [
        { label: 'Engrenages & CAO', sublabel: 'Modélisation 3D et simulation', image: null },
        { label: 'Mécatronique', sublabel: 'Circuits et systèmes automatisés', image: null },
        { label: 'Atelier Mécanique', sublabel: 'Usinage et fabrication', image: null },
        { label: 'Formation Académique', sublabel: 'Cours et travaux dirigés', image: null },
        { label: 'Passion & Innovation', sublabel: 'Curiosité et innovation', image: null }
    ],
    ppp: {
        intro: 'Mon projet personnel et professionnel est orienté vers une carrière dans le domaine de la <strong>mécatronique</strong> et de l\'ingénierie industrielle. Il reflète ma formation, mes motivations et ma vision à long terme.',
        highlights: 'Conception et interprétation de plans techniques\nAnalyse des systèmes mécatroniques\nOptimisation des flux de production\nNotions de Lean manufacturing\nBases de l\'automatisation industrielle\nOrganisation des postes de travail en atelier'
    },
    contact: {
        email: 'cakpovivictorine@gmail.com',
        phone: '99 98 18 67',
        emailhref: 'mailto:cakpovivictorine@gmail.com',
        phonehref: 'tel:+22999981867'
    }
};

/* ══ STATE ══ */
var data = {};
var pw = localStorage.getItem('adminPw') || DEFAULT_PW;

/* ══ LOAD DATA ══ */
function loadData() {
    var raw = localStorage.getItem('portfolioData');
    if (raw) {
        try { data = JSON.parse(raw); } catch(e) { data = JSON.parse(JSON.stringify(DEFAULTS)); }
    } else {
        data = JSON.parse(JSON.stringify(DEFAULTS));
    }
}

/* ══ SAVE DATA ══ */
function saveData() {
    collectFormValues();
    try {
        localStorage.setItem('portfolioData', JSON.stringify(data));
        showToast('Modifications sauvegardées !', 'success');
    } catch(e) {
        showToast('Erreur : données trop volumineuses (images trop lourdes).', 'error');
    }
}

/* ══ COLLECT FORM → DATA ══ */
function collectFormValues() {
    // Hero
    data.hero.eyebrow   = v('h_eyebrow');
    data.hero.firstName = v('h_firstName');
    data.hero.lastName  = v('h_lastName');
    data.hero.badge     = v('h_badge');
    data.hero.tagline   = v('h_tagline');
    data.hero.phrases   = v('h_phrases');

    // About
    data.about.p1  = v('ab_p1');
    data.about.p2  = v('ab_p2');
    data.about.p3  = v('ab_p3');
    data.about.s1n = v('ab_s1n'); data.about.s1l = v('ab_s1l');
    data.about.s2n = v('ab_s2n'); data.about.s2l = v('ab_s2l');
    data.about.s3n = v('ab_s3n'); data.about.s3l = v('ab_s3l');

    // Skills
    data.skills.forEach(function(sk, i) {
        sk.title = v('sk_title_' + i);
        sk.desc  = v('sk_desc_' + i);
        sk.bar   = v('sk_bar_' + i);
        sk.tags  = v('sk_tags_' + i);
    });

    // Projects
    data.projects.forEach(function(pr, i) {
        pr.title = v('pr_title_' + i);
        pr.desc  = v('pr_desc_' + i);
        pr.tags  = v('pr_tags_' + i);
        pr.year  = v('pr_year_' + i);
    });

    // Gallery
    data.gallery.forEach(function(g, i) {
        g.label    = v('gl_label_' + i);
        g.sublabel = v('gl_sub_' + i);
    });

    // PPP
    data.ppp.intro      = v('ppp_intro');
    data.ppp.highlights = v('ppp_highlights');

    // Contact
    data.contact.email     = v('ct_email');
    data.contact.phone     = v('ct_phone');
    data.contact.emailhref = v('ct_emailhref');
    data.contact.phonehref = v('ct_phonehref');
}

function v(id) {
    var el = document.getElementById(id);
    return el ? el.value : '';
}

/* ══ FILL FORM FROM DATA ══ */
function fillForm() {
    // Hero
    setVal('h_eyebrow',   data.hero.eyebrow);
    setVal('h_firstName', data.hero.firstName);
    setVal('h_lastName',  data.hero.lastName);
    setVal('h_badge',     data.hero.badge);
    setVal('h_tagline',   data.hero.tagline);
    setVal('h_phrases',   data.hero.phrases);
    if (data.hero.photo) document.getElementById('heroImgPreview').src = data.hero.photo;

    // About
    setVal('ab_p1',  data.about.p1);
    setVal('ab_p2',  data.about.p2);
    setVal('ab_p3',  data.about.p3);
    setVal('ab_s1n', data.about.s1n); setVal('ab_s1l', data.about.s1l);
    setVal('ab_s2n', data.about.s2n); setVal('ab_s2l', data.about.s2l);
    setVal('ab_s3n', data.about.s3n); setVal('ab_s3l', data.about.s3l);
    if (data.about.photo) document.getElementById('aboutImgPreview').src = data.about.photo;

    // Skills
    buildSkillsEditor();
    // Projects
    buildProjectsEditor();
    // Gallery
    buildGalleryEditor();

    // PPP
    setVal('ppp_intro',      data.ppp.intro);
    setVal('ppp_highlights', data.ppp.highlights);

    // Contact
    setVal('ct_email',     data.contact.email);
    setVal('ct_phone',     data.contact.phone);
    setVal('ct_emailhref', data.contact.emailhref);
    setVal('ct_phonehref', data.contact.phonehref);
}

function setVal(id, val) {
    var el = document.getElementById(id);
    if (el) el.value = val || '';
}

/* ══ BUILD DYNAMIC EDITORS ══ */
function buildSkillsEditor() {
    var container = document.getElementById('skillsEditor');
    container.innerHTML = '';
    var icons = ['view_in_ar', 'settings_input_component', 'memory', 'terminal'];
    data.skills.forEach(function(sk, i) {
        var div = document.createElement('div');
        div.className = 'repeat-block';
        div.innerHTML = '<h3><span class="material-icons">' + icons[i] + '</span> Compétence ' + (i+1) + '</h3>'
            + '<div class="form-grid">'
            + field('Titre', 'text', 'sk_title_' + i, sk.title)
            + field('Description', 'textarea', 'sk_desc_' + i, sk.desc)
            + field('Pourcentage (0-100)', 'text', 'sk_bar_' + i, sk.bar)
            + field('Tags (séparés par virgule)', 'text', 'sk_tags_' + i, sk.tags)
            + '</div>';
        container.appendChild(div);
    });
}

function buildProjectsEditor() {
    var container = document.getElementById('projectsEditor');
    container.innerHTML = '';
    var defaultImgs = ['gear3d.png', 'project1.jpeg', 'projet2.jpeg'];
    data.projects.forEach(function(pr, i) {
        var div = document.createElement('div');
        div.className = 'repeat-block';
        var imgSrc = pr.image || defaultImgs[i];
        div.innerHTML = '<h3><span class="material-icons">work</span> Projet ' + (i+1) + '</h3>'
            + '<div class="form-grid">'
            + field('Titre', 'text', 'pr_title_' + i, pr.title, 'full')
            + field('Description', 'textarea', 'pr_desc_' + i, pr.desc, 'full')
            + field('Tags (séparés par virgule)', 'text', 'pr_tags_' + i, pr.tags)
            + field('Année', 'text', 'pr_year_' + i, pr.year)
            + '<div class="form-group full"><label>Image du projet</label>'
            + '<div class="img-uploader" style="max-width:280px;height:180px;">'
            + '<img id="prImg_' + i + '" src="' + imgSrc + '" alt="Projet ' + (i+1) + '" style="height:180px;object-fit:cover;object-position:center 25%;">'
            + '<div class="img-uploader-overlay"><span class="material-icons">upload</span><span>Changer</span><input type="file" accept="image/*" data-idx="' + i + '" class="pr-img-input"></div>'
            + '</div></div>'
            + '</div>';
        container.appendChild(div);
    });
    // bind file inputs for projects
    document.querySelectorAll('.pr-img-input').forEach(function(inp) {
        inp.addEventListener('change', function() {
            var idx = parseInt(this.dataset.idx);
            readImage(this, function(b64) {
                data.projects[idx].image = b64;
                document.getElementById('prImg_' + idx).src = b64;
            });
        });
    });
}

function buildGalleryEditor() {
    var container = document.getElementById('galleryEditor');
    container.innerHTML = '';
    var defaultImgs = ['gear3d.png', 'project1.jpeg', 'projet2.jpeg', 'profile1.png', 'portrait.jpg'];
    var grid = document.createElement('div');
    grid.className = 'gallery-admin-grid';
    data.gallery.forEach(function(g, i) {
        var imgSrc = g.image || defaultImgs[i];
        var cell = document.createElement('div');
        cell.className = 'gallery-admin-item';
        cell.innerHTML = '<div class="img-uploader">'
            + '<img id="glImg_' + i + '" src="' + imgSrc + '" alt="Galerie ' + (i+1) + '">'
            + '<div class="img-uploader-overlay"><span class="material-icons">upload</span><span>Changer</span><input type="file" accept="image/*" data-idx="' + i + '" class="gl-img-input"></div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Légende principale</label><input type="text" id="gl_label_' + i + '" value="' + (g.label||'') + '">'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Sous-légende</label><input type="text" id="gl_sub_' + i + '" value="' + (g.sublabel||'') + '">'
            + '</div>';
        grid.appendChild(cell);
    });
    container.appendChild(grid);
    // bind file inputs for gallery
    document.querySelectorAll('.gl-img-input').forEach(function(inp) {
        inp.addEventListener('change', function() {
            var idx = parseInt(this.dataset.idx);
            readImage(this, function(b64) {
                data.gallery[idx].image = b64;
                document.getElementById('glImg_' + idx).src = b64;
            });
        });
    });
}

/* ── Helper: generate form field HTML ── */
function field(label, type, id, val, cls) {
    var extra = cls ? ' ' + cls : '';
    if (type === 'textarea') {
        return '<div class="form-group' + extra + '"><label>' + label + '</label><textarea id="' + id + '" rows="3">' + esc(val) + '</textarea></div>';
    }
    return '<div class="form-group' + extra + '"><label>' + label + '</label><input type="text" id="' + id + '" value="' + esc(val) + '"></div>';
}

function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ── Read image file as base64 ── */
function readImage(input, cb) {
    var file = input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) { cb(e.target.result); };
    reader.readAsDataURL(file);
}

/* ══ TOAST ══ */
function showToast(msg, type) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast show ' + (type || '');
    setTimeout(function() { t.className = 'toast'; }, 3500);
}

/* ══ LOGIN ══ */
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var input = document.getElementById('pwInput').value;
    pw = localStorage.getItem('adminPw') || DEFAULT_PW;
    if (input === pw) {
        sessionStorage.setItem('adminAuth', '1');
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        loadData();
        fillForm();
    } else {
        var err = document.getElementById('loginError');
        err.classList.add('show');
        document.getElementById('pwInput').value = '';
        setTimeout(function() { err.classList.remove('show'); }, 3000);
    }
});

/* ══ NAV TABS ══ */
document.querySelectorAll('.nav-item').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(function(b) { b.classList.remove('active'); });
        document.querySelectorAll('.panel').forEach(function(p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var sec = btn.dataset.section;
        var panel = document.getElementById('panel-' + sec);
        if (panel) panel.classList.add('active');
    });
});

/* ══ SAVE ALL ══ */
document.getElementById('saveAllBtn').addEventListener('click', saveData);

/* ══ RESET ALL ══ */
document.getElementById('resetAllBtn').addEventListener('click', function() {
    if (!confirm('Réinitialiser toutes les modifications ? Les données sauvegardées seront effacées.')) return;
    localStorage.removeItem('portfolioData');
    data = JSON.parse(JSON.stringify(DEFAULTS));
    fillForm();
    showToast('Réinitialisé aux valeurs par défaut.', 'success');
});

/* ══ PREVIEW ══ */
document.getElementById('previewBtn').addEventListener('click', function() {
    window.open('index.html', '_blank');
});

/* ══ LOGOUT ══ */
document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionStorage.removeItem('adminAuth');
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('pwInput').value = '';
});

/* ══ IMAGE UPLOAD — HERO ══ */
document.getElementById('heroImgInput').addEventListener('change', function() {
    readImage(this, function(b64) {
        data.hero.photo = b64;
        document.getElementById('heroImgPreview').src = b64;
    });
});

/* ══ IMAGE UPLOAD — ABOUT ══ */
document.getElementById('aboutImgInput').addEventListener('change', function() {
    readImage(this, function(b64) {
        data.about.photo = b64;
        document.getElementById('aboutImgPreview').src = b64;
    });
});

/* ══ CHANGE PASSWORD ══ */
document.getElementById('changePwBtn').addEventListener('click', function() {
    var n = document.getElementById('pw_new').value;
    var c = document.getElementById('pw_confirm').value;
    if (!n) { showToast('Entrez un nouveau mot de passe.', 'error'); return; }
    if (n !== c) { showToast('Les mots de passe ne correspondent pas.', 'error'); return; }
    if (n.length < 4) { showToast('Mot de passe trop court (min. 4 caractères).', 'error'); return; }
    localStorage.setItem('adminPw', n);
    document.getElementById('pw_new').value = '';
    document.getElementById('pw_confirm').value = '';
    showToast('Mot de passe mis à jour !', 'success');
});

/* ══ AUTO-LOGIN if session active ══ */
if (sessionStorage.getItem('adminAuth') === '1') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    loadData();
    fillForm();
}
