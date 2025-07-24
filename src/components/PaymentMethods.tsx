import { CreditCard, Smartphone, Building2, Wallet } from 'lucide-react'

export function PaymentMethods() {
  const paymentMethods = [
    {
      icon: CreditCard,
      name: 'Credit/Debit Cards',
      description: 'Visa, Mastercard, RuPay',
      popular: true
    },
    {
      icon: Smartphone,
      name: 'UPI',
      description: 'PhonePe, GPay, Paytm',
      popular: true
    },
    {
      icon: Building2,
      name: 'Net Banking',
      description: 'All major banks supported',
      popular: false
    },
    {
      icon: Wallet,
      name: 'Digital Wallets',
      description: 'Paytm, Mobikwik, Amazon Pay',
      popular: false
    }
  ]

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Secure Payment Options
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {paymentMethods.map((method, index) => {
          const Icon = method.icon
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 transition-colors ${
                method.popular
                  ? 'border-teal-200 bg-teal-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-6 w-6 ${
                  method.popular ? 'text-teal-600' : 'text-gray-600'
                }`} />
                <div>
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
              {method.popular && (
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-teal-100 text-teal-700 rounded-full">
                  Most Popular
                </span>
              )}
            </div>
          )
        })}
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center gap-2 text-green-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">100% Secure Payments</span>
        </div>
        <p className="text-sm text-green-600 mt-1">
          Your payment information is encrypted and secure. We use industry-standard SSL encryption.
        </p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-gray-400">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/200px-Razorpay_logo.svg.png" alt="Razorpay" className="h-6" />
        <span className="text-xs">•</span>
        <span className="text-xs">256-bit SSL Encrypted</span>
        <span className="text-xs">•</span>
        <span className="text-xs">PCI DSS Compliant</span>
      </div>
    </div>
  )
}