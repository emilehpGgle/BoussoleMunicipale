import { createClient } from '@/lib/supabase/client'
import { Database, AgreementOptionKey, ImportanceOptionKey, ImportanceDirectOptionKey } from '@/lib/supabase/types'

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
    responseType: 'agreement' | 'importance' | 'importance_direct',
    value: AgreementOptionKey | ImportanceOptionKey | ImportanceDirectOptionKey
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
      ...(responseType === 'importance' && { importance_value: value as ImportanceOptionKey }),
      ...(responseType === 'importance_direct' && { importance_direct_value: value as ImportanceDirectOptionKey }),
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
    agreementValue: AgreementOptionKey
  ) {
    return this.saveResponse(sessionId, questionId, 'agreement', agreementValue)
  }

  /**
   * Sauvegarde une réponse d'importance (1-5) pour une question
   */
  async saveImportanceResponse(
    sessionId: string,
    questionId: string,
    importanceValue: ImportanceOptionKey
  ) {
    return this.saveResponse(sessionId, questionId, 'importance', importanceValue)
  }

  /**
   * Sauvegarde une réponse d'importance directe pour une question
   */
  async saveImportanceDirectResponse(
    sessionId: string,
    questionId: string,
    importanceDirectValue: ImportanceDirectOptionKey
  ) {
    return this.saveResponse(sessionId, questionId, 'importance_direct', importanceDirectValue)
  }

  /**
   * Récupère toutes les réponses d'une session
   */
  async getSessionResponses(sessionId: string): Promise<UserResponse[]> {
    // Validate sessionId
    if (!sessionId || typeof sessionId !== 'string' || sessionId.trim().length === 0) {
      throw new Error('Session ID est requis et doit être une chaîne non vide')
    }

    const { data, error } = await this.supabase
      .from('user_responses')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Erreur lors de la récupération des réponses:', error)
      throw new Error(`Erreur lors de la récupération: ${error.message}`)
    }

    return data || []
  }

  /**
   * Récupère les réponses d'accord pour une session (format compatible localStorage)
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
   * Récupère les réponses d'importance pour une session (format compatible localStorage)
   */
  async getUserImportance(sessionId: string): Promise<Record<string, ImportanceOptionKey>> {
    const responses = await this.getSessionResponses(sessionId)
    const userImportance: Record<string, ImportanceOptionKey> = {}

    responses
      .filter(r => r.response_type === 'importance' && r.importance_value)
      .forEach(response => {
        userImportance[response.question_id] = response.importance_value as ImportanceOptionKey
      })

    return userImportance
  }

  /**
   * Récupère les réponses d'importance directe pour une session (format compatible localStorage)
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