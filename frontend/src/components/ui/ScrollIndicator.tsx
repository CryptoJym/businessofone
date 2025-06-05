'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface ScrollIndicatorProps {
  onClick?: () => void
  className?: string
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onClick, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.button
        onClick={onClick}
        className="p-2 rounded-full border-2 border-primary/30 hover:border-primary transition-colors cursor-pointer"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="w-6 h-6 text-primary" />
      </motion.button>
    </motion.div>
  )
}

export default ScrollIndicator