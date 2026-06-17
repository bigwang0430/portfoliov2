import { Link } from 'react-router-dom'

// One row in the projects list: name (link) + tagline beneath. External projects
// open in a new tab; internal ones route to /projects/<slug>.
export default function ProjectEntry({ project }) {
  const { name, tagline, external, href, slug } = project
  const nameClass = 'font-mono text-xs font-bold text-white transition-colors hover:text-accent'

  return (
    <div>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={nameClass}>
          {name}
        </a>
      ) : (
        <Link to={`/projects/${slug}`} className={nameClass}>
          {name}
        </Link>
      )}
      <p className="mt-1 font-mono text-[11px] leading-relaxed text-white">{tagline}</p>
    </div>
  )
}
