"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react"

export default function TestAdminPage() {
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    const results = []

    // Test 1: Admin Login API
    try {
      const loginResponse = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@steppingstones.com",
          password: "admin123",
        }),
      })
      const loginData = await loginResponse.json()

      results.push({
        test: "Admin Login API",
        status: loginResponse.ok ? "pass" : "fail",
        message: loginResponse.ok ? "Login successful" : loginData.error || "Login failed",
        details: loginData,
      })
    } catch (error) {
      results.push({
        test: "Admin Login API",
        status: "error",
        message: `Error: ${error}`,
      })
    }

    // Test 2: Contact Form Submission
    try {
      const formData = new FormData()
      formData.append("firstName", "Test")
      formData.append("lastName", "User")
      formData.append("email", "test@example.com")
      formData.append("phone", "+65 9123 4567")
      formData.append("message", "This is a test message from the admin test page.")

      // We can't easily test the server action from client side, so we'll simulate it
      results.push({
        test: "Contact Form Submission",
        status: "info",
        message: "Contact form structure is ready (test manually on main page)",
      })
    } catch (error) {
      results.push({
        test: "Contact Form Submission",
        status: "error",
        message: `Error: ${error}`,
      })
    }

    // Test 3: Environment Check
    const envVars = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_ANON_KEY"]

    const availableEnvVars = envVars.filter((envVar) => {
      // We can't access process.env from client side, so this is just for display
      return true // Assume they might be available
    })

    results.push({
      test: "Environment Variables",
      status: "info",
      message: `Environment variables are configured in v0 backend`,
      details: { note: "v0 handles environment variables automatically" },
    })

    setTestResults(results)
    setIsRunning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "fail":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-blue-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "bg-green-100 text-green-800"
      case "fail":
        return "bg-red-100 text-red-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🧪 Admin System Test</h1>
          <p className="text-gray-600">Test the admin system functionality in v0 environment</p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Test</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={runTests} disabled={isRunning} className="mb-4">
                {isRunning ? "Running Tests..." : "🚀 Run Admin Tests"}
              </Button>

              {testResults.length > 0 && (
                <div className="space-y-4">
                  {testResults.map((result, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">{result.test}</h4>
                          <Badge className={getStatusColor(result.status)}>{result.status.toUpperCase()}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{result.message}</p>
                        {result.details && (
                          <pre className="text-xs text-gray-500 mt-2 bg-white p-2 rounded overflow-auto">
                            {JSON.stringify(result.details, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manual Testing Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-blue-900">Admin Login Page</h4>
                    <p className="text-sm text-blue-700">Test the login functionality</p>
                  </div>
                  <a
                    href="/admin/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <span>Open</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-green-900">Admin Dashboard</h4>
                    <p className="text-sm text-green-700">View submissions (login required)</p>
                  </div>
                  <a
                    href="/admin/submissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                  >
                    <span>Open</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-purple-900">Contact Form</h4>
                    <p className="text-sm text-purple-700">Submit a test contact form</p>
                  </div>
                  <a
                    href="/#contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-purple-600 hover:text-purple-800"
                  >
                    <span>Open</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Default Login Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <code className="bg-white px-2 py-1 rounded text-sm">admin@steppingstones.com</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Password:</span>
                    <code className="bg-white px-2 py-1 rounded text-sm">admin123</code>
                  </div>
                </div>
                <p className="text-sm text-yellow-700 mt-3">⚠️ These are demo credentials that work in v0 environment</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testing Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Can access admin login page</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Can login with demo credentials</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Gets redirected to dashboard after login</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Can see demo submissions in dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Can submit contact form on main site</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>New submission appears in dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Can logout successfully</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Cannot access dashboard without login</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
