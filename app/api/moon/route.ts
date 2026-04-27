import { NextResponse } from 'next/server'

const PHASE_EMOJI: Record<string, string> = {
  'New Moon': '🌑',
  'Waxing Crescent': '🌒',
  'First Quarter': '🌓',
  'Waxing Gibbous': '🌔',
  'Full Moon': '🌕',
  'Waning Gibbous': '🌖',
  'Last Quarter': '🌗',
  'Waning Crescent': '🌘',
}

function localMoonPhase(date: Date) {
  function jd(d: Date) {
    const y = d.getUTCFullYear(), m = d.getUTCMonth() + 1
    const day = d.getUTCDate() + (d.getUTCHours() + d.getUTCMinutes() / 60 + d.getUTCSeconds() / 3600) / 24
    const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4)
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5
  }
  const r = (x: number) => x * Math.PI / 180
  const n = (x: number) => x - Math.floor(x / 360) * 360
  const J = jd(date), T = (J - 2451545.0) / 36525
  const L0 = n(218.3165 + 481267.8813 * T)
  const M = n(134.9634 + 477198.8676 * T)
  const M1 = n(357.5291 + 35999.0503 * T)
  const F = n(93.2721 + 483202.0175 * T)
  const mr = r(M), m1r = r(M1), fr = r(F), l0r = r(L0)
  const dL = 6.289*Math.sin(mr) - 1.274*Math.sin(2*l0r-mr) + 0.658*Math.sin(2*l0r)
    - 0.186*Math.sin(m1r) - 0.059*Math.sin(2*mr-2*l0r) - 0.057*Math.sin(mr-2*l0r+m1r)
    + 0.053*Math.sin(mr+2*l0r) + 0.046*Math.sin(2*l0r-m1r) + 0.041*Math.sin(mr-m1r)
    - 0.035*Math.sin(l0r) - 0.031*Math.sin(mr+m1r) - 0.015*Math.sin(2*fr-2*l0r)
    + 0.011*Math.sin(mr-4*l0r)
  const moonLon = n(L0 + dL)
  const sunL = n(280.46646 + 36000.76983 * T)
  const sunM = r(n(357.52911 + 35999.05029 * T))
  const sunC = 1.9146*Math.sin(sunM) + 0.019993*Math.sin(2*sunM) + 0.00029*Math.sin(3*sunM)
  const elongation = n(moonLon - (sunL + sunC))
  const phase = elongation / 360
  const illumination = (1 - Math.cos(r(elongation))) / 2
  const age = phase * 29.53059
  const distance = 385000 - 20905*Math.cos(mr) - 3699*Math.cos(2*l0r-mr) - 2956*Math.cos(2*l0r)
  let phaseName: string, emoji: string
  if (phase < 0.0339 || phase >= 0.9661) { phaseName = 'New Moon'; emoji = '🌑' }
  else if (phase < 0.1339) { phaseName = 'Waxing Crescent'; emoji = '🌒' }
  else if (phase < 0.2161) { phaseName = 'First Quarter'; emoji = '🌓' }
  else if (phase < 0.4661) { phaseName = 'Waxing Gibbous'; emoji = '🌔' }
  else if (phase < 0.5339) { phaseName = 'Full Moon'; emoji = '🌕' }
  else if (phase < 0.6339) { phaseName = 'Waning Gibbous'; emoji = '🌖' }
  else if (phase < 0.7161) { phaseName = 'Last Quarter'; emoji = '🌗' }
  else { phaseName = 'Waning Crescent'; emoji = '🌘' }
  return { phase, illumination, age, distance, phaseName, emoji }
}

export async function GET() {
  const now = new Date()
  const unix = Math.floor(now.getTime() / 1000)
  const local = localMoonPhase(now)

  let farmsenseDistance: number | null = null
  try {
    const res = await fetch(`https://api.farmsense.net/v1/moonphases/?d=${unix}`, {
      signal: AbortSignal.timeout(4000),
    })
    if (res.ok) {
      const data = await res.json()
      const moon = Array.isArray(data) ? data[0] : data
      if (moon && moon.Error === 0) {
        farmsenseDistance = parseFloat(moon.Distance) || null
      }
    }
  } catch {
    // farmsense unavailable — local calculation used
  }

  const distance = farmsenseDistance ?? Math.round(local.distance)

  return NextResponse.json({
    phase: local.phase,
    illumination: local.illumination,
    phaseName: local.phaseName,
    emoji: local.emoji,
    age: local.age,
    distance,
    isSupermoon: distance < 362000,
    isMicroMoon: distance > 405000,
    source: 'local',
  })
}
