import { Request, Response, NextFunction } from "express";
import { bookingService, resultService } from "../../services";
import { result } from "../../interfaces";
import { notFound } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data: result = req.body;
    let { bookingId } = req.params;

    // finding booking by ID
    let findBooking = await bookingService.findById(+bookingId);

    // if booking is not found
    if (!findBooking) {
      return res.status(404).json({
        message: notFound(`Booking with ID %${bookingId}`),
      });
    }

    // updating or creating booking
    let createAndUpdate = await resultService.createAndUpdate(data, +bookingId);

    // sending final success response
    res.status(200).json({
      message: `Created and Updated!`,
      data: createAndUpdate,
    });
  } catch (err) {
    next(err);
  }
};
