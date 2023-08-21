import { Request, Response, NextFunction } from "express";
import { tokenFormatter, unAuth } from "../utils";
import { tokenService } from "../services";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = tokenFormatter(req.header("authorization")!);
    if (!token) {
      return res.status(401).json({
        message: unAuth(),
      });
    }
    let getStatus = await tokenService.findByAccessToken(token);
    if (!getStatus) return res.status(401).json({ message: unAuth() });
    if (getStatus.isExpired) {
      return res.status(401).json({ isExpired: true });
    } else {
      return res.status(200).json({ isExpired: false });
    }
  } catch (err) {
    next(err);
  }
};
