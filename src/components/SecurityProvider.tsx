import React, { useEffect, useState, useCallback } from 'react'
import { validateSession, createSecureSession, logSecurityEvent } from '../lib/security'
import { SecurityContext, SecurityContextType } from '../contexts/SecurityContext'

interface SecurityProviderProps {
  children: React.ReactNode
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [isSecure, setIsSecure] = useState(false)
  const [sessionValid, setSessionValid] = useState(false)

  const reportSuspiciousActivity = useCallback((activity: string) => {
    logSecurityEvent('suspicious_activity', { 
      activity, 
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    })
    
    // In production, this would trigger additional security measures
    if (process.env.NODE_ENV === 'production') {
      console.warn('Suspicious activity detected:', activity)
    }
  }, [])

  const initializeSecurity = useCallback(() => {
    try {
      // Create secure session
      createSecureSession()
      setSessionValid(true)
      
      // Set security headers (simulated for client-side)
      document.querySelector('meta[http-equiv="X-Content-Type-Options"]')?.remove()
      const metaTag = document.createElement('meta')
      metaTag.httpEquiv = 'X-Content-Type-Options'
      metaTag.content = 'nosniff'
      document.head.appendChild(metaTag)
      
      // Disable right-click context menu for security
      document.addEventListener('contextmenu', (e) => {
        if (process.env.NODE_ENV === 'production') {
          e.preventDefault()
        }
      })
      
      // Disable F12 and other dev tools shortcuts in production
      document.addEventListener('keydown', (e) => {
        if (process.env.NODE_ENV === 'production') {
          if (e.key === 'F12' || 
              (e.ctrlKey && e.shiftKey && e.key === 'I') ||
              (e.ctrlKey && e.shiftKey && e.key === 'C') ||
              (e.ctrlKey && e.key === 'u')) {
            e.preventDefault()
            logSecurityEvent('dev_tools_attempt', { key: e.key, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey })
          }
        }
      })
      
      setIsSecure(true)
      logSecurityEvent('security_initialized', { timestamp: Date.now() })
    } catch (error) {
      console.error('Security initialization failed:', error)
      logSecurityEvent('security_init_failed', { error: error.message })
    }
  }, [])

  const setupSecurityMonitoring = useCallback(() => {
    // Monitor for suspicious activities
    let clickCount = 0
    let lastClickTime = 0
    
    document.addEventListener('click', () => {
      const now = Date.now()
      if (now - lastClickTime < 100) {
        clickCount++
        if (clickCount > 10) {
          reportSuspiciousActivity('rapid_clicking')
          clickCount = 0
        }
      } else {
        clickCount = 0
      }
      lastClickTime = now
    })
    
    // Monitor for console access attempts
    const devtools = { open: false, orientation: null }
    const threshold = 160
    
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true
          if (process.env.NODE_ENV === 'production') {
            logSecurityEvent('devtools_opened', { timestamp: Date.now() })
          }
        }
      } else {
        devtools.open = false
      }
    }, 500)
  }, [reportSuspiciousActivity])

  const refreshSession = useCallback(() => {
    try {
      createSecureSession()
      setSessionValid(true)
      logSecurityEvent('session_refreshed', { timestamp: Date.now() })
    } catch (error) {
      console.error('Session refresh failed:', error)
      logSecurityEvent('session_refresh_failed', { error: error.message })
    }
  }, [])

  useEffect(() => {
    // Initialize security measures
    initializeSecurity()
    
    // Set up security monitoring
    setupSecurityMonitoring()
    
    // Validate session periodically
    const sessionInterval = setInterval(() => {
      const valid = validateSession()
      setSessionValid(valid)
      if (!valid) {
        refreshSession()
      }
    }, 60000) // Check every minute

    return () => clearInterval(sessionInterval)
  }, [initializeSecurity, setupSecurityMonitoring, refreshSession])

  const value: SecurityContextType = {
    isSecure,
    sessionValid,
    refreshSession,
    reportSuspiciousActivity
  }

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  )
}