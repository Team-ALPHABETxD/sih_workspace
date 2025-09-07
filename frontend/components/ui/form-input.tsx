"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, name, type, value, onChange, placeholder, label, error, required = false, className = "" }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full px-4 py-3 border rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            transition-all duration-200
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
            ${className}
          `}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

FormInput.displayName = "FormInput";
