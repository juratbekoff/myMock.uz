import { Request, Response, NextFunction } from "express";
import { adminService, tokenService } from "../../../services";
import { admin } from "../../../interfaces";
import {
  created,
  exicted,
  generateTokens,
  notFound,
  tokenFormatter,
} from "../../../utils";
import { hash } from "bcrypt";
import { MainRoles } from "@prisma/client";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data: admin = req.body;
    let token = tokenFormatter(req.header("authorization")!);

    // to find an creator admin to create new one
    let creator = await tokenService.findByAccessToken(token!);
    if (!creator) {
      return res.status(404).json({
        message: notFound("Admin with this token"),
      });
    }

    // check data.username if it is existed?
    let admin = await adminService.findByUsername(data.username);
    if (admin) {
      return res.status(400).json({
        message: exicted("Username"),
      });
    }

    // hasing admin's password
    data.password = await hash(data.password!, 10);

    // generating access and refresh token to that admin
    let generateToken = await generateTokens(MainRoles.ADMIN);

    // creating new admin
    let newAdmin = await adminService.create(
      data,
      generateToken.id,
      creator.adminId!
    );

    // update by adminId on token column
    await tokenService.updateByToken(generateToken.accessToken!, {
      adminId: newAdmin.id,
    });

    // sending final success response
    res.status(201).json({
      message: created("admin"),
      adminId: newAdmin.id,
      accessToken: generateToken.accessToken,
      refreshToken: generateToken.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};
