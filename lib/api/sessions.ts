import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

type UserSession = Database['public']['Tables']['user_sessions']['Row']
type UserSessionInsert = Database['public']['Tables']['user_sessions']['Insert']

export class SessionsAPI {
  private supabase = createClient()

  /**
   * Crée une nouvelle session utilisateur avec un token unique
   */
  async createSession(userAgent?: string): Promise<UserSession> {
    // Générer un token de session unique
    const sessionToken = this.generateSessionToken()
    
    const session: UserSessionInsert = {
      session_token: sessionToken,
      user_agent: userAgent || null,
      expires_at: this.getExpirationDate(),
    }

    const { data, error } = await this.supabase
      .from('user_sessions')
      .insert(session)
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la création de la session:', error)
      throw new Error(`Erreur lors de la création de la session: ${error.message}`)
    }

    return data
  }

  /**
   * Récupère une session par son token
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

    // Vérifier si la session n'est pas expirée
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      // Session expirée, la supprimer
      await this.deleteSession(data.id)
      return null
    }

    return data
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
   * Génère un token de session unique
   */
  private generateSessionToken(): string {
    // Utiliser crypto.randomUUID si disponible, sinon fallback
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    
    // Fallback pour générer un UUID v4 simple
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
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
   * Analyse les user agents pour des statistiques
   */
  private analyzeUserAgents(userAgents: string[]) {
    const browsers: Record<string, number> = {}
    const os: Record<string, number> = {}

    userAgents.forEach(ua => {
      // Analyser le navigateur
      if (ua.includes('Chrome')) browsers.Chrome = (browsers.Chrome || 0) + 1
      else if (ua.includes('Firefox')) browsers.Firefox = (browsers.Firefox || 0) + 1
      else if (ua.includes('Safari') && !ua.includes('Chrome')) browsers.Safari = (browsers.Safari || 0) + 1
      else if (ua.includes('Edge')) browsers.Edge = (browsers.Edge || 0) + 1
      else browsers.Other = (browsers.Other || 0) + 1

      // Analyser le système d'exploitation
      if (ua.includes('Windows')) os.Windows = (os.Windows || 0) + 1
      else if (ua.includes('Mac')) os.macOS = (os.macOS || 0) + 1
      else if (ua.includes('Linux')) os.Linux = (os.Linux || 0) + 1
      else if (ua.includes('Android')) os.Android = (os.Android || 0) + 1
      else if (ua.includes('iOS')) os.iOS = (os.iOS || 0) + 1
      else os.Other = (os.Other || 0) + 1
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
}

// Instance singleton pour utilisation dans l'application
export const sessionsAPI = new SessionsAPI() 