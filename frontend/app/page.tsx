"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const affiliates = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sarah Johnson" },
  { id: 3, name: "Mike Wilson" },
]

const mockClicks = [
  { campaign: "Summer Sale", clicks: 245 },
  { campaign: "Black Friday", clicks: 189 },
  { campaign: "New Year Promo", clicks: 156 },
]

const mockConversions = [
  { amount: 125.5, currency: "USD", timestamp: "2024-01-15 14:30:22" },
  { amount: 89.99, currency: "USD", timestamp: "2024-01-15 12:15:45" },
  { amount: 200.0, currency: "USD", timestamp: "2024-01-14 16:22:10" },
  { amount: 75.25, currency: "USD", timestamp: "2024-01-14 09:45:33" },
]

export default function Home() {
  const [selectedAffiliate, setSelectedAffiliate] = useState<{
    id: number
    name: string
  } | null>(null)
  const [currentView, setCurrentView] = useState<"dashboard" | "postback">("dashboard")

  const handleLogin = (affiliateId: string) => {
    const affiliate = affiliates.find((a) => a.id.toString() === affiliateId)
    if (affiliate) {
      setSelectedAffiliate(affiliate)
    }
  }

  const handleLogout = () => {
    setSelectedAffiliate(null)
    setCurrentView("dashboard")
  }

  // Login simulation
  if (!selectedAffiliate) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Affiliate Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={handleLogin}>
              <SelectTrigger>
                <SelectValue placeholder="Choose affiliate" />
              </SelectTrigger>
              <SelectContent>
                {affiliates.map((affiliate) => (
                  <SelectItem key={affiliate.id} value={affiliate.id.toString()}>
                    {affiliate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Affiliate Dashboard - {selectedAffiliate.name}</h1>
          <div className="flex items-center gap-4">
            <Button
              variant={currentView === "dashboard" ? "default" : "outline"}
              onClick={() => setCurrentView("dashboard")}
            >
              Dashboard
            </Button>
            <Button
              variant={currentView === "postback" ? "default" : "outline"}
              onClick={() => setCurrentView("postback")}
            >
              Postback URL
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {currentView === "dashboard" ? (
          <div className="space-y-6">
            {/* Clicks logged under campaigns */}
            <Card>
              <CardHeader>
                <CardTitle>Clicks by Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockClicks.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <span className="font-medium">{item.campaign}</span>
                      <span className="text-gray-600">{item.clicks} clicks</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversions with amount, currency, timestamp */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockConversions.map((conversion, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <span className="font-medium text-green-600">
                          {conversion.amount} {conversion.currency}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">{conversion.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Affiliate Postback URL Page */
          <Card>
            <CardHeader>
              <CardTitle>Your Postback URL</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Use this URL format for tracking conversions:</p>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm break-all">
                https://affiliate-system.com/postback?affiliate_id={selectedAffiliate.id}&click_id={"{click_id}"}
                &amount={"{amount}"}&currency={"{currency}"}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
