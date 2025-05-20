import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { requestPasswordReset } = useAuth()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email address')
      return
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    try {
      setError('')
      setMessage('')
      setLoading(true)
      await requestPasswordReset(email)
      setMessage('Check your email for further instructions')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-8"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-error-100 text-error-800 rounded-md">
            {error}
          </div>
        )}
        
        {message && (
          <div className="mb-4 p-3 bg-success-100 text-success-800 rounded-md">
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              disabled={loading}
              placeholder="Enter your registered email"
            />
            <p className="mt-2 text-sm text-gray-500">
              We'll send you a link to reset your password
            </p>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full mb-4"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
          
          <div className="text-center">
            <Link 
              to="/login" 
              className="text-primary-600 hover:text-primary-800"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default ForgotPassword