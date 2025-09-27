-- ========================================================================
-- DEBUG: Vérifier le décalage entre IDs des questions
-- ========================================================================

-- 1. Voir tous les IDs des questions de Montréal
SELECT 
    id,
    text,
    order_index,
    political_axis,
    political_weight,
    CASE 
        WHEN political_axis IS NOT NULL THEN '✅ CONFIGURÉ'
        ELSE '❌ NON CONFIGURÉ'
    END as political_status
FROM questions 
WHERE municipality_id = 'montreal'
ORDER BY order_index;

-- 2. Voir les réponses utilisateur avec les IDs
SELECT 
    ur.question_id,
    ur.agreement_value,
    ur.response_type,
    CASE 
        WHEN q.id IS NOT NULL THEN '✅ QUESTION EXISTE'
        ELSE '❌ QUESTION INTROUVABLE'
    END as question_status,
    q.political_axis,
    q.political_weight
FROM user_responses ur
LEFT JOIN questions q ON ur.question_id = q.id AND q.municipality_id = 'montreal'
WHERE ur.municipality_id = 'montreal'
    AND ur.session_id IN (
        SELECT id FROM user_sessions 
        WHERE municipality_id = 'montreal' 
        ORDER BY updated_at DESC 
        LIMIT 1
    )
ORDER BY ur.created_at;

-- 3. Identifier les questions avec réponses mais sans config politique
SELECT 
    'Questions avec réponses MAIS sans config politique' as issue,
    ur.question_id,
    ur.agreement_value,
    q.political_axis
FROM user_responses ur
JOIN questions q ON ur.question_id = q.id
WHERE ur.municipality_id = 'montreal'
    AND q.municipality_id = 'montreal'
    AND ur.response_type = 'agreement'
    AND q.political_axis IS NULL
    AND ur.session_id IN (
        SELECT id FROM user_sessions 
        WHERE municipality_id = 'montreal' 
        ORDER BY updated_at DESC 
        LIMIT 1
    );
