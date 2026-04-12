import express from "express";
import { vehiclesControllers } from "./vehicles.controllers";

const router = express.Router();

// POST method
router.post("/", vehiclesControllers.createVehicles);

// GET method
router.get('/', vehiclesControllers.getVehicles)

export const vehiclesRoutes = router;