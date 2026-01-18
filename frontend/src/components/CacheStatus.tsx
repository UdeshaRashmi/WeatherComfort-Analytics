import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function CacheStatus() {
  const { getAccessTokenSilently } = useAuth0()
  const [cacheStatus, setCacheStatus] = useState<any>(null)

  const fetchCacheStatus = async () => {
    try {
      const token = await getAccessTokenSilently()
      const res = await fetch('/api/cache/status', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      setCacheStatus(json)
    } catch (err) {
      setCacheStatus({ error: 'Failed to fetch cache status' })
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={fetchCacheStatus}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Check Cache
      </button>
      {cacheStatus && (
        <pre className="mt-2 bg-gray-100 p-2 rounded">{JSON.stringify(cacheStatus, null, 2)}</pre>
      )}
    </div>
  )
}
