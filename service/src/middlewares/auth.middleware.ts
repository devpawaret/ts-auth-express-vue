import { Request, Response, NextFunction } from "express";
import { jwt } from "../libs";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "ไม่ได้รับอนุญาต" });

  try {
    const decodedToken = jwt.verifyAccessToken(token);
    (req as any).user = decodedToken;

    next();
  } catch {
    return res.status(403).json({ message: "โทเค็นไม่ถูกต้อง" });
  }
};
