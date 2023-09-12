// A faulty API route to test Sentry's error monitoring
export default function handler(_req, res) {
  res.status(200).json({ name: 'John Doe' });
  throw new Error('Sentry Example API Route Error');
}
