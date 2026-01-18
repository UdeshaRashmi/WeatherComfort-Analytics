import NodeCache from "node-cache";


export const rawWeatherCache = new NodeCache({ stdTTL: 300 });
export const comfortCache = new NodeCache({ stdTTL: 300 });