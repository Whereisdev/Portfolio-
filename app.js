/**
 * PORTFOLIO IBRAHIM BORÉ - APPLICATION LOGIC & I18N SYSTEM
 * Navigation IDE, Détection & commutation de langue (EN/FR), 
 * Arborescence de fichiers interactive, Live Code Preview et Validation de formulaire.
 */

// État global de l'application
const AppState = {
  currentLang: 'en',
  currentAboutFile: 'personal-info', // 'personal-info' | 'looking-for' | 'how-i-work'
  activeTab: 'hello'
};

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initTabs();
  initAboutEditor();
  initLineNumbers();
  initContactLivePreview();
  initFormValidation();
  initMobileMenu();
  handleHashNavigation();
});

/* ==========================================================================
   1. SYSTÈME D'INTERNATIONALISATION (I18N) & DÉTECTION STRICTE DES PRIORITÉS
   ========================================================================== */

/**
 * Détection de la langue selon les 4 priorités strictes :
 * 1. Préférence explicite enregistrée dans le localStorage
 * 2. Langue du navigateur (famille 'fr' ou 'en')
 * 3. Fuseau horaire / géolocalisation francophone de repli
 * 4. Repli final sur l'anglais ('en')
 */
function detectInitialLanguage() {
  // Priorité 1 : Choix explicite de l'utilisateur
  try {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved === 'fr' || saved === 'en') {
      return saved;
    }
  } catch (e) {
    console.warn('localStorage non accessible :', e);
  }

  // Priorité 2 : Langue du navigateur
  const browserLanguages = navigator.languages || [navigator.language || navigator.userLanguage || ''];
  for (const lang of browserLanguages) {
    if (!lang) continue;
    const lower = lang.toLowerCase();
    if (lower.startsWith('fr')) {
      return 'fr';
    }
    if (lower.startsWith('en')) {
      return 'en';
    }
  }

  // Priorité 3 : Fuseau horaire francophone (fallback géographique sans API externe fragile)
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const francophoneZones = [
      'Africa/Bamako', 'Africa/Dakar', 'Africa/Abidjan', 'Africa/Ouagadougou',
      'Africa/Niamey', 'Africa/Conakry', 'Africa/Porto-Novo', 'Africa/Lome',
      'Africa/Douala', 'Africa/Kinshasa', 'Africa/Lubumbashi', 'Africa/Brazzaville',
      'Africa/Libreville', 'Africa/Ndjamena', 'Africa/N_Djamena', 'Africa/Bangui',
      'Europe/Paris', 'Europe/Brussels', 'Europe/Monaco', 'Europe/Luxembourg',
      'America/Montreal', 'Indian/Antananarivo'
    ];

    if (francophoneZones.some(zone => timeZone.toLowerCase().includes(zone.toLowerCase()))) {
      return 'fr';
    }
  } catch (e) {
    // Ignorer si Intl non supporté
  }

  // Priorité 4 : Fallback anglais par défaut
  return 'en';
}

/**
 * Initialisation du système i18n
 */
function initI18n() {
  const initialLang = detectInitialLanguage();
  setLanguage(initialLang, false);

  // Écouteurs pour le switcher de langue
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selected = btn.dataset.lang;
      if (selected && selected !== AppState.currentLang) {
        setLanguage(selected, true);
      }
    });
  });
}

/**
 * Application de la langue sélectionnée
 * @param {string} lang - 'fr' | 'en'
 * @param {boolean} savePreference - true si action explicite utilisateur
 */
function setLanguage(lang, savePreference = true) {
  if (lang !== 'fr' && lang !== 'en') lang = 'en';
  AppState.currentLang = lang;

  if (savePreference) {
    try {
      localStorage.setItem('preferredLanguage', lang);
    } catch (e) {
      console.warn('Impossible de sauvegarder dans localStorage :', e);
    }
  }

  // Mise à jour de l'attribut HTML lang
  document.documentElement.setAttribute('lang', lang);

  const t = translations[lang];
  if (!t) return;

  // Mise à jour SEO (Titre et Meta description)
  if (t.meta) {
    if (t.meta.title) document.title = t.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t.meta.description) {
      metaDesc.setAttribute('content', t.meta.description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && t.meta.title) {
      ogTitle.setAttribute('content', t.meta.title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && t.meta.description) {
      ogDesc.setAttribute('content', t.meta.description);
    }
  }

  // Mise à jour des boutons du switcher
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    const isSelected = btn.dataset.lang === lang;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
  });

  // Traduction automatique des éléments avec data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getTranslationValue(t, key);
    if (val !== undefined) {
      el.textContent = val;
    }
  });

  // Traduction des éléments avec data-i18n-html (pour texte avec <br> ou balises)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const val = getTranslationValue(t, key);
    if (val !== undefined) {
      el.innerHTML = val;
    }
  });

  // Traduction des placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = getTranslationValue(t, key);
    if (val !== undefined) {
      el.setAttribute('placeholder', val);
    }
  });

  // Traduction des aria-label
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    const val = getTranslationValue(t, key);
    if (val !== undefined) {
      el.setAttribute('aria-label', val);
    }
  });

  // Traduction des titres (tooltips)
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const val = getTranslationValue(t, key);
    if (val !== undefined) {
      el.setAttribute('title', val);
    }
  });

  // Rafraîchir l'éditeur About actif et la preview Contact
  renderAboutEditorFile(AppState.currentAboutFile);
  updateContactDatePreview();
}

/**
 * Résolution des clés d'accès imbriquées (ex: 'hero.headline')
 */
function getTranslationValue(obj, keyPath) {
  if (!obj || !keyPath) return undefined;
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
}


/* ==========================================================================
   2. GESTION DES ONGLETS PRINCIPAUX (_hello, _about-me, _projects, _contact-me)
   ========================================================================== */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabTarget = btn.dataset.tab;
      if (tabTarget) {
        switchTab(tabTarget);
      }
    });
  });
}

function switchTab(tabName) {
  AppState.activeTab = tabName;

  // Mise à jour des boutons d'onglets
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Mise à jour des sections de vue
  const tabViews = document.querySelectorAll('.tab-view');
  tabViews.forEach(view => {
    if (view.id === `view-${tabName}`) {
      view.classList.add('active');
      view.scrollTop = 0;
    } else {
      view.classList.remove('active');
    }
  });

  // Mise à jour de l'URL hash sans recharger
  if (history.pushState) {
    history.pushState(null, null, `#${tabName}`);
  } else {
    location.hash = `#${tabName}`;
  }

  // Fermer le menu mobile s'il était ouvert
  const navTabs = document.getElementById('navTabs');
  if (navTabs && navTabs.classList.contains('open')) {
    navTabs.classList.remove('open');
  }
}

function handleHashNavigation() {
  const hash = window.location.hash.replace('#', '');
  if (hash && ['hello', 'about', 'projects', 'contact'].includes(hash)) {
    switchTab(hash);
  }
}

window.addEventListener('popstate', () => {
  handleHashNavigation();
});


/* ==========================================================================
   3. MENU MOBILE
   ========================================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navTabs = document.getElementById('navTabs');

  if (mobileBtn && navTabs) {
    mobileBtn.addEventListener('click', () => {
      navTabs.classList.toggle('open');
    });
  }
}


/* ==========================================================================
   4. ARBORESCENCE EXPLORER ET ÉDITEUR MULTI-FICHIERS (_about-me)
   ========================================================================== */
function toggleTreeSection(headerEl) {
  const section = headerEl.closest('.tree-section');
  if (section) {
    section.classList.toggle('open');
  }
}

function toggleSubfolder(subHeaderEl) {
  const subfolder = subHeaderEl.closest('.tree-subfolder');
  if (subfolder) {
    subfolder.classList.toggle('open');
  }
}

function initAboutEditor() {
  // Onglets dans l'éditeur
  const editorTabs = document.querySelectorAll('.editor-tab-item');
  editorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const file = tab.dataset.file;
      if (file) selectAboutFile(file);
    });
  });
}

function selectAboutFile(fileId) {
  AppState.currentAboutFile = fileId;

  // Mise à jour de l'élément actif dans l'arborescence
  const treeItems = document.querySelectorAll('.tree-item');
  treeItems.forEach(item => {
    if (item.dataset.file === fileId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Mise à jour des onglets de l'éditeur
  const editorTabs = document.querySelectorAll('.editor-tab-item');
  editorTabs.forEach(tab => {
    if (tab.dataset.file === fileId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  renderAboutEditorFile(fileId);

  // Scroll doux vers l'éditeur sur mobile si nécessaire
  const editorPane = document.querySelector('.editor-pane');
  if (editorPane && window.innerWidth <= 768) {
    editorPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function selectAboutTab(type) {
  if (type === 'skills') {
    const treeItems = document.querySelectorAll('.tree-item');
    treeItems.forEach(item => {
      if (item.dataset.action === 'skills') item.classList.add('active');
      else item.classList.remove('active');
    });
    const skillsPane = document.querySelector('.skills-pane');
    if (skillsPane) {
      skillsPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else if (type === 'bio') {
    selectAboutFile('personal-info');
  } else if (type === 'looking-for') {
    selectAboutFile('looking-for');
  } else if (type === 'how-i-work') {
    selectAboutFile('how-i-work');
  }
}

function renderAboutEditorFile(fileId) {
  const codeContainer = document.getElementById('aboutEditorCode');
  const fileNameEl = document.getElementById('activeAboutFileName');
  const t = translations[AppState.currentLang] || translations.en;

  if (!codeContainer) return;

  let html = '';
  let lineCount = 28;

  if (fileId === 'looking-for') {
    if (fileNameEl) fileNameEl.textContent = t.about.tabLookingForName;
    lineCount = 26;
    html = `
      <p class="code-doc"><span class="doc-star">/**</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> <span class="syntax-keyword">@section</span> ${t.about.lookingForDocTitle}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.lookingForDoc1}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.lookingForDoc2}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.lookingForDoc3}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.lookingForDoc4}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.lookingForDoc5}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.lookingForDoc6}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.lookingForDoc7}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.lookingForDoc8}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.lookingForDoc9}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.lookingForDoc10}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.lookingForDoc11}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*/</span></p>
      <div class="code-interactive-block">
        <p><span class="syntax-keyword">export const</span> <span class="syntax-variable">careerObjectives</span> = {</p>
        <p class="indent-1"><span class="syntax-property">roleFocus</span>: <span class="syntax-string">"Full-Stack / Frontend Engineering"</span>,</p>
        <p class="indent-1"><span class="syntax-property">teamCulture</span>: <span class="syntax-string">"High engineering standards · Mentorship · Ownership"</span>,</p>
        <p class="indent-1"><span class="syntax-property">openTo</span>: [<span class="syntax-string">"Full-time"</span>, <span class="syntax-string">"Apprenticeship"</span>, <span class="syntax-string">"Mission"</span>]</p>
        <p>};</p>
      </div>
    `;
  } else if (fileId === 'how-i-work') {
    if (fileNameEl) fileNameEl.textContent = t.about.tabHowIWorkName;
    lineCount = 24;
    html = `
      <p class="code-doc"><span class="doc-star">/**</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> <span class="syntax-keyword">@workflow</span> ${t.about.howIWorkDocTitle}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> <span class="syntax-keyword">###</span> ${t.about.step1Title}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.step1Desc}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> <span class="syntax-keyword">###</span> ${t.about.step2Title}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.step2Desc}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> <span class="syntax-keyword">###</span> ${t.about.step3Title}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.step3Desc}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*/</span></p>
      <div class="code-interactive-block">
        <p><span class="syntax-keyword">export function</span> <span class="syntax-function">buildProcess</span>() {</p>
        <p class="indent-1"><span class="syntax-keyword">return</span> [<span class="syntax-string">"Understand"</span>, <span class="syntax-string">"Decompose"</span>, <span class="syntax-string">"Build"</span>, <span class="syntax-string">"Review"</span>, <span class="syntax-string">"Iterate"</span>];</p>
        <p>}</p>
      </div>
    `;
  } else {
    // Par défaut : personal-info.js
    if (fileNameEl) fileNameEl.textContent = t.about.tabFileName;
    lineCount = 30;
    html = `
      <p class="code-doc"><span class="doc-star">/**</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> <span class="syntax-keyword">@name</span> Ibrahim Boré</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> <span class="syntax-keyword">@role</span> ${t.about.roleDoc}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> <span class="syntax-keyword">@location</span> ${t.about.locationDoc}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.bioP1}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.bioP2}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.bioP3}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.bioP4}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.bioP5}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.bioP6}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.bioP7}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span></p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.bioP8}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.bioP9}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.bioP10}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*</span> ${t.about.bioP11}</p>
      <p class="code-doc"><span class="doc-star">&nbsp;*/</span></p>
      
      <div class="code-interactive-block">
        <p><span class="syntax-keyword">export const</span> <span class="syntax-variable">devProfile</span> = {</p>
        <p class="indent-1"><span class="syntax-property">status</span>: <span class="syntax-string">"${t.about.profileStatus}"</span>,</p>
        <p class="indent-1"><span class="syntax-property">level</span>: <span class="syntax-string">"${t.about.profileLevel}"</span>,</p>
        <p class="indent-1"><span class="syntax-property">mainStack</span>: [<span class="syntax-string">"HTML"</span>, <span class="syntax-string">"CSS"</span>, <span class="syntax-string">"JavaScript"</span>, <span class="syntax-string">"React"</span>, <span class="syntax-string">"Next.js"</span>],</p>
        <p class="indent-1"><span class="syntax-property">backend</span>: [<span class="syntax-string">"Node.js"</span>, <span class="syntax-string">"Express"</span>, <span class="syntax-string">"PostgreSQL"</span>, <span class="syntax-string">"Supabase"</span>, <span class="syntax-string">"PHP"</span>]</p>
        <p>};</p>
      </div>
    `;
  }

  codeContainer.innerHTML = html;

  // Régénération des numéros de ligne
  const aboutLineNumbers = document.getElementById('aboutLineNumbers');
  if (aboutLineNumbers) {
    let numbersHtml = '';
    for (let i = 1; i <= lineCount; i++) {
      numbersHtml += `<div>${i}</div>`;
    }
    aboutLineNumbers.innerHTML = numbersHtml;
  }
}


/* ==========================================================================
   5. GÉNÉRATION DES NUMÉROS DE LIGNE POUR L'ÉDITEUR
   ========================================================================== */
function initLineNumbers() {
  const contactLineNumbers = document.getElementById('contactLineNumbers');
  if (contactLineNumbers) {
    let numbersHtml = '';
    for (let i = 1; i <= 15; i++) {
      numbersHtml += `<div>${i}</div>`;
    }
    contactLineNumbers.innerHTML = numbersHtml;
  }
}


/* ==========================================================================
   6. DÉFILEMENT FLUIDE VERS UN PROJET
   ========================================================================== */
function scrollToProject(projectId) {
  const projectEl = document.getElementById(projectId);
  if (projectEl) {
    projectEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Mise à jour de l'élément actif dans la sidebar des projets
    const navItems = document.querySelectorAll('.project-nav-item');
    navItems.forEach(item => {
      if (item.getAttribute('onclick')?.includes(projectId)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}


/* ==========================================================================
   7. LIVE CODE PREVIEW DYNAMIQUE (_contact-me)
   ========================================================================== */
function updateContactDatePreview() {
  const codeValDate = document.getElementById('codeValDate');
  if (!codeValDate) return;
  const t = translations[AppState.currentLang] || translations.en;
  try {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    codeValDate.textContent = `"${new Date().toLocaleDateString(t.contact.dateLocale, options)}"`;
  } catch (e) {
    codeValDate.textContent = `"${t.contact.dateDefault}"`;
  }
}

function initContactLivePreview() {
  const inputName = document.getElementById('inputName');
  const inputEmail = document.getElementById('inputEmail');
  const inputMessage = document.getElementById('inputMessage');

  const codeValName = document.getElementById('codeValName');
  const codeValEmail = document.getElementById('codeValEmail');
  const codeValMessage = document.getElementById('codeValMessage');

  updateContactDatePreview();

  if (inputName && codeValName) {
    inputName.addEventListener('input', (e) => {
      codeValName.textContent = JSON.stringify(e.target.value || '');
    });
  }

  if (inputEmail && codeValEmail) {
    inputEmail.addEventListener('input', (e) => {
      codeValEmail.textContent = JSON.stringify(e.target.value || '');
    });
  }

  if (inputMessage && codeValMessage) {
    inputMessage.addEventListener('input', (e) => {
      codeValMessage.textContent = JSON.stringify(e.target.value || '');
    });
  }
}


/* ==========================================================================
   8. VALIDATION ET SOUMISSION DU FORMULAIRE DE CONTACT
   ========================================================================== */
function initFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const inputName = document.getElementById('inputName');
  const inputEmail = document.getElementById('inputEmail');
  const inputMessage = document.getElementById('inputMessage');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorMessage = document.getElementById('error-message');
  const formStatus = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const t = translations[AppState.currentLang] || translations.en;
    let isValid = true;

    // Reset des erreurs
    errorName.textContent = '';
    errorEmail.textContent = '';
    errorMessage.textContent = '';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    // Validation Nom
    if (!inputName.value.trim()) {
      errorName.textContent = t.contact.errNameRequired;
      isValid = false;
    } else if (inputName.value.trim().length < 2) {
      errorName.textContent = t.contact.errNameLength;
      isValid = false;
    }

    // Validation Email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!inputEmail.value.trim()) {
      errorEmail.textContent = t.contact.errEmailRequired;
      isValid = false;
    } else if (!emailRegex.test(inputEmail.value.trim())) {
      errorEmail.textContent = t.contact.errEmailInvalid;
      isValid = false;
    }

    // Validation Message
    if (!inputMessage.value.trim()) {
      errorMessage.textContent = t.contact.errMessageRequired;
      isValid = false;
    } else if (inputMessage.value.trim().length < 5) {
      errorMessage.textContent = t.contact.errMessageLength;
      isValid = false;
    }

    if (!isValid) return;

    // Simulation d'envoi réussi
    formStatus.textContent = t.contact.successStatus;
    formStatus.classList.add('success');

    // Réinitialisation après confirmation
    setTimeout(() => {
      form.reset();
      const codeValName = document.getElementById('codeValName');
      const codeValEmail = document.getElementById('codeValEmail');
      const codeValMessage = document.getElementById('codeValMessage');
      if (codeValName) codeValName.textContent = '""';
      if (codeValEmail) codeValEmail.textContent = '""';
      if (codeValMessage) codeValMessage.textContent = '""';
    }, 2000);
  });
}
