import { supabase, createServerClient } from "./supabase"

export interface ContactSubmission {
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

// In-memory fallback for v0 demo
const demoSubmissions: ContactSubmission[] = [
  {
    id: "demo-1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "+65 9123 4567",
    message: "Hi, I am interested in your marriage facilitation services. Could you please provide more information?",
    status: "new",
    submitted_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-2",
    first_name: "Sarah",
    last_name: "Lim",
    email: "sarah.lim@example.com",
    phone: "+65 8765 4321",
    message: "I have been looking for a professional matchmaking service. I would like to schedule a consultation.",
    status: "contacted",
    submitted_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-3",
    first_name: "Michael",
    last_name: "Tan",
    email: "michael.tan@example.com",
    phone: "+65 9876 5432",
    message: "Your success stories are very inspiring! I am ready to begin my journey to find my life partner.",
    status: "converted",
    submitted_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export async function saveContactSubmission(
  data: Omit<ContactSubmission, "id" | "submitted_at" | "updated_at" | "status">,
): Promise<ContactSubmission> {
  // Try Supabase first
  try {
    const { data: submission, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          status: "new",
        },
      ])
      .select()
      .single()

    if (!error && submission) {
      return submission
    }
  } catch (error) {
    console.log("Supabase not available, using demo mode")
  }

  // Fallback to in-memory storage for v0 demo
  const newSubmission: ContactSubmission = {
    id: `demo-${Date.now()}`,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    status: "new",
    submitted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  demoSubmissions.unshift(newSubmission)
  return newSubmission
}

export async function getAllSubmissions(): Promise<ContactSubmission[]> {
  // Try Supabase first
  try {
    const serverClient = createServerClient()
    const { data: submissions, error } = await serverClient
      .from("contact_submissions")
      .select("*")
      .order("submitted_at", { ascending: false })

    if (!error && submissions) {
      return submissions
    }
  } catch (error) {
    console.log("Supabase not available, using demo mode")
  }

  // Fallback to demo data
  return demoSubmissions.sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
}

export async function getSubmissionById(id: string): Promise<ContactSubmission | null> {
  // Try Supabase first
  try {
    const serverClient = createServerClient()
    const { data: submission, error } = await serverClient.from("contact_submissions").select("*").eq("id", id).single()

    if (!error && submission) {
      return submission
    }
  } catch (error) {
    console.log("Supabase not available, using demo mode")
  }

  // Fallback to demo data
  return demoSubmissions.find((sub) => sub.id === id) || null
}

export async function updateSubmissionStatus(
  id: string,
  status: ContactSubmission["status"],
  notes?: string,
): Promise<boolean> {
  // Try Supabase first
  try {
    const serverClient = createServerClient()
    const updateData: any = { status }
    if (notes !== undefined) {
      updateData.notes = notes
    }

    const { error } = await serverClient.from("contact_submissions").update(updateData).eq("id", id)

    if (!error) {
      return true
    }
  } catch (error) {
    console.log("Supabase not available, using demo mode")
  }

  // Fallback to demo data
  const submission = demoSubmissions.find((sub) => sub.id === id)
  if (submission) {
    submission.status = status
    if (notes !== undefined) {
      submission.notes = notes
    }
    submission.updated_at = new Date().toISOString()
    return true
  }

  return false
}

export async function getSubmissionStats() {
  const submissions = await getAllSubmissions()

  const stats = submissions.reduce(
    (acc, sub) => {
      acc.total++
      acc[sub.status as keyof typeof acc]++
      return acc
    },
    { total: 0, new: 0, contacted: 0, converted: 0 },
  )

  return stats
}
