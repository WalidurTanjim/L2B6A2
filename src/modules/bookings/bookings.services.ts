import { pool } from "../../config/db";
import { Booking } from "../../types/booking";
import AppError from "../../utils/AppError"

// POST method
const createBooking = async(payload: Booking) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date} = payload;

    try{
        const getUser = await pool.query(`SELECT * FROM users WHERE id=$1`, [customer_id]);
        const user = getUser.rows[0]
        if(!user) return "no_user"

        const getVehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicle_id]);
        const vehicle = getVehicle.rows[0];
        if(!vehicle) return "no_vehicle"
        const { daily_rent_price} = vehicle;

        const diffInTime = new Date(rent_end_date).getTime() - new Date(rent_start_date).getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        const totalPrice = diffInDays * daily_rent_price;

        const result = await pool.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice, 'active']);

        const booking = result.rows[0];

        return { booking, vehicle };
    }catch(err: any) {
        if(err instanceof AppError) throw err;

        throw new AppError(err?.message || "Something went wrong!", 500)
    }
}

export const bookingsServices = {
    createBooking,
}