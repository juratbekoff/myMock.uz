import { Request, Response, NextFunction } from "express";
import { bookingService, resultStatsService } from "../../services";
import { sendResults } from "../../utils";
import { SendingStatus } from "@prisma/client";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { examId } = req.params;

    let bookingByExams = await bookingService.getByExamId(+examId);
    let unFilledCount = await resultStatsService.unFilledCount(+examId);
    let unfilledBookings = await bookingService.getByUnfilled();
    let finishedCount = await resultStatsService.finishedCount(+examId);

    if (bookingByExams.length === 0) {
      return res.status(400).json({
        message: `There is no any data to send!!!`,
      });
    } else if (unFilledCount > 0) {
      return res.status(400).json({
        message: `In order to send results, you must fill all the results to the booking!`,
        unfilledBookings,
      });
    } else if (bookingByExams.length === finishedCount) {
      return res.status(400).json({
        message:
          "You cannot send again! Because sending operation is already completed!",
      });
    }

    // start sending
    const sendingData = bookingByExams
      .filter((elem) => {
        return elem.status !== SendingStatus.FINISHED;
      })
      .map((elem) => {
        return {
          bookingId: elem.id,
          name: elem.name,
          surname: elem.surname,
          phone_number: elem.phone_number,
          listening: elem.listening!,
          reading: elem.reading!,
          writing: elem.writing!,
          speaking: elem.speaking!,
          overall_score: elem.overall_score!,
        };
      });

    res.status(200).json({
      message: `Sending results started!`,
      check_state: "/check/:examId",
    });

    await sendResults(sendingData);
  } catch (err) {
    next(err);
  }
};
