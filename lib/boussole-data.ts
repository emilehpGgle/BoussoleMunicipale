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
    text: "La municipalité devrait développer davantage les pistes cyclables, même si cela réduit l'espace pour les voitures.",
    category: "Mobilité et transport",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
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
    id: "q4_priorite_mobilite_active",
    text: "Pour améliorer l'attractivité du centre-ville, la priorité devrait être donnée aux piétons, cyclistes et au transport collectif, même si cela implique de réduire l'espace dédié à l'automobile (stationnements, voies de circulation, etc.).",
    category: "Mobilité et transport",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q5_quotas_logements_abordables",
    text: "La Ville devrait obliger un nombre minimum de logements abordables dans chaque nouveau projet immobilier.",
    category: "Habitation et aménagement urbain",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q6_reduction_depenses_taxes",
    text: "La municipalité devrait réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens.",
    category: "Gouvernance et finances municipales",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
    description: "Cette question évalue la priorité accordée à la réduction de la charge fiscale municipale.",
  },
  {
    id: "q7_immeubles_grande_hauteur",
    text: "Les immeubles de grande hauteur devraient être favorisés pour maximiser l'utilisation des terrains disponibles.",
    category: "Habitation et aménagement urbain",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q8_interdire_essence_centre_ville",
    text: "La Ville devrait interdire les véhicules à essence dans le centre-ville d'ici 2035.",
    category: "Environnement et développement durable",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
    description: "Cette question évalue la priorité accordée aux mesures environnementales radicales en mobilité urbaine.",
  },
  {
    id: "q9_protection_espaces_verts",
    text: "La Ville devrait mettre plus d'argent pour protéger et agrandir les espaces verts, même si cela nuit au développement de projets immobiliers.",
    category: "Environnement et développement durable",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
    description: "Cette question évalue la priorité accordée aux espaces verts face à la pression immobilière.",
  },
  {
    id: "q10_transition_carboneutre",
    text: "La Ville devrait accélérer la transition des bâtiments \"carboneutres\" (qui n'ajoutent pas de pollution au climat), même si ça coûte plus cher.",
    category: "Environnement et développement durable",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q11_reduction_dechets",
    text: "La Ville devrait améliorer la collecte des ordures au lieu de la réduire pour des raisons environnementales.",
    category: "Environnement et développement durable",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
    description: "Cette question évalue la priorité accordée aux services municipaux (collecte) par rapport à la réduction des collectes justifiée par l'environnement.",
  },
  {
    id: "q12_augmentation_taxes",
    text: "La Ville devrait investir davantage dans des projets écoresponsables (énergie verte, transport durable, bâtiments écologiques), même si cela nécessite d'augmenter les taxes foncières (impôt sur la propriété).",
    category: "Gouvernance et finances municipales",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q13_pouvoir_conseils_quartier",
    text: "La Ville devrait donner plus de pouvoir aux conseils de quartier pour décider des projets locaux.",
    category: "Gouvernance et finances municipales",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
    description: "Cette question évalue la priorité accordée à la décentralisation de la gouvernance municipale.",
  },
  {
    id: "q14_reduction_dette",
    text: "La Ville devrait prioriser l'amélioration des services essentiels (collecte des ordures, déneigement, etc.) avant d'investir dans des projets d'avenir.",
    category: "Gouvernance et finances municipales",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q15_avantages_fiscaux_entreprises",
    text: "La Ville devrait offrir plus de réductions de taxes ou autres avantages fiscaux pour attirer de grandes entreprises.",
    category: "Développement économique et social",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q16_limitation_touristes",
    text: "La Ville devrait limiter le nombre de touristes dans certains quartiers pour protéger la qualité de vie des résidents.",
    category: "Développement économique et social",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
    description: "Cette question mesure la priorité accordée à l'équilibre entre tourisme et vie locale.",
  },
  {
    id: "q17_soutien_organismes_communautaires",
    text: "La Ville devrait donner plus d'argent aux organismes communautaires qui aident pour des services sociaux essentiels (itinérance, aide alimentaire, etc).",
    category: "Développement économique et social",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q18_augmentation_effectifs_policiers",
    text: "Il faudrait augmenter le nombre de policiers pour améliorer la sécurité dans les quartiers.",
    category: "Sécurité publique et services municipaux",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
  },
  {
    id: "q19_investissement_infrastructures_loisirs_sportives",
    text: "La Ville devrait investir plus dans les parcs, arénas et terrains de sport de quartier.",
    category: "Sécurité publique et services municipaux",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
    description: "Cette question évalue la priorité accordée aux services de proximité.",
  },
  {
    id: "q20_protection_patrimoine",
    text: "La Ville devrait renforcer les règles qui protègent les vieux bâtiments et le patrimoine, même si cela limite certains projets.",
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
    logoUrl: "/logos/alliance-citoyenne.png",
    color: "#0D47A1",
    websiteUrl: "https://metroquebec.com/local/118385/c-est-quoi-l-alliance-citoyenne-de-quebec/",
    orientation: "Centre-droit libertarien",
    strengths: ["Réduction des taxes", "Développement économique", "Autonomie citoyenne"],
    reserves: ["Intervention gouvernementale", "Dépenses publiques excessives", "Politiques environnementales contraignantes"],
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
        position: "FA",
        source: "Projet spécifique de jetée de Beauport à l'Île d'Orléans puis pont vers Lévis",
        note: "Propose un projet de 3e lien estimé entre 1 et 3 milliards de dollars, rejetant l'option tunnel",
      },
      {
        questionId: questionIdMap[3],
        position: "PA",
        source: "Orientation générale favorable au transport collectif",
        note: "Soutient la réduction des stationnements pour promouvoir le transport collectif",
      },
      {
        questionId: questionIdMap[4],
        position: "PA",
        source: "Mentions de la crise du logement dans les communications",
        note: "Soutient des mesures pour augmenter l'offre de logements abordables",
      },
      {
        questionId: questionIdMap[5],
        position: "FD",
        source: "Philosophie libertarienne favorisant réduction des dépenses publiques",
        note: "Fortement en faveur de la réduction des taxes et des dépenses municipales",
      },
      {
        questionId: questionIdMap[6],
        position: "FD",
        source: "Orientation développement économique et densification urbaine efficace",
        note: "Favorise les immeubles de grande hauteur pour optimiser l'utilisation des terrains et le développement économique",
      },
      {
        questionId: questionIdMap[7],
        position: "FA",
        source: "Position climato-réaliste sceptique des mesures environnementales contraignantes",
        note: "Opposé aux interdictions jugées trop radicales et coûteuses",
      },
      { questionId: questionIdMap[8], position: "PA" },
      {
        questionId: questionIdMap[9],
        position: "PD",
      },
      {
        questionId: questionIdMap[10],
        position: "FA",
        source: "Position climato-réaliste de Daniel Brisson remettant en question le rôle humain dans le réchauffement",
        note: "Approche sceptique des politiques climatiques coûteuses",
      },
      {
        questionId: questionIdMap[11],
        position: "FD",
        source: "Philosophie libertarienne opposée aux mesures contraignantes pour les citoyens",
        note: "Privilégie l'autonomie citoyenne plutôt que les règlements stricts",
      },
      { questionId: questionIdMap[12], position: "FA" },
      {
        questionId: questionIdMap[13],
        position: "PD",
      },
      { questionId: questionIdMap[14], position: "PA" },
      {
        questionId: questionIdMap[15],
        position: "FD",
        source: "Programme explicite de réduction des taxes et abolition de certaines taxes municipales",
        note: "Veut abolir les parcomètres et la taxe d'accueil, réduire les dépenses publiques",
      },
      {
        questionId: questionIdMap[16],
        position: "PD",
      },
      { questionId: questionIdMap[17], position: "PA" },
      { questionId: questionIdMap[18], position: "PA" },
      { questionId: questionIdMap[19], position: "PD" },
      { questionId: questionIdMap[20], position: "PA" },
    ],
  },
  {
    id: "equipe_priorite_quebec",
    name: "Équipe priorité Québec",
    shortName: "EPQ",
    leader: "Stevens Mélançon",
    logoUrl: "/logos/equipe-priorite-quebec-new.png", // Updated
    color: "#004b87",
    websiteUrl: "https://equipeprioritequebec.ca/",
    orientation: "Centre pragmatique, opposition constructive",
    strengths: ["Respect", "Équité", "Excellence", "Innovation"],
    reserves: ["Réglementations excessives", "Nationalisme de façade", "Décisions sans acceptabilité sociale"],
    mainIdeasSummary: createSummary(
      "Centre pragmatique, opposition constructive",
      ["Respect", "Équité", "Excellence", "Innovation"],
      ["Réglementations excessives", "Nationalisme de façade", "Décisions sans acceptabilité sociale"],
    ),
    priorities: ["Environnement et espaces verts", "Services municipaux", "Transport et mobilité"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "FD",
        source: 'Approche pragmatique, opposition constructive',
        note: "Position équilibrée - demande acceptabilité sociale et évaluations responsables des projets de transport",
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
        source: "Stevens Mélançon, 2025 - Réaction au corridor choisi par la CAQ",
        note: "'Je ne peux qu'être déçu pour les citoyens que je représente du côté est qui pensaient fort que bien que le tracé aller passer à cette place-là' - Position nuancée, représente les citoyens de l'est",
      },
      {
        questionId: questionIdMap[3],
        position: "PA",
        source: "Approche pragmatique favorable au transport collectif",
        note: "Soutient les mesures encourageant le transport collectif si socialement acceptables",
      },
      {
        questionId: questionIdMap[4],
        position: "FA",
        source: "Valeur d'équité mentionnée sur le site",
        note: "Favorable à l'accès au logement mais peu de détails sur les mécanismes",
      },
      {
        questionId: questionIdMap[5],
        position: "PA",
        source: "Opposition constructive aux dépenses excessives",
        note: "Favorise une gestion responsable des finances municipales",
      },
      {
        questionId: questionIdMap[6],
        position: "PA",
        source: "Préservation du caractère résidentiel et de la qualité de vie",
        note: "Opposé aux immeubles de grande hauteur qui peuvent nuire au caractère des quartiers",
      },
      {
        questionId: questionIdMap[7],
        position: "PA",
        source: "Réserves sur les réglementations excessives",
        note: "Opposé aux mesures environnementales trop contraignantes sans acceptabilité sociale",
      },
      { questionId: questionIdMap[8], position: "FA" },
      { questionId: questionIdMap[9], position: "FA" },
      { questionId: questionIdMap[10], position: "PD" },
      {
        questionId: questionIdMap[11],
        position: "FD",
      },
      {
        questionId: questionIdMap[12],
        position: "PA",
      },
      {
        questionId: questionIdMap[13],
        position: "N",
      },
      {
        questionId: questionIdMap[14],
        position: "N",
      },
      {
        questionId: questionIdMap[15],
        position: "N",
      },
      {
        questionId: questionIdMap[16],
        position: "PA",
      },
      {
        questionId: questionIdMap[17],
        position: "N",
      },
      {
        questionId: questionIdMap[18],
        position: "PA",
      },
      { questionId: questionIdMap[19], position: "N" },
      { questionId: questionIdMap[20], position: "PA" },
    ],
  },
  {
    id: "leadership_quebec",
    name: "Leadership Québec - Équipe Sam Hamad",
    shortName: "LQ",
    leader: "Sam Hamad",
    logoUrl: "/logos/leadership-quebec-new.png",
    color: "#004a99",
    websiteUrl: "https://leadershipquebec.ca/",
    orientation: "Centriste, posture prudente et technocratique",
    strengths: ["SRB structurant (à l'étude)", "Approche de gestion prudente", "Développement économique (non tranché)"],
    reserves: ["Positions publiques incomplètes sur plusieurs enjeux", "Engagements économiques encore peu détaillés"],
    mainIdeasSummary: createSummary(
      "Centriste, posture prudente et technocratique",
      ["SRB structurant (à l'étude)", "Approche de gestion prudente", "Développement économique (non tranché)"],
      ["Positions publiques incomplètes sur plusieurs enjeux", "Engagements économiques encore peu détaillés"],
    ),
    priorities: ["Transport et mobilité", "Gestion des finances municipales", "Services municipaux"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "PD",
        source: "Données actualisées 2025",
        note: "Plutôt opposé au projet de tramway",
      },
      {
        questionId: questionIdMap[1],
        position: "PD",
        source: "Données actualisées 2025",
        note: "Plutôt opposé à prioriser les pistes cyclables au détriment des voies automobiles",
      },
      {
        questionId: questionIdMap[2],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur le troisième lien routier",
      },
      {
        questionId: questionIdMap[3],
        position: "PD",
        source: "Données actualisées 2025",
        note: "Plutôt opposé à la réduction des stationnements",
      },
      {
        questionId: questionIdMap[4],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur les quotas de logements abordables",
      },
      {
        questionId: questionIdMap[5],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur de réduire les dépenses et taxes",
      },
      {
        questionId: questionIdMap[6],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur les immeubles de grande hauteur",
      },
      {
        questionId: questionIdMap[7],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur l'interdiction des véhicules à essence",
      },
      {
        questionId: questionIdMap[8],
        position: "PD",
        source: "Données actualisées 2025",
        note: "Plutôt opposé à protéger les espaces verts si cela nuit au développement",
      },
      {
        questionId: questionIdMap[9],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur la transition des bâtiments carboneutres",
      },
      {
        questionId: questionIdMap[10],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur l'amélioration de la collecte des ordures",
      },
      {
        questionId: questionIdMap[11],
        position: "PD",
        source: "Données actualisées 2025",
        note: "Plutôt opposé aux projets écoresponsables si cela augmente les taxes",
      },
      {
        questionId: questionIdMap[12],
        position: "N",
        source: "Valorise l'écoute citoyenne",
        note: "Sans appuyer les structures formelles de conseils de quartier",
      },
      {
        questionId: questionIdMap[13],
        position: "PA",
        source: "Discours récurrent sur la rigueur budgétaire et la saine gestion",
        note: "Tendance à prioriser la discipline financière et le contrôle de la dette",
      },
      {
        questionId: questionIdMap[14],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur des avantages fiscaux pour attirer les entreprises",
      },
      {
        questionId: questionIdMap[15],
        position: "N",
        source: "Non abordé dans la plateforme",
        note: "Pas de position claire sur la limitation du tourisme",
      },
      {
        questionId: questionIdMap[16],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur le financement des organismes communautaires",
      },
      {
        questionId: questionIdMap[17],
        position: "N",
        source: "Aucun engagement clair sur l'augmentation ou la réduction",
        note: "Neutre sur les effectifs policiers",
      },
      {
        questionId: questionIdMap[18],
        position: "PD",
        source: "Données actualisées 2025",
        note: "Plutôt opposé à investir davantage dans les parcs et arénas",
      },
      {
        questionId: questionIdMap[19],
        position: "N",
        source: "Non abordé dans la plateforme 2025",
        note: "Pas de position claire sur la protection du patrimoine",
      },
      {
        questionId: questionIdMap[20],
        position: "PA",
        source: "Mobilité (SRB), rigueur fiscale, relance économique",
        note: "Priorités : implication citoyenne et développement économique",
      },
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
    priorities: ["Services municipaux", "Transport et mobilité", "Logement abordable"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur du tramway",
      },
      {
        questionId: questionIdMap[1],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur des pistes cyclables",
      },
      {
        questionId: questionIdMap[2],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur du troisième lien routier",
      },
      {
        questionId: questionIdMap[3],
        position: "N",
        source: "Données actualisées 2025",
        note: "Plutôt opposé à la réduction des stationnements centre-ville",
      },
      {
        questionId: questionIdMap[4],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur les quotas de logements abordables",
      },
      {
        questionId: questionIdMap[5],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur la réduction des dépenses selon la capacité de payer",
      },
      {
        questionId: questionIdMap[6],
        position: "PD",
        source: "Données actualisées 2025",
        note: "Plutôt opposé aux immeubles de grande hauteur",
      },
      {
        questionId: questionIdMap[7],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur d'interdire les véhicules à essence au centre-ville en 2035",
      },
      {
        questionId: questionIdMap[8],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur les espaces verts",
      },
      {
        questionId: questionIdMap[9],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt opposé à la transition des bâtiments carboneutres",
      },
      {
        questionId: questionIdMap[10],
        position: "N",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur de la collecte des ordures au 3 semaines",
      },
      {
        questionId: questionIdMap[11],
        position: "N",
        source: "Données actualisées 2025",
        note: "Plutôt opposé aux projets écoresponsables",
      },
      {
        questionId: questionIdMap[12],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur de donner plus de pouvoir aux conseils de quartier",
      },
      {
        questionId: questionIdMap[13],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Position neutre sur la réduction des dépenses selon la capacité de payer",
      },
      {
        questionId: questionIdMap[14],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur les réductions de taxes",
      },
      {
        questionId: questionIdMap[15],
        position: "PD",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur de limiter le tourisme",
      },
      {
        questionId: questionIdMap[16],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur le financement des organismes communautaires",
      },
      {
        questionId: questionIdMap[17],
        position: "PD",
        source: "Données actualisées 2025",
        note: "Plutôt opposé à augmenter les effectifs policiers",
      },
      {
        questionId: questionIdMap[18],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur l'investissement dans les parcs, arénas et terrains de sport",
      },
      {
        questionId: questionIdMap[19],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur la protection du patrimoine",
      },
      {
        questionId: questionIdMap[20],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Priorités du parti selon leur orientation centriste pragmatique",
      },
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
        position: "PD",
        source: "Déclarations publiques nuancées",
        note: "A exprimé des réserves tout en reconnaissant certains besoins",
      },
      {
        questionId: questionIdMap[3],
        position: "PA",
        source: "Administration Marchand favorable au transport collectif",
        note: "Fortement en faveur de la réduction des stationnements pour encourager le transport collectif",
      },
      {
        questionId: questionIdMap[4],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur des quotas de logements abordables",
      },
      {
        questionId: questionIdMap[5],
        position: "PD",
        source: "Centre-gauche progressiste privilégiant l'investissement public",
        note: "Opposé à la réduction des dépenses, préfère investir dans les services et projets d'avenir",
      },
      {
        questionId: questionIdMap[6],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé aux immeubles de grande hauteur",
      },
      {
        questionId: questionIdMap[7],
        position: "PA",
        source: "Administration Marchand engagée dans la transition écologique",
        note: "Plutôt en faveur de l'interdiction des véhicules à essence comme mesure environnementale",
      },
      {
        questionId: questionIdMap[8],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur des espaces verts",
      },
      {
        questionId: questionIdMap[9],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur de la transition des bâtiments carboneutres",
      },
      {
        questionId: questionIdMap[10],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Plutôt opposé à la collecte des ordures au 3 semaines",
      },
      {
        questionId: questionIdMap[11],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur des projets écoresponsables",
      },
      {
        questionId: questionIdMap[12],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé à donner plus de pouvoir aux conseils de quartier",
      },
      {
        questionId: questionIdMap[13],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur la réduction des dépenses selon la capacité de payer",
      },
      {
        questionId: questionIdMap[14],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé à offrir plus de réductions de taxes",
      },
      {
        questionId: questionIdMap[15],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Position neutre sur la limitation des touristes",
      },
      {
        questionId: questionIdMap[16],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur le financement des organismes communautaires",
      },
      {
        questionId: questionIdMap[17],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur d'augmenter les effectifs policiers",
      },
      {
        questionId: questionIdMap[18],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur d'investir dans les parcs, arénas et terrains de sport",
      },
      {
        questionId: questionIdMap[19],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur de la protection du patrimoine",
      },
      {
        questionId: questionIdMap[20],
        position: "FA",
        source: "Priorités du parti selon leur orientation centre-gauche progressiste",
        note: "Priorités du parti: tramway, logement abordable, environnement",
      },
    ],
  },
  {
    id: "respect_citoyens",
    name: "Respect citoyens",
    shortName: "RC",
    leader: "Stéphane Lachance",
    logoUrl: "/logos/respect-citoyens-new.png",
    color: "#D32F2F",
    websiteUrl: "https://www.respectcitoyens.org/",
    orientation: "Conservateur-populiste, localiste",
    strengths: ["Gestion budgétaire stricte", "Proximité citoyenne", "Opposition aux grands projets coûteux"],
    reserves: ["Méfiance envers la centralisation", "Réglementations excessives"],
    mainIdeasSummary: createSummary(
      "Conservateur-populiste, localiste",
      ["Gestion budgétaire stricte", "Proximité citoyenne", "Opposition aux grands projets coûteux"],
      ["Méfiance envers la centralisation", "Réglementations excessives"],
    ),
    priorities: ["Gestion des finances municipales", "Services municipaux", "Troisième lien routier"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "FD",
        source: "Données actualisées 2025",
        note: "S'oppose aux grands projets jugés coûteux comme le tramway",
      },
      {
        questionId: questionIdMap[1],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé à la priorisation des pistes cyclables au détriment des voies automobiles",
      },
      {
        questionId: questionIdMap[2],
        position: "FA",
        source: "Plateforme électorale Respect citoyens",
        note: "Projet prioritaire du parti, perçu comme essentiel pour le développement régional",
      },
      {
        questionId: questionIdMap[3],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé à la réduction des stationnements au profit du transport collectif",
      },
      {
        questionId: questionIdMap[4],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé aux quotas obligatoires de logements abordables",
      },
      {
        questionId: questionIdMap[5],
        position: "FA",
        source: "Objectif majeur du parti : saine gestion et discipline budgétaire",
        note: "Fortement en faveur de la réduction des dépenses et taxes municipales",
      },
      {
        questionId: questionIdMap[6],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur des immeubles de grande hauteur pour maximiser l'utilisation des terrains",
      },
      {
        questionId: questionIdMap[7],
        position: "FD",
        source: "S'oppose aux plans jugés idéologiques et irréalistes de transition écologique",
        note: "Fortement opposé aux mesures environnementales contraignantes comme l'interdiction des véhicules à essence",
      },
      {
        questionId: questionIdMap[8],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé aux espaces verts si cela nuit au développement immobilier",
      },
      {
        questionId: questionIdMap[9],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé à la transition des bâtiments carboneutres si coûteuse",
      },
      {
        questionId: questionIdMap[10],
        position: "FA",
        source: "Données actualisées 2025 - Réponse officielle du parti",
        note: "Fortement en faveur d'améliorer la collecte des ordures plutôt que de la réduire",
      },
      {
        questionId: questionIdMap[11],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé aux projets écoresponsables si cela augmente les taxes",
      },
      {
        questionId: questionIdMap[12],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur de donner plus de pouvoir aux conseils de quartier",
      },
      {
        questionId: questionIdMap[13],
        position: "FA",
        source: "Plateforme électorale Respect citoyens",
        note: "Objectif majeur du parti : saine gestion et discipline budgétaire",
      },
      {
        questionId: questionIdMap[14],
        position: "FA",
        source: "Plateforme électorale Respect citoyens",
        note: "Pour stimuler l'économie locale et attirer les investisseurs",
      },
      {
        questionId: questionIdMap[15],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur de limiter le tourisme pour protéger la qualité de vie",
      },
      {
        questionId: questionIdMap[16],
        position: "PD",
        source: "Données actualisées 2025",
        note: "Plutôt opposé à augmenter le financement des organismes communautaires",
      },
      {
        questionId: questionIdMap[17],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur d'augmenter les effectifs policiers",
      },
      {
        questionId: questionIdMap[18],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur d'investir dans les parcs, arénas et terrains de sport",
      },
      {
        questionId: questionIdMap[19],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé au renforcement des règles de protection du patrimoine",
      },
      {
        questionId: questionIdMap[20],
        position: "FA",
        source: "Plateforme électorale Respect citoyens",
        note: "Le parti met de l'avant : troisième lien, fiscalité, développement économique et participation citoyenne",
      },
    ],
  },
  {
    id: "transition_quebec",
    name: "Transition Québec",
    shortName: "TQ",
    leader: "Jackie Smith",
    logoUrl: "/logos/transition-quebec-new.png", // Updated
    color: "#00965e",
    websiteUrl: "https://transitionqc.org/",
    orientation: "Écologiste progressiste, gauche municipale",
    strengths: ["Vision écologiste cohérente", "Engagement ferme justice sociale", "Opposition claire intérêts immobiliers", "Leadership environnemental local", "Promotion francophonie municipale"],
    reserves: ["Positions parfois perçues comme trop radicales", "Tension entre allègement fiscal et financement transition", "Opposition systématique secteur privé"],
    mainIdeasSummary: createSummary(
      "Écologiste progressiste, gauche municipale",
      ["Vision écologiste cohérente", "Engagement ferme justice sociale", "Opposition claire intérêts immobiliers", "Leadership environnemental local", "Promotion francophonie municipale"],
      ["Positions parfois perçues comme trop radicales", "Tension entre allègement fiscal et financement transition", "Opposition systématique secteur privé"],
    ),
    priorities: ["Logement abordable", "Environnement et espaces verts", "Transport et mobilité"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur du tramway",
      },
      {
        questionId: questionIdMap[1],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur des pistes cyclables",
      },
      {
        questionId: questionIdMap[2],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé au troisième lien routier",
      },
      {
        questionId: questionIdMap[3],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur de la réduction des stationnements centre-ville",
      },
      {
        questionId: questionIdMap[4],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur des quotas de logements abordables",
      },
      {
        questionId: questionIdMap[5],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé à la réduction des dépenses selon la capacité de payer",
      },
      {
        questionId: questionIdMap[6],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé aux immeubles de grande hauteur - préfère densification réfléchie",
      },
      {
        questionId: questionIdMap[7],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur d'interdire les véhicules à essence au centre-ville en 2035",
      },
      {
        questionId: questionIdMap[8],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur des espaces verts",
      },
      {
        questionId: questionIdMap[9],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur de la transition des bâtiments carboneutres",
      },
      {
        questionId: questionIdMap[10],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé à la collecte des ordures au 3 semaines",
      },
      {
        questionId: questionIdMap[11],
        position: "FA",
        source: "Données actualisées 2025",
        note: "Fortement en faveur des projets écoresponsables",
      },
      {
        questionId: questionIdMap[12],
        position: "PD",
        source: "Données actualisées 2025",
        note: "Fortement en faveur de donner plus de pouvoir aux conseils de quartier",
      },
      {
        questionId: questionIdMap[13],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Plutôt opposé à réduire les dépenses selon la capacité de payer",
      },
      {
        questionId: questionIdMap[14],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement opposé à offrir plus de réductions de taxes",
      },
      {
        questionId: questionIdMap[15],
        position: "N",
        source: "Données actualisées 2025",
        note: "Position neutre sur la limitation des touristes",
      },
      {
        questionId: questionIdMap[16],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur du financement des organismes communautaires",
      },
      {
        questionId: questionIdMap[17],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Plutôt opposé à augmenter les effectifs policiers",
      },
      {
        questionId: questionIdMap[18],
        position: "FD",
        source: "Données actualisées 2025",
        note: "Fortement en faveur d'investir dans les parcs, arénas et terrains de sport",
      },
      {
        questionId: questionIdMap[19],
        position: "PA",
        source: "Données actualisées 2025",
        note: "Plutôt en faveur de la protection du patrimoine",
      },
      {
        questionId: questionIdMap[20],
        position: "FA",
        source: "Priorités du parti selon leur orientation écologiste progressiste",
        note: "Priorités : logement abordable, environnement, transport durable",
      },
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
