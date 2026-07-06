export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  console.log('Compagro event from n8n:', JSON.stringify(req.body, null, 2))

  return res.status(200).json({
    ok: true,
    message: 'Evento recibido. Para persistir en la página se necesita guardar en base de datos o una API con almacenamiento.',
    received: req.body,
  })
}
