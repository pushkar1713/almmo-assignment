"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Check } from "lucide-react"

interface PostbackUrlCardProps {
  affiliateId: number
}

export function PostbackUrlCard({ affiliateId }: PostbackUrlCardProps) {
  const [copied, setCopied] = useState(false)

  const postbackUrl = `https://affiliate-system.com/postback?affiliate_id=${affiliateId}&click_id={click_id}&amount={amount}&currency={currency}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postbackUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Postback URL</CardTitle>
          <CardDescription>Share this URL with advertisers to track conversions automatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Postback URL Format</label>
            <div className="flex gap-2">
              <Input value={postbackUrl} readOnly className="font-mono text-sm" />
              <Button variant="outline" size="icon" onClick={copyToClipboard} className="shrink-0 bg-transparent">
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-card-foreground mb-2">URL Parameters:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <code className="bg-background px-1 rounded">affiliate_id</code> - Your unique affiliate ID (
                {affiliateId})
              </li>
              <li>
                <code className="bg-background px-1 rounded">click_id</code> - Unique identifier for the click
              </li>
              <li>
                <code className="bg-background px-1 rounded">amount</code> - Conversion amount (e.g., 100.00)
              </li>
              <li>
                <code className="bg-background px-1 rounded">currency</code> - Currency code (e.g., USD, EUR)
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integration Instructions</CardTitle>
          <CardDescription>How to set up postback tracking with advertisers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">1. Share Your Postback URL</h4>
              <p className="text-muted-foreground">
                Provide the postback URL above to your advertisers or affiliate networks.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">2. Click Tracking</h4>
              <p className="text-muted-foreground">
                When users click your affiliate links, ensure the click_id is properly tracked and stored.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">3. Conversion Tracking</h4>
              <p className="text-muted-foreground">
                When a conversion occurs, the advertiser will fire the postback URL with the conversion details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
