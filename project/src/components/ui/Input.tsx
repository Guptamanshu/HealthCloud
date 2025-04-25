import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const inputClasses = `
      block px-4 py-2.5 w-full
      text-gray-900 bg-gray-50
      border ${error ? 'border-red-500' : 'border-gray-300'}
      rounded-lg focus:outline-none
      focus:ring-blue-500 focus:border-blue-500
      ${className}
    `;

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <div className={`mb-4 ${widthClass}`}>
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-900">
            {label}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';