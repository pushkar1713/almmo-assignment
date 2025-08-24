import { Request, Response } from "express";
import { Prisma, PrismaClient } from "../generated/prisma";
import { clickTrackingSchema, postBackSchema } from "./validator";

const prisma = new PrismaClient();

export class controller {
  static async clickTracking(req: Request, res: Response): Promise<void> {
    try {
      const reqData = {
        affiliateId: req.query.affiliate_id,
        campaignId: req.query.campaign_id,
        clickId: req.query.click_id,
      };

      const payload = clickTrackingSchema.safeParse(reqData);

      if (!payload.success) {
        console.log(payload.error);
        res.status(400).json({ error: "Invalid request" });
        return;
      }

      const click = await prisma.clicks.create({
        data: {
          affiliateId: payload.data.affiliateId,
          campaignId: payload.data.campaignId,
          clickId: payload.data.clickId,
        },
      });

      res.status(200).json(click);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }

  static async postBack(req: Request, res: Response): Promise<void> {
    try {
      const reqData = {
        affiliateId: req.query.affiliate_id,
        clickId: req.query.click_id,
        amount: req.query.amount,
        currency: req.query.currency,
      };

      const payload = postBackSchema.safeParse(reqData);

      if (!payload.success) {
        console.log(payload.error);
        res.status(400).json({ error: "Invalid request" });
        return;
      }

      const click = await prisma.clicks.findUnique({
        where: {
          clickId: payload.data.clickId,
          affiliateId: payload.data.affiliateId,
        },
      });

      if (!click) {
        res.status(400).json({ error: "Click not found" });
        return;
      }

      const conversion = await prisma.conversions.create({
        data: {
          clickId: payload.data.clickId,
          amount: payload.data.amount,
          currency: payload.data.currency,
        },
      });

      res.status(200).json({
        status: "success",
        message: "Conversion tracked",
      });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }

  static async getConversions(req: Request, res: Response): Promise<void> {
    try {
      const conversions = await prisma.conversions.findMany({
        select: {
          id: true,
          amount: true,
          currency: true,
          createdAt: true,
        },
      });
      res.status(200).json({
        status: "success",
        data: conversions,
      });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }

  static async getClicks(req: Request, res: Response): Promise<void> {
    try {
      const clicks = await prisma.campaigns.findMany({
        include: {
          clicks: true,
        },
      });

      const clicksData = clicks.map((campaign) => ({
        campaignId: campaign.id,
        campaignName: campaign.name,
        clicks: campaign.clicks.length,
      }));

      res.status(200).json({
        status: "success",
        data: clicksData,
      });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }
  static async getAffiliates(req: Request, res: Response): Promise<void> {
    try {
      const affiliates = await prisma.affiliates.findMany();
      res.status(200).json({
        status: "success",
        data: affiliates,
      });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }
}
