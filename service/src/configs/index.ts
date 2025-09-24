import { Secret, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import ms, { type StringValue } from "ms";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  jwtAccessSecret: Secret;
  jwtRefreshSecret: Secret;
  jwtAccessExpiry: SignOptions["expiresIn"];
  jwtRefreshExpiry: SignOptions["expiresIn"];
  cookieMaxAge: number;
}

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET as Secret,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as Secret,
  jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRY as SignOptions["expiresIn"],
  jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY as SignOptions["expiresIn"],
  cookieMaxAge: ms(process.env.JWT_REFRESH_EXPIRY as StringValue),
};

export default config;
