import jwt from "jsonwebtoken";
import config from "../../configs";

import { AccessTokenPayload, RefreshTokenPayload } from "../../types/token";

export const generateAccessToken = (payload: AccessTokenPayload): string => {
  return jwt.sign(payload, config.jwtAccessSecret, {
    expiresIn: config.jwtAccessExpiry,
    subject: "accessToken",
  });
};

export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
  return jwt.sign(payload, config.jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpiry,
    subject: "refreshToken",
  });
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, config.jwtAccessSecret, {
    subject: "accessToken",
  }) as AccessTokenPayload;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, config.jwtRefreshSecret, {
    subject: "refreshToken",
  }) as RefreshTokenPayload;
};
