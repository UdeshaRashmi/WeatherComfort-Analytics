import { Router } from "express";
import { getWeatherAnalytics, getCacheStatus } from "../controllers/weatherController";
import { authMiddleware } from "../middleware/authMiddleware";


const router = Router();
router.get("/weather", authMiddleware, getWeatherAnalytics);
router.get("/cache/status", authMiddleware, getCacheStatus);


export default router;