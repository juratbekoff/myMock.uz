import { Request, Response, NextFunction } from "express";
import { examservice } from "../../services";
import { notFound } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { examId } = req.params;

    // getting exam details by it's ID
    let getExamById = await examservice.findById(+examId);
    if (!getExamById) {
      return res.status(404).json({
        message: notFound("Exam"),
      });
    }

    // final response
    res.json({
      message: `Here is the exam by it's ID!`,
      exam: getExamById,
    });
  } catch (err) {
    next(err);
  }
};
