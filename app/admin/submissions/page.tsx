import { getAllSubmissions, getSubmissionStats } from "@/lib/database"
import { verifySession } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Calendar, User, MessageSquare, ExternalLink } from "lucide-react"
import AdminHeader from "@/components/admin-header"
import ClientRedirect from "@/components/client-redirect"
import { AdminActions } from "@/components/admin-actions"

export default async function SubmissionsPage() {
  // Check authentication for this specific page
  const user = await verifySession()

  if (!user) {
    return <ClientRedirect to="/admin/login" />
  }

  const [submissions, stats] = await Promise.all([getAllSubmissions(), getSubmissionStats()])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "converted":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return "🆕"
      case "contacted":
        return "📞"
      case "converted":
        return "🎉"
      default:
        return "📋"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-SG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <AdminHeader user={user} />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Form Submissions</h1>
            <p className="text-gray-600">Manage and track all contact form submissions</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <User className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">New Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Phone className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Contacted</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.contacted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Converted</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.converted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submissions List */}
          <div className="space-y-6">
            {submissions.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
                  <p className="text-gray-600">Contact form submissions will appear here when received.</p>
                </CardContent>
              </Card>
            ) : (
              submissions.map((submission) => (
                <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            <span className="mr-2">{getStatusIcon(submission.status)}</span>
                            {submission.first_name} {submission.last_name}
                          </CardTitle>
                          <p className="text-sm text-gray-600">ID: {submission.id}</p>
                        </div>
                        <Badge className={getStatusColor(submission.status)}>{submission.status.toUpperCase()}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{formatDate(submission.submitted_at)}</p>
                        {submission.updated_at !== submission.submitted_at && (
                          <p className="text-xs text-gray-500">Updated: {formatDate(submission.updated_at)}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">
                              {submission.email}
                            </a>
                            <ExternalLink className="h-3 w-3 text-gray-400" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <a href={`tel:${submission.phone}`} className="text-blue-600 hover:underline">
                              {submission.phone}
                            </a>
                            <ExternalLink className="h-3 w-3 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Message</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {submission.message.length > 200
                            ? `${submission.message.substring(0, 200)}...`
                            : submission.message}
                        </p>
                      </div>
                    </div>

                    {submission.notes && (
                      <div className="mb-6 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                        <h5 className="font-medium text-gray-900 mb-1">📝 Notes</h5>
                        <p className="text-sm text-gray-600">{submission.notes}</p>
                      </div>
                    )}

                    <AdminActions submission={submission} />
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
