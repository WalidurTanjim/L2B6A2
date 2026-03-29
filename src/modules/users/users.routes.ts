import express from "express";
import { usersControllers } from "./users.controllers";
import auth from "../../middleware/auth";

const router = express.Router();

// POST method
router.post("/auth/signup", usersControllers.createUser);

// GET method
router.get("/users/", auth("customer"), usersControllers.getUsers);
router.get("/users/:userId", usersControllers.getUserById);

// DELETE method
router.delete("/users/:userId", usersControllers.deleteUserById);

// PUT method
router.put("/users/:userId", usersControllers.updateUserById);

export const usersRoutes = router;