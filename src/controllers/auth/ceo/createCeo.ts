import { Request, Response, NextFunction } from "express";
import {
  adminService,
  roleService,
  shareService,
  tokenService,
} from "../../../services";
import { admin } from "../../../interfaces";
import { hash } from "bcrypt";
import { created, exicted, generateTokens, notFound } from "../../../utils";
import { MainRoles } from "@prisma/client";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data: admin = req.body;

    // checking existability
    let findAdmin = await adminService.findByUsername(data.username);
    if (findAdmin) {
      return res.status(400).json({
        message: exicted("Admin with this username"),
      });
    }

    // checking role existability
    let findRole = await roleService.findById(data.roleId);
    if (!findRole) {
      return res.status(400).json({
        message: notFound(`role with ID ${data.roleId}`),
      });
    }

    // hashing password
    data.password = await hash(data.password, 10);

    // generating access and refresh token
    let token = await generateTokens(MainRoles.ADMIN);

    // creating CEO
    let createCeo = await adminService.create(data, token.id);

    // update by adminId on token column
    await tokenService.updateByToken(token.accessToken!, {
      adminId: createCeo.id,
    });

    // give share to an CEO Admin
    await shareService.create(createCeo.id, 80);

    // sending final success response
    res.status(200).json({
      message: created("CEO"),
      ceoId: createCeo.id,
    });
  } catch (err) {
    next(err);
  }
};
