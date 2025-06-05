"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CheckCircle } from "lucide-react"

const consultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  businessType: z.string().min(1, "Please select your business type"),
  revenueRange: z.string().min(1, "Please select your revenue range"),
  biggestChallenge: z.string().min(10, "Please describe your challenge in at least 10 characters"),
  preferredContactTime: z.string().min(1, "Please select your preferred contact time"),
})

type ConsultationFormData = z.infer<typeof consultationSchema>

export function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessType: "",
      revenueRange: "",
      biggestChallenge: "",
      preferredContactTime: "",
    },
  })

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true)
    
    try {
      // API call would go here
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        form.reset()
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Thank You!
        </h3>
        <p className="text-gray-600">
          We've received your consultation request and will contact you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormDescription>
                Include your phone number for faster scheduling
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type *</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option value="">Select your business type</option>
                  <option value="consulting">Consulting</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">SaaS</option>
                  <option value="agency">Agency</option>
                  <option value="freelance">Freelance</option>
                  <option value="content">Content Creation</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="revenueRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Revenue Range *</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option value="">Select your revenue range</option>
                  <option value="pre-revenue">Pre-revenue</option>
                  <option value="0-10k">$0 - $10k/month</option>
                  <option value="10k-50k">$10k - $50k/month</option>
                  <option value="50k-100k">$50k - $100k/month</option>
                  <option value="100k+">$100k+/month</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="biggestChallenge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Biggest Business Challenge *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about the main challenge you're facing in your business right now..."
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                The more specific you are, the better we can help
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredContactTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Contact Time *</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option value="">Select your preferred time</option>
                  <option value="morning">Morning (9am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 5pm)</option>
                  <option value="evening">Evening (5pm - 8pm)</option>
                  <option value="anytime">Any time</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          size="lg" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Book Your Free Strategy Session"}
        </Button>

        <p className="text-sm text-gray-500 text-center">
          By submitting this form, you agree to our{" "}
          <a href="/privacy" className="text-[#4169E1] hover:underline">
            Privacy Policy
          </a>
        </p>
      </form>
    </Form>
  )
}