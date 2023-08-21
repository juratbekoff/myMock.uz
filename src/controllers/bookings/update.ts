import { Request, Response, NextFunction } from "express";
import { booking } from "../../interfaces";
import { bookingService } from "../../services";
import { notFound } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { bookingId } = req.params;
    let data: booking = req.body;

    let findBooking = await bookingService.findById(+bookingId);
    if (!findBooking) {
      return res.status(404).json({
        message: notFound("Booking with ID"),
      });
    }

    let { listening, reading, writing, speaking, overall_score } = data;

    if (listening && reading && writing && speaking && overall_score) {
      await bookingService.changeToFilled(+bookingId);
    }

    if (!listening || !reading || !writing || !speaking || !overall_score) {
      await bookingService.changeToUnFilled(+bookingId);
    }

    let update = await bookingService.update(+bookingId, data);

    res.status(200).json({
      message: "Successfully updated!",
      data: update,
    });
  } catch (err) {
    next(err);
  }
};
