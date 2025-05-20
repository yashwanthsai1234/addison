import { createContext, useState, useEffect, useContext } from 'react'
import { useAuth } from './AuthContext'

// Initial credits for a new user
const INITIAL_CREDITS = 500
const CREDITS_PER_USE = 5

// Create context
const CreditContext = createContext()

// Custom hook to use the credit context
export const useCredits = () => {
  return useContext(CreditContext)
}

export const CreditProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const [credits, setCredits] = useState(INITIAL_CREDITS)

  // Load credits from localStorage when user changes
  useEffect(() => {
    if (currentUser) {
      const userCredits = localStorage.getItem(`credits_${currentUser.id}`)
      if (userCredits) {
        setCredits(parseInt(userCredits))
      } else {
        // Set initial credits for new user
        setCredits(INITIAL_CREDITS)
        localStorage.setItem(`credits_${currentUser.id}`, INITIAL_CREDITS.toString())
      }
    } else {
      // Use cache for non-logged in users
      const guestCredits = localStorage.getItem('guest_credits')
      if (guestCredits) {
        setCredits(parseInt(guestCredits))
      } else {
        setCredits(INITIAL_CREDITS)
        localStorage.setItem('guest_credits', INITIAL_CREDITS.toString())
      }
    }
  }, [currentUser])

  // Use credits
  const useCredits = () => {
    if (credits < CREDITS_PER_USE) {
      throw new Error('Not enough credits')
    }
    
    const newCredits = credits - CREDITS_PER_USE
    setCredits(newCredits)
    
    // Save to localStorage
    if (currentUser) {
      localStorage.setItem(`credits_${currentUser.id}`, newCredits.toString())
    } else {
      localStorage.setItem('guest_credits', newCredits.toString())
    }
    
    return newCredits
  }

  // Add credits (for subscription plans)
  const addCredits = (amount) => {
    const newCredits = credits + amount
    setCredits(newCredits)
    
    // Save to localStorage
    if (currentUser) {
      localStorage.setItem(`credits_${currentUser.id}`, newCredits.toString())
    } else {
      localStorage.setItem('guest_credits', newCredits.toString())
    }
    
    return newCredits
  }

  const value = {
    credits,
    useCredits,
    addCredits,
    CREDITS_PER_USE
  }

  return (
    <CreditContext.Provider value={value}>
      {children}
    </CreditContext.Provider>
  )
}