# Portfolio — CAKPOVI Victorine Emmanuella
> Génie Mécanique & Mécatronique

Site portfolio professionnel avec panneau d'administration intégré.

---

## Structure des fichiers

```
Portofolio/
├── index.html            ← Page principale du portfolio
├── admin.html            ← Panneau d'administration (protégé par mot de passe)
├── admin.css             ← Styles du panneau admin
├── admin.js              ← Logique admin (sauvegarde + publication GitHub)
├── css/style.css         ← Styles du portfolio
├── js/main.js            ← JavaScript du portfolio
├── favicon.svg           ← Favicon
├── portfolio-data.json   ← Données publiées (créé automatiquement par l'admin)
├── uploads/              ← Images uploadées via l'admin (créé automatiquement)
│   ├── hero-portrait.jpg
│   ├── about-photo.jpg
│   ├── project-1.jpg
│   └── ...
├── portrait.jpg          ← Photo hero par défaut
├── profile1.png          ← Photo À Propos par défaut
├── gear3d.png            ← Image projet 1 par défaut
├── project1.jpeg         ← Image projet 2 par défaut
├── projet2.jpeg          ← Image projet 3 par défaut
└── PPP.pdf               ← Document PPP téléchargeable
```

---

## Accès au panneau d'administration

1. Sur le site, cherche le symbole **⚙** discret en bas du footer (quasi invisible, visible au survol)
2. Clique dessus → tu arrives sur `admin.html`
3. **Mot de passe par défaut : `ve2026`**

---

## Comment publier des modifications sur le site

### Étape 1 — Créer un Token GitHub (PAT)

1. Va sur [github.com](https://github.com) et connecte-toi
2. Clique sur ta photo de profil → **Settings**
3. Dans le menu gauche, tout en bas → **Developer settings**
4. Clique **Personal access tokens** → **Tokens (classic)**
5. Clique **Generate new token (classic)**
6. Dans **Note**, écris : `Portfolio Admin`
7. Dans **Expiration**, choisis : `No expiration` (ou 90 jours)
8. Coche la case **`repo`** (accès complet aux dépôts)
9. Clique **Generate token** en bas
10. **Copie le token affiché** (il commence par `ghp_...`) — tu ne le reverras plus !

> ⚠️ Ne partage jamais ce token. Il donne accès à ton compte GitHub.

---

### Étape 2 — Configurer l'admin

1. Ouvre l'admin (`admin.html` → mot de passe `ve2026`)
2. Dans le menu gauche, clique **Publication GitHub**
3. Remplis les champs :

| Champ | Valeur |
|---|---|
| Nom d'utilisateur GitHub | `emmanuellacakpovi1-sys` (ton username) |
| Nom du dépôt | `Portofolio` |
| Branche | `main` |
| Token personnel GitHub | `ghp_xxxx...` (le token copié à l'étape 1) |

4. Clique **Enregistrer les paramètres GitHub**

---

### Étape 3 — Faire et publier des modifications

1. Dans l'admin, navigue dans les sections (Hero, À Propos, Projets, etc.)
2. Modifie les textes, images, etc.
3. Clique **Sauvegarder** (sauvegarde locale, pour prévisualiser sur ton appareil)
4. Clique **Voir le site** pour vérifier le rendu
5. Quand tout est bon → clique **Publier sur GitHub** (bouton violet dégradé en haut du menu)
6. Une barre de progression s'affiche, puis un message de confirmation
7. Attends **~2 minutes** → les changements sont en ligne pour tous les visiteurs !

---

## Comment fonctionne la publication

```
Admin Panel
    │
    ├─ 1. Upload images nouvelles → uploads/ (via GitHub API)
    │
    ├─ 2. Met à jour portfolio-data.json (via GitHub API)
    │
    └─ GitHub Pages redéploie automatiquement
           │
           └─ Visiteurs : fetch('portfolio-data.json') → changements appliqués (~2 min)
```

Le fichier `portfolio-data.json` contient toutes tes données (textes + chemins des images).
Le site le lit automatiquement à chaque visite et applique le contenu.

---

## Modifier le mot de passe admin

1. Dans l'admin → menu **Mot de passe**
2. Entre le nouveau mot de passe (min. 4 caractères)
3. Confirme → clique **Mettre à jour**

> Le mot de passe est sauvegardé dans ton navigateur localement.
> Si tu changes de navigateur/appareil, utilise le mot de passe par défaut `ve2026`.
> Pour changer le mot de passe par défaut définitivement, modifie la ligne
> `var DEFAULT_PW = 've2026';` dans le fichier `admin.js`.

---

## Modifier le PPP (fichier PDF)

Pour remplacer le fichier PDF du PPP :

```bash
# 1. Remplace le fichier PPP.pdf dans le dossier du projet
# 2. Puis dans un terminal :
git add PPP.pdf
git commit -m "Mise à jour du PPP"
git push
```

Le lien de téléchargement sur le site pointera automatiquement vers le nouveau fichier.

---

## Sections modifiables via l'admin

| Section | Ce qu'on peut modifier |
|---|---|
| **Accueil / Hero** | Nom, badge, tagline, phrases animées, photo principale |
| **À Propos** | 3 paragraphes de bio, 3 statistiques, photo |
| **Compétences** | Titre, description, pourcentage, tags — 4 cartes |
| **Projets** | Titre, description, tags, année, image — 3 projets |
| **Galerie** | Images + légendes — 5 cartes |
| **PPP** | Introduction + 6 points clés |
| **Contact** | Email, téléphone |
| **Mot de passe** | Accès admin |
| **Publication GitHub** | Token et paramètres de connexion |

---

## Dépannage

### "Configurez d'abord vos paramètres GitHub"
- Va dans le menu **Publication GitHub** et remplis tous les champs, puis clique **Enregistrer**

### "Erreur de publication : 401 / 403"
- Le token GitHub est incorrect ou expiré → génère-en un nouveau (voir Étape 1)
- Vérifie que le token a bien la permission **`repo`** cochée

### "Erreur de publication : 404"
- Vérifie le nom d'utilisateur GitHub (respecte les majuscules/minuscules)
- Vérifie le nom du dépôt (ex: `Portofolio` et non `portfolio`)

### "Images trop lourdes — Erreur lors de la sauvegarde locale"
- Compresse tes images avant de les uploader sur [squoosh.app](https://squoosh.app)
- Taille recommandée : **moins de 800 KB** par image

### "Les changements ne s'affichent pas après publication"
- Attends 2-3 minutes (GitHub Pages redéploie automatiquement)
- Vide le cache navigateur : **Ctrl+Shift+R** (Windows) ou **Cmd+Shift+R** (Mac)
- Vérifie que `portfolio-data.json` est bien présent dans ton dépôt GitHub

### "Mot de passe oublié"
- Ouvre les DevTools (F12) → onglet **Console**
- Tape : `localStorage.removeItem('adminPw')` puis **Entrée**
- Le mot de passe par défaut `ve2026` fonctionne à nouveau

---

*Portfolio réalisé en HTML/CSS/JS vanilla — © 2026 CAKPOVI Victorine Emmanuella*
