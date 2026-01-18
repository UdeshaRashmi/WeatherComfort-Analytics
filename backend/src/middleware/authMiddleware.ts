import { expressjwt } from "express-jwt";
import { jwksClient } from "../config/auth0";
import { ENV } from "../config/env";


export const authMiddleware = expressjwt({
secret: jwksClient,
audience: ENV.AUTH0_AUDIENCE,
issuer: `https://${ENV.AUTH0_DOMAIN}/`,
algorithms: ["RS256"]
});