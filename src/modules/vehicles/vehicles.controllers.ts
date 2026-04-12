import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/AppError";
import { vehiclesServices } from "./vehicles.services";

// POST method
const createVehicles = async(req: Request, res: Response, next: NextFunction) => {
    const validTypes: string[] = ['car', 'bike', 'van', 'suv'];
    try{
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;

        if(!vehicle_name) throw new AppError("Vehicle name is requires", 500);
        if(!type) throw new AppError("Vehicle type is required", 500);
        if(!validTypes.includes(type.toLowerCase())) throw new AppError("Invalid vehicle type", 400);
        if(!registration_number) throw new AppError("Registration number is required", 500);
        if(!daily_rent_price) throw new AppError("Daily rent price is required", 500);
        if(!availability_status) throw new AppError("Availability status is required", 500);

        const result = await vehiclesServices.createVehicles(req.body);

        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result
        })
    }catch(err) {
        next(err);
    }
};

// GET method
const getVehicles = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await vehiclesServices.getVehicles();

        if(result.length > 0) {
            res.status(200).json({
                success: true,
                message: "Vehicles retrived successfully",
                data: result
            });
        }else res.status(404).json({
            success: false,
            message: "No vehicles available",
            data: null
        })
    }catch(err) {
        next(err);
    }
}

const getVehicleById = async(req: Request, res: Response, next: NextFunction) => {
    const { vehicleId } = req?.params;

    try{
        const result = await vehiclesServices.getVehicleById(vehicleId as string);

        res.status(200).json({
            success: true,
            message: "User retrived successfully",
            data: result
        })
    }catch(err) {
        next(err);
    }
}

// DELETE method
const deleteVehicleById = async(req: Request, res: Response, next: NextFunction) => {
    const { vehicleId } = req?.params;

    try{
        await vehiclesServices.deleteVehicleById(vehicleId as string);
        res.status(204).send()
    }catch(err) {
        next(err)
    }
}

export const vehiclesControllers = {
    createVehicles,
    getVehicles,
    getVehicleById,
    deleteVehicleById,
}