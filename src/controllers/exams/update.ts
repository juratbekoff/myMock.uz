import { Request, Response, NextFunction } from "express";
import { exam } from "../../interfaces";
import { examservice } from "../../services";
import { notFound } from "../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data: exam = req.body;
    let { examId } = req.params;

    // UPPERCASING exam type
    data.exam_type = data.exam_type.toUpperCase();

    // date format
    data.date = new Date(data.date);

    //checking exam excitability
    let exam = await examservice.findById(+examId);
    if (!exam) {
      return res.status(404).json({
        message: notFound("Exam"),
      });
    }

    // checking exam type for giving cost purposes
    switch (data.exam_type) {
      case "PREMIUM":
        if (!data.cost) {
          return res.status(400).json({
            cause: "Give the cost!",
            message: `You set the type of exam FREE, but you did not gave the cost!!!!`,
          });
        }
        break;
      case "FREE":
        if (data.cost) {
          return res.status(400).json({
            cause: "Don't give the cost!",
            message: `You set the type of exam FREE, but you gave the cost!!!!`,
          });
        }
        break;
      default:
        return res.status(400).json({
          message: `Unexpected exam type!`,
        });
    }

    // updating exam details
    let updatingExam = await examservice.updateById(+examId, data);

    // final response
    res.json({
      message: `Here is updated exam details!`,
      exam: updatingExam,
    });
  } catch (err) {
    next(err);
  }
};
