import { Request, Response, NextFunction } from "express";
import { booking } from "../../interfaces";
import { bookingService, examservice, tokenService } from "../../services";
import { created, notFound, tokenFormatter } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data: booking = req.body;

    console.log(data);

    let token = tokenFormatter(req.header("authorization")!);

    // check exam availablity
    let hasExam = await examservice.findById(+data.examId);
    if (!hasExam) {
      return res.status(404).json({
        message: notFound(`Exam with ID ${data.examId}`),
      });
    }

    // organizer
    let organizer = await tokenService.findByAccessToken(token!);

    // creating booking
    let create = await bookingService.create(data, organizer?.organizerId!);

    // sending final success response
    res.status(201).json({
      message: created("Booking"),
      booking: create,
    });
  } catch (err) {
    next(err);
  }
};
