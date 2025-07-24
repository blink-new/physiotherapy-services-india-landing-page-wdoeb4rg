import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { X, ArrowRight, CheckCircle, Play, MessageCircle, Calendar, CreditCard, Video } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Step {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  element?: string
  position: 'top' | 'bottom' | 'left' | 'right'
  completed?: boolean
}

interface UserFlowGuideProps {
  onComplete: () => void
}

export const UserFlowGuide: React.FC<UserFlowGuideProps> = ({ onComplete }) => {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const steps: Step[] = [
    {
      id: 'welcome',
      title: t('guide.welcome.title', 'Welcome to PhysioCare India'),
      description: t('guide.welcome.desc', 'Let us guide you through booking your first online physiotherapy consultation'),
      icon: <Play className="w-5 h-5" />,
      position: 'bottom'
    },
    {
      id: 'services',
      title: t('guide.services.title', 'Explore Our Services'),
      description: t('guide.services.desc', 'Browse through our specialized physiotherapy services to find what you need'),
      icon: <CheckCircle className="w-5 h-5" />,
      element: '#services-section',
      position: 'top'
    },
    {
      id: 'booking',
      title: t('guide.booking.title', 'Book Consultation'),
      description: t('guide.booking.desc', 'Click "Book Consultation" to start scheduling your appointment'),
      icon: <Calendar className="w-5 h-5" />,
      element: '.book-consultation-btn',
      position: 'bottom'
    },
    {
      id: 'payment',
      title: t('guide.payment.title', 'Secure Payment'),
      description: t('guide.payment.desc', 'Choose from multiple payment options including UPI, cards, and net banking'),
      icon: <CreditCard className="w-5 h-5" />,
      position: 'top'
    },
    {
      id: 'consultation',
      title: t('guide.consultation.title', 'Video Consultation'),
      description: t('guide.consultation.desc', 'Join your scheduled video consultation with our expert physiotherapists'),
      icon: <Video className="w-5 h-5" />,
      position: 'bottom'
    },
    {
      id: 'support',
      title: t('guide.support.title', 'Get Support'),
      description: t('guide.support.desc', 'Use WhatsApp chat or contact form for any questions or support'),
      icon: <MessageCircle className="w-5 h-5" />,
      element: '.whatsapp-widget',
      position: 'left'
    }
  ]

  useEffect(() => {
    // Check if user has seen the guide before
    const hasSeenGuide = localStorage.getItem('physiocare_guide_completed')
    if (!hasSeenGuide) {
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const completeGuide = () => {
    setCompletedSteps(prev => new Set([...prev, steps[currentStep].id]))
    localStorage.setItem('physiocare_guide_completed', 'true')
    setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 1000)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, steps[currentStep].id]))
      setCurrentStep(currentStep + 1)
      
      // Scroll to element if specified
      const nextStepElement = steps[currentStep + 1]?.element
      if (nextStepElement) {
        const element = document.querySelector(nextStepElement)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    } else {
      completeGuide()
    }
  }

  const skipGuide = () => {
    localStorage.setItem('physiocare_guide_completed', 'true')
    setIsVisible(false)
    onComplete()
  }

  const getTooltipPosition = (position: string) => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-2'
      case 'bottom':
        return 'top-full mt-2'
      case 'left':
        return 'right-full mr-2'
      case 'right':
        return 'left-full ml-2'
      default:
        return 'bottom-full mb-2'
    }
  }

  if (!isVisible) return null

  const currentStepData = steps[currentStep]

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" />
      
      {/* Guide Card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white shadow-2xl border-2 border-primary/20">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  {currentStepData.icon}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {currentStep + 1} / {steps.length}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={skipGuide}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {currentStepData.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {currentStepData.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Progress</span>
                  <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex justify-center gap-2">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentStep
                        ? 'bg-primary scale-125'
                        : index < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={skipGuide}
                  className="flex-1"
                >
                  {t('guide.skip', 'Skip Tour')}
                </Button>
                <Button
                  onClick={nextStep}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {currentStep === steps.length - 1 ? (
                    t('guide.finish', 'Finish')
                  ) : (
                    <>
                      {t('guide.next', 'Next')}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Highlight Element */}
      {currentStepData.element && (
        <style>
          {`
            ${currentStepData.element} {
              position: relative;
              z-index: 51;
              box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.3), 0 0 0 8px rgba(15, 118, 110, 0.1);
              border-radius: 8px;
              animation: pulse-highlight 2s infinite;
            }
            
            @keyframes pulse-highlight {
              0%, 100% { box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.3), 0 0 0 8px rgba(15, 118, 110, 0.1); }
              50% { box-shadow: 0 0 0 6px rgba(15, 118, 110, 0.4), 0 0 0 12px rgba(15, 118, 110, 0.2); }
            }
          `}
        </style>
      )}
    </>
  )
}

// Progress Indicator Component
export const FlowProgressIndicator: React.FC<{ currentStep: string }> = ({ currentStep }) => {
  const { t } = useTranslation()
  
  const flowSteps = [
    { id: 'browse', label: t('flow.browse', 'Browse Services'), icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'select', label: t('flow.select', 'Select Service'), icon: <Calendar className="w-4 h-4" /> },
    { id: 'book', label: t('flow.book', 'Book Appointment'), icon: <CreditCard className="w-4 h-4" /> },
    { id: 'pay', label: t('flow.pay', 'Make Payment'), icon: <Video className="w-4 h-4" /> },
    { id: 'consult', label: t('flow.consult', 'Video Consultation'), icon: <CheckCircle className="w-4 h-4" /> }
  ]

  const currentIndex = flowSteps.findIndex(step => step.id === currentStep)

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border border-primary/20">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            {flowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all ${
                  index === currentIndex
                    ? 'bg-primary text-white'
                    : index < currentIndex
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {step.icon}
                  <span className="hidden sm:inline">{step.label}</span>
                </div>
                {index < flowSteps.length - 1 && (
                  <ArrowRight className="w-3 h-3 mx-1 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}