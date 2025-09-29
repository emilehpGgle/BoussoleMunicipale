-- UPDATE MANUEL DES CATÉGORIES - ENJEUX SPÉCIFIQUES
-- Basé sur les vrais IDs trouvés dans questions_rows.sql

-- ========================================
-- QUÉBEC
-- ========================================
-- Question tramway → Enjeu spécifique 1
UPDATE questions SET category = 'Enjeu spécifique 1'
WHERE id = 'qc_q1_tramway';

-- Question 3e lien → Enjeu spécifique 2
UPDATE questions SET category = 'Enjeu spécifique 2'
WHERE id = 'qc_q3_troisieme_lien';

-- ========================================
-- MONTRÉAL
-- ========================================
-- Question REM/métro → Enjeu spécifique 1
UPDATE questions SET category = 'Enjeu spécifique 1'
WHERE id = 'mtl_q1_metro_rem';

-- Question arrondissements → Enjeu spécifique 2
UPDATE questions SET category = 'Enjeu spécifique 2'
WHERE id = 'mtl_q3_arrondissements_autonomie';

-- ========================================
-- LONGUEUIL
-- ========================================
-- Question transport métropolitain → Enjeu spécifique 1
UPDATE questions SET category = 'Enjeu spécifique 1'
WHERE id = 'lng_q1_transport_metropolitain';

-- Question aéroport → Enjeu spécifique 2
UPDATE questions SET category = 'Enjeu spécifique 2'
WHERE id = 'lng_q3_developpement_aeroportuaire';

-- ========================================
-- LÉVIS
-- ========================================
-- Question 3e lien → Enjeu spécifique 1
UPDATE questions SET category = 'Enjeu spécifique 1'
WHERE id = 'lev_q1_troisieme_lien';

-- Question traverse → Enjeu spécifique 2
UPDATE questions SET category = 'Enjeu spécifique 2'
WHERE id = 'lev_q3_traverse_quebec_levis';

-- ========================================
-- LAVAL
-- ========================================
-- Question SRB → Enjeu spécifique 1
UPDATE questions SET category = 'Enjeu spécifique 1'
WHERE id = 'lav_q1_srb_montreal';

-- Question espaces verts → Enjeu spécifique 2
UPDATE questions SET category = 'Enjeu spécifique 2'
WHERE id = 'lav_q3_equilibre_developpement_espaces_verts';

-- ========================================
-- GATINEAU
-- ========================================
-- Question services bilingues → Enjeu spécifique 1
UPDATE questions SET category = 'Enjeu spécifique 1'
WHERE id = 'gat_q1_services_bilingues';

-- Question coordination Ottawa → Enjeu spécifique 2
UPDATE questions SET category = 'Enjeu spécifique 2'
WHERE id = 'gat_q3_partenariats_ottawa';

-- ========================================
-- VÉRIFICATION
-- ========================================
-- Voir toutes les questions avec enjeux spécifiques après modification
SELECT municipality_id, id, category, LEFT(text, 60) as text_preview
FROM questions
WHERE category LIKE 'Enjeu spécifique%'
ORDER BY municipality_id, category;

-- Compter par municipalité
SELECT
    municipality_id,
    COUNT(*) as nb_enjeux_specifiques
FROM questions
WHERE category LIKE 'Enjeu spécifique%'
GROUP BY municipality_id
ORDER BY municipality_id;