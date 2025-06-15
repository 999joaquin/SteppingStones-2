"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const initialState: ContactFormState = {}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  return (
    <Card className="bg-white shadow-xl">
      <CardContent className="p-8">
        <h3 className="text-2xl font-prata text-header mb-6">Send us a message</h3>

        {/* Success Message */}
        {state.success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium">Message Sent Successfully!</p>
              <p className="text-green-700 text-sm mt-1">{state.message}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {state.success === false && state.message && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-700 text-sm mt-1">{state.message}</p>
            </div>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Your first name"
                disabled={isPending}
                className={state.errors?.firstName ? "border-red-500" : ""}
              />
              {state.errors?.firstName && <p className="text-red-600 text-sm mt-1">{state.errors.firstName[0]}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Your last name"
                disabled={isPending}
                className={state.errors?.lastName ? "border-red-500" : ""}
              />
              {state.errors?.lastName && <p className="text-red-600 text-sm mt-1">{state.errors.lastName[0]}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              disabled={isPending}
              className={state.errors?.email ? "border-red-500" : ""}
            />
            {state.errors?.email && <p className="text-red-600 text-sm mt-1">{state.errors.email[0]}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Your phone number"
              disabled={isPending}
              className={state.errors?.phone ? "border-red-500" : ""}
            />
            {state.errors?.phone && <p className="text-red-600 text-sm mt-1">{state.errors.phone[0]}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about yourself and what you're looking for..."
              rows={4}
              disabled={isPending}
              className={state.errors?.message ? "border-red-500" : ""}
            />
            {state.errors?.message && <p className="text-red-600 text-sm mt-1">{state.errors.message[0]}</p>}
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Message...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>* Required fields</p>
          <p className="mt-2">We typically respond within 24 hours. For urgent inquiries, please call us directly.</p>
        </div>
      </CardContent>
    </Card>
  )
}
