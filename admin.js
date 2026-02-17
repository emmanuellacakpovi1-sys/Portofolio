/* ══════════════════════════════════════════
   ADMIN PANEL — admin.js
   CAKPOVI Victorine Emmanuella
   ══════════════════════════════════════════ */

var DEFAULT_PW = 've2026';  // ← Changer ici si vous voulez un autre mot de passe par défaut

/* ══ DEFAULTS ══ */
var DEFAULTS = {
    hero: {
        eyebrow: 'CAKPOVI', firstName: 'Victorine', lastName: 'Emmanuella',
        badge: 'Disponible pour opportunités',
        tagline: 'Concevoir des systèmes intelligents à la croisée de la mécanique, de l\'électronique et de l\'automatisation.',
        phrases: 'Étudiante en Génie Mécanique\nPassionnée de Mécatronique\nFuture Ingénieure en Robotique\nConception & Automatisation',
        photo: null
    },
    about: {
        p1: 'Je suis étudiante en deuxième année de <strong>Génie Mécanique</strong>, passionnée par la mécatronique et les systèmes automatisés intelligents.',
        p2: 'Je développe mes compétences à travers la <strong>modélisation 3D</strong>, l\'analyse de systèmes mécaniques et l\'étude des technologies d\'automatisation.',
        p3: 'Mon objectif est de devenir <strong>ingénieure en mécatronique</strong> et de contribuer à l\'innovation technologique industrielle.',
        s1n: '2', s1l: 'Années d\'études', s2n: '3+', s2l: 'Projets réalisés', s3n: '4', s3l: 'Domaines maîtrisés',
        photo: null
    },
    skills: [
        { title: 'Conception & CAO', desc: 'Modélisation et prototypage 3D pour systèmes mécaniques complexes.', bar: 90, tags: 'Dessin tech., Assemblages' },
        { title: 'Mécanique', desc: 'Analyse structurelle, résistance des matériaux et cinématique.', bar: 85, tags: 'Statique, Dynamique' },
        { title: 'Mécatronique', desc: 'Intégration de capteurs, actionneurs et unités de contrôle électronique.', bar: 80, tags: 'Arduino, Capteurs' },
        { title: 'Informatique Technique', desc: 'Calcul scientifique et simulation de systèmes.', bar: 75, tags: 'Outils CAE, MATLAB' }
    ],
    projects: [
        { title: 'Modélisation 3D d\'un système mécanique', desc: 'Conception complète d\'un mécanisme en CAO avec simulation du mouvement.', tags: 'CAD, 3D, Simulation', year: '2024', image: null },
        { title: 'Analyse d\'un système mécatronique', desc: 'Étude du fonctionnement d\'un système combinant mécanique, électronique et contrôle.', tags: 'Mécatronique, Électronique', year: '2024', image: null },
        { title: 'Travaux pratiques en atelier mécanique', desc: 'Usinage et fabrication de pièces mécaniques sur machine-outil.', tags: 'Usinage, Fabrication', year: '2023', image: null }
    ],
    gallery: [
        { label: 'Engrenages & CAO', sublabel: 'Modélisation 3D et simulation', image: null },
        { label: 'Mécatronique', sublabel: 'Circuits et systèmes automatisés', image: null },
        { label: 'Atelier Mécanique', sublabel: 'Usinage et fabrication', image: null },
        { label: 'Formation Académique', sublabel: 'Cours et travaux dirigés', image: null },
        { label: 'Passion & Innovation', sublabel: 'Curiosité et innovation', image: null }
    ],
    ppp: {
        intro: 'Mon projet personnel et professionnel est orienté vers une carrière dans le domaine de la <strong>mécatronique</strong> et de l\'ingénierie industrielle.',
        highlights: 'Conception et interprétation de plans techniques\nAnalyse des systèmes mécatroniques\nOptimisation des flux de production\nNotions de Lean manufacturing\nBases de l\'automatisation industrielle\nOrganisation des postes de travail en atelier'
    },
    contact: {
        email: 'cakpovivictorine@gmail.com', phone: '99 98 18 67',
        emailhref: 'mailto:cakpovivictorine@gmail.com', phonehref: 'tel:+22999981867'
    }
};

var data = {};
var pw   = localStorage.getItem('adminPw') || DEFAULT_PW;

/* ══ LOAD / SAVE (localStorage) ══ */
function loadData() {
    var raw = localStorage.getItem('portfolioData');
    data = raw ? tryParse(raw, JSON.parse(JSON.stringify(DEFAULTS))) : JSON.parse(JSON.stringify(DEFAULTS));
}

function saveData() {
    collectFormValues();
    try {
        localStorage.setItem('portfolioData', JSON.stringify(data));
        showToast('Sauvegardé localement !', 'success');
    } catch(e) {
        showToast('Erreur : images trop lourdes. Réduisez la taille des photos.', 'error');
    }
}

function tryParse(str, fallback) {
    try { return JSON.parse(str); } catch(e) { return fallback; }
}

/* ══ COLLECT FORM → data ══ */
function collectFormValues() {
    var h = data.hero;
    h.eyebrow = v('h_eyebrow'); h.firstName = v('h_firstName'); h.lastName = v('h_lastName');
    h.badge = v('h_badge'); h.tagline = v('h_tagline'); h.phrases = v('h_phrases');

    var ab = data.about;
    ab.p1 = v('ab_p1'); ab.p2 = v('ab_p2'); ab.p3 = v('ab_p3');
    ab.s1n = v('ab_s1n'); ab.s1l = v('ab_s1l');
    ab.s2n = v('ab_s2n'); ab.s2l = v('ab_s2l');
    ab.s3n = v('ab_s3n'); ab.s3l = v('ab_s3l');

    data.skills.forEach(function(sk, i) {
        sk.title = v('sk_title_' + i); sk.desc = v('sk_desc_' + i);
        sk.bar   = v('sk_bar_' + i);  sk.tags = v('sk_tags_' + i);
    });
    data.projects.forEach(function(pr, i) {
        pr.title = v('pr_title_' + i); pr.desc = v('pr_desc_' + i);
        pr.tags  = v('pr_tags_' + i);  pr.year = v('pr_year_' + i);
    });
    data.gallery.forEach(function(g, i) {
        g.label = v('gl_label_' + i); g.sublabel = v('gl_sub_' + i);
    });
    data.ppp.intro = v('ppp_intro'); data.ppp.highlights = v('ppp_highlights');
    data.contact.email = v('ct_email'); data.contact.phone = v('ct_phone');
    data.contact.emailhref = v('ct_emailhref'); data.contact.phonehref = v('ct_phonehref');
}

/* ══ FILL FORM from data ══ */
function fillForm() {
    setVal('h_eyebrow', data.hero.eyebrow); setVal('h_firstName', data.hero.firstName);
    setVal('h_lastName', data.hero.lastName); setVal('h_badge', data.hero.badge);
    setVal('h_tagline', data.hero.tagline); setVal('h_phrases', data.hero.phrases);
    if (data.hero.photo) document.getElementById('heroImgPreview').src = data.hero.photo;

    setVal('ab_p1', data.about.p1); setVal('ab_p2', data.about.p2); setVal('ab_p3', data.about.p3);
    setVal('ab_s1n', data.about.s1n); setVal('ab_s1l', data.about.s1l);
    setVal('ab_s2n', data.about.s2n); setVal('ab_s2l', data.about.s2l);
    setVal('ab_s3n', data.about.s3n); setVal('ab_s3l', data.about.s3l);
    if (data.about.photo) document.getElementById('aboutImgPreview').src = data.about.photo;

    buildSkillsEditor(); buildProjectsEditor(); buildGalleryEditor();

    setVal('ppp_intro', data.ppp.intro); setVal('ppp_highlights', data.ppp.highlights);
    setVal('ct_email', data.contact.email); setVal('ct_phone', data.contact.phone);
    setVal('ct_emailhref', data.contact.emailhref); setVal('ct_phonehref', data.contact.phonehref);

    // GitHub settings
    var gs = getGhSettings();
    setVal('gh_user', gs.user); setVal('gh_repo', gs.repo);
    setVal('gh_branch', gs.branch || 'main'); setVal('gh_token', gs.token);
}

/* ══ DYNAMIC EDITORS ══ */
var SKILL_ICONS = ['view_in_ar','settings_input_component','memory','terminal'];
var DEFAULT_PR_IMGS = ['gear3d.png','project1.jpeg','projet2.jpeg'];
var DEFAULT_GL_IMGS = ['gear3d.png','project1.jpeg','projet2.jpeg','profile1.png','portrait.jpg'];

function buildSkillsEditor() {
    var c = document.getElementById('skillsEditor'); c.innerHTML = '';
    data.skills.forEach(function(sk, i) {
        var d = document.createElement('div'); d.className = 'repeat-block';
        d.innerHTML = '<h3><span class="material-icons">' + SKILL_ICONS[i] + '</span> Compétence ' + (i+1) + '</h3>'
            + '<div class="form-grid">'
            + field('Titre','text','sk_title_'+i, sk.title)
            + field('Description','textarea','sk_desc_'+i, sk.desc)
            + field('Pourcentage (0-100)','text','sk_bar_'+i, sk.bar)
            + field('Tags (virgule)','text','sk_tags_'+i, sk.tags)
            + '</div>';
        c.appendChild(d);
    });
}

function buildProjectsEditor() {
    var c = document.getElementById('projectsEditor'); c.innerHTML = '';
    data.projects.forEach(function(pr, i) {
        var imgSrc = pr.image || DEFAULT_PR_IMGS[i];
        var d = document.createElement('div'); d.className = 'repeat-block';
        d.innerHTML = '<h3><span class="material-icons">work</span> Projet ' + (i+1) + '</h3>'
            + '<div class="form-grid">'
            + field('Titre','text','pr_title_'+i, pr.title,'full')
            + field('Description','textarea','pr_desc_'+i, pr.desc,'full')
            + field('Tags (virgule)','text','pr_tags_'+i, pr.tags)
            + field('Année','text','pr_year_'+i, pr.year)
            + '<div class="form-group full"><label>Image</label>'
            + '<div class="img-uploader" style="max-width:280px;height:180px;">'
            + '<img id="prImg_'+i+'" src="'+imgSrc+'" style="height:180px;object-fit:cover;object-position:center 25%;">'
            + '<div class="img-uploader-overlay"><span class="material-icons">upload</span><span>Changer</span>'
            + '<input type="file" accept="image/*" data-idx="'+i+'" class="pr-img-input"></div></div></div>'
            + '</div>';
        c.appendChild(d);
    });
    document.querySelectorAll('.pr-img-input').forEach(function(inp) {
        inp.addEventListener('change', function() {
            var idx = parseInt(this.dataset.idx);
            readImage(this, function(b64) { data.projects[idx].image = b64; document.getElementById('prImg_'+idx).src = b64; });
        });
    });
}

function buildGalleryEditor() {
    var c = document.getElementById('galleryEditor'); c.innerHTML = '';
    var grid = document.createElement('div'); grid.className = 'gallery-admin-grid';
    data.gallery.forEach(function(g, i) {
        var imgSrc = g.image || DEFAULT_GL_IMGS[i];
        var cell = document.createElement('div'); cell.className = 'gallery-admin-item';
        cell.innerHTML = '<div class="img-uploader"><img id="glImg_'+i+'" src="'+imgSrc+'">'
            + '<div class="img-uploader-overlay"><span class="material-icons">upload</span><span>Changer</span>'
            + '<input type="file" accept="image/*" data-idx="'+i+'" class="gl-img-input"></div></div>'
            + '<div class="form-group"><label>Légende</label><input type="text" id="gl_label_'+i+'" value="'+esc(g.label||'')+'"></div>'
            + '<div class="form-group"><label>Sous-légende</label><input type="text" id="gl_sub_'+i+'" value="'+esc(g.sublabel||'')+'"></div>';
        grid.appendChild(cell);
    });
    c.appendChild(grid);
    document.querySelectorAll('.gl-img-input').forEach(function(inp) {
        inp.addEventListener('change', function() {
            var idx = parseInt(this.dataset.idx);
            readImage(this, function(b64) { data.gallery[idx].image = b64; document.getElementById('glImg_'+idx).src = b64; });
        });
    });
}

/* ══ GITHUB SETTINGS ══ */
function getGhSettings() {
    return {
        user:   localStorage.getItem('gh_user') || '',
        repo:   localStorage.getItem('gh_repo') || '',
        branch: localStorage.getItem('gh_branch') || 'main',
        token:  localStorage.getItem('gh_token') || ''
    };
}
function saveGhSettings() {
    localStorage.setItem('gh_user',   v('gh_user'));
    localStorage.setItem('gh_repo',   v('gh_repo'));
    localStorage.setItem('gh_branch', v('gh_branch') || 'main');
    localStorage.setItem('gh_token',  v('gh_token'));
    showToast('Paramètres GitHub enregistrés !', 'success');
}
document.getElementById('saveGhBtn').addEventListener('click', saveGhSettings);

/* ══ GITHUB API — PUBLISH ══ */
async function publishToGitHub() {
    var gs = getGhSettings();
    if (!gs.token || !gs.user || !gs.repo) {
        showToast('Configurez d\'abord vos paramètres GitHub (onglet Publication).', 'error');
        document.querySelector('[data-section="github"]').click();
        return;
    }

    collectFormValues();
    var publishBtn = document.getElementById('publishBtn');
    publishBtn.disabled = true;
    showPublishStatus(true);

    var dataToPublish = JSON.parse(JSON.stringify(data));
    var errors = [];

    try {
        // ── Step 1: Upload hero image ──
        setProgress(10, 'Upload de la photo principale...');
        if (data.hero.photo && data.hero.photo.startsWith('data:')) {
            var heroPath = await ghUploadImage(gs, data.hero.photo, 'uploads/hero-portrait.jpg');
            if (heroPath) dataToPublish.hero.photo = heroPath;
            else errors.push('Photo hero');
        }

        // ── Step 2: Upload about image ──
        setProgress(25, 'Upload de la photo À Propos...');
        if (data.about.photo && data.about.photo.startsWith('data:')) {
            var aboutPath = await ghUploadImage(gs, data.about.photo, 'uploads/about-photo.jpg');
            if (aboutPath) dataToPublish.about.photo = aboutPath;
            else errors.push('Photo about');
        }

        // ── Step 3: Upload project images ──
        setProgress(40, 'Upload des images de projets...');
        for (var pi = 0; pi < data.projects.length; pi++) {
            if (data.projects[pi].image && data.projects[pi].image.startsWith('data:')) {
                var prPath = await ghUploadImage(gs, data.projects[pi].image, 'uploads/project-' + (pi+1) + '.jpg');
                if (prPath) dataToPublish.projects[pi].image = prPath;
                else errors.push('Image projet ' + (pi+1));
            }
        }

        // ── Step 4: Upload gallery images ──
        setProgress(60, 'Upload des images de la galerie...');
        for (var gi = 0; gi < data.gallery.length; gi++) {
            if (data.gallery[gi].image && data.gallery[gi].image.startsWith('data:')) {
                var glPath = await ghUploadImage(gs, data.gallery[gi].image, 'uploads/gallery-' + (gi+1) + '.jpg');
                if (glPath) dataToPublish.gallery[gi].image = glPath;
                else errors.push('Image galerie ' + (gi+1));
            }
        }

        // ── Step 5: Push portfolio-data.json ──
        setProgress(80, 'Publication du fichier de données...');
        var jsonContent = JSON.stringify(dataToPublish, null, 2);
        var ok = await ghUpdateFile(gs, 'portfolio-data.json', jsonContent, 'Admin: mise à jour du portfolio');
        if (!ok) throw new Error('Échec de la mise à jour de portfolio-data.json');

        setProgress(100, 'Publié avec succès ! ✓');
        var msg = 'Publié sur GitHub ! Changements visibles dans ~2 minutes.';
        if (errors.length) msg += ' (Erreurs : ' + errors.join(', ') + ')';
        showToast(msg, 'success');

        // Also save to localStorage for local preview
        localStorage.setItem('portfolioData', JSON.stringify(data));

    } catch(err) {
        setProgress(0, 'Erreur : ' + err.message);
        showToast('Erreur de publication : ' + err.message, 'error');
        console.error(err);
    }

    publishBtn.disabled = false;
}

/* ── GitHub API: upload image (base64 data URL → repo file) ── */
async function ghUploadImage(gs, dataUrl, filePath) {
    // Extract raw base64 (remove "data:image/...;base64," prefix)
    var base64 = dataUrl.split(',')[1];
    if (!base64) return null;
    return await ghUpdateFile(gs, filePath, null, 'Admin: upload image ' + filePath, base64);
}

/* ── GitHub API: create or update a file in repo ── */
async function ghUpdateFile(gs, filePath, textContent, commitMsg, rawBase64) {
    var apiBase = 'https://api.github.com/repos/' + gs.user + '/' + gs.repo + '/contents/' + filePath;
    var headers = {
        'Authorization': 'token ' + gs.token,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
    };

    // Get current SHA (needed for update)
    var sha = null;
    try {
        var getResp = await fetch(apiBase + '?ref=' + gs.branch, { headers: headers });
        if (getResp.ok) {
            var fileData = await getResp.json();
            sha = fileData.sha;
        }
    } catch(e) { /* file doesn't exist yet, sha stays null */ }

    // Prepare content
    var content64;
    if (rawBase64) {
        content64 = rawBase64;  // already base64 (image)
    } else {
        // Text content → base64
        content64 = btoa(unescape(encodeURIComponent(textContent)));
    }

    var body = { message: commitMsg, content: content64, branch: gs.branch };
    if (sha) body.sha = sha;

    var putResp = await fetch(apiBase, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    });

    if (!putResp.ok) {
        var errData = await putResp.json();
        throw new Error(filePath + ': ' + (errData.message || putResp.status));
    }

    // Return the path that the main site will use
    return filePath;
}

/* ── Publish progress UI ── */
function showPublishStatus(show) {
    var el = document.getElementById('publishStatus');
    if (el) el.style.display = show ? 'block' : 'none';
}
function setProgress(pct, msg) {
    var bar = document.getElementById('publishBar');
    var txt = document.getElementById('publishStatusText');
    if (bar) bar.style.width = pct + '%';
    if (txt) txt.textContent = msg;
}

/* ══ TOAST ══ */
function showToast(msg, type) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.className = 'toast show ' + (type || '');
    setTimeout(function() { t.className = 'toast'; }, 4000);
}

/* ══ HELPERS ══ */
function v(id)    { var e = document.getElementById(id); return e ? e.value : ''; }
function setVal(id, val) { var e = document.getElementById(id); if (e) e.value = val || ''; }
function esc(s)   { return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function field(label, type, id, val, cls) {
    var ex = cls ? ' '+cls : '';
    if (type==='textarea') return '<div class="form-group'+ex+'"><label>'+label+'</label><textarea id="'+id+'" rows="3">'+esc(val)+'</textarea></div>';
    return '<div class="form-group'+ex+'"><label>'+label+'</label><input type="text" id="'+id+'" value="'+esc(val)+'"></div>';
}
function readImage(input, cb) {
    var f = input.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function(e) { cb(e.target.result); };
    r.readAsDataURL(f);
}

/* ══ LOGIN ══ */
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    pw = localStorage.getItem('adminPw') || DEFAULT_PW;
    if (document.getElementById('pwInput').value === pw) {
        sessionStorage.setItem('adminAuth', '1');
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('dashboard').style.display  = 'flex';
        loadData(); fillForm();
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
        var panel = document.getElementById('panel-' + btn.dataset.section);
        if (panel) panel.classList.add('active');
    });
});

/* ══ BUTTON EVENTS ══ */
document.getElementById('saveAllBtn').addEventListener('click', saveData);
document.getElementById('publishBtn').addEventListener('click', publishToGitHub);
document.getElementById('resetAllBtn').addEventListener('click', function() {
    if (!confirm('Réinitialiser toutes les modifications ?')) return;
    localStorage.removeItem('portfolioData');
    data = JSON.parse(JSON.stringify(DEFAULTS));
    fillForm();
    showToast('Réinitialisé aux valeurs par défaut.', 'success');
});
document.getElementById('previewBtn').addEventListener('click', function() { window.open('index.html','_blank'); });
document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionStorage.removeItem('adminAuth');
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('pwInput').value = '';
});

/* ══ IMAGE UPLOADS — HERO & ABOUT ══ */
document.getElementById('heroImgInput').addEventListener('change', function() {
    readImage(this, function(b64) { data.hero.photo = b64; document.getElementById('heroImgPreview').src = b64; });
});
document.getElementById('aboutImgInput').addEventListener('change', function() {
    readImage(this, function(b64) { data.about.photo = b64; document.getElementById('aboutImgPreview').src = b64; });
});

/* ══ CHANGE PASSWORD ══ */
document.getElementById('changePwBtn').addEventListener('click', function() {
    var n = v('pw_new'), c = v('pw_confirm');
    if (!n)       { showToast('Entrez un nouveau mot de passe.', 'error'); return; }
    if (n !== c)  { showToast('Les mots de passe ne correspondent pas.', 'error'); return; }
    if (n.length < 4) { showToast('Mot de passe trop court (min. 4 caractères).', 'error'); return; }
    localStorage.setItem('adminPw', n);
    setVal('pw_new',''); setVal('pw_confirm','');
    showToast('Mot de passe mis à jour !', 'success');
});

/* ══ AUTO-LOGIN (session) ══ */
if (sessionStorage.getItem('adminAuth') === '1') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display  = 'flex';
    loadData(); fillForm();
}
