import { Request, Response, NextFunction } from "express";
import { notFound, expiredToken, tokenFormatter, unAuth } from "../utils";
import { tokenService } from "../services";
import { log } from "console";
import { jwtConfig } from "../configs";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = tokenFormatter(req.header("authorization")!);
    if (!token) {
      return res.status(401).json({
        message: unAuth(),
      });
    }
    const expireIn = jwtConfig.expiresIn * 60 * 1000;
    const tokenInfo = await tokenService.findByAccessToken(token);
    if (!tokenInfo) {
      return res.status(404).json({
        message: notFound("Access Token"),
      });
    }
    let isExpired =
      new Date().getTime() - tokenInfo.lastGeneratedAt.getTime() > expireIn;

    log("Expiire --->" + expireIn);
    log(
      `RN ---> ${new Date().getTime() - tokenInfo.lastGeneratedAt.getTime()}`
    );

    if (isExpired) {
      await tokenService.deactivateAccessToken(token);
      return res.status(401).json({
        message: expiredToken(),
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
