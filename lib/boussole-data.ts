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
    text: "La municipalité devrait investir davantage dans la protection et l'agrandissement des espaces verts, même au détriment du développement immobilier.",
    category: "Environnement et développement durable",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
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
    text: "La municipalité devrait donner plus de pouvoir décisionnel aux conseils de quartier sur les projets locaux.",
    category: "Gouvernance et finances municipales",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
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
    text: "La municipalité devrait limiter le nombre de touristes dans certains secteurs pour préserver la qualité de vie des résidents.",
    category: "Développement économique et social",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
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
    text: "La municipalité devrait investir davantage dans les infrastructures de loisirs et sportives de quartier.",
    category: "Sécurité publique et services municipaux",
    responseType: "agreement",
    agreementOptions: ["FA", "PA", "N", "PD", "FD", "IDK"],
    importanceOptions: [5, 4, 3, 2, 1],
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
      {
        questionId: questionIdMap[10],
        position: "PD",
        source: "Position climato-réaliste de Daniel Brisson remettant en question le rôle humain dans le réchauffement",
        note: "Approche sceptique des politiques climatiques coûteuses",
      },
      {
        questionId: questionIdMap[11],
        position: "FD",
        source: "Philosophie libertarienne opposée aux mesures contraignantes pour les citoyens",
        note: "Privilégie l'autonomie citoyenne plutôt que les règlements stricts",
      },
      { questionId: questionIdMap[12], position: "PA" },
      { questionId: questionIdMap[13], position: "PA" },
      { questionId: questionIdMap[14], position: "PA" },
      {
        questionId: questionIdMap[15],
        position: "FD",
        source: "Programme explicite de réduction des taxes et abolition de certaines taxes municipales",
        note: "Veut abolir les parcomètres et la taxe d'accueil, réduire les dépenses publiques",
      },
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
        position: "N",
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
    leader: "Sam Hamad",
    logoUrl: "/logos/leadership-quebec-new.png",
    color: "#004a99",
    websiteUrl: "https://leadershipquebec.ca/",
    orientation: "Centre-droit pragmatique et technocratique",
    strengths: ["SRB structurant", "Réduction de la fiscalité", "Discours pro-développement"],
    reserves: ["Peu d'engagement environnemental", "Logement social ou culture"],
    mainIdeasSummary: createSummary(
      "Centre-droit pragmatique et technocratique",
      ["SRB structurant", "Réduction de la fiscalité", "Discours pro-développement"],
      ["Peu d'engagement environnemental", "Logement social ou culture"],
    ),
    priorities: ["Mobilité (SRB)", "Rigueur fiscale", "Relance économique", "Implication citoyenne"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "FD",
        source: "Journal de Québec, 24 mai 2025 - Vérification des déclarations",
        note: "Veut abandonner le projet malgré les pénalités estimées entre 153,7M$ et 371,7M$",
      },
      {
        questionId: questionIdMap[1],
        position: "FD",
        source: "Critique Sam Hamad sur la réduction de voies automobiles",
        note: "Accuse Marchand d'« une guerre à l'auto »",
      },
      {
        questionId: questionIdMap[2],
        position: "PA",
        source: "Appui au SRB pour connecter banlieues",
        note: "Posture pro-circulation interrives",
      },
      {
        questionId: questionIdMap[3],
        position: "N",
        source: "Aucun soutien explicite aux partenariats privé-public mentionné 2025",
        note: "Neutre sur la privatisation du transport",
      },
      {
        questionId: questionIdMap[4],
        position: "PD",
        source: "Peu d'intérêt pour les mesures interventionnistes",
        note: "Priorité à l'efficacité plutôt qu'aux quotas",
      },
      {
        questionId: questionIdMap[5],
        position: "N",
        source: "N'aborde pas clairement la question",
        note: "Ni en soutien ni en critique de la densification",
      },
      {
        questionId: questionIdMap[6],
        position: "N",
        source: "Non abordé dans les communiqués",
        note: "Pas de position claire sur les restrictions Airbnb",
      },
      {
        questionId: questionIdMap[7],
        position: "PA",
        source: "Logique de simplification réglementaire",
        note: "Compatible avec leur approche de développement",
      },
      {
        questionId: questionIdMap[8],
        position: "N",
        source: "Non mentionné dans la plateforme",
        note: "Pas de position claire sur les espaces verts",
      },
      {
        questionId: questionIdMap[9],
        position: "PD",
        source: "Pas d'objectifs annoncés",
        note: "Priorité à la fiscalité et aux transports plutôt qu'à la carboneutralité",
      },
      {
        questionId: questionIdMap[10],
        position: "N",
        source: "Aucun programme ou priorité sur ce dossier",
        note: "Non abordé dans les informations publiques",
      },
      {
        questionId: questionIdMap[11],
        position: "FD",
        source: "Promet l'abolition de la « taxe Marchand » sur l'immatriculation",
        note: "Discours axé sur la réduction de la charge fiscale",
      },
      {
        questionId: questionIdMap[12],
        position: "N",
        source: "Valorise l'écoute citoyenne",
        note: "Sans appuyer les structures formelles de conseils de quartier",
      },
      {
        questionId: questionIdMap[13],
        position: "FA",
        source: "Discours axé sur la rigueur budgétaire",
        note: "Priorité à l'allègement fiscal",
      },
      {
        questionId: questionIdMap[14],
        position: "PA",
        source: "Favorise l'attractivité économique",
        note: "Soutien aux avantages pour les entreprises",
      },
      {
        questionId: questionIdMap[15],
        position: "N",
        source: "Non abordé dans la plateforme",
        note: "Pas de position claire sur la limitation du tourisme",
      },
      {
        questionId: questionIdMap[16],
        position: "PA",
        source: "Valorise les OBNL efficaces",
        note: "Soutien à l'engagement citoyen structurant",
      },
      {
        questionId: questionIdMap[17],
        position: "N",
        source: "Aucun engagement clair sur l'augmentation ou la réduction",
        note: "Neutre sur les effectifs policiers",
      },
      {
        questionId: questionIdMap[18],
        position: "PA",
        source: "Souhaite des projets pour tous les quartiers",
        note: "Soutien aux infrastructures culturelles et sportives pour jeunes familles",
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
    priorities: ["Troisième lien routier", "Fiscalité", "Développement économique", "Participation citoyenne"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "FD",
        source: "Plateforme électorale Respect citoyens",
        note: "S'oppose aux grands projets jugés coûteux comme le tramway",
      },
      {
        questionId: questionIdMap[1],
        position: "PD",
        source: "Plateforme électorale Respect citoyens",
        note: "Critique la perte de voies pour les automobilistes et une approche déséquilibrée de la mobilité",
      },
      {
        questionId: questionIdMap[2],
        position: "FA",
        source: "Plateforme électorale Respect citoyens",
        note: "Projet prioritaire du parti, perçu comme essentiel pour le développement régional",
      },
      {
        questionId: questionIdMap[3],
        position: "PA",
        source: "Plateforme électorale Respect citoyens",
        note: "Ouvert aux modèles mixtes, à condition que la ville garde une supervision",
      },
      {
        questionId: questionIdMap[4],
        position: "N",
        source: "Plateforme électorale Respect citoyens",
        note: "Rejette les quotas obligatoires mais reconnaît le besoin d'accès au logement",
      },
      {
        questionId: questionIdMap[5],
        position: "FD",
        source: "Plateforme électorale Respect citoyens",
        note: "Opposé à la densification imposée ; prône la préservation du caractère des quartiers",
      },
      {
        questionId: questionIdMap[6],
        position: "FD",
        source: "Plateforme électorale Respect citoyens",
        note: "Défend la liberté d'usage des propriétés",
      },
      {
        questionId: questionIdMap[7],
        position: "FA",
        source: "Plateforme électorale Respect citoyens",
        note: "Veut réduire les freins bureaucratiques à la construction résidentielle",
      },
      {
        questionId: questionIdMap[8],
        position: "PA",
        source: "Plateforme électorale Respect citoyens",
        note: "Favorise les milieux de vie sains, mais sans lourdeur réglementaire",
      },
      {
        questionId: questionIdMap[9],
        position: "FD",
        source: "Plateforme électorale Respect citoyens",
        note: "S'oppose aux plans jugés idéologiques et irréalistes de transition écologique",
      },
      {
        questionId: questionIdMap[10],
        position: "N",
        source: "Plateforme électorale Respect citoyens",
        note: "Peu de prise de position concrète ; thème secondaire dans leur plateforme",
      },
      {
        questionId: questionIdMap[11],
        position: "FD",
        source: "Plateforme électorale Respect citoyens",
        note: "Refus clair de toute hausse de taxes ; priorité à la réduction des dépenses",
      },
      {
        questionId: questionIdMap[12],
        position: "PD",
        source: "Plateforme électorale Respect citoyens",
        note: "Méfiance envers les structures intermédiaires ; préfère la participation directe",
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
        position: "N",
        source: "Plateforme électorale Respect citoyens",
        note: "Ne se prononce pas clairement contre le tourisme ; souhaite des retombées économiques équilibrées",
      },
      {
        questionId: questionIdMap[16],
        position: "PA",
        source: "Plateforme électorale Respect citoyens",
        note: "Appuie les services de proximité, sans excès de dépenses publiques",
      },
      {
        questionId: questionIdMap[17],
        position: "N",
        source: "Plateforme électorale Respect citoyens",
        note: "Priorise la prévention et les services de proximité ; peu d'accent sur la répression",
      },
      {
        questionId: questionIdMap[18],
        position: "FA",
        source: "Plateforme électorale Respect citoyens",
        note: "Soutient les installations accessibles, ancrées dans les quartiers",
      },
      {
        questionId: questionIdMap[19],
        position: "PA",
        source: "Plateforme électorale Respect citoyens",
        note: "Valorise le patrimoine, mais refuse une approche trop contraignante",
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
    priorities: ["Logement abordable", "Qualité de l'air", "Mobilité durable", "Francophonie"],
    positions: [
      {
        questionId: questionIdMap[0],
        position: "FA",
        source: "Journal de Québec - Jackie Smith candidate (mai 2025)",
        note: "Priorité absolue pour la mobilité durable",
      },
      {
        questionId: questionIdMap[1],
        position: "FA",
        source: "Orientation mobilité verte prioritaire",
        note: "Fortement pour les pistes cyclables dans le cadre de la mobilité verte",
      },
      {
        questionId: questionIdMap[2],
        position: "FD",
        source: "Journal de Québec - Critique 3e lien (juillet 2025)",
        note: "\"C'est tellement insultant... un projet qui n'a aucun sens\"",
      },
      {
        questionId: questionIdMap[3],
        position: "FD",
        source: "Position contre privatisation, veut gratuité transport en commun",
        note: "Opposition ferme à la privatisation, \"continuer à pousser pour la gratuité du transport en commun\"",
      },
      {
        questionId: questionIdMap[4],
        position: "FA",
        source: "Transition Québec - Logement abordable (juin 2025)",
        note: "\"Le coût du logement sera un incontournable de la prochaine campagne\"",
      },
      {
        questionId: questionIdMap[5],
        position: "FA",
        source: "Fortement pour densification contre étalement urbain",
        note: "Contre l'étalement urbain, pour la densification responsable",
      },
      {
        questionId: questionIdMap[6],
        position: "FA",
        source: "Transition Québec - Logement abordable (juin 2025)",
        note: "\"Nous lutterons énergiquement contre... les locations de type Airbnb\"",
      },
      {
        questionId: questionIdMap[7],
        position: "PA",
        source: "Pour faciliter logement abordable",
        note: "Assouplissement pour faciliter le logement abordable",
      },
      {
        questionId: questionIdMap[8],
        position: "FA",
        source: "Bilan municipal Limoilou (novembre 2022)",
        note: "\"L'enjeu numéro 1 des gens de Limoilou, c'est la qualité de l'air\"",
      },
      {
        questionId: questionIdMap[9],
        position: "FA",
        source: "Journal de Québec - Jackie Smith candidate (mai 2025)",
        note: "\"faire face aux changements climatiques\"",
      },
      {
        questionId: questionIdMap[10],
        position: "FA",
        source: "Fortement pour gestion durable",
        note: "Engagement fort pour la réduction des déchets et gestion durable",
      },
      {
        questionId: questionIdMap[11],
        position: "N",
        source: "Journal de Québec - Jackie Smith candidate (mai 2025)",
        note: "\"Il faut alléger le fardeau des citoyens\" vs financer la transition",
      },
      {
        questionId: questionIdMap[12],
        position: "FA",
        source: "Journal de Québec - Jackie Smith candidate (mai 2025)",
        note: "\"démocratie participative\", sondages citoyens",
      },
      {
        questionId: questionIdMap[13],
        position: "PD",
        source: "Contre réduction dette, investissements verts prioritaires",
        note: "Opposition car les investissements verts sont prioritaires",
      },
      {
        questionId: questionIdMap[14],
        position: "FD",
        source: "Transition Québec - Logement abordable (juin 2025)",
        note: "Contre la pression des promoteurs immobiliers",
      },
      {
        questionId: questionIdMap[15],
        position: "N",
        source: "Non abordé dans les sources analysées",
        note: "Position non documentée sur la limitation du tourisme",
      },
      {
        questionId: questionIdMap[16],
        position: "FA",
        source: "Transition Québec - Projet John Howard (juin 2025)",
        note: "Soutien au Centre des femmes de la Basse-Ville",
      },
      {
        questionId: questionIdMap[17],
        position: "PD",
        source: "Contre approche répressive, préfère prévention sociale",
        note: "Opposition à l'augmentation des effectifs, privilégie la prévention",
      },
      {
        questionId: questionIdMap[18],
        position: "FA",
        source: "Pour équipements de proximité",
        note: "Soutien fort aux infrastructures de loisirs et sportives de quartier",
      },
      {
        questionId: questionIdMap[19],
        position: "PA",
        source: "Transition Québec - Saint-Jean francophone (juin 2025)",
        note: "Focus sur patrimoine culturel francophone prioritaire",
      },
      {
        questionId: questionIdMap[20],
        position: "FA",
        source: "Synthèse des priorités 2025",
        note: "Logement, qualité de l'air, mobilité durable, francophonie",
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
