import React, { useState } from "react";
type SizeKey = "small" | "medium" | "large" | "xl";
type VariantKey = "default" | "white" | "dark" | "minimal";
type BitePointLogoProps = {
  size?: SizeKey;
  variant?: VariantKey;
  showText?: boolean;
  className?: string;
  animated?: boolean;
};

export default function BitePointLogo({
  size = "medium",
  variant = "default",
  showText = true,
  className = "",
  animated = true,
}: BitePointLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const sizes: Record<
    SizeKey,
    { container: string; icon: string; text: string; spacing: string }
  > = {
    small: {
      container: "h-6",
      icon: "w-6 h-6",
      text: "text-sm",
      spacing: "gap-1",
    },
    medium: {
      container: "h-8",
      icon: "w-8 h-8",
      text: "text-base",
      spacing: "gap-2",
    },
    large: {
      container: "h-10",
      icon: "w-10 h-10",
      text: "text-lg",
      spacing: "gap-2",
    },
    xl: {
      container: "h-12",
      icon: "w-12 h-12",
      text: "text-xl",
      spacing: "gap-3",
    },
  };

  // Color variants
  const variants: Record<
    VariantKey,
    { icon: string; text: string; accent: string }
  > = {
    default: {
      icon: "text-blue-500",
      text: "text-blue-500",
      accent: "text-blue-600",
    },
    white: {
      icon: "text-white",
      text: "text-white",
      accent: "text-blue-200",
    },
    dark: {
      icon: "text-blue-400",
      text: "text-white",
      accent: "text-blue-300",
    },
    minimal: {
      icon: "text-gray-700",
      text: "text-gray-800",
      accent: "text-gray-600",
    },
  };

  const sizeConfig = sizes[size];
  const colorConfig = variants[variant];

  return (
    <div
      className={`flex cursor-pointer select-none duration-300 active:scale-90 items-center ${sizeConfig.spacing} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Icon */}
      <div className={`relative ${sizeConfig.icon} flex-shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full ${colorConfig.icon} ${
            animated ? "transition-all duration-300 ease-in-out" : ""
          } ${isHovered && animated ? "scale-110 rotate-3" : ""}`}
          fill="currentColor"
        >
          {/* Main Circle (Plate) */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className={animated ? "transition-all duration-500" : ""}
            strokeDasharray={isHovered && animated ? "283" : "0"}
            strokeDashoffset={isHovered && animated ? "0" : "283"}
          />

          {/* Fork */}
          <g transform="translate(25, 30)">
            <rect x="0" y="0" width="2" height="25" rx="1" />
            <rect x="4" y="0" width="2" height="20" rx="1" />
            <rect x="8" y="0" width="2" height="25" rx="1" />
            <rect x="12" y="0" width="2" height="18" rx="1" />
            <rect x="0" y="25" width="14" height="2" rx="1" />
          </g>

          {/* Knife */}
          <g transform="translate(65, 30)">
            <rect x="0" y="0" width="2" height="30" rx="1" />
            <path d="M0 0 L8 8 L8 12 L0 4 Z" className="fill-current" />
          </g>

          {/* Food bite/point indicator */}
          <circle
            cx="50"
            cy="50"
            r="8"
            className={`${colorConfig.accent} ${
              animated ? "transition-all duration-700 ease-in-out" : ""
            }`}
            opacity={isHovered && animated ? "0.8" : "0.6"}
          />

          {/* Bite mark */}
          <path
            d="M42 50 Q50 42 58 50 Q50 58 42 50"
            fill="white"
            className={animated ? "transition-opacity duration-500" : ""}
            opacity={isHovered && animated ? "1" : "0.7"}
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="leading-none">
          <span
            className={`font-bold ${sizeConfig.text} ${colorConfig.text} ${
              animated ? "transition-all duration-300" : ""
            } ${
              isHovered && animated ? "tracking-wider" : "tracking-wide"
            }`}
          >
            CRAVINGS
          </span>
        </div>
      )}
    </div>
  );
}
