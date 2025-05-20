import { useState, useRef } from 'react'
import { useCredits } from '../../context/CreditContext'
import { useProjects } from '../../context/ProjectContext'
import { motion } from 'framer-motion'

const HumanizeForm = () => {
  const [aiText, setAiText] = useState('')
  const [humanizedText, setHumanizedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { credits, deductCredits, CREDITS_PER_USE } = useCredits()
  const { saveProject } = useProjects()
  const textareaRef = useRef(null)

  // Mock humanization function (in a real app, this would call an API)
  const humanizeText = async (text) => {
    // Simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Example transformation - in real app this would be an API call
        const result = text
          .replace(/\b(I think|I believe|In my opinion)\b/gi, '')
          .replace(/\b(very|really|extremely|literally)\b/gi, '')
          .replace(/\b(utilize|leverage|facilitate)\b/gi, 'use')
          .replace(/\b(in order to)\b/gi, 'to')
          .replace(/\b(due to the fact that)\b/gi, 'because')
          .replace(/\b(at this point in time)\b/gi, 'now')
          .replace(/\.{3,}/g, '...')
          .replace(/!{2,}/g, '!')
          .replace(/\s{2,}/g, ' ')
          .trim();
        
        resolve(result);
      }, 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!aiText.trim()) {
      setError('Please enter some text to humanize')
      return
    }
    
    try {
      if (credits < CREDITS_PER_USE) {
        setError('Not enough credits')
        return
      }
      
      setIsLoading(true)
      setError('')
      
      // Process the text
      const result = await humanizeText(aiText)
      
      // Use credits
      deductCredits()
      
      // Save to projects
      saveProject(aiText, result)
      
      // Update UI
      setHumanizedText(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setAiText('')
    setHumanizedText('')
    setError('')
    textareaRef.current?.focus()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-medium">
          <span className="text-black">Credits: </span>
          <span className="font-bold text-cyan-700">{credits}</span>
          <span className="text-black text-xs ml-1">
            ({CREDITS_PER_USE} credits per use)
          </span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="aiText" 
            className="block text-sm font-medium text-black mb-1"
          >
            Enter AI Text
          </label>
          <textarea
            id="aiText"
            ref={textareaRef}
            value={aiText}
            onChange={(e) => setAiText(e.target.value)}
            placeholder="Paste your AI-generated text here..."
            className="input-field h-40 bg-white"
            disabled={isLoading}
            data-credits-warning={credits < CREDITS_PER_USE ? "Out of credits" : ""}
          />
          {credits < CREDITS_PER_USE && (
            <p className="mt-1 text-sm text-error-600">
              You're out of credits. Please upgrade to continue.
            </p>
          )}
        </div>
        
        <div className="flex justify-center mb-6">
          <button
            type="submit"
            className="btn btn-primary px-8 py-3 text-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || credits < CREDITS_PER_USE || !aiText.trim()}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Humanizing
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ...
                </motion.span>
              </span>
            ) : (
              'Humanize'
            )}
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-error-100 text-error-800 rounded-md">
            {error}
          </div>
        )}
        
        {humanizedText && !isLoading && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-medium">Humanized Result</h3>
              <button
                type="button"
                onClick={handleReset}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                Start Over
              </button>
            </div>
            <div className="p-4 bg-primary-600 text-white border border-gray-200 rounded-md">
              <p className="whitespace-pre-wrap">{humanizedText}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default HumanizeForm