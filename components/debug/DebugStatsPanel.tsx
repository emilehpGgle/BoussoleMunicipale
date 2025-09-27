import React from 'react'

interface CalculDebugData {
  municipality: string
  totalUserResponses: number
  partiesCount: number
  positionsCount: number
  prioritiesCount: number
  globalStats: {
    avgPoliticalScore: number
    avgPriorityScore: number
    avgFinalScore: number
  }
  validationErrors: string[]
}

interface DebugStatsPanelProps {
  debugData: CalculDebugData | null
  isCalculating: boolean
}

export function DebugStatsPanel({ debugData, isCalculating }: DebugStatsPanelProps) {
  if (!debugData) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Statistiques de calcul</h3>
        <div className="text-center py-8 text-gray-500">
          {isCalculating ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
              <p>Calcul en cours...</p>
            </div>
          ) : (
            <p>Aucune donnée de calcul disponible. Lancez un calcul pour voir les statistiques.</p>
          )}
        </div>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'text-green-600'
    if (score >= 0.5) return 'text-yellow-600'
    if (score >= 0.3) return 'text-orange-600'
    return 'text-red-600'
  }

  const getStatusColor = (count: number, total: number) => {
    const ratio = count / total
    if (ratio >= 0.9) return 'text-green-600 bg-green-50'
    if (ratio >= 0.7) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="space-y-6">
      {/* Informations générales */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🏛️ Informations générales</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{debugData.totalUserResponses}</div>
            <div className="text-sm text-gray-600">Réponses utilisateur</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{debugData.partiesCount}</div>
            <div className="text-sm text-gray-600">Partis politiques</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{debugData.positionsCount}</div>
            <div className="text-sm text-gray-600">Jeux de positions</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{debugData.prioritiesCount}</div>
            <div className="text-sm text-gray-600">Jeux de priorités</div>
          </div>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Scores moyens</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(debugData.globalStats.avgPoliticalScore)}`}>
              {(debugData.globalStats.avgPoliticalScore * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-2">Score politique moyen</div>
            <div className="text-xs text-gray-500">Basé sur les positions (70% du score)</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(debugData.globalStats.avgPriorityScore)}`}>
              {(debugData.globalStats.avgPriorityScore * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-2">Score priorités moyen</div>
            <div className="text-xs text-gray-500">Basé sur les priorités (30% du score)</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(debugData.globalStats.avgFinalScore)}`}>
              {(debugData.globalStats.avgFinalScore * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-2">Score final moyen</div>
            <div className="text-xs text-gray-500">Pondération 70/30</div>
          </div>
        </div>
      </div>

      {/* Validation et erreurs */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Validation des données</h3>

        {debugData.validationErrors.length === 0 ? (
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-green-800">Toutes les validations sont passées</h4>
              <p className="text-sm text-green-700">Les données semblent cohérentes pour le calcul d&apos;affinité.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center p-4 bg-red-50 rounded-lg">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-red-800">Erreurs de validation détectées</h4>
                <div className="text-sm text-red-700 mt-2">
                  <ul className="list-disc list-inside space-y-1">
                    {debugData.validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Indicateurs de santé des données */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Santé des données</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Couverture des positions</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(debugData.positionsCount, debugData.partiesCount)}`}>
              {debugData.positionsCount}/{debugData.partiesCount} partis
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Couverture des priorités</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(debugData.prioritiesCount, debugData.partiesCount)}`}>
              {debugData.prioritiesCount}/{debugData.partiesCount} partis
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Réponses utilisateur</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${debugData.totalUserResponses >= 20 ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'}`}>
              {debugData.totalUserResponses}/21 questions
            </span>
          </div>
        </div>
      </div>

      {/* Recommandations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Recommandations</h3>
        <div className="space-y-3 text-sm">
          {debugData.globalStats.avgFinalScore < 0.3 && (
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
              <p className="text-yellow-800">
                <strong>Score moyen faible :</strong> Les scores d&apos;affinité sont très bas. Vérifiez que les priorités des partis sont correctement structurées dans la base de données.
              </p>
            </div>
          )}

          {debugData.prioritiesCount < debugData.partiesCount && (
            <div className="p-3 bg-orange-50 border-l-4 border-orange-400">
              <p className="text-orange-800">
                <strong>Priorités manquantes :</strong> {debugData.partiesCount - debugData.prioritiesCount} parti(s) n&apos;ont pas de priorités définies. Cela affecte le calcul final (30% du score).
              </p>
            </div>
          )}

          {debugData.totalUserResponses < 20 && (
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400">
              <p className="text-blue-800">
                <strong>Test incomplet :</strong> L&apos;utilisateur n&apos;a répondu qu&apos;à {debugData.totalUserResponses}/21 questions. Encouragez-le à compléter le questionnaire pour de meilleurs résultats.
              </p>
            </div>
          )}

          {debugData.validationErrors.length === 0 && debugData.globalStats.avgFinalScore >= 0.3 && (
            <div className="p-3 bg-green-50 border-l-4 border-green-400">
              <p className="text-green-800">
                <strong>Calcul optimal :</strong> Toutes les données sont présentes et les scores semblent cohérents. Le système fonctionne correctement.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}