import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Shield, CreditCard, Smartphone, Building2, Wallet } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

interface RazorpayPaymentProps {
  amount: number
  currency?: string
  description: string
  onSuccess: (paymentId: string) => void
  onError: (error: any) => void
  disabled?: boolean
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function RazorpayPayment({
  amount,
  currency = 'INR',
  description,
  onSuccess,
  onError,
  disabled = false
}: RazorpayPaymentProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK')
      }

      // In a real implementation, you would create an order on your backend
      // For demo purposes, we'll simulate the payment flow
      const options = {
        key: 'rzp_test_1234567890', // Replace with your Razorpay key
        amount: amount * 100, // Amount in paise
        currency: currency,
        name: 'PhysioCare India',
        description: description,
        image: '/favicon.svg',
        order_id: `order_${Date.now()}`, // This should come from your backend
        handler: function (response: any) {
          // Payment successful
          onSuccess(response.razorpay_payment_id)
          toast({
            title: 'Payment Successful!',
            description: `Payment ID: ${response.razorpay_payment_id}`,
          })
        },
        prefill: {
          name: 'Patient Name',
          email: 'patient@example.com',
          contact: '9999999999'
        },
        notes: {
          service: description
        },
        theme: {
          color: '#0F766E'
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        }
      }

      const paymentObject = new window.Razorpay(options)
      
      paymentObject.on('payment.failed', function (response: any) {
        onError(response.error)
        toast({
          title: 'Payment Failed',
          description: response.error.description,
          variant: 'destructive'
        })
      })

      paymentObject.open()
    } catch (error) {
      console.error('Payment error:', error)
      onError(error)
      toast({
        title: 'Payment Error',
        description: 'Unable to process payment. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Secure Payment
        </CardTitle>
        <CardDescription>
          Your payment is secured with 256-bit SSL encryption
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Payment Methods */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex flex-col items-center p-3 border rounded-lg">
            <Smartphone className="h-6 w-6 text-blue-600 mb-1" />
            <span className="text-xs font-medium">UPI</span>
          </div>
          <div className="flex flex-col items-center p-3 border rounded-lg">
            <CreditCard className="h-6 w-6 text-purple-600 mb-1" />
            <span className="text-xs font-medium">Cards</span>
          </div>
          <div className="flex flex-col items-center p-3 border rounded-lg">
            <Building2 className="h-6 w-6 text-orange-600 mb-1" />
            <span className="text-xs font-medium">Net Banking</span>
          </div>
          <div className="flex flex-col items-center p-3 border rounded-lg">
            <Wallet className="h-6 w-6 text-green-600 mb-1" />
            <span className="text-xs font-medium">Wallets</span>
          </div>
        </div>

        {/* Payment Amount */}
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="font-medium">Total Amount:</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">₹{amount}</div>
            <div className="text-sm text-gray-600">Inclusive of all taxes</div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="secondary" className="text-xs">
            <Shield className="h-3 w-3 mr-1" />
            SSL Secured
          </Badge>
          <Badge variant="secondary" className="text-xs">
            PCI DSS Compliant
          </Badge>
          <Badge variant="secondary" className="text-xs">
            RBI Approved
          </Badge>
        </div>

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={disabled || loading}
          className="w-full h-12 text-lg font-semibold"
          size="lg"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </div>
          ) : (
            `Pay ₹${amount} Securely`
          )}
        </Button>

        {/* Payment Info */}
        <div className="text-center text-sm text-gray-600">
          <p>Powered by Razorpay • Refund available within 24 hours</p>
          <p className="mt-1">By proceeding, you agree to our Terms & Conditions</p>
        </div>
      </CardContent>
    </Card>
  )
}