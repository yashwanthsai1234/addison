import { createContext, useState, useEffect, useContext } from 'react'

// Create context
const AuthContext = createContext()

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // On mount, check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  // Get users from localStorage or initialize empty array
  const getUsers = () => {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : []
  }

  // Register a new user
  const register = (username, email, password) => {
    const users = getUsers()
    
    // Check if username or email already exists
    if (users.some(user => user.username === username)) {
      throw new Error('Username already exists')
    }
    
    if (users.some(user => user.email === email)) {
      throw new Error('Email already exists')
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    }
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify([...users, newUser]))
    
    // Auto login after registration
    setCurrentUser({ id: newUser.id, username: newUser.username, email: newUser.email })
    localStorage.setItem('user', JSON.stringify({ id: newUser.id, username: newUser.username, email: newUser.email }))
    
    return newUser
  }

  // Login user
  const login = (username, password) => {
    const users = getUsers()
    
    // Find user by username
    const user = users.find(user => user.username === username)
    
    if (!user) {
      throw new Error('Username does not exist')
    }
    
    if (user.password !== password) {
      throw new Error('Wrong credentials')
    }
    
    // Set current user
    setCurrentUser({ id: user.id, username: user.username, email: user.email })
    localStorage.setItem('user', JSON.stringify({ id: user.id, username: user.username, email: user.email }))
    
    return user
  }

  // Logout user
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('user')
  }

  // Request password reset
  const requestPasswordReset = (email) => {
    const users = getUsers()
    
    // Find user by email
    const user = users.find(user => user.email === email)
    
    if (!user) {
      throw new Error('Email not found')
    }
    
    // In a real app, this would send an email with a reset link
    // For this demo, we'll just log a message
    console.log(`Password reset requested for ${email}`)
    
    return true
  }

  const value = {
    currentUser,
    register,
    login,
    logout,
    requestPasswordReset,
    error,
    setError
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}