export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    res.status(200).json({ result: `You said: ${prompt}` });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}