export type TranslationKey = string;

export const translations = {
  en: {
    nav: {
      about: 'About',
      work: 'Work',
      contact: 'Contact'
    },
    menu: {
      navIndex: "Navigation · Index",
      hero: "Hero",
      about: "About",
      work: "Work",
      contact: "Contact",
      explore: "Explore →",
      linkedin: "LinkedIn Profile ↗",
      email: "Email Me ↗",
      whatsapp: "WhatsApp ↗"
    },
    hero: {
      hi: "Hi. I'm Yessin",
      study: "I study business and I do marketing.",
      sub: "For the past two years, I've worked with six organizations on their marketing. A few numbers from that time are below.",
      scroll: "scroll to explore",
      remote: "Available for remote work",
      location: "Tunis, Tunisia",
      connect: "Connect on LinkedIn",
      pills: {
        launch: "Brand Launch",
        remote: "Open to remote work",
        saas: "SaaS Growth",
        b2b: "B2B Marketing",
        community: "Community & Ads"
      },
      paragraph: "I'm drawn to problems that don't have obvious answers. How do you build an audience with no following? How do you position a startup nobody has heard of? I've been working through those questions in real organizations for the past two years. I'm still asking them.",
      education: "Education",
      tbs: "Tunis Business School",
      degree: "BSc Business Administration · Sophomore",
      schoolDesc: "First Public English-Speaking Business School in Tunisia",
      tools: "Tools & Software",
      currently: "Currently",
      current1: "Reading about how AI is changing marketing",
      current2: "Learning the skills that are actually in demand right now",
      current3: "Open to remote roles",
      quote: "The learning happens in production, not just in textbooks.",
      languages: "Languages",
      langs: "Arabic · French · English",
      theWork: "The work.",
      sixBrands: "Six brands over two years, broken down piece by piece.",
      explore: "Explore the work ↓"
    },
    flow: {
      role: "Role",
      impact: "Impact & Results",
      creatives: "Selected Creatives",
      live: "Live links",
      view: "View",
      postTypes: {
        "Static Post": "Static Post",
        "Video": "Video",
        "Single Visual": "Single Visual"
      }
    },
    projects: {
      builtUnderDirection: "what was built under my direction",
      socialMediaWork: "The Social Media Work",
      "tbs-je": {
        category: "B2B Marketing",
        role: "Marketing & Communications Director",
        tagline: "Built the marketing strategy for a B2B consulting firm and served as marketing process pilot for its ISO 9001 certification.",
        metrics: [
          { value: "112K+", label: "organic Facebook views" },
          { value: "114K+", label: "organic Instagram views" },
          { value: "ISO 9001", label: "Certification maintained" },
          { value: "10K+", label: "LinkedIn impressions" }
        ]
      },
      "bume": {
        category: "Brand Launch",
        role: "Marketing Lead",
        tagline: "Built Bume's marketing, including the brand identity, content, and growth that brought in the first 60 paying students.",
        metrics: [
          { value: "90K+", label: "Video views" },
          { value: "3,400", label: "Saves" },
          { value: "60", label: "Paying students" }
        ]
      },
      "croki": {
        category: "Growth & BD",
        role: "Digital Marketing & BD Intern",
        tagline: "Created TikTok and Instagram content for Croki, ran customer interviews to shape their pricing, and organized a webinar to bring in new customers.",
        metrics: [
          { value: "18K+", label: "TikTok organic reach" },
          { value: "30+", label: "Customer interviews conducted" },
          { value: "1", label: "Pricing strategy built" },
          { value: "1", label: "Webinar organized to drive signups" }
        ]
      },
      "skills4trade": {
        category: "SaaS Marketing",
        role: "Digital Marketing Associate",
        tagline: "Owned the full marketing operation of an early-stage SaaS startup independently",
        metrics: [
          { value: "100%", label: "Solo marketing operation" },
          { value: "3", label: "Channels built from zero" },
          { value: "Direct", label: "CEO coordination" }
        ]
      }
    },
    brand: {
      title: "Event Rebranding · HEXideate",
      conceptTitle: "01. The Concept",
      conceptDesc: "HEXideate is TBS Junior Enterprise's annual hackathon: minimalist, sharp, and built for ideas worth building.",
      logoSuite: "02. Logo Suite",
      colorPalette: "03. Color Palette",
      typography: "04. Typography",
      type1: "Big Shoulders Display Bold · Titles",
      type2: "Big Shoulders Regular · Subheadings",
      type3: "Outfit Regular · Body Copy",
      typeDesc: "Minimalist & sharp type system.",
      presentation: "Presentation Materials",
      printing: "Printing Materials",
      brochure: "View TBS JE Brochure",
      agenda: "Agenda",
      notebookFront: "Notebook Front",
      notebookBack: "Notebook Back",
      social: "Social Media Performance Metrics",
      fb: "Facebook Metrics",
      ig: "Instagram Metrics",
      li: "Linkedin Metrics",
      colors: {
        deep: "H-stem primary",
        brand: "I + IDEATE wordmark",
        cobalt: "H + HEX wordmark",
        mid: "Brand Color",
        gold: "Crossbar - accent only",
        ice: "Light surface / tint"
      }
    },
    visual: {
      category: "Creative",
      spec: "Social Media · 1080 × 1350 & 1080 × 1080",
      title: "The Visual Work",
      subtitle: "Designs, campaigns, and creative executions across multiple brands and platforms.",
      viewPost: "View post"
    },
    footer: {
      marquee: [
        'Six brands, two years',
        '✦',
        'Based in Tunis',
        '✦',
        'Open to remote work',
        '✦',
        'Marketing, mostly figured out by doing it',
        '✦'
      ],
      contactLabel: "Contact Me",
      readyTo: "Ready to",
      begin: "begin?",
      sub: "I'm available for remote work. If you're building something and need an extra hand, let's talk.",
      linkedin: "Find me on LinkedIn ↗",
      email: "Email me ↗",
      whatsapp: "WhatsApp ↗"
    }
  },
  fr: {
    nav: {
      about: 'À propos',
      work: 'Projets',
      contact: 'Contact'
    },
    menu: {
      navIndex: "Navigation · Index",
      hero: "Accueil",
      about: "À propos",
      work: "Projets",
      contact: "Contact",
      explore: "Explorer →",
      linkedin: "Profil LinkedIn ↗",
      email: "M'envoyer un email ↗",
      whatsapp: "WhatsApp ↗"
    },
    hero: {
      hi: "Salut. Je suis Yessin",
      study: "J'étudie le business et je fais du marketing.",
      sub: "Ces deux dernières années, j'ai travaillé avec six organisations sur leur marketing. Quelques chiffres de cette période ci-dessous.",
      scroll: "défilez pour explorer",
      remote: "Disponible pour travailler à distance",
      location: "Tunis, Tunisie",
      connect: "Se connecter sur LinkedIn",
      pills: {
        launch: "Lancement de marque",
        remote: "Ouvert au télétravail",
        saas: "Croissance SaaS",
        b2b: "Marketing B2B",
        community: "Communauté & Ads"
      },
      paragraph: "Je suis attiré par les problèmes qui n'ont pas de réponses évidentes. Comment construire une audience en partant de zéro ? Comment positionner une startup dont personne n'a entendu parler ? Je travaille sur ces questions dans des organisations réelles depuis deux ans. Je me les pose toujours.",
      education: "Éducation",
      tbs: "Tunis Business School",
      degree: "Licence en administration des affaires · Étudiant de deuxième année",
      schoolDesc: "Première école de commerce publique anglophone en Tunisie",
      tools: "Outils & Logiciels",
      currently: "Actuellement",
      current1: "Je lis sur la façon dont l'IA transforme le marketing",
      current2: "J'apprends les compétences qui sont réellement demandées en ce moment",
      current3: "Ouvert aux opportunités à distance",
      quote: "L'apprentissage se fait sur le terrain, pas seulement dans les manuels.",
      languages: "Langues",
      langs: "Arabe · Français · Anglais",
      theWork: "Les projets.",
      sixBrands: "Six marques en deux ans, détaillées pièce par pièce.",
      explore: "Explorer les projets ↓"
    },
    flow: {
      role: "Rôle",
      impact: "Impact & Résultats",
      creatives: "Créations Sélectionnées",
      live: "Liens directs",
      view: "Voir",
      postTypes: {
        "Static Post": "Post Statique",
        "Video": "Vidéo",
        "Single Visual": "Visuel Simple"
      }
    },
    projects: {
      builtUnderDirection: "ce qui a été construit sous ma direction",
      socialMediaWork: "Travail sur les réseaux sociaux",
      "tbs-je": {
        category: "Marketing B2B",
        role: "Directeur Marketing & Communication",
        tagline: "J'ai élaboré la stratégie marketing pour un cabinet de conseil B2B et agi en tant que pilote du processus marketing pour sa certification ISO 9001.",
        metrics: [
          { value: "112K+", label: "vues organiques sur Facebook" },
          { value: "114K+", label: "vues organiques sur Instagram" },
          { value: "ISO 9001", label: "Certification maintenue" },
          { value: "10K+", label: "impressions sur LinkedIn" }
        ]
      },
      "bume": {
        category: "Lancement de marque",
        role: "Responsable Marketing",
        tagline: "J'ai construit le marketing de Bume, y compris l'identité de marque, le contenu et la croissance, ce qui a attiré les 60 premiers étudiants payants.",
        metrics: [
          { value: "90K+", label: "Vues de vidéos" },
          { value: "3,400", label: "Enregistrements" },
          { value: "60", label: "Étudiants payants" }
        ]
      },
      "croki": {
        category: "Croissance & Développement",
        role: "Stagiaire Marketing Digital & Développement Commercial",
        tagline: "J'ai créé du contenu TikTok et Instagram pour Croki, mené des entretiens clients pour définir leurs prix et organisé un webinaire pour attirer de nouveaux clients.",
        metrics: [
          { value: "18K+", label: "Portée organique sur TikTok" },
          { value: "30+", label: "Entretiens clients réalisés" },
          { value: "1", label: "Stratégie de prix élaborée" },
          { value: "1", label: "Webinaire organisé pour générer des inscriptions" }
        ]
      },
      "skills4trade": {
        category: "Marketing SaaS",
        role: "Associé en Marketing Digital",
        tagline: "J'ai géré de manière indépendante l'ensemble des opérations marketing d'une startup SaaS en phase de lancement.",
        metrics: [
          { value: "100%", label: "Opération marketing en solo" },
          { value: "3", label: "Canaux construits de zéro" },
          { value: "Direct", label: "Coordination avec le PDG" }
        ]
      }
    },
    brand: {
      title: "Refonte d'Événement · HEXideate",
      conceptTitle: "01. Le Concept",
      conceptDesc: "HEXideate est le hackathon annuel de TBS Junior Enterprise : minimaliste, pointu, conçu pour des idées qui valent la peine d'être développées.",
      logoSuite: "02. Suite de Logos",
      colorPalette: "03. Palette de Couleurs",
      typography: "04. Typographie",
      type1: "Big Shoulders Display Bold · Titres",
      type2: "Big Shoulders Regular · Sous-titres",
      type3: "Outfit Regular · Corps de texte",
      typeDesc: "Système typographique minimaliste et pointu.",
      presentation: "Supports de Présentation",
      printing: "Supports Imprimés",
      brochure: "Voir la Brochure TBS JE",
      agenda: "Programme",
      notebookFront: "Carnet - Avant",
      notebookBack: "Carnet - Arrière",
      social: "Indicateurs de Performance sur les Réseaux Sociaux",
      fb: "Statistiques Facebook",
      ig: "Statistiques Instagram",
      li: "Statistiques LinkedIn",
      colors: {
        deep: "Primaire H-stem",
        brand: "I + Mot-symbole IDEATE",
        cobalt: "H + Mot-symbole HEX",
        mid: "Couleur de Marque",
        gold: "Barre transversale - accent",
        ice: "Surface claire / teinte"
      }
    },
    visual: {
      category: "Création",
      spec: "Réseaux Sociaux · 1080 × 1350 & 1080 × 1080",
      title: "Travail Visuel",
      subtitle: "Designs, campagnes et exécutions créatives à travers plusieurs marques et plateformes.",
      viewPost: "Voir la publication"
    },
    footer: {
      marquee: [
        'Six marques, deux ans',
        '✦',
        'Basé à Tunis',
        '✦',
        'Ouvert au télétravail',
        '✦',
        'Marketing, surtout appris sur le tas',
        '✦'
      ],
      contactLabel: "Contactez-moi",
      readyTo: "Prêt à",
      begin: "commencer ?",
      sub: "Je suis disponible pour travailler à distance. Si vous construisez quelque chose et avez besoin d'aide, discutons-en.",
      linkedin: "Trouvez-moi sur LinkedIn ↗",
      email: "Envoyez-moi un e-mail ↗",
      whatsapp: "WhatsApp ↗"
    }
  }
};
