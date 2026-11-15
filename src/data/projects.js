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
      'AI-powered shuttlecock speed tracker for badminton. 83,000+ users across 130 countries on iOS & Android. Built in React Native with a custom GridTrackNet model running fully on-device.',
    href: 'https://smashspeed.ca',
    external: true,
  },
  {
    slug: 'furious-frogs',
    name: 'Furious Frogs',
    tagline:
      'Competitive robotics programming for FIRST Technology Challenge. Lead programmer of FTC #26025 Furious Frogs, which went from rookies to #1 in Canada in two years and qualified for the 2025–26 World Championship.',
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
  {
    slug: 'illinois-eats',
    name: 'IllinoisEats',
    tagline:
      'Pairwise restaurant ranker for the UIUC campus. Pick between two places and Glicko-1 ratings build a live campus leaderboard. Built in TypeScript and React on Firebase, with 137 tests behind it.',
    detail: {
      title: 'IllinoisEats',
      summary:
        'A phone-first web app that ranks the restaurants around the University of Illinois campus from head-to-head votes. Instead of star ratings, you answer one question over and over: "Where would you rather go?" Every pick updates chess-style ratings, and together they form a single campus leaderboard.',
      overview: [
        { label: 'Role', value: 'Solo Developer' },
        { label: 'Status', value: 'Live, pre-launch' },
        { label: 'Duration', value: 'Oct 2026 – Present' },
        {
          label: 'Website',
          value: 'illinoiseats-a9bd8.web.app',
          href: 'https://illinoiseats-a9bd8.web.app',
        },
      ],
      responsibilities: [
        'Product Design',
        'Full-Stack Development',
        'Rating & Matchmaking Algorithms',
        'Database Security',
        'Testing & QA',
      ],
      tech: [
        'TypeScript',
        'React',
        'Vite',
        'Firebase (Firestore, Auth, Hosting)',
        'Firestore Security Rules',
        'Vitest',
        'Testing Library',
        'Glicko-1',
        'oxlint',
        'Prettier',
      ],
      sections: [
        {
          title: 'The Idea',
          body: "There are plenty of workout trackers already, so I wanted to build something new and specific to my community. Star ratings bunch every restaurant between 4.0 and 4.7 and measure everyone, not students. IllinoisEats asks students to compare two places they actually know, the way chess or Valorant ranks players, and turns those picks into a ranking of the 97 restaurants within about a mile of the Main Quad.",
        },
        {
          title: 'Technical Highlights',
          subsections: [
            {
              title: 'Ratings & Matchmaking',
              bullets: [
                'Glicko-1 ratings (Elo plus a per-restaurant uncertainty) so new places move fast and established ones settle, with an uncertainty floor so ratings never freeze',
                'After each pick, reveals the predicted win percentage for both sides, like a red-vs-blue game',
                'Ladder matchmaking: the winner holds its side while challengers climb from below it, with a warm-up that gives unranked places priority',
                'Ratings are replayed from a stored vote history, which makes resets and removing a single voter exact',
              ],
            },
            {
              title: 'Serverless Backend & Security',
              bullets: [
                "Runs entirely on Firebase's free plan with no server code: ratings are computed in the voter's browser inside a Firestore transaction",
                'Firestore security rules act as the server: one vote per person per pair, bounded rating changes, the winner must go up and the loser down',
                'Google sign-in to vote (anonymous accounts upgrade in place, so earlier votes carry over); anyone can browse',
                'Kept reads within the free daily quota by loading rating history once per visit',
              ],
            },
            {
              title: 'Personalization',
              bullets: [
                "Personal rankings that run the same Glicko math on only your own votes",
                'Refine matchups: one pair in every three is chosen to sharpen your own rankings most, scored by p(1 − p) × (RD₁² + RD₂²)',
                '"You should go here" recommendations from campus ratings plus a learned cuisine lean',
                'Taste match on a Contrarian / Balanced / Mainstream scale, 20 badges, and a want-to-go list',
              ],
            },
            {
              title: 'Moderation & Transparency',
              bullets: [
                'Hidden admin page to delete reviews, reset rankings, remove one voter and recompute every rating, and create or edit badges',
                'A public Technical page explains Glicko-1, matchmaking and recommendations with worked examples computed by the app’s own code, plus a sortable data table with rating sparklines',
                'Practice mode keeps everything in memory with 700 simulated votes, so features can be tested without touching real data',
              ],
            },
          ],
        },
        {
          title: 'By the Numbers',
          bullets: [
            '97 restaurants, each checked by hand on Google Maps and against local news for recent openings and closings',
            '11 cuisine categories, with category leaderboards that rank each one on its own',
            '137 automated tests covering the rating math, matchmaking, standings, recommendations, badges and main screens',
            'About 7,000 lines of TypeScript, built and deployed in five weeks',
            'No real users yet: the full architecture is live, and a seed session with friends comes before sharing it with classmates',
          ],
        },
        {
          title: 'What I Learned',
          body: 'Building without a server meant the database rules were the only thing standing between the app and a cheater, so I had to think about every write as an attack. I also learned that most bugs live where features meet: a new matchup type quietly broke review streaks, and a reset on a new device could wipe votes. Writing a regression test for each of those made it safe to keep adding features.',
        },
      ],
    },
  },
]

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug)
}
