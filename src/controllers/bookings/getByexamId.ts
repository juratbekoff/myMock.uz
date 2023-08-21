import { Request, Response, NextFunction } from "express";
import { bookingService } from "../../services";
import { notFound } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { examId } = req.params;

    // find exam by examId
    let findExam = await bookingService.getByExamId(+examId);

    // if exam is not found
    if (findExam.length === 0) {
      return res.status(404).json({
        message: notFound(`Booking wit examId ${examId}`),
      });
    }

    // sending final success response
    res.status(200).json({
      message: `Here is all bookings with ID ${examId}`,
      bookings: findExam,
    });
  } catch (err) {
    next(err);
  }
};
