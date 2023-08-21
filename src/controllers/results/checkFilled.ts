import { Request, Response, NextFunction } from "express";
import { bookingService } from "../../services";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { examId } = req.params;

    let findBooking = await bookingService.getByExamId(+examId);

    if (findBooking.length === 0) {
      return res.status(200).json({
        allAreTrue: false,
      });
    }

    let allAreTrue = findBooking.every((elem) => elem.isFilled);

    res.status(200).json({
      allAreTrue,
    });
  } catch (err) {
    next(err);
  }
};
