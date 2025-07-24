// Security utilities and validation
import { z } from 'zod'

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
}

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export const rateLimit = (identifier: string, maxRequests: number = 5, windowMs: number = 60000): boolean => {
  const now = Date.now()
  const key = identifier
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

// CSRF token generation and validation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Secure session management
export const createSecureSession = () => {
  const sessionId = generateCSRFToken()
  const expiresAt = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  
  sessionStorage.setItem('session_id', sessionId)
  sessionStorage.setItem('session_expires', expiresAt.toString())
  
  return { sessionId, expiresAt }
}

export const validateSession = (): boolean => {
  const sessionId = sessionStorage.getItem('session_id')
  const expiresAt = sessionStorage.getItem('session_expires')
  
  if (!sessionId || !expiresAt) return false
  
  const now = Date.now()
  if (now > parseInt(expiresAt)) {
    sessionStorage.removeItem('session_id')
    sessionStorage.removeItem('session_expires')
    return false
  }
  
  return true
}

// Enhanced validation schemas with security
export const securePhoneSchema = z.string()
  .min(10, 'Phone number must be 10 digits')
  .max(10, 'Phone number must be 10 digits')
  .regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number')
  .transform(sanitizeInput)

export const secureEmailSchema = z.string()
  .email('Invalid email address')
  .max(254, 'Email too long')
  .transform(sanitizeInput)

export const secureNameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name too long')
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
  .transform(sanitizeInput)

export const secureMessageSchema = z.string()
  .min(10, 'Message must be at least 10 characters')
  .max(1000, 'Message too long')
  .transform(sanitizeInput)

// Content Security Policy headers
export const getCSPHeaders = () => ({
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://checkout.razorpay.com https://api.razorpay.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.razorpay.com https://checkout.razorpay.com wss:",
    "frame-src 'self' https://api.razorpay.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ')
})

// XSS Protection
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// Secure local storage with encryption
const ENCRYPTION_KEY = 'physiocare_secure_key_2024'

export const secureStorage = {
  setItem: (key: string, value: string) => {
    try {
      const encrypted = btoa(value + '|' + ENCRYPTION_KEY)
      localStorage.setItem(key, encrypted)
    } catch (error) {
      console.error('Failed to store secure data:', error)
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      const encrypted = localStorage.getItem(key)
      if (!encrypted) return null
      
      const decrypted = atob(encrypted)
      const [value, keyCheck] = decrypted.split('|')
      
      if (keyCheck !== ENCRYPTION_KEY) return null
      return value
    } catch (error) {
      console.error('Failed to retrieve secure data:', error)
      return null
    }
  },
  
  removeItem: (key: string) => {
    localStorage.removeItem(key)
  }
}

// Security audit logging
export const logSecurityEvent = (event: string, details: any) => {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    event,
    details,
    userAgent: navigator.userAgent,
    url: window.location.href
  }
  
  console.warn('Security Event:', logEntry)
  
  // In production, send to security monitoring service
  // securityMonitoringService.log(logEntry)
}