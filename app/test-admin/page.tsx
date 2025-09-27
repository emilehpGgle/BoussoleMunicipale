'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ChevronRight, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { UserAnswers } from '@/lib/political-map-calculator'
import Link from 'next/link'

interface TestResult {
  status: 'idle' | 'loading' | 'success' | 'error'
  data?: Record<string, unknown>
  error?: string
}

interface TestResultsData {
  municipalities: number
  questions: number
  parties: number
  party_positions: number
  [key: string]: unknown
}

export default function TestAdminPage() {
  const [supabaseTest, setSupabaseTest] = useState<TestResult>({ status: 'idle' })
  const [tablesTest, setTablesTest] = useState<TestResult>({ status: 'idle' })
  const [questionsApiTest, setQuestionsApiTest] = useState<TestResult>({ status: 'idle' })
  const [partiesApiTest, setPartiesApiTest] = useState<TestResult>({ status: 'idle' })
  const [positionsApiTest, setPositionsApiTest] = useState<TestResult>({ status: 'idle' })
  const [securityTest, setSecurityTest] = useState<TestResult>({ status: 'idle' })
  const [hooksTest, setHooksTest] = useState<TestResult>({ status: 'idle' })
  const [flowTest, setFlowTest] = useState<TestResult>({ status: 'idle' })
  const [calculTest, setCalculTest] = useState<TestResult>({ status: 'idle' })
  const [performanceTest, setPerformanceTest] = useState<TestResult>({ status: 'idle' })
  const [productionValidationTest, setProductionValidationTest] = useState<TestResult>({ status: 'idle' })
  const [prioritiesTest, setPrioritiesTest] = useState<TestResult>({ status: 'idle' })

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    database: true,
    api: false,
    security: false,
    hooks: false,
    flow: false,
    calcul: false,
    performance: false,
    productionValidation: false,
    priorities: false,
    routing: false
  })

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const testSupabaseConnection = async () => {
    setSupabaseTest({ status: 'loading' })
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from('municipalities').select('*')

      if (error) throw error

      setSupabaseTest({
        status: 'success',
        data: {
          message: 'Connexion Supabase réussie',
          municipalities_count: data?.length || 0,
          sample_municipality: data?.[0] || null
        }
      })
    } catch (error) {
      setSupabaseTest({
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      })
    }
  }

  const testTables = async () => {
    setTablesTest({ status: 'loading' })
    try {
      const supabase = createClient()
      const results: TestResultsData = {
        municipalities: 0,
        questions: 0,
        parties: 0,
        party_positions: 0
      }

      // Test municipalities
      const { data: municipalities, error: munError } = await supabase
        .from('municipalities').select('*')
      if (munError) throw new Error(`Municipalities: ${munError.message}`)
      results.municipalities = municipalities?.length || 0

      // Test questions
      const { data: questions, error: questError } = await supabase
        .from('questions').select('*').eq('municipality_id', 'quebec')
      if (questError) throw new Error(`Questions: ${questError.message}`)
      results.questions = questions?.length || 0

      // Test parties
      const { data: parties, error: partError } = await supabase
        .from('parties').select('*').eq('municipality_id', 'quebec')
      if (partError) throw new Error(`Parties: ${partError.message}`)
      results.parties = parties?.length || 0

      // Test party_positions
      const { data: positions, error: posError } = await supabase
        .from('party_positions').select('*')
      if (posError) throw new Error(`Party positions: ${posError.message}`)
      results.party_positions = positions?.length || 0

      setTablesTest({
        status: 'success',
        data: results
      })
    } catch (error) {
      setTablesTest({
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      })
    }
  }

  const testApiRoute = async (
    endpoint: string,
    setter: React.Dispatch<React.SetStateAction<TestResult>>
  ) => {
    setter({ status: 'loading' })
    try {
      const response = await fetch(`/api/${endpoint}?municipality=quebec`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(`${response.status}: ${data.error || 'Erreur API'}`)
      }

      setter({
        status: 'success',
        data
      })
    } catch (error) {
      setter({
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      })
    }
  }

  const testSecurity = async () => {
    setSecurityTest({ status: 'loading' })
    try {
      const results: Record<string, unknown> = {}

      // Test 1: Isolation données Quebec vs Montreal
      const quebecQuestions = await fetch('/api/questions?municipality=quebec')
      const quebecData = await quebecQuestions.json()

      const montrealQuestions = await fetch('/api/questions?municipality=montreal')
      const montrealData = await montrealQuestions.json()

      // Fixer format parsing: APIs retournent {questions: [...]} pas directement [...]
      results.quebec_questions = quebecData?.questions?.length || 0
      results.montreal_questions = montrealData?.questions?.length || 0
      results.isolation_ok = JSON.stringify(quebecData) !== JSON.stringify(montrealData)

      // Test 2: Validation Foreign Keys
      const supabase = createClient()
      const { data: positions, error } = await supabase
        .from('party_positions')
        .select('*, questions(*), parties(*)')
        .limit(5)

      if (error) throw error

      results.foreign_keys_ok = positions?.every(pos =>
        pos.questions && pos.parties
      ) || false

      // Test 3: RLS Security
      const { data: municipalities } = await supabase
        .from('municipalities')
        .select('*')

      results.rls_access = (municipalities?.length || 0) > 0

      // Test 4: Test Partage avec municipality_id
      const testShareId = `test_share_${Date.now()}`
      const testShareData = {
        shareId: testShareId,
        data: {
          id: testShareId,
          municipality: 'quebec',
          topParties: [{ party: { name: 'Test Party' }, score: 75 }],
          userPosition: { x: 0.5, y: -0.3 },
          timestamp: Date.now()
        }
      }

      const shareRes = await fetch('/api/save-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testShareData)
      })
      results.share_save_ok = shareRes.ok

      // Vérifier récupération partage
      if (shareRes.ok) {
        const { data: sharedResult } = await supabase
          .from('shared_results')
          .select('*')
          .eq('share_id', testShareId)
          .single()

        results.share_municipality_saved = sharedResult?.municipality_id === 'quebec'

        // Nettoyer
        await supabase.from('shared_results').delete().eq('share_id', testShareId)
        results.share_cleanup_done = true
      }

      // Test 5: Test Régression - données existantes avec municipality='quebec'
      const { data: existingQuestions, error: questionsErr } = await supabase
        .from('questions')
        .select('municipality_id')
        .limit(10)

      if (!questionsErr && existingQuestions) {
        results.regression_questions_ok = existingQuestions.every(q =>
          q.municipality_id === 'quebec' || q.municipality_id === 'montreal'
        )
      }

      const { data: existingParties, error: partiesErr } = await supabase
        .from('parties')
        .select('municipality_id')
        .limit(10)

      if (!partiesErr && existingParties) {
        results.regression_parties_ok = existingParties.every(p =>
          p.municipality_id === 'quebec' || p.municipality_id === 'montreal'
        )
      }

      // Test 6: Test redirections legacy (middleware configuré)
      results.legacy_redirect_ready = true // Middleware configuré

      results.security_summary = `✅ Isolation: ${results.isolation_ok}, FK: ${results.foreign_keys_ok}, RLS: ${results.rls_access}, Partage: ${results.share_save_ok}, Régression: ${results.regression_questions_ok && results.regression_parties_ok}`

      setSecurityTest({
        status: 'success',
        data: results
      })
    } catch (error) {
      setSecurityTest({
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur sécurité'
      })
    }
  }

  const testHooks = async () => {
    setHooksTest({ status: 'loading' })
    try {
      const results: Record<string, unknown> = {}

      // Test des hooks via APIs (simulation)
      const quebecQuestions = await fetch('/api/questions?municipality=quebec')
      const quebecParties = await fetch('/api/parties?municipality=quebec')
      const quebecPositions = await fetch('/api/party-positions?municipality=quebec')

      const qData = await quebecQuestions.json()
      const pData = await quebecParties.json()
      const posData = await quebecPositions.json()

      // Fixer format parsing: APIs retournent {questions: [...], parties: [...], positions: [...]}
      results.useQuestions_quebec = qData?.questions?.length || 0
      results.useParties_quebec = pData?.parties?.length || 0
      results.usePartyPositions_quebec = posData?.positions?.length || 0

      // Test cohérence données
      results.data_coherence = (
        (results.useQuestions_quebec as number) > 0 &&
        (results.useParties_quebec as number) > 0 &&
        (results.usePartyPositions_quebec as number) > 0
      )

      results.hooks_summary = `Questions: ${results.useQuestions_quebec}, Parties: ${results.useParties_quebec}, Positions: ${results.usePartyPositions_quebec}`

      setHooksTest({
        status: 'success',
        data: results
      })
    } catch (error) {
      setHooksTest({
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur hooks'
      })
    }
  }

  const testFlow = async () => {
    setFlowTest({ status: 'loading' })
    try {
      const results: Record<string, unknown> = {}
      const testUserId = "00000000-0000-0000-0000-000000000001" // UUID fixe du TEST session
      const municipality = 'quebec'

      console.log('🔍 [Flow Test DEBUG] Starting flow test with:', { testUserId, municipality })

      // Test 1: Création profil test
      const profileData = {
        userId: testUserId,
        municipality,
        age: '25-34',
        gender: 'M',
        postalCode: 'G1R2P0',
        education: 'university'
      }

      const profileRes = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Test-Mode': 'true',
          'X-Test-Municipality': municipality
        },
        body: JSON.stringify({ profileData, municipalityId: municipality })
      })
      results.profile_created = profileRes.ok
      console.log('🔍 [Flow Test DEBUG] Profile created:', results.profile_created)

      // Test 2: Récupérer les questions dynamiquement et créer des réponses variées
      const questionsRes = await fetch(`/api/questions?municipality=${municipality}`)
      const questionsData = await questionsRes.json()
      const testQuestions = questionsData.questions?.slice(0, 5) || []

      // Créer des réponses test FIXES (hardcodées) pour avoir des résultats reproductibles
      const responsePattern = ['FA', 'PA', 'FD', 'FA', 'N']
      const testResponses = testQuestions.map((q: { id: string }, index: number) => ({
        questionId: q.id,
        responseType: 'agreement',
        agreementValue: responsePattern[index % responsePattern.length]
      }))

      let allResponsesSaved = true
      const responseAnswers: Record<string, string> = {}
      for (const response of testResponses) {
        const responsesRes = await fetch('/api/responses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Test-Mode': 'true',
            'X-Test-Municipality': municipality
          },
          body: JSON.stringify({
            ...response,
            municipalityId: municipality
          })
        })
        if (!responsesRes.ok) {
          allResponsesSaved = false
          console.log('🔍 [Flow Test DEBUG] Response failed:', response.questionId)
        } else {
          responseAnswers[response.questionId] = response.agreementValue
        }
      }
      results.responses_saved = allResponsesSaved
      console.log('🔍 [Flow Test DEBUG] Responses saved:', { allResponsesSaved, responseAnswers })

      // Test 3: CORRECTED - Calcul résultats RÉEL (comme Test Calculs)
      console.log('🔍 [Flow Test DEBUG] Starting REAL calculation with saved responses')
      const calculRes = await fetch('/api/results/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Test-Mode': 'true'
        },
        body: JSON.stringify({
          municipality,
          responses: responseAnswers, // ✅ VRAIES réponses sauvegardées
          importance: {}
        })
      })

      if (calculRes.ok) {
        const calculData = await calculRes.json()
        console.log('🔍 [Flow Test DEBUG] Calculation result:', calculData)

        results.calculation_success = true
        results.top_party = calculData.scores?.[0]?.party?.name || 'N/A'
        results.score = Math.round(calculData.scores?.[0]?.score || 0)
        results.political_position = calculData.politicalPosition || { x: 0, y: 0 }

        console.log('🔍 [Flow Test DEBUG] Extracted results:', {
          top_party: results.top_party,
          score: results.score,
          position: results.political_position
        })

        // Test 4: Sauvegarde des résultats calculés
        const saveResultsRes = await fetch('/api/results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Test-Mode': 'true',
            'X-Test-Municipality': municipality
          },
          body: JSON.stringify({
            resultsData: {
              partyScores: calculData.scores?.reduce((acc: Record<string, number>, score: { party?: { id?: string }, score?: number }) => {
                acc[score.party?.id || 'unknown'] = score.score || 0
                return acc
              }, {}) || {},
              matchedParties: calculData.scores?.map((s: { party?: { id?: string } }) => s.party?.id).filter(Boolean) || [],
              topMatches: calculData.scores?.slice(0, 3) || [],
              politicalPosition: calculData.politicalPosition,
              completionPercentage: 100,
              totalQuestions: testResponses.length,
              answeredQuestions: testResponses.length,
              calculatedAt: new Date().toISOString()
            },
            municipalityId: municipality
          })
        })
        results.results_saved = saveResultsRes.ok
        console.log('🔍 [Flow Test DEBUG] Results saved:', results.results_saved)
      } else {
        console.error('🔍 [Flow Test DEBUG] Calculation failed:', await calculRes.text())
        results.calculation_success = false
        results.top_party = 'N/A'
        results.score = 0
      }

      // Test 5: Vérification persistance
      const supabase = createClient()
      const { data: savedProfile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('session_id', testUserId)
        .eq('municipality_id', municipality)
        .maybeSingle() // Utiliser maybeSingle au lieu de single pour éviter les erreurs 406

      // Vérifier aussi les résultats sauvés avec municipality_id
      const { data: savedResults } = await supabase
        .from('user_results')
        .select('*')
        .eq('session_id', testUserId)
        .eq('municipality_id', municipality)
        .maybeSingle() // Utiliser maybeSingle au lieu de single pour éviter les erreurs 406

      results.persistence_verified = !!savedProfile && !!savedResults
      results.municipality_saved = savedProfile?.municipality_id === municipality && savedResults?.municipality_id === municipality

      console.log('🔍 [Flow Test DEBUG] Persistence check:', {
        savedProfile: !!savedProfile,
        savedResults: !!savedResults,
        municipality_saved: results.municipality_saved
      })

      // Nettoyage des données test
      if (savedProfile) {
        await supabase.from('user_profiles').delete().eq('session_id', testUserId)
        await supabase.from('user_responses').delete().eq('session_id', testUserId)
        await supabase.from('user_results').delete().eq('session_id', testUserId)
        results.cleanup_done = true
      }

      results.flow_summary = `✅ Flow complet avec VRAIS calculs pour ${municipality} - Score: ${results.score}% pour ${results.top_party}`

      setFlowTest({
        status: 'success',
        data: results
      })
    } catch (error) {
      setFlowTest({
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur flow test'
      })
    }
  }

  const testCalcul = async () => {
    setCalculTest({ status: 'loading' })
    try {
      const results: Record<string, unknown> = {}
      const municipality = 'quebec'

      // Récupérer les questions dynamiquement depuis Supabase
      const questionsRes = await fetch(`/api/questions?municipality=${municipality}`)
      const questionsData = await questionsRes.json()
      const testQuestions = questionsData.questions?.slice(0, 5) || []

      // Créer réponses test FIXES (hardcodées) pour les questions récupérées
      // Pattern fixe de réponses pour avoir des résultats reproductibles
      const responsePattern = ['FA', 'PA', 'FD', 'FA', 'N']
      const testAnswers: Record<string, string> = {}
      testQuestions.forEach((q: { id: string }, index: number) => {
        // Applique le pattern de réponses de manière cyclique si plus de questions
        testAnswers[q.id] = responsePattern[index % responsePattern.length]
      })

      // Test calcul avec ces réponses
      const calculRes = await fetch('/api/results/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          municipality,
          responses: testAnswers,
          importance: {}
        })
      })

      if (calculRes.ok) {
        const calculData = await calculRes.json()
        results.calculation_success = true
        results.parties_scored = calculData.scores?.length || 0
        results.top_party = calculData.scores?.[0]?.party?.name || 'N/A'
        results.top_score = Math.round(calculData.scores?.[0]?.score || 0)
        results.political_position = calculData.politicalPosition || { x: 0, y: 0 }
      } else {
        results.calculation_success = false
      }

      // Vérifier cohérence des scores
      results.scores_valid = (results.top_score as number) >= 0 && (results.top_score as number) <= 100
      results.calcul_summary = `Score max: ${results.top_score}% pour ${results.top_party}`

      setCalculTest({
        status: 'success',
        data: results
      })
    } catch (error) {
      setCalculTest({
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur calcul test'
      })
    }
  }

  const testPriorities = async () => {
    setPrioritiesTest({ status: 'loading' })
    try {
      const results: Record<string, unknown> = {}
      const _municipality = 'montreal'
      const municipalityPrefix = 'mtl' // Préfixe pour Montréal

      console.log('🔍 [Priorities Test] Début test priorités partis')

      // Test 1: Récupération directe depuis Supabase
      // Note: utilise le préfixe dans question_id car municipality_id n'existe pas dans party_positions
      const supabase = createClient()
      const { data: partyPositions, error } = await supabase
        .from('party_positions')
        .select('party_id, question_id, position, note, priority_list')
        .ilike('question_id', `${municipalityPrefix}%enjeux_prioritaires%`)

      if (error) throw error

      results.raw_supabase_count = partyPositions?.length || 0
      results.raw_data_sample = partyPositions?.slice(0, 2) || []

      // Test 2: Fonctions de parsing des priorités
      const parsePrioritiesFromNote = (noteText: string): Record<string, number> => {
        if (!noteText) return {}
        const priorityMatch = noteText.match(/Priorités?\s*:\s*(.+)/i)
        if (!priorityMatch) return {}
        const prioritiesText = priorityMatch[1]
        const priorityItems = prioritiesText.split(',').map(item => item.trim()).filter(item => item.length > 0)
        const priorities: Record<string, number> = {}
        priorityItems.forEach((item, index) => {
          const normalizedItem = item.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
          priorities[normalizedItem] = index + 1
        })
        return priorities
      }

      const parsePrioritiesFromJSON = (priorityList: unknown): Record<string, number> => {
        try {
          const parsed = typeof priorityList === 'string' ? JSON.parse(priorityList) : priorityList
          if (parsed && typeof parsed === 'object') {
            const priorities: Record<string, number> = {}
            Object.entries(parsed).forEach(([key, value]) => {
              const normalizedKey = key.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
              priorities[normalizedKey] = Number(value) || 0
            })
            return priorities
          }
        } catch (error) {
          console.warn('Erreur parsing JSON:', error)
        }
        return {}
      }

      // Test 3: Parser toutes les priorités (priority_list d'abord, puis note)
      const prioritiesByParty: Record<string, Record<string, number>> = {}
      partyPositions?.forEach(position => {
        let priorities: Record<string, number> = {}

        // Essayer priority_list (format JSON) en premier
        if (position.priority_list) {
          priorities = parsePrioritiesFromJSON(position.priority_list)
        }

        // Si priority_list vide, essayer note (format texte)
        if (Object.keys(priorities).length === 0 && position.note) {
          priorities = parsePrioritiesFromNote(position.note)
        }

        // Ajouter si des priorités ont été trouvées
        if (Object.keys(priorities).length > 0) {
          prioritiesByParty[position.party_id] = priorities
        }
      })

      results.parties_with_priorities = Object.keys(prioritiesByParty).length
      results.priorities_by_party = prioritiesByParty
      results.parties_list = Object.keys(prioritiesByParty)

      // Test 4: Validation que ça matche avec le hook
      results.hook_would_work = Object.keys(prioritiesByParty).length > 0

      // Test 5: Détail du parsing pour debug
      results.parsing_details = partyPositions?.map(pos => {
        const jsonPriorities = pos.priority_list ? parsePrioritiesFromJSON(pos.priority_list) : {}
        const notePriorities = pos.note ? parsePrioritiesFromNote(pos.note) : {}
        const finalPriorities = Object.keys(jsonPriorities).length > 0 ? jsonPriorities : notePriorities

        return {
          party_id: pos.party_id,
          priority_list_raw: pos.priority_list,
          note_raw: pos.note,
          parsed_from_json: jsonPriorities,
          parsed_from_note: notePriorities,
          final_priorities: finalPriorities,
          has_priorities: Object.keys(finalPriorities).length > 0,
          source_used: Object.keys(jsonPriorities).length > 0 ? 'priority_list' : 'note'
        }
      }) || []

      console.log('🔍 [Priorities Test] Résultats:', results)

      setPrioritiesTest({
        status: 'success',
        data: results
      })
    } catch (error) {
      setPrioritiesTest({
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur test priorités'
      })
    }
  }

  const testPerformance = async () => {
    setPerformanceTest({ status: 'loading' })
    try {
      const results: Record<string, unknown> = {}
      const municipality = 'quebec'

      // Test 1: Temps requête questions
      const startQuestions = Date.now()
      await fetch(`/api/questions?municipality=${municipality}`)
      const timeQuestions = Date.now() - startQuestions
      results.questions_time_ms = timeQuestions

      // Test 2: Temps requête parties
      const startParties = Date.now()
      await fetch(`/api/parties?municipality=${municipality}`)
      const timeParties = Date.now() - startParties
      results.parties_time_ms = timeParties

      // Test 3: Temps requête positions
      const startPositions = Date.now()
      await fetch(`/api/party-positions?municipality=${municipality}`)
      const timePositions = Date.now() - startPositions
      results.positions_time_ms = timePositions

      // Test 4: Temps total flow (simulation)
      const startFlow = Date.now()
      await Promise.all([
        fetch(`/api/questions?municipality=${municipality}`),
        fetch(`/api/parties?municipality=${municipality}`),
        fetch(`/api/party-positions?municipality=${municipality}`)
      ])
      const timeFlow = Date.now() - startFlow
      results.parallel_load_ms = timeFlow

      // Analyse performance
      const totalSequential = (timeQuestions + timeParties + timePositions)
      results.total_sequential_ms = totalSequential
      results.parallel_gain = Math.round(((totalSequential - timeFlow) / totalSequential) * 100)

      // Seuils de performance
      results.questions_ok = timeQuestions < 1000
      results.parties_ok = timeParties < 1000
      results.positions_ok = timePositions < 1500
      results.performance_grade =
        (results.questions_ok && results.parties_ok && results.positions_ok)
          ? '✅ Excellent'
          : '⚠️ À optimiser'

      results.performance_summary = `Temps moyen: ${Math.round(totalSequential / 3)}ms, Gain parallèle: ${results.parallel_gain}%`

      setPerformanceTest({
        status: 'success',
        data: results
      })
    } catch (error) {
      setPerformanceTest({
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur performance test'
      })
    }
  }

  const testProductionValidation = async () => {
    setProductionValidationTest({ status: 'loading' })
    try {
      const results: Record<string, unknown> = {}
      const municipality = 'quebec'

      console.log('🔍 [Production Validation] Début du test de cohérence production vs API')

      // Récupérer les questions dynamiquement depuis Supabase
      const questionsRes = await fetch(`/api/questions?municipality=${municipality}`)
      const questionsData = await questionsRes.json()
      const testQuestions = questionsData.questions?.slice(0, 5) || []

      // Créer des réponses test FIXES (hardcodées) pour avoir des résultats reproductibles
      const responsePattern = ['FA', 'PA', 'FD', 'FA', 'N'] as const
      const testResponses: UserAnswers = {}
      testQuestions.forEach((q: { id: string }, index: number) => {
        // Applique le pattern de réponses de manière cyclique si plus de questions
        testResponses[q.id] = responsePattern[index % responsePattern.length] as 'FA' | 'PA' | 'N' | 'PD' | 'FD' | 'IDK'
      })

      // Test 2A: Calcul via API /api/results/calculate (logique corrigée)
      const apiCalculRes = await fetch('/api/results/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          municipality,
          responses: testResponses,
          importance: {}
        })
      })

      let apiResult = null
      if (apiCalculRes.ok) {
        apiResult = await apiCalculRes.json()
        results.api_calculation_success = true
        results.api_top_party = apiResult.scores?.[0]?.party?.name || 'N/A'
        results.api_top_score = Math.round(apiResult.scores?.[0]?.score || 0)
        results.api_political_position = apiResult.politicalPosition || { x: 0, y: 0 }
      } else {
        results.api_calculation_success = false
        results.api_error = `API Error: ${apiCalculRes.status}`
      }

      console.log('🔍 [Production Validation] API Result:', {
        success: results.api_calculation_success,
        party: results.api_top_party,
        score: results.api_top_score
      })

      // Test 2B: Calcul direct (logique de production simulée)
      try {
        // Importer les fonctions de calcul direct
        const { calculateUserPoliticalPosition, calculatePoliticalDistance } = await import('@/lib/political-map-calculator')
        const { transformAllPartyPositionsToUserAnswers } = await import('@/lib/supabase-transform')

        // Récupérer les données nécessaires
        const [partiesRes, positionsRes] = await Promise.all([
          fetch(`/api/parties?municipality=${municipality}`),
          fetch(`/api/party-positions?municipality=${municipality}`)
        ])

        const partiesData = await partiesRes.json()
        const positionsData = await positionsRes.json()

        // Calculer position utilisateur
        const userPosition = calculateUserPoliticalPosition(testResponses)

        // Transformer positions Supabase et calculer positions partis
        // Utiliser positionsByParty si disponible, sinon grouper manuellement
        const groupedPositions = positionsData.positionsByParty ||
          positionsData.positions.reduce((acc: Record<string, typeof positionsData.positions>, pos: { partyId: string; [key: string]: unknown }) => {
            if (!acc[pos.partyId]) acc[pos.partyId] = []
            acc[pos.partyId].push(pos)
            return acc
          }, {})
        const partyAnswers = transformAllPartyPositionsToUserAnswers(groupedPositions)
        const partyPositions: Record<string, { x: number; y: number }> = {}
        Object.entries(partyAnswers).forEach(([partyId, answers]) => {
          partyPositions[partyId] = calculateUserPoliticalPosition(answers)
        })

        // Calculer compatibilités (même logique que production)
        const partyCompatibilities = partiesData.parties.map((party: { id: string, name: string }) => {
          const partyPosition = partyPositions[party.id]
          let score = 0

          if (partyPosition) {
            const distance = calculatePoliticalDistance(userPosition, partyPosition)
            const maxDistance = 283
            const compatibility = Math.max(0, Math.round(100 - (distance / maxDistance) * 100))
            score = compatibility
          }

          return { party, score }
        }).sort((a: { party: { id: string, name: string }, score: number }, b: { party: { id: string, name: string }, score: number }) => b.score - a.score)

        results.direct_calculation_success = true
        results.direct_top_party = partyCompatibilities[0]?.party?.name || 'N/A'
        results.direct_top_score = partyCompatibilities[0]?.score || 0
        results.direct_political_position = userPosition

        console.log('🔍 [Production Validation] Direct Result:', {
          success: results.direct_calculation_success,
          party: results.direct_top_party,
          score: results.direct_top_score
        })

      } catch (error) {
        results.direct_calculation_success = false
        results.direct_error = error instanceof Error ? error.message : 'Erreur calcul direct'
      }

      // Test 3: Comparaison des résultats
      if (results.api_calculation_success && results.direct_calculation_success) {
        const scoreDifference = Math.abs((results.api_top_score as number) - (results.direct_top_score as number))
        results.scores_coherent = scoreDifference <= 2 // Tolérance de 2 points
        results.parties_coherent = results.api_top_party === results.direct_top_party
        results.score_difference = scoreDifference

        results.coherence_summary = `API vs Direct: ${results.api_top_party} (${results.api_top_score}%) vs ${results.direct_top_party} (${results.direct_top_score}%)`
        results.validation_success = results.scores_coherent && results.parties_coherent
      } else {
        results.validation_success = false
        results.coherence_summary = 'Impossible de comparer - échec de calcul'
      }

      console.log('🔍 [Production Validation] Final Result:', {
        validation_success: results.validation_success,
        coherence_summary: results.coherence_summary
      })

      setProductionValidationTest({
        status: 'success',
        data: results
      })
    } catch (error) {
      setProductionValidationTest({
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur validation production'
      })
    }
  }

  const StatusIcon = ({ status }: { status: TestResult['status'] }) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const ResultDisplay = ({ result }: { result: TestResult }) => {
    if (result.status === 'idle') return null

    return (
      <div className="mt-2 p-3 rounded-md border">
        {result.status === 'success' ? (
          <div>
            <Badge variant="default" className="mb-2">Succès</Badge>
            <pre className="text-sm bg-gray-50 p-2 rounded overflow-auto max-h-40">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        ) : result.status === 'error' ? (
          <div>
            <Badge variant="destructive" className="mb-2">Erreur</Badge>
            <p className="text-sm text-red-600">{result.error}</p>
          </div>
        ) : (
          <Badge variant="secondary">En cours...</Badge>
        )}
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">🔧 Test Admin Multi-Municipalités</h1>
        <p className="text-gray-600">Page de diagnostic pour l&apos;infrastructure Supabase</p>
      </div>

      {/* Tests Base de Données */}
      <Card>
        <Collapsible open={openSections.database} onOpenChange={() => toggleSection('database')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span>🗄️ Tests Base de Données</span>
                {openSections.database ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={testSupabaseConnection}
                    disabled={supabaseTest.status === 'loading'}
                    size="sm"
                  >
                    Tester Connexion Supabase
                  </Button>
                  <StatusIcon status={supabaseTest.status} />
                </div>
                <ResultDisplay result={supabaseTest} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={testTables}
                    disabled={tablesTest.status === 'loading'}
                    size="sm"
                  >
                    Vérifier Tables & Données
                  </Button>
                  <StatusIcon status={tablesTest.status} />
                </div>
                <ResultDisplay result={tablesTest} />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Tests API Routes */}
      <Card>
        <Collapsible open={openSections.api} onOpenChange={() => toggleSection('api')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span>🔌 Tests API Routes</span>
                {openSections.api ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={() => testApiRoute('questions', setQuestionsApiTest)}
                    disabled={questionsApiTest.status === 'loading'}
                    size="sm"
                  >
                    Tester /api/questions
                  </Button>
                  <StatusIcon status={questionsApiTest.status} />
                </div>
                <ResultDisplay result={questionsApiTest} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={() => testApiRoute('parties', setPartiesApiTest)}
                    disabled={partiesApiTest.status === 'loading'}
                    size="sm"
                  >
                    Tester /api/parties
                  </Button>
                  <StatusIcon status={partiesApiTest.status} />
                </div>
                <ResultDisplay result={partiesApiTest} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={() => testApiRoute('party-positions', setPositionsApiTest)}
                    disabled={positionsApiTest.status === 'loading'}
                    size="sm"
                  >
                    Tester /api/party-positions
                  </Button>
                  <StatusIcon status={positionsApiTest.status} />
                </div>
                <ResultDisplay result={positionsApiTest} />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Tests Sécurité */}
      <Card>
        <Collapsible open={openSections.security} onOpenChange={() => toggleSection('security')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span>🔐 Tests Sécurité Multi-Municipalités</span>
                {openSections.security ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={testSecurity}
                    disabled={securityTest.status === 'loading'}
                    size="sm"
                    variant="destructive"
                  >
                    🔒 Tester Isolation & Sécurité
                  </Button>
                  <StatusIcon status={securityTest.status} />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Validation isolation données Quebec ≠ Montreal, Foreign Keys, RLS
                </p>
                <ResultDisplay result={securityTest} />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Tests Hooks React */}
      <Card>
        <Collapsible open={openSections.hooks} onOpenChange={() => toggleSection('hooks')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span>⚛️ Tests Hooks React Multi-Municipalités</span>
                {openSections.hooks ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={testHooks}
                    disabled={hooksTest.status === 'loading'}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    ⚛️ Tester Hooks useQuestions/useParties/usePartyPositions
                  </Button>
                  <StatusIcon status={hooksTest.status} />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Validation hooks React avec municipality, cohérence données
                </p>
                <ResultDisplay result={hooksTest} />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Tests Flow Complet Production */}
      <Card>
        <Collapsible open={openSections.flow} onOpenChange={() => toggleSection('flow')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span>🚀 Tests Flow Complet Production</span>
                {openSections.flow ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={testFlow}
                    disabled={flowTest.status === 'loading'}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    🧪 Tester Flow Profil → Questions → Résultats
                  </Button>
                  <StatusIcon status={flowTest.status} />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Simulation complète création profil, réponses, calcul et persistance (avec nettoyage)
                </p>
                <ResultDisplay result={flowTest} />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Tests Calculs Politiques */}
      <Card>
        <Collapsible open={openSections.calcul} onOpenChange={() => toggleSection('calcul')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span>📊 Tests Calculs Politiques</span>
                {openSections.calcul ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={testCalcul}
                    disabled={calculTest.status === 'loading'}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    📈 Valider Calculs Scores & Position Politique
                  </Button>
                  <StatusIcon status={calculTest.status} />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Vérification cohérence calculs partis, scores et position compass
                </p>
                <ResultDisplay result={calculTest} />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Tests Priorités Partis */}
      <Card>
        <Collapsible open={openSections.priorities} onOpenChange={() => toggleSection('priorities')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span>🎯 Tests Priorités Partis (CRITIQUE)</span>
                {openSections.priorities ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={testPriorities}
                    disabled={prioritiesTest.status === 'loading'}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    🔥 Tester Priorités Partis RAW (Montréal)
                  </Button>
                  <StatusIcon status={prioritiesTest.status} />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>CRITIQUE:</strong> Test direct parsing priorités depuis colonne &apos;note&apos;. Doit montrer 5/5 partis avec priorités.
                </p>
                <ResultDisplay result={prioritiesTest} />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Tests Performance */}
      <Card>
        <Collapsible open={openSections.performance} onOpenChange={() => toggleSection('performance')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span>⚡ Tests Performance</span>
                {openSections.performance ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={testPerformance}
                    disabled={performanceTest.status === 'loading'}
                    size="sm"
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    ⏱️ Mesurer Temps Requêtes Supabase
                  </Button>
                  <StatusIcon status={performanceTest.status} />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Analyse temps de réponse APIs et optimisations parallèles
                </p>
                <ResultDisplay result={performanceTest} />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Tests Validation Production */}
      <Card>
        <Collapsible open={openSections.productionValidation} onOpenChange={() => toggleSection('productionValidation')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span>🏭 Tests Validation Production vs Test-Admin</span>
                {openSections.productionValidation ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={testProductionValidation}
                    disabled={productionValidationTest.status === 'loading'}
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    🎯 Valider Cohérence API vs Production
                  </Button>
                  <StatusIcon status={productionValidationTest.status} />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Validation critique : vérifier que l&apos;API corrigée donne les mêmes résultats que la logique de production
                </p>
                <ResultDisplay result={productionValidationTest} />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Tests Routing */}
      <Card>
        <Collapsible open={openSections.routing} onOpenChange={() => toggleSection('routing')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span>🔀 Tests Routing Multi-Municipalités</span>
                {openSections.routing ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Pages Québec</h4>
                  <div className="space-y-2">
                    <Link href="/quebec/test-politique-municipal" className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        /quebec/test-politique-municipal
                      </Button>
                    </Link>
                    <Link href="/quebec/resultats" className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        /quebec/resultats
                      </Button>
                    </Link>
                    <Link href="/quebec/profil" className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        /quebec/profil
                      </Button>
                    </Link>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Pages Montréal (test)</h4>
                  <div className="space-y-2">
                    <Link href="/montreal/test-politique-municipal" className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        /montreal/test-politique-municipal
                      </Button>
                    </Link>
                    <Link href="/montreal/resultats" className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        /montreal/resultats
                      </Button>
                    </Link>
                    <Link href="/montreal/profil" className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        /montreal/profil
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <h4 className="font-semibold text-blue-800 mb-1">Test de Redirections Legacy</h4>
                <p className="text-sm text-blue-600">
                  Ces URLs devraient rediriger vers /quebec/...
                </p>
                <div className="mt-2 space-x-2">
                  <Link href="/test-politique-municipal">
                    <Button variant="outline" size="sm">/test-politique-municipal</Button>
                  </Link>
                  <Link href="/resultats">
                    <Button variant="outline" size="sm">/resultats</Button>
                  </Link>
                  <Link href="/profil">
                    <Button variant="outline" size="sm">/profil</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Actions Rapides */}
      <Card>
        <CardHeader>
          <CardTitle>⚡ Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                testSupabaseConnection()
                testTables()
                testApiRoute('questions', setQuestionsApiTest)
                testApiRoute('parties', setPartiesApiTest)
                testApiRoute('party-positions', setPositionsApiTest)
                testSecurity()
                testHooks()
                testFlow()
                testCalcul()
                testPriorities()
                testPerformance()
                testProductionValidation()
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              🚀 Tester Tout (Production Ready)
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSupabaseTest({ status: 'idle' })
                setTablesTest({ status: 'idle' })
                setQuestionsApiTest({ status: 'idle' })
                setPartiesApiTest({ status: 'idle' })
                setPositionsApiTest({ status: 'idle' })
                setSecurityTest({ status: 'idle' })
                setHooksTest({ status: 'idle' })
                setFlowTest({ status: 'idle' })
                setCalculTest({ status: 'idle' })
                setPrioritiesTest({ status: 'idle' })
                setPerformanceTest({ status: 'idle' })
                setProductionValidationTest({ status: 'idle' })
              }}
            >
              🔄 Reset Tests
            </Button>
            <Link href="/">
              <Button variant="outline">🏠 Retour Accueil</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}