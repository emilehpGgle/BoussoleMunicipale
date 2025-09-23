import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function POST(request: Request) {
  try {
    console.log(`🚀 [save-share] Début traitement sauvegarde avec Supabase (anon key)`)
    
    const body = await request.json()
    const { shareId, data } = body

    console.log(`📝 [save-share] shareId reçu: ${shareId}`)
    console.log(`📊 [save-share] data reçu:`, {
      id: data?.id,
      userName: data?.userName,
      topParties: data?.topParties?.length,
      timestamp: data?.timestamp,
      municipality: data?.municipality
    })

    if (!shareId || !data) {
      console.error(`❌ [save-share] Données manquantes - shareId: ${!!shareId}, data: ${!!data}`)
      return NextResponse.json({ message: 'Données manquantes' }, { status: 400 })
    }

    // Extraire et valider la municipality
    const municipality = data.municipality || 'quebec' // Fallback par défaut
    const supportedMunicipalities = ['quebec', 'montreal', 'laval', 'gatineau', 'longueuil', 'levis']

    if (!supportedMunicipalities.includes(municipality)) {
      console.error(`❌ [save-share] Municipality non supportée: ${municipality}`)
      return NextResponse.json({
        message: `Municipality '${municipality}' non supportée`,
        supportedMunicipalities
      }, { status: 400 })
    }

    console.log(`🏛️ [save-share] Municipality validée: ${municipality}`)

    // Valider le shareId pour éviter les injections
    const safeShareId = shareId.toString().replace(/[^a-zA-Z0-9\-_]/g, '')
    console.log(`🔒 [save-share] shareId sécurisé: ${safeShareId}`)

    try {
      // Créer le client Supabase normal (avec anon key)
      console.log(`🗄️ [save-share] Connexion à Supabase avec anon key`)
      const supabase = createClient()
      
      // Insérer les données dans la table shared_results
      // Les politiques RLS permettent maintenant l'insertion publique
      console.log(`💾 [save-share] Insertion en base de données avec municipality: ${municipality}`)
      const { data: insertedData, error } = await supabase
        .from('shared_results')
        .insert({
          share_id: safeShareId,
          share_data: data,
          municipality_id: municipality
        })
        .select()
        .single()

      if (error) {
        console.error(`❌ [save-share] Erreur insertion Supabase:`, error)
        throw new Error(`Erreur base de données: ${error.message}`)
      }

      console.log(`✅ [save-share] Données sauvegardées avec succès en base`)
      console.log(`📊 [save-share] ID généré en base: ${insertedData.id}`)

    } catch (dbError) {
      console.error(`❌ [save-share] Erreur base de données:`, dbError)
      return NextResponse.json({ 
        message: 'Erreur lors de la sauvegarde en base de données',
        error: dbError instanceof Error ? dbError.message : 'Erreur de base de données',
        success: false
      }, { status: 500 })
    }

    const publicPath = `/partage/${safeShareId}`
    console.log(`🌐 [save-share] Chemin public: ${publicPath}`)

    return NextResponse.json({ 
      message: 'Résultats sauvegardés avec succès en base de données', 
      path: publicPath,
      shareId: safeShareId,
      success: true
    })
  } catch (error) {
    console.error('💥 [save-share] Erreur critique lors de la sauvegarde :', error)
    return NextResponse.json({ 
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      success: false
    }, { status: 500 })
  }
} 