import React from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Badge } from './components/ui/badge';
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
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const services = [
    {
      icon: <Activity className="h-8 w-8 text-primary" />,
      title: "Back Pain Treatment",
      description: "Specialized care for chronic back pain, herniated discs, and spinal alignment issues."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Sports Injury Recovery",
      description: "Expert rehabilitation for athletes and sports-related injuries with personalized recovery plans."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Post-Surgery Rehabilitation",
      description: "Comprehensive recovery programs following orthopedic and neurological surgeries."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Arthritis Management",
      description: "Pain management and mobility improvement for various forms of arthritis."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Pediatric Physiotherapy",
      description: "Specialized treatment for children with developmental and movement disorders."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Neurological Rehabilitation",
      description: "Recovery support for stroke, Parkinson's, and other neurological conditions."
    }
  ];

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
  ];

  const pricingPlans = [
    {
      name: "Single Consultation",
      price: "₹800",
      duration: "45 minutes",
      features: [
        "Detailed assessment",
        "Personalized exercise plan",
        "Follow-up recommendations",
        "Digital exercise guide"
      ]
    },
    {
      name: "Treatment Package",
      price: "₹3,500",
      duration: "5 sessions",
      popular: true,
      features: [
        "5 consultation sessions",
        "Progress tracking",
        "Customized treatment plan",
        "WhatsApp support",
        "Exercise video library"
      ]
    },
    {
      name: "Complete Recovery",
      price: "₹6,500",
      duration: "10 sessions",
      features: [
        "10 consultation sessions",
        "Comprehensive assessment",
        "24/7 support access",
        "Nutrition guidance",
        "Recovery guarantee"
      ]
    }
  ];

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
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
              <Button className="bg-primary hover:bg-primary/90">Book Consultation</Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
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
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
                <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</a>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
                <Button className="bg-primary hover:bg-primary/90 w-full">Book Consultation</Button>
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
                🏥 Trusted by 10,000+ Patients
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Expert <span className="text-primary">Physiotherapy</span> Care from Home
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Get professional physiotherapy treatment through secure online consultations with India's certified physiotherapists. Personalized care, proven results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Book Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: +91 98765 43210
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  Licensed Professionals
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  Secure & Private
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
                      <p className="font-semibold text-foreground">Available 24/7</p>
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
              Comprehensive Physiotherapy Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From acute injuries to chronic conditions, our certified physiotherapists provide specialized care tailored to your unique needs.
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
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
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
                India's Most Trusted Online Physiotherapy Platform
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                With over 15 years of combined experience, our team of certified physiotherapists has helped thousands of patients recover from injuries and improve their quality of life through innovative online treatment methods.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Certified Experts</h3>
                    <p className="text-sm text-muted-foreground">Licensed physiotherapists with advanced certifications</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">10,000+ Patients</h3>
                    <p className="text-sm text-muted-foreground">Successfully treated across India</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">95% Success Rate</h3>
                    <p className="text-sm text-muted-foreground">Proven treatment outcomes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">24/7 Support</h3>
                    <p className="text-sm text-muted-foreground">Round-the-clock assistance</p>
                  </div>
                </div>
              </div>
              
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Learn More About Our Team
              </Button>
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
              What Our Patients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real stories from real patients who have experienced remarkable recovery through our online physiotherapy services.
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
              Affordable Healthcare for Everyone
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that best fits your recovery needs. All plans include personalized treatment and ongoing support.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
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
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`}
                    size="lg"
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-accent/10 text-accent">Get In Touch</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Start Your Recovery Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Book your consultation today and take the first step towards a pain-free life. Our team is ready to help you achieve your health goals.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">info@physiocareindia.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Serving</p>
                    <p className="text-muted-foreground">All major cities across India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Book Your Consultation</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">First Name</label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Last Name</label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
                  <Input type="tel" placeholder="Enter your phone number" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Condition/Concern</label>
                  <Textarea placeholder="Describe your condition or what you'd like help with" rows={4} />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Book Free Consultation
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </CardContent>
            </Card>
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
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-muted">
                <li>Back Pain Treatment</li>
                <li>Sports Injury Recovery</li>
                <li>Post-Surgery Rehab</li>
                <li>Arthritis Management</li>
                <li>Pediatric Physiotherapy</li>
                <li>Neurological Rehab</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-muted">
                <li>+91 98765 43210</li>
                <li>info@physiocareindia.com</li>
                <li>Available 24/7</li>
                <li>Emergency Support</li>
              </ul>
              <Button className="mt-4 bg-primary hover:bg-primary/90">
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
    </div>
  );
}

export default App;