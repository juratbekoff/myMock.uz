import { Request, Response, NextFunction } from "express";
import { organizerService, tokenService } from "../../../services";
import { orgTrial, organizer } from "../../../interfaces";
import {
  addPeriod,
  created,
  exicted,
  generateTokens,
  getDaysInMonth,
} from "../../../utils";
import { MainRoles } from "@prisma/client";
import { hash } from "bcrypt";
import { validationResult } from "express-validator";

// register
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data: organizer = req.body;
    let orgTrial: orgTrial = req.body;

    // uppercasing account type
    orgTrial.account_type = orgTrial.account_type.toUpperCase();

    // search organizer come by request by db
    let checkByEmail = await organizerService.findByEmail(data.email);
    let checkByPhone = await organizerService.findByPhone(data.phone_number);

    // checking with conditionals
    if (checkByPhone) {
      return res.status(400).json({
        message: exicted(data.phone_number),
      });
    } else if (checkByEmail) {
      return res.status(400).json({
        message: exicted(data.email),
      });
    }

    // hasing organizer's password
    data.password = await hash(data.password!, 10);

    // generating access and refresh token
    let token = await generateTokens(MainRoles.ORGANIZER);

    // making an object in order to calculate trial period
    let trialPeriod = {
      account_type: orgTrial.account_type,
      trial_period: orgTrial.trial_period,
      started_date: new Date(),
      end_date: new Date(),
      is_active: orgTrial.is_active,
    };

    // checking by given account type
    if (orgTrial.account_type === "REAL") {
      let days = getDaysInMonth();
      let { started_date, end_date } = addPeriod(days);

      // filling trialPeriod object with real expiration dates
      trialPeriod.started_date = started_date;
      trialPeriod.end_date = end_date;
      trialPeriod.trial_period = days;
    } else if (orgTrial.account_type === "DEMO") {
      let { started_date, end_date } = addPeriod(orgTrial.trial_period);

      // filling trialPeriod object with real expiration dates
      trialPeriod.started_date = started_date;
      trialPeriod.end_date = end_date;
    } else {
      return res.status(400).json({
        message: "Account type is given incorrect style",
      });
    }

    let left_days =
      (trialPeriod.end_date?.getTime()! -
        trialPeriod.started_date?.getTime()!) /
      (1000 * 60 * 60 * 24);

    // creating organizer
    let createorganizer = await organizerService.register(
      data,
      trialPeriod,
      token.id,
      left_days
    );

    // update by organizerId on token column
    await tokenService.updateByToken(token.accessToken!, {
      organizerId: createorganizer.id,
    });

    // sending final success response
    res.status(201).json({
      message: created("organizer"),
      organizerId: createorganizer.id,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};
