import { motion } from 'framer-motion'

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Make It Human</h1>
        <p className="text-xl text-white">Founded on May 19, 2025</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-8 mb-12"
      >
        <p className="text-lg text-black leading-relaxed mb-6">
          At Make It Human, we believe in the power of authentic human connection through language. 
          As AI-generated content becomes increasingly prevalent in our digital world, we've set out 
          to build a bridge between the efficiency of artificial intelligence and the warmth of human expression.
        </p>
        
        <p className="text-lg text-black leading-relaxed mb-6">
          Founded by a team of linguistic experts and natural language processing specialists, our mission 
          is to help writers, marketers, educators, and businesses transform AI-generated text into content 
          that resonates with human readers. We understand that while AI can create technically accurate 
          content at scale, it often lacks the nuanced voice, cultural awareness, and emotional intelligence 
          that defines truly compelling human communication.
        </p>
        
        <p className="text-lg text-black leading-relaxed">
          Our proprietary humanization technology analyzes patterns in AI-generated text and applies 
          transformations that add variance, improve flow, and enhance readability—all while maintaining 
          the original meaning and intent. Whether you're crafting emails, creating marketing copy, writing 
          educational content, or developing user documentation, Make It Human helps you leverage the 
          efficiency of AI while ensuring your message connects with your audience on a human level.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Authentic Communication</h3>
            <p className="text-black">
              We believe in preserving the authenticity of human expression in a world increasingly mediated by AI.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy & Security</h3>
            <p className="text-black">
              We're committed to protecting your data and never storing your content longer than necessary to process it.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-black">
              We continuously refine our humanization technology to stay ahead of evolving AI language patterns.
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Join Us in the Human-AI Collaboration</h2>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Experience the perfect balance of AI efficiency and human expression with Make It Human.
        </p>
        <a
          href="/"
          className="btn btn-primary px-8 py-3 text-lg"
        >
          Try It Now
        </a>
      </motion.div>
    </div>
  )
}

export default AboutUs