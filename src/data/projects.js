// Single source of truth for projects. To add a project, add an entry here.
//  - External-only project: { name, tagline, href, external: true }
//  - Project with a detail page: add `slug` + a `detail` block; the /projects/:slug
//    route and the generic ProjectDetail renderer pick it up automatically.
//
// A `detail` block may include: title, summary, overview (cards: { label, value, href? }),
// responsibilities (string[]), tech (string[]), and sections. A `section` may have
// `body` (paragraph), `bullets` (string[]), and/or `subsections` (each { title, bullets }).
export const PROJECTS = [
  {
    name: 'Smashspeed.ai',
    tagline:
      'AI-powered shuttlecock speed tracker for badminton. 50,000+ downloads on iOS & Android. Built with a YOLOv5 model and Kalman-filter trajectory tracking, running fully on-device.',
    href: 'https://smashspeed.ca',
    external: true,
  },
  {
    slug: 'furious-frogs',
    name: 'Furious Frogs',
    tagline:
      'Competitive robotics programming for FIRST Technology Challenge. Lead programmer of FTC #26025 Furious Frogs, currently #1 in Canada. World Championship qualification for 2025–26 season.',
    detail: {
      title: 'Furious Frogs FTC Robotics',
      summary:
        'FIRST Tech Challenge is a global student robotics competition where teams design, build, and program a robot to autonomously navigate the field, manipulate game elements, and go head-to-head each season.',
      overview: [
        { label: 'Role', value: 'Lead Programmer' },
        { label: 'Rank', value: '#1 in Canada' },
        { label: 'Duration', value: 'Sept 2024 – May 2026' },
        { label: 'Website', value: 'furiousfrogs.org', href: 'https://furiousfrogs.org' },
      ],
      responsibilities: [
        'Autonomous Programming',
        'Computer Vision',
        'Sensor Fusion & Localization',
        'Control Systems & Tuning',
        'Software Architecture',
      ],
      tech: [
        'Java',
        'Android Studio',
        'FTC SDK',
        'OpenCV',
        'PedroPathing',
        'FTC Dashboard',
        'Git',
        'Kalman Filtering',
        'Motion Profiling',
        'Odometry',
      ],
      sections: [
        {
          title: 'The Journey',
          body: "What started as curiosity about robotics turned into leading the software development for Canada's top-ranked FIRST Tech Challenge team. As Lead Programmer, I architected our robot's autonomous systems, subsystem controls, and computer vision — code that needed to perform flawlessly in high-stakes competition environments.",
        },
        {
          title: 'Technical Highlights',
          subsections: [
            {
              title: 'Autonomous Pathing & Localization',
              bullets: [
                'Implemented motion profiling libraries with custom odometry integration for precise path following',
                'Developed Kalman filter fusion combining wheel odometry and camera-based AprilTag detection for robust localization even when sensors disagreed',
                'Built fail-safe state machines to handle unpredictable competition conditions (alliance partners blocking paths, field variations)',
              ],
            },
            {
              title: 'Computer Vision',
              bullets: [
                'Created real-time ball tracking using HSV color filtering and OpenCV contour detection',
                'Engineered adaptive thresholding to handle inconsistent arena lighting between venues',
                'Integrated vision targets directly into autonomous decision-making for dynamic gameplay',
              ],
            },
            {
              title: 'System Architecture',
              bullets: [
                'Designed subsystem controls using state machines to manage complex parallel actions (intake running while arm positions, drivetrain navigating)',
                'Leveraged FTC libraries (PedroPathing, FTC Dashboard) while extending them for team-specific needs',
                'Wrote modular, maintainable Java in Android Studio for rapid iteration during build season',
              ],
            },
            {
              title: 'Control Systems & Tuning',
              bullets: [
                'Tuned PIDF controllers across the drivetrain and subsystems, balancing responsiveness against overshoot and oscillation',
                'Worked through derivative error, integral windup, and feedforward to turn textbook control theory into reliable on-field behavior',
                'Compensated for sensor noise, latency, and mechanical slop that never show up in simulation',
              ],
            },
          ],
        },
        {
          title: 'Impact',
          bullets: [
            '#1 ranked team in Canada for the 2025–26 season',
            'Peak ranking of #2 in the world during the season',
            '18th in the world at the FIRST Championship, competing against 5,000+ international teams',
            'Provincial finalist in our rookie competitive season',
            'Autonomous routines scoring within ±2cm accuracy across 100+ competition matches',
            'Mentored and inspired emerging school robotics teams, passing on engineering and software practices',
          ],
        },
        {
          title: 'Awards',
          bullets: [
            'Design Award',
            'Think Award',
            'BC Championship — Winning Alliance',
            'BC Qualifier — Winning Alliance',
            'BC Championship — Finalist Alliance Captain',
          ],
        },
        {
          title: 'What I Learned',
          body: 'Building competition robotics taught me that elegant code means nothing if it fails under pressure. I learned to balance theoretical correctness (Kalman filtering, motion profiling) with practical reliability (graceful sensor failures, conservative timeouts). Working at the hardware-software interface — debugging why a servo stutters or why odometry drifts — gave me a deep appreciation for how software constraints emerge from physical systems.',
        },
      ],
    },
  },
]

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug)
}
