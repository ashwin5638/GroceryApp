import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCreditCard, FaMobileAlt, FaMoneyBillWave, FaCheckCircle, FaArrowLeft } from 'react-icons/fa'
import MainLayout from '../layouts/MainLayout'
import { useCart } from '../hooks/useCart'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: <FaCreditCard className="text-xl" /> },
  { id: 'upi', label: 'UPI', icon: <FaMobileAlt className="text-xl" /> },
  { id: 'cod', label: 'Cash on Delivery', icon: <FaMoneyBillWave className="text-xl" /> },
]

const CheckoutPage = () => {
  const { subtotal, clearAll } = useCart()
  const shipping = 10
  const total = subtotal + shipping
  const [step, setStep] = useState('form')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)

  const handlePayment = () => {
    setProcessing(true)
    setTimeout(async () => {
      await clearAll()
      setProcessing(false)
      setStep('success')
    }, 1500)
  }

  return (
    <MainLayout>
      <div className="flex max-md:flex-col max-md:items-center gap-8 p-5">
        <div className="bg-green-600 rounded-xl w-[830px] ml-8 mt-8 flex flex-col justify-center p-8 max-md:w-[95%] max-md:ml-auto max-md:mr-auto max-md:h-auto">
          <h1 className="text-white text-2xl ml-8 font-bold">Complete your Order</h1>

          <div className="flex gap-4 mt-4 max-md:flex-col">
            <input id="firstName" name="firstName" placeholder="First Name" required className="h-9 w-[350px] text-white font-bold rounded pl-5 border border-green-300 max-md:w-full" />
            <input id="lastName" name="lastName" placeholder="Last Name" required className="h-9 w-[350px] text-white font-bold rounded pl-5 border border-green-300 max-md:w-full" />
          </div>
          <input id="email" name="email" type="email" placeholder="Email address" required className="h-9 w-[750px] text-white font-bold rounded pl-4 mt-4 border border-green-300 max-md:w-full" />
          <div className="flex gap-4 mt-4 max-md:flex-col">
            <input id="city" name="city" placeholder="City" className="h-9 w-[350px] text-white font-bold rounded pl-5 border border-green-300 max-md:w-full" />
            <input id="street" name="street" placeholder="Street" className="h-9 w-[350px] text-white font-bold rounded pl-5 border border-green-300 max-md:w-full" />
          </div>
          <div className="flex gap-4 mt-4 max-md:flex-col">
            <input id="zipCode" name="zipCode" placeholder="Zip code" className="h-9 w-[350px] text-white font-bold rounded pl-5 border border-green-300 max-md:w-full" />
            <input id="country" name="country" placeholder="Country" className="h-9 w-[350px] text-white font-bold rounded pl-5 border border-green-300 max-md:w-full" />
          </div>
          <input id="phone" name="phone" placeholder="Phone" className="h-9 w-[750px] text-white font-bold rounded pl-4 mt-4 border border-green-300 max-md:w-full" />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 w-[350px] max-md:w-[90%] max-md:mx-auto">
          <h2 className="text-xl font-semibold text-center mb-4">Order Summary</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm font-bold text-gray-800">₹{subtotal}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Shipping</span>
            <span className="text-sm font-bold text-gray-800">₹{shipping}</span>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Total</span>
            <span className="text-sm font-bold text-gray-800">₹{total}</span>
          </div>

          {step === 'form' && (
            <button
              onClick={() => setStep('payment')}
              className="w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold border-0 rounded-lg cursor-pointer transition-all hover:from-green-700 hover:to-green-800"
            >
              Proceed to Payment
            </button>
          )}

          {step === 'payment' && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">Select Payment Method</h3>
              <div className="flex flex-col gap-2">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-all ${
                      paymentMethod === method.id ? 'border-green-600 bg-green-50' : 'border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="accent-green-600"
                    />
                    {method.icon}
                    <span className="text-sm font-medium">{method.label}</span>
                  </label>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="flex flex-col gap-2 mt-3">
                  <input placeholder="Card Number (4242 4242 4242 4242)" className="h-9 rounded pl-4 border border-gray-300 text-sm" />
                  <div className="flex gap-2">
                    <input placeholder="MM/YY" className="h-9 w-1/2 rounded pl-4 border border-gray-300 text-sm" />
                    <input placeholder="CVV" className="h-9 w-1/2 rounded pl-4 border border-gray-300 text-sm" />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <input
                  placeholder="UPI ID (yourname@upi)"
                  defaultValue="yourname@upi"
                  className="h-9 w-full rounded pl-4 mt-3 border border-gray-300 text-sm"
                />
              )}

              {paymentMethod === 'cod' && (
                <p className="text-sm text-gray-500 mt-3 italic">*Pay in cash when your order is delivered.</p>
              )}

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold border-0 rounded-lg cursor-pointer transition-all hover:from-green-700 hover:to-green-800 disabled:opacity-50"
              >
                {processing ? 'Processing...' : `Pay ₹${total}`}
              </button>
              <button
                onClick={() => setStep('form')}
                disabled={processing}
                className="w-full py-2 mt-2 flex items-center justify-center gap-2 text-sm text-gray-500 bg-transparent border-0 cursor-pointer hover:text-gray-700"
              >
                <FaArrowLeft /> Back
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="mt-4 text-center">
              <FaCheckCircle className="text-6xl text-green-600 mx-auto" />
              <h3 className="text-xl font-bold mt-3 text-green-700">Payment Successful</h3>
              <p className="text-sm text-gray-600 mt-2">Your order will be delivered soon.</p>
              <Link to="/product">
                <button className="w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold border-0 rounded-lg cursor-pointer transition-all hover:from-green-700 hover:to-green-800">
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default CheckoutPage
