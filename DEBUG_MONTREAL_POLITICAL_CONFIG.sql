-- ========================================================================
-- DEBUG: Vérifier la configuration politique des questions de Montréal
-- ========================================================================

-- 1. Vérifier si les questions de Montréal ont des configurations politiques
SELECT 
    id,
    text,
    political_axis,
    political_weight,
    political_interpretation,
    score_inversion,
    CASE 
        WHEN political_axis IS NULL THEN '❌ NON CONFIGURÉ'
        WHEN political_axis = 'neutral' THEN '⚪ NEUTRE'
        WHEN political_axis = 'economic' THEN '💰 ÉCONOMIQUE'
        WHEN political_axis = 'social' THEN '🌍 SOCIAL'
    END as status
FROM questions 
WHERE municipality_id = 'montreal'
ORDER BY order_index;

-- 2. Statistiques de configuration
SELECT 
    political_axis,
    COUNT(*) as count,
    AVG(political_weight) as avg_weight,
    MIN(political_weight) as min_weight,
    MAX(political_weight) as max_weight
FROM questions 
WHERE municipality_id = 'montreal' AND political_axis IS NOT NULL
GROUP BY political_axis;

-- 3. Questions non configurées
SELECT 
    id, 
    text,
    'MISSING POLITICAL CONFIG' as issue
FROM questions 
WHERE municipality_id = 'montreal' 
    AND (political_axis IS NULL OR political_weight IS NULL);

-- 4. Comparaison avec Québec
SELECT 
    'montreal' as municipality,
    COUNT(CASE WHEN political_axis = 'economic' THEN 1 END) as economic_questions,
    COUNT(CASE WHEN political_axis = 'social' THEN 1 END) as social_questions,
    COUNT(CASE WHEN political_axis IS NULL THEN 1 END) as unconfigured_questions
FROM questions WHERE municipality_id = 'montreal'
UNION ALL
SELECT 
    'quebec' as municipality,
    COUNT(CASE WHEN political_axis = 'economic' THEN 1 END) as economic_questions,
    COUNT(CASE WHEN political_axis = 'social' THEN 1 END) as social_questions,
    COUNT(CASE WHEN political_axis IS NULL THEN 1 END) as unconfigured_questions
FROM questions WHERE municipality_id = 'quebec';
