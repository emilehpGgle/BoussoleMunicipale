import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    console.log(`🚀 [save-share] Début traitement sauvegarde`)
    
    const body = await request.json()
    const { shareId, data } = body

    console.log(`📝 [save-share] shareId reçu: ${shareId}`)
    console.log(`📊 [save-share] data reçu:`, { 
      id: data?.id, 
      userName: data?.userName, 
      topParties: data?.topParties?.length,
      timestamp: data?.timestamp 
    })

    if (!shareId || !data) {
      console.error(`❌ [save-share] Données manquantes - shareId: ${!!shareId}, data: ${!!data}`)
      return NextResponse.json({ message: 'Données manquantes' }, { status: 400 })
    }

    // Valider le shareId pour éviter les "path traversal attacks"
    const safeShareId = path.basename(shareId)
    console.log(`🔒 [save-share] shareId sécurisé: ${safeShareId}`)

    const dir = path.join(process.cwd(), 'public', 'partage')
    console.log(`📁 [save-share] Répertoire cible: ${dir}`)
    
    // Créer le répertoire avec des logs
    try {
      await fs.mkdir(dir, { recursive: true })
      console.log(`✅ [save-share] Répertoire créé/vérifié avec succès`)
    } catch (mkdirError) {
      console.error(`❌ [save-share] Erreur création répertoire:`, mkdirError)
      throw mkdirError
    }
    
    const filePath = path.join(dir, `${safeShareId}.json`)
    console.log(`📄 [save-share] Chemin fichier complet: ${filePath}`)
    
    // Écrire le fichier avec des logs
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2))
      console.log(`✅ [save-share] Fichier écrit avec succès`)
      
      // Vérifier que le fichier existe vraiment
      const stats = await fs.stat(filePath)
      console.log(`📊 [save-share] Taille fichier créé: ${stats.size} octets`)
      
      // Lire et vérifier le contenu
      const savedContent = await fs.readFile(filePath, 'utf8')
      const parsedContent = JSON.parse(savedContent)
      console.log(`🔍 [save-share] Contenu vérifié - ID: ${parsedContent.id}`)
      
    } catch (writeError) {
      console.error(`❌ [save-share] Erreur écriture fichier:`, writeError)
      throw writeError
    }

    const publicPath = `/partage/${safeShareId}.json`
    console.log(`🌐 [save-share] Chemin public: ${publicPath}`)

    return NextResponse.json({ 
      message: 'Résultats sauvegardés avec succès', 
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