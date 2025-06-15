import type React from "react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Don't check authentication for login page
  // We'll handle auth protection in individual pages instead
  return <div className="min-h-screen bg-gray-50">{children}</div>
}
