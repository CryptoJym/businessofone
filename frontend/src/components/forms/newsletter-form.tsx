"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Mail, CheckCircle } from "lucide-react"

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  firstName: z.string().optional(),
  businessStage: z.string().optional(),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

interface NewsletterFormProps {
  variant?: "inline" | "stacked"
  showName?: boolean
  showBusinessStage?: boolean
}

export function NewsletterForm({ 
  variant = "stacked",
  showName = false,
  showBusinessStage = false 
}: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      firstName: "",
      businessStage: "",
    },
  })

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        form.reset()
        // Reset success state after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <p className="text-green-800 font-medium">
          Welcome aboard! Check your email to confirm.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
          className={variant === "inline" ? "flex gap-2" : "space-y-4"}>
          
          {showName && (
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className={variant === "inline" ? "flex-1" : ""}>
                  {variant === "stacked" && <FormLabel>First Name</FormLabel>}
                  <FormControl>
                    <Input 
                      placeholder="Your first name" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={variant === "inline" ? "flex-1" : ""}>
                {variant === "stacked" && <FormLabel>Email Address *</FormLabel>}
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showBusinessStage && variant === "stacked" && (
            <FormField
              control={form.control}
              name="businessStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Stage</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <option value="">Select your stage (optional)</option>
                      <option value="idea">Just an idea</option>
                      <option value="starting">Just starting</option>
                      <option value="0-1year">0-1 year</option>
                      <option value="1-3years">1-3 years</option>
                      <option value="3+years">3+ years</option>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button 
            type="submit"
            className={variant === "inline" ? "" : "w-full"}
            disabled={isSubmitting}
            variant={variant === "inline" ? "secondary" : "default"}
          >
            {variant === "inline" ? (
              <>
                <Mail className="w-4 h-4 mr-1" />
                Subscribe
              </>
            ) : (
              isSubmitting ? "Subscribing..." : "Join Our Newsletter"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Get weekly tips to grow your solo business. No spam, unsubscribe anytime.
      </p>
    </div>
  )
}