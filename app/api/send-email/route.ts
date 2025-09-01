import { NextRequest, NextResponse } from 'next/server'
import { generateEmailTemplate } from '@/lib/email-service'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Interface pour les données de la requête
interface EmailRequest {
  to: string
  subject: string
  topParties: Array<{
    party: { name: string; shortName?: string; logoUrl?: string }
    score: number
  }>
  userPosition?: {
    economic: number
    social: number
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json()
    const { to, subject, topParties, userPosition } = body

    // Validation des données
    if (!to || !subject || !topParties || topParties.length === 0) {
      return NextResponse.json(
        { error: 'Données manquantes dans la requête' },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      )
    }

    // Préparer les données pour le template
    const emailData = {
      topParties,
      userPosition,
      timestamp: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    // Générer le contenu HTML
    const htmlContent = generateEmailTemplate(emailData)

    // Vérifier que la clé API Resend est configurée
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY non configurée')
      // En mode développement, on simule quand même
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Mode développement : simulation de l\'envoi d\'email')
        console.log('📧 Email simulé envoyé à:', to)
        console.log('📧 Sujet:', subject)
        return NextResponse.json({ 
          success: true, 
          message: `Email simulé envoyé à ${to} (mode développement)`,
          preview: htmlContent.substring(0, 200) + '...',
        })
      }
      return NextResponse.json(
        { error: 'Service d\'email non configuré' },
        { status: 500 }
      )
    }

    try {
      // Envoi réel avec Resend
      await resend.emails.send({
        from: 'Boussole Municipale <noreply@boussole-municipale.com>',
        to,
        subject,
        html: htmlContent,
      })

      console.log('✅ Email envoyé avec succès à:', to)

      return NextResponse.json({ 
        success: true, 
        message: `Email envoyé avec succès à ${to}`
      })

    } catch (emailError) {
      console.error('❌ Erreur Resend:', emailError)
      
      // En cas d'erreur, fallback vers la simulation en développement
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Fallback vers la simulation en mode développement')
        return NextResponse.json({ 
          success: true, 
          message: `Email simulé envoyé à ${to} (fallback après erreur)`,
          warning: 'Service d\'email en erreur, simulation utilisée'
        })
      }
      
      throw emailError
    }

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// Optionnel : endpoint GET pour tester l'API
export async function GET() {
  return NextResponse.json({
    message: 'API d\'envoi d\'email - Boussole Municipale',
    version: '1.0.0',
    endpoints: {
      POST: '/api/send-email - Envoie un email avec les résultats'
    },
    status: 'En développement - Service d\'email externe à configurer'
  })
} 