import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
     PORT: process.env.PORT,
     PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
     JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET
}

export default config;
