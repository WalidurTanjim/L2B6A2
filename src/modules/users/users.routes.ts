import express from "express";
import { usersControllers } from "./users.controllers";

const router = express.Router();

// POST method
router.post("/", usersControllers.createUser);

// GET method
router.get("/", usersControllers.getUsers);
router.get("/:userId", usersControllers.getUserById);

export const usersRouter = router;