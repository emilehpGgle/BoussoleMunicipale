import { NextRequest, NextResponse } from 'next/server'
import { runFullMigration, verifyMigration, cleanAllData } from '@/lib/migration-script'

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()

    switch (action) {
      case 'migrate':
        console.log('🚀 Démarrage de la migration via API...')
        const result = await runFullMigration()
        return NextResponse.json({ 
          success: true, 
          message: 'Migration completed successfully',
          data: result 
        })

      case 'verify':
        console.log('🔍 Vérification de la migration via API...')
        const verification = await verifyMigration()
        return NextResponse.json({ 
          success: true, 
          message: 'Verification completed',
          data: verification 
        })

      case 'clean':
        console.log('🗑️ Nettoyage des données via API...')
        await cleanAllData()
        return NextResponse.json({ 
          success: true, 
          message: 'Data cleaned successfully' 
        })

      default:
        return NextResponse.json(
          { success: false, message: 'Action not supported. Use: migrate, verify, or clean' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution de l\'action:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Migration failed', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Endpoint pour vérifier le statut de la migration
  try {
    const verification = await verifyMigration()
    return NextResponse.json({ 
      success: true, 
      message: 'Migration status checked',
      data: verification 
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to check migration status', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
} 