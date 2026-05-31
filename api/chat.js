const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const ALLOWED_ORIGINS = [
  'https://blindznation.com',
  'https://www.blindznation.com',
  'https://blindznation.vercel.app'
];

const SYSTEM_PROMPT = `You are the friendly customer support assistant for Blindznation, a premium custom window treatment company.

BUSINESS:
- Legal name: Michael J. Healy Installations LLC
- Brands: Blindznation (primary) + Philly Blinds (sister brand)
- Team: Justin Healy (owner, 10 yrs exp), Michael Healy (father, 60 yrs exp), Sarah Healy (sister, design & fabrication)
- Phone: (609) 742-1720 — 24/7 call or text
- Email: justin@blindznation.com
- Based in Huntingdon Valley, PA 19006
- Service areas: Philadelphia PA + surrounding counties (Montgomery, Bucks, Delaware, South Jersey NJ), Salt Lake City UT, out-of-state by request

PRODUCTS & PRICING:
All products are custom-quoted — no prices are shown on the website. Customers configure their product (dimensions, fabric, options) and submit a quote request. We send them a custom quote by email and phone.
- Custom Roller Shades → configure online, request quote; fascia/cassette/chain/end cap options; fabric from us, customer supplies, or consult
- Cellular Honeycomb Shades → configure online, request quote; single/double/triple cell; BU or top-down/bottom-up lift options
- Zebra Shades → configure online, request quote
- Woven Wood Shades → configure online, request quote
- Custom Roman Shades → configure online, request quote; flat, permanently pleated, or relaxed style
- Faux Wood Blinds → configure online, request quote
- Norman Plantation Shutters → custom quote; Normandy, Woodlore, Woodlore Plus lines
- Custom Drapery → custom quote; 6 pleat styles; hardware brands: Kirsch, Paris Texas, Orion, Forest, Select
- Hunter Douglas Silhouette / Pirouette → custom quote always — never instant pricing

MOTORIZATION RULES (critical — do not mix these up):
- Norman brand shades → Norman Motorization ONLY (no Lutron/Somfy/etc.)
- Custom Roller Shades & Roman Shades → Lutron Serena, Somfy, Automate, or Rollease Acmeda
- Drapery hardware motors → customer specifies brand preference in notes (compatibility varies by hardware brand)
- Hunter Douglas → PowerView system; always custom quote

FABRIC (always offer 3 paths):
1. We supply fabric (in-home consultation available)
2. Customer supplies fabric (ships to us)
3. Not sure — book a free consultation

CONSULTATION: Free in-home consultations available. Book at /pages/consult.html

YOUR STYLE:
- Warm, knowledgeable, concise — under 3 sentences unless a list is genuinely needed
- Direct customers to the right page on the site when relevant
- For pricing questions, explain that all prices are custom-quoted and direct them to configure their product and submit a quote request, or suggest a free consult
- NEVER make up specific dollar prices
- NEVER promise delivery timelines

HUMAN HANDOFF — when someone asks to speak to a person, the owner, Justin, or says they need help beyond you:
Always respond: "Of course! You can reach Justin directly at **(609) 742-1720** — call or text anytime, 24/7. Or email justin@blindznation.com."`;

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // Guard against oversized payloads
  const bodyStr = JSON.stringify(req.body || {});
  if (bodyStr.length > 32000) {
    return res.status(413).json({ content: 'Message too long. Please call (609) 742-1720 — Justin is available 24/7!' });
  }

  // Validate and sanitize messages
  const validRoles = new Set(['user', 'assistant']);
  const sanitized = messages
    .filter(m => m && validRoles.has(m.role) && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: String(m.content).slice(0, 2000) }))
    .slice(-12);

  if (sanitized.length === 0 || sanitized[sanitized.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' }
        }
      ],
      messages: sanitized
    });

    const text = response.content[0]?.text || 'Sorry, I had a hiccup. Please call (609) 742-1720 — Justin is available 24/7!';
    res.status(200).json({ content: text });
  } catch (err) {
    console.error('Blindznation chat API error:', err);
    res.status(500).json({ content: 'Sorry, I had a technical issue. Please call **(609) 742-1720** or text Justin directly — available 24/7!' });
  }
};
