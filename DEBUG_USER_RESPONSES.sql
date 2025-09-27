-- ========================================================================
-- DEBUG: Vérifier les réponses de l'utilisateur Montréal
-- ========================================================================

-- 1. Voir toutes les réponses de l'utilisateur pour Montréal
SELECT 
    question_id,
    agreement_value,
    importance_direct_value,
    priority_data,
    response_type,
    created_at
FROM user_responses 
WHERE municipality_id = 'montreal' 
    AND session_id IN (
        SELECT id FROM user_sessions 
        WHERE municipality_id = 'montreal' 
        ORDER BY updated_at DESC 
        LIMIT 1
    )
ORDER BY created_at;

-- 2. Statistiques des réponses
SELECT 
    agreement_value,
    COUNT(*) as count
FROM user_responses 
WHERE municipality_id = 'montreal' 
    AND response_type = 'agreement'
    AND session_id IN (
        SELECT id FROM user_sessions 
        WHERE municipality_id = 'montreal' 
        ORDER BY updated_at DESC 
        LIMIT 1
    )
GROUP BY agreement_value
ORDER BY agreement_value;

-- 3. Questions avec leurs réponses utilisateur
SELECT 
    q.id as question_id,
    q.text,
    q.political_axis,
    q.political_weight,
    q.score_inversion,
    ur.agreement_value,
    CASE 
        WHEN ur.agreement_value = 'FA' THEN '+2'
        WHEN ur.agreement_value = 'PA' THEN '+1' 
        WHEN ur.agreement_value = 'N' THEN '0'
        WHEN ur.agreement_value = 'PD' THEN '-1'
        WHEN ur.agreement_value = 'FD' THEN '-2'
        ELSE 'NULL'
    END as raw_score,
    CASE 
        WHEN q.score_inversion = true THEN 'INVERSÉ'
        ELSE 'DIRECT'
    END as score_logic
FROM questions q
LEFT JOIN user_responses ur ON q.id = ur.question_id 
    AND ur.municipality_id = 'montreal'
    AND ur.session_id IN (
        SELECT id FROM user_sessions 
        WHERE municipality_id = 'montreal' 
        ORDER BY updated_at DESC 
        LIMIT 1
    )
WHERE q.municipality_id = 'montreal'
    AND q.political_axis IN ('economic', 'social')
ORDER BY q.political_axis, q.order_index;
