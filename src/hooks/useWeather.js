import { useState, useEffect } from 'react'

const CITIES = [
  { id: 'seoul-arrival',  lat: 37.5665, lon: 126.9780, start: '2026-06-26', end: '2026-06-29' },
  { id: 'osaka',          lat: 34.6937, lon: 135.5023, start: '2026-06-30', end: '2026-07-01' },
  { id: 'kyoto',          lat: 35.0116, lon: 135.7681, start: '2026-07-01', end: '2026-07-02' },
  { id: 'tokyo',          lat: 35.6762, lon: 139.6503, start: '2026-07-02', end: '2026-07-08' },
  { id: 'seoul-return',   lat: 37.5665, lon: 126.9780, start: '2026-07-08', end: '2026-07-19' },
]

function wmoToEmoji(code) {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌦️'
  return '⛈️'
}

// "2026-07-01" → "Jul 1"
function isoToShort(iso) {
  const [, m, d] = iso.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}`
}

export default function useWeather() {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    async function fetchAll() {
      const result = {}
      await Promise.all(CITIES.map(async ({ id, lat, lon, start, end }) => {
        try {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&start_date=${start}&end_date=${end}&temperature_unit=fahrenheit`
          const res = await fetch(url)
          const data = await res.json()
          const { time, weathercode, temperature_2m_max, temperature_2m_min } = data.daily
          result[id] = {}
          time.forEach((iso, i) => {
            result[id][isoToShort(iso)] = {
              icon: wmoToEmoji(weathercode[i]),
              high: Math.round(temperature_2m_max[i]),
              low:  Math.round(temperature_2m_min[i]),
            }
          })
        } catch {
          // silently skip if fetch fails
        }
      }))
      setWeather(result)
    }
    fetchAll()
  }, [])

  return weather
}
