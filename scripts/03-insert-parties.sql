-- Insertion des 7 partis politiques municipaux de Québec
-- Données extraites de lib/boussole-data.ts

INSERT INTO parties (
  id,
  name,
  short_name,
  leader,
  logo_url,
  website_url,
  orientation,
  main_ideas_summary,
  strengths,
  reserves,
  created_at,
  updated_at
) VALUES
('alliance_citoyenne', 'Alliance citoyenne de Québec', 'ACQ', 'Alain Giasson', '/logos/alliance-citoyenne.png', 'https://metroquebec.com/local/118385/c-est-quoi-l-alliance-citoyenne-de-quebec/', 'Centre-droit libertarien', 'Centriste avec tendance pragmatique

Forces : Développement économique, Services de proximité.

Réserves : Grands projets coûteux, Augmentation des taxes.', '["Réduction des taxes", "Développement économique", "Autonomie citoyenne"]'::jsonb, '["Intervention gouvernementale", "Dépenses publiques excessives", "Politiques environnementales contraignantes"]'::jsonb, NOW(), NOW()),

('equipe_priorite_quebec', 'Équipe priorité Québec', 'EPQ', 'Stevens Mélançon', '/logos/equipe-priorite-quebec-new.png', 'https://equipeprioritequebec.ca/', 'Centre pragmatique, opposition constructive', 'Centre pragmatique, opposition constructive

Forces : Respect, Équité, Excellence, Innovation.

Réserves : Réglementations excessives, Nationalisme de façade, Décisions sans acceptabilité sociale.', '["Respect", "Équité", "Excellence", "Innovation"]'::jsonb, '["Réglementations excessives", "Nationalisme de façade", "Décisions sans acceptabilité sociale"]'::jsonb, NOW(), NOW()),

('leadership_quebec', 'Leadership Québec - Équipe Sam Hamad', 'LQ', 'Sam Hamad', '/logos/leadership-quebec-new.png', 'https://leadershipquebec.ca/', 'Centriste, posture prudente et technocratique', 'Centriste, posture prudente et technocratique

Forces : SRB structurant (à l''étude), Approche de gestion prudente, Développement économique (non tranché).

Réserves : Positions publiques incomplètes sur plusieurs enjeux, Engagements économiques encore peu détaillés.', '["SRB structurant (à l''étude)", "Approche de gestion prudente", "Développement économique (non tranché)"]'::jsonb, '["Positions publiques incomplètes sur plusieurs enjeux", "Engagements économiques encore peu détaillés"]'::jsonb, NOW(), NOW()),

('quebec_dabord', 'Québec d''abord', 'QD', 'Claude Villeneuve', '/logos/quebec-dabord-new.png', 'https://quebecdabord.com/', 'Centre, pragmatique', 'Centre, pragmatique

Forces : Continuité gestionnaire, Proximité citoyenne.

Réserves : Positions peu documentées, Visibilité limitée.', '["Continuité gestionnaire", "Proximité citoyenne"]'::jsonb, '["Positions peu documentées", "Visibilité limitée"]'::jsonb, NOW(), NOW()),

('quebec_forte_et_fiere', 'Québec forte et fière', 'QFF', 'Bruno Marchand', '/logos/quebec-forte-et-fiere-new.png', 'https://quebecforteetfiere.org/', 'Centre-gauche, progressiste', 'Centre-gauche, progressiste

Forces : Environnement, Transport collectif, Logement.

Réserves : Développement économique traditionnel.', '["Environnement", "Transport collectif", "Logement"]'::jsonb, '["Développement économique traditionnel"]'::jsonb, NOW(), NOW()),

('respect_citoyens', 'Respect citoyens', 'RC', 'Stéphane Lachance', '/logos/respect-citoyens-new.png', 'https://www.respectcitoyens.org/', 'Conservateur-populiste, localiste', 'Conservateur-populiste, localiste

Forces : Gestion budgétaire stricte, Proximité citoyenne, Opposition aux grands projets coûteux.

Réserves : Méfiance envers la centralisation, Réglementations excessives.', '["Gestion budgétaire stricte", "Proximité citoyenne", "Opposition aux grands projets coûteux"]'::jsonb, '["Méfiance envers la centralisation", "Réglementations excessives"]'::jsonb, NOW(), NOW()),

('transition_quebec', 'Transition Québec', 'TQ', 'Jackie Smith', '/logos/transition-quebec-new.png', 'https://transitionqc.org/', 'Écologiste progressiste, gauche municipale', 'Écologiste progressiste, gauche municipale

Forces : Vision écologiste cohérente, Engagement ferme justice sociale, Opposition claire intérêts immobiliers, Leadership environnemental local, Promotion francophonie municipale.

Réserves : Positions parfois perçues comme trop radicales, Tension entre allègement fiscal et financement transition, Opposition systématique secteur privé.', '["Vision écologiste cohérente", "Engagement ferme justice sociale", "Opposition claire intérêts immobiliers", "Leadership environnemental local", "Promotion francophonie municipale"]'::jsonb, '["Positions parfois perçues comme trop radicales", "Tension entre allègement fiscal et financement transition", "Opposition systématique secteur privé"]'::jsonb, NOW(), NOW());

-- Vérification de l'insertion
SELECT 
  'Partis insérés' as status,
  COUNT(*) as count,
  NOW() as timestamp
FROM parties;