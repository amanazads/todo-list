import jwt from "jsonwebtoken";

export function generateJwt(payload: object, secret: string, expiresIn = "7d") {
  return jwt.sign(
    payload as string | object | Buffer,
    secret as jwt.Secret,
    { expiresIn } as jwt.SignOptions
  );
}
