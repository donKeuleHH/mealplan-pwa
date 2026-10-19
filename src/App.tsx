import React from 'react'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? 'NOT_SET'
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'NOT_SET'
const maskedAnon = ANON_KEY === 'NOT_SET' ? 'NOT_SET' : `${ANON_KEY.slice(0,6)}...${ANON_KEY.slice(-4)}`

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>MealPlan PWA — MVP (Debug)</h1>

      <h2>Supabase Config (build-time)</h2>
      <p><strong>SUPABASE_URL:</strong> {SUPABASE_URL}</p>
      <p><strong>SUPABASE_ANON_KEY (masked):</strong> {maskedAnon}</p>

      <p style={{ marginTop: 20 }}>
        Hinweis: Wenn hier „NOT_SET“ erscheint, wurden die VITE_‑Variablen zum Build‑Zeitpunkt nicht verfügbar gemacht.
      </p>
    </div>
  )
}
