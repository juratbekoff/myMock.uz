import { Request, Response, NextFunction } from "express";
import { notFound, tokenFormatter } from "../utils";
import { adminService, tokenService } from "../services";

export default (permissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = tokenFormatter(req.header("authorization")!);

      let adminInfoByToken = await tokenService.findByAccessToken(token);
      if (!adminInfoByToken) {
        return res.status(404).json({
          message: notFound("Admin Info with this token"),
        });
      } else if (adminInfoByToken.userRole !== "ADMIN") {
        return res.status(403).json({ message: "Insufficient permissions." });
      }

      // get admin permissions
      let findAdmin = await adminService.findById(adminInfoByToken.adminId!);
      if (!findAdmin) {
        return res.status(404).json({
          message: notFound("Admin with this token"),
        });
      }
      // admin permissions
      let adminPerms = findAdmin.Role.permissions;

      const isCeo = adminPerms.includes("ALL");

      if (isCeo) {
        return next();
      }

      const hasAllPermissions = permissions.every((permission) =>
        adminPerms.includes(permission)
      );

      // if has not permissions
      if (!hasAllPermissions) {
        return res.status(403).json({ message: "Insufficient permissions." });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
