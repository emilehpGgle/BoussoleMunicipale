'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Shield, Mail, Phone, Target, BarChart3, Download, Trash2, RefreshCw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useProfile } from '@/hooks/useProfile'
import { useConsentPreferences } from '@/components/cookie-consent-banner'
import { ConsentForm, type ConsentFormData } from '@/components/consent-form'
import { useToast } from '@/hooks/use-toast'

export default function PreferencesPage() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [showConsentForm, setShowConsentForm] = useState(false)
  const { profile, updateContactAndConsents, clearProfile, getConsentStatus } = useProfile()
  const { preferences, resetPreferences } = useConsentPreferences()
  const { toast } = useToast()

  const consentStatus = getConsentStatus()

  const handleUpdateConsents = async (data: ConsentFormData) => {
    setIsUpdating(true)
    try {
      await updateContactAndConsents({
        email: data.email,
        phone: data.phone,
        analyticsConsent: data.analyticsConsent,
        emailConsent: data.emailConsent,
        phoneConsent: data.phoneConsent,
        marketingConsent: data.marketingConsent,
      })

      toast({
        title: 'Préférences mises à jour',
        description: 'Vos préférences de confidentialité ont été sauvegardées.',
      })
      setShowConsentForm(false)
    } catch (_error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour vos préférences.',
        variant: 'destructive',
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleResetAllData = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible.')) {
      return
    }

    try {
      await clearProfile()
      resetPreferences()
      toast({
        title: 'Données supprimées',
        description: 'Toutes vos données ont été supprimées.',
      })
    } catch (_error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer vos données.',
        variant: 'destructive',
      })
    }
  }

  const handleExportData = async () => {
    const exportData = {
      profile,
      preferences,
      exportDate: new Date().toISOString(),
      version: '1.0.0',
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `boussole-municipale-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: 'Export terminé',
      description: 'Vos données ont été téléchargées.',
    })
  }

  const ConsentStatusIcon = ({ consent }: { consent: boolean }) => {
    return consent ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    )
  }

  return (
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      {/* En-tête */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4 w-fit">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Shield className="w-8 h-8 text-midnight-green" />
            Gestion de la confidentialité
          </h1>
          <p className="text-muted-foreground text-lg">
            Gérez vos préférences de collecte de données et vos consentements.
          </p>
        </motion.div>
      </div>

      {/* Status des consentements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-midnight-green" />
              Status de vos consentements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Données analytiques</p>
                    <p className="text-sm text-muted-foreground">Nécessaire au fonctionnement</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ConsentStatusIcon consent={consentStatus.analyticsConsent} />
                  <Badge variant={consentStatus.analyticsConsent ? 'default' : 'destructive'}>
                    {consentStatus.analyticsConsent ? 'Accepté' : 'Refusé'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-midnight-green" />
                  <div>
                    <p className="font-medium">Communications email</p>
                    <p className="text-sm text-muted-foreground">Recevoir vos résultats</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ConsentStatusIcon consent={consentStatus.emailConsent} />
                  <Badge variant={consentStatus.emailConsent ? 'default' : 'secondary'}>
                    {consentStatus.emailConsent ? 'Activé' : 'Désactivé'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Notifications SMS</p>
                    <p className="text-sm text-muted-foreground">Rappels importants</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ConsentStatusIcon consent={consentStatus.phoneConsent} />
                  <Badge variant={consentStatus.phoneConsent ? 'default' : 'secondary'}>
                    {consentStatus.phoneConsent ? 'Activé' : 'Désactivé'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium">Marketing et partenaires</p>
                    <p className="text-sm text-muted-foreground">Offres ciblées</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ConsentStatusIcon consent={consentStatus.marketingConsent} />
                  <Badge variant={consentStatus.marketingConsent ? 'default' : 'secondary'}>
                    {consentStatus.marketingConsent ? 'Activé' : 'Désactivé'}
                  </Badge>
                </div>
              </div>
            </div>

            {!consentStatus.analyticsConsent && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Service non disponible
                    </p>
                    <p className="text-sm text-red-700">
                      Vous devez accepter la collecte de données analytiques pour utiliser la Boussole Municipale.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Informations de contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Coordonnées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Adresse courriel</p>
                  <p className="text-sm text-muted-foreground">
                    {profile.email || 'Aucune adresse courriel enregistrée'}
                  </p>
                </div>
                {profile.emailVerified ? (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Vérifiée
                  </Badge>
                ) : profile.email ? (
                  <Badge variant="secondary">Non vérifiée</Badge>
                ) : null}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Numéro de téléphone</p>
                  <p className="text-sm text-muted-foreground">
                    {profile.phone || 'Aucun numéro de téléphone enregistré'}
                  </p>
                </div>
                {profile.phoneVerified ? (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Vérifié
                  </Badge>
                ) : profile.phone ? (
                  <Badge variant="secondary">Non vérifié</Badge>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <Button
                onClick={() => setShowConsentForm(true)}
                className="flex items-center gap-2"
                variant="outline"
              >
                <RefreshCw className="w-4 h-4" />
                Modifier préférences
              </Button>

              <Button
                onClick={handleExportData}
                className="flex items-center gap-2"
                variant="outline"
              >
                <Download className="w-4 h-4" />
                Exporter mes données
              </Button>

              <Button
                onClick={handleResetAllData}
                className="flex items-center gap-2"
                variant="destructive"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer tout
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Informations légales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Informations légales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Conformément à la Loi sur la protection des renseignements personnels et documents électroniques (LPRPDE)
                et au Règlement général sur la protection des données (RGPD), vous avez le droit de :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Accéder à vos données personnelles</li>
                <li>Rectifier vos données inexactes</li>
                <li>Demander la suppression de vos données</li>
                <li>Retirer votre consentement à tout moment</li>
                <li>Demander la portabilité de vos données</li>
              </ul>
              <p>
                Version du système de consentement : {consentStatus.consentVersion || '1.0.0'}
              </p>
              {consentStatus.consentDate && (
                <p>
                  Dernier consentement donné le : {consentStatus.consentDate.toLocaleDateString('fr-CA')}
                </p>
              )}
              <p className="mb-3">
                Pour toute question, consultez notre{' '}
                <Link href="/confidentialite" className="text-midnight-green hover:underline">
                  politique de confidentialité
                </Link>{' '}
                ou contactez-nous.
              </p>
              <div className="pt-3 border-t">
                <Link href="/donnees-protegees" className="inline-flex items-center gap-2 text-sm text-midnight-green hover:underline font-medium">
                  <Shield className="w-4 h-4" />
                  En savoir plus sur nos mesures de sécurité technique
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal de mise à jour des préférences */}
      {showConsentForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Modifier vos préférences</CardTitle>
            </CardHeader>
            <CardContent>
              <ConsentForm
                onSubmit={handleUpdateConsents}
                isLoading={isUpdating}
                variant="modal"
                showTitle={false}
                initialEmail={profile.email}
                initialPhone={profile.phone}
                initialAnalyticsConsent={consentStatus.analyticsConsent}
                initialEmailConsent={consentStatus.emailConsent}
                initialPhoneConsent={consentStatus.phoneConsent}
                initialMarketingConsent={consentStatus.marketingConsent}
              />
              <div className="mt-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  onClick={() => setShowConsentForm(false)}
                  disabled={isUpdating}
                  className="w-full"
                >
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}