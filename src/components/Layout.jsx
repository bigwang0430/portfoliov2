import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ParticleBackground from './ParticleBackground'
import ParticleToggle from './ParticleToggle'

// Full-viewport, no-scroll shell. The particle canvas sits behind every page
// (fixed, -z-10) and each page centers its own content within <main>. The
// particle background can be toggled off via ParticleToggle; that state lives
// here so it persists across route changes (Layout stays mounted).
export default function Layout() {
  const [particlesEnabled, setParticlesEnabled] = useState(true)

  return (
    <>
      {particlesEnabled && <ParticleBackground />}
      <ParticleToggle
        enabled={particlesEnabled}
        onToggle={() => setParticlesEnabled((v) => !v)}
      />
      <main className="relative z-10 h-full w-full overflow-hidden">
        <Outlet />
      </main>
    </>
  )
}
