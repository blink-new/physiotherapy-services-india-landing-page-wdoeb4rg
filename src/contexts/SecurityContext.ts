import { createContext } from 'react'

export interface SecurityContextType {
  isSecure: boolean
  sessionValid: boolean
  refreshSession: () => void
  reportSuspiciousActivity: (activity: string) => void
}

export const SecurityContext = createContext<SecurityContextType | undefined>(undefined)