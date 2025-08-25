"use client";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  inputClassName?: string; // added
  labelClassName?: string; // added
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = "text", className = "", inputClassName = "", labelClassName = "", ...props }, ref) => {
    const isPasswordField = type === "password";
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={`w-full select-none ${className}`}>
        <label className={`block mb-1 text-sm text-gray-700 ${labelClassName}`}>
          {label}
        </label>

        <div className="relative h-10">
          <input
            ref={ref}
            {...props}
            type={isPasswordField && !showPassword ? "password" : "text"}
            autoComplete={
              isPasswordField ? "new-password" : props.autoComplete
            }
            className={`
              w-full h-10 px-2 pr-10 text-sm border rounded-md outline-none transition
              bg-white
              ${error ? "border-red-500" : "border-slate-600"}
              ${inputClassName}
            `}
          />

          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </button>
          )}
        </div>

        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
