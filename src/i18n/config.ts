import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        services: 'Services',
        about: 'About',
        testimonials: 'Testimonials',
        pricing: 'Pricing',
        contact: 'Contact'
      },
      // Hero Section
      hero: {
        title: 'Expert Physiotherapy Care',
        subtitle: 'From the Comfort of Your Home',
        description: 'Get personalized physiotherapy treatment from certified professionals through secure video consultations. Available across India.',
        bookConsultation: 'Book Consultation',
        learnMore: 'Learn More',
        trustedBy: 'Trusted by 10,000+ patients',
        certifiedPhysios: '50+ Certified Physiotherapists',
        successRate: '95% Success Rate'
      },
      // Services
      services: {
        title: 'Our Specialized Services',
        subtitle: 'Comprehensive physiotherapy care tailored to your needs',
        backPain: {
          title: 'Back Pain Relief',
          description: 'Specialized treatment for chronic back pain, herniated discs, and spinal issues.'
        },
        sportsInjury: {
          title: 'Sports Injury Recovery',
          description: 'Expert rehabilitation for athletes and sports-related injuries.'
        },
        neckPain: {
          title: 'Neck & Shoulder Pain',
          description: 'Targeted therapy for neck stiffness, shoulder pain, and cervical issues.'
        },
        arthritis: {
          title: 'Arthritis Management',
          description: 'Comprehensive care for joint pain, stiffness, and mobility issues.'
        },
        postSurgery: {
          title: 'Post-Surgery Rehab',
          description: 'Guided recovery programs after orthopedic and joint surgeries.'
        },
        neurological: {
          title: 'Neurological Rehab',
          description: 'Specialized care for stroke recovery, Parkinson\'s, and neurological conditions.'
        }
      },
      // About
      about: {
        title: 'Why Choose PhysioCare India?',
        subtitle: 'Leading online physiotherapy platform in India',
        experience: 'Years of Experience',
        patients: 'Happy Patients',
        successRate: 'Success Rate',
        availability: '24/7 Availability'
      },
      // Testimonials
      testimonials: {
        title: 'What Our Patients Say',
        subtitle: 'Real stories from real people'
      },
      // Pricing
      pricing: {
        title: 'Transparent Pricing',
        subtitle: 'Choose the plan that works best for you',
        basic: {
          title: 'Basic Consultation',
          price: '₹800',
          duration: '30 minutes',
          features: [
            'Video consultation',
            'Exercise prescription',
            'Basic assessment',
            'Follow-up chat support'
          ]
        },
        premium: {
          title: 'Premium Care',
          price: '₹1,500',
          duration: '45 minutes',
          features: [
            'Extended consultation',
            'Personalized exercise plan',
            'Progress tracking',
            'Priority support',
            'Exercise videos'
          ]
        },
        comprehensive: {
          title: 'Comprehensive Package',
          price: '₹6,500',
          duration: '3 sessions',
          features: [
            '3 detailed sessions',
            'Complete treatment plan',
            'Weekly progress reviews',
            '24/7 chat support',
            'Exercise library access',
            'Nutrition guidance'
          ]
        },
        bookNow: 'Book Now',
        mostPopular: 'Most Popular'
      },
      // Contact
      contact: {
        title: 'Get in Touch',
        subtitle: 'Ready to start your recovery journey?',
        form: {
          name: 'Full Name',
          email: 'Email Address',
          phone: 'Phone Number',
          subject: 'Subject',
          message: 'Message',
          send: 'Send Message',
          subjects: {
            booking: 'Book Consultation',
            support: 'Technical Support',
            feedback: 'Feedback',
            other: 'Other'
          }
        },
        info: {
          phone: '+91 98765 43210',
          email: 'care@physiocareindia.com',
          hours: 'Mon-Sun: 6:00 AM - 11:00 PM IST'
        }
      },
      // Booking
      booking: {
        title: 'Book Your Consultation',
        selectService: 'Select Service',
        consultationType: 'Consultation Type',
        selectDate: 'Select Date',
        selectTime: 'Select Time',
        patientDetails: 'Patient Details',
        paymentMethod: 'Payment Method',
        bookNow: 'Book Now',
        cancel: 'Cancel',
        types: {
          video: 'Video Call',
          phone: 'Phone Call',
          chat: 'Chat Consultation'
        }
      },
      // Common
      common: {
        loading: 'Loading...',
        error: 'Something went wrong',
        success: 'Success!',
        tryAgain: 'Try Again',
        close: 'Close'
      }
    }
  },
  hi: {
    translation: {
      // Navigation
      nav: {
        home: 'होम',
        services: 'सेवाएं',
        about: 'हमारे बारे में',
        testimonials: 'प्रशंसापत्र',
        pricing: 'मूल्य निर्धारण',
        contact: 'संपर्क'
      },
      // Hero Section
      hero: {
        title: 'विशेषज्ञ फिजियोथेरेपी देखभाल',
        subtitle: 'आपके घर के आराम से',
        description: 'सुरक्षित वीडियो परामर्श के माध्यम से प्रमाणित पेशेवरों से व्यक्तिगत फिजियोथेरेपी उपचार प्राप्त करें। पूरे भारत में उपलब्ध।',
        bookConsultation: 'परामर्श बुक करें',
        learnMore: 'और जानें',
        trustedBy: '10,000+ रोगियों द्वारा भरोसा',
        certifiedPhysios: '50+ प्रमाणित फिजियोथेरेपिस्ट',
        successRate: '95% सफलता दर'
      },
      // Services
      services: {
        title: 'हमारी विशेष सेवाएं',
        subtitle: 'आपकी आवश्यकताओं के अनुरूप व्यापक फिजियोथेरेपी देखभाल',
        backPain: {
          title: 'पीठ दर्द राहत',
          description: 'पुराने पीठ दर्द, हर्नियेटेड डिस्क और रीढ़ की समस्याओं के लिए विशेष उपचार।'
        },
        sportsInjury: {
          title: 'खेल चोट रिकवरी',
          description: 'एथलीटों और खेल संबंधी चोटों के लिए विशेषज्ञ पुनर्वास।'
        },
        neckPain: {
          title: 'गर्दन और कंधे का दर्द',
          description: 'गर्दन की अकड़न, कंधे के दर्द और ग्रीवा संबंधी समस्याओं के लिए लक्षित चिकित्सा।'
        },
        arthritis: {
          title: 'गठिया प्रबंधन',
          description: 'जोड़ों के दर्द, अकड़न और गतिशीलता की समस्याओं के लिए व्यापक देखभाल।'
        },
        postSurgery: {
          title: 'सर्जरी के बाद पुनर्वास',
          description: 'ऑर्थोपेडिक और जोड़ों की सर्जरी के बाद निर्देशित रिकवरी कार्यक्रम।'
        },
        neurological: {
          title: 'न्यूरोलॉजिकल पुनर्वास',
          description: 'स्ट्रोक रिकवरी, पार्किंसन और न्यूरोलॉजिकल स्थितियों के लिए विशेष देखभाल।'
        }
      },
      // About
      about: {
        title: 'फिजियोकेयर इंडिया क्यों चुनें?',
        subtitle: 'भारत में अग्रणी ऑनलाइन फिजियोथेरेपी प्लेटफॉर्म',
        experience: 'वर्षों का अनुभव',
        patients: 'खुश मरीज़',
        successRate: 'सफलता दर',
        availability: '24/7 उपलब्धता'
      },
      // Testimonials
      testimonials: {
        title: 'हमारे मरीज़ क्या कहते हैं',
        subtitle: 'वास्तविक लोगों की वास्तविक कहानियां'
      },
      // Pricing
      pricing: {
        title: 'पारदर्शी मूल्य निर्धारण',
        subtitle: 'वह योजना चुनें जो आपके लिए सबसे अच्छी हो',
        basic: {
          title: 'बेसिक परामर्श',
          price: '₹800',
          duration: '30 मिनट',
          features: [
            'वीडियो परामर्श',
            'व्यायाम प्रिस्क्रिप्शन',
            'बुनियादी मूल्यांकन',
            'फॉलो-अप चैट सपोर्ट'
          ]
        },
        premium: {
          title: 'प्रीमियम केयर',
          price: '₹1,500',
          duration: '45 मिनट',
          features: [
            'विस्तारित परामर्श',
            'व्यक्तिगत व्यायाम योजना',
            'प्रगति ट्रैकिंग',
            'प्राथमिकता सहायता',
            'व्यायाम वीडियो'
          ]
        },
        comprehensive: {
          title: 'व्यापक पैकेज',
          price: '₹6,500',
          duration: '3 सत्र',
          features: [
            '3 विस्तृत सत्र',
            'पूर्ण उपचार योजना',
            'साप्ताहिक प्रगति समीक्षा',
            '24/7 चैट सपोर्ट',
            'व्यायाम लाइब्रेरी एक्सेस',
            'पोषण मार्गदर्शन'
          ]
        },
        bookNow: 'अभी बुक करें',
        mostPopular: 'सबसे लोकप्रिय'
      },
      // Contact
      contact: {
        title: 'संपर्क में रहें',
        subtitle: 'अपनी रिकवरी यात्रा शुरू करने के लिए तैयार हैं?',
        form: {
          name: 'पूरा नाम',
          email: 'ईमेल पता',
          phone: 'फोन नंबर',
          subject: 'विषय',
          message: 'संदेश',
          send: 'संदेश भेजें',
          subjects: {
            booking: 'परामर्श बुक करें',
            support: 'तकनीकी सहायता',
            feedback: 'प्रतिक्रिया',
            other: 'अन्य'
          }
        },
        info: {
          phone: '+91 98765 43210',
          email: 'care@physiocareindia.com',
          hours: 'सोम-रवि: सुबह 6:00 - रात 11:00 IST'
        }
      },
      // Booking
      booking: {
        title: 'अपना परामर्श बुक करें',
        selectService: 'सेवा चुनें',
        consultationType: 'परामर्श प्रकार',
        selectDate: 'दिनांक चुनें',
        selectTime: 'समय चुनें',
        patientDetails: 'मरीज़ का विवरण',
        paymentMethod: 'भुगतान विधि',
        bookNow: 'अभी बुक करें',
        cancel: 'रद्द करें',
        types: {
          video: 'वीडियो कॉल',
          phone: 'फोन कॉल',
          chat: 'चैट परामर्श'
        }
      },
      // Common
      common: {
        loading: 'लोड हो रहा है...',
        error: 'कुछ गलत हुआ',
        success: 'सफलता!',
        tryAgain: 'फिर कोशिश करें',
        close: 'बंद करें'
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  })

export default i18n