import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const whatsappNumber = '+919876543210' // Replace with actual WhatsApp business number
  
  const quickMessages = [
    'I want to book a consultation',
    'What are your consultation timings?',
    'Do you treat back pain?',
    'What are your charges?',
    'Can I get a home visit?'
  ]

  const sendWhatsAppMessage = (text: string) => {
    const encodedMessage = encodeURIComponent(text)
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    setIsOpen(false)
    setMessage('')
  }

  const handleSendCustomMessage = () => {
    if (message.trim()) {
      sendWhatsAppMessage(message)
    }
  }

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl border z-50">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">PhysioCare Support</h3>
                <p className="text-sm opacity-90">Typically replies instantly</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="mb-4">
              <div className="bg-gray-100 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700">
                  👋 Hi! How can we help you today?
                </p>
              </div>
            </div>

            {/* Quick Messages */}
            <div className="space-y-2 mb-4">
              <p className="text-xs text-gray-500 font-medium">Quick Messages:</p>
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => sendWhatsAppMessage(msg)}
                  className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {msg}
                </button>
              ))}
            </div>

            {/* Custom Message */}
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendCustomMessage()}
                />
                <Button
                  onClick={handleSendCustomMessage}
                  size="icon"
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                Powered by WhatsApp Business
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}