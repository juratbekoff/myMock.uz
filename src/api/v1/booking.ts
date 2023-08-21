import { Router } from "express";
import {
  create,
  getAll,
  findById,
  getByOrg,
  getByExamId,
  update,
  deleteById,
} from "../../controllers/bookings";
import { bookingSchema } from "../../schemas";
import { validate } from "../../middlewares";

export default Router()
  .post("/create", validate(bookingSchema), create)
  .get("/getAll", getAll)
  .get("/organizer", getByOrg)
  .put("/:bookingId", update)
  .get("/:examId", getByExamId)
  .get("/one/:bookingId", findById)
  .delete("/:bookingId", deleteById);
