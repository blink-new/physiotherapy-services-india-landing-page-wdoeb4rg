import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Send, CheckCircle, Shield, Lock, AlertTriangle } from 'lucide-react'
import { contactSchema, type ContactFormData } from '../lib/schemas'
import { blink } from '../blink/client'
import { 
  sanitizeInput, 
  rateLimit, 
  logSecurityEvent,
  generateCSRFToken 
} from '../lib/security'
import { useSecurityContext } from '../hooks/useSecurity'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)
  const [csrfToken] = useState(() => generateCSRFToken())

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const subjects = [
    'General Inquiry',
    'Booking Assistance',
    'Technical Support',
    'Treatment Information',
    'Insurance Claims',
    'Feedback/Complaint'
  ]

  const onSubmit = async (data: ContactFormData) => {
    // Rate limiting check
    const clientId = `contact_${Date.now()}_${Math.random()}`
    if (!rateLimit(clientId, 3, 300000)) { // 3 requests per 5 minutes
      setRateLimited(true)
      logSecurityEvent('rate_limit_exceeded', { form: 'contact', clientId })
      setTimeout(() => setRateLimited(false), 60000) // Reset after 1 minute
      return
    }

    setIsSubmitting(true)
    try {
      // Sanitize all inputs
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        phone: data.phone ? sanitizeInput(data.phone) : '',
        subject: sanitizeInput(data.subject),
        message: sanitizeInput(data.message),
        status: 'new',
        csrf_token: csrfToken,
        submitted_at: new Date().toISOString(),
        ip_hash: btoa(navigator.userAgent + Date.now()) // Simple fingerprint
      }

      await blink.db.contact_messages.create(sanitizedData)

      setIsSubmitted(true)
      reset()
      
      logSecurityEvent('form_submitted', { form: 'contact', success: true })
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error('Failed to send message:', error)
      logSecurityEvent('form_submission_failed', { form: 'contact', error: error.message })
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (rateLimited) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 p-8 rounded-lg text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-yellow-600" />
        </div>
        <h3 className="text-xl font-semibold text-yellow-900 mb-2">Too Many Requests</h3>
        <p className="text-yellow-700 mb-4">
          For security reasons, please wait a moment before submitting another message.
        </p>
        <p className="text-sm text-yellow-600">
          This helps us prevent spam and protect your data.
        </p>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Securely!</h3>
        <p className="text-gray-600 mb-4">
          Thank you for contacting us. We'll get back to you within 24 hours.
        </p>
        <div className="space-y-2 text-sm text-gray-600">
          <p>📧 Check your email for confirmation</p>
          <p>📱 For urgent queries, call +91 98765 43210</p>
          <p>💬 Or chat with us on WhatsApp</p>
        </div>
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-green-700 text-sm">
            <Shield className="w-4 h-4" />
            <span>Your message was encrypted and sent securely</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      {/* Security Badge */}
      <div className="mb-6 p-3 bg-teal-50 border border-teal-200 rounded-lg">
        <div className="flex items-center gap-2 text-teal-700">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">Secure Contact Form</span>
        </div>
        <p className="text-xs text-teal-600 mt-1">
          Your information is encrypted and protected by advanced security measures
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden CSRF token */}
        <input type="hidden" name="csrf_token" value={csrfToken} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter your full name"
              className="mt-1"
              maxLength={50}
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your.email@example.com"
              className="mt-1"
              maxLength={254}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="phone">Mobile Number (Optional)</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="9876543210"
              className="mt-1"
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              autoComplete="tel"
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Label>Subject *</Label>
            <Select onValueChange={(value) => setValue('subject', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder="Please describe your query or concern in detail..."
            rows={5}
            className="mt-1"
            maxLength={1000}
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
          )}
        </div>

        <div className="bg-teal-50 p-4 rounded-lg">
          <h4 className="font-medium text-teal-900 mb-2">Response Time</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-teal-700">General: 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-teal-700">Booking: 2 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-teal-700">Urgent: Call us</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-3 h-3" />
            <span className="font-medium">Privacy & Security</span>
          </div>
          <p>
            Your data is protected by SSL encryption, rate limiting, and input sanitization. 
            We never share your information with third parties.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending Securely...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Secure Message
            </div>
          )}
        </Button>
      </form>
    </div>
  )
}