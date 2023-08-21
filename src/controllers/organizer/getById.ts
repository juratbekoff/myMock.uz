import { Request, Response, NextFunction } from "express";
import { organizerService } from "../../services";
import { notFound } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { id } = req.params;

    let organizer = await organizerService.getOrgInfo(+id);

    if (!organizer) {
      return res.status(404).json({
        message: notFound("Organizer"),
      });
    }

    res.status(200).json({
      message: `Info of the organizer ${organizer.name}`,
      data: organizer,
    });
  } catch (err) {
    next(err);
  }
};
