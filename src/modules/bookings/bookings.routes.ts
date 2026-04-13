import express from "express";
import { bookingsControllers } from "./bookings.controllers";

const router = express.Router();

// POST method
router.post('/', bookingsControllers.createBooking);

export const bookingsRoutes = router;