import { Request, Response, NextFunction } from "express";
import basicAuth from "basic-auth";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessPasscode = basicAuth(req);
    const { name, pass } = accessPasscode!;

    if (!accessPasscode || !name || !pass) {
      return res.status(401).json({
        message: "Basic Auth is not provided!",
      });
    }

    let accessName = process.env.BASIC_AUTH_NAME!;
    let accessPassword = process.env.BASIC_AUTH_PASS!;

    if (name !== accessName || pass !== accessPassword) {
      return res.status(401).json({
        message:
          "Basic Auth credentials are incorrect! Access Denied! You don't have permission!",
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
