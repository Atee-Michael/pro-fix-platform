"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionBlockProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className, delay = 0 }: MotionBlockProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ children, className, delay = 0 }: MotionBlockProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredCards({
  children,
  className
}: Omit<MotionBlockProps, "delay">) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView="show"
    >
      {children}
    </motion.div>
  );
}

export function MotionCard({ children, className }: MotionBlockProps) {
  return (
    <motion.div
      className={cn(
        "rounded-lg border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20",
        className
      )}
      transition={{ duration: 0.25, ease: "easeOut" }}
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.div>
  );
}
