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

// GET method
const getVehicles = async() => {
    try{
        const result = await pool.query(`SELECT * FROM vehicles`);
        return result.rows
    }catch(err: any) {
        if(err instanceof AppError) throw err

        throw new AppError(err?.message || "Something went wrong!", 500)
    }
}

const getVehicleById = async(vehicleId: string) => {
    try{
        const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicleId]);

        if(result.rowCount === 0) throw new AppError("Vehicle not found", 400);

        return result.rows[0];
    }catch(err: any) {
        if(err instanceof AppError) throw err;

        throw new AppError(err?.message || "Something went wrong!", 500)
    }
}

// DELETE method
const deleteVehicleById = async(vehicleId: string) => {
    try{
        const result = await pool.query(`DELETE FROM vehicles WHERE id=$1 RETURNING *`, [vehicleId]);

        if(result.rowCount === 0) throw new AppError("Vehicle not found", 404);

          return result.rows[0];
    }catch(err: any) {
        if(err instanceof AppError) throw err

        throw new AppError(err?.message || "Something went wrong!", 500)
    }
}

// PUT method
const updateVehicleById = async(vehicleId: string, payload: Vehicle) => {
    const { vehicle_name, type, registration_number ,daily_rent_price, availability_status } = payload;

    try{
        const result = await pool.query(`UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]);

         if(result.rowCount === 0) throw new AppError("Vehicle not found", 404);

          return result.rows[0];
    }catch(err: any) {
        if(err instanceof AppError) throw err 

        throw new AppError(err?.message || "Something went wrong!" , 500)
    }
}

export const vehiclesServices = {
    createVehicles,
    getVehicles,
    getVehicleById,
    deleteVehicleById,
    updateVehicleById
};