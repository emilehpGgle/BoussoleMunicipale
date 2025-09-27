import React from 'react'

interface QuestionComparison {
  questionId: string
  userResponse: string | number
  partyPosition: string
  userScore: number
  partyScore: number
  distance: number
  questionScore: number
  weight: number
}

interface PartyComparisonTableProps {
  partyId: string
  partyName: string
  comparisons: QuestionComparison[]
  politicalScore: number
  priorityScore: number
  finalScore: number
  finalPercentage: number
}

export function PartyComparisonTable({
  partyId: _partyId,
  partyName,
  comparisons,
  politicalScore,
  priorityScore,
  finalScore,
  finalPercentage
}: PartyComparisonTableProps) {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-50'
    if (score >= 0.6) return 'text-green-500 bg-green-25'
    if (score >= 0.4) return 'text-yellow-600 bg-yellow-50'
    if (score >= 0.2) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
  }

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'FA': return 'bg-green-100 text-green-800'
      case 'PA': return 'bg-green-50 text-green-700'
      case 'N': return 'bg-gray-100 text-gray-700'
      case 'PD': return 'bg-red-50 text-red-700'
      case 'FD': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPositionLabel = (position: string) => {
    switch (position) {
      case 'FA': return 'Fortement pour'
      case 'PA': return 'Plutôt pour'
      case 'N': return 'Neutre'
      case 'PD': return 'Plutôt contre'
      case 'FD': return 'Fortement contre'
      default: return position
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{partyName}</h3>
        <div className="text-right">
          <div className={`text-2xl font-bold px-3 py-1 rounded ${getScoreColor(finalScore / 100)}`}>
            {finalPercentage.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Affinité totale</div>
        </div>
      </div>

      {/* Scores de synthèse */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">
            {(politicalScore * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Score politique</div>
          <div className="text-xs text-gray-500">(70% du total)</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-purple-600">
            {(priorityScore * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Score priorités</div>
          <div className="text-xs text-gray-500">(30% du total)</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">
            {comparisons.length}
          </div>
          <div className="text-sm text-gray-600">Questions comparées</div>
          <div className="text-xs text-gray-500">sur 20 possibles</div>
        </div>
      </div>

      {/* Tableau détaillé des comparaisons */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-semibold text-gray-700">Question</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Votre réponse</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Position parti</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Distance</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Score</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((comparison, index) => (
              <tr key={comparison.questionId} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-3 px-2">
                  <div className="font-medium text-gray-900">
                    {comparison.questionId.replace(/_/g, ' ').replace(/^[a-z]+\s/, '')}
                  </div>
                </td>
                <td className="text-center py-3 px-2">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-semibold">
                    {comparison.userScore}
                  </div>
                </td>
                <td className="text-center py-3 px-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPositionColor(comparison.partyPosition)}`}>
                    {comparison.partyPosition}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">
                    {getPositionLabel(comparison.partyPosition)}
                  </div>
                </td>
                <td className="text-center py-3 px-2">
                  <div className={`font-semibold ${comparison.distance <= 1 ? 'text-green-600' : comparison.distance <= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {comparison.distance}
                  </div>
                </td>
                <td className="text-center py-3 px-2">
                  <div className={`font-semibold px-2 py-1 rounded ${getScoreColor(comparison.questionScore)}`}>
                    {(comparison.questionScore * 100).toFixed(0)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Légende */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Comment lire ce tableau :</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <div><strong>Distance :</strong> Différence entre votre réponse et la position du parti (0 = accord parfait, 4 = désaccord total)</div>
          <div><strong>Score :</strong> Pourcentage de compatibilité pour cette question (100% = accord parfait, 0% = désaccord total)</div>
          <div><strong>Positions :</strong> FA = Fortement pour, PA = Plutôt pour, N = Neutre, PD = Plutôt contre, FD = Fortement contre</div>
        </div>
      </div>
    </div>
  )
}