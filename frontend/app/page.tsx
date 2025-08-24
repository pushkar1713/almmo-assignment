"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Affiliate, Click, Conversion } from "@/types";

const getAffiliates = async () => {
  const response = await axios.get(
    "https://almmo-assignment-l6f4.vercel.app/affiliates"
  );
  return response.data.data;
};

const getClicksData = async () => {
  const response = await axios.get(
    "https://almmo-assignment-l6f4.vercel.app/clicks"
  );
  return response.data.data;
};

const getConversionsData = async () => {
  const response = await axios.get(
    "https://almmo-assignment-l6f4.vercel.app/conversions"
  );
  return response.data.data;
};

export default function Home() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [clicksData, setClicksData] = useState<Click[]>([]);
  const [conversionsData, setConversionsData] = useState<Conversion[]>([]);
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const [affiliatesData, clicks, conversions] = await Promise.all([
        getAffiliates(),
        getClicksData(),
        getConversionsData(),
      ]);
      setAffiliates(affiliatesData);
      setClicksData(clicks);
      setConversionsData(conversions);
    };
    fetchData();
  }, []);

  const [currentView, setCurrentView] = useState<"dashboard" | "postback">(
    "dashboard"
  );

  const handleLogin = (affiliateId: string) => {
    const affiliate = affiliates.find((a) => a.id.toString() === affiliateId);
    if (affiliate) {
      setSelectedAffiliate(affiliate);
    }
  };

  const handleLogout = () => {
    setSelectedAffiliate(null);
    setCurrentView("dashboard");
  };

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
                  <SelectItem
                    key={affiliate.id}
                    value={affiliate.id.toString()}
                  >
                    {affiliate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            Affiliate Dashboard - {selectedAffiliate.name}
          </h1>
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
                  {clicksData.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b last:border-b-0"
                    >
                      <span className="font-medium">{item.campaignName}</span>
                      <span className="text-gray-600">
                        {item.clicks} clicks
                      </span>
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
                  {conversionsData.map((conversion, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b last:border-b-0"
                    >
                      <div>
                        <span className="font-medium text-green-600">
                          {conversion.amount} {conversion.currency}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {new Date(conversion.createdAt).toLocaleString()}
                      </span>
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
              <p className="text-gray-600 mb-4">
                Use this URL format for tracking conversions:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm break-all">
                https:/https://almmo-assignment-l6f4.vercel.app/postback?affiliate_id=
                {selectedAffiliate.id}&click_id={"{click_id}"}
                &amount={"{amount}"}&currency={"{currency}"}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
