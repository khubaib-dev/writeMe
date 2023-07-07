// import { randomBytes } from 'crypto';
// const secretKey = randomBytes(32).toString('hex');
export const jwtConstants = {
    secret: process.env.JWT_SECRET_KEY,
  };