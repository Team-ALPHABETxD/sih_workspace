"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1 fields
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    // Step 2 fields
    gender: "",
    age: "",
    occupation: ""
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Phone number is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (parseInt(formData.age) < 13 || parseInt(formData.age) > 120) {
      newErrors.age = "Age must be between 13 and 120";
    }

    if (!formData.occupation.trim()) {
      newErrors.occupation = "Occupation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 0 && validateStep1()) {
      setCurrentStep(1);
    }
  };

  const handleBack = () => {
    setCurrentStep(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1 && validateStep2()) {
      console.log("Form submitted:", formData);
      // Handle form submission here
      alert("Account created successfully!");
    }
  };

  return (
    <div 
      className="min-h-screen absolute flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/backimg1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay and blur for better text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
      
      {/* Blurred Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl relative z-10"
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left Section - Image/Illustration */}
             <div className="hidden lg:flex bg-gradient-to-br from-cyan-600 to-teal-700 p-12 flex-col justify-center relative overflow-hidden">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative z-10 text-white"
              >
                <h2 className="text-4xl font-bold mb-4 text-center">Metal Craft</h2>
                <p className="text-lg mb-8 opacity-90">
                  Join us in protecting water resources through advanced heavy metal prediction and environmental monitoring
                </p>
                
                {/* SVG Illustration */}
                <div className="mt-6">
                  <img 
                    src="/signupPage.svg" 
                    alt="Signup illustration"
                    className="w-full h-56 object-contain"
                  />
                </div>
                
                <div className="mt-10 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <p className="text-sm opacity-90">Your data is securely protected</p>
                </div>
              </motion.div>
            </div>

            {/* Right Section - Form */}
            <div className="p-6 flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Join Metal Craft</h2>
                  <p className="text-gray-600 text-sm">
                    {currentStep === 0
                      ? "Create your account to get started"
                      : "Tell us a bit more about yourself"}
                  </p>
                  
                  {/* Step indicator dots */}
                  <div className="flex justify-center mt-4 mb-2">
                    {[0, 1].map((step) => (
                      <div
                        key={step}
                        className={`w-3 h-3 rounded-full mx-1 ${
                          currentStep === step ? "bg-cyan-400" : "bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  {currentStep === 0 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form className="space-y-4">
                        <div className="space-y-3">
                          <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                          errors.name ? 'border-red-400 bg-red-50 text-red-900' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                              required
                            />
                            {errors.name && <p className="text-red-300 text-xs mt-1">{errors.name}</p>}
                          </div>

                          <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email"
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                          errors.email ? 'border-red-400 bg-red-50 text-red-900' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                              required
                            />
                            {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                          </div>

                          <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                            <input
                              id="phoneNumber"
                              name="phoneNumber"
                              type="tel"
                              value={formData.phoneNumber}
                              onChange={handleInputChange}
                              placeholder="Enter your phone number"
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                          errors.phoneNumber ? 'border-red-400 bg-red-50 text-red-900' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                              required
                            />
                            {errors.phoneNumber && <p className="text-red-300 text-xs mt-1">{errors.phoneNumber}</p>}
                          </div>

                          <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                            <input
                              id="password"
                              name="password"
                              type="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              placeholder="Create a password"
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                          errors.password ? 'border-red-400 bg-red-50 text-red-900' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                              required
                            />
                            {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password}</p>}
                          </div>

                          <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              placeholder="Confirm your password"
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                          errors.confirmPassword ? 'border-red-400 bg-red-50 text-red-900' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                              required
                            />
                            {errors.confirmPassword && <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleNext}
                          className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:from-cyan-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl mt-4"
                        >
                          Continue
                        </button>

                        {/* Login Link */}
                        <div className="text-center pt-2">
                          <p className="text-gray-600 text-sm">
                            Already have an account?{" "}
                            <a href="/login" className="text-cyan-600 hover:text-cyan-800 font-semibold transition-colors duration-200">
                              Sign in
                            </a>
                          </p>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                              Gender
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                                errors.gender ? 'border-red-400 bg-red-50 text-red-900' : 'border-gray-300 bg-white text-gray-900'
                              }`}
                              required
                            >
                              <option value="" className="text-gray-800">Select your gender</option>
                              <option value="male" className="text-gray-800">Male</option>
                              <option value="female" className="text-gray-800">Female</option>
                              <option value="other" className="text-gray-800">Other</option>
                              <option value="prefer-not-to-say" className="text-gray-800">Prefer not to say</option>
                            </select>
                            {errors.gender && <p className="text-red-300 text-xs mt-1">{errors.gender}</p>}
                          </div>

                          <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                              Age
                            </label>
                            <input
                              id="age"
                              name="age"
                              type="number"
                              value={formData.age}
                              onChange={handleInputChange}
                              placeholder="Enter your age"
                              min="13"
                              max="120"
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                                errors.age ? 'border-red-400 bg-red-50 text-red-900' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                              }`}
                              required
                            />
                            {errors.age && <p className="text-red-300 text-xs mt-1">{errors.age}</p>}
                          </div>

                          <div>
                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                              Occupation
                            </label>
                            <input
                              id="occupation"
                              name="occupation"
                              type="text"
                              value={formData.occupation}
                              onChange={handleInputChange}
                              placeholder="Enter your occupation"
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                                errors.occupation ? 'border-red-400 bg-red-50 text-red-900' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                              }`}
                              required
                            />
                            {errors.occupation && <p className="text-red-300 text-xs mt-1">{errors.occupation}</p>}
                          </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="w-1/3 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg font-medium text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-all duration-200 border border-gray-300"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="w-2/3 bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:from-cyan-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            Create Account
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}