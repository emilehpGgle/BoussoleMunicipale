import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'
import { v4 as uuidv4 } from 'uuid'

type UserSession = Database['public']['Tables']['user_sessions']['Row']
type UserSessionInsert = Database['public']['Tables']['user_sessions']['Insert']

export class SessionsAPI {
  private supabase = createClient()

  /**
   * Extrait l'adresse IP depuis les headers de la requête
   * Utilise les headers standards des proxies/CDN pour obtenir l'IP réelle
   */
  static getClientIP(request: Request): string | null {
    // Headers à vérifier dans l'ordre de priorité
    const ipHeaders = [
      'x-forwarded-for',      // Proxy/CDN standard
      'x-real-ip',            // Nginx
      'cf-connecting-ip',     // Cloudflare
      'x-client-ip',          // Apache
      'forwarded',            // RFC 7239
    ]

    for (const header of ipHeaders) {
      const headerValue = request.headers.get(header)
      if (headerValue) {
        // x-forwarded-for peut contenir plusieurs IPs séparées par des virgules
        const ip = headerValue.split(',')[0].trim()
        if (ip && ip !== 'unknown') {
          return ip
        }
      }
    }

    return null // IP non trouvée
  }

  /**
   * Crée une nouvelle session utilisateur avec un token unique
   */
  async createSession(userAgent?: string, ipAddress?: string): Promise<UserSession> {
    console.log('🎯 [SESSIONS API] createSession - Début')

    // Générer un token de session unique et sécurisé
    const sessionToken = this.generateSessionToken()
    console.log('🔑 [SESSIONS API] Token généré:', sessionToken?.substring(0, 8) + '...')

    const session: UserSessionInsert = {
      session_token: sessionToken,
      user_agent: userAgent || null,
      ip_address: ipAddress || null,
      expires_at: this.getExpirationDate(),
    }

    console.log('📦 [SESSIONS API] Session à insérer:', {
      token: session.session_token?.substring(0, 8) + '...',
      userAgent: session.user_agent,
      ipAddress: session.ip_address?.substring(0, 10) + '...' || 'N/A',
      expires: session.expires_at,
      fullObject: session
    })

    console.log('🔗 [SESSIONS API] Test de connexion Supabase...')
    
    // Test de connexion simple
    try {
      const { data: testData, error: testError } = await this.supabase
        .from('user_sessions')
        .select('count')
        .limit(1)
      
      console.log('✅ [SESSIONS API] Test de connexion:', { testData, testError })
    } catch (testErr) {
      console.error('❌ [SESSIONS API] Erreur de connexion:', testErr)
    }

    console.log('💾 [SESSIONS API] Insertion en base...')
    const { data, error } = await this.supabase
      .from('user_sessions')
      .insert(session)
      .select()
      .single()

    console.log('📊 [SESSIONS API] Résultat de l\'insertion:', { data, error })

    if (error) {
      console.error('❌ [SESSIONS API] Erreur lors de la création de la session:', {
        error,
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      })
      throw new Error(`Erreur lors de la création de la session: ${error.message}`)
    }

    console.log('✅ [SESSIONS API] Session créée avec succès!', {
      id: data.id,
      token: data.session_token?.substring(0, 8) + '...'
    })
    return data
  }

  /**
   * Récupère une session par son token sans side effects
   */
  async getSessionByToken(sessionToken: string): Promise<UserSession | null> {
    const { data, error } = await this.supabase
      .from('user_sessions')
      .select('*')
      .eq('session_token', sessionToken)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Session non trouvée
        return null
      }
      console.error('Erreur lors de la récupération de la session:', error)
      throw new Error(`Erreur lors de la récupération de la session: ${error.message}`)
    }

    // Vérifier si la session n'est pas expirée (sans la supprimer)
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return null
    }

    return data
  }

  /**
   * Récupère une session active et supprime les sessions expirées (méthode explicite)
   */
  async getActiveSessionByToken(sessionToken: string): Promise<UserSession | null> {
    const session = await this.getSessionByToken(sessionToken)
    
    if (!session) {
      return null
    }

    // Si la session est expirée, la supprimer
    if (session.expires_at && new Date(session.expires_at) < new Date()) {
      await this.deleteSession(session.id)
      return null
    }

    return session
  }

  /**
   * Met à jour la dernière activité d'une session
   */
  async updateSessionActivity(sessionId: string) {
    const { data, error } = await this.supabase
      .from('user_sessions')
      .update({ 
        updated_at: new Date().toISOString(),
        expires_at: this.getExpirationDate()
      })
      .eq('id', sessionId)
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la mise à jour de la session:', error)
      throw new Error(`Erreur lors de la mise à jour de la session: ${error.message}`)
    }

    return data
  }

  /**
   * Supprime une session
   */
  async deleteSession(sessionId: string) {
    const { error } = await this.supabase
      .from('user_sessions')
      .delete()
      .eq('id', sessionId)

    if (error) {
      console.error('Erreur lors de la suppression de la session:', error)
      throw new Error(`Erreur lors de la suppression de la session: ${error.message}`)
    }
  }

  /**
   * Supprime une session par son token
   */
  async deleteSessionByToken(sessionToken: string) {
    const { error } = await this.supabase
      .from('user_sessions')
      .delete()
      .eq('session_token', sessionToken)

    if (error) {
      console.error('Erreur lors de la suppression de la session:', error)
      throw new Error(`Erreur lors de la suppression de la session: ${error.message}`)
    }
  }

  /**
   * Nettoie les sessions expirées (à exécuter périodiquement)
   */
  async cleanExpiredSessions(): Promise<number> {
    const { data, error } = await this.supabase
      .from('user_sessions')
      .delete()
      .lt('expires_at', new Date().toISOString())
      .select('id')

    if (error) {
      console.error('Erreur lors du nettoyage des sessions expirées:', error)
      throw new Error(`Erreur lors du nettoyage: ${error.message}`)
    }

    return data?.length || 0
  }

  /**
   * Récupère des statistiques sur les sessions
   */
  async getSessionStats() {
    const { data, error } = await this.supabase
      .from('user_sessions')
      .select('created_at, expires_at, user_agent')

    if (error) {
      console.error('Erreur lors de la récupération des statistiques:', error)
      throw new Error(`Erreur lors de la récupération des statistiques: ${error.message}`)
    }

    const now = new Date()
    const activeSessions = data.filter(s => !s.expires_at || new Date(s.expires_at) > now)
    const expiredSessions = data.filter(s => s.expires_at && new Date(s.expires_at) <= now)

    return {
      totalSessions: data.length,
      activeSessions: activeSessions.length,
      expiredSessions: expiredSessions.length,
      userAgents: this.analyzeUserAgents(data.map(s => s.user_agent).filter(Boolean) as string[])
    }
  }

  /**
   * Génère un token de session cryptographiquement sécurisé
   */
  private generateSessionToken(): string {
    // Utiliser la bibliothèque uuid pour une génération sécurisée
    return uuidv4()
  }

  /**
   * Calcule la date d'expiration (24 heures par défaut)
   */
  private getExpirationDate(hoursFromNow: number = 24): string {
    const expirationDate = new Date()
    expirationDate.setHours(expirationDate.getHours() + hoursFromNow)
    return expirationDate.toISOString()
  }

  /**
   * Analyse les user agents pour des statistiques avec détection améliorée
   */
  private analyzeUserAgents(userAgents: string[]) {
    const browsers: Record<string, number> = {}
    const os: Record<string, number> = {}

    userAgents.forEach(ua => {
      // Analyser le navigateur (ordre important : vérifier les plus spécifiques d'abord)
      if (ua.includes('Edg/')) {
        browsers.Edge = (browsers.Edge || 0) + 1
      } else if (ua.includes('Chrome') && !ua.includes('Edg/')) {
        browsers.Chrome = (browsers.Chrome || 0) + 1
      } else if (ua.includes('Firefox')) {
        browsers.Firefox = (browsers.Firefox || 0) + 1
      } else if (ua.includes('Safari') && !ua.includes('Chrome') && !ua.includes('Edg/')) {
        browsers.Safari = (browsers.Safari || 0) + 1
      } else {
        browsers.Other = (browsers.Other || 0) + 1
      }

      // Analyser le système d'exploitation
      if (ua.includes('Windows')) {
        os.Windows = (os.Windows || 0) + 1
      } else if (ua.includes('Mac')) {
        os.macOS = (os.macOS || 0) + 1
      } else if (ua.includes('Linux')) {
        os.Linux = (os.Linux || 0) + 1
      } else if (ua.includes('Android')) {
        os.Android = (os.Android || 0) + 1
      } else if (ua.includes('iOS')) {
        os.iOS = (os.iOS || 0) + 1
      } else {
        os.Other = (os.Other || 0) + 1
      }
    })

    return { browsers, os }
  }

  /**
   * Valide un token de session (vérifie le format UUID)
   */
  isValidSessionToken(token: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidRegex.test(token)
  }

  /**
   * Détecte des patterns suspects dans les sessions
   */
  async detectSuspiciousActivity(): Promise<{
    suspiciousIPs: string[]
    rapidCreations: number
    duplicateUserAgents: number
  }> {
    const { data, error } = await this.supabase
      .from('user_sessions')
      .select('ip_address, user_agent, created_at')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Dernières 24h

    if (error) {
      console.error('Erreur lors de la détection d\'activité suspecte:', error)
      return { suspiciousIPs: [], rapidCreations: 0, duplicateUserAgents: 0 }
    }

    // Analyser les IPs avec trop de sessions
    const ipCounts: Record<string, number> = {}
    const userAgentCounts: Record<string, number> = {}
    
    data.forEach(session => {
      if (session.ip_address) {
        ipCounts[session.ip_address] = (ipCounts[session.ip_address] || 0) + 1
      }
      if (session.user_agent) {
        userAgentCounts[session.user_agent] = (userAgentCounts[session.user_agent] || 0) + 1
      }
    })

    // IPs avec plus de 5 sessions en 24h = suspect
    const suspiciousIPs = Object.entries(ipCounts)
      .filter(([, count]) => count > 5)
      .map(([ip]) => ip)

    // Créations rapides (plus de 10 en 1h)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    const rapidCreations = data.filter(s => new Date(s.created_at) > oneHourAgo).length

    // User agents dupliqués (même UA, créations multiples)
    const duplicateUserAgents = Object.values(userAgentCounts).filter(count => count > 3).length

    return {
      suspiciousIPs,
      rapidCreations,
      duplicateUserAgents
    }
  }

  /**
   * Vérifie si une IP a déjà créé trop de sessions récemment
   */
  async checkIPRateLimit(ipAddress: string): Promise<{ allowed: boolean; sessionCount: number }> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    
    const { data, error } = await this.supabase
      .from('user_sessions')
      .select('id')
      .eq('ip_address', ipAddress)
      .gte('created_at', oneHourAgo)

    if (error) {
      console.error('Erreur lors de la vérification du rate limit:', error)
      return { allowed: true, sessionCount: 0 } // En cas d'erreur, autoriser
    }

    const sessionCount = data.length
    const allowed = sessionCount < 3 // Max 3 sessions par heure par IP

    return { allowed, sessionCount }
  }
}

// Instance singleton pour utilisation dans l'application
export const sessionsAPI = new SessionsAPI() 