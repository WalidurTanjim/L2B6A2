import express from "express";
import { usersControllers } from "./users.controllers";

const router = express.Router();

// POST method
router.post("/", usersControllers.createUser);

export const usersRouter = router;