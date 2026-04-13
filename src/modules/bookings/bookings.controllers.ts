import e, { NextFunction, Request, Response } from "express";
import AppError from "../../utils/AppError";
import { bookingsServices } from "./bookings.services";

// POST method
const createBooking = async(req: Request, res: Response, next: NextFunction) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

    if(!customer_id) throw new AppError("Customer id id required", 400);
    if(!vehicle_id) throw new AppError("Vehicle id is required", 400);
    if(!rent_start_date) throw new AppError("Rent start date is required", 400);
    if(!rent_end_date) throw new AppError("Rent end date is required", 400);

    const bookingBody = { customer_id, vehicle_id, rent_start_date, rent_end_date };

    try{
        if(new Date(rent_end_date) <= new Date(rent_start_date)) throw new AppError("End date must be after start date!", 400);

        const result = await bookingsServices.createBooking(bookingBody);
        console.log("Booking result from ctrl:", result);

        if(result === 'no_user') return res.status(404).json({
            success: false,
            message: "User not found!"
        })

        if(result === 'no_vehicle') return res.status(404).json({
            success: false,
            message: "Vehicle not found!"
        })

        const { booking, vehicle } = result;
        const { id, total_price, status } = booking;
        const { vehicle_name, daily_rent_price } = vehicle;

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: {
                id,
                customer_id, 
                vehicle_id, 
                rent_start_date,
                rent_end_date,
                total_price,
                status,
                "vehicle": {
                    vehicle_name,
                    daily_rent_price
                }
            }
        })
    }catch(err) {
        next(err);
    }
};

export const bookingsControllers = {
    createBooking,
}