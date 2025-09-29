-- ================================================================
-- MODÈLE DE SOURCES POUR RESPECT CITOYENS
-- ================================================================
-- Sources de haute qualité: Plateforme + Questionnaire direct

-- Exemple de mise à jour pour chaque position de Respect Citoyens:

UPDATE party_positions
SET
    source = 'Plateforme Électorale 2025 (14 mai) + Questionnaire direct',
    note = 'Position confirmée par double source: plateforme officielle et réponse directe au questionnaire'
WHERE party_id = 'respect-citoyens' AND question_id = 'qc_q1_tramway';

-- Format suggéré pour toutes les positions Respect Citoyens:

-- Transport
-- qc_q1_tramway: "Annuler le projet de tramway" (Plateforme 2.1)
-- qc_q3_troisieme_lien: "Promouvoir un troisième lien à l'est" (Plateforme 2.3)

-- Finances
-- qc_q6_reduction_depenses_taxes: "Gel des taxes résidentielles 2 ans" (Plateforme 1.5)
-- qc_q15_avantages_fiscaux_entreprises: "Réduire taxes commerces 10%" (Plateforme 1.4)

-- Gouvernance
-- qc_q13_pouvoir_conseils_quartier: "Redonner la ville aux citoyens" (Plateforme valeur 1)

-- Script complet de mise à jour:

UPDATE party_positions
SET
    source = CASE
        WHEN question_id LIKE '%tramway%' THEN 'Plateforme 2025 (§2.1) + Questionnaire direct - Annuler tramway'
        WHEN question_id LIKE '%troisieme_lien%' THEN 'Plateforme 2025 (§2.3) + Questionnaire direct - Promouvoir 3e lien est'
        WHEN question_id LIKE '%reduction_depenses_taxes%' THEN 'Plateforme 2025 (§1.5) + Questionnaire direct - Gel taxes 2 ans'
        WHEN question_id LIKE '%pistes_cyclables%' THEN 'Plateforme 2025 (§2.6) + Questionnaire direct - Moratoire pistes cyclables'
        WHEN question_id LIKE '%avantages_fiscaux%' THEN 'Plateforme 2025 (§1.4) + Questionnaire direct - Réduction taxes commerces'
        WHEN question_id LIKE '%pouvoir_conseils%' THEN 'Plateforme 2025 (Valeur 1) + Questionnaire direct - Démocratie citoyenne'
        ELSE 'Plateforme Électorale 2025 (14 mai) + Questionnaire direct'
    END,
    note = 'Double validation: position documentée dans plateforme officielle ET confirmée par réponse directe au questionnaire de la Boussole Municipale'
WHERE party_id IN (
    SELECT id FROM parties WHERE name LIKE '%Respect%Citoyens%'
);

-- Vérification des sources mises à jour
SELECT
    q.text as question,
    pp.position,
    pp.source,
    pp.note
FROM party_positions pp
JOIN questions q ON pp.question_id = q.id
JOIN parties p ON pp.party_id = p.id
WHERE p.name LIKE '%Respect%Citoyens%'
ORDER BY q.order_index;