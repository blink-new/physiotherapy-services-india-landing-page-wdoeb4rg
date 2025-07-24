import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Calendar, Clock, CreditCard, Phone, Video, MessageCircle } from 'lucide-react'
import { bookingSchema, type BookingFormData } from '../lib/schemas'
import { blink } from '../blink/client'

interface BookingDialogProps {
  children: React.ReactNode
  serviceType?: string
  planType?: string
  amount?: number
}

export function BookingDialog({ children, serviceType = '', planType = '', amount = 800 }: BookingDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceType: serviceType || '',
      consultationType: 'video'
    }
  })

  const consultationType = watch('consultationType')

  const services = [
    'Back Pain & Spine Care',
    'Sports Injury Recovery',
    'Joint Pain & Arthritis',
    'Post-Surgery Rehabilitation',
    'Neurological Conditions',
    'Pediatric Physiotherapy'
  ]

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM'
  ]

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    try {
      // Create booking record
      const booking = await blink.db.bookings.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        service_type: data.serviceType,
        consultation_type: data.consultationType,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        message: data.message || '',
        amount: amount * 100, // Convert to paise
        booking_status: 'confirmed'
      })

      // Simulate payment process (in real app, integrate with Razorpay)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setStep('success')
    } catch (error) {
      console.error('Booking failed:', error)
      alert('Booking failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setStep('form')
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-teal-600" />
            {step === 'form' && 'Book Your Consultation'}
            {step === 'payment' && 'Payment Details'}
            {step === 'success' && 'Booking Confirmed!'}
          </DialogTitle>
        </DialogHeader>

        {step === 'form' && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Mobile Number *</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="9876543210"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label>Service Type *</Label>
              <Select onValueChange={(value) => setValue('serviceType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <p className="text-sm text-red-600 mt-1">{errors.serviceType.message}</p>
              )}
            </div>

            <div>
              <Label>Consultation Type *</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Button
                  type="button"
                  variant={consultationType === 'video' ? 'default' : 'outline'}
                  className="flex items-center gap-2"
                  onClick={() => setValue('consultationType', 'video')}
                >
                  <Video className="h-4 w-4" />
                  Video
                </Button>
                <Button
                  type="button"
                  variant={consultationType === 'phone' ? 'default' : 'outline'}
                  className="flex items-center gap-2"
                  onClick={() => setValue('consultationType', 'phone')}
                >
                  <Phone className="h-4 w-4" />
                  Phone
                </Button>
                <Button
                  type="button"
                  variant={consultationType === 'chat' ? 'default' : 'outline'}
                  className="flex items-center gap-2"
                  onClick={() => setValue('consultationType', 'chat')}
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDate">Preferred Date *</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  {...register('preferredDate')}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.preferredDate && (
                  <p className="text-sm text-red-600 mt-1">{errors.preferredDate.message}</p>
                )}
              </div>
              <div>
                <Label>Preferred Time *</Label>
                <Select onValueChange={(value) => setValue('preferredTime', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.preferredTime && (
                  <p className="text-sm text-red-600 mt-1">{errors.preferredTime.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="message">Additional Message (Optional)</Label>
              <Textarea
                id="message"
                {...register('message')}
                placeholder="Tell us about your condition or any specific requirements..."
                rows={3}
              />
            </div>

            <div className="bg-teal-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-teal-900">Consultation Fee</p>
                  <p className="text-sm text-teal-700">{planType || 'Standard Consultation'}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-teal-900">₹{amount}</p>
                  <p className="text-sm text-teal-700">Including GST</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-teal-600 hover:bg-teal-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Proceed to Payment
                  </div>
                )}
              </Button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-6">
              Your consultation has been booked successfully. You'll receive a confirmation email with session details shortly.
            </p>
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <p>📧 Check your email for session link</p>
              <p>📱 WhatsApp reminder 30 minutes before</p>
              <p>🔄 Free rescheduling up to 2 hours before</p>
            </div>
            <Button onClick={handleClose} className="w-full bg-teal-600 hover:bg-teal-700">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}