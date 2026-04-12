import express from "express";
import { vehiclesControllers } from "./vehicles.controllers";

const router = express.Router();

// POST method
router.post("/", vehiclesControllers.createVehicles);

export const vehiclesRoutes = router;