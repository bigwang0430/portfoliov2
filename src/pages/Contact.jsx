import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import BackArrow from '../components/BackArrow'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/bigwang0430', Icon: FaGithub },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/andy-wang-994397301',
    Icon: FaLinkedin,
  },
  { label: 'Instagram', href: 'https://www.instagram.com/_.andywang._', Icon: FaInstagram },
  {
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&to=fengyaoandy@gmail.com',
    Icon: FaEnvelope,
  },
]

export default function Contact() {
  return (
    <div className="relative h-full w-full">
      <BackArrow />
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-6 text-center">
        <h1 className="font-mono text-sm font-bold text-white">AVAILABLE FOR WORK</h1>
        <div className="grid grid-cols-2 gap-x-12 gap-y-8">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex items-center justify-center text-white transition-colors hover:text-accent"
            >
              <social.Icon size={28} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
