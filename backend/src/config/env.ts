 import dotenv from "dotenv";
dotenv.config();


export const ENV = {
PORT: process.env.PORT || 4000,
OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY as string,
AUTH0_DOMAIN: process.env.AUTH0_DOMAIN as string,
AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE as string
};