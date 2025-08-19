import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Home() {
  const [open, setOpen] = useState(false)
  const [chat, setChat] = useState([{ role: 'assistant', content: '👋 Hi, I’m Carys. How can I help today?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    const text = input.trim()
    if (!text) return
    const next = [...chat, { role: 'user', content: text }]
    setChat(next); setInput(''); setLoading(true)
    try {
      const { data } = await axios.post('/api/chat', { messages: next.slice(-12) })
      setChat([...next, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setChat([...next, { role: 'assistant', content: 'To enable live replies, add OPENAI_API_KEY in Vercel → Settings → Environment Variables and redeploy.' }])
    } finally {
      setLoading(false)
    }
  }

  const subscribe = () => {
    window.location.href = 'https://buy.stripe.com/test_aEUeXgcOz0s6dOceUU'
  }

  return (
    <>
      <nav className="container nav">
        <div className="brand">
          <img src="/logo.svg" alt="HelpHub24/7 logo" />
          <strong>HelpHub24/7</strong>
        </div>
        <div className="link-row">
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <button className="cta-btn" onClick={subscribe}>Subscribe £9.99</button>
        </div>
      </nav>

      <header className="container hero">
        <span className="badge">UK-based | 24/7</span>
        <h1 className="h-title">Your AI Helpline, Anytime, Anywhere</h1>
        <p className="h-sub">Get instant support with <b>Carys</b> (Conversational Assistant for Responsive Yielding Solutions). Always-on help for life, work, and wellbeing — all for a simple £9.99/month.</p>
        <div className="actions">
          <button className="primary" onClick={subscribe}>Start for £9.99/month</button>
          <a className="secondary" href="#features">See how it works</a>
        </div>
      </header>

      <section id="features" className="container section">
        <div className="grid">
          <div className="card">
            <h4>🔒 Private & Secure</h4>
            <p>Your conversations stay between you and Carys. No selling data, ever.</p>
          </div>
          <div className="card">
            <h4>🕒 24/7 Availability</h4>
            <p>Day or night, Carys is ready to help — no waiting rooms, no queues.</p>
          </div>
          <div className="card">
            <h4>🤖 AI-Powered Guidance</h4>
            <p>Practical, friendly answers tailored to your needs, in seconds.</p>
          </div>
          <div className="card">
            <h4>💷 Simple Pricing</h4>
            <p>Unlimited access for just £9.99/month. Cancel anytime.</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="container section">
        <h3 style={{marginBottom:12}}>Choose your plan</h3>
        <div className="pricing">
          <div className="pricecard">
            <div className="price">£9.99<span className="muted">/mo</span></div>
            <p className="muted">Unlimited chat with Carys, priority responses, and early features.</p>
            <button className="primary" onClick={subscribe}>Subscribe Now</button>
          </div>
          <div className="pricecard">
            <div className="price">Free</div>
            <p className="muted">Limited preview. Try the chat with short sessions.</p>
            <a className="secondary" href="#chat">Try Preview</a>
          </div>
          <div className="pricecard">
            <div className="price">£99<span className="muted">/yr</span></div>
            <p className="muted">Two months free. Best for committed users.</p>
            <button className="primary" onClick={subscribe}>Go Annual</button>
          </div>
        </div>
      </section>

      <footer className="container">
        <footer>
          © 2025 HelpHub24/7 · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link>
        </footer>
      </footer>

      {/* Chat widget */}
      <button className="chat-fab" onClick={()=>setOpen(!open)}>💬</button>
      <div className={`widget ${open ? 'open' : ''}`}>
        <div className="w-header">
          <div className="w-title">Carys — HelpHub24/7</div>
          <button className="secondary" onClick={()=>setOpen(false)}>Close</button>
        </div>
        <div className="w-body" id="chat">
          {chat.map((m, i) => (
            <div key={i} className={`msg ${m.role === 'user' ? 'user' : 'bot'}`}>{m.content}</div>
          ))}
          {loading && <div className="msg bot">Carys is typing…</div>}
        </div>
        <div className="w-input">
          <input className="w-text" value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask Carys…" onKeyDown={e=>{ if(e.key==='Enter') send() }} />
          <button className="w-send" onClick={send}>Send</button>
        </div>
      </div>
    </>
  )
}
