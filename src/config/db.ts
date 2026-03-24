import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
     connectionString: config.PG_CONNECTION_STRING
})

// initDB function
const initDB = async() => {
     try{
          await pool.query('BEGIN');

          // users table
          await pool.query(`
                    CREATE TABLE IF NOT EXISTS users(
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(150) NOT NULL,
                         email VARCHAR(200) UNIQUE NOT NULL,
                         password TEXT NOT NULL,
                         phone VARCHAR(15) NOT NULL,
                         role VARCHAR(50) NOT NULL
                    )
               `);

          // vehicles table
          await pool.query(`
                    CREATE TABLE IF NOT EXISTS vehicles(
                         id SERIAL PRIMARY KEY,
                         vehicle_name VARCHAR(100) NOT NULL,
                         type VARCHAR(15) NOT NULL,
                         registration_number VARCHAR(150) NOT NULL,
                         daily_rent_price INT NOT NULL,
                         availability_status VARCHAR(30) NOT NULL
                    )
               `);

          // bookings table
          await pool.query(`
                    CREATE TABLE IF NOT EXISTS bookings(
                         id SERIAL PRIMARY KEY,
                         customer_id INT REFERENCES users(id) ON DELETE CASCADE,
                         vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
                         rent_start_date DATE NOT NULL,
                         rent_end_date DATE NOT NULL,
                         total_price NUMERIC(15, 2) NOT NULL CHECK (total_price >= 0),
                         status VARCHAR(25) NOT NULL
                    )
               `);

          await pool.query('COMMIT');
     }catch(err: any) {
          await pool.query('ROLLBACK');

          console.error("Database error from db.ts:", err?.message);
     }
}

export default initDB;