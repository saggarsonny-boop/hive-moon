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

export async function GET() {
  const unix = Math.floor(Date.now() / 1000)

  try {
    const res = await fetch(`https://api.farmsense.net/v1/moonphases/?d=${unix}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error(`farmsense ${res.status}`)

    const data = await res.json()
    const moon = Array.isArray(data) ? data[0] : data
    if (!moon || moon.Error !== 0) throw new Error(moon?.ErrorMsg || 'farmsense error')

    const phaseName: string = moon.Phase || 'Unknown'
    const age: number = parseFloat(moon.Age) || 0
    const phase = age / 29.53059
    const illumination: number = parseFloat(moon.Illumination) || 0
    const distance: number = parseFloat(moon.Distance) || 385000

    return NextResponse.json({
      phase,
      illumination,
      phaseName,
      emoji: PHASE_EMOJI[phaseName] ?? '🌙',
      age,
      distance: Math.round(distance),
      isSupermoon: distance < 362000,
      isMicroMoon: distance > 405000,
      source: 'farmsense',
    })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 })
  }
}
