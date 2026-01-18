import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function WeatherData({ onData }: { onData: (d: any[]) => void }) {
  const { getAccessTokenSilently } = useAuth0()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently()
        const res = await fetch('/api/weather', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Network error')
        const json = await res.json()
        if (mounted) onData(json)
      } catch (err) {
        if (mounted) setError('Failed to fetch weather data')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchData()
    return () => {
      mounted = false
    }
  }, [getAccessTokenSilently, onData])

  if (loading) return <div>Loading weather...</div>
  if (error) return <div>{error}</div>
  return null
}
