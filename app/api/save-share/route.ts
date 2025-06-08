import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { shareId, data } = body

    if (!shareId || !data) {
      return NextResponse.json({ message: 'Données manquantes' }, { status: 400 })
    }

    // Valider le shareId pour éviter les "path traversal attacks"
    const safeShareId = path.basename(shareId)

    const dir = path.join(process.cwd(), 'public', 'partage')
    await fs.mkdir(dir, { recursive: true })
    
    const filePath = path.join(dir, `${safeShareId}.json`)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ message: 'Résultats sauvegardés avec succès', path: `/partage/${safeShareId}.json` })
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du partage :', error)
    return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
  }
} 