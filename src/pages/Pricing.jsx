import { motion } from 'framer-motion'
import PricingCard from '../components/ui/PricingCard'

const Pricing = () => {
  const pricingPlans = [
    {
      title: 'Free',
      price: 0,
      credits: 500,
      features: [
        'Basic humanization',
        'English language only',
        '500 initial credits',
        'Standard support',
      ],
      isPopular: false,
    },
    {
      title: 'Pro',
      price: 14.99,
      credits: 10000,
      features: [
        '10,000 additional credits',
        'Advanced humanization',
        'Spanish, French and German support',
        'Priority support',
      ],
      isPopular: true,
    },
    {
      title: 'Pro Plus',
      price: 29.99,
      credits: 70000,
      features: [
        '70,000 additional credits',
        'Premium humanization',
        'All supported languages',
        'Priority support',
        'Custom tone settings',
      ],
      isPopular: false,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-white max-w-2xl mx-auto">
          Choose the plan that's right for you with our flexible pricing options.
          All plans come with a 7-day free trial.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
          >
            <PricingCard
              title={plan.title}
              price={plan.price}
              credits={plan.credits}
              features={plan.features}
              isPopular={plan.isPopular}
            />
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-gray-50 rounded-lg p-8 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Need a custom plan?</h2>
        <p className="text-black mb-6">
          For teams and businesses with higher volume needs, we offer custom plans with volume discounts.
        </p>
        <a
          href="/contact"
          className="btn btn-primary inline-block"
        >
          Contact Us
        </a>
      </motion.div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-2">What happens when I run out of credits?</h3>
            <p className="text-black">
              When you run out of credits, you'll need to upgrade to a paid plan to continue using the service. 
              Credits are non-refundable and don't roll over to the next month.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-2">Can I cancel my subscription anytime?</h3>
            <p className="text-black">
              Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of your current billing period.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-2">How does the free trial work?</h3>
            <p className="text-black">
              Our 7-day free trial gives you full access to all features of your chosen plan. 
              No credit card is required to start the trial. You'll be notified before the trial ends.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing