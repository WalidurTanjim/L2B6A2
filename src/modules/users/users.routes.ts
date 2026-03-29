import express from "express";
import { usersControllers } from "./users.controllers";
import auth from "../../middleware/auth";

const router = express.Router();

// POST method
router.post("/", usersControllers.createUser);

// GET method
router.get("/", auth("admin"), usersControllers.getUsers);
router.get("/:userId", usersControllers.getUserById);

// DELETE method
router.delete("/:userId", usersControllers.deleteUserById);

// PUT method
router.put("/:userId", usersControllers.updateUserById);

export const usersRoutes = router;