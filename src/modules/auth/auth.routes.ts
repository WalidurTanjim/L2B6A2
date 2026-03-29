import express from "express"
import { authControllers } from "./auth.controllers";

const router = express.Router();

// POST method
router.post("/signin", authControllers.signInUser);

export const authRouters = router;