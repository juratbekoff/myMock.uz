import { Request, Response, NextFunction } from "express";
import { bookingService } from "../../services";
import { notFound } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { bookingId } = req.params;

    // getting booking by ID
    let booking = await bookingService.findById(+bookingId);

    // if booking is not found
    if (!booking) {
      return res.status(404).json({
        message: notFound("Booking"),
      });
    }

    // sending final success response
    res.status(200).json({
      message: `Booking with ID ${booking.id}`,
      booking,
    });
  } catch (err) {
    next(err);
  }
};
