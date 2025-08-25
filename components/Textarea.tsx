"use client";
import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  textareaClassName?: string;
  labelClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", textareaClassName = "", labelClassName = "", rows = 3, ...props }, ref) => {
    return (
      <div className={`w-full select-none ${className}`}>
        <label className={`block mb-1 text-sm text-gray-700 ${labelClassName}`}>
          {label}
        </label>

        <div className="relative">
          <textarea
            ref={ref}
            rows={rows}
            {...props}
            className={`
              w-full min-h-36 p-3 text-sm border rounded-md outline-none transition resize-none
              bg-white
              ${error ? "border-red-500" : "border-slate-600"}
              ${textareaClassName}
            `}
          />
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";