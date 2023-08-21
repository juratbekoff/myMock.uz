import { Request, Response, NextFunction } from "express";
import { examservice } from "../../services";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // getting all exam
    let getAll = await examservice.getExams();
    // final response
    res.json({
      message: "Here is all exams!",
      exams: getAll,
    });
  } catch (err) {
    next(err);
  }
};
