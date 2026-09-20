import { useState, useCallback, useEffect } from 'react'
import { MatrixRain } from './components/MatrixRain'
import { CrtOverlay } from './components/CrtOverlay'
import { BootSequence } from './components/BootSequence'
import { Hero } from './components/Hero'
import { Terminal } from './components/Terminal'
import { Projects } from './components/Projects'
import { Feedback } from './components/Feedback'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { getAge } from './utils/age'

const HELP_TEXT = `<span style="color:#00ff00;">Available commands:</span>

  <span style="color:cyan;">help</span>       — show this message
  <span style="color:cyan;">about</span>      — who I am
  <span style="color:cyan;">projects</span>   — list my projects
  <span style="color:cyan;">contact</span>    — reach me
  <span style="color:cyan;">feedback</span>   — toggle the feedback form
  <span style="color:cyan;">skills</span>     — my technical skills
  <span style="color:cyan;">age</span>        — how old I am
  <span style="color:cyan;">whoami</span>     — identity check
  <span style="color:cyan;">date</span>       — current date & time
  <span style="color:cyan;">ls</span>         — list projects directory
  <span style="color:cyan;">neofetch</span>   — system info
  <span style="color:cyan;">echo</span> &lt;msg&gt; — echo a message
  <span style="color:cyan;">matrix</span>     — toggle the matrix rain
  <span style="color:cyan;">clear</span>      — clear the terminal

  <span style="color:rgba(255,255,255,0.3);">↑↓ history · Tab autocomplete · Ctrl+L clear</span>`

function buildAboutText(): string {
  const age = getAge()
  return `<span style="color:#00ff00;">▸ soren</span>
  Age:      ${age}
  Location: United States
  Focus:    Full-stack development, AI integrations, backend systems

  I build modern web and bot experiences — exploring clean design,
  smooth interactions, and creative development. My work spans the
  full stack: backends, AI integrations, and polished frontends.

  I enjoy solving complex problems with clean, maintainable code and
  building products that are both functional and well-designed.`
}

const CONTACT_TEXT = `<span style="color:#00ff00;">▸ Contact Information</span>

  Discord:  sorenthedev
  Email:    developer51709@proton.me
  GitHub:   <a href="https://github.com/developer51709" target="_blank" rel="noopener noreferrer" class="glitch" style="color:cyan;">github.com/developer51709</a>
  YouTube:  <a href="https://youtube.com/@sorenthedev" target="_blank" rel="noopener noreferrer" class="glitch" style="color:cyan;">@sorenthedev</a>
  Bluesky:  <a href="https://bsky.app/profile/sorenthedev.bsky.social" target="_blank" rel="noopener noreferrer" class="glitch" style="color:cyan;">sorenthedev.bsky.social</a>
  TikTok:   <a href="https://tiktok.com/@sorenthedev" target="_blank" rel="noopener noreferrer" class="glitch" style="color:cyan;">@sorenthedev</a>
  Twitch:   <a href="https://twitch.tv/sorenthedev" target="_blank" rel="noopener noreferrer" class="glitch" style="color:cyan;">sorenthedev</a>`

const SKILLS_TEXT = `<span style="color:#00ff00;">▸ Technical Skills</span>

  <span style="color:cyan;">Languages:</span>    PHP, JavaScript, Python, TypeScript
  <span style="color:cyan;">Frontend:</span>     React, HTML/CSS, Tailwind
  <span style="color:cyan;">Backend:</span>       Node.js, Laravel, Nest.js, REST APIs
  <span style="color:cyan;">Databases:</span>    MySQL, PostgreSQL
  <span style="color:cyan;">DevOps:</span>       Git, Docker
  <span style="color:cyan;">AI:</span>            AI integrations, prompt engineering, LLM tooling
  <span style="color:cyan;">Other:</span>         Discord bots, workflow automation, web design, PHPUnit`

const NEOFETCH_TEXT = `<span style="color:#00ff00;">       .--.        </span>  <span style="color:cyan;">soren</span>@<span style="color:cyan;">portfolio</span>
<span style="color:#00ff00;">      |o_o |       </span>  ─────────────────────
<span style="color:#00ff00;">      |:_/ |       </span>  <span style="color:cyan;">OS:</span>      Web Browser
<span style="color:#00ff00;">     //   \\\\ \\\\      </span>  <span style="color:cyan;">Host:</span>    sorenthedev.indevs.in
<span style="color:#00ff00;">    (|     | )     </span>  <span style="color:cyan;">Kernel:</span>  React 18 + TypeScript
<span style="color:#00ff00;">   /'\\\\_   _/\\\`\\\\    </span>  <span style="color:cyan;">Shell:</span>   Portfolio Terminal v2.0
<span style="color:#00ff00;">   \\\\___)=(___/    </span>  <span style="color:cyan;">DE:</span>       Matrix Rain + CRT
                   <span style="color:cyan;">Theme:</span>    Cyberpunk Green
                   <span style="color:cyan;">Uptime:</span>   since you loaded this page`

function App() {
  const [booted, setBooted] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [matrixVisible, setMatrixVisible] = useState(true)
  const [easterEgg, setEasterEgg] = useState(false)

  // Konami code easter egg
  useEffect(() => {
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let buffer: string[] = []

    function handleKey(e: KeyboardEvent) {
      buffer.push(e.key)
      if (buffer.length > KONAMI.length) buffer = buffer.slice(-KONAMI.length)
      if (buffer.join(',') === KONAMI.join(',')) {
        setEasterEgg(true)
        buffer = []
        setTimeout(() => setEasterEgg(false), 5000)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleCommand = useCallback((input: string): string => {
    const cmd = input.toLowerCase().trim()

    if (cmd === 'help') return HELP_TEXT
    if (cmd === 'about') return buildAboutText()
    if (cmd === 'contact') return CONTACT_TEXT
    if (cmd === 'skills') return SKILLS_TEXT
    if (cmd === 'age') return `I'm ${getAge()} years old.`
    if (cmd === 'whoami') return '<span style="color:#00ff00;">soren</span> — full-stack developer, AI integrations, creative coder.'
    if (cmd === 'date') return `<span style="color:#e0e0e0;">${new Date().toString()}</span>`
    if (cmd === 'ls') return '<span style="color:cyan;">Linavo/</span>  <span style="color:cyan;">Niko/</span>  <span style="color:rgba(255,255,255,0.3);">portfolio/</span>'
    if (cmd === 'neofetch') return NEOFETCH_TEXT
    if (cmd === 'matrix') {
      setMatrixVisible((prev) => !prev)
      return matrixVisible
        ? '<span style="color:yellow;">Matrix rain disabled.</span>'
        : '<span style="color:yellow;">Matrix rain enabled.</span>'
    }
    if (cmd.startsWith('echo ')) return `<span style="color:#e0e0e0;">${escapeHtmlStr(input.slice(5))}</span>`

    if (cmd === 'projects') {
      setShowProjects((prev) => !prev)
      return showProjects
        ? '<span style="color:yellow;">Hiding project cards.</span>'
        : '<span style="color:yellow;">Displaying project cards below.</span>'
    }

    if (cmd === 'feedback') {
      setShowFeedback((prev) => !prev)
      return showFeedback
        ? '<span style="color:yellow;">Hiding feedback form.</span>'
        : '<span style="color:yellow;">Feedback form activated.</span> Scroll down to submit.'
    }

    return `<span style="color:#ff5555;">command not found: ${escapeHtmlStr(input)}</span>\nType <span style="color:cyan;">help</span> for available commands.`
  }, [showProjects, showFeedback, matrixVisible])

  return (
    <>
      {matrixVisible && <MatrixRain />}
      {easterEgg && <div className="easter-egg-overlay" aria-hidden="true" />}
      <CrtOverlay />

      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: booted ? 1 : 0,
          transition: 'opacity 0.8s ease-in',
        }}
      >
        <Hero />
        <Terminal onCommand={handleCommand} />
        <Projects visible={showProjects} />
        <Contact />
        <Feedback visible={showFeedback} />
        <Footer />
      </div>
    </>
  )
}

function escapeHtmlStr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default App
