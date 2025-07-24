import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Calendar, Clock, CreditCard, Phone, Video, MessageCircle } from 'lucide-react'
import { bookingSchema, type BookingFormData } from '../lib/schemas'
import { blink } from '../blink/client'
import { useToast } from '../hooks/use-toast'
import { RazorpayPayment } from './RazorpayPayment'
import { smsService, SMSService } from '../services/smsService'

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
  const [bookingId, setBookingId] = useState<string>('')
  const { t } = useTranslation()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
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
    t('services.backPain.title'),
    t('services.sportsInjury.title'),
    t('services.neckPain.title'),
    t('services.arthritis.title'),
    t('services.postSurgery.title'),
    t('services.neurological.title')
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
        booking_status: 'pending_payment'
      })

      setBookingId(booking.id)
      setStep('payment')
    } catch (error) {
      console.error('Booking failed:', error)
      toast({
        title: 'Booking Failed',
        description: 'Unable to create booking. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentSuccess = async (paymentId: string) => {
    try {
      // Update booking with payment details
      await blink.db.bookings.update(bookingId, {
        booking_status: 'confirmed',
        payment_id: paymentId,
        payment_status: 'completed'
      })

      const formData = getValues()
      
      // Send SMS confirmation
      const formattedPhone = SMSService.formatIndianPhoneNumber(formData.phone)
      await smsService.sendBookingConfirmation(formattedPhone, {
        name: formData.name,
        date: formData.preferredDate,
        time: formData.preferredTime,
        service: formData.serviceType
      })

      // Send payment success SMS
      await smsService.sendPaymentSuccess(formattedPhone, {
        amount: amount.toString(),
        service: formData.serviceType,
        date: formData.preferredDate,
        time: formData.preferredTime,
        bookingId: bookingId
      })

      setStep('success')
      
      toast({
        title: 'Booking Confirmed!',
        description: 'SMS confirmation sent to your mobile number.',
      })
    } catch (error) {
      console.error('Payment confirmation failed:', error)
      toast({
        title: 'Payment Processed',
        description: 'Your payment was successful, but there was an issue with confirmation. Please contact support.',
        variant: 'destructive'
      })
    }
  }

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error)
    toast({
      title: 'Payment Failed',
      description: 'Your payment could not be processed. Please try again.',
      variant: 'destructive'
    })
  }

  const handleClose = () => {
    setIsOpen(false)
    setStep('form')
    setBookingId('')
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
            {step === 'form' && t('booking.title')}
            {step === 'payment' && 'Secure Payment'}
            {step === 'success' && 'Booking Confirmed!'}
          </DialogTitle>
        </DialogHeader>

        {step === 'form' && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t('contact.form.name')} *</Label>
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
                <Label htmlFor="phone">{t('contact.form.phone')} *</Label>
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
              <Label htmlFor="email">{t('contact.form.email')} *</Label>
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
              <Label>{t('booking.selectService')} *</Label>
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
              <Label>{t('booking.consultationType')} *</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Button
                  type="button"
                  variant={consultationType === 'video' ? 'default' : 'outline'}
                  className="flex items-center gap-2"
                  onClick={() => setValue('consultationType', 'video')}
                >
                  <Video className="h-4 w-4" />
                  {t('booking.types.video')}
                </Button>
                <Button
                  type="button"
                  variant={consultationType === 'phone' ? 'default' : 'outline'}
                  className="flex items-center gap-2"
                  onClick={() => setValue('consultationType', 'phone')}
                >
                  <Phone className="h-4 w-4" />
                  {t('booking.types.phone')}
                </Button>
                <Button
                  type="button"
                  variant={consultationType === 'chat' ? 'default' : 'outline'}
                  className="flex items-center gap-2"
                  onClick={() => setValue('consultationType', 'chat')}
                >
                  <MessageCircle className="h-4 w-4" />
                  {t('booking.types.chat')}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDate">{t('booking.selectDate')} *</Label>
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
                <Label>{t('booking.selectTime')} *</Label>
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
                {t('booking.cancel')}
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

        {step === 'payment' && (
          <div className="space-y-4">
            <RazorpayPayment
              amount={amount}
              description={`${planType || 'Physiotherapy Consultation'} - ${getValues('serviceType')}`}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
            <Button
              variant="outline"
              onClick={() => setStep('form')}
              className="w-full"
            >
              Back to Booking Details
            </Button>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-4">
              Your consultation has been booked successfully. 
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="font-medium text-gray-900 mb-2">Booking ID: {bookingId}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📧 Confirmation email sent</p>
                <p>📱 SMS confirmation sent to your mobile</p>
                <p>📞 WhatsApp reminder 15 minutes before</p>
                <p>🔄 Free rescheduling up to 2 hours before</p>
              </div>
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