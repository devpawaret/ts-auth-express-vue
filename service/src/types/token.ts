export interface AccessTokenPayload {
  userId: number;
  role: string;
}

export interface RefreshTokenPayload {
  userId: number;
}
