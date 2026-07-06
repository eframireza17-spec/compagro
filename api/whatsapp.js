async function sendWhatsAppMessage(to, text) {
  const url = `https://graph.facebook.com/v25.0/${process.env.META_PHONE_NUMBER_ID}/messages`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.META_WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: {
        body: text,
      },
    }),
  })

  const data = await response.json()
  console.log('WHATSAPP SEND STATUS:', response.status)
  console.log('WHATSAPP SEND DATA:', JSON.stringify(data, null, 2))

  return data
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const mode = req.query['hub.mode']
      const token = req.query['hub.verify_token']
      const challenge = req.query['hub.challenge']

      if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
        return res.status(200).send(challenge)
      }

      return res.status(403).send('Forbidden')
    }

    if (req.method === 'POST') {
      console.log('WEBHOOK BODY:', JSON.stringify(req.body, null, 2))
      console.log('POST DETECTADO')
      

      const value = req.body?.entry?.[0]?.changes?.[0]?.value
      const message = value?.messages?.[0]
      console.log('MESSAGE EXTRAIDO:', JSON.stringify(message, null, 2))

      console.log('MESSAGE:', JSON.stringify(message || null, null, 2))

      if (!message?.from) {
        return res.status(200).json({ ok: true, info: 'No incoming message' })
      }

      console.log('VOY A ENVIAR RESPUESTA')
      await sendWhatsAppMessage(
        message.from,
        'Hola, soy Compagro 🌱. Recibí tu mensaje correctamente.'
      )

      return res.status(200).json({ ok: true })
    }

    return res.status(405).send('Method not allowed')
  } catch (error) {
    console.error('WEBHOOK ERROR:', error)
    return res.status(500).json({ error: error.message })
  }
}