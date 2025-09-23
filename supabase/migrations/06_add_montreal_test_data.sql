-- Migration: Ajout de données test minimales pour Montréal
-- But: Valider l'isolation des données multi-municipalités
-- Date: 22 septembre 2025

-- Ajout de questions test pour Montréal
INSERT INTO questions (id, text, category, response_type, municipality_id, order_index, created_at) VALUES
('montreal_transport_1', 'Montréal devrait-elle prioriser le transport en commun?', 'transport', 'agreement', 'montreal', 1, NOW()),
('montreal_logement_1', 'Le logement social devrait être une priorité à Montréal?', 'logement', 'agreement', 'montreal', 2, NOW()),
('montreal_environnement_1', 'Montréal doit accélérer sa transition écologique?', 'environnement', 'agreement', 'montreal', 3, NOW());

-- Ajout de partis test pour Montréal
INSERT INTO parties (id, name, leader, municipality_id, logo_url, website_url, created_at) VALUES
('montreal_projet', 'Projet Montréal', 'Valérie Plante', 'montreal', '/logos/projet-montreal.png', 'https://projetmontreal.org', NOW()),
('montreal_ensemble', 'Ensemble Montréal', 'Denis Coderre', 'montreal', '/logos/ensemble-montreal.png', 'https://ensemblemontreal.com', NOW());

-- Ajout de positions des partis test pour Montréal
INSERT INTO party_positions (party_id, question_id, position, created_at) VALUES
-- Projet Montréal (progressiste)
('montreal_projet', 'montreal_transport_1', 'FA', NOW()),  -- Fortement d'accord
('montreal_projet', 'montreal_logement_1', 'FA', NOW()),   -- Fortement d'accord
('montreal_projet', 'montreal_environnement_1', 'FA', NOW()), -- Fortement d'accord

-- Ensemble Montréal (plus modéré)
('montreal_ensemble', 'montreal_transport_1', 'PA', NOW()),  -- Plutôt d'accord
('montreal_ensemble', 'montreal_logement_1', 'N', NOW()),   -- Neutre
('montreal_ensemble', 'montreal_environnement_1', 'PA', NOW()); -- Plutôt d'accord

-- Vérification des données ajoutées
DO $$
DECLARE
    montreal_questions_count INTEGER;
    montreal_parties_count INTEGER;
    montreal_positions_count INTEGER;
BEGIN
    -- Compter les questions Montréal
    SELECT COUNT(*) INTO montreal_questions_count FROM questions WHERE municipality_id = 'montreal';

    -- Compter les partis Montréal
    SELECT COUNT(*) INTO montreal_parties_count FROM parties WHERE municipality_id = 'montreal';

    -- Compter les positions Montréal
    SELECT COUNT(*) INTO montreal_positions_count
    FROM party_positions pp
    JOIN parties p ON pp.party_id = p.id
    WHERE p.municipality_id = 'montreal';

    -- Log des résultats
    RAISE NOTICE '✅ Données test Montréal ajoutées:';
    RAISE NOTICE '   - Questions: %', montreal_questions_count;
    RAISE NOTICE '   - Partis: %', montreal_parties_count;
    RAISE NOTICE '   - Positions: %', montreal_positions_count;

    -- Validation minimum
    IF montreal_questions_count < 3 OR montreal_parties_count < 2 OR montreal_positions_count < 6 THEN
        RAISE EXCEPTION 'Données test Montréal incomplètes';
    END IF;

    RAISE NOTICE '✅ Migration données test Montréal réussie!';
END $$;