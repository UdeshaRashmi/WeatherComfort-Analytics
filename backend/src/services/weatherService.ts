// src/services/weatherService.ts
import axios from "axios";
import { ENV } from "../config/env";
import { WeatherData } from "../models/Weather";


export async function fetchWeather(cityId: number): Promise<WeatherData> {
const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${ENV.OPENWEATHER_API_KEY}`;
const { data } = await axios.get(url);


return {
cityId: data.id,
cityName: data.name,
description: data.weather[0].description,
temperature: data.main.temp - 273.15,
humidity: data.main.humidity,
windSpeed: data.wind.speed,
cloudiness: data.clouds.all
};
}