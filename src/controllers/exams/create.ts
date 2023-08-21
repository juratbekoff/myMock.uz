import { Request, Response, NextFunction } from "express";
import { exam } from "../../interfaces";
import { created, notFound, tokenFormatter } from "../../utils";
import { examservice, tokenService } from "../../services";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data: exam = req.body;
    let token = tokenFormatter(req.header("authorization")!);

    // UPPERCASING exam type
    data.exam_type = data.exam_type.toUpperCase();

    // 07/27/2023
    data.date = new Date(data.date);

    // checking organizer's excitability
    let organizer = await tokenService.findByAccessToken(token);
    if (!organizer) {
      return res.status(404).json({
        message: notFound("Organizer"),
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

    // creating exam
    let createExam = await examservice.create(data, organizer.organizerId!);

    // final response
    res.json({
      message: created("Exam"),
      exam: createExam,
    });
  } catch (err) {
    next(err);
  }
};
