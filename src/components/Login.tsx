import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  // Beobachten des Auth-Status
  useEffect(() => {
    // Prüfe beim Mount, ob bereits eine Session besteht
    (async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user ?? null)
    })()

    // onAuthStateChange hört auf Login/Logout
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => { subscription.unsubscribe() }
  }, [])

  async function handleSendLink(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    if (!email) { setMessage('Bitte E‑Mail eingeben'); return }

    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      console.error('SignIn error', error)
      setMessage('Fehler beim Senden der E‑Mail. Bitte prüfe die Adresse.')
    } else {
      setMessage('E‑Mail gesendet. Öffne dein Postfach und klicke den Link.')
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
    setMessage('Abgemeldet.')
  }

  if (user) {
    return (
      <div style={{ padding: 16 }}>
        <p>Angemeldet als: {user.email}</p>
        <button onClick={handleSignOut}>Abmelden</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Anmelden (Magic Link)</h2>
      <form onSubmit={handleSendLink}>
        <input
          type="email"
          placeholder="deine@email.de"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: 8, width: '100%', maxWidth: 320 }}
        />
        <div style={{ marginTop: 8 }}>
          <button type="submit">Magic Link senden</button>
        </div>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  )
}
