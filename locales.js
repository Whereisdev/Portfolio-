/**
 * PORTFOLIO IBRAHIM BORÉ — TRANSLATIONS
 * Centralized EN / FR translation object.
 * Keys are accessed via dot-notation (e.g. "hero.eyebrow").
 */

const TRANSLATIONS = {

  /* =====================================================================
     ENGLISH
     ===================================================================== */
  en: {
    meta: {
      lang: 'en',
      title: 'Ibrahim Boré — Software Developer | Frontend & Full-Stack',
      description: 'Ibrahim Boré — Junior software developer from Mali. I build products across frontend and backend. Serious about engineering, looking for a strong team to grow with.'
    },

    nav: {
      hello:    '_hello',
      about:    '_about-me',
      projects: '_projects',
      contact:  '_contact-me'
    },

    lang_switcher_label: 'Language',

    hero: {
      eyebrow:    'IBRAHIM BORÉ · SOFTWARE DEVELOPER',
      headline:   'I build products,<br>not just interfaces.',
      role_text:  'Junior developer with a strong bias toward building, learning and solving real problems.',
      badge:      'Open to opportunities · Bamako, Mali · Remote',
      code_line1: '// I work across frontend and backend.',
      code_line2: '// Looking for an environment where I can contribute,',
      code_line3: '// learn from experienced engineers and grow through real-world engineering.',
      cta_primary:   'View my work',
      cta_secondary: "Let's talk"
    },

    about: {
      tree: {
        personal_info: 'personal-info',
        bio:       'bio',
        skills:    'skills',
        education: 'education',
        contacts:  'contacts',
        edu1: 'Self-taught & Web Dev',
        edu2: 'Baccalauréat & Projects'
      },
      caption: '// Focus & Build',
      doc: {
        role:     'Software Developer · Junior',
        location: 'Bamako, Mali · Remote',
        p1:  "I'm Ibrahim Boré, a software developer from Mali",
        p2:  'at the beginning of my professional career.',
        p3:  'I started with the fundamentals of web development',
        p4:  'and gradually moved toward building complete applications',
        p5:  '— from interfaces to APIs, databases and backend logic.',
        p6:  'What I enjoy most is taking an idea, understanding the',
        p7:  'problem behind it, and building something people can use.',
        p8:  "I'm still growing technically, and I'm honest about that.",
        p9:  "I'm looking for an environment where I can work alongside",
        p10: 'experienced developers, contribute to real products,',
        p11: "and become the kind of engineer people can trust."
      },
      profile: {
        status: '"Open to opportunities"',
        level:  '"Junior · Early career"'
      },
      skills_title: '// Skills & Stack',
      categories: {
        frontend_details: 'HTML · CSS · JS · React',
        backend_details:  'APIs & Services',
        tools_details:    'Workflow'
      },
      skill_levels: {
        comfortable:     'Comfortable',
        in_progress:     'In progress',
        used_on_kalanso: 'Used on Kalanso',
        version_control: 'Version control',
        mobile_first:    'Mobile First'
      }
    },

    projects: {
      sidebar_cta: '// Interested in working together?',
      lets_talk:   "Let's talk",

      p1: {
        index:      'Project 1',
        subheading: 'RESTAURANT SHOWCASE WEBSITE',
        desc:       'A restaurant needed a web presence that matched the quality of its experience. I built a fully responsive showcase website focused on brand presentation, menu clarity and visual storytelling. The goal was to turn a real establishment into a clear, engaging digital experience.',
        focus:      '<strong>// What I learned:</strong> Structuring a frontend project from layout to detail · working with design intent · responsive CSS without a framework',
        view_project: 'view-project',
        view_code:    'view-code'
      },
      p2: {
        index:      'Project 2',
        subheading: 'ARCHITECTURE STUDIO WEBSITE',
        desc:       "An architecture studio had no digital presence. I built a visual-first website that structures their portfolio of projects, communicates the studio's positioning and creates a coherent identity online. The challenge was making the design feel as considered as the architecture itself.",
        focus:      "<strong>// What I learned:</strong> Visual hierarchy · building around content that isn't mine · layout systems for portfolio-style sites",
        view_project: 'view-project'
      },
      p3: {
        index:      'Project 3',
        subheading: 'LOCAL BUSINESS WEBSITE',
        desc:       'A roofing company needed a website that turned visitors into quote requests. I built a conversion-focused site with a clear customer journey: service discovery, trust-building content, a detailed FAQ, local service areas and a contact flow. I used Next.js for this project, which required me to learn its routing and rendering model while delivering a production-quality result.',
        focus:      '<strong>// What I learned:</strong> Next.js routing and structure · UX applied to a real business objective · working with Tailwind CSS',
        view_project: 'view-project'
      },
      p4: {
        index:      'Project 4',
        subheading: 'MOBILE EDUCATION APP',
        desc:       'A mobile application built with React Native to help students prepare for the Baccalauréat exam. I contributed to the UI design, worked on the user experience flows and integrated backend features using PHP, including in-app purchase integration.',
        focus:      '<strong>// What I learned:</strong> React Native components and navigation · mobile UX patterns · integrating payment features · working on a product that went live on the Play Store',
        view_project: 'view-project'
      },
      p5: {
        index:      'Project 5',
        subheading: 'INTERACTIVE QUIZ PLATFORM',
        desc:       'Students preparing for the Bac had no simple way to test themselves online. I built an interactive quiz platform that generates question sets by subject, calculates scores in real time, shows a pass percentage and displays step-by-step explanations. All logic was written in vanilla JavaScript without any framework.',
        focus:      '<strong>// What I learned:</strong> Managing complex state in vanilla JS · building real interactive logic · writing reusable components without a framework',
        view_project: 'view-project',
        view_code:    'view-code'
      },
      p6: {
        index:      'Project 6',
        subheading: 'LITERARY ASSOCIATION WEBSITE',
        desc:       'A literary association needed a clean, culturally appropriate web presence. I built a polished showcase site with careful attention to typography, readability and subtle CSS animations. The goal was to let the writing and mission speak, without the design getting in the way.',
        focus:      '<strong>// What I learned:</strong> Typography as design · CSS animations · designing for content that has meaning',
        view_project: 'view-project',
        view_code:    'view-code'
      },
      p7: {
        index:      'Project 7',
        subheading: 'PERSONAL PORTFOLIO',
        desc:       'This portfolio. Built with HTML, CSS and vanilla JavaScript, designed to look like a VS Code interface. I built it to showcase my work and practice frontend architecture without any framework. Every section, animation and interaction was written from scratch.',
        focus:      '<strong>// What I learned:</strong> Tab navigation with hash routing · IDE-style CSS architecture · building something that represents me as a developer',
        view_project: 'view-project',
        view_code:    'view-code'
      }
    },

    contact: {
      sidebar_caption:   "// Let's build something.",
      intro:             "// If you're building something and need a junior developer who is serious about the work — I'd be glad to talk.",
      label_name:        '_name:',
      label_email:       '_email:',
      label_message:     '_message:',
      placeholder_name:  'Your name',
      placeholder_email: 'your.email@example.com',
      placeholder_msg:   "Tell me about what you're building and what you're looking for...",
      submit:            'send-message',
      err_name_required: '// Name is required',
      err_name_short:    '// Must be at least 2 characters',
      err_email_required:'// Email is required',
      err_email_invalid: '// Invalid email format',
      err_msg_required:  '// Message is required',
      err_msg_short:     '// Message is too short (minimum 5 characters)',
      success:           '// Message sent successfully! Thank you.'
    },

    footer: {
      find_me: 'find me in:'
    }
  },

  /* =====================================================================
     FRANÇAIS
     ===================================================================== */
  fr: {
    meta: {
      lang: 'fr',
      title: 'Ibrahim Boré — Développeur Web | Frontend & Full-Stack',
      description: "Ibrahim Boré — Développeur junior malien. Je construis des produits complets, du frontend au backend. Sérieux dans mon approche de l'ingénierie, à la recherche d'une équipe solide pour progresser."
    },

    nav: {
      hello:    '_hello',
      about:    '_à-propos',
      projects: '_projets',
      contact:  '_contact'
    },

    lang_switcher_label: 'Langue',

    hero: {
      eyebrow:    'IBRAHIM BORÉ · DÉVELOPPEUR WEB',
      headline:   'Je construis des produits,<br>pas seulement des interfaces.',
      role_text:  "Développeur junior animé par l'envie de construire, d'apprendre et de résoudre de vrais problèmes.",
      badge:      'Disponible · Bamako, Mali · Remote',
      code_line1: '// Je travaille côté frontend et backend.',
      code_line2: '// Je recherche un environnement où je peux contribuer,',
      code_line3: "// apprendre de développeurs expérimentés et progresser sur des projets concrets.",
      cta_primary:   'Voir mes projets',
      cta_secondary: 'Parlons'
    },

    about: {
      tree: {
        personal_info: 'personal-info',
        bio:       'bio',
        skills:    'skills',
        education: 'education',
        contacts:  'contacts',
        edu1: 'Autodidacte & Dév Web',
        edu2: 'Baccalauréat & Projets'
      },
      caption: '// Focus & Build',
      doc: {
        role:     'Développeur Web · Junior',
        location: 'Bamako, Mali · Remote',
        p1:  'Je suis Ibrahim Boré, développeur web malien',
        p2:  'au début de ma carrière professionnelle.',
        p3:  "J'ai commencé par les bases du développement web",
        p4:  "avant de progresser vers la conception d'applications complètes",
        p5:  '— des interfaces aux API, bases de données et logique backend.',
        p6:  "Ce que j'apprécie le plus : partir d'une idée, comprendre le",
        p7:  "problème qu'elle résout, et en faire quelque chose d'utile.",
        p8:  "Je progresse encore techniquement, et j'en suis pleinement conscient.",
        p9:  "Je cherche un environnement où je peux travailler avec des développeurs",
        p10: 'expérimentés, contribuer à de vrais produits,',
        p11: "et devenir l'ingénieur auquel on peut confier des problèmes de plus en plus complexes."
      },
      profile: {
        status: '"Disponible pour des opportunités"',
        level:  '"Junior · Début de carrière"'
      },
      skills_title: '// Compétences & Stack',
      categories: {
        frontend_details: 'HTML · CSS · JS · React',
        backend_details:  'API & Services',
        tools_details:    'Workflow'
      },
      skill_levels: {
        comfortable:     "À l'aise",
        in_progress:     'En cours',
        used_on_kalanso: 'Utilisé sur Kalanso',
        version_control: 'Contrôle de version',
        mobile_first:    'Mobile First'
      }
    },

    projects: {
      sidebar_cta: '// Intéressé par une collaboration ?',
      lets_talk:   'Parlons',

      p1: {
        index:      'Projet 1',
        subheading: 'SITE VITRINE RESTAURANT',
        desc:       "Un restaurant avait besoin d'une présence web à la hauteur de son expérience. J'ai construit un site vitrine entièrement responsive, centré sur la présentation de la marque, la clarté du menu et la narration visuelle. L'objectif était de transformer un établissement réel en une expérience digitale claire et engageante.",
        focus:      "<strong>// Ce que j'ai appris :</strong> Structurer un projet frontend de la mise en page aux détails · travailler avec une intention de design · CSS responsive sans framework",
        view_project: 'voir-le-projet',
        view_code:    'voir-le-code'
      },
      p2: {
        index:      'Projet 2',
        subheading: "SITE STUDIO D'ARCHITECTURE",
        desc:       "Un studio d'architecture n'avait aucune présence digitale. J'ai construit un site axé sur le visuel, structurant leur portfolio, communiquant le positionnement du studio et créant une identité cohérente en ligne. Le défi était de donner au design la même rigueur que l'architecture elle-même.",
        focus:      "<strong>// Ce que j'ai appris :</strong> Hiérarchie visuelle · construire autour d'un contenu qui n'est pas le mien · systèmes de mise en page pour les sites portfolio",
        view_project: 'voir-le-projet'
      },
      p3: {
        index:      'Projet 3',
        subheading: 'SITE ENTREPRISE LOCALE',
        desc:       "Une entreprise de couverture avait besoin d'un site transformant les visiteurs en demandes de devis. J'ai construit un site axé sur la conversion avec un parcours client clair : découverte des services, contenu de réassurance, FAQ détaillée, zones d'intervention et formulaire de contact. J'ai utilisé Next.js pour ce projet, ce qui m'a amené à apprendre son modèle de routage et de rendu tout en livrant un résultat de qualité production.",
        focus:      "<strong>// Ce que j'ai appris :</strong> Routage et structure Next.js · UX appliquée à un objectif commercial · travailler avec Tailwind CSS",
        view_project: 'voir-le-projet'
      },
      p4: {
        index:      'Projet 4',
        subheading: 'APPLICATION MOBILE ÉDUCATIVE',
        desc:       "Application mobile développée avec React Native pour aider les élèves à préparer le Baccalauréat. J'ai contribué au design UI, travaillé sur les parcours utilisateur et intégré des fonctionnalités backend en PHP, dont l'intégration de paiement in-app.",
        focus:      "<strong>// Ce que j'ai appris :</strong> Composants React Native et navigation · UX mobile · intégration de paiement · lancer un produit sur le Play Store",
        view_project: 'voir-le-projet'
      },
      p5: {
        index:      'Projet 5',
        subheading: 'PLATEFORME DE QUIZ INTERACTIF',
        desc:       "Les élèves préparant le Bac n'avaient pas de moyen simple pour se tester en ligne. J'ai construit une plateforme de quiz interactive qui génère des séries de questions par matière, calcule les scores en temps réel, affiche un taux de réussite et présente des explications étape par étape. Toute la logique a été écrite en JavaScript vanilla sans framework.",
        focus:      "<strong>// Ce que j'ai appris :</strong> Gestion d'état complexe en JS vanilla · logique interactive réelle · écrire des composants réutilisables sans framework",
        view_project: 'voir-le-projet',
        view_code:    'voir-le-code'
      },
      p6: {
        index:      'Projet 6',
        subheading: 'SITE ASSOCIATION LITTÉRAIRE',
        desc:       "Une association littéraire avait besoin d'une présence web propre et culturellement adaptée. J'ai construit un site vitrine soigné avec une attention particulière à la typographie, la lisibilité et des animations CSS subtiles. L'objectif était de laisser l'écriture et la mission parler, sans que le design ne s'impose.",
        focus:      "<strong>// Ce que j'ai appris :</strong> La typographie comme design · animations CSS · concevoir pour un contenu porteur de sens",
        view_project: 'voir-le-projet',
        view_code:    'voir-le-code'
      },
      p7: {
        index:      'Projet 7',
        subheading: 'PORTFOLIO PERSONNEL',
        desc:       "Ce portfolio. Construit avec HTML, CSS et JavaScript vanilla, conçu pour ressembler à une interface VS Code. Je l'ai créé pour présenter mon travail et pratiquer l'architecture frontend sans framework. Chaque section, animation et interaction a été écrite de zéro.",
        focus:      "<strong>// Ce que j'ai appris :</strong> Navigation par onglets avec hash routing · architecture CSS style IDE · construire quelque chose qui me représente en tant que développeur",
        view_project: 'voir-le-projet',
        view_code:    'voir-le-code'
      }
    },

    contact: {
      sidebar_caption:   '// Construisons quelque chose.',
      intro:             "// Si vous construisez quelque chose et avez besoin d'un développeur junior sérieux dans son travail — je serais ravi d'en discuter.",
      label_name:        '_nom :',
      label_email:       '_email :',
      label_message:     '_message :',
      placeholder_name:  'Votre nom',
      placeholder_email: 'votre.email@exemple.com',
      placeholder_msg:   'Parlez-moi de ce que vous construisez et de ce que vous recherchez...',
      submit:            'envoyer-message',
      err_name_required: '// Le nom est obligatoire',
      err_name_short:    '// Doit comporter au moins 2 caractères',
      err_email_required:'// L\'email est obligatoire',
      err_email_invalid: '// Format email non valide',
      err_msg_required:  '// Le message est obligatoire',
      err_msg_short:     '// Message trop court (minimum 5 caractères)',
      success:           '// Message transmis avec succès ! Merci.'
    },

    footer: {
      find_me: 'me retrouver sur :'
    }
  }
};
