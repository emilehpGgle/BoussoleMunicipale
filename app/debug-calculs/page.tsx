'use client'

import { useState } from 'react'
import { useCalculDebug } from '@/hooks/useCalculDebug'
import { PartyComparisonTable } from '@/components/debug/PartyComparisonTable'
import { DebugStatsPanel } from '@/components/debug/DebugStatsPanel'
import { CalculationLogsPanel } from '@/components/debug/CalculationLogsPanel'

const municipalities = [
  { id: 'quebec', name: 'Québec' },
  { id: 'montreal', name: 'Montréal' },
  { id: 'laval', name: 'Laval' },
  { id: 'gatineau', name: 'Gatineau' },
  { id: 'longueuil', name: 'Longueuil' },
  { id: 'levis', name: 'Lévis' }
]

export default function DebugCalculsPage() {
  const [selectedMunicipality, setSelectedMunicipality] = useState('montreal')
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'logs'>('overview')

  // Hook de diagnostic complet
  const {
    debugData,
    calculationSteps,
    isCalculating,
    debugCalculateAffinity,
    clearSteps,
    responses: _responses,
    parties: _parties,
    positionsByParty: _positionsByParty,
    prioritiesByParty: _prioritiesByParty,
    responseCounts: _responseCounts
  } = useCalculDebug(selectedMunicipality)

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: '📊' },
    { id: 'details', name: 'Détails par parti', icon: '🏛️' },
    { id: 'logs', name: 'Console', icon: '📜' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔧 Diagnostic des calculs d&apos;affinité
          </h1>
          <p className="text-gray-600">
            Interface de diagnostic pour analyser et déboguer les calculs d&apos;affinité politique en temps réel.
          </p>
        </div>

        {/* Sélecteur de municipalité */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Municipalité à analyser
          </label>
          <select
            value={selectedMunicipality}
            onChange={(e) => setSelectedMunicipality(e.target.value)}
            className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {municipalities.map(municipality => (
              <option key={municipality.id} value={municipality.id}>
                {municipality.name}
              </option>
            ))}
          </select>
          {isCalculating && (
            <div className="mt-3 flex items-center text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-sm">Recalcul en cours...</span>
            </div>
          )}
        </div>

        {/* Navigation par onglets */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'details' | 'logs')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contenu des onglets */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <DebugStatsPanel debugData={debugData} isCalculating={isCalculating} />
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-6">
                {debugData?.partyDebugInfo?.length ? (
                  debugData.partyDebugInfo.map((partyInfo) => (
                    <PartyComparisonTable
                      key={partyInfo.partyId}
                      partyId={partyInfo.partyId}
                      partyName={partyInfo.partyName}
                      comparisons={partyInfo.politicalComparisons}
                      politicalScore={partyInfo.politicalScore}
                      priorityScore={partyInfo.priorityScore}
                      finalScore={partyInfo.finalScore}
                      finalPercentage={partyInfo.finalPercentage}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune donnée détaillée</h3>
                    <p>Les calculs détaillés par parti apparaîtront ici une fois le diagnostic lancé.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'logs' && (
              <CalculationLogsPanel
                logs={calculationSteps}
                isCalculating={isCalculating}
                onClearLogs={clearSteps}
                onRefreshCalculation={debugCalculateAffinity}
              />
            )}
          </div>
        </div>

        {/* Résumé rapide en bas */}
        {debugData && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Résumé rapide</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{debugData.totalUserResponses}</div>
                <div className="text-sm text-gray-600">Réponses user</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{debugData.partiesCount}</div>
                <div className="text-sm text-gray-600">Partis analysés</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {(debugData.globalStats.avgFinalScore * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Score moyen</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{debugData.validationErrors.length}</div>
                <div className="text-sm text-gray-600">Erreurs détectées</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}