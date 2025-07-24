import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle,
  Activity,
  Zap,
  Award,
  MessageCircle,
  Menu,
  X
} from 'lucide-react'
import { BookingDialog } from './components/BookingDialog'
import { WhatsAppWidget } from './components/WhatsAppWidget'
import { PaymentMethods } from './components/PaymentMethods'
import { ContactForm } from './components/ContactForm'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { VideoConsultation } from './components/VideoConsultation'
import { Toaster } from './components/ui/toaster'
import './i18n/config'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showVideoConsultation, setShowVideoConsultation] = useState(false)
  const { t } = useTranslation()

  const services = [
    {
      icon: <Activity className="h-8 w-8 text-primary" />,
      title: t('services.backPain.title'),
      description: t('services.backPain.description')
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: t('services.sportsInjury.title'),
      description: t('services.sportsInjury.description')
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: t('services.postSurgery.title'),
      description: t('services.postSurgery.description')
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: t('services.arthritis.title'),
      description: t('services.arthritis.description')
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Pediatric Physiotherapy',
      description: 'Specialized treatment for children with developmental and movement disorders.'
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: t('services.neurological.title'),
      description: t('services.neurological.description')
    }
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Dr. Patel helped me recover from my back injury completely through online sessions. The personalized exercises worked wonders!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: "Excellent service! The online consultation was thorough and the treatment plan was very effective for my knee pain.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Anita Desai",
      location: "Bangalore",
      rating: 5,
      text: "Professional and caring approach. My shoulder mobility improved significantly within 6 weeks of treatment.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ]

  const pricingPlans = [
    {
      name: t('pricing.basic.title'),
      price: t('pricing.basic.price'),
      amount: 800,
      duration: t('pricing.basic.duration'),
      features: t('pricing.basic.features', { returnObjects: true }) as string[]
    },
    {
      name: t('pricing.premium.title'),
      price: t('pricing.premium.price'),
      amount: 1500,
      duration: t('pricing.premium.duration'),
      popular: true,
      features: t('pricing.premium.features', { returnObjects: true }) as string[]
    },
    {
      name: t('pricing.comprehensive.title'),
      price: t('pricing.comprehensive.price'),
      amount: 6500,
      duration: t('pricing.comprehensive.duration'),
      features: t('pricing.comprehensive.features', { returnObjects: true }) as string[]
    }
  ]

  if (showVideoConsultation) {
    return (
      <VideoConsultation
        consultationId="demo-consultation"
        patientName="Demo Patient"
        doctorName="Dr. Sharma"
        scheduledTime="2:00 PM"
        onEndConsultation={() => setShowVideoConsultation(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">PhysioCare India</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.services')}</a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.about')}</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.testimonials')}</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.pricing')}</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.contact')}</a>
              <LanguageSwitcher />
              <BookingDialog>
                <Button className="bg-primary hover:bg-primary/90">{t('hero.bookConsultation')}</Button>
              </BookingDialog>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.services')}</a>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.about')}</a>
                <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.testimonials')}</a>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.pricing')}</a>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.contact')}</a>
                <BookingDialog>
                  <Button className="bg-primary hover:bg-primary/90 w-full">{t('hero.bookConsultation')}</Button>
                </BookingDialog>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">
                🏥 {t('hero.trustedBy')}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t('hero.title')} <span className="text-primary">{t('hero.subtitle')}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <BookingDialog>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {t('hero.bookConsultation')}
                  </Button>
                </BookingDialog>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: {t('contact.info.phone')}
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  {t('hero.certifiedPhysios')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  {t('hero.successRate')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  Insurance Accepted
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="gradient-bg rounded-2xl p-8 text-white">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop" 
                  alt="Online physiotherapy consultation" 
                  className="rounded-lg w-full h-80 object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-accent/10 p-2 rounded-full">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t('about.availability')}</p>
                      <p className="text-sm text-muted-foreground">Emergency support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Our Specialties</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('services.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {service.description}
                  </CardDescription>
                  <BookingDialog serviceType={service.title}>
                    <Button variant="outline" className="w-full">
                      {t('pricing.bookNow')}
                    </Button>
                  </BookingDialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop" 
                alt="Professional physiotherapist" 
                className="rounded-2xl w-full h-96 object-cover"
              />
            </div>
            <div>
              <Badge className="mb-4 bg-accent/10 text-accent">Why Choose Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('about.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t('about.subtitle')}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">15+ {t('about.experience')}</h3>
                    <p className="text-sm text-muted-foreground">Licensed physiotherapists with advanced certifications</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">10,000+ {t('about.patients')}</h3>
                    <p className="text-sm text-muted-foreground">Successfully treated across India</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">95% {t('about.successRate')}</h3>
                    <p className="text-sm text-muted-foreground">Proven treatment outcomes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('about.availability')}</h3>
                    <p className="text-sm text-muted-foreground">Round-the-clock assistance</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <BookingDialog>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    {t('hero.learnMore')}
                  </Button>
                </BookingDialog>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setShowVideoConsultation(true)}
                >
                  🎥 Demo Video Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Patient Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Transparent Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">{t('pricing.mostPopular')}</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <p className="text-muted-foreground mt-2">{plan.duration}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <BookingDialog planType={plan.name} amount={plan.amount}>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`}
                      size="lg"
                    >
                      {t('pricing.bookNow')}
                    </Button>
                  </BookingDialog>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Methods */}
          <PaymentMethods />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-accent/10 text-accent">Get In Touch</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('contact.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t('contact.subtitle')}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-muted-foreground">{t('contact.info.phone')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">{t('contact.info.email')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Hours</p>
                    <p className="text-muted-foreground">{t('contact.info.hours')}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <BookingDialog>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      📅 {t('hero.bookConsultation')}
                    </Button>
                  </BookingDialog>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('tel:+919876543210')}
                  >
                    📞 Call Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('https://wa.me/919876543210?text=Hi, I need help with physiotherapy consultation', '_blank')}
                  >
                    💬 WhatsApp Chat
                  </Button>
                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">PhysioCare India</span>
              </div>
              <p className="text-muted mb-4">
                Professional online physiotherapy services bringing expert care to your home across India.
              </p>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  Licensed & Certified
                </Badge>
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  ISO Certified
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t('nav.services')}</h3>
              <ul className="space-y-2 text-muted">
                <li>{t('services.backPain.title')}</li>
                <li>{t('services.sportsInjury.title')}</li>
                <li>{t('services.postSurgery.title')}</li>
                <li>{t('services.arthritis.title')}</li>
                <li>Pediatric Physiotherapy</li>
                <li>{t('services.neurological.title')}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted">
                <li>{t('nav.about')}</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>{t('nav.contact')}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-muted">
                <li>{t('contact.info.phone')}</li>
                <li>{t('contact.info.email')}</li>
                <li>{t('contact.info.hours')}</li>
                <li>Emergency Support</li>
              </ul>
              <Button 
                className="mt-4 bg-primary hover:bg-primary/90"
                onClick={() => window.open('https://wa.me/919876543210?text=Hi, I need help with physiotherapy consultation', '_blank')}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Us
              </Button>
            </div>
          </div>
          
          <div className="border-t border-muted/20 mt-8 pt-8 text-center text-muted">
            <p>&copy; 2024 PhysioCare India. All rights reserved. | Registered with Medical Council of India</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}

export default App