import { type KeyboardEvent, useRef, useEffect, useState } from 'react'

interface TerminalProps {
  onCommand: (command: string) => string
}

const COMMANDS = ['help', 'about', 'projects', 'contact', 'feedback', 'clear', 'skills', 'age', 'echo', 'whoami', 'date', 'ls', 'neofetch', 'matrix']

const WELCOME_LINES = [
  { color: '#00ff00', text: `Last login: ${new Date().toUTCString()} on ttys000` },
  { color: '#00ff00', text: 'Welcome to soren\'s terminal.' },
  { color: '#00ff00', text: 'Type ' },
  { color: 'cyan', text: 'help' },
  { color: '#00ff00', text: ' for available commands. Tab to autocomplete.' },
]

export function Terminal({ onCommand }: TerminalProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const bannerShown = useRef(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    if (!bannerShown.current && outputRef.current) {
      let bannerHtml = '<div>'
      WELCOME_LINES.forEach((line) => {
        bannerHtml += `<span style="color:${line.color};">${line.text}</span>`
      })
      bannerHtml += '</div><br>'
      outputRef.current.innerHTML = bannerHtml
      bannerShown.current = true
    }
  }, [])

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const input = inputRef.current
      if (!input) return

      const command = input.value.trim()
      input.value = ''

      if (!command) return

      // Add to history
      setHistory((prev) => [...prev, command])
      setHistoryIndex(-1)

      if (command === 'clear') {
        if (outputRef.current) outputRef.current.innerHTML = ''
        return
      }

      const response = onCommand(command)

      if (outputRef.current) {
        const html = response.replace(/\n/g, '<br>')
        outputRef.current.innerHTML += `<div style="margin-bottom:0.75rem;"><span style="color:#00ff00;">➜ </span><span style="color:#e0e0e0;">~</span> <span style="color:white;">${escapeHtml(command)}</span><br><span style="opacity:0.9;">${html}</span></div>`
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(newIndex)
      if (inputRef.current) {
        inputRef.current.value = history[newIndex]
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const newIndex = historyIndex + 1
      if (newIndex >= history.length) {
        setHistoryIndex(-1)
        if (inputRef.current) inputRef.current.value = ''
      } else {
        setHistoryIndex(newIndex)
        if (inputRef.current) inputRef.current.value = history[newIndex]
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (inputRef.current) {
        const val = inputRef.current.value.toLowerCase().trim()
        if (val) {
          const match = COMMANDS.find((c) => c.startsWith(val) && c !== val)
          if (match) {
            inputRef.current.value = match
          }
        }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      if (outputRef.current) outputRef.current.innerHTML = ''
    }
  }

  return (
    <div className="content scroll-reveal" style={{ marginTop: '2rem' }}>
      <h2 className="section-title">Terminal</h2>
      <div className="terminal-window">
        {/* Title bar */}
        <div className="terminal-titlebar">
          <span className="terminal-dot" style={{ backgroundColor: '#ff5f57' }} />
          <span className="terminal-dot" style={{ backgroundColor: '#febc2e' }} />
          <span className="terminal-dot" style={{ backgroundColor: '#28c840' }} />
          <span className="terminal-titlebar-text">soren — bash</span>
        </div>
        {/* Output area */}
        <div ref={outputRef} className="terminal-output" />
        {/* Input area */}
        <div className="terminal-input-row">
          <span className="terminal-prompt">➜ <span style={{ color: '#6ee7b7' }}>~</span> </span>
          <input
            ref={inputRef}
            className="terminal-input"
            type="text"
            placeholder=""
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
      <p style={{ fontSize: '0.75rem', opacity: 0.4, marginTop: '0.5rem', textAlign: 'center' }}>
        ↑↓ history · Tab autocomplete · Ctrl+L clear
      </p>
    </div>
  )
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
