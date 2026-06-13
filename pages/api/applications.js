function validatePayload(payload) {
  return Boolean(
    payload &&
      payload.firstName &&
      payload.lastName &&
      payload.email &&
      payload.startDate &&
      payload.experience &&
      payload.motivation &&
      payload.agreeToTerms
  );
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  if (!validatePayload(req.body)) {
    return res.status(400).json({ message: 'The application payload is incomplete.' });
  }

  return res.status(200).json({
    message: `Application received for ${req.body.firstName} ${req.body.lastName}.`,
    submittedAt: new Date().toISOString(),
  });
}