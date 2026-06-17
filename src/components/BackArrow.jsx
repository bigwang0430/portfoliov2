import { Link } from 'react-router-dom'
import { RxReset } from "react-icons/rx";

// Small loop/return arrow in the top-left of a page; links back (home by default).
export default function BackArrow({ to = '/' }) {
  return (
    <Link
      to={to}
      aria-label="Back"
      className="absolute top-10 left-10 z-20 text-white transition-colors hover:text-accent"
    >
      <RxReset size={20} />
    </Link>
  )
}
