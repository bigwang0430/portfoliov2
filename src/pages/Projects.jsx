import BackArrow from '../components/BackArrow'
import ProjectEntry from '../components/ProjectEntry'
import { PROJECTS } from '../data/projects'

export default function Projects() {
  return (
    <div className="relative h-full w-full">
      <BackArrow />
      <div className="mx-auto flex h-full w-full max-w-xl flex-col justify-center gap-8 px-6">
        <h1 className="font-mono text-lg font-bold text-accent">projects</h1>
        <div className="flex flex-col gap-6">
          {PROJECTS.map((project) => (
            <ProjectEntry key={project.name} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
