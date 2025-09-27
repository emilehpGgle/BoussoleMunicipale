import { createClient } from '@/lib/supabase/client'
import { Database, AgreementOptionKey, ImportanceDirectOptionKey } from '@/lib/supabase/types'

type UserResponse = Database['public']['Tables']['user_responses']['Row']
type UserResponseInsert = Database['public']['Tables']['user_responses']['Insert']

export class ResponsesAPI {
  private supabase = createClient()

  /**
   * Méthode générique pour sauvegarder une réponse
   */
  private async saveResponse(
    sessionId: string,
    questionId: string,
    responseType: 'agreement' | 'importance_direct',
    value: AgreementOptionKey | ImportanceDirectOptionKey,
    municipalityId?: string
  ) {
    // Validate inputs
    if (!sessionId || typeof sessionId !== 'string' || sessionId.trim().length === 0) {
      throw new Error('Session ID est requis et doit être une chaîne non vide')
    }

    if (!questionId || typeof questionId !== 'string' || questionId.trim().length === 0) {
      throw new Error('Question ID est requis et doit être une chaîne non vide')
    }

    if (!value) {
      throw new Error('Une valeur de réponse est requise')
    }

    const response: UserResponseInsert = {
      session_id: sessionId,
      question_id: questionId,
      response_type: responseType,
      ...(responseType === 'agreement' && { agreement_value: value as AgreementOptionKey }),
      ...(responseType === 'importance_direct' && { importance_direct_value: value as ImportanceDirectOptionKey }),
      municipality_id: municipalityId || 'quebec', // Fallback par défaut
    }

    const { data, error } = await this.supabase
      .from('user_responses')
      .upsert(response, { 
        onConflict: 'session_id,question_id,response_type',
        ignoreDuplicates: false 
      })
      .select()
      .single()

    if (error) {
      console.error(`Erreur lors de la sauvegarde de la réponse ${responseType}:`, error)
      throw new Error(`Erreur lors de la sauvegarde: ${error.message}`)
    }

    return data
  }

  /**
   * Sauvegarde une réponse utilisateur (accord/désaccord) pour une question
   */
  async saveAgreementResponse(
    sessionId: string,
    questionId: string,
    agreementValue: AgreementOptionKey,
    municipalityId?: string
  ) {
    return this.saveResponse(sessionId, questionId, 'agreement', agreementValue, municipalityId)
  }

  /**
   * Sauvegarde une réponse d'importance directe pour une question
   */
  async saveImportanceDirectResponse(
    sessionId: string,
    questionId: string,
    importanceDirectValue: ImportanceDirectOptionKey,
    municipalityId?: string
  ) {
    return this.saveResponse(sessionId, questionId, 'importance_direct', importanceDirectValue, municipalityId)
  }

  /**
   * Sauvegarde une réponse de priorité pour une question
   */
  async savePriorityResponse(
    sessionId: string,
    questionId: string,
    priorityData: Record<string, number>,
    municipalityId?: string
  ) {
    // Validate inputs
    if (!sessionId || typeof sessionId !== 'string' || sessionId.trim().length === 0) {
      throw new Error('Session ID est requis et doit être une chaîne non vide')
    }

    if (!questionId || typeof questionId !== 'string' || questionId.trim().length === 0) {
      throw new Error('Question ID est requis et doit être une chaîne non vide')
    }

    if (!priorityData || typeof priorityData !== 'object') {
      throw new Error('Les données de priorité sont requises')
    }

    console.log('🔄 [RESPONSES API] Sauvegarde priorité - session:', sessionId?.substring(0, 10) + '...', 'question:', questionId)

    // Utiliser upsert standard maintenant que la contrainte est résolue
    const response: UserResponseInsert = {
      session_id: sessionId,
      question_id: questionId,
      response_type: 'priority_ranking' as const,
      priority_data: priorityData,
      municipality_id: municipalityId || 'quebec', // Fallback par défaut
    }

    // Utiliser upsert avec la clé primaire pour éviter les doublons
    const { data, error } = await this.supabase
      .from('user_responses')
      .upsert(response, { 
        onConflict: 'session_id,question_id,response_type',
        ignoreDuplicates: false 
      })
      .select()
      .single()

    if (error) {
      console.error('❌ [RESPONSES API] Erreur sauvegarde priorité:', error)
      throw new Error(`Erreur lors de la sauvegarde: ${error.message}`)
    }

    console.log('✅ [RESPONSES API] Sauvegarde priorité réussie!')
    return data
  }

  /**
   * Récupère toutes les réponses d'une session
   */
  async getSessionResponses(sessionId: string, municipalityId?: string): Promise<UserResponse[]> {
    // Validate sessionId
    if (!sessionId || typeof sessionId !== 'string' || sessionId.trim().length === 0) {
      throw new Error('Session ID est requis et doit être une chaîne non vide')
    }

    let query = this.supabase
      .from('user_responses')
      .select('*')
      .eq('session_id', sessionId)

    // Filtrer par municipalité si spécifié
    if (municipalityId) {
      query = query.eq('municipality_id', municipalityId)
    }

    const { data, error } = await query.order('created_at', { ascending: true })

    if (error) {
      console.error('Erreur lors de la récupération des réponses:', error)
      throw new Error(`Erreur lors de la récupération: ${error.message}`)
    }

    return data || []
  }

  /**
   * Récupère les réponses d'accord pour une session
   */
  async getUserAnswers(sessionId: string): Promise<Record<string, AgreementOptionKey>> {
    const responses = await this.getSessionResponses(sessionId)
    const userAnswers: Record<string, AgreementOptionKey> = {}

    responses
      .filter(r => r.response_type === 'agreement' && r.agreement_value)
      .forEach(response => {
        userAnswers[response.question_id] = response.agreement_value as AgreementOptionKey
      })

    return userAnswers
  }

  /**
   * Récupère les réponses d'importance directe pour une session
   */
  async getUserImportanceDirectAnswers(sessionId: string): Promise<Record<string, ImportanceDirectOptionKey>> {
    const responses = await this.getSessionResponses(sessionId)
    const userImportanceDirectAnswers: Record<string, ImportanceDirectOptionKey> = {}

    responses
      .filter(r => r.response_type === 'importance_direct' && r.importance_direct_value)
      .forEach(response => {
        userImportanceDirectAnswers[response.question_id] = response.importance_direct_value as ImportanceDirectOptionKey
      })

    return userImportanceDirectAnswers
  }

  /**
   * Récupère les réponses de priorité pour une session
   */
  async getUserPriorities(sessionId: string): Promise<Record<string, Record<string, number>>> {
    const responses = await this.getSessionResponses(sessionId)
    const userPriorities: Record<string, Record<string, number>> = {}

    responses
      .filter(r => r.response_type === 'priority_ranking' && r.priority_data)
      .forEach(response => {
        userPriorities[response.question_id] = response.priority_data as Record<string, number>
      })

    return userPriorities
  }

  /**
   * Supprime toutes les réponses d'une session
   */
  async clearSessionResponses(sessionId: string) {
    // Validate sessionId
    if (!sessionId || typeof sessionId !== 'string' || sessionId.trim().length === 0) {
      throw new Error('Session ID est requis et doit être une chaîne non vide')
    }

    const { error } = await this.supabase
      .from('user_responses')
      .delete()
      .eq('session_id', sessionId)

    if (error) {
      console.error('Erreur lors de la suppression des réponses:', error)
      throw new Error(`Erreur lors de la suppression: ${error.message}`)
    }
  }
}

// Instance singleton pour utilisation dans l'application
export const responsesAPI = new ResponsesAPI() 