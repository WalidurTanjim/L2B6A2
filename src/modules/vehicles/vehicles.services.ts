import { pool } from "../../config/db";
import { Vehicle } from "../../types/vehicle";
import AppError from "../../utils/AppError";

// POST method
const createVehicles = async(payload: Vehicle) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    try{
        const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

        const vehicle = result?.rows[0];
        return vehicle;
    }catch(err: any) {
        if(err instanceof AppError) throw err;

        throw new AppError(err?.message || "Something went wrong!", 500);
    }
}

export const vehiclesServices = {
    createVehicles,
};