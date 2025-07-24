import { blink } from '../blink/client'

export interface SMSTemplate {
  booking_confirmation: string
  appointment_reminder: string
  payment_success: string
  consultation_link: string
  follow_up: string
}

const SMS_TEMPLATES: SMSTemplate = {
  booking_confirmation: `Hi {name}! Your physiotherapy consultation is confirmed for {date} at {time}. Service: {service}. We'll send you the consultation link 15 minutes before your appointment. - PhysioCare India`,
  
  appointment_reminder: `Reminder: Your physiotherapy consultation with Dr. {doctor} is starting in 15 minutes. Join here: {link} - PhysioCare India`,
  
  payment_success: `Payment successful! ₹{amount} received for {service}. Your consultation is confirmed for {date} at {time}. Booking ID: {bookingId} - PhysioCare India`,
  
  consultation_link: `Your physiotherapy consultation starts now! Join here: {link} Meeting ID: {meetingId} - PhysioCare India`,
  
  follow_up: `Hi {name}! How are you feeling after your physiotherapy session? Please rate your experience: {feedbackLink} - PhysioCare India`
}

export class SMSService {
  private static instance: SMSService
  
  static getInstance(): SMSService {
    if (!SMSService.instance) {
      SMSService.instance = new SMSService()
    }
    return SMSService.instance
  }

  async sendSMS(phoneNumber: string, template: keyof SMSTemplate, variables: Record<string, string>): Promise<boolean> {
    try {
      // Get the template
      let message = SMS_TEMPLATES[template]
      
      // Replace variables in template
      Object.entries(variables).forEach(([key, value]) => {
        message = message.replace(new RegExp(`{${key}}`, 'g'), value)
      })

      // Use Blink's secure API proxy to send SMS via external SMS provider
      // This keeps your SMS provider API key secure on the server
      const response = await blink.data.fetch({
        url: 'https://api.textlocal.in/send/', // Example SMS provider
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          apikey: '{{textlocal_api_key}}', // Secret substitution
          numbers: phoneNumber,
          message: message,
          sender: 'PHYSIO'
        }).toString()
      })

      if (response.status === 200) {
        console.log('SMS sent successfully to:', phoneNumber)
        return true
      } else {
        console.error('SMS sending failed:', response.body)
        return false
      }
    } catch (error) {
      console.error('SMS service error:', error)
      return false
    }
  }

  async sendBookingConfirmation(phoneNumber: string, bookingDetails: {
    name: string
    date: string
    time: string
    service: string
  }): Promise<boolean> {
    return this.sendSMS(phoneNumber, 'booking_confirmation', bookingDetails)
  }

  async sendAppointmentReminder(phoneNumber: string, reminderDetails: {
    doctor: string
    link: string
  }): Promise<boolean> {
    return this.sendSMS(phoneNumber, 'appointment_reminder', reminderDetails)
  }

  async sendPaymentSuccess(phoneNumber: string, paymentDetails: {
    amount: string
    service: string
    date: string
    time: string
    bookingId: string
  }): Promise<boolean> {
    return this.sendSMS(phoneNumber, 'payment_success', paymentDetails)
  }

  async sendConsultationLink(phoneNumber: string, consultationDetails: {
    link: string
    meetingId: string
  }): Promise<boolean> {
    return this.sendSMS(phoneNumber, 'consultation_link', consultationDetails)
  }

  async sendFollowUp(phoneNumber: string, followUpDetails: {
    name: string
    feedbackLink: string
  }): Promise<boolean> {
    return this.sendSMS(phoneNumber, 'follow_up', followUpDetails)
  }

  // Utility method to format Indian phone numbers
  static formatIndianPhoneNumber(phone: string): string {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '')
    
    // If it starts with 91, it's already formatted
    if (digits.startsWith('91') && digits.length === 12) {
      return `+${digits}`
    }
    
    // If it's 10 digits, add country code
    if (digits.length === 10) {
      return `+91${digits}`
    }
    
    // Return as is if format is unclear
    return phone
  }
}

export const smsService = SMSService.getInstance()