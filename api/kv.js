import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const key = req.query.key;
      if (!key) return res.status(400).json({ error: 'key is required' });
      const value = await kv.get(key);
      return res.status(200).json({ value: value === undefined ? null : value });
    }

    if (req.method === 'POST') {
      const { key, value } = req.body || {};
      if (!key) return res.status(400).json({ error: 'key is required' });
      await kv.set(key, value);
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      const key = req.query.key;
      if (!key) return res.status(400).json({ error: 'key is required' });
      await kv.del(key);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('KV API error:', err);
    return res.status(500).json({ error: String((err && err.message) || err) });
  }
}
