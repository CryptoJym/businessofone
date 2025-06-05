'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  className?: string
  variant?: 'fadeUp' | 'typewriter' | 'wordReveal'
  delay?: number
  duration?: number
  stagger?: number
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.5,
  stagger = 0.05
}) => {
  const words = text.split(' ')
  const letters = text.split('')

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  }

  const letterVariants: Variants = {
    initial: {
      opacity: 0,
      y: variant === 'fadeUp' ? 20 : 0,
      x: variant === 'typewriter' ? -10 : 0
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: duration
      }
    }
  }

  const wordVariants: Variants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration
      }
    }
  }

  if (variant === 'wordReveal') {
    return (
      <motion.div
        className={cn('inline-flex flex-wrap gap-x-2', className)}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={wordVariants}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn('inline-block', className)}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={letterVariants}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default AnimatedText