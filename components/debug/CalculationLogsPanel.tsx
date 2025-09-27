import React, { useState, useRef, useEffect } from 'react'

interface CalculationLogsPanelProps {
  logs: string[]
  isCalculating: boolean
  onClearLogs: () => void
  onRefreshCalculation: () => void
}

export function CalculationLogsPanel({
  logs,
  isCalculating,
  onClearLogs,
  onRefreshCalculation
}: CalculationLogsPanelProps) {
  const [autoScroll, setAutoScroll] = useState(true)
  const [filter, setFilter] = useState('')
  const logsEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll vers le bas quand de nouveaux logs arrivent
  useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs, autoScroll])

  // Filtrer les logs selon le filtre
  const filteredLogs = logs.filter(log =>
    filter === '' || log.toLowerCase().includes(filter.toLowerCase())
  )

  // Analyser les logs pour identifier les types
  const getLogType = (log: string) => {
    if (log.includes('ERREUR') || log.includes('❌')) return 'error'
    if (log.includes('⚠️') || log.includes('PROBLÈME')) return 'warning'
    if (log.includes('===') || log.includes('🚀') || log.includes('✅')) return 'section'
    if (log.includes('📊') || log.includes('📈') || log.includes('🎯')) return 'stats'
    if (log.includes('🏛️') || log.includes('⭐')) return 'calculation'
    return 'info'
  }

  const getLogClass = (logType: string) => {
    switch (logType) {
      case 'error': return 'text-red-400 bg-red-900/20 border-l-4 border-red-400 pl-4'
      case 'warning': return 'text-yellow-400 bg-yellow-900/20 border-l-4 border-yellow-400 pl-4'
      case 'section': return 'text-blue-400 font-bold bg-blue-900/20 border-l-4 border-blue-400 pl-4'
      case 'stats': return 'text-green-400 bg-green-900/20 border-l-4 border-green-400 pl-4'
      case 'calculation': return 'text-purple-400 bg-purple-900/20 border-l-4 border-purple-400 pl-4'
      default: return 'text-green-300'
    }
  }

  const logStats = {
    total: logs.length,
    errors: logs.filter(log => getLogType(log) === 'error').length,
    warnings: logs.filter(log => getLogType(log) === 'warning').length,
    calculations: logs.filter(log => getLogType(log) === 'calculation').length
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">📜 Console de calcul</h3>
        <div className="flex items-center space-x-3">
          {/* Statistiques des logs */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <span className="text-gray-600">
              Total: <span className="font-semibold text-blue-600">{logStats.total}</span>
            </span>
            {logStats.errors > 0 && (
              <span className="text-gray-600">
                Erreurs: <span className="font-semibold text-red-600">{logStats.errors}</span>
              </span>
            )}
            {logStats.warnings > 0 && (
              <span className="text-gray-600">
                Alertes: <span className="font-semibold text-yellow-600">{logStats.warnings}</span>
              </span>
            )}
            <span className="text-gray-600">
              Calculs: <span className="font-semibold text-purple-600">{logStats.calculations}</span>
            </span>
          </div>

          {/* Indicateur de statut */}
          {isCalculating && (
            <div className="flex items-center text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-sm">Calcul en cours...</span>
            </div>
          )}
        </div>
      </div>

      {/* Contrôles */}
      <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
        <input
          type="text"
          placeholder="Filtrer les logs..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 min-w-64 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="flex items-center text-sm text-gray-700">
          <input
            type="checkbox"
            checked={autoScroll}
            onChange={(e) => setAutoScroll(e.target.checked)}
            className="mr-2"
          />
          Auto-scroll
        </label>

        <button
          onClick={onRefreshCalculation}
          disabled={isCalculating}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          🔄 Recalculer
        </button>

        <button
          onClick={onClearLogs}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
        >
          🗑️ Effacer
        </button>
      </div>

      {/* Zone de logs */}
      <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {logs.length === 0 ? (
              'Aucun log pour le moment. Cliquez sur "Recalculer" pour lancer une analyse.'
            ) : (
              `Aucun log ne correspond au filtre "${filter}".`
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredLogs.map((log, index) => {
              const logType = getLogType(log)
              const logClass = getLogClass(logType)

              return (
                <div
                  key={index}
                  className={`py-1 px-2 rounded ${logClass}`}
                >
                  <span className="text-xs text-gray-400 mr-3">
                    {String(index + 1).padStart(3, '0')}
                  </span>
                  {log}
                </div>
              )
            })}
            <div ref={logsEndRef} />
          </div>
        )}
      </div>

      {/* Légende */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">💡 Légende des couleurs :</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-400 rounded mr-2"></div>
            <span>Erreurs</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-400 rounded mr-2"></div>
            <span>Alertes</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-400 rounded mr-2"></div>
            <span>Sections</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded mr-2"></div>
            <span>Statistiques</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-400 rounded mr-2"></div>
            <span>Calculs</span>
          </div>
        </div>
      </div>

      {/* Conseils de debugging */}
      {logStats.errors > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">🚨 Erreurs détectées</h4>
          <p className="text-sm text-red-700">
            {logStats.errors} erreur(s) trouvée(s) dans les logs.
            Vérifiez que toutes les données nécessaires sont présentes dans la base de données.
          </p>
        </div>
      )}
    </div>
  )
}