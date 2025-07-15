
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";


// Define  type for decoded token
interface ITokenPayload extends JwtPayload {
  _id: string;
  email: string;
}


export type AuthRequest = Request & {
  user?: IUser
};


export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return next(new Error("Unauthorized request: No token found"));
    }

    const decoded = jwt.verify(
      token,
      envVars.ACCESS_TOKEN_SECRET
    ) as ITokenPayload;

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return next(new Error("Invalid access token"));
    }

    (req as AuthRequest).user = user;

    next();
  } catch (error) {
    console.error("JWT verify error:", error);
    return next(new Error("Invalid or expired token"));
  }
};