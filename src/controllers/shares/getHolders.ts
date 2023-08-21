import { Request, Response, NextFunction } from "express";
import { shareService } from "../../services";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shareholders = await shareService.getShareholders();

    // checking if there is no any data
    if (shareholders.length === 0) {
      return res.status(404).json({
        message: "There is no any shareholders!",
      });
    }

    // sending final success response
    res.status(200).json({
      message: `All Shareholders list!`,
      shareholders,
    });
  } catch (err) {
    next(err);
  }
};
