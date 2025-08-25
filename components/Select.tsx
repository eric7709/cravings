"use client";
import React, { forwardRef } from "react";

type Option = {
  value: string;
  label: string | null;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: Option[];
  selectClassName?: string;
  labelClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    error, 
    options, 
    children, 
    className = "",
    selectClassName = "", 
    labelClassName = "", 
    ...props 
  }, ref) => {
    // Auto-add keys for children without keys
    const keyedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child) && child.key == null) {
        return React.cloneElement(child, { key: `option-${index}` });
      }
      return child;
    });

    return (
      <div className={`flex flex-col w-full ${className}`}>
        {label && (
          <label
            className={`mb-1 text-sm font-medium text-gray-700 ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          {...props}
          className={`border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition ${
            error ? "border-red-500" : "border-gray-200"
          } ${selectClassName}`}
        >
          {options && options.length > 0
            ? options.map((opt, i) => (
                <option key={`opt-${i}`} value={opt.value}>
                  {opt.label || opt.value}
                </option>
              ))
            : keyedChildren}
        </select>

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";