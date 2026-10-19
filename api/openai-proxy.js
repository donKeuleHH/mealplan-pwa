import fetch from 'node-fetch'

export default async function handler(req, res) { if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' }) const { prompt } = req.body || {} if (!prompt) return res.status(400).json({ error: 'Missing prompt' })

const OPENAI_API_KEY = process.env.OPENAI_API_KEY if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI key not configured' })

try { const r = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': Bearer ${OPENAI_API_KEY} }, body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }], max_tokens: 400 }) }) const data = await r.json() return res.status(200).json(data) } catch (err) { console.error(err) return res.status(500).json({ error: 'Request failed' }) } }
