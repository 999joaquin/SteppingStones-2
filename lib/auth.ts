import { createServerClient } from "./supabase"
import { cookies } from "next/headers"

// Simple JWT secret fallback for v0 environment
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "steppingstones-v0-secret-key-2024")

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  is_active: boolean
}

// Updated authentication with new credentials
export async function authenticateAdmin(email: string, password: string): Promise<AdminUser | null> {
  // Updated credentials for production admin
  if (email === "admin@steppingstones.com" && password === "admin") {
    return {
      id: "admin-steppingstones-2024",
      email: "admin@steppingstones.com",
      name: "SteppingStones Admin",
      role: "super_admin",
      is_active: true,
    }
  }

  // Keep demo credentials for testing
  if (email === "demo@steppingstones.com" && password === "admin123") {
    return {
      id: "demo-admin-id",
      email: "demo@steppingstones.com",
      name: "Demo Admin",
      role: "admin",
      is_active: true,
    }
  }

  // If Supabase is configured, try database authentication
  try {
    const supabase = createServerClient()
    const { data: user, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .eq("is_active", true)
      .single()

    if (error || !user) {
      return null
    }

    // For v0 demo, skip bcrypt and use simple password check
    if (password === "admin" || password === "admin123") {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        is_active: user.is_active,
      }
    }
  } catch (error) {
    console.log("Database auth failed, using demo mode")
  }

  return null
}

export async function createSession(user: AdminUser): Promise<string> {
  // Simplified session for v0
  const sessionData = JSON.stringify({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  })

  const cookieStore = await cookies()
  cookieStore.set("admin-session", sessionData, {
    httpOnly: true,
    secure: false, // Set to false for v0 development
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 24 hours
  })

  return sessionData
}

export async function verifySession(): Promise<AdminUser | null> {
  const cookieStore = await cookies()
  const sessionData = cookieStore.get("admin-session")?.value

  if (!sessionData) {
    return null
  }

  try {
    const session = JSON.parse(sessionData)

    // Check if session is expired
    if (Date.now() > session.expires) {
      return null
    }

    return {
      id: session.userId,
      email: session.email,
      name: session.name || (session.email === "admin@steppingstones.com" ? "SteppingStones Admin" : "Admin User"),
      role: session.role,
      is_active: true,
    }
  } catch (error) {
    return null
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("admin-session")
}
