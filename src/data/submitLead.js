// The single seam between the contact form and wherever leads should land.
// There is no backend in this project yet: point this at the sheet or endpoint
// (a Google Apps Script URL, a form service, an API route) and the form starts
// delivering without any change to the form itself.
const ENDPOINT = null

export default async function submitLead(lead) {
  if (!ENDPOINT) {
    // Nothing to deliver to yet — hold long enough that the sent state reads as
    // a response rather than a flicker.
    await new Promise((resolve) => setTimeout(resolve, 700))
    return { ok: true, delivered: false }
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  })

  if (!response.ok) throw new Error(`Lead submission failed: ${response.status}`)
  return { ok: true, delivered: true }
}
