"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, User, Settings, Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { AdminUser } from "@/lib/auth"

interface AdminHeaderProps {
  user: AdminUser
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      // Force hard redirect in v0 environment
      window.location.href = "/admin/login"
    } catch (error) {
      console.error("Logout error:", error)
      // Even if logout API fails, redirect to login
      window.location.href = "/admin/login"
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/admin/submissions" className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="SteppingStones logo" width={32} height={32} className="h-8 w-8" />
              <h1 className="text-xl font-prata text-header">SteppingStones Admin</h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/admin/submissions"
              className="text-gray-700 hover:text-primary transition-colors flex items-center space-x-1"
            >
              <Settings className="h-4 w-4" />
              <span>Submissions</span>
            </Link>
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Website</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{user.name}</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{user.role}</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              disabled={isLoggingOut}
              className="flex items-center space-x-1"
            >
              <LogOut className="h-4 w-4" />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
