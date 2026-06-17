import { useState } from 'react'
import { CgDribbble } from 'react-icons/cg'

// Top-right toggle (mirrors the top-left BackArrow) for the particle background.
// White by default; accent on hover; stays accent while the background is off.
// The color is applied inline (rather than via a `text-accent` utility class) so
// it reliably wins the cascade on this button; `transition-colors` still animates
// the change. Rendered by Layout so it shows on every page and its state persists
// across navigation.
export default function ParticleToggle({ enabled, onToggle }) {
  const [hovered, setHovered] = useState(false)
  const showAccent = !enabled || hovered

  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Toggle particle background"
      aria-pressed={!enabled}
      style={{ color: showAccent ? 'var(--color-accent)' : '#ffffff' }}
      className="fixed top-12 right-12 z-30"
    >
      <CgDribbble size={25} />
    </button>
  )
}
