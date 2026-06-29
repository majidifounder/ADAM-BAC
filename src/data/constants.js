export const SUBJECTS = [
  { id: 'pc', name: 'Physique-Chimie', icon: '🔬', grade: 2, coeff: 7, priority: 'CRITIQUE', cls: '', accent: '#171717' },
  { id: 'math', name: 'Mathématiques', icon: '📐', grade: 4.5, coeff: 7, priority: 'CRITIQUE', cls: '', accent: '#404040' },
  { id: 'svt', name: 'SVT', icon: '🌱', grade: 6.5, coeff: 5, priority: 'HAUTE', cls: 'amber', accent: '#525252' },
  { id: 'english', name: 'Anglais', icon: '🌍', grade: 2, coeff: 2, priority: 'HAUTE', cls: 'amber', accent: '#737373' },
  { id: 'philo', name: 'Philosophie', icon: '💭', grade: 11, coeff: 2, priority: 'MODÉRÉE', cls: 'green', accent: '#262626' },
]

export const PRIORITY_CLS = { CRITIQUE: 'p-critique', HAUTE: 'p-haute', 'MODÉRÉE': 'p-moderee' }
export const COEFF_CLS = { 7: 'coeff-7', 5: 'coeff-5', 2: 'coeff-2' }
export const DAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
export const TOTAL_COEFF = 23
export const EXAM_CONTENT = { 4: '🔬 PC + 🌍 English', 5: '📐 Math + 💭 Philo', 6: '🌱 SVT' }
export const REV_CONTENT = { 0: 'RÉVISIONS INTENSIVES', 1: 'RÉVISIONS', 2: 'RÉVISIONS', 3: 'RÉVISIONS' }

export const PLAN = [
  { label: "Jour 1 - Aujourd'hui", dayIndex: 0, tasks: [
    { t: '08h00 – 11h00', b: '🔬 PC', bc: 'badge-pc', d: 'Mécanique : Lois de Newton, MRU/MRUV, chute libre' },
    { t: '11h00 – 11h15', b: '☕ Pause', bc: 'badge-pause', d: 'Pause' },
    { t: '11h15 – 13h00', b: '🔬 PC', bc: 'badge-pc', d: 'Électricité : Circuits RC et RL (charge/décharge)' },
    { t: '14h00 – 16h00', b: '🔬 PC', bc: 'badge-pc', d: 'Chimie : Acides-bases, pH, titrages' },
    { t: '16h15 – 17h30', b: '🌍 Anglais', bc: 'badge-en', d: 'Grammar: Tenses + Modal verbs + Connectors' },
    { t: '20h00 – 21h30', b: '🔬 PC', bc: 'badge-pc', d: 'Ondes mécaniques + Optique (révision rapide)' },
    { t: '21h30 – 22h00', b: '📝 Révision', bc: 'badge-rev', d: 'Résumé de la journée — noter les formules clés' },
  ]},
  { label: 'Jour 2', dayIndex: 1, tasks: [
    { t: '08h00 – 11h00', b: '📐 Math', bc: 'badge-math', d: 'Analyse : Suites (arithmétiques, géométriques, récurrentes)' },
    { t: '11h15 – 13h00', b: '📐 Math', bc: 'badge-math', d: 'Dérivation et étude complète de fonctions' },
    { t: '14h00 – 16h00', b: '📐 Math', bc: 'badge-math', d: "Intégration : primitives + calcul d'aires" },
    { t: '16h15 – 17h30', b: '📐 Math', bc: 'badge-math', d: 'Probabilités (loi binomiale, dénombrement)' },
    { t: '20h00 – 21h30', b: '🌱 SVT', bc: 'badge-svt', d: 'Génétique : ADN, réplication, transcription, traduction' },
    { t: '21h30 – 22h00', b: '🔬 PC', bc: 'badge-pc', d: 'Révision rapide formules PC' },
  ]},
  { label: 'Jour 3', dayIndex: 2, tasks: [
    { t: '08h00 – 10h30', b: '🔬 PC', bc: 'badge-pc', d: 'Révision totale PC : exercices types bac' },
    { t: '10h45 – 12h30', b: '🔬 PC', bc: 'badge-pc', d: 'Chimie organique : estérification, hydrolyse' },
    { t: '14h00 – 16h30', b: '📐 Math', bc: 'badge-math', d: "Nombres complexes + Géométrie dans l'espace" },
    { t: '16h30 – 17h30', b: '🌍 Anglais', bc: 'badge-en', d: 'Reading comprehension + Essay writing structure' },
    { t: '20h00 – 21h30', b: '🌱 SVT', bc: 'badge-svt', d: 'Immunologie + Neurophysiologie (influx nerveux)' },
    { t: '21h30 – 22h00', b: '📝 Bilan', bc: 'badge-rev', d: 'Révision tous sujets — points faibles' },
  ]},
  { label: 'Jour 4 - Veille', dayIndex: 3, tasks: [
    { t: '08h00 – 09h30', b: '🔬 PC', bc: 'badge-pc', d: 'Dernière révision : formules et constantes essentielles' },
    { t: '09h30 – 11h00', b: '🔬 PC', bc: 'badge-pc', d: '2 exercices complets type bac' },
    { t: '11h15 – 12h30', b: '🌍 Anglais', bc: 'badge-en', d: 'Conseils expression + relecture méthode' },
    { t: '14h00 – 15h30', b: '📐 Math', bc: 'badge-math', d: 'Formules clés Math — tableur de révision' },
    { t: '15h30 – 16h30', b: '📐 Math', bc: 'badge-math', d: '1 exercice intégration + 1 exercice probabilités' },
    { t: '17h00 – 18h00', b: '🌱 SVT', bc: 'badge-svt', d: 'SVT : géologie + génétique mendélienne' },
    { t: '20h00 – 21h00', b: '💭 Philo', bc: 'badge-philo', d: 'Grands thèmes + citations philosophes clés' },
    { t: '21h00 – 21h30', b: '😴 Repos', bc: 'badge-pause', d: 'Préparer les affaires, dormir tôt !' },
  ]},
]

export const TOPICS = {
  pc: [
    'Mécanique — Lois de Newton (principe fondamental, 2ème loi)',
    'Mécanique — MRU et MRUV (équations horaires)',
    'Mécanique — Chute libre et mouvement parabolique',
    'Mécanique — Mouvements circulaires et pendule',
    'Électricité — Dipôle RC : charge et décharge',
    'Électricité — Dipôle RL et circuit RLC',
    'Électricité — Oscillations forcées et résonance',
    'Optique — Lentilles convergentes et divergentes',
    'Optique — Réfraction, réflexion, Snell-Descartes',
    'Chimie — Acides et bases, constante Ka, pH',
    'Chimie — Titrages acido-basiques (suivi pH-métrique)',
    "Chimie — Réactions d'oxydo-réduction",
    'Chimie organique — Estérification et hydrolyse',
    'Chimie organique — Identification de groupes fonctionnels',
    'Ondes — Ondes mécaniques progressives',
    'Ondes — Diffraction et interférence',
    'Nucléaire — Radioactivité (α, β, γ), lois de conservation',
    'Nucléaire — Défaut de masse, énergie de liaison',
  ],
  math: [
    'Suites — Suites arithmétiques (formules, sommes)',
    'Suites — Suites géométriques (formules, sommes)',
    'Suites — Suites récurrentes (monotonie, convergence)',
    "Dérivation — Dérivée d'une fonction composée",
    "Dérivation — Étude complète d'une fonction (tableau de variations)",
    'Intégration — Calcul de primitives (toutes formules)',
    "Intégration — Calcul d'aires entre courbes",
    "Équations différentielles — y' = ay + b",
    'Probabilités — Dénombrement (arrangements, combinaisons)',
    'Probabilités — Loi binomiale (espérance, variance)',
    'Probabilités — Variables aléatoires continues',
    'Nombres complexes — Formes algébrique/trigonométrique/exponentielle',
    "Nombres complexes — Résolution d'équations",
    "Géométrie — Produit scalaire et vectoriel dans l'espace",
    'Géométrie — Plans et droites (distances, angles)',
    'Statistiques — Médiane, quartiles, écart-type',
  ],
  svt: [
    "Génétique — Structure de l'ADN et chromosomes",
    'Génétique — Réplication, transcription, traduction',
    'Génétique — Mutations et maladies génétiques',
    'Génétique — Monohybridisme (lois de Mendel)',
    'Génétique — Dihybridisme et linkage',
    'Immunologie — Réponse immunitaire non spécifique',
    'Immunologie — Réponse humorale et cellulaire',
    "Neurophysiologie — Potentiel de repos et d'action",
    'Neurophysiologie — Synapse et neurotransmetteurs',
    'Géologie — Tectonique des plaques (preuves, mécanismes)',
    'Géologie — Séismes et volcans',
    'Physiologie — Régulation hormonale (exemple de la glycémie)',
  ],
  english: [
    'Grammar — All tenses review (simple, progressive, perfect)',
    'Grammar — Modal verbs (can, could, must, might, should, would)',
    'Grammar — Conditional sentences (type 0, 1, 2, 3)',
    'Grammar — Passive voice transformation',
    'Grammar — Reported speech',
    'Vocabulary — Environment & ecology',
    'Vocabulary — Technology & media',
    'Vocabulary — Society & social issues',
    'Writing — Essay structure (introduction, body, conclusion)',
    'Reading — Comprehension strategies (skimming, scanning)',
  ],
  philo: [
    'La liberté — Déterminisme vs liberté',
    'La conscience — Conscience de soi, inconscient (Freud)',
    'La personne — Identité personnelle, autrui',
    'La vérité — Certitude, doute, vérité scientifique',
    'La raison — Rationalisme vs empirisme',
    "La politique — État, droit, justice sociale",
    "L'art — La beauté, l'imitation, l'expression",
    'Le bonheur — Plaisir, devoir, sagesse',
    'Philosophes clés — Descartes, Kant, Sartre, Hegel, Platon',
    'Méthode — Plan de dissertation (thèse / antithèse / synthèse)',
  ],
}

export const QUOTES = [
  'كل دقيقة تذاكر فيها الآن هي درجة أكثر في يوم الامتحان 💪',
  '4 jours suffisent. Les champions se font dans les dernières heures.',
  "Tu n'as pas raté. Tu as une autre chance. Utilise-la.",
  'Your only competition is who you were yesterday.',
  "Le Bac, c'est 4 jours de concentration pour une vie de liberté.",
  'متستسلمش — الجهد ما يخيبش',
  'Pain now, results Thursday. Lock in.',
]

export const SECTIONS = [
  { id: 1, label: '01', title: 'Compte à rebours', icon: '⏱' },
  { id: 2, label: '02', title: 'Calendrier', icon: '📅' },
  { id: 3, label: '03', title: 'Priorités', icon: '📊' },
  { id: 4, label: '04', title: 'Planning', icon: '📋' },
  { id: 5, label: '05', title: 'Chapitres', icon: '📚' },
  { id: 6, label: '06', title: 'Simulation', icon: '🎯' },
  { id: 7, label: '07', title: 'Focus', icon: '⏲' },
  { id: 8, label: '08', title: 'Notes', icon: '✏️' },
  { id: 9, label: '09', title: 'Motivation', icon: '💪' },
]
