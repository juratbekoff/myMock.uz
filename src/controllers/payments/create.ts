import { Request, Response, NextFunction } from "express";
import { payment } from "../../interfaces";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data: payment = req.body;
  } catch (err) {
    next(err);
  }
};
