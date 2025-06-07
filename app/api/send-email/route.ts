import { NextRequest, NextResponse } from 'next/server'
import { generateEmailTemplate } from '@/lib/email-service'

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

    /* 
    TODO: Intégrer avec un service d'email réel
    
    Exemples d'intégration :
    
    // SENDGRID
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    const msg = {
      to,
      from: 'noreply@boussole-municipale.com',
      subject,
      html: htmlContent,
    }
    
    await sgMail.send(msg)
    
    // MAILGUN
    const mailgun = require('mailgun-js')({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN
    })
    
    const data = {
      from: 'Boussole Municipale <noreply@boussole-municipale.com>',
      to,
      subject,
      html: htmlContent
    }
    
    await mailgun.messages().send(data)
    
    // RESEND
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'Boussole Municipale <noreply@boussole-municipale.com>',
      to,
      subject,
      html: htmlContent,
    })
    */

    // Pour l'instant, on simule l'envoi et retourne le HTML généré
    console.log('📧 Email simulé envoyé à:', to)
    console.log('📧 Sujet:', subject)
    console.log('📧 Contenu HTML généré (longueur):', htmlContent.length, 'caractères')

    return NextResponse.json({ 
      success: true, 
      message: `Email simulé envoyé à ${to}`,
      preview: htmlContent.substring(0, 200) + '...',
    })

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