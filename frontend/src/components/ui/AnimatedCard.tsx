'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  hoverable?: boolean
  glowOnHover?: boolean
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, children, hoverable = true, glowOnHover = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative bg-white rounded-xl shadow-lg p-6 overflow-hidden',
          hoverable && 'cursor-pointer',
          glowOnHover && 'hover:glow',
          className
        )}
        whileHover={hoverable ? {
          y: -5,
          transition: { duration: 0.3 }
        } : undefined}
        {...props}
      >
        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    )
  }
)

AnimatedCard.displayName = 'AnimatedCard'

export default AnimatedCard