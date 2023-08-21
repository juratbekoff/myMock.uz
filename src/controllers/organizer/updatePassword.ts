import { Request, Response, NextFunction } from "express";
import { organizerService, tokenService } from "../../services";
import { notFound, tokenFormatter } from "../../utils";
import { compare, hash, genSalt } from "bcrypt";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = tokenFormatter(req.header("authorization")!);
    let { old_password, new_password } = req.body;

    // find organizer by token
    let organizer = await tokenService.findByAccessToken(token);

    // if organizer is not found!
    if (!organizer) {
      return res.status(404).json({
        message: notFound("Ogranizer with this token"),
      });
    }

    // find old passwords of organizer
    let findOldPassword = await organizerService.findPassword(
      organizer.organizerId!
    );

    // check if they match
    let isPasswordsMatch = await compare(
      old_password,
      findOldPassword?.password!
    );

    // if they don't match
    if (!isPasswordsMatch) {
      return res.status(404).json({
        message: "Old password is incorrect!",
      });
    }

    // generate salt and create new hashed password
    let salt = await genSalt(10);
    let createPassword = await hash(new_password, salt);

    // updating organizer's password
    await organizerService.updatePassword(
      organizer.organizerId!,
      createPassword
    );

    // sending final success response
    res.status(200).json({
      message: "Password is successfully updated!",
    });
  } catch (err) {
    next(err);
  }
};
