export interface JwtAdapter {
  createToken: (data: any, key: string, expireIn: number) => string;
  validateToken: (token: string, secretKey: string) => boolean;
}
