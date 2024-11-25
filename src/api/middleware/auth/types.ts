export interface JWTPayload {
  userId: number;
}

export interface AuthMiddlewareContext {
  userId: number;
}