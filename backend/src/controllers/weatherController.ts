import { Request, Response } from "express";
import { loadCities } from "../utils/cityLoader";
import { fetchWeather } from "../services/weatherService";
import { calculateComfortIndex } from "../services/comfortIndexService";
import { rawWeatherCache, comfortCache } from "../services/cacheService";


export async function getWeatherAnalytics(req: Request, res: Response) {
const cities = loadCities().slice(0, 10);
const results: any[] = [];


for (const city of cities) {
const wKey = `weather:${city.CityCode}`;
const cKey = `comfort:${city.CityCode}`;


let weather = rawWeatherCache.get(wKey);
if (!weather) {
weather = await fetchWeather(city.CityCode);
rawWeatherCache.set(wKey, weather);
}


let comfort = comfortCache.get(cKey);
if (!comfort) {
comfort = calculateComfortIndex(weather as any);
comfortCache.set(cKey, comfort);
}

results.push({
cityId: city.CityCode,
cityName: city.CityName,
description: (weather as any).description,
temperature: (weather as any).temperature,
comfortScore: comfort
});
}


results.sort((a, b) => b.comfortScore - a.comfortScore);
results.forEach((r, i) => (r.rank = i + 1));


res.json(results);
}


export function getCacheStatus(req: Request, res: Response) {
const status: any = {};
rawWeatherCache.keys().forEach(k => {
status[k] = rawWeatherCache.has(k) ? "HIT" : "MISS";
});
res.json(status);
}




 