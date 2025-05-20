import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!username || !password) {
      setError('Please enter both username and password')
      return
    }
    
    try {
      setError('')
      setLoading(true)
      await login(username, password)
      navigate('/')
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
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-error-100 text-error-800 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              disabled={loading}
            />
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full mb-4"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <div className="text-center">
            <Link 
              to="/forgot-password" 
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Forgot Username or Password?
            </Link>
            
            <div className="mt-4">
              <span className="text-gray-600">Don't have an account? </span>
              <Link 
                to="/register" 
                className="text-primary-600 hover:text-primary-800"
              >
                Create New Account
              </Link>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Login