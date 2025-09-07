import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const headers = new Headers()
  
  // Copier tous les headers de la requête pour debugging
  request.headers.forEach((value, key) => {
    headers.set(`req-${key}`, value)
  })
  
  // Headers de debugging spécifiques
  headers.set('X-Debug-Timestamp', new Date().toISOString())
  headers.set('X-Debug-URL', request.url)
  headers.set('X-Debug-Host', request.headers.get('host') || 'unknown')
  headers.set('X-Debug-User-Agent', request.headers.get('user-agent') || 'unknown')
  
  // Headers Vercel spécifiques s'ils existent
  if (request.headers.get('x-vercel-ip-country')) {
    headers.set('X-Debug-Country', request.headers.get('x-vercel-ip-country') || '')
  }
  if (request.headers.get('x-forwarded-host')) {
    headers.set('X-Debug-Forwarded-Host', request.headers.get('x-forwarded-host') || '')
  }
  
  return new Response('Debug headers endpoint', {
    status: 200,
    headers
  })
}

export async function HEAD(request: NextRequest) {
  // Même logique pour HEAD
  return GET(request)
}