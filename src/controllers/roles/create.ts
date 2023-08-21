import { Request, Response, NextFunction } from "express";
import { roleService, tokenService } from "../../services";
import { role } from "../../interfaces";
import { exicted, isAllUppercase, notFound, tokenFormatter } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data: role = req.body;
    let token = tokenFormatter(req.header("authorization")!);

    // check permissions value
    let isCorrectStyle = isAllUppercase(data.permissions);
    if (!isCorrectStyle) {
      return res.status(422).json({
        message: `There are error while sending permission in array!`,
      });
    }

    // find admin by token
    let admin = await tokenService.findByAccessToken(token);
    if (!admin || admin.adminId === null) {
      return res.status(404).json({
        message: notFound("Admin with this token!"),
      });
    }

    // to find a role with the name CEO
    let findRole = await roleService.findByName(data.name);

    // if role exists
    if (findRole) {
      return res.status(400).json({
        message: exicted("Role with name"),
      });
    }

    // creating role as a CEO
    let createRole = await roleService.create(data, admin.adminId);

    // sending final success response
    res.status(200).json({
      message: "Role is created!",
      data: createRole,
    });
  } catch (err) {
    next(err);
  }
};
