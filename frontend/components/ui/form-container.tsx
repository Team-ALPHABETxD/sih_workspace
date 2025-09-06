"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const FormContainer = ({ 
  children, 
  title, 
  subtitle, 
  className = "" 
}: FormContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className={`w-full max-w-md ${className}`}
    >
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-gray-600"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}
      {children}
    </motion.div>
  );
};
