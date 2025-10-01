-- ========================================================================
-- MIGRATION 10: INSÉRER LES DONNÉES DES LEADERS (CORRIGÉE)
-- ========================================================================
-- Date: 2025-09-30
-- Description: Insertion des profils enrichis des leaders pour Québec et Montréal
--              MAPPING VÉRIFIÉ AVEC DONNÉES SUPABASE PRODUCTION
-- ========================================================================

-- ========================================================================
-- LEADERS DE QUÉBEC (6 leaders)
-- ========================================================================

-- Sam Hamad (Leadership Québec)
INSERT INTO leaders (id, name, slug, party_id, municipality_id, biography, photo_url, experience, vision_2025, achievements) VALUES
('sam-hamad', 'Sam Hamad', 'sam-hamad', 'leadership-quebec', 'quebec',
'Sam Hamad est le chef de Leadership Québec, coalition municipale issue de la fusion avec Équipe Priorité Québec (Stevens Mélançon) en août 2025. Ancien ministre dans le gouvernement du Québec, il possède une vaste expérience en gestion publique et en développement économique. Il propose une posture prudente et technocratique avec une opposition ferme au tramway et une alternative SRB+.',
'/Leaders/Sam_Hamad.jpg',
'["Chef de Leadership Québec depuis 2025", "Fusion avec Équipe Priorité Québec (août 2025)", "Ancien ministre dans le gouvernement du Québec", "Homme d''affaires et entrepreneur", "Expert en développement économique régional"]'::jsonb,
'Sam Hamad propose une gestion prudente et efficace de la ville, en mettant l''accent sur le développement économique durable, l''optimisation des services municipaux et une approche équilibrée du développement urbain. Opposition au tramway avec proposition SRB structurant. Coalition avec Stevens Mélançon pour les élections 2025.',
'["Leadership en développement économique", "Expérience ministérielle au gouvernement provincial", "Création d''emplois dans la région de Québec", "Promotion de partenariats public-privé", "Fusion stratégique avec Équipe Priorité Québec"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  biography = EXCLUDED.biography,
  photo_url = EXCLUDED.photo_url,
  experience = EXCLUDED.experience,
  vision_2025 = EXCLUDED.vision_2025,
  achievements = EXCLUDED.achievements;

-- Claude Villeneuve (Québec d'abord)
INSERT INTO leaders (id, name, slug, party_id, municipality_id, biography, photo_url, experience, vision_2025, achievements) VALUES
('claude-villeneuve', 'Claude Villeneuve', 'claude-villeneuve', 'quebec-dabord', 'quebec',
'Claude Villeneuve est le chef de Québec d''abord, un parti centriste et pragmatique qui prône la priorité aux citoyens de Québec dans les décisions municipales. Il apporte une perspective axée sur la continuité gestionnaire, la proximité citoyenne et la responsabilité fiscale.',
'/Leaders/Claude_Villeneuve.jpg',
'["Chef de Québec d''abord", "Défenseur des valeurs citoyennes", "Promoteur de la continuité gestionnaire", "Militant pour la proximité citoyenne"]'::jsonb,
'Claude Villeneuve propose de remettre les citoyens de Québec au centre des priorités municipales, avec une gestion rigoureuse des finances publiques et une attention particulière aux besoins des résidents. Approche pragmatique et centriste pour 2025.',
'["Défense des intérêts des citoyens de Québec", "Promotion de la transparence gouvernementale", "Advocacy pour une gestion fiscale responsable", "Développement de politiques pro-citoyens"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  biography = EXCLUDED.biography,
  photo_url = EXCLUDED.photo_url,
  experience = EXCLUDED.experience,
  vision_2025 = EXCLUDED.vision_2025,
  achievements = EXCLUDED.achievements;

-- Bruno Marchand (Québec forte et fière)
INSERT INTO leaders (id, name, slug, party_id, municipality_id, biography, photo_url, experience, vision_2025, achievements, website_url) VALUES
('bruno-marchand', 'Bruno Marchand', 'bruno-marchand', 'quebec-forte-et-fiere', 'quebec',
'Bruno Marchand est le maire sortant de la Ville de Québec depuis novembre 2021 et chef de Québec forte et fière. Avant son entrée en politique, il a œuvré dans le milieu communautaire et l''éducation. Diplômé en philosophie de l''Université Laval (1995) et en travail social du Cégep de Sainte-Foy (1998), il a développé une expertise dans l''engagement communautaire et la gestion d''organismes à but non lucratif.',
'/Leaders/Bruno_Marchand.jpg',
'["Maire de Québec depuis novembre 2021", "Chef de Québec forte et fière", "Président-directeur général de Centraide Québec–Chaudière-Appalaches et Bas-Saint-Laurent (2014-2021)", "Coordonnateur de la vie étudiante au Cégep de Sainte-Foy (1999-2008)", "Association québécoise de prévention du suicide (2008-2014)", "Fondateur de plusieurs initiatives communautaires"]'::jsonb,
'Pour les élections municipales 2025, Bruno Marchand mise sur la continuité de sa vision centre-gauche progressiste avec un accent particulier sur l''environnement, le transport collectif et le logement abordable. Focus sur la densification urbaine intelligente et la transition écologique de la ville de Québec.',
'["Mise en œuvre du projet de tramway de Québec", "Amélioration des services de déneigement", "Développement de nouvelles pistes cyclables", "Renforcement de la démocratie participative", "Leadership environnemental"]'::jsonb,
'https://quebecforteetfiere.org/'
)
ON CONFLICT (id) DO UPDATE SET
  biography = EXCLUDED.biography,
  photo_url = EXCLUDED.photo_url,
  experience = EXCLUDED.experience,
  vision_2025 = EXCLUDED.vision_2025,
  achievements = EXCLUDED.achievements,
  website_url = EXCLUDED.website_url;

-- Stéphane Lachance (Respect citoyens)
INSERT INTO leaders (id, name, slug, party_id, municipality_id, biography, photo_url, experience, vision_2025, achievements, website_url) VALUES
('stephane-lachance', 'Stéphane Lachance', 'stephane-lachance', 'respect-citoyens', 'quebec',
'Stéphane Lachance est le chef de Respect citoyens depuis mars 2025, un parti conservateur-populiste et localiste fondé en juillet 2023. Co-fondateur du mouvement citoyen ''Tramway, non merci'' en 2020, il s''est fait connaître par son opposition au projet de tramway et son engagement en faveur de la consultation citoyenne. Il prône une gestion budgétaire stricte et une proximité citoyenne forte.',
'/Leaders/Stephane_Lachance.jpg',
'["Chef de Respect citoyens depuis mars 2025", "Co-fondateur du mouvement ''Tramway, non merci'' (2020)", "Organisateur communautaire et militant municipal", "Promoteur de la démocratie participative", "Défenseur de la gestion budgétaire stricte"]'::jsonb,
'Stéphane Lachance mise sur le respect des citoyens, l''amélioration des processus de consultation publique et une approche équitable du développement urbain. Opposition ferme aux grands projets coûteux. Vision pour 2025 centrée sur la gestion budgétaire stricte et la proximité citoyenne.',
'["Leadership du mouvement d''opposition au tramway", "Fondation du parti Respect citoyens", "Organisation de consultations citoyennes", "Promotion de la démocratie participative", "Défense de la gestion fiscale responsable"]'::jsonb,
'https://www.respectcitoyens.org/'
)
ON CONFLICT (id) DO UPDATE SET
  biography = EXCLUDED.biography,
  photo_url = EXCLUDED.photo_url,
  experience = EXCLUDED.experience,
  vision_2025 = EXCLUDED.vision_2025,
  achievements = EXCLUDED.achievements,
  website_url = EXCLUDED.website_url;

-- Jackie Smith (Transition Québec)
INSERT INTO leaders (id, name, slug, party_id, municipality_id, biography, photo_url, experience, vision_2025, achievements, website_url) VALUES
('jackie-smith', 'Jackie Smith', 'jackie-smith', 'transition-quebec', 'quebec',
'Jackie Smith est la cheffe de Transition Québec depuis 2019 et conseillère municipale de Limoilou depuis 2021. Militante écologiste progressiste anglophone, elle s''est fait connaître comme animatrice d''une émission radiophonique sur l''environnement et par son engagement pour la lutte contre les changements climatiques. Elle incarne l''écologisme progressiste et la gauche municipale à Québec.',
'/Leaders/Jackie_Smith.jpg',
'["Cheffe de Transition Québec depuis 2019", "Conseillère municipale de Limoilou depuis 2021", "Militante écologiste et animatrice radio environnementale", "Organisatrice communautaire (conseils de quartier)", "Gestionnaire de changement", "Leader écologiste progressiste"]'::jsonb,
'Jackie Smith propose une transition écologique ambitieuse pour Québec avec une vision cohérente. Pour 2025, elle se concentre sur les énergies renouvelables, la protection de l''environnement, la justice sociale, l''opposition aux intérêts immobiliers et la promotion de la francophonie municipale.',
'["Leadership de Transition Québec depuis 2019", "Élection comme conseillère municipale en 2021", "Animation d''émission radiophonique environnementale", "Mobilisation citoyenne pour l''environnement", "Engagement ferme pour la justice sociale"]'::jsonb,
'https://transitionqc.org/'
)
ON CONFLICT (id) DO UPDATE SET
  biography = EXCLUDED.biography,
  photo_url = EXCLUDED.photo_url,
  experience = EXCLUDED.experience,
  vision_2025 = EXCLUDED.vision_2025,
  achievements = EXCLUDED.achievements,
  website_url = EXCLUDED.website_url;

-- Anne Guérette (Parti du Monde)
INSERT INTO leaders (id, name, slug, party_id, municipality_id, biography, photo_url, experience, vision_2025, achievements, website_url) VALUES
('anne-guerette', 'Anne Guérette', 'anne-guerette', 'parti-du-monde-quebec', 'quebec',
'Anne Guérette est la cheffe du Parti du Monde, une coalition municipale avec philosophie "Travailler avec notre monde". Elle propose une vision structurante de développement durable et gouvernance collaborative basée sur quatre piliers : transport intelligent, gouvernance efficace, logement digne et développement durable.',
'/Leaders/Anne_Guerette.jpg',
'["Cheffe du Parti du Monde", "Leader en gouvernance collaborative", "Promotrice de la consultation citoyenne renforcée", "Défenseure de la transparence financière totale", "Militante pour le développement durable"]'::jsonb,
'Anne Guérette propose pour 2025 une vision ambitieuse avec États généraux sur l''habitation, révision complète du plan d''urbanisme, leadership économique métropolitain et projet Boucle Québec-Lévis pour le transport intelligent. Approche participative centre et collaborative multi-secteurs.',
'["Consultation citoyenne renforcée", "Transparence financière totale", "Vision transport innovante (Boucle Québec-Lévis)", "Approche collaborative multi-secteurs", "États généraux habitation", "Révision plan urbanisme", "Leadership économique métropolitain"]'::jsonb,
'https://partidumonde.com/'
)
ON CONFLICT (id) DO UPDATE SET
  biography = EXCLUDED.biography,
  photo_url = EXCLUDED.photo_url,
  experience = EXCLUDED.experience,
  vision_2025 = EXCLUDED.vision_2025,
  achievements = EXCLUDED.achievements,
  website_url = EXCLUDED.website_url;

-- ========================================================================
-- LEADERS DE MONTRÉAL (5 leaders)
-- ========================================================================

-- Soraya Martinez Ferrada (Ensemble Montréal)
INSERT INTO leaders (id, name, slug, party_id, municipality_id, biography, photo_url, experience, vision_2025, achievements, website_url) VALUES
('soraya-martinez-ferrada', 'Soraya Martinez Ferrada', 'soraya-martinez-ferrada', 'ensemble-montreal', 'montreal',
'Soraya Martinez Ferrada est la cheffe d''Ensemble Montréal depuis 2025. Députée fédérale libérale et ministre fédérale du Tourisme et ministre associée des Finances, elle apporte une vaste expérience gouvernementale au niveau fédéral. Née au Chili, elle incarne la diversité montréalaise et propose une vision centre-droit axée sur l''efficacité administrative et la gestion rigoureuse des finances publiques.',
'/Leaders/Soraya_Martinez_Ferrada.jpg',
'["Cheffe d''Ensemble Montréal depuis 2025", "Députée fédérale libérale", "Ministre fédérale du Tourisme et ministre associée des Finances", "Expérience en gestion gouvernementale", "Leader de l''opposition municipale", "8 ans d''expérience en opposition"]'::jsonb,
'Pour les élections municipales 2025, Soraya Martinez Ferrada mise sur une gestion efficace, la réduction des dépenses publiques et la réconciliation avec le milieu des affaires. Elle met l''accent sur la sécurité publique, l''amélioration des services municipaux essentiels et la réduction de la bureaucratie.',
'["Expérience fédérale au gouvernement", "Gestion rigoureuse des finances", "Relations avec le milieu des affaires", "Réduction de la bureaucratie", "Focus sur la sécurité publique"]'::jsonb,
'https://ensemblemtl.org'
)
ON CONFLICT (id) DO UPDATE SET
  biography = EXCLUDED.biography,
  photo_url = EXCLUDED.photo_url,
  experience = EXCLUDED.experience,
  vision_2025 = EXCLUDED.vision_2025,
  achievements = EXCLUDED.achievements,
  website_url = EXCLUDED.website_url;

-- Jean-François Kacou (Futur Montréal)
INSERT INTO leaders (id, name, slug, party_id, municipality_id, biography, photo_url, experience, vision_2025, achievements, website_url) VALUES
('jean-francois-kacou', 'Jean-François Kacou', 'jean-francois-kacou', 'futur-montreal', 'montreal',
'Jean-François Kacou est le chef de Futur Montréal et premier candidat afro-canadien à la mairie de Montréal. Avocat de formation et conseiller municipal, il prône une nouvelle façon de faire de la politique municipale, basée sur l''inclusion, l''équité et le pragmatisme. Il représente une voix pour la diversité et le changement à Montréal avec une vision centriste.',
'/Leaders/Jean_Francois_Kacou.jpg',
'["Chef de Futur Montréal", "Premier candidat afro-canadien à la mairie de Montréal", "Avocat et professionnel du droit", "Conseiller municipal", "Militant pour l''inclusion et la diversité", "Expérience municipale concrète"]'::jsonb,
'Jean-François Kacou propose de faire la politique différemment avec une approche inclusive et pragmatique. Sa vision 2025 se concentre sur la cohésion sociale, l''équité des services municipaux et une gouvernance qui reflète la diversité de Montréal. Parti très récent avec reconnaissance limitée mais vision novatrice.',
'["Leadership en inclusion et diversité", "Expérience municipale concrète", "Vision novatrice pour Montréal", "Promotion de la cohésion sociale", "Premier candidat afro-canadien mairie Montréal"]'::jsonb,
'https://futurmontreal.com'
)
ON CONFLICT (id) DO UPDATE SET
  biography = EXCLUDED.biography,
  photo_url = EXCLUDED.photo_url,
  experience = EXCLUDED.experience,
  vision_2025 = EXCLUDED.vision_2025,
  achievements = EXCLUDED.achievements,
  website_url = EXCLUDED.website_url;

-- Luc Rabouin (Projet Montréal)
INSERT INTO leaders (id, name, slug, party_id, municipality_id, biography, photo_url, experience, vision_2025, achievements, website_url) VALUES
('luc-rabouin', 'Luc Rabouin', 'luc-rabouin', 'projet-montreal', 'montreal',
'Luc Rabouin est le chef de Projet Montréal depuis 2024, succédant à Valérie Plante. Économiste de formation et conseiller municipal expérimenté, il a été responsable du développement économique et de l''habitation. Il incarne la continuité de la vision écologique et sociale centre-gauche de Projet Montréal avec une approche pragmatique et une expérience gouvernementale solide.',
'/Leaders/Luc_Rabouin.jpg',
'["Chef de Projet Montréal depuis 2024", "Conseiller municipal et responsable du développement économique", "Économiste de formation", "Expérience en habitation et développement urbain", "Continuateur de la vision Projet Montréal", "Expérience gouvernementale concrète"]'::jsonb,
'Luc Rabouin mise sur la continuité de la vision écologique et sociale avec une approche pragmatique. Pour 2025, il se concentre sur la mobilité durable, le logement abordable, la transition écologique et une gestion responsable des finances publiques. Défis : gestion des chantiers et relations avec opposants.',
'["Expérience gouvernementale à Montréal", "Vision environnementale forte", "Développement de la mobilité active", "Promotion du logement social", "Changement de leadership récent"]'::jsonb,
'https://projetmontreal.org'
)
ON CONFLICT (id) DO UPDATE SET
  biography = EXCLUDED.biography,
  photo_url = EXCLUDED.photo_url,
  experience = EXCLUDED.experience,
  vision_2025 = EXCLUDED.vision_2025,
  achievements = EXCLUDED.achievements,
  website_url = EXCLUDED.website_url;

-- Craig Sauvé (Transition Montréal)
INSERT INTO leaders (id, name, slug, party_id, municipality_id, biography, photo_url, experience, vision_2025, achievements, website_url) VALUES
('craig-sauve', 'Craig Sauvé', 'craig-sauve', 'transition-montreal', 'montreal',
'Craig Sauvé est le chef de Transition Montréal, une alternative progressiste centre-gauche au "système à deux partis" montréalais. Ancien conseiller municipal de Projet Montréal, il a quitté le parti pour fonder Transition Montréal, critiquant la gestion du parti au pouvoir. Il se positionne comme défenseur de la justice sociale et des organismes communautaires avec une expérience municipale concrète.',
'/Leaders/Craig_Sauve.jpg',
'["Chef de Transition Montréal", "Ancien conseiller municipal de Projet Montréal", "Fondateur d''une alternative progressiste", "Défenseur de la justice sociale", "Militant communautaire", "Expérience municipale concrète"]'::jsonb,
'Craig Sauvé propose une alternative progressiste au système actuel. Sa vision 2025 se concentre sur la justice sociale, la tarification équitable des services, le soutien renforcé aux organismes communautaires et la lutte contre l''itinérance. Nouveau parti avec ressources limitées mais alternative crédible.',
'["Expérience municipale concrète", "Leadership en justice sociale", "Alternative crédible progressiste", "Lutte active contre l''itinérance", "Ancien Projet Montréal"]'::jsonb,
'https://transitionmontreal.org'
)
ON CONFLICT (id) DO UPDATE SET
  biography = EXCLUDED.biography,
  photo_url = EXCLUDED.photo_url,
  experience = EXCLUDED.experience,
  vision_2025 = EXCLUDED.vision_2025,
  achievements = EXCLUDED.achievements,
  website_url = EXCLUDED.website_url;

-- Gilbert Thibodeau (Action Montréal)
INSERT INTO leaders (id, name, slug, party_id, municipality_id, biography, photo_url, experience, vision_2025, achievements, website_url) VALUES
('gilbert-thibodeau', 'Gilbert Thibodeau', 'gilbert-thibodeau', 'action-montreal', 'montreal',
'Gilbert Thibodeau est le chef d''Action Montréal, un parti municipal à orientation centre-droit conservatrice. Il propose une approche pragmatique de la gouvernance municipale avec un focus particulier sur la sécurité publique, la gestion fiscale responsable et le respect des contribuables. Il représente une alternative conservatrice sur l''échiquier politique montréalais.',
'/Leaders/Gilbert_Thibodeau.jpg',
'["Chef d''Action Montréal", "Militant politique conservateur", "Défenseur de la gestion fiscale responsable", "Promoteur de la sécurité publique", "Leader centre-droit à Montréal"]'::jsonb,
'Gilbert Thibodeau propose une approche conservatrice et pragmatique pour la gouvernance municipale de Montréal. Sa vision 2025 se concentre sur la sécurité publique, la réduction des dépenses inutiles et une gestion fiscale qui respecte la capacité de payer des citoyens. Visibilité limitée avec controverses récentes.',
'["Vision conservatrice pour Montréal", "Promotion de la gestion fiscale rigoureuse", "Focus sur la sécurité publique", "Approche pragmatique centre-droit"]'::jsonb,
'https://actionmontreal.org'
)
ON CONFLICT (id) DO UPDATE SET
  biography = EXCLUDED.biography,
  photo_url = EXCLUDED.photo_url,
  experience = EXCLUDED.experience,
  vision_2025 = EXCLUDED.vision_2025,
  achievements = EXCLUDED.achievements,
  website_url = EXCLUDED.website_url;

-- ========================================================================
-- 7. METTRE À JOUR LES LIENS BIDIRECTIONNELS PARTI ↔ LEADER
-- ========================================================================

-- Québec
UPDATE parties SET leader_id = 'sam-hamad' WHERE id = 'leadership-quebec';
UPDATE parties SET leader_id = 'claude-villeneuve' WHERE id = 'quebec-dabord';
UPDATE parties SET leader_id = 'bruno-marchand' WHERE id = 'quebec-forte-et-fiere';
UPDATE parties SET leader_id = 'stephane-lachance' WHERE id = 'respect-citoyens';
UPDATE parties SET leader_id = 'jackie-smith' WHERE id = 'transition-quebec';
UPDATE parties SET leader_id = 'anne-guerette' WHERE id = 'parti-du-monde-quebec';

-- Montréal
UPDATE parties SET leader_id = 'soraya-martinez-ferrada' WHERE id = 'ensemble-montreal';
UPDATE parties SET leader_id = 'jean-francois-kacou' WHERE id = 'futur-montreal';
UPDATE parties SET leader_id = 'luc-rabouin' WHERE id = 'projet-montreal';
UPDATE parties SET leader_id = 'craig-sauve' WHERE id = 'transition-montreal';
UPDATE parties SET leader_id = 'gilbert-thibodeau' WHERE id = 'action-montreal';

-- ========================================================================
-- 8. MESSAGE DE CONFIRMATION
-- ========================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Données des leaders insérées avec succès!';
  RAISE NOTICE '✅ 6 leaders de Québec ajoutés';
  RAISE NOTICE '✅ 5 leaders de Montréal ajoutés';
  RAISE NOTICE '✅ Liens bidirectionnels parti ↔ leader configurés';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Total: 11 leaders dans la base de données';
  RAISE NOTICE '📋 Mapping vérifié avec données Supabase production';
END
$$;