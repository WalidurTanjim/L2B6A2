import express from "express";
import { vehiclesControllers } from "./vehicles.controllers";

const router = express.Router();

// POST method
router.post("/", vehiclesControllers.createVehicles);

// GET method
router.get('/', vehiclesControllers.getVehicles)
router.get('/:vehicleId', vehiclesControllers.getVehicleById)

// DELETE method
router.delete('/:vehicleId', vehiclesControllers.deleteVehicleById)

// PUT method
router.put('/:vehicleId', vehiclesControllers.updateVehicleById)

export const vehiclesRoutes = router;