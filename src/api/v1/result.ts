import { Router } from "express";
import {
  checkFilled,
  checkStatus,
  createAndUpdate,
  sendingResults,
} from "../../controllers/results";
import { addResultSchema } from "../../schemas";
import { validate } from "../../middlewares";

export default Router()
  .post(
    "/createAndUpdate/:bookingId",
    validate(addResultSchema),
    createAndUpdate
  )
  .post("/send/:examId", sendingResults)
  .get("/areFilled/:examId", checkFilled)
  .get("/check/:examId", checkStatus);
