import { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
config();

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    // to get accessKey from requqest
    let accessKey = req.header("X-Access-Key");

    if (!accessKey) {
      return res.status(400).json({
        message: "Access Key is not provided!",
      });
    }

    // checking if they are match
    if (accessKey !== process.env.PROTECT_ACCESS_KEY) {
      return res.status(401).json({
        message:
          "Access Key credential is incorrect! Access Denied! You don't have permission!",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
