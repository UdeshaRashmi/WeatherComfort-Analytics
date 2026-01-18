import jwksRsa from "jwks-rsa";
import { ENV } from "./env";


export const jwksClient = jwksRsa.expressJwtSecret({
cache: true,
rateLimit: true,
jwksRequestsPerMinute: 5,
jwksUri: `https://${ENV.AUTH0_DOMAIN}/.well-known/jwks.json`
});