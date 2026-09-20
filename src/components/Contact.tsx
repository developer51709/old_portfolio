import { useScrollReveal } from '../hooks/useScrollReveal'
import { PixelIcon, type PixelIconName } from './PixelIcon'

interface ContactLink {
  label: string
  value: string
  icon: PixelIconName
  href?: string
}

const CONTACT_LINKS: ContactLink[] = [
  { label: 'Discord', value: 'sorenthedev', icon: 'discord' },
  { label: 'Email', value: 'developer51709@proton.me', icon: 'envelope', href: 'mailto:developer51709@proton.me' },
  { label: 'GitHub', value: 'github.com/developer51709', icon: 'github', href: 'https://github.com/developer51709' },
  { label: 'YouTube', value: '@sorenthedev', icon: 'youtube', href: 'https://youtube.com/@sorenthedev' },
  { label: 'Bluesky', value: 'sorenthedev.bsky.social', icon: 'bluesky', href: 'https://bsky.app/profile/sorenthedev.bsky.social' },
  { label: 'TikTok', value: '@sorenthedev', icon: 'tiktok', href: 'https://tiktok.com/@sorenthedev' },
  { label: 'Twitch', value: 'sorenthedev', icon: 'twitch', href: 'https://twitch.tv/sorenthedev' },
  { label: 'Threads', value: '@sorenthedev', icon: 'threads', href: 'https://threads.net/@sorenthedev' },
  { label: 'Dev.to', value: 'developer51709', icon: 'globe', href: 'https://dev.to/developer51709' },
]

export function Contact() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className="content scroll-reveal"
      style={{
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(0,255,0,0.2)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      <h2 className="section-title">Contact Me</h2>
      <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>
        Feel free to reach out — I'm always open to conversations about tech, projects, or collaboration.
      </p>
      <div className="contact-grid">
        {CONTACT_LINKS.map((link) => (
          <ContactCard key={link.label} {...link} />
        ))}
      </div>
    </div>
  )
}

function ContactCard({ label, value, icon, href }: ContactCardProps) {
  const content = (
    <div className="contact-card">
      <PixelIcon name={icon} size={28} style={{ color: '#00ff00', flexShrink: 0 }} />
      <div>
        <div style={{ color: 'rgba(0,255,0,0.5)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          {label}
        </div>
        <div style={{ color: '#e0e0e0', fontSize: '0.9rem', wordBreak: 'break-all' }}>
          {value}
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-card-link"
      >
        {content}
      </a>
    )
  }

  return content
}

interface ContactCardProps {
  label: string
  value: string
  icon: PixelIconName
  href?: string
}
