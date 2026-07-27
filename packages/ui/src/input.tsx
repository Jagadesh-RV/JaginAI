import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`flex h-10 w-full rounded-xl border bg-white/50 backdrop-blur-sm px-3 py-2 text-sm text-gray-900 
        transition-all duration-200
        file:border-0 file:bg-transparent file:text-sm file:font-medium 
        placeholder:text-gray-400 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${error ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200 hover:border-gray-300'}
        ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
