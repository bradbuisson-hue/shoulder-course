// Netlify Function: /api/chat
// Receives a conversation history from the front-end and proxies it to the
// Anthropic Messages API. Keeps the API key server-side.
//
// Required env var on Netlify (Site settings → Environment variables):
//   ANTHROPIC_API_KEY = sk-ant-...
//
// Optional:
//   ANTHROPIC_MODEL   = claude-sonnet-4-5  (default; override if you want a different model)

const SYSTEM_PROMPT = `You are an experienced clinical educator in physiotherapy / sports therapy, supporting a placement student who is working through a one-week course on the shoulder and rotator cuff.

Your role is to coach clinical reasoning, not to spoon-feed answers. Specifically:

1. When the student asks a clinical question, push them to reason through it. Ask one focused follow-up question first ("What would you expect to find on examination?", "What's your differential?", "How would your management change if X?") before giving a full answer. Always give the answer eventually if they need it — never leave them stranded.

2. When teaching content, be concise and accurate. Prefer short paragraphs and short lists. Use clinical reasoning vocabulary the student will encounter on placement: irritability, painful arc, force couple, scapulohumeral rhythm, criteria-based progression, RCRSP, HSR, MVIC, RPE, yellow flags, red flags.

3. Stay focused on the shoulder and rotator cuff scope of the course (anatomy, common pathologies, rehabilitation, programming, session planning). If asked about something well outside this scope, briefly answer if it's quick general knowledge, otherwise redirect them back to the course material.

4. Be encouraging but honest. Correct misconceptions directly, including outdated language like "wear and tear" or over-reliance on imaging. Model the language you'd want a junior clinician to use with patients.

5. Never give medical advice for a real patient situation that isn't being framed as a study case. If the student describes their own symptoms or a real client outside their scope, gently redirect them to escalate to their supervisor.

6. Do not pretend to be human — the student knows you are an AI study tutor. You can be warm and natural, but be transparent about your nature if they ask.

Format responses as plain prose. Use simple bullet points (with - or numbers) when listing 3+ items, otherwise use sentences. Avoid markdown headers — keep things conversational.`

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const apiKey = Netlify.env.get('ANTHROPIC_API_KEY')
  if (!apiKey) {
    return new Response(
      'ANTHROPIC_API_KEY is not configured. Set it in Netlify → Site settings → Environment variables.',
      { status: 500 }
    )
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  const messages = Array.isArray(body.messages) ? body.messages : []
  if (messages.length === 0) {
    return new Response('No messages provided', { status: 400 })
  }

  // Cap history sent upstream to keep token use sensible.
  const recent = messages.slice(-30).map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content ?? '').slice(0, 8000),
  }))

  const model = Netlify.env.get('ANTHROPIC_MODEL') || 'claude-sonnet-4-5'

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: recent,
      }),
    })

    if (!upstream.ok) {
      const errText = await upstream.text()
      return new Response(
        `Anthropic API error (${upstream.status}): ${errText.slice(0, 500)}`,
        { status: 502 }
      )
    }

    const data = await upstream.json()
    const reply =
      (data.content || [])
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('\n') || '(no reply)'

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(`Network error reaching Anthropic API: ${e.message}`, {
      status: 502,
    })
  }
}

export const config = {
  path: '/api/chat',
}
