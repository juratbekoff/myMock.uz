import { Request, Response, NextFunction } from "express";
import { bookingService } from "../../services";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // getting all bookings
    let bookings = await bookingService.getAll();

    // if any booking is not found
    if (bookings.length === 0)
      return res.status(404).json({
        message: `You don't have any bookings!`,
      });

    // sending final success response
    res.status(200).json({
      message: `All the bookings`,
      bookings,
    });
  } catch (err) {
    next(err);
  }
};
