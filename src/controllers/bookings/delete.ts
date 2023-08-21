import { Request, Response, NextFunction } from "express";
import { bookingService } from "../../services";
import { deleted, notFound } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { bookingId } = req.params;

    // find booking by ID
    let booking = await bookingService.delete(+bookingId);

    // if booking is not found
    if (!booking) {
      return res.status(404).json({
        message: notFound("Booking"),
      });
    }

    // sending final success response
    res.status(200).json({
      message: deleted(`Booking with ID ${booking.id}`),
    });
  } catch (err) {
    next(err);
  }
};
