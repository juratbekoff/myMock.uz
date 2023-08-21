import { Request, Response, NextFunction } from "express";
import { adminService } from "../../../services";
import { wrongPassword } from "../../../utils";
import { compare } from "bcrypt";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { username, password } = req.body;
    let findAdmin = await adminService.findByUsername(username);

    //checking by ocnditionals
    if (!findAdmin) {
      return res.status(401).json({
        message: wrongPassword(),
      });
    }

    // checking admin's existability
    let isMatch = await compare(password, findAdmin.password);
    if (!isMatch) {
      return res.status(401).json({
        message: wrongPassword(),
      });
    }

    // sending final success response
    res.status(200).json({
      message: `Welcome back ${findAdmin.name}`,
      ID: findAdmin.id,
      accessToken: findAdmin.Token.accessToken,
      refreshToken: findAdmin.Token.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};
