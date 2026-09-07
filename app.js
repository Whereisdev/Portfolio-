/**
 * PORTFOLIO IBRAHIM BORÉ - APPLICATION LOGIC
 * Navigation IDE, interaction des onglets, live code preview et validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initLineNumbers();
  initContactLivePreview();
  initFormValidation();
  initMobileMenu();
  handleHashNavigation();
});

/* ==========================================================================
   GESTION DES ONGLETS PRINCIPAUX (_hello, _about-me, _projects, _contact-me)
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
   MENU MOBILE
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
   ARBORESCENCE EXPLORER (_about-me)
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

function selectAboutTab(type) {
  const treeItems = document.querySelectorAll('.tree-item');
  treeItems.forEach(item => item.classList.remove('active'));

  const targetItem = Array.from(treeItems).find(item => item.textContent.includes(type));
  if (targetItem) {
    targetItem.classList.add('active');
  }

  if (type === 'skills') {
    const skillsPane = document.querySelector('.skills-pane');
    if (skillsPane) {
      skillsPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else if (type === 'bio') {
    const editorPane = document.querySelector('.editor-pane');
    if (editorPane) {
      editorPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

/* ==========================================================================
   GÉNÉRATION DES NUMÉROS DE LIGNE POUR L'ÉDITEUR
   ========================================================================== */
function initLineNumbers() {
  const aboutLineNumbers = document.getElementById('aboutLineNumbers');
  if (aboutLineNumbers) {
    let numbersHtml = '';
    for (let i = 1; i <= 28; i++) {
      numbersHtml += `<div>${i}</div>`;
    }
    aboutLineNumbers.innerHTML = numbersHtml;
  }

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
   DÉFILEMENT FLUIDE VERS UN PROJET
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
   LIVE CODE PREVIEW DYNAMIQUE (_contact-me)
   ========================================================================== */
function initContactLivePreview() {
  const inputName = document.getElementById('inputName');
  const inputEmail = document.getElementById('inputEmail');
  const inputMessage = document.getElementById('inputMessage');

  const codeValName = document.getElementById('codeValName');
  const codeValEmail = document.getElementById('codeValEmail');
  const codeValMessage = document.getElementById('codeValMessage');
  const codeValDate = document.getElementById('codeValDate');

  if (codeValDate) {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    codeValDate.textContent = `"${new Date().toLocaleDateString('fr-FR', options)}"`;
  }

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
   VALIDATION ET SOUMISSION DU FORMULAIRE DE CONTACT
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

    let isValid = true;

    // Reset des erreurs
    errorName.textContent = '';
    errorEmail.textContent = '';
    errorMessage.textContent = '';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    // Validation Nom
    if (!inputName.value.trim()) {
      errorName.textContent = '// Nom obligatoire';
      isValid = false;
    } else if (inputName.value.trim().length < 2) {
      errorName.textContent = '// Doit comporter au moins 2 caractères';
      isValid = false;
    }

    // Validation Email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!inputEmail.value.trim()) {
      errorEmail.textContent = '// Email obligatoire';
      isValid = false;
    } else if (!emailRegex.test(inputEmail.value.trim())) {
      errorEmail.textContent = '// Format email non valide';
      isValid = false;
    }

    // Validation Message
    if (!inputMessage.value.trim()) {
      errorMessage.textContent = '// Message obligatoire';
      isValid = false;
    } else if (inputMessage.value.trim().length < 5) {
      errorMessage.textContent = '// Message trop court (minimum 5 caractères)';
      isValid = false;
    }

    if (!isValid) return;

    // Simulation d'envoi réussi
    formStatus.textContent = '// Message transmis avec succès ! Merci.';
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
    }, 1500);
  });
}
