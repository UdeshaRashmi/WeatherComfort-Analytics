import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes";
import { ENV } from "./config/env";


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", weatherRoutes);


app.listen(ENV.PORT, () => {
console.log(`Server running on port ${ENV.PORT}`);
});