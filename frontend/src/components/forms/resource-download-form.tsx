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
import { Download, CheckCircle } from "lucide-react"

const resourceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  businessType: z.string().min(1, "Please select your business type"),
  resourceId: z.string(),
})

type ResourceFormData = z.infer<typeof resourceSchema>

interface ResourceDownloadFormProps {
  resourceId: string
  resourceTitle: string
  resourceDescription?: string
}

export function ResourceDownloadForm({ 
  resourceId, 
  resourceTitle, 
  resourceDescription 
}: ResourceDownloadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      name: "",
      email: "",
      businessType: "",
      resourceId: resourceId,
    },
  })

  const onSubmit = async (data: ResourceFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/resource-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        // In a real app, you'd trigger the download here
        window.open(`/resources/download/${resourceId}`, "_blank")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
        <h4 className="text-xl font-bold text-gray-900 mb-2">
          Success!
        </h4>
        <p className="text-gray-600 text-sm">
          Your download should start automatically. Check your email for a copy.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Download: {resourceTitle}
        </h3>
        {resourceDescription && (
          <p className="text-sm text-gray-600">{resourceDescription}</p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
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
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
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

          <input type="hidden" {...form.register("resourceId")} />

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            <Download className="w-4 h-4 mr-2" />
            {isSubmitting ? "Processing..." : "Get Your Free Resource"}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            We'll also send you helpful tips to grow your business. Unsubscribe anytime.
          </p>
        </form>
      </Form>
    </div>
  )
}