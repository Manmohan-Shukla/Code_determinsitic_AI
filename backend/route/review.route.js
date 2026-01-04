import e from "express";
import authenticate from "../middleware/auth.middleware.js";
import {
  getHistory,
  analyzecode,
  getId,
} from "../controllers/review.controller.js";
const app = e();
const router = e.Router();

router.post("/analyze", authenticate, analyzecode);

router.get("/history", authenticate, getHistory);

router.get("/:id", authenticate, getId);

export default router;
