import { useState, useEffect } from 'react'
import { Question } from '@/lib/boussole-data'

interface QuestionsResponse {
  questions: Question[]
  count: number
  municipality: string
  municipalityName: string
}

interface UseQuestionsReturn {
  questions: Question[]
  isLoading: boolean
  error: string | null
  municipalityName: string | null
  count: number
  refetch: () => Promise<void>
}

/**
 * Hook pour récupérer les questions depuis Supabase par municipalité
 * @param municipalityId ID de la municipalité (ex: 'quebec', 'montreal')
 * @returns Questions, état de chargement, erreurs
 */
export function useQuestions(municipalityId: string): UseQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [municipalityName, setMunicipalityName] = useState<string | null>(null)
  const [count, setCount] = useState(0)

  const fetchQuestions = async () => {
    if (!municipalityId) {
      setError('Municipality ID is required')
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/questions?municipality=${encodeURIComponent(municipalityId)}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const data: QuestionsResponse = await response.json()

      // Transformer les données pour correspondre à l'interface Question
      const transformedQuestions: Question[] = data.questions.map(q => ({
        id: q.id,
        text: q.text,
        category: q.category,
        responseType: q.responseType as "agreement" | "importance_direct" | "priority_ranking",
        description: q.description,
        responseFormat: q.responseFormat as "standard" | "priority" | "frequency" | "financing",
        agreementOptions: q.agreementOptions,
        importanceOptions: q.importanceOptions,
        importanceDirectOptions: q.importanceDirectOptions,
        priorityOptions: q.priorityOptions,
        customAgreementLabels: q.customAgreementLabels,
        customImportanceDirectLabels: q.customImportanceDirectLabels
      }))

      setQuestions(transformedQuestions)
      setMunicipalityName(data.municipalityName)
      setCount(data.count)

      console.log(`✅ [useQuestions] ${data.count} questions chargées pour ${municipalityId}`)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      console.error(`❌ [useQuestions] Erreur pour ${municipalityId}:`, errorMessage)
      setError(errorMessage)
      setQuestions([])
      setMunicipalityName(null)
      setCount(0)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [municipalityId])

  return {
    questions,
    isLoading,
    error,
    municipalityName,
    count,
    refetch: fetchQuestions
  }
}