// lib/boussole-data.ts

export type AgreementOptionKey = "FA" | "PA" | "N" | "PD" | "FD" | "IDK" // IDK for "Ne sais pas"
export type ImportanceOptionKey = 1 | 2 | 3 | 4 | 5
export type ImportanceDirectOptionKey = "TI" | "AI" | "NI" | "PI" | "PTI" | "IDK" // Pour les questions d'importance directe

export const agreementLabels: Record<AgreementOptionKey, string> = {
  FA: "Fortement d'accord",
  PA: "Plutôt d'accord",
  N: "Neutre / Position mitigée",
  PD: "Plutôt en désaccord",
  FD: "Fortement en désaccord",
  IDK: "Ne sais pas",
}

export const importanceLabels: Record<ImportanceOptionKey, string> = {
  5: "Très important",
  4: "Assez important", 
  3: "Neutre (Importance)",
  2: "Peu important",
  1: "Pas du tout important",
}

export const importanceDirectLabels: Record<ImportanceDirectOptionKey, string> = {
  TI: "Très important",
  AI: "Assez important",
  NI: "Neutre (Importance)", 
  PI: "Peu important",
  PTI: "Pas du tout important",
  IDK: "Ne sais pas",
}

export interface Question {
  id: string
  text: string
  category: string
  responseType: "agreement" | "importance_direct" | "priority_ranking"
  agreementOptions: AgreementOptionKey[]
  importanceOptions: ImportanceOptionKey[]
  importanceDirectOptions?: ImportanceDirectOptionKey[] // Pour les questions d'importance directe
  priorityOptions?: string[] // Pour les questions de priorité
  description?: string
  customAgreementLabels?: Record<AgreementOptionKey, string> // Pour personnaliser les labels
  customImportanceDirectLabels?: Record<ImportanceDirectOptionKey, string> // Pour les questions d'importance directe
  responseFormat?: "standard" | "priority" | "frequency" | "financing" // Type de formulation
}

export interface PartyPosition {
  questionId: string
  position: AgreementOptionKey | "?"
  source?: string
  note?: string
  quote?: string
}

export interface Party {
  id: string
  name: string
  shortName?: string
  leader: string
  logoUrl: string
  color: string
  websiteUrl?: string
  orientation?: string
  mainIdeasSummary?: string
  strengths?: string[]
  reserves?: string[]
  positions: PartyPosition[]
  priorities?: string[] // Top 3 enjeux prioritaires du parti (1er, 2e, 3e)
}

export const boussoleQuestions: Question[] = [
  {
    id: "q1_tramway",
    text: "La municipalité devrait investir davantage dans le projet de tramway, même si cela implique une hausse des taxes municipales.",
    category: "Mobilité et transport",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q2_pistes_cyclables",
    text: "Évaluez l'importance du développement des pistes cyclables, même si cela réduit l'espace pour les voitures.",
    category: "Mobilité et transport",
    responseType: "importance_direct",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"], // Utilisé comme fallback
    importanceOptions: [5, 4, 3, 2, 1],
    importanceDirectOptions: ["TI", "AI", "NI", "PI", "PTI", "IDK"],
    description: "Cette question évalue la priorité accordée aux transports actifs versus l'automobile.",
  },
  {
    id: "q3_troisieme_lien",
    text: "La Ville de Québec devrait activement soutenir la réalisation d'un troisième lien routier entre Québec et Lévis.",
    category: "Mobilité et transport",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q4_secteur_prive_transport",
    text: "Le secteur privé devrait jouer un rôle plus important dans la gestion et l'opération du transport en commun à Québec.",
    category: "Mobilité et transport",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q5_quotas_logements_abordables",
    text: "La Ville devrait imposer des quotas de logements abordables dans tous les nouveaux projets immobiliers.",
    category: "Habitation et aménagement urbain",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q6_densification_quartiers",
    text: "La Ville devrait faciliter la densification du centre-ville avant d'autoriser le développement en périphérie.",
    category: "Habitation et aménagement urbain",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
    description: "Cette question mesure la priorité accordée à la séquence de développement urbain.",
  },
  {
    id: "q7_restrictions_airbnb",
    text: "La Ville devrait renforcer les restrictions sur les locations de type Airbnb pour préserver le parc locatif.",
    category: "Habitation et aménagement urbain",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q8_assouplissement_zonage",
    text: "Les règlements de zonage devraient être assouplis pour faciliter la construction de nouveaux logements.",
    category: "Habitation et aménagement urbain",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q9_protection_espaces_verts",
    text: "Évaluez l'importance d'investir dans la protection et l'agrandissement des espaces verts, même au détriment du développement immobilier.",
    category: "Environnement et développement durable",
    responseType: "importance_direct",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"], // Utilisé comme fallback
    importanceOptions: [5, 4, 3, 2, 1],
    importanceDirectOptions: ["TI", "AI", "NI", "PI", "PTI", "IDK"],
    description: "Cette question évalue la priorité accordée aux espaces verts face à la pression immobilière.",
  },
  {
    id: "q10_transition_carboneutre",
    text: "La Ville devrait accélérer la transition vers des bâtiments et infrastructures municipales carboneutres, même si cela implique des coûts supplémentaires.",
    category: "Environnement et développement durable",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q11_reduction_dechets",
    text: "La municipalité devrait imposer des mesures plus strictes aux citoyens pour réduire les déchets et augmenter le recyclage.",
    category: "Environnement et développement durable",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q12_augmentation_taxes",
    text: "La municipalité devrait augmenter les taxes foncières pour améliorer les infrastructures.",
    category: "Gouvernance et finances municipales",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
    responseFormat: "financing",
    customAgreementLabels: {
      FA: "Beaucoup plus",
      PA: "Un peu plus",
      N: "Ni plus ni moins",
      PD: "Un peu moins", 
      FD: "Beaucoup moins",
      IDK: "Ne sais pas"
    }
  },
  {
    id: "q13_pouvoir_conseils_quartier",
    text: "Évaluez l'importance de donner plus de pouvoir décisionnel aux conseils de quartier sur les projets locaux.",
    category: "Gouvernance et finances municipales",
    responseType: "importance_direct",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"], // Utilisé comme fallback
    importanceOptions: [5, 4, 3, 2, 1],
    importanceDirectOptions: ["TI", "AI", "NI", "PI", "PTI", "IDK"],
    description: "Cette question évalue la priorité accordée à la décentralisation de la gouvernance municipale.",
  },
  {
    id: "q14_reduction_dette",
    text: "La Ville devrait prioriser la réduction de sa dette plutôt que de nouveaux investissements.",
    category: "Gouvernance et finances municipales",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q15_avantages_fiscaux_entreprises",
    text: "La municipalité devrait accorder plus d'avantages fiscaux pour attirer de grandes entreprises sur son territoire.",
    category: "Développement économique et social",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
    responseFormat: "priority",
    customAgreementLabels: {
      FA: "Très haute priorité",
      PA: "Haute priorité",
      N: "Priorité moyenne",
      PD: "Faible priorité", 
      FD: "Très faible priorité",
      IDK: "Incertain"
    }
  },
  {
    id: "q16_limitation_touristes",
    text: "Évaluez l'importance de limiter le nombre de touristes dans certains secteurs pour préserver la qualité de vie des résidents.",
    category: "Développement économique et social",
    responseType: "importance_direct",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"], // Utilisé comme fallback
    importanceOptions: [5, 4, 3, 2, 1],
    importanceDirectOptions: ["TI", "AI", "NI", "PI", "PTI", "IDK"],
    description: "Cette question mesure la priorité accordée à l'équilibre entre tourisme et vie locale.",
  },
  {
    id: "q17_soutien_organismes_communautaires",
    text: "La Ville devrait augmenter son soutien financier aux organismes communautaires qui fournissent des services sociaux essentiels (itinérance, aide alimentaire, etc.).",
    category: "Développement économique et social",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q18_augmentation_effectifs_policiers",
    text: "Il faudrait augmenter les effectifs policiers pour améliorer la sécurité dans les quartiers.",
    category: "Sécurité publique et services municipaux",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
    responseFormat: "frequency",
    customAgreementLabels: {
      FA: "Beaucoup plus",
      PA: "Un peu plus",
      N: "Ni plus ni moins",
      PD: "Un peu moins", 
      FD: "Beaucoup moins",
      IDK: "Ne sais pas"
    }
  },
  {
    id: "q19_investissement_infrastructures_loisirs_sportives",
    text: "Évaluez l'importance d'investir davantage dans les infrastructures de loisirs et sportives de quartier.",
    category: "Sécurité publique et services municipaux",
    responseType: "importance_direct",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"], // Utilisé comme fallback
    importanceOptions: [5, 4, 3, 2, 1],
    importanceDirectOptions: ["TI", "AI", "NI", "PI", "PTI", "IDK"],
    description: "Cette question évalue la priorité accordée aux services de proximité.",
  },
  {
    id: "q20_protection_patrimoine",
    text: "Les règlements de protection du patrimoine bâti devraient être renforcés, même si cela limite les possibilités de développement.",
    category: "Patrimoine et identité",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q21_enjeux_prioritaires",
    text: "Parmi les enjeux suivants, lesquels sont vos 3 priorités municipales les plus importantes ? (Classez par ordre d'importance : 1er, 2e et 3e choix)",
    category: "Priorités municipales",
    responseType: "priority_ranking",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"], // Utilisé comme fallback
    importanceOptions: [5, 4, 3, 2, 1],
    description: "Sélectionnez vos 3 enjeux municipaux prioritaires et classez-les par ordre d'importance.",
    priorityOptions: [
      "Transport et mobilité",
      "Logement abordable", 
      "Environnement et espaces verts",
      "Sécurité publique",
      "Gestion des finances municipales",
      "Services municipaux",
      "Projet de tramway",
      "Troisième lien routier",
      "Lutte aux changements climatiques",
      "Patrimoine et identité"
    ]
  },
]

const questionIdMap = boussoleQuestions.map((q) => q.id)

const createSummary = (orientation?: string, forces?: string[], reserves?: string[]): string => {
  let summary = ""
  if (orientation) summary += `Orientation générale : ${orientation}.\n`
  if (forces && forces.length > 0) summary += `Forces : ${forces.join(", ")}.\n`
  if (reserves && reserves.length > 0) summary += `Réserves : ${reserves.join(", ")}.`
  return summary.trim()
}

export const partiesData: Party[] = [
  {
    id: "alliance_citoyenne",
    name: "Alliance citoyenne de Québec",
    shortName: "ACQ",
    leader: "Alain Giasson",
    logoUrl: "/logos/alliance-citoyenne-white-bg.svg", // Logo blanc simple
    color: "#0D47A1",
    websiteUrl: "https://metroquebec.com/local/118385/c-est-quoi-l-alliance-citoyenne-de-quebec/",
    orientation: "Centriste avec tendance pragmatique",
    strengths: ["Développement économique", "Services de proximité"],
    reserves: ["Grands projets coûteux", "Augmentation des taxes"],
    mainIdeasSummary: createSummary(
      "Centriste avec tendance pragmatique",
      ["Développement économique", "Services de proximité"],
      ["Grands projets coûteux", "Augmentation des taxes"],
    ),
    priorities: ["Développement économique", "Services municipaux", "Transport et mobilité"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "PD",
        source: "Déclarations publiques et articles de presse analysant la position du parti sur les grands projets d'infrastructure",
        note: "Favorise plutôt une révision complète du projet de transport structurant avec une approche plus consensuelle",
      },
      {
        questionId: questionIdMap[1],
        position: "PA",
        source: "Communications officielles du parti mentionnant la mobilité durable et le transport actif",
        note: "Soutient le développement du réseau cyclable mais avec une approche équilibrée qui tient compte de tous les usagers",
      },
      {
        questionId: questionIdMap[2],
        position: "N",
        source: "Absence de position claire dans les communications publiques disponibles",
        note: "Semble privilégier d'autres solutions de mobilité et une approche plus consultative sur les grands projets",
      },
      {
        questionId: questionIdMap[3],
        position: "PA",
        source: "Orientation générale pro-entreprise",
        note: "Favorable aux partenariats public-privé",
      },
      {
        questionId: questionIdMap[4],
        position: "PA",
        source: "Mentions de la crise du logement dans les communications",
        note: "Soutient des mesures pour augmenter l'offre de logements abordables",
      },
      { questionId: questionIdMap[5], position: "PA" },
      { questionId: questionIdMap[6], position: "N" },
      { questionId: questionIdMap[7], position: "PA" },
      { questionId: questionIdMap[8], position: "PA" },
      { questionId: questionIdMap[9], position: "PA" },
      { questionId: questionIdMap[10], position: "N" },
      { questionId: questionIdMap[11], position: "PD" },
      { questionId: questionIdMap[12], position: "PA" },
      { questionId: questionIdMap[13], position: "PA" },
      { questionId: questionIdMap[14], position: "PA" },
      { questionId: questionIdMap[15], position: "PD" },
      { questionId: questionIdMap[16], position: "PA" },
      { questionId: questionIdMap[17], position: "PA" },
      { questionId: questionIdMap[18], position: "PA" },
      { questionId: questionIdMap[19], position: "PA" },
      { questionId: questionIdMap[20], position: "PA" },
    ],
  },
  {
    id: "equipe_priorite_quebec",
    name: "Équipe priorité Québec",
    shortName: "EPQ",
    leader: "Stevens Melançon",
    logoUrl: "/logos/equipe-priorite-quebec-new.png", // Updated
    color: "#004b87",
    websiteUrl: "https://equipeprioritequebec.ca/",
    orientation: "Centre-droit prudent, gestionnaire",
    strengths: ["Développement économique", "Gestion financière"],
    reserves: ["Grands projets sans évaluation", "Dépenses non planifiées"],
    mainIdeasSummary: createSummary(
      "Centre-droit prudent, gestionnaire",
      ["Développement économique", "Gestion financière"],
      ["Grands projets sans évaluation", "Dépenses non planifiées"],
    ),
    priorities: ["Développement économique", "Troisième lien routier", "Sécurité publique"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "PD",
        source: 'Héritiers de Québec 21, approche prudente',
        note: "Critique mais pas fermé - demande des évaluations responsables",
      },
      {
        questionId: questionIdMap[1],
        position: "PA",
        source: "Valeurs affichées sur le site concernant le développement durable",
        note: "Il est primordial de combiner développement et environnement afin de faire prospérer notre ville.",
      },
      {
        questionId: questionIdMap[2],
        position: "PA",
        source: "Déclarations publiques du chef",
        note: "Considère ce projet comme important pour le développement économique",
      },
      {
        questionId: questionIdMap[3],
        position: "PA",
        source: "Orientation générale favorable aux entreprises",
        note: "Soutient les partenariats public-privé pour améliorer l'efficacité",
      },
      {
        questionId: questionIdMap[4],
        position: "N",
        source: "Valeur d'équité mentionnée sur le site",
        note: "Favorable à l'accès au logement mais peu de détails sur les mécanismes",
      },
      { questionId: questionIdMap[5], position: "N" },
      { questionId: questionIdMap[6], position: "PD" },
      { questionId: questionIdMap[7], position: "FA" },
      { questionId: questionIdMap[8], position: "N" },
      { questionId: questionIdMap[9], position: "N" },
      { questionId: questionIdMap[10], position: "N" },
      { questionId: questionIdMap[11], position: "FD" },
      { questionId: questionIdMap[12], position: "N" },
      { questionId: questionIdMap[13], position: "FA" },
      { questionId: questionIdMap[14], position: "FA" },
      { questionId: questionIdMap[15], position: "FD" },
      { questionId: questionIdMap[16], position: "N" },
      { questionId: questionIdMap[17], position: "FA" },
      { questionId: questionIdMap[18], position: "PA" },
      { questionId: questionIdMap[19], position: "N" },
      { questionId: questionIdMap[20], position: "PA" },
    ],
  },
  {
    id: "leadership_quebec",
    name: "Leadership Québec - Équipe Sam Hamad",
    shortName: "LQ",
    leader: "André Simard", // Note: Sam Hamad is mentioned in the name, but André Simard is often cited as current leader. Clarify if needed.
    logoUrl: "/logos/leadership-quebec-new.png", // Updated
    color: "#004a99",
    websiteUrl: "https://leadershipquebec.ca/",
    orientation: "Centre-droit, efficacité et SRB",
    strengths: ["Transport efficace (SRB)", "Gestion financière"],
    reserves: ["Projets mal évalués", "Gaspillage des fonds publics"],
    mainIdeasSummary: createSummary(
      "Centre-droit, efficacité et SRB",
      ["Transport efficace (SRB)", "Gestion financière"],
      ["Projets mal évalués", "Gaspillage des fonds publics"],
    ),
    priorities: ["Développement économique", "Troisième lien routier", "Sécurité publique"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "PD",
        source: "Site officiel et déclarations publiques",
        note: "Critique le coût et propose des alternatives",
      },
      {
        questionId: questionIdMap[1],
        position: "PD",
        source: "Sam Hamad critique la réduction de voies automobiles",
        note: "Opposition à la réduction de l'espace automobile pour les pistes",
      },
      {
        questionId: questionIdMap[2],
        position: "PA",
        source: "Orientation pro-développement économique",
        note: "Considère ce projet comme important pour la fluidité du transport",
      },
      {
        questionId: questionIdMap[3],
        position: "N",
        source: "Aucune déclaration explicite sur la privatisation",
        note: "Centré sur l'efficacité du SRB, pas sur l'idéologie privé",
      },
      {
        questionId: questionIdMap[4],
        position: "PD",
        source: "Orientation générale favorable au marché libre",
        note: "Préfère des incitatifs au secteur privé plutôt que des quotas",
      },
      { questionId: questionIdMap[5], position: "N" },
      { questionId: questionIdMap[6], position: "PD" },
      { questionId: questionIdMap[7], position: "FA" },
      { questionId: questionIdMap[8], position: "N" },
      { questionId: questionIdMap[9], position: "N" },
      { questionId: questionIdMap[10], position: "PD" },
      { questionId: questionIdMap[11], position: "FD" },
      { questionId: questionIdMap[12], position: "PD" },
      { questionId: questionIdMap[13], position: "FA" },
      { questionId: questionIdMap[14], position: "FA" },
      { questionId: questionIdMap[15], position: "FD" },
      { questionId: questionIdMap[16], position: "PD" },
      { questionId: questionIdMap[17], position: "FA" },
      { questionId: questionIdMap[18], position: "N" },
      { questionId: questionIdMap[19], position: "N" },
      { questionId: questionIdMap[20], position: "PA" },
    ],
  },
  {
    id: "quebec_dabord",
    name: "Québec d'abord",
    shortName: "QD",
    leader: "Claude Villeneuve",
    logoUrl: "/logos/quebec-dabord-new.png", // Updated
    color: "#00aef0",
    websiteUrl: "https://quebecdabord.com/",
    orientation: "Centre, pragmatique",
    strengths: ["Continuité gestionnaire", "Proximité citoyenne"],
    reserves: ["Positions peu documentées", "Visibilité limitée"],
    mainIdeasSummary: createSummary(
      "Centre, pragmatique",
      ["Continuité gestionnaire", "Proximité citoyenne"],
      ["Positions peu documentées", "Visibilité limitée"],
    ),
    priorities: ["Services municipaux", "Transport et mobilité", "Développement économique"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "PA",
        source: "Continuité de la majorité pro-tramway précédente",
        note: "Soutien probable basé sur l'historique de gouvernance municipale",
      },
      {
        questionId: questionIdMap[1],
        position: "N",
        source: "Aucune déclaration visible 2025",
        note: "Position non documentée publiquement",
      },
      {
        questionId: questionIdMap[2],
        position: "PA",
        source: "Orientation générale sur la mobilité",
        note: "Semble favorable à améliorer les connexions routières",
      },
      {
        questionId: questionIdMap[3],
        position: "N",
        source: "Aucun appui visible au privé",
        note: "Pas de position documentée sur la privatisation du transport",
      },
      {
        questionId: questionIdMap[4],
        position: "N",
        source: "Peu d'informations spécifiques disponibles",
        note: "Semble préoccupé par l'accessibilité au logement sans position claire sur les quotas",
      },
      { questionId: questionIdMap[5], position: "N" },
      { questionId: questionIdMap[6], position: "PA" },
      { questionId: questionIdMap[7], position: "PA" },
      { questionId: questionIdMap[8], position: "PA" },
      { questionId: questionIdMap[9], position: "N" },
      { questionId: questionIdMap[10], position: "N" },
      { questionId: questionIdMap[11], position: "PD" },
      { questionId: questionIdMap[12], position: "PA" },
      { questionId: questionIdMap[13], position: "PA" },
      { questionId: questionIdMap[14], position: "PA" },
      { questionId: questionIdMap[15], position: "PD" },
      { questionId: questionIdMap[16], position: "N" },
      { questionId: questionIdMap[17], position: "PA" },
      { questionId: questionIdMap[18], position: "PA" },
      { questionId: questionIdMap[19], position: "PA" },
      { questionId: questionIdMap[20], position: "PA" },
    ],
  },
  {
    id: "quebec_forte_et_fiere",
    name: "Québec forte et fière",
    shortName: "QFF",
    leader: "Bruno Marchand",
    logoUrl: "/logos/quebec-forte-et-fiere-new.png", // Updated
    color: "#FDB813",
    websiteUrl: "https://quebecforteetfiere.org/",
    orientation: "Centre-gauche, progressiste",
    strengths: ["Environnement", "Transport collectif", "Logement"],
    reserves: ["Développement économique traditionnel"],
    mainIdeasSummary: createSummary(
      "Centre-gauche, progressiste",
      ["Environnement", "Transport collectif", "Logement"],
      ["Développement économique traditionnel"],
    ),
    priorities: ["Projet de tramway", "Logement abordable", "Environnement et espaces verts"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "FA",
        source: "Positions publiques du maire sortant",
        note: "A défendu le projet de tramway comme essentiel pour la ville",
      },
      {
        questionId: questionIdMap[1],
        position: "FA",
        source: "Réalisations de l'administration actuelle",
        note: "A augmenté significativement le réseau cyclable pendant son mandat",
      },
      {
        questionId: questionIdMap[2],
        position: "N",
        source: "Déclarations publiques nuancées",
        note: "A exprimé des réserves tout en reconnaissant certains besoins",
      },
      {
        questionId: questionIdMap[3],
        position: "PD",
        source: "Gestion actuelle du RTC",
        note: "Privilégie le modèle public avec certains partenariats ciblés",
      },
      {
        questionId: questionIdMap[4],
        position: "FA",
        source: "Politiques mises en place pendant le mandat",
        note: "A instauré des exigences pour les nouveaux développements",
      },
      { questionId: questionIdMap[5], position: "FA" },
      { questionId: questionIdMap[6], position: "FA" },
      { questionId: questionIdMap[7], position: "N" },
      { questionId: questionIdMap[8], position: "FA" },
      { questionId: questionIdMap[9], position: "FA" },
      { questionId: questionIdMap[10], position: "PA" },
      { questionId: questionIdMap[11], position: "PA" },
      { questionId: questionIdMap[12], position: "PA" },
      { questionId: questionIdMap[13], position: "PD" },
      { questionId: questionIdMap[14], position: "N" },
      { questionId: questionIdMap[15], position: "N" },
      { questionId: questionIdMap[16], position: "PA" },
      { questionId: questionIdMap[17], position: "N" },
      { questionId: questionIdMap[18], position: "FA" },
      { questionId: questionIdMap[19], position: "FA" },
      { questionId: questionIdMap[20], position: "FA" },
    ],
  },
  {
    id: "respect_citoyens",
    name: "Respect citoyens",
    shortName: "RC",
    leader: "Stéphane Lachance",
    logoUrl: "/logos/respect-citoyens-new.png", // Updated
    color: "#D32F2F",
    websiteUrl: "https://www.respectcitoyens.org/",
    orientation: "Populiste local, administration pragmatique",
    strengths: ["Gestion administrative", "Proximité citoyenne"],
    reserves: ["Grands projets coûteux", "Bureaucratie excessive"],
    mainIdeasSummary: createSummary(
      "Populiste local, administration pragmatique",
      ["Gestion administrative", "Proximité citoyenne"],
      ["Grands projets coûteux", "Bureaucratie excessive"],
    ),
    priorities: ["Troisième lien routier", "Développement économique", "Sécurité publique"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "FD",
        source: "Nom et orientation générale du parti",
        note: "Critique les grands projets coûteux",
      },
      {
        questionId: questionIdMap[1],
        position: "N",
        source: "Position modérée documentée",
        note: "Pas d'opposition systématique mais privilégie la circulation automobile",
      },
      {
        questionId: questionIdMap[2],
        position: "FA",
        source: "Orientation générale pro-automobile",
        note: "Considère ce projet comme prioritaire",
      },
      {
        questionId: questionIdMap[3],
        position: "FA",
        source: "Orientation générale",
        note: "Favorable à la privatisation de certains services",
      },
      {
        questionId: questionIdMap[4],
        position: "PD",
        source: "Position modérée sur l'intervention réglementaire",
        note: "Réserves sur les quotas mais pas d'opposition absolue",
      },
      { questionId: questionIdMap[5], position: "FD" },
      { questionId: questionIdMap[6], position: "FD" },
      { questionId: questionIdMap[7], position: "FA" },
      { questionId: questionIdMap[8], position: "N" },
      { questionId: questionIdMap[9], position: "PD" },
      { questionId: questionIdMap[10], position: "N" },
      { questionId: questionIdMap[11], position: "FD" },
      { questionId: questionIdMap[12], position: "FD" },
      { questionId: questionIdMap[13], position: "FA" },
      { questionId: questionIdMap[14], position: "FA" },
      { questionId: questionIdMap[15], position: "FD" },
      { questionId: questionIdMap[16], position: "PD" },
      { questionId: questionIdMap[17], position: "FA" },
      { questionId: questionIdMap[18], position: "PD" },
      { questionId: questionIdMap[19], position: "N" },
      { questionId: questionIdMap[20], position: "FA" },
    ],
  },
  {
    id: "transition_quebec",
    name: "Transition Québec",
    shortName: "TQ",
    leader: "Jacquelyn Smith",
    logoUrl: "/logos/transition-quebec-new.png", // Updated
    color: "#00965e",
    websiteUrl: "https://transitionqc.org/",
    orientation: "Gauche écologiste",
    strengths: ["Environnement", "Transport collectif", "Justice sociale"],
    reserves: ["Développement économique traditionnel", "Projets routiers"],
    mainIdeasSummary: createSummary(
      "Gauche écologiste",
      ["Environnement", "Transport collectif", "Justice sociale"],
      ["Développement économique traditionnel", "Projets routiers"],
    ),
    priorities: ["Lutte aux changements climatiques", "Projet de tramway", "Logement abordable"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "FA",
        source: 'Site officiel, section "Pour notre environnement!"',
        note: "Soutient fermement les transports en commun structurants",
      },
      {
        questionId: questionIdMap[1],
        position: "FA",
        source: "Orientation écologique du parti",
        note: "Priorité claire aux modes de transport actifs",
      },
      {
        questionId: questionIdMap[2],
        position: "FD",
        source: "Site officiel, bannière principale",
        note: "J'affirme mon opposition au troisième lien",
      },
      {
        questionId: questionIdMap[3],
        position: "FD",
        source: "Orientation générale du parti",
        note: "Favorable à une gestion publique des services essentiels",
      },
      {
        questionId: questionIdMap[4],
        position: "FA",
        source: "Orientation sociale du parti",
        note: "Soutient des mesures fortes pour l'accès au logement",
      },
      { questionId: questionIdMap[5], position: "FA" },
      { questionId: questionIdMap[6], position: "FA" },
      { questionId: questionIdMap[7], position: "PD" },
      { questionId: questionIdMap[8], position: "FA" },
      { questionId: questionIdMap[9], position: "FA" },
      { questionId: questionIdMap[10], position: "FA" },
      { questionId: questionIdMap[11], position: "FA" },
      { questionId: questionIdMap[12], position: "FA" },
      { questionId: questionIdMap[13], position: "FD" },
      { questionId: questionIdMap[14], position: "FD" },
      { questionId: questionIdMap[15], position: "PA" },
      { questionId: questionIdMap[16], position: "FA" },
      { questionId: questionIdMap[17], position: "PD" },
      { questionId: questionIdMap[18], position: "FA" },
      { questionId: questionIdMap[19], position: "FA" },
      { questionId: questionIdMap[20], position: "FA" },
    ],
  },
]

export const getAgreementLabel = (question: Question, optionKey: AgreementOptionKey): string => {
  return question.customAgreementLabels 
    ? question.customAgreementLabels[optionKey] 
    : agreementLabels[optionKey];
}

export const getImportanceDirectLabel = (question: Question, optionKey: ImportanceDirectOptionKey): string => {
  return question.customImportanceDirectLabels
    ? question.customImportanceDirectLabels[optionKey]
    : importanceDirectLabels[optionKey];
}
