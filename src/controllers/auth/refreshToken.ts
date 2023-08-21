import { Request, Response, NextFunction } from "express";
import { expiredToken, notFound } from "../../utils";
import { tokenService } from "../../services";
import randomstring from "randomstring";
import { jwtConfig } from "../../configs";
import { log } from "console";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { refreshToken } = req.body;
    let tokenInfo = await tokenService.findByRefreshToken(refreshToken);

    // checking by conditionals
    if (!tokenInfo) {
      return res.status(404).json({
        message: notFound("Info by Refresh token"),
      });
    }

    const expireIn = jwtConfig.expiresIn * 60 * 1000;

    let isExpired =
      new Date().getTime() - tokenInfo.lastGeneratedAt.getTime() > expireIn;

    log("Expiire --->" + expireIn);
    log(
      `RN ---> ${new Date().getTime() - tokenInfo.lastGeneratedAt.getTime()}`
    );

    if (isExpired) {
      await tokenService.deactivateAccessToken(tokenInfo.accessToken!);
    }

    // creating new access and refresh token
    let newAccessToken = randomstring.generate({ length: 199 });
    let newRefreshToken = randomstring.generate({ length: 199 });

    // updating generating token from db
    let gNewTokens = await tokenService.refreshToken(
      refreshToken,
      newAccessToken,
      newRefreshToken
    );

    // expire date
    let expireTime = new Date(
      gNewTokens.lastGeneratedAt.getTime() + jwtConfig.expiresIn * 60 * 1000
    ).toLocaleString();

    // final success reponse
    res.status(200).json({
      message: "Access and Refresh token successfully generated",
      expireTime,
      tokens: {
        accessToken: gNewTokens.accessToken,
        refreshToken: gNewTokens.refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};
