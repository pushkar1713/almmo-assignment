"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ClicksOverviewProps {
  affiliateId: number
}

// Mock data for clicks by campaign
const mockClicksData = [
  {
    campaignId: 10,
    campaignName: "Summer Electronics Sale",
    clicks: 456,
    status: "active",
  },
  {
    campaignId: 11,
    campaignName: "Back to School Laptops",
    clicks: 342,
    status: "active",
  },
  {
    campaignId: 12,
    campaignName: "Gaming Accessories",
    clicks: 289,
    status: "paused",
  },
  {
    campaignId: 13,
    campaignName: "Smart Home Devices",
    clicks: 160,
    status: "active",
  },
]

export function ClicksOverview({ affiliateId }: ClicksOverviewProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Clicks by Campaign</CardTitle>
          <CardDescription>Track your click performance across different campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockClicksData.map((campaign) => (
              <div
                key={campaign.campaignId}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-card-foreground">{campaign.campaignName}</h3>
                    <Badge variant={campaign.status === "active" ? "default" : "secondary"} className="text-xs">
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Campaign ID: {campaign.campaignId}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-card-foreground">{campaign.clicks.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">clicks</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
