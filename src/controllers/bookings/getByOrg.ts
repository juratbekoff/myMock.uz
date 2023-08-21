import { Request, Response, NextFunction } from "express";
import { bookingService, organizerService, tokenService } from "../../services";
import { notFound, tokenFormatter } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = tokenFormatter(req.header("authorization")!);

    // find organizer
    let organizer = await tokenService.findByAccessToken(token);
    if (!organizer) {
      return res.status(404).json({
        message: notFound("Organizer with token"),
      });
    }

    // getting bookings by organizerID
    let bookingsByOrg = await bookingService.findByOrganizerId(
      organizer.organizerId!
    );

    // if booking is not found
    if (!bookingsByOrg) {
      return res.status(404).json({
        message: notFound("Bookings with this organizer"),
      });
    }

    // sending final success response
    res.status(200).json({
      message: `Bookings with organizerID ${organizer.organizerId}`,
      orgId: organizer.organizerId,
      bookings: bookingsByOrg,
    });
  } catch (err) {
    next(err);
  }
};
