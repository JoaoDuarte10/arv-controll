/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtAdapter } from '../../domain/usecases/adapter/JwtAdapter';
import jwt from 'jsonwebtoken';

export class Jwt implements JwtAdapter {
  createToken(data: any, key: string, expireIn: number): string {
    return jwt.sign(data, key, { expiresIn: `${expireIn}h` });
  }

  validateToken(token: string, secretKey: string): any {
    try {
      const result = jwt.verify(token, secretKey);
      return result as any;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
