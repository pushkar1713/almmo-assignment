"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockAffiliates = [
  { id: 1, name: "John Smith - TechDeals" },
  { id: 2, name: "Sarah Johnson - MarketPro" },
  { id: 3, name: "Mike Chen - DigitalBoost" },
  { id: 4, name: "Emma Davis - ConvertMax" },
]

interface AffiliateLoginProps {
  onLogin: (affiliate: { id: number; name: string }) => void
}

export function AffiliateLogin({ onLogin }: AffiliateLoginProps) {
  const [selectedAffiliateId, setSelectedAffiliateId] = useState<string>("")

  const handleLogin = () => {
    const affiliate = mockAffiliates.find((a) => a.id.toString() === selectedAffiliateId)
    if (affiliate) {
      onLogin(affiliate)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Affiliate Dashboard</CardTitle>
          <CardDescription>Select your affiliate account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Choose Affiliate Account</label>
            <Select value={selectedAffiliateId} onValueChange={setSelectedAffiliateId}>
              <SelectTrigger>
                <SelectValue placeholder="Select an affiliate..." />
              </SelectTrigger>
              <SelectContent>
                {mockAffiliates.map((affiliate) => (
                  <SelectItem key={affiliate.id} value={affiliate.id.toString()}>
                    {affiliate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleLogin} disabled={!selectedAffiliateId} className="w-full">
            Access Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
