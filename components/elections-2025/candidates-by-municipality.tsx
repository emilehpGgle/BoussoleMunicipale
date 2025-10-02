'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { supportedMunicipalities } from '@/lib/postal-code-mapping'
import { Loader2 } from 'lucide-react'

interface Leader {
  id: string
  name: string
  slug: string
  party_id: string
  municipality_id: string
  biography: string
  photo_url: string
  website_url: string | null
  party: {
    id: string
    name: string
    short_name: string
    logo_url: string
    orientation: string | null
    website_url: string | null
  }
}

export function CandidatesByMunicipality() {
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('quebec')
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const municipalityName = supportedMunicipalities.find(m => m.id === selectedMunicipality)?.name || selectedMunicipality

  useEffect(() => {
    async function fetchLeaders() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/leaders?municipality=${encodeURIComponent(selectedMunicipality)}`)

        if (!response.ok) {
          if (response.status === 404) {
            setLeaders([])
            return
          }
          throw new Error('Erreur lors de la récupération des candidats')
        }

        const data = await response.json()
        setLeaders(data.leaders || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
        setLeaders([])
      } finally {
        setLoading(false)
      }
    }

    fetchLeaders()
  }, [selectedMunicipality])

  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold">
          Candidats aux Élections Municipales 2025
        </h2>

        <div className="flex items-center gap-3">
          <label htmlFor="municipality-select" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            Sélectionner une ville :
          </label>
          <Select value={selectedMunicipality} onValueChange={setSelectedMunicipality}>
            <SelectTrigger id="municipality-select" className="w-[200px]">
              <SelectValue placeholder="Choisir une ville" />
            </SelectTrigger>
            <SelectContent>
              {supportedMunicipalities.map((municipality) => (
                <SelectItem key={municipality.id} value={municipality.id}>
                  {municipality.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Chargement des candidats...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">
            Veuillez réessayer ou sélectionner une autre municipalité.
          </p>
        </div>
      ) : leaders.length > 0 ? (
        <>
          <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            Découvrez les <strong>{leaders.length} candidats</strong> en lice pour devenir maire de {municipalityName}
            et leurs positions sur les enjeux municipaux qui vous touchent.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {leaders.map((leader) => (
              <Card key={leader.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 relative bg-white rounded-lg p-1 shadow-sm overflow-hidden">
                      <Image
                        src={leader.photo_url || '/placeholder.svg?width=48&height=48'}
                        alt={`Photo ${leader.name}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{leader.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{leader.party.short_name}</p>
                    </div>
                  </div>
                  {leader.party.orientation && (
                    <Badge variant="secondary" className="w-fit text-xs">
                      {leader.party.orientation}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {leader.biography}
                  </p>
                  <Button asChild size="sm" className="w-full">
                    <Link href={`/${selectedMunicipality}/leaders/${leader.slug}`}>
                      Voir la biographie complète
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href={`/${selectedMunicipality}/leaders`}>
                Voir tous les candidats et leur biographie
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <p className="text-lg text-muted-foreground mb-4">
            Les candidats pour les élections municipales 2025 à {municipalityName} seront annoncés prochainement.
          </p>
          <p className="text-sm text-muted-foreground">
            Consultez notre boussole électorale pour découvrir les enjeux municipaux importants.
          </p>
        </div>
      )}
    </section>
  )
}
