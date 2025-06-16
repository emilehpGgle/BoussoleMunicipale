import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

type UserResult = Database['public']['Tables']['user_results']['Row']
type UserResultInsert = Database['public']['Tables']['user_results']['Insert']
type UserResultUpdate = Database['public']['Tables']['user_results']['Update']

// Types pour les résultats calculés
export interface CalculatedResults {
  partyScores: Record<string, number>
  matchedParties: string[]
  politicalPosition?: { x: number; y: number }
  completionPercentage: number
  totalQuestions: number
  answeredQuestions: number
}

export interface ResultsData {
  calculatedResults: CalculatedResults
  metadata: {
    calculatedAt: string
    version: string
    algorithm: string
  }
}

// Interface pour les statistiques de résultats
export interface ResultsStats {
  totalResults: number
  completedResults: number
  partialResults: number
  averageCompletion: number
  politicalDistribution: {
    averageX: number
    averageY: number
    totalPositions: number
  }
  partyPopularity: Array<{
    party: string
    averageScore: number
    totalResponses: number
  }>
}

export class ResultsAPI {
  private supabase = createClient()

  /**
   * Valide et convertit les données de résultats depuis la base de données
   */
  private parseResultsData(data: any): ResultsData | null {
    try {
      // Vérifier la structure de base
      if (!data || typeof data !== 'object') {
        return null
      }

      // Valider la présence des champs requis
      if (!data.calculatedResults || typeof data.calculatedResults !== 'object') {
        return null
      }

      return data as ResultsData
    } catch (error) {
      console.error('Erreur lors du parsing des données de résultats:', error)
      return null
    }
  }

  /**
   * Sauvegarde les résultats calculés pour une session
   */
  async saveResults(
    sessionId: string, 
    resultsData: ResultsData, 
    completionStatus: 'partial' | 'completed' = 'partial'
  ) {
    const result: UserResultInsert = {
      session_id: sessionId,
      results_data: resultsData as unknown, // Cast nécessaire pour la compatibilité avec le type Json de Supabase
      political_position: resultsData.calculatedResults.politicalPosition || null,
      completion_status: completionStatus,
    }

    const { data, error } = await this.supabase
      .from('user_results')
      .upsert(result, { 
        onConflict: 'session_id',
        ignoreDuplicates: false 
      })
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la sauvegarde des résultats:', error)
      throw new Error(`Erreur lors de la sauvegarde des résultats: ${error.message}`)
    }

    return data
  }

  /**
   * Récupère les résultats pour une session
   */
  async getResults(sessionId: string): Promise<UserResult | null> {
    const { data, error } = await this.supabase
      .from('user_results')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Aucun résultat trouvé, ce n'est pas une erreur
        return null
      }
      console.error('Erreur lors de la récupération des résultats:', error)
      throw new Error(`Erreur lors de la récupération des résultats: ${error.message}`)
    }

    return data
  }

  /**
   * Récupère les données de résultats au format attendu par l'application
   */
  async getResultsData(sessionId: string): Promise<ResultsData | null> {
    const result = await this.getResults(sessionId)
    if (!result?.results_data) {
      return null
    }

    return this.parseResultsData(result.results_data)
  }

  /**
   * Met à jour le statut de complétion des résultats
   */
  async updateCompletionStatus(sessionId: string, status: 'partial' | 'completed') {
    const { data, error } = await this.supabase
      .from('user_results')
      .update({ completion_status: status, updated_at: new Date().toISOString() })
      .eq('session_id', sessionId)
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
      throw new Error(`Erreur lors de la mise à jour du statut: ${error.message}`)
    }

    return data
  }

  /**
   * Met à jour la position politique dans les résultats
   */
  async updatePoliticalPosition(sessionId: string, position: { x: number; y: number }) {
    const { data, error } = await this.supabase
      .from('user_results')
      .update({ 
        political_position: position,
        updated_at: new Date().toISOString() 
      })
      .eq('session_id', sessionId)
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la mise à jour de la position politique:', error)
      throw new Error(`Erreur lors de la mise à jour de la position politique: ${error.message}`)
    }

    return data
  }

  /**
   * Supprime les résultats d'une session
   */
  async deleteResults(sessionId: string) {
    const { error } = await this.supabase
      .from('user_results')
      .delete()
      .eq('session_id', sessionId)

    if (error) {
      console.error('Erreur lors de la suppression des résultats:', error)
      throw new Error(`Erreur lors de la suppression des résultats: ${error.message}`)
    }
  }

  /**
   * Vérifie si des résultats existent pour une session
   */
  async resultsExist(sessionId: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('user_results')
      .select('id')
      .eq('session_id', sessionId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return false
      }
      console.error('Erreur lors de la vérification des résultats:', error)
      return false
    }

    return !!data
  }

  /**
   * Récupère les statistiques sur les résultats (pour analytics)
   */
  async getResultsStats(): Promise<ResultsStats> {
    const { data, error } = await this.supabase
      .from('user_results')
      .select('results_data, political_position, completion_status, created_at')

    if (error) {
      console.error('Erreur lors de la récupération des statistiques des résultats:', error)
      throw new Error(`Erreur lors de la récupération des statistiques: ${error.message}`)
    }

    // Analyser les données pour créer des statistiques
    const stats: ResultsStats = {
      totalResults: data.length,
      completedResults: data.filter(r => r.completion_status === 'completed').length,
      partialResults: data.filter(r => r.completion_status === 'partial').length,
      averageCompletion: this.calculateAverageCompletion(data),
      politicalDistribution: this.analyzePoliticalDistribution(data),
      partyPopularity: this.analyzePartyPopularity(data)
    }

    return stats
  }

  /**
   * Calcule le pourcentage moyen de complétion des questionnaires
   */
  private calculateAverageCompletion(results: any[]): number {
    const completions = results
      .map(r => this.parseResultsData(r.results_data))
      .filter((rd): rd is ResultsData => rd !== null)
      .map(rd => rd.calculatedResults.completionPercentage)
      .filter(comp => typeof comp === 'number' && !isNaN(comp))

    if (completions.length === 0) return 0

    return completions.reduce((sum, comp) => sum + comp, 0) / completions.length
  }

  /**
   * Analyse la distribution politique des utilisateurs
   */
  private analyzePoliticalDistribution(results: any[]) {
    const positions = results
      .filter(r => r.political_position && typeof r.political_position === 'object')
      .map(r => r.political_position as { x: number; y: number })
      .filter(pos => typeof pos.x === 'number' && typeof pos.y === 'number' && !isNaN(pos.x) && !isNaN(pos.y))

    if (positions.length === 0) {
      return {
        averageX: 0,
        averageY: 0,
        totalPositions: 0
      }
    }

    const avgX = positions.reduce((sum, pos) => sum + pos.x, 0) / positions.length
    const avgY = positions.reduce((sum, pos) => sum + pos.y, 0) / positions.length

    return {
      averageX: avgX,
      averageY: avgY,
      totalPositions: positions.length
    }
  }

  /**
   * Analyse la popularité des partis politiques
   */
  private analyzePartyPopularity(results: any[]): Array<{
    party: string
    averageScore: number
    totalResponses: number
  }> {
    const partyScores: Record<string, number[]> = {}

    results.forEach(result => {
      const data = this.parseResultsData(result.results_data)
      if (data?.calculatedResults?.partyScores) {
        Object.entries(data.calculatedResults.partyScores).forEach(([party, score]) => {
          if (typeof score === 'number' && !isNaN(score)) {
            if (!partyScores[party]) {
              partyScores[party] = []
            }
            partyScores[party].push(score)
          }
        })
      }
    })

    // Calculer les moyennes et classements
    const partyAverages = Object.entries(partyScores).map(([party, scores]) => ({
      party,
      averageScore: scores.reduce((sum, score) => sum + score, 0) / scores.length,
      totalResponses: scores.length
    })).sort((a, b) => b.averageScore - a.averageScore)

    return partyAverages
  }

  /**
   * Récupère les résultats récents (pour monitoring)
   */
  async getRecentResults(limit: number = 10) {
    const { data, error } = await this.supabase
      .from('user_results')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Erreur lors de la récupération des résultats récents:', error)
      throw new Error(`Erreur lors de la récupération des résultats récents: ${error.message}`)
    }

    return data || []
  }
}

// Instance singleton pour utilisation dans l'application
export const resultsAPI = new ResultsAPI() 