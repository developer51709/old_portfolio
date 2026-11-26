export function Footer() {
  return (
    <div className="content footer">
      <div style={{ borderTop: '1px solid rgba(0,255,0,0.15)', paddingTop: '2rem' }}>
        <pre style={{ fontSize: '0.55rem', color: 'rgba(0,255,0,0.15)', lineHeight: '1.2', marginBottom: '1rem', overflow: 'hidden' }}>
{`   ╔══════════════════════════════════════════════════╗
     ║            soren  ·  web developer  ·  builder            ║
     ╚══════════════════════════════════════════════════╝`}
        </pre>
        <p style={{ opacity: 0.4, fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} soren · Built with precision & caffeine
        </p>
      </div>
    </div>
  )
}
