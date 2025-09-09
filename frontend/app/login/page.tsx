"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Check } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

return (
  <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
    {/* Background with strong blur */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url('/datasetimg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(20px)', // <-- make this higher (e.g. 80px, 100px) for extreme blur
        transform: 'scale(1.1)', // prevent edges from showing after blur
      }}
    ></div>

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/30"></div>
      {/* Login Form Container */}
      <div className="w-full max-w-4xl flex bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">LOGIN</h1>
              <p className="text-gray-600 text-sm">Just a step away from exploring your dashboard</p>
            </div>

            {/* Already member link */}
            <div className="text-center mb-4">
              <span className="text-gray-600 text-sm">Don't have an account? </span>
              <a href="/signup" className="text-blue-600 font-medium hover:underline text-sm">Sign up</a>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email Address"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 px-6 rounded-xl font-medium hover:bg-green-500 transition-colors duration-200 flex items-center justify-center"
              >
                Login
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

          

              
            </form>
          </motion.div>
        </div>

        {/* Right Side - Analysis Image */}
        <div className="flex-1 relative overflow-hidden">
          <img 
            src="/datasetimg.jpg" 
            alt="Analysis" 
            className="w-half h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
          
        </div>
      </div>
    </div>
  );
}