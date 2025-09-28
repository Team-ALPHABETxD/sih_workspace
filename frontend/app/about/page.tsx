"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <motion.button
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative py-20 px-4 pt-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are dedicated to protecting our environment through advanced water quality analysis 
              and heavy metal pollution monitoring, empowering communities with data-driven insights.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Sections with Alternating Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        
        {/* Section 1: Image Left, Text Right */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="order-2 lg:order-1">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/pic3.jpg"
                alt="Environmental Protection"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Environmental Protection
              </div>
              <h2 className="text-4xl font-bold text-gray-800">
                Protecting Our Planet
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to safeguard the environment by providing comprehensive water quality analysis. 
                We believe that clean water is a fundamental right, and through advanced monitoring and 
                analysis, we can identify and address heavy metal contamination before it becomes a crisis.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-gray-600">Water Samples Analyzed</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-gray-600">Communities Served</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 2: Text Left, Image Right */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Data-Driven Solutions
              </div>
              <h2 className="text-4xl font-bold text-gray-800">
                Advanced Analytics
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We leverage cutting-edge technology to analyze water quality data and predict pollution trends. 
                Our sophisticated algorithms help identify potential health risks and provide actionable insights 
                for environmental protection agencies and communities.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Real-time pollution monitoring</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Predictive analytics for early warning</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Comprehensive reporting system</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/pic1.jpg"
                alt="Data Analysis"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Image Left, Text Right */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="order-2 lg:order-1">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/pic6.jpg"
                alt="Community Impact"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Community Impact
              </div>
              <h2 className="text-4xl font-bold text-gray-800">
                Empowering Communities
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that every community deserves access to clean water and environmental data. 
                Our platform democratizes water quality information, making it accessible to researchers, 
                policymakers, and citizens who want to protect their local environment.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-800 mb-2">Our Impact</h3>
                <p className="text-gray-600">
                  Through our platform, communities have been able to identify and address water quality 
                  issues before they become health crises, leading to safer drinking water for thousands of people.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 4: Text Left, Image Right */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                Future Vision
              </div>
              <h2 className="text-4xl font-bold text-gray-800">
                Building a Sustainable Future
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our vision extends beyond current challenges. We are building a comprehensive ecosystem 
                for environmental monitoring that will help create a sustainable future where clean water 
                is accessible to all and environmental protection is data-driven and proactive.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-2">Innovation</h4>
                  <p className="text-sm text-gray-600">Continuous improvement of our analytics platform</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-2">Collaboration</h4>
                  <p className="text-sm text-gray-600">Working with global environmental organizations</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/pic4.jpg"
                alt="Future Vision"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Call to Action Section */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Us in Protecting Our Environment
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Together, we can create a world where clean water is accessible to all and environmental 
            protection is driven by data and science.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup" 
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Get Started
            </a>
            <a 
              href="/dashboard" 
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Explore Platform
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
