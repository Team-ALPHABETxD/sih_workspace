"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

type FormErrors = { [key: string]: string };

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    occupation: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const { signup, isLoading } = useAuth();
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ✅ Step 1 validation
  const validateStep1 = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/\s/g, ""))
    ) {
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

  // ✅ Step 2 validation
  const validateStep2 = () => {
    const newErrors: FormErrors = {};

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (+formData.age < 13 || +formData.age > 120) {
      newErrors.age = "Age must be between 13 and 120";
    }

    if (!formData.occupation.trim())
      newErrors.occupation = "Occupation is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 0 && validateStep1()) {
      setCurrentStep(1);
    }
  };

  const handleBack = () => setCurrentStep(0);

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1 && validateStep2()) {
      try {
        const submissionData = {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          age: formData.age,
          gender: formData.gender,
          occupation: formData.occupation,
        };

        const response = await fetch(
          "http://localhost:8000/server/v1/apis/user/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submissionData),
          }
        );

        if (response.ok) {
          window.location.href = "/login";
        } else {
          const resData = await response.json();
          setErrors({
            general: resData.message || "Signup failed. Please try again.",
          });
        }
      } catch (error) {
        setErrors({
          general: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url(/backimg1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"></div>

      {/* Blurred shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply blur-xl opacity-50 animate-pulse"></div>
      </div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl relative z-10"
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left side */}
            <div className="hidden lg:flex bg-gradient-to-br from-cyan-600 to-teal-700 p-12 flex-col justify-center relative">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-white"
              >
                <h2 className="text-4xl font-bold mb-4 text-center">
                  Metal Craft
                </h2>
                <p className="text-lg mb-8 opacity-90 text-center">
                  Join us in protecting water resources through advanced heavy
                  metal prediction and environmental monitoring.
                </p>
                <img
                  src="/signupPage.svg"
                  alt="Signup illustration"
                  className="w-full h-56 object-contain"
                />
              </motion.div>
            </div>

            {/* Right side - Form */}
            <div className="p-6 flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Join Metal Craft
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {currentStep === 0
                      ? "Create your account to get started"
                      : "Tell us a bit more about yourself"}
                  </p>

                  {/* Step indicator */}
                  <div className="flex justify-center mt-4 mb-2">
                    {[0, 1].map((step) => (
                      <div
                        key={step}
                        className={`w-3 h-3 rounded-full mx-1 ${
                          currentStep === step
                            ? "bg-cyan-400"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Error message */}
                {errors.general && (
                  <div className="mb-4 text-red-500 text-sm text-center">
                    {errors.general}
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {currentStep === 0 ? (
                    // Step 1
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form>
                        <div className="space-y-4">
                          <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg"
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name}</p>
                          )}

                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                          )}

                          <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg"
                          />
                          {errors.phoneNumber && (
                            <p className="text-red-500 text-sm">
                              {errors.phoneNumber}
                            </p>
                          )}

                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg"
                          />
                          {errors.password && (
                            <p className="text-red-500 text-sm">
                              {errors.password}
                            </p>
                          )}

                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg"
                          />
                          {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                              {errors.confirmPassword}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={handleNext}
                          className="mt-6 w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition"
                        >
                          Continue
                        </button>

                        <p className="mt-4 text-sm text-gray-600 text-center">
                          Already have an account?{" "}
                          <a
                            href="/login"
                            className="text-cyan-500 font-semibold hover:underline"
                          >
                            Login
                          </a>
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    // Step 2
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.gender && (
                            <p className="text-red-500 text-sm">
                              {errors.gender}
                            </p>
                          )}

                          <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg"
                          />
                          {errors.age && (
                            <p className="text-red-500 text-sm">{errors.age}</p>
                          )}

                          <input
                            type="text"
                            name="occupation"
                            placeholder="Occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg"
                          />
                          {errors.occupation && (
                            <p className="text-red-500 text-sm">
                              {errors.occupation}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between mt-6">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                          >
                            Back
                          </button>

                          <button
                            type="submit"
                            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
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