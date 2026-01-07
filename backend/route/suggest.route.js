import express from "express";
import {
  optimize,
  testcase,
  timecomplexity,
} from "../controllers/suggest.controller.js";
import authenticate from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/timecomplexity", authenticate, timecomplexity);
router.post("/testcase", authenticate, testcase);
router.post("/optimize", authenticate, optimize);
export default router;
