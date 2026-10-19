import fetch from 'node-fetch'

export default async function handler(req, res) { if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' }) const { prompt } = req.body || {} if (!prompt) return res.status(400).json({ error: 'Missing prompt' })

const OPENAI_API_KEY = process.env.OPENAI_API_KEY if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI key not configured' })
