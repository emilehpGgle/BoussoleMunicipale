// lib/email-service.ts

interface EmailResultsData {
  topParties: Array<{
    party: { name: string; shortName?: string; logoUrl?: string }
    score: number
  }>
  userPosition?: {
    economic: number
    social: number
  }
  timestamp: string
}

export const generateEmailTemplate = (data: EmailResultsData): string => {
  const { topParties, userPosition, timestamp } = data
  
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vos résultats - Boussole Municipale</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
        }
        .header {
            text-align: center;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 30px 20px;
            border-radius: 12px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .results-section {
            background: white;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .party-result {
            display: flex;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .party-result:last-child {
            border-bottom: none;
        }
        .party-rank {
            font-size: 20px;
            font-weight: bold;
            color: #3b82f6;
            margin-right: 15px;
            min-width: 30px;
        }
        .party-info {
            flex: 1;
        }
        .party-name {
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 4px;
        }
        .party-score {
            font-size: 24px;
            font-weight: bold;
            color: #059669;
        }
        .progress-bar {
            width: 100%;
            height: 8px;
            background-color: #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 8px;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #059669);
            transition: width 0.3s ease;
        }
        .position-info {
            background: #f3f4f6;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
        }
        .position-info h3 {
            margin: 0 0 10px 0;
            color: #374151;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .cta-button {
            display: inline-block;
            background: #3b82f6;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin-top: 15px;
        }
        .timestamp {
            color: #6b7280;
            font-size: 14px;
            margin-top: 15px;
        }
        @media (max-width: 480px) {
            body { padding: 10px; }
            .header { padding: 20px 15px; }
            .results-section { padding: 20px 15px; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧭 Vos résultats</h1>
        <p>Boussole Municipale - Découvrez vos affinités politiques</p>
    </div>

    <div class="results-section">
        <h2 style="margin-top: 0; color: #1f2937;">Vos affinités principales</h2>
        ${topParties.slice(0, 5).map((party, index) => `
            <div class="party-result">
                <div class="party-rank">#${index + 1}</div>
                <div class="party-info">
                    <div class="party-name">${party.party.shortName || party.party.name}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${party.score}%"></div>
                    </div>
                </div>
                <div class="party-score">${Math.round(party.score)}%</div>
            </div>
        `).join('')}
    </div>

    ${userPosition ? `
    <div class="results-section">
        <h3 style="margin-top: 0; color: #1f2937;">Votre positionnement politique</h3>
        <div class="position-info">
            <p><strong>Axe économique :</strong> ${userPosition.economic > 0 ? 'Orienté marché' : 'Interventionniste'} (${userPosition.economic.toFixed(1)})</p>
            <p><strong>Axe social/environnemental :</strong> ${userPosition.social > 0 ? 'Progressiste' : 'Conservateur'} (${userPosition.social.toFixed(1)})</p>
        </div>
    </div>
    ` : ''}

    <div class="footer">
        <h3 style="margin-top: 0; color: #1f2937;">Partagez avec vos proches !</h3>
        <p style="color: #6b7280;">Encouragez votre famille et vos amis à découvrir leurs affinités politiques.</p>
        <a href="${typeof window !== 'undefined' ? window.location.origin : 'https://boussole-municipale.com'}/questionnaire" class="cta-button">
            Refaire le test
        </a>
        <div class="timestamp">
            Résultats générés le ${timestamp}
        </div>
    </div>
</body>
</html>
  `
}

export const generateEmailSubject = (topParty?: { party: { name: string; shortName?: string }, score: number }): string => {
  if (!topParty) return "Mes résultats - Boussole Municipale"
  
  const partyName = topParty.party.shortName || topParty.party.name
  const score = Math.round(topParty.score)
  
  return `🧭 ${score}% d'affinité avec ${partyName} - Mes résultats Boussole Municipale`
}

export const generateEmailBody = (data: EmailResultsData): string => {
  const { topParties } = data
  const topParty = topParties[0]
  
  const textContent = `
Bonjour !

Voici vos résultats de la Boussole Municipale :

🏆 TOP 3 DE VOS AFFINITÉS :
${topParties.slice(0, 3).map((party, index) => 
  `${index + 1}. ${party.party.shortName || party.party.name} : ${Math.round(party.score)}%`
).join('\n')}

${topParty ? `Votre plus grande affinité est avec ${topParty.party.shortName || topParty.party.name} à ${Math.round(topParty.score)}% !` : ''}

🗳️ POURQUOI C'EST IMPORTANT ?
Les élections municipales impactent directement votre quotidien : transports, environnement, logement, taxes...

👥 PARTAGEZ AVEC VOS PROCHES !
Encouragez votre famille et vos amis à découvrir leurs affinités : ${typeof window !== 'undefined' ? window.location.origin : 'https://boussole-municipale.com'}/questionnaire

---
Boussole Municipale - Votez en connaissance de cause
Résultats générés le ${data.timestamp}
  `.trim()
  
  return textContent
}

// Fonction pour envoyer l'email (utilise l'API Web Share ou mailto)
export const sendResultsByEmail = async (
  email: string, 
  data: EmailResultsData,
  useHTML: boolean = false
): Promise<boolean> => {
  try {
    const subject = generateEmailSubject(data.topParties[0])
    
    if (useHTML) {
      // Pour une future intégration avec un service d'email (SendGrid, Mailgun, etc.)
      const htmlContent = generateEmailTemplate(data)
      console.log('HTML Email ready:', { email, subject, htmlContent })
      
      // TODO: Intégrer avec un vrai service d'email
      // const response = await fetch('/api/send-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ to: email, subject, html: htmlContent })
      // })
      // return response.ok
      
      return true
    } else {
      // Utilisation du client email par défaut (mailto)
      const body = generateEmailBody(data)
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      
      if (typeof window !== 'undefined') {
        window.location.href = mailtoUrl
      }
      
      return true
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return false
  }
} 