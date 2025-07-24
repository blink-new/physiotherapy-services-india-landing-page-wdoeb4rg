import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'physiotherapy-services-india-landing-page-wdoeb4rg',
  authRequired: false // Allow anonymous bookings
})