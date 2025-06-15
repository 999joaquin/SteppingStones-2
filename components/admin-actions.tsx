"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, CheckCircle, MessageSquare, ExternalLink, X, Send, Loader2, Award } from "lucide-react"
import { markAsContacted, markAsConverted, sendReplyEmail } from "@/app/actions/admin"

interface ContactSubmission {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  message: string
  status: "new" | "contacted" | "converted"
  notes?: string
  submitted_at: string
  updated_at: string
}

interface AdminActionsProps {
  submission: ContactSubmission
}

export function AdminActions({ submission }: AdminActionsProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replySubject, setReplySubject] = useState(`Re: Your inquiry about SteppingStones services`)
  const [replyMessage, setReplyMessage] = useState(`Thank you for your interest in SteppingStones! 

I'd love to schedule a consultation to discuss how we can help you find your perfect life partner.

Our personalized approach has helped over 500 couples find lasting love, and I believe we can help you too.

Would you be available for a brief call this week to discuss your goals and how our process works?

Looking forward to hearing from you!

Best regards,
SteppingStones Team`)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleMarkAsContacted = async () => {
    setIsLoading(true)
    try {
      const result = await markAsContacted(submission.id, "Manually marked as contacted")
      setMessage(result.success ? result.message! : result.error!)
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Something went wrong")
      setTimeout(() => setMessage(""), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsConverted = async () => {
    setIsLoading(true)
    try {
      const result = await markAsConverted(submission.id, "Manually marked as converted")
      setMessage(result.success ? result.message! : result.error!)
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Something went wrong")
      setTimeout(() => setMessage(""), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendReply = async () => {
    if (!replySubject.trim() || !replyMessage.trim()) {
      setMessage("Please fill in both subject and message")
      setTimeout(() => setMessage(""), 3000)
      return
    }

    setIsLoading(true)
    try {
      const result = await sendReplyEmail(
        submission.id,
        submission.email,
        `${submission.first_name} ${submission.last_name}`,
        replySubject,
        replyMessage,
      )
      setMessage(result.success ? result.message! : result.error!)
      if (result.success) {
        setShowReplyForm(false)
      }
      setTimeout(() => setMessage(""), 5000)
    } catch (error) {
      setMessage("Something went wrong")
      setTimeout(() => setMessage(""), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {message && (
        <div
          className={`p-3 rounded-lg text-sm ${
            message.includes("success") || message.includes("🎉")
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {!showReplyForm ? (
        <div className="flex flex-wrap gap-3">
          <Button
            size="sm"
            className="bg-primary hover:bg-primary-dark"
            onClick={() => setShowReplyForm(true)}
            disabled={isLoading}
          >
            <Mail className="h-4 w-4 mr-2" />
            Reply via Email
          </Button>

          <Button size="sm" variant="outline" onClick={() => window.open(`tel:${submission.phone}`, "_self")}>
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>

          {submission.status === "new" && (
            <Button size="sm" variant="outline" onClick={handleMarkAsContacted} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
              Mark as Contacted
            </Button>
          )}

          {submission.status === "contacted" && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleMarkAsConverted}
              disabled={isLoading}
              className="border-green-500 text-green-700 hover:bg-green-50"
            >
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Award className="h-4 w-4 mr-2" />}
              Mark as Converted
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              window.open(
                `https://wa.me/${submission.phone.replace(/[^0-9]/g, "")}?text=Hi%20${submission.first_name}%2C%20this%20is%20from%20SteppingStones.%20Thank%20you%20for%20your%20inquiry!`,
                "_blank",
              )
            }
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            WhatsApp
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      ) : (
        <Card className="border-primary/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                Reply to {submission.first_name} {submission.last_name}
              </CardTitle>
              <Button size="sm" variant="ghost" onClick={() => setShowReplyForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To: {submission.email}</label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <Input
                value={replySubject}
                onChange={(e) => setReplySubject(e.target.value)}
                placeholder="Email subject"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <Textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Your reply message..."
                rows={8}
                disabled={isLoading}
              />
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleSendReply} disabled={isLoading} className="bg-primary hover:bg-primary-dark">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Reply
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => setShowReplyForm(false)} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
