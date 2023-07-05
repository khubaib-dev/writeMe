import { randomBytes } from 'crypto';

const secretKey = randomBytes(32).toString('hex');

export const jwtConstants = {
    secret: secretKey,
  };