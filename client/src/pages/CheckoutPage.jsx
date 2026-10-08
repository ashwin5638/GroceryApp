import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { FaCreditCard, FaMobileAlt, FaMoneyBillWave, FaCheckCircle, FaArrowLeft } from 'react-icons/fa'
import MainLayout from '../layouts/MainLayout'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useCart } from '../hooks/useCart'
import { useForm } from '../hooks/useForm'
import { DELIVERY_FEE } from '../lib/constants'
import { EASE } from '../lib/motion'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: <FaCreditCard className="text-xl" /> },
  { id: 'upi', label: 'UPI', icon: <FaMobileAlt className="text-xl" /> },
  { id: 'cod', label: 'Cash on Delivery', icon: <FaMoneyBillWave className="text-xl" /> },
]

const validate = (values) => {
  const errors = {}
  const required = {
    name: 'Name is required',
    phone: 'Phone number is required',
    street: 'Street address is required',
    city: 'City is required',
    zipCode: 'Zip code is required',
  }

  for (const [field, message] of Object.entries(required)) {
    if (!values[field].trim()) errors[field] = message
  }

  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email is invalid'

  return errors
}

const CheckoutPage = () => {
  const { subtotal, clearAll } = useCart()
  const total = subtotal + DELIVERY_FEE

  const [step, setStep] = useState('address')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)

  const { values, errors, handleChange, handleBlur, validateAll } = useForm(
    { name: '', email: '', phone: '', street: '', city: '', zipCode: '' },
    validate,
  )

  // No payment gateway is wired up: this simulates the gateway round trip, then
  // empties the cart. Swap this for a real provider before taking real money.
  const handlePayment = () => {
    setProcessing(true)
    setTimeout(() => {
      clearAll()
      setProcessing(false)
      setStep('success')
    }, 1500)
  }

  return (
    <MainLayout>
      <div className="flex max-md:flex-col max-md:items-center gap-8 p-5">
        <div className="bg-green-600 rounded-xl w-[830px] ml-8 mt-8 p-8 max-md:w-[95%] max-md:ml-auto max-md:mr-auto">
          <h1 className="text-white text-2xl font-bold mb-6">Delivery details</h1>

          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Input
              label="Full name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              className="bg-white/10 border-green-300 text-white placeholder:text-white/60"
            />

            <Input
              label="Phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Phone number"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              className="bg-white/10 border-green-300 text-white placeholder:text-white/60"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              className="bg-white/10 border-green-300 text-white placeholder:text-white/60"
            />

            <Input
              label="Zip code"
              name="zipCode"
              autoComplete="postal-code"
              placeholder="Zip code"
              value={values.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.zipCode}
              className="bg-white/10 border-green-300 text-white placeholder:text-white/60"
            />

            <Input
              label="Street address"
              name="street"
              autoComplete="street-address"
              placeholder="Street address"
              value={values.street}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.street}
              className="bg-white/10 border-green-300 text-white placeholder:text-white/60"
            />

            <Input
              label="City"
              name="city"
              autoComplete="address-level2"
              placeholder="City"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.city}
              className="bg-white/10 border-green-300 text-white placeholder:text-white/60"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 w-[350px] max-md:w-[90%] max-md:mx-auto">
          <h2 className="text-xl font-semibold text-center mb-4">Order Summary</h2>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm font-bold text-gray-800">₹{subtotal}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Delivery</span>
            <span className="text-sm font-bold text-gray-800">₹{DELIVERY_FEE}</span>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Total</span>
            <span className="text-sm font-bold text-gray-800">₹{total}</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 'address' && (
              <motion.div
                key="address"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <Button
                  variant="gradient"
                  className="shine-btn w-full mt-4"
                  onClick={() => validateAll() && setStep('payment')}
                >
                  Proceed to Payment
                </Button>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="mt-4"
              >
                <h3 className="text-lg font-semibold mb-3">Select Payment Method</h3>

                <div className="flex flex-col gap-2">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="accent-green-600"
                      />
                      {method.icon}
                      <span className="text-sm font-medium">{method.label}</span>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'cod' && (
                  <p className="text-sm text-gray-500 mt-3 italic">
                    Pay in cash when your order is delivered.
                  </p>
                )}

                <Button
                  variant="gradient"
                  className="shine-btn w-full mt-4"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? 'Processing...' : `Pay ₹${total}`}
                </Button>

                <Button variant="ghost" className="w-full mt-2" onClick={() => setStep('address')} disabled={processing}>
                  <FaArrowLeft className="mr-2" />
                  Back
                </Button>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="mt-4 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.1 }}
                >
                  <FaCheckCircle className="text-6xl text-green-600 mx-auto" />
                </motion.div>

                <h3 className="text-xl font-bold mt-3 text-green-700">Payment Successful</h3>
                <p className="text-sm text-gray-600 mt-2">Your order will be delivered soon.</p>

                <Link to="/product" className="block mt-4">
                  <Button variant="gradient" className="shine-btn w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  )
}

export default CheckoutPage