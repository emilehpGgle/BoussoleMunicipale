-- Migration SQL : Ajouter les champs manquants à la table parties
-- Date: 2025-09-27
-- Objectif: Assurer compatibilité avec l'interface Party existante

-- 1. Ajouter le champ leader_photo_url (optionnel)
ALTER TABLE public.parties
ADD COLUMN IF NOT EXISTS leader_photo_url text;

-- 2. Ajouter le champ color (requis pour l'affichage, couleur par défaut)
ALTER TABLE public.parties
ADD COLUMN IF NOT EXISTS color text DEFAULT '#0066CC';

-- 3. Ajouter un commentaire pour la table
COMMENT ON TABLE public.parties IS 'Table des partis politiques municipaux avec informations complètes';

-- 4. Ajouter des commentaires pour les nouveaux champs
COMMENT ON COLUMN public.parties.leader_photo_url IS 'URL de la photo du leader du parti (optionnel)';
COMMENT ON COLUMN public.parties.color IS 'Couleur hexadécimale du parti pour l''affichage (#RRGGBB)';

-- 5. Créer un index pour les recherches par couleur (optionnel, pour des fonctionnalités futures)
CREATE INDEX IF NOT EXISTS idx_parties_color ON public.parties USING btree (color);

-- 6. Vérifier la structure finale
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'parties'
  AND table_schema = 'public'
ORDER BY ordinal_position;