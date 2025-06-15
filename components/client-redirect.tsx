"use client"

import { useEffect } from "react"

interface ClientRedirectProps {
  to: string
}

export default function ClientRedirect({ to }: ClientRedirectProps) {
  useEffect(() => {
    window.location.href = to
  }, [to])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    </div>
  )
}
