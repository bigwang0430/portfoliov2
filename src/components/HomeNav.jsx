import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/about', label: 'about' },
  { to: '/projects', label: 'projects' },
  { to: '/contact', label: 'contact' },
]

// Extra margin added on each side of the hovered subtitle when the bar contracts.
const SIDE_PAD = 6

export default function HomeNav() {
  const navRef = useRef(null)
  const linkRefs = useRef([])
  const [bar, setBar] = useState({ left: 0, width: 0 })

  // Full span: from the first subtitle's left edge to the last one's right edge.
  const setFull = useCallback(() => {
    const nav = navRef.current
    const first = linkRefs.current[0]
    const last = linkRefs.current[linkRefs.current.length - 1]
    if (!nav || !first || !last) return
    const navBox = nav.getBoundingClientRect()
    const firstBox = first.getBoundingClientRect()
    const lastBox = last.getBoundingClientRect()
    // Include the side margin in the outer ends so the full bar already sits at
    // about.left - PAD ... contact.right + PAD. Hovering an end item then only
    // contracts the inner end; the outer edge stays put.
    setBar({
      left: firstBox.left - navBox.left - SIDE_PAD,
      width: lastBox.right - firstBox.left + SIDE_PAD * 2,
    })
  }, [])

  // Contract the bar to bracket a single subtitle (plus a small margin).
  const setToLink = (index) => {
    const nav = navRef.current
    const el = linkRefs.current[index]
    if (!nav || !el) return
    const navBox = nav.getBoundingClientRect()
    const box = el.getBoundingClientRect()
    setBar({ left: box.left - navBox.left - SIDE_PAD, width: box.width + SIDE_PAD * 2 })
  }

  // Measure the full span before first paint, then again on resize and once the
  // mono font finishes loading (font swap changes text widths).
  useLayoutEffect(() => {
    setFull()
  }, [setFull])

  useEffect(() => {
    const onResize = () => setFull()
    window.addEventListener('resize', onResize)
    if (document.fonts?.ready) document.fonts.ready.then(setFull)
    return () => window.removeEventListener('resize', onResize)
  }, [setFull])

  return (
    <nav
      ref={navRef}
      onMouseLeave={setFull}
      className="relative flex items-center gap-7 pb-2 sm:gap-7"
    >
      {NAV_LINKS.map(({ to, label }, index) => (
        <Link
          key={to}
          to={to}
          ref={(el) => (linkRefs.current[index] = el)}
          onMouseEnter={() => setToLink(index)}
          className="font-mono text-sm text-white sm:text-[13px]"
        >
          {label}
        </Link>
      ))}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 h-px rounded-full bg-white transition-all duration-500 ease-out"
        style={{ left: bar.left, width: bar.width }}
      />
    </nav>
  )
}
