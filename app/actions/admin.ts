"use server"

import { updateSubmissionStatus } from "@/lib/database"
import { verifySession } from "@/lib/auth"
import { Resend } from "resend"
import { revalidatePath } from "next/cache"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function markAsContacted(submissionId: string, notes?: string) {
  try {
    // Verify admin is logged in
    const user = await verifySession()
    if (!user) {
      return { success: false, error: "Unauthorized" }
    }

    // Update submission status
    const success = await updateSubmissionStatus(submissionId, "contacted", notes)

    if (success) {
      // Revalidate the submissions page to show updated data
      revalidatePath("/admin/submissions")
      return { success: true, message: "Submission marked as contacted" }
    } else {
      return { success: false, error: "Failed to update submission" }
    }
  } catch (error) {
    console.error("Mark as contacted error:", error)
    return { success: false, error: "Something went wrong" }
  }
}

export async function markAsConverted(submissionId: string, notes?: string) {
  try {
    const user = await verifySession()
    if (!user) {
      return { success: false, error: "Unauthorized" }
    }

    const success = await updateSubmissionStatus(submissionId, "converted", notes)

    if (success) {
      revalidatePath("/admin/submissions")
      return { success: true, message: "Submission marked as converted! 🎉" }
    } else {
      return { success: false, error: "Failed to update submission" }
    }
  } catch (error) {
    console.error("Mark as converted error:", error)
    return { success: false, error: "Something went wrong" }
  }
}

export async function sendReplyEmail(
  submissionId: string,
  recipientEmail: string,
  recipientName: string,
  subject: string,
  message: string,
) {
  try {
    const user = await verifySession()
    if (!user) {
      return { success: false, error: "Unauthorized" }
    }

    if (!process.env.RESEND_API_KEY) {
      return { success: false, error: "Email service not configured" }
    }

    // Send reply email
    await resend.emails.send({
      from: "SteppingStones <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: subject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #914051 0%, #b35669 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-family: 'Prata', serif;">💕 SteppingStones</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">Marriage Facilitation Services</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 20px;">
            <h2 style="color: #333333; font-size: 24px; margin: 0 0 20px 0;">Hello ${recipientName}! 👋</h2>
            
            <div style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; white-space: pre-wrap;">${message}</div>
            
            <!-- Contact Info -->
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; border-left: 4px solid #914051; margin: 30px 0;">
              <h3 style="color: #914051; font-size: 18px; margin: 0 0 15px 0;">📞 Get in Touch</h3>
              <p style="color: #555; margin: 5px 0;"><strong>Phone:</strong> +65 8878 9804 / +65 6441 3906</p>
              <p style="color: #555; margin: 5px 0;"><strong>Email:</strong> hello@steppingstones.com</p>
              <p style="color: #555; margin: 5px 0;"><strong>Address:</strong> 3779 Jalan Bukit Merah, #02-01 Bukit Merah Community Hub, Singapore 159462</p>
            </div>
            
            <!-- WhatsApp Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/6588789804?text=Hi%2C%20I%20received%20your%20email%20and%20would%20like%20to%20continue%20our%20conversation." style="display: inline-block; background-color: #25d366; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">💬 Continue on WhatsApp</a>
            </div>
          </div>
        </div>
      `,
    })

    // Mark as contacted after sending reply
    await updateSubmissionStatus(submissionId, "contacted", `Reply sent: ${subject}`)
    revalidatePath("/admin/submissions")

    return { success: true, message: "Reply sent successfully!" }
  } catch (error) {
    console.error("Send reply error:", error)
    return { success: false, error: "Failed to send reply" }
  }
}
