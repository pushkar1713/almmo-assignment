import { Router } from "express";
import { controller } from "./controller";

const router = Router();

router.get("/click", controller.clickTracking);
router.get("/postback", controller.postBack);

export default router;
