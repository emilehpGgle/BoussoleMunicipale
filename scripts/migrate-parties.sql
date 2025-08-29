-- Migration des partis vers Supabase
-- Généré automatiquement à partir de boussole-data.ts

-- D'abord, s'assurer que la table parties existe avec les bonnes données
-- Cette partie devrait être adaptée selon votre structure de table parties actuelle

-- Si la table parties n'existe pas encore, voici sa structure recommandée :
/*
CREATE TABLE IF NOT EXISTS public.parties (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT,
  leader TEXT,
  logo_url TEXT,
  color TEXT,
  website_url TEXT,
  orientation TEXT,
  main_ideas_summary TEXT,
  strengths TEXT[],
  reserves TEXT[],
  priorities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/

-- Insérer ou mettre à jour les partis
INSERT INTO public.parties (
  id, 
  name, 
  short_name, 
  leader, 
  logo_url, 
  color, 
  website_url, 
  orientation, 
  main_ideas_summary,
  priorities,
  created_at,
  updated_at
) VALUES
('alliance_citoyenne', 'Alliance citoyenne de Québec', 'ACQ', 'Alain Giasson', '/logos/alliance-citoyenne-new.png', '#c41e3a', 'https://alliancecitoyenne.com/', 'Libertarienne et entrepreneuriale', 'Parti libertarien axé sur la réduction des taxes, la déréglementation et l''efficacité économique. Privilégie l''autonomie individuelle et s''oppose aux interventions municipales jugées excessives.', ARRAY['Développement économique', 'Services municipaux', 'Transport et mobilité'], NOW(), NOW()),

('equipe_priorite_quebec', 'Équipe priorité Québec', 'EPQ', 'Stevens Mélançon', '/logos/equipe-priorite-quebec-new.png', '#004b87', 'https://equipeprioritequebec.ca/', 'Opposition constructive et pragmatisme', 'Formation politique axée sur une opposition constructive avec une approche pragmatique des enjeux municipaux. Met l''accent sur l''acceptabilité sociale des projets et l''équité pour tous les citoyens.', ARRAY['Environnement et espaces verts', 'Services municipaux', 'Transport et mobilité'], NOW(), NOW()),

('leadership_quebec', 'Leadership Québec - Équipe Sam Hamad', 'LQ', 'Sam Hamad', '/logos/leadership-quebec-new.png', '#004a99', 'https://leadershipquebec.ca/', 'Expérience politique et rigueur budgétaire', 'Formation politique dirigée par un ancien ministre provincial. Met l''accent sur la rigueur budgétaire, la saine gestion des finances publiques et l''expérience en gouvernance.', ARRAY['Transport et mobilité', 'Gestion des finances municipales', 'Services municipaux'], NOW(), NOW()),

('quebec_dabord', 'Québec d''abord', 'QD', 'Jean-François Gosselin', '/logos/quebec-dabord-new.png', '#1f4788', 'https://quebecdabord.org/', 'Centrisme pragmatique', 'Parti centiste avec une approche pragmatique des enjeux municipaux. Se positionne comme une alternative équilibrée entre les positions plus polarisées.', ARRAY['Services municipaux', 'Transport et mobilité', 'Logement abordable'], NOW(), NOW()),

('quebec_forte_et_fiere', 'Québec forte et fière', 'QFF', 'Bruno Marchand', '/logos/quebec-forte-et-fiere-new.png', '#e31b23', 'https://quebecforteetfiere.com/', 'Progressisme municipal et développement durable', 'Parti actuellement au pouvoir dirigé par le maire sortant. Met l''accent sur le développement durable, les projets structurants et une vision progressiste pour la ville.', ARRAY['Projet de tramway', 'Logement abordable', 'Environnement et espaces verts'], NOW(), NOW()),

('respect_citoyens', 'Respect et citoyens', 'RC', 'Claude Villeneuve', '/logos/respect-citoyens-new.png', '#2e7d32', 'https://respectcitoyens.ca/', 'Participation citoyenne et environnement', 'Formation politique mettant l''accent sur la participation citoyenne, la transparence démocratique et la protection environnementale. Prône une approche collaborative de la gouvernance municipale.', ARRAY['Participation citoyenne', 'Environnement et espaces verts', 'Transport durable'], NOW(), NOW()),

('transition_quebec', 'Transition Québec', 'TQ', 'Jackie Smith', '/logos/transition-quebec-new.png', '#4caf50', 'https://transitionquebec.org/', 'Écologie politique et justice sociale', 'Parti écologiste axé sur la transition environnementale, la justice sociale et la démocratie participative. Propose des solutions radicales pour faire face aux enjeux climatiques et sociaux.', ARRAY['Transition écologique', 'Justice sociale', 'Démocratie participative'], NOW(), NOW())

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  short_name = EXCLUDED.short_name,
  leader = EXCLUDED.leader,
  logo_url = EXCLUDED.logo_url,
  color = EXCLUDED.color,
  website_url = EXCLUDED.website_url,
  orientation = EXCLUDED.orientation,
  main_ideas_summary = EXCLUDED.main_ideas_summary,
  priorities = EXCLUDED.priorities,
  updated_at = NOW();

-- Vérifier les partis insérés
SELECT COUNT(*) as total_parties FROM public.parties;
SELECT id, name, short_name, leader FROM public.parties ORDER BY name;