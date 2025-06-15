"use server"

import { z } from "zod"
import { Resend } from "resend"
import { saveContactSubmission } from "@/lib/database"

// Form validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number").max(20, "Phone number is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
})

export type ContactFormState = {
  success?: boolean
  message?: string
  errors?: {
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    phone?: string[]
    message?: string[]
  }
}

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  try {
    // Extract form data
    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    }

    // Validate the data
    const validatedData = contactSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please correct the errors below.",
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    const { firstName, lastName, email, phone, message } = validatedData.data

    // Save to Supabase database FIRST
    const savedSubmission = await saveContactSubmission({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      message,
    })

    console.log("💾 Contact submission saved to Supabase:", savedSubmission.id)

    // Send emails if Resend is configured
    if (process.env.RESEND_API_KEY) {
      try {
        // Send email to SteppingStones team
        await resend.emails.send({
          from: "SteppingStones Contact <onboarding@resend.dev>",
          to: ["hello@steppingstones.com"],
          subject: `🌟 New Contact Form Submission from ${firstName} ${lastName} [ID: ${savedSubmission.id}]`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #914051 0%, #b35669 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-family: 'Prata', serif;">SteppingStones</h1>
                <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">New Contact Form Submission</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px 20px;">
                <!-- Submission ID -->
                <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
                  <p style="margin: 0; color: #1976d2; font-weight: 600;">📋 Submission ID: ${savedSubmission.id}</p>
                  <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Saved to database at ${new Date(savedSubmission.submitted_at).toLocaleString("en-SG", { timeZone: "Asia/Singapore" })}</p>
                </div>

                <h2 style="color: #333333; font-size: 24px; margin: 0 0 30px 0;">📋 Contact Details</h2>
                
                <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #914051;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #555; width: 100px;">👤 Name:</td>
                      <td style="padding: 8px 0; color: #333;">${firstName} ${lastName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #555;">📧 Email:</td>
                      <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #914051; text-decoration: none;">${email}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #555;">📱 Phone:</td>
                      <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #914051; text-decoration: none;">${phone}</a></td>
                    </tr>
                  </table>
                </div>
                
                <h3 style="color: #333333; font-size: 18px; margin: 30px 0 15px 0;">💬 Message:</h3>
                <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; border-left: 4px solid #914051;">
                  <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
                
                <!-- Action Buttons -->
                <div style="margin: 40px 0; text-align: center;">
                  <a href="mailto:${email}" style="display: inline-block; background-color: #914051; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 0 10px;">📧 Reply via Email</a>
                  <a href="tel:${phone}" style="display: inline-block; background-color: #28a745; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 0 10px;">📞 Call Now</a>
                </div>
              </div>
            </div>
          `,
        })

        // Send auto-reply to user
        await resend.emails.send({
          from: "SteppingStones <onboarding@resend.dev>",
          to: [email],
          subject: "✨ Thank you for contacting SteppingStones - Your journey begins here!",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #914051 0%, #b35669 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-family: 'Prata', serif;">💕 SteppingStones</h1>
                <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Marriage Facilitation Services</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px 20px;">
                <h2 style="color: #333333; font-size: 28px; margin: 0 0 20px 0;">Thank you, ${firstName}! 🌟</h2>
                
                <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                  We've received your message and truly appreciate your interest in our marriage facilitation services. 
                  Your journey to finding lasting love is important to us! 💖
                </p>

                <!-- Reference Number -->
                <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
                  <p style="margin: 0; color: #2e7d32; font-weight: 600;">📋 Your Reference Number: ${savedSubmission.id}</p>
                  <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Please keep this for your records</p>
                </div>
                
                <!-- What's Next Section -->
                <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #914051;">
                  <h3 style="color: #914051; font-size: 20px; margin: 0 0 20px 0;">🗓️ What happens next?</h3>
                  <div style="color: #555; line-height: 1.6;">
                    <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                      <span style="background-color: #914051; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</span>
                      <span>📋 Our team will review your message within 24 hours</span>
                    </div>
                    <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                      <span style="background-color: #914051; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</span>
                      <span>📞 We'll reach out to schedule a personal consultation</span>
                    </div>
                    <div style="display: flex; align-items: flex-start;">
                      <span style="background-color: #914051; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</span>
                      <span>💬 During the consultation, we'll discuss your goals and how we can help</span>
                    </div>
                  </div>
                </div>
                
                <!-- Quick Actions -->
                <div style="background-color: #ffffff; border: 2px solid #e9ecef; border-radius: 12px; padding: 25px; margin: 30px 0;">
                  <h3 style="color: #333; font-size: 18px; margin: 0 0 20px 0; text-align: center;">🚀 Need immediate assistance?</h3>
                  <div style="text-align: center;">
                    <a href="tel:+6588789804" style="display: inline-block; background-color: #914051; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 5px 10px;">📞 Call: +65 8878 9804</a>
                    <a href="https://wa.me/6588789804?text=Hi%2C%20I%E2%80%99m%20interested%20in%20beginning%20my%20marriage%20facilitation%20journey%20with%20Stepping%20Stone.%20My%20reference%20number%20is%20${savedSubmission.id}" style="display: inline-block; background-color: #25d366; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 5px 10px;">💬 WhatsApp Us</a>
                  </div>
                </div>
              </div>
            </div>
          `,
        })

        console.log("📧 Emails sent successfully")
      } catch (emailError) {
        console.error("📧 Email sending failed:", emailError)
        // Don't fail the whole submission if email fails
      }
    }

    return {
      success: true,
      message: `Thank you ${firstName}! 🌟 We've received your message (Reference: ${savedSubmission.id}) and will get back to you within 24 hours.`,
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      success: false,
      message: "Something went wrong sending your message. Please try again or contact us directly at +65 8878 9804.",
    }
  }
}
