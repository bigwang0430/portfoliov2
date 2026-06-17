import { useParams } from 'react-router-dom'
import { FaGlobe } from 'react-icons/fa'
import BackArrow from '../components/BackArrow'
import { getProject } from '../data/projects'

function Bullets({ items }) {
  return (
    <ul className="ml-4 list-disc space-y-1">
      {items.map((item, i) => (
        <li key={i} className="font-mono text-[11px] leading-relaxed text-white">
          {item}
        </li>
      ))}
    </ul>
  )
}

function Section({ section }) {
  return (
    <section className="border-t border-white py-8">
      <h2 className="mb-3 font-mono text-2xl font-bold text-white">{section.title}</h2>
      {section.body && (
        <p className="font-mono text-[11px] leading-relaxed text-white">{section.body}</p>
      )}
      {section.bullets && <Bullets items={section.bullets} />}
      {section.subsections?.map((sub) => (
        <div key={sub.title} className="mt-4">
          <h3 className="mb-2 font-mono text-xs font-bold text-white">{sub.title}</h3>
          <Bullets items={sub.bullets} />
        </div>
      ))}
    </section>
  )
}

// Bordered, rounded "enclosed rectangle" card used throughout the overview block.
function Card({ children, className = '' }) {
  return <div className={`rounded-xl border border-white p-4 ${className}`}>{children}</div>
}

function OverviewCard({ item }) {
  // Both the label and value are <p> with identical typography so values line up
  // across cards in a row (the linked value renders the icon inline, not as a
  // separate inline-flex element that would shift its baseline).
  return (
    <Card>
      <p className="mb-1 font-mono text-[11px] font-bold text-white">{item.label}</p>
      <p className="font-mono text-[11px] text-white">
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-colors hover:text-accent"
          >
            <FaGlobe className="mr-1.5 inline-block align-[-0.125em]" size={11} />
            {item.value}
          </a>
        ) : (
          item.value
        )}
      </p>
    </Card>
  )
}

// Generic, data-driven project detail page. Scrolls internally (the one exception
// to the site's no-scroll rule); the back arrow stays pinned outside the scroll
// region and returns to the projects list.
export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project?.detail) {
    return (
      <div className="relative h-full w-full">
        <BackArrow to="/projects" />
        <div className="flex h-full w-full items-center justify-center px-6">
          <p className="font-mono text-sm text-white">Project not found.</p>
        </div>
      </div>
    )
  }

  const { title, summary, overview, responsibilities, tech, sections } = project.detail

  return (
    <div className="relative h-full w-full">
      <BackArrow to="/projects" />
      <div className="h-full overflow-y-auto">
        <div className="mx-auto w-full max-w-xl px-6 pt-20 pb-12">
          <h1 className="mb-3 font-mono text-2xl font-bold text-white">{title}</h1>
          {summary && (
            <p className="font-mono text-[11px] leading-relaxed text-white">{summary}</p>
          )}

          <h2 className="mt-12 mb-4 font-mono text-lg font-bold text-white">Project Overview</h2>

          {overview?.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {overview.map((item) => (
                <OverviewCard key={item.label} item={item} />
              ))}
            </div>
          )}

          {responsibilities?.length > 0 && (
            <Card className="mt-3">
              <p className="mb-2 font-mono text-[11px] font-bold text-white">Responsibilities</p>
              <div className="space-y-1 pl-3">
                {responsibilities.map((r) => (
                  <p key={r} className="font-mono text-[11px] leading-relaxed text-white">
                    {r}
                  </p>
                ))}
              </div>
            </Card>
          )}

          {tech?.length > 0 && (
            <Card className="mt-3 mb-8">
              <p className="mb-1 font-mono text-[11px] font-bold text-white">Tech stack</p>
              <p className="font-mono text-[11px] leading-relaxed text-white">
                {tech.join(', ')}
              </p>
            </Card>
          )}

          {sections.map((section) => (
            <Section key={section.title} section={section} />
          ))}
        </div>
      </div>
    </div>
  )
}
