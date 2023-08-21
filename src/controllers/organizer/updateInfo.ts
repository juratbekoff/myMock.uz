import { Request, Response, NextFunction } from "express";
import { organizerService, tokenService } from "../../services";
import { organizer } from "../../interfaces";
import { notFound, tokenFormatter } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data: organizer = req.body;
    let token = tokenFormatter(req.header("authorization")!);

    // finding organizer by token
    let organizer = await tokenService.findByAccessToken(token);

    // if organizer is not found!
    if (!organizer) {
      return res.status(404).json({
        message: notFound("Organizer with this token"),
      });
    }

    // checking by phone existability
    let organizer_phone = await organizerService.findByPhone(data.phone_number);
    if (organizer_phone) {
      if (organizer_phone.id !== organizer.organizerId) {
        return res.status(400).json({
          exist: "Phone Number",
          message: `phone number is already existed!`,
        });
      }
    }

    // checking by email existability
    let organizer_email = await organizerService.findByEmail(data.email);
    if (organizer_email) {
      if (organizer_email.id !== organizer.organizerId) {
        return res.status(400).json({
          exist: "Email",
          message: `email is already existed!`,
        });
      }
    }

    // updating organizer by ID
    let updateInfo = await organizerService.updateInfo(
      organizer.organizerId!,
      data
    );

    // sending final success response
    res.status(200).json({
      message: "User info successfully updated!",
      data: updateInfo,
    });
  } catch (err) {
    next(err);
  }
};
