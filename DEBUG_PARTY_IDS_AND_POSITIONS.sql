-- ========================================================================
-- DEBUG: Vérifier les IDs des partis et leurs positions
-- ========================================================================

-- 1. Voir tous les partis de Montréal avec leurs vrais IDs
SELECT 
    id as party_id,
    name,
    short_name,
    leader,
    orientation
FROM parties 
WHERE municipality_id = 'montreal'
ORDER BY name;

-- 2. Voir les positions existantes pour Montréal
SELECT 
    pp.party_id,
    p.name as party_name,
    pp.question_id,
    pp.position,
    pp.note,
    q.text as question_text,
    q.political_axis,
    q.political_weight
FROM party_positions pp
JOIN parties p ON pp.party_id = p.id
JOIN questions q ON pp.question_id = q.id
WHERE p.municipality_id = 'montreal'
    AND q.municipality_id = 'montreal'
ORDER BY p.name, q.order_index
LIMIT 20;

-- 3. Compter les positions par parti
SELECT 
    p.name as party_name,
    p.id as party_id,
    COUNT(pp.id) as positions_count
FROM parties p
LEFT JOIN party_positions pp ON p.id = pp.party_id
WHERE p.municipality_id = 'montreal'
GROUP BY p.id, p.name
ORDER BY p.name;

-- 4. Identifier les partis SANS positions
SELECT 
    p.name as party_name,
    p.id as party_id,
    'AUCUNE POSITION' as issue
FROM parties p
LEFT JOIN party_positions pp ON p.id = pp.party_id
WHERE p.municipality_id = 'montreal'
    AND pp.id IS NULL;
