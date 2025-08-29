-- Script de nettoyage des données corrompues
-- À exécuter AVANT les scripts d'insertion
-- ⚠️  ATTENTION: Ceci supprime TOUTES les données existantes

-- Désactiver les contraintes de clé étrangère temporairement
SET session_replication_role = replica;

-- Supprimer dans l'ordre des dépendances (enfant vers parent)
DELETE FROM party_positions;
DELETE FROM parties;
DELETE FROM questions;

-- Réactiver les contraintes de clé étrangère
SET session_replication_role = DEFAULT;

-- Vérification du nettoyage
SELECT 'Questions supprimées' as table_name, COUNT(*) as count FROM questions
UNION ALL
SELECT 'Partis supprimés' as table_name, COUNT(*) as count FROM parties  
UNION ALL
SELECT 'Positions supprimées' as table_name, COUNT(*) as count FROM party_positions;

-- Log de confirmation
SELECT 
  'Nettoyage terminé' as status, 
  NOW() as timestamp,
  'Prêt pour l''insertion des nouvelles données' as message;