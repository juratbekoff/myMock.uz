import { Request, Response, NextFunction } from "express";
import { notFound, tokenFormatter, unAuth } from "../../utils";
import { organizerService } from "../../services";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = tokenFormatter(req.header("authorization")!);

    // checking token accessibility
    if (!token) return res.status(401).json({ message: unAuth() });

    // get info by token
    let getInfo = await organizerService.getInfoByToken(token);

    // if organzier not found
    if (!getInfo)
      return res
        .status(404)
        .json({ message: notFound("Organizer with this token") });

    // send final sucess response
    res.status(200).json({
      message: "Here we go!",
      data: getInfo,
    });
  } catch (err) {
    next(err);
  }
};
