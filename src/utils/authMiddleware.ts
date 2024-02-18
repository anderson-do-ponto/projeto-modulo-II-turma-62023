import { Request, Response, NextFunction } from "express";
import { Token } from "./token";
import mongoose from "mongoose";

const tokenService = new Token();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.error("Token not provided.");
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided." });
  }

  try {
    console.log("Verifying token:", token);
    const decoded = tokenService.verifyToken(token);
    console.log("Decoded token:", decoded);

    if (!decoded.userId) {
      console.error("User ID not found in decoded token.");
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID not found in token." });
    }

    const user = {
      _id: new mongoose.Types.ObjectId(decoded.userId),
      name: "",
      email: "",
      password: "",
      jewelsAmount: 0,
      products: [],
      favoriteProducts: [],
      photo: "",
      isAdmin: decoded.isAdmin,
    };

    req.user = user;
    console.log("User ID in request:", req.user?._id);

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
};

export default authMiddleware;
