"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DebugLoginPage() {
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testLogin = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      console.log("🧪 Testing login API...")

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@steppingstones.com",
          password: "admin123",
        }),
      })

      console.log("📡 Response status:", response.status)
      console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()))

      const data = await response.json()
      console.log("📦 Response data:", data)

      setResult({
        status: response.status,
        ok: response.ok,
        data: data,
        headers: Object.fromEntries(response.headers.entries()),
      })
    } catch (error) {
      console.error("❌ Login test error:", error)
      setResult({
        error: error.message,
        stack: error.stack,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testAuthCheck = async () => {
    setIsLoading(true)
    try {
      console.log("🔐 Testing auth verification...")

      const response = await fetch("/admin/submissions")
      console.log("📡 Auth check status:", response.status)

      if (response.redirected) {
        console.log("🔄 Redirected to:", response.url)
      }

      setResult({
        authCheck: true,
        status: response.status,
        redirected: response.redirected,
        url: response.url,
      })
    } catch (error) {
      console.error("❌ Auth check error:", error)
      setResult({
        error: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 Admin Login Debug</h1>
          <p className="text-gray-600">Test the admin login functionality and see detailed responses</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Login API Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={testLogin} disabled={isLoading}>
                {isLoading ? "Testing..." : "🧪 Test Login API"}
              </Button>

              <Button onClick={testAuthCheck} disabled={isLoading} variant="outline">
                {isLoading ? "Testing..." : "🔐 Test Auth Protection"}
              </Button>

              {result && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Test Result:</h3>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environment Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Current URL:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {typeof window !== "undefined" ? window.location.href : "Server-side"}
                  </code>
                </div>
                <div className="flex justify-between">
                  <span>User Agent:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {typeof window !== "undefined"
                      ? window.navigator.userAgent.substring(0, 50) + "..."
                      : "Server-side"}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manual Test Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex space-x-4">
                <a href="/admin/login" className="text-blue-600 hover:underline">
                  🔑 Admin Login Page
                </a>
                <a href="/admin/submissions" className="text-blue-600 hover:underline">
                  📊 Admin Dashboard (should redirect if not logged in)
                </a>
                <a href="/test-admin" className="text-blue-600 hover:underline">
                  🧪 Test Admin Page
                </a>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>Note:</strong> The blob loading errors in the console are from v0's internal system and don't
              affect the admin functionality. Focus on any errors related to login, authentication, or API calls.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
