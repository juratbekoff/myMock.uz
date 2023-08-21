import { Request, Response, NextFunction } from "express";
import { resultService } from "../../services";
import { notFound } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { examId } = req.params;

    let bookings = await resultService.getCounts(+examId);

    if (!bookings) {
      return res.status(404).json({
        message: notFound(`booking with examID ${examId}`),
      });
    }

    let areAllSent = (await resultService.areAllSent(+examId)).every(
      (elem) => elem.isSent === true
    );

    let a = await resultService.areAllSent(+examId);

    console.log(a);

    res.status(200).json({
      message: "here we go!",
      areAllSent,
      status: bookings,
    });
  } catch (err) {
    next(err);
  }
};
