import { WeatherData } from "../models/Weather";


function temperatureScore(t: number): number {
return Math.max(0, 100 - Math.abs(t - 22) * 5);
}


function humidityScore(h: number): number {
return Math.max(0, 100 - Math.abs(h - 50) * 2);
}


function windScore(w: number): number {
return Math.min(100, w * 20);
}


function cloudScore(c: number): number {
return 100 - c;
}

export function calculateComfortIndex(w: WeatherData): number {
const score =
0.4 * temperatureScore(w.temperature) +
0.3 * humidityScore(w.humidity) +
0.2 * windScore(w.windSpeed) +
0.1 * cloudScore(w.cloudiness);


return Math.round(Math.min(100, Math.max(0, score)));
}