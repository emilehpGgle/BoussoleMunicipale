-- Script pour mettre à jour les couleurs des partis existants
-- Basé sur les couleurs définies dans l'ancien système lib/boussole-data.ts

-- Mettre à jour les couleurs pour les partis existants
-- Québec
UPDATE public.parties SET color = '#0D47A1' WHERE id = 'alliance-citoyenne-quebec';
UPDATE public.parties SET color = '#004b87' WHERE id = 'equipe-priorite-quebec';
UPDATE public.parties SET color = '#2E7D32' WHERE id = 'leadership-quebec';
UPDATE public.parties SET color = '#FF6F00' WHERE id = 'quebec-dabord';
UPDATE public.parties SET color = '#1976D2' WHERE id = 'quebec-forte-et-fiere';
UPDATE public.parties SET color = '#B71C1C' WHERE id = 'respect-citoyens';
UPDATE public.parties SET color = '#388E3C' WHERE id = 'transition-quebec';

-- Montréal
UPDATE public.parties SET color = '#E53935' WHERE id = 'action-montreal';
UPDATE public.parties SET color = '#1565C0' WHERE id = 'ensemble-montreal';
UPDATE public.parties SET color = '#43A047' WHERE id = 'futur-montreal';
UPDATE public.parties SET color = '#FF8F00' WHERE id = 'projet-montreal';
UPDATE public.parties SET color = '#8BC34A' WHERE id = 'transition-montreal';

-- Laval
UPDATE public.parties SET color = '#FF9800' WHERE id = 'action-laval';
UPDATE public.parties SET color = '#4CAF50' WHERE id = 'mouvement-lavallois';
UPDATE public.parties SET color = '#2196F3' WHERE id = 'parti-laval';

-- Gatineau
UPDATE public.parties SET color = '#9C27B0' WHERE id = 'action-gatineau';
UPDATE public.parties SET color = '#607D8B' WHERE id = 'equipe-mario-aube';

-- Longueuil
UPDATE public.parties SET color = '#FF5722' WHERE id = 'coalition-longueuil';
UPDATE public.parties SET color = '#795548' WHERE id = 'option-alliance';

-- Lévis
UPDATE public.parties SET color = '#3F51B5' WHERE id = 'levis-force-10';
UPDATE public.parties SET color = '#E91E63' WHERE id = 'prosperite-levis';
UPDATE public.parties SET color = '#009688' WHERE id = 'repensons-levis';

-- Vérifier les mises à jour
SELECT id, name, color, municipality_id
FROM public.parties
ORDER BY municipality_id, name;