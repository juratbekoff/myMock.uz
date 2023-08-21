import { Request, Response, NextFunction } from "express";
import { roleService } from "../../../services";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // to find a role with the name CEO
    let findRole = await roleService.findByName("CEO");

    // if role exists
    if (findRole) {
      return res.status(400).json({
        message: "You cannot create CEO, because it is already exicted!",
      });
    }

    // creating role as a CEO
    let createRole = await roleService.createAsCeo();

    // sending final success response
    res.status(200).json({
      message: "Role As a CEo is created!",
      roleId: createRole.id,
    });
  } catch (err) {
    next(err);
  }
};
