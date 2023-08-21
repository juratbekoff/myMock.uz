import { Request, Response, NextFunction } from "express";
import { organizerService, tokenService } from "../../../services";
import { wrongPassword } from "../../../utils";
import { compare } from "bcrypt";
import randomstring from "randomstring";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { phone_number, password } = req.body;
    let findOrganizer = await organizerService.findByPhone(phone_number);

    //checking by ocnditionals
    if (!findOrganizer) {
      return res.status(401).json({
        message: wrongPassword(),
      });
    }

    // checking organizers excitability
    let isMatch = await compare(password, findOrganizer.password);
    if (!isMatch) {
      return res.status(401).json({
        message: wrongPassword(),
      });
    }

    // creating new access and refresh token
    let newAccessToken = randomstring.generate({ length: 199 });
    let newRefreshToken = randomstring.generate({ length: 199 });

    // updating access and refresh token
    let updateTokens = await tokenService.refreshToken(
      findOrganizer.Token.refreshToken!,
      newAccessToken,
      newRefreshToken
    );

    // sending final success response
    res.status(200).json({
      message: `Welcome back ${findOrganizer.name}`,
      ID: findOrganizer.id,
      accessToken: updateTokens.accessToken,
      refreshToken: updateTokens.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};
