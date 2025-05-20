import { useState } from 'react'
import { motion } from 'framer-motion'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all required fields')
      return
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return
    }
    
    // Submit form
    setError('')
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    }, 1500)
  }
  
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto text-center"
      >
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
          <p className="text-black mb-6">
            Thank you for reaching out. We'll get back to you as soon as possible.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="btn btn-primary"
          >
            Send Another Message
          </button>
        </div>
      </motion.div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-white">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
            <p className="text-black mb-6">
              We're here to help with any questions about our services. 
              Fill out the form and we'll be in touch as soon as possible.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">support@makeithumanai.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Hours</p>
                  <p className="text-sm text-gray-500">Monday - Friday: 9am - 5pm EST</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            {error && (
              <div className="mb-4 p-3 bg-error-100 text-error-800 rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  disabled={loading}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  disabled={loading}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label 
                  htmlFor="phone" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  disabled={loading}
                />
              </div>
              
              <div className="mb-6">
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="input-field"
                  disabled={loading}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactUs