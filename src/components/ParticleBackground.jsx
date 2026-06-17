import { useEffect } from 'react'
import { Medusae } from '../lib/medusae/index.js'

// Fixed full-screen particle canvas behind all content. pointer-events-none so it
// never intercepts clicks; mouse-following is handled inside the shader via a
// global pointermove listener.
export default function ParticleBackground() {
  useEffect(() => {
    // R3F sizes its <canvas> from a ResizeObserver measurement. In some
    // environments the first measurement lands at the default 300x150 and only
    // corrects once a resize fires, so the canvas fails to fill the viewport on
    // initial load. Nudge one resize after first paint to force a re-measure.
    let raf2
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() =>
        window.dispatchEvent(new Event('resize')),
      )
    })
    return () => {
      cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Medusae config={{ background: { color: '#000000' } }} />
    </div>
  )
}
