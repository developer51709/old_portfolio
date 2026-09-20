import { type FormEvent, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1428012569265787975/X8R8NkFh68wNQJX8qg4eX4FkO5wW1aWQ9hZ5iK7mN2oP3rT6uV8xY0zA1bC4dE5fG6h'

export function Feedback({ visible }: { visible: boolean }) {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const { ref, isVisible } = useScrollReveal()

  if (!visible) return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = message.trim()
    if (!trimmed) {
      setStatus('Please enter a message.')
      return
    }

    setSending(true)
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: trimmed }),
    })
      .then((res) => {
        if (res.ok) {
          setStatus('✓ Feedback sent successfully.')
          setMessage('')
        } else {
          setStatus('✗ Error sending feedback.')
        }
      })
      .catch(() => {
        setStatus('✗ Network error.')
      })
      .finally(() => setSending(false))
  }

  return (
    <div
      ref={ref}
      id="feedback-section"
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
      <h2 className="section-title">Feedback</h2>
      <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>
        Submit a message or suggestion. It will be sent directly to my Discord via webhook.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea
          className="feedback-input"
          rows={4}
          placeholder="Type your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ resize: 'vertical', minHeight: '100px' }}
        />
        <button
          type="submit"
          className="feedback-button"
          disabled={sending}
          style={{ alignSelf: 'flex-start', opacity: sending ? 0.5 : 1 }}
        >
          {sending ? 'Sending...' : 'Send Feedback →'}
        </button>
        {status && (
          <p style={{ fontSize: '0.85rem', color: status.startsWith('✓') ? '#00ff00' : '#ff5555' }}>
            {status}
          </p>
        )}
      </form>
    </div>
  )
}
