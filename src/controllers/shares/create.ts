import { Request, Response, NextFunction } from "express";
import { adminService, shareService } from "../../services";
import { notFound } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { adminId, shareAmount } = req.body;

    // Check if admin exists
    const findAdmin = await adminService.findById(+adminId);
    if (!findAdmin) {
      return res.status(404).json({
        message: notFound(`Admin with ID ${adminId}`),
      });
    } else if (findAdmin.ownShares! > 0) {
      return res.status(400).json({
        message:
          "This admin has already shares! That is why you cannot add shares to him/her!",
        suggestion:
          "If needs to increase or descrease, plz use another api to update!",
      });
    }

    // Get total available shares
    const leftShares = await shareService.getAvailableShares();

    // Check if the given amount exceeds the available shares
    if (shareAmount > leftShares) {
      return res.status(400).json({
        message: "You cannot give more share than left!",
        suggestion:
          "If that admin has a share and needs to increas or descrease, plz use another api to update!",
        leftShares: leftShares,
      });
    }

    // Give shares to the admin
    const givingShare = await shareService.create(adminId, shareAmount);

    // Send success response
    res.status(200).json({
      message: "Shares have been allocated to the admin successfully!",
      ownedShares: givingShare.ownShares,
    });
  } catch (err) {
    next(err);
  }
};
