import { Request, Response, NextFunction } from "express";
import { tokenFormatter } from "../../utils";
import { tokenService, examservice } from "../../services";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = tokenFormatter(req.header("authorization")!);

    // finding author by token
    let author = await tokenService.findByAccessToken(token);

    // getting author's exams
    let exams = await examservice.getByAuthor(author?.organizerId!);

    // final response
    res.json({
      message: "Here is author's all exams!",
      exams,
    });
  } catch (err) {
    next(err);
  }
};
