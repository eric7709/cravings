"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  duration?: number;
  delay?: number;
  triggerOnce?: boolean;
  threshold?: number;
  className?: string;
};

export default function FadeIn({
  children,
  duration = .5,
  delay = 1,
  triggerOnce = true,
  threshold = 0.1,
  className = "",
}: FadeInProps) {


  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      viewport={{ 
        once: triggerOnce,
        amount: threshold,
        margin: "-25px" // Start animation 50px before element enters viewport
      }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.4, 0.25, 1] // Custom easing curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}