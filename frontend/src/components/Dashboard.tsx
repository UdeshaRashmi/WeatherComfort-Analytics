import React, { useCallback, useMemo, useState } from 'react'
import WeatherData from './WeatherData'
import CacheStatus from './CacheStatus'
import ProtectedRoute from '../auth/ProtectedRoute'

type City = {
  name: string
  comfortScore: number
  temp: number
  humidity: number
}

export default function Dashboard() {
  const [data, setData] = useState<City[]>([])
  const [sortKey, setSortKey] = useState<'score' | 'temp'>('score')

  const onData = useCallback((d: any[]) => {
    const normalized = d.map((c: any) => ({
      name: c.name || c.city || 'Unknown',
      comfortScore: c.comfortScore ?? c.score ?? 0,
      temp: c.temp ?? c.temperature ?? 0,
      humidity: c.humidity ?? 0,
    }))
    setData(normalized)
  }, [])

  const sorted = useMemo(() => {
    const copy = [...data]
    if (sortKey === 'score') return copy.sort((a, b) => b.comfortScore - a.comfortScore)
    return copy.sort((a, b) => b.temp - a.temp)
  }, [data, sortKey])

  return (
    <ProtectedRoute>
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <label className="text-sm">Sort:</label>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as any)}
              className="border px-2 py-1 rounded"
            >
              <option value="score">Comfort Score</option>
              <option value="temp">Temperature</option>
            </select>
          </div>
          <CacheStatus />
        </div>

        <WeatherData onData={onData} />

        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="text-left p-2">Rank</th>
                <th className="text-left p-2">City</th>
                <th className="text-left p-2">Comfort Score</th>
                <th className="text-left p-2">Temp</th>
                <th className="text-left p-2">Humidity</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((city, i) => (
                <tr key={city.name} className="border-t">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{city.name}</td>
                  <td className="p-2">
                    <span className="px-2 py-1 rounded bg-blue-200">{city.comfortScore}</span>
                  </td>
                  <td className="p-2">{city.temp}°C</td>
                  <td className="p-2">{city.humidity}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-4 md:hidden">
          {sorted.map((city, i) => (
            <div key={city.name} className="p-4 border rounded shadow">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{i + 1}. {city.name}</h2>
                <span className="px-2 py-1 rounded bg-blue-200">{city.comfortScore}</span>
              </div>
              <p className="text-sm">Temp: {city.temp}°C | Humidity: {city.humidity}%</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}
 