import { FaCoins, FaCheck } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const PricingCard = ({ 
  title, 
  price, 
  credits,
  features,
  isPopular = false,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-lg shadow-lg overflow-hidden bg-white text-black ${
        isPopular ? 'border-2 border-primary-500' : 'border border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="bg-primary-500 py-1 text-white text-center text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
        
        <div className="mb-4">
          <span className="text-3xl font-bold text-black">${price}</span>
          <span className="text-black">/month</span>
        </div>
        
        <div className="flex items-center mb-4 text-lg text-black">
          <FaCoins className="text-yellow-500 mr-2" />
          <span className={`font-bold ${isPopular ? 'text-white' : 'text-cyan-800'}`}>{credits.toLocaleString()} credits</span>
        </div>
        
        <hr className="my-4 border-gray-200" />
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-black">
              <FaCheck className="text-success-500 mt-1 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto">
          <Link
            to="/login"
            className="btn w-full bg-primary-600 text-white hover:bg-primary-700 border-none"
          >
            Start 7-day Free Trial
          </Link>
          <p className="text-xs text-center mt-2 text-black">
            No credit card required
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default PricingCard