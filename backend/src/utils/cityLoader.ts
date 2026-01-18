import fs from "fs";
import path from "path";
import { City } from "../models/City";


export function loadCities(): City[] {
const filePath = path.join(__dirname, "../../cities.json");
const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));


if (!raw.List || !Array.isArray(raw.List)) {
throw new Error("Invalid cities.json format");
}


return raw.List.map((c: any) => ({
CityCode: Number(c.CityCode),
CityName: c.CityName
}));
}