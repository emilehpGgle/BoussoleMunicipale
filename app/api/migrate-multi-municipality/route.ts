import { NextRequest, NextResponse } from 'next/server'
import {
  runFullMultiMunicipalityMigration,
  verifyMultiMunicipalityMigration
} from '@/lib/migration-multi-municipality'

/**
 * API route pour la migration multi-municipalités
 * GET /api/migrate-multi-municipality - Lance la migration complète
 * POST /api/migrate-multi-municipality - Vérifie la migration
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    console.log('🚀 [API] Début de la migration multi-municipalités')

    const result = await runFullMultiMunicipalityMigration()

    return NextResponse.json({
      message: 'Migration multi-municipalités terminée avec succès',
      ...result
    })

  } catch (error) {
    console.error('❌ [API] Erreur lors de la migration:', error)

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      message: 'Erreur lors de la migration multi-municipalités'
    }, { status: 500 })
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: NextRequest) {
  try {
    console.log('🔍 [API] Vérification de la migration multi-municipalités')

    const result = await verifyMultiMunicipalityMigration()

    return NextResponse.json({
      message: result.success
        ? 'Vérification réussie - Migration fonctionnelle'
        : 'Vérification échouée - Migration incomplète',
      ...result
    })

  } catch (error) {
    console.error('❌ [API] Erreur lors de la vérification:', error)

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      message: 'Erreur lors de la vérification de la migration'
    }, { status: 500 })
  }
}