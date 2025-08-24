"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClicksOverview } from "@/components/clicks-overview"
import { ConversionsTable } from "@/components/conversions-table"
import { PostbackUrlCard } from "@/components/postback-url-card"
import { LogOut, TrendingUp, MousePointer, DollarSign } from "lucide-react"

interface AffiliateDashboardProps {
  affiliate: { id: number; name: string }
  onLogout: () => void
}

export function AffiliateDashboard({ affiliate, onLogout }: AffiliateDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for demonstration
  const stats = {
    totalClicks: 1247,
    totalConversions: 89,
    totalRevenue: 4567.89,
    conversionRate: 7.1,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">Affiliate Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {affiliate.name}</p>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-bold text-card-foreground">{stats.totalClicks.toLocaleString()}</p>
                </div>
                <MousePointer className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversions</p>
                  <p className="text-2xl font-bold text-card-foreground">{stats.totalConversions}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-card-foreground">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold text-card-foreground">{stats.conversionRate}%</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  +2.1%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
            <TabsTrigger value="postback">Postback URL</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <ClicksOverview affiliateId={affiliate.id} />
          </TabsContent>

          <TabsContent value="conversions" className="mt-6">
            <ConversionsTable affiliateId={affiliate.id} />
          </TabsContent>

          <TabsContent value="postback" className="mt-6">
            <PostbackUrlCard affiliateId={affiliate.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
