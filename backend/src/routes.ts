import { Router } from "express";
import { controller } from "./controller";

const router = Router();

router.get("/click", controller.clickTracking);
router.get("/postback", controller.postBack);
router.get("/conversions", controller.getConversions);
router.get("/clicks", controller.getClicks);
router.get("/affiliates", controller.getAffiliates);
export default router;
