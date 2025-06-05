'use client'

import { motion } from 'framer-motion'
import AnimatedButton from '@/components/ui/AnimatedButton'
import AnimatedCard from '@/components/ui/AnimatedCard'
import AnimatedText from '@/components/ui/AnimatedText'
import ScrollIndicator from '@/components/ui/ScrollIndicator'
import { fadeInUp, containerVariants, scaleIn } from '@/lib/animations'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { 
  Briefcase, 
  TrendingUp, 
  Zap, 
  Users,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react'

export default function Home() {
  const [heroRef, heroControls] = useScrollAnimation()
  const [featuresRef, featuresControls] = useScrollAnimation()
  const [benefitsRef, benefitsControls] = useScrollAnimation()

  const scrollToSection = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/30">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="container mx-auto px-4 z-10">
          <motion.div
            ref={heroRef}
            initial="initial"
            animate={heroControls}
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                For Solo Entrepreneurs
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="mb-6">
              <AnimatedText
                text="Transform Your Solo Business"
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4"
                variant="wordReveal"
              />
              <AnimatedText
                text="Without Hiring"
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient"
                variant="wordReveal"
                delay={0.5}
              />
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              One-stop consulting and tools to run your business like a world-class company. 
              Get the strategy, systems, and support you need to scale.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton size="lg" variant="primary">
                Get Your Free Strategy Session
                <ArrowRight className="ml-2 w-5 h-5" />
              </AnimatedButton>
              <AnimatedButton size="lg" variant="outline">
                Learn More
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>

        <ScrollIndicator 
          onClick={scrollToSection}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            ref={featuresRef}
            initial="initial"
            animate={featuresControls}
            variants={containerVariants}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We handle the complexity so you can focus on what you do best
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  custom={index}
                >
                  <AnimatedCard hoverable glowOnHover className="h-full">
                    <motion.div
                      className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="w-7 h-7 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </AnimatedCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            ref={benefitsRef}
            initial="initial"
            animate={benefitsControls}
            variants={containerVariants}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Business of One?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    className="flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <CheckCircle className="w-6 h-6 text-accent" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={scaleIn} className="inline-flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-muted-foreground ml-2">Trusted by 500+ solo entrepreneurs</span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8">
              Join hundreds of solo entrepreneurs who've already taken their business to the next level
            </motion.p>

            <motion.div variants={fadeInUp}>
              <AnimatedButton size="lg" variant="primary" className="text-lg px-8 py-4">
                Get Your Free Strategy Session
                <ArrowRight className="ml-2 w-5 h-5" />
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Data
const features = [
  {
    icon: Briefcase,
    title: "Business Audit",
    description: "Comprehensive analysis of your current operations and growth opportunities"
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "Custom roadmap to scale your business without burning out"
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Streamline repetitive tasks and focus on high-value work"
  },
  {
    icon: Users,
    title: "Ongoing Support",
    description: "Expert guidance whenever you need it, not just once"
  }
]

const benefits = [
  {
    title: "Save 20+ Hours Per Week",
    description: "Automate repetitive tasks and streamline your workflow"
  },
  {
    title: "Increase Revenue by 3x",
    description: "Proven strategies to attract and retain high-value clients"
  },
  {
    title: "Work-Life Balance",
    description: "Build a business that supports your lifestyle, not consumes it"
  },
  {
    title: "Expert Guidance",
    description: "Access to experienced consultants who've been where you are"
  },
  {
    title: "Clear Action Plans",
    description: "No more guesswork - know exactly what to do next"
  },
  {
    title: "Community Support",
    description: "Connect with other successful solo entrepreneurs"
  }
]