import { Request, Response, NextFunction } from "express";
import { client } from "../imports";

export const testData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    for (let index = 0; index <= 10; index++) {
      let Id = await client.booking.create({
        data: {
          examId: 34,
          organizerId: 1,
          name: "Juratali",
          surname: "Xudayberganov",
          phone_number: "98932984818",
          writing: "5",
          listening: "8",
          reading: "9",
          speaking: "5",
          overall_score: "7",
          isFilled: true,
        },
      });

      console.log(`ID: ${Id.id}`);
    }

    // await client.booking.deleteMany();

    res.json("Yaratildi!");
  } catch (err) {
    next(err);
  }
};
