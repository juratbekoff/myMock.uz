import { Request, Response, NextFunction } from "express";
import { examservice } from "../../services";
import { deleted, notFound, tokenFormatter } from "../../utils";
import { tokenService } from "../../services";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { examId } = req.params;
    let token = tokenFormatter(req.header("authorization")!);

    // finding necessary details
    let organizer = await tokenService.findByAccessToken(token);
    let author = await examservice.findById(+examId);
    let exam = await examservice.findById(+examId);

    // checking by conditionals
    if (!exam) {
      return res.status(404).json({
        message: notFound("Exam"),
      });
    } else if (!author) {
      return res.status(404).json({
        message: notFound("Exam"),
      });
    } else if (
      !(
        organizer?.organizerId === author.organizerId &&
        (organizer.userRole === "ADMIN" || organizer.userRole === "ORGANIZER")
      )
    ) {
      return res.status(400).json({
        message: `You don't have permission to delete this exam!`,
      });
    }

    // deleting exam
    let deletingExam = await examservice.deleteOne(+examId);

    // final response
    res.json({
      message: deleted("Exam"),
      examId: deletingExam.id,
    });
  } catch (err) {
    next(err);
  }
};
