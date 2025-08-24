"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ConversionsTableProps {
  affiliateId: number
}

// Mock conversion data
const mockConversions = [
  {
    id: 1,
    clickId: "abc123",
    amount: 149.99,
    currency: "USD",
    timestamp: "2024-01-15T10:30:00Z",
    campaignName: "Summer Electronics Sale",
  },
  {
    id: 2,
    clickId: "def456",
    amount: 89.5,
    currency: "USD",
    timestamp: "2024-01-15T09:15:00Z",
    campaignName: "Back to School Laptops",
  },
  {
    id: 3,
    clickId: "ghi789",
    amount: 299.99,
    currency: "USD",
    timestamp: "2024-01-14T16:45:00Z",
    campaignName: "Gaming Accessories",
  },
  {
    id: 4,
    clickId: "jkl012",
    amount: 75.25,
    currency: "USD",
    timestamp: "2024-01-14T14:20:00Z",
    campaignName: "Smart Home Devices",
  },
  {
    id: 5,
    clickId: "mno345",
    amount: 199.99,
    currency: "USD",
    timestamp: "2024-01-14T11:10:00Z",
    campaignName: "Summer Electronics Sale",
  },
]

export function ConversionsTable({ affiliateId }: ConversionsTableProps) {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Conversions</CardTitle>
        <CardDescription>Track your successful conversions with amounts and timestamps</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockConversions.map((conversion) => (
            <div key={conversion.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-card-foreground">{conversion.campaignName}</h3>
                  <Badge variant="outline" className="text-xs">
                    {conversion.clickId}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{formatDate(conversion.timestamp)}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-secondary">
                  {formatCurrency(conversion.amount, conversion.currency)}
                </p>
                <p className="text-sm text-muted-foreground">{conversion.currency}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
