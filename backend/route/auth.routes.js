import express from "express";
import { getMe, login, signup } from "../controllers/auth.controller.js";
import { validate } from "../middleware/auth.validate.js";
import signSchema from "../schema/auth.schema.js";
import authenticate from "../middleware/auth.middleware.js";
const app = express();
const router = express.Router();
router.get("/signin", login);

router.get("/signup", validate(signSchema), signup);

router.post("/me", authenticate, getMe);

export default router;
