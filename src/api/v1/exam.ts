import { Router } from "express";
import {
  create,
  getAll,
  getByAuthor,
  getById,
  updateById,
  deleteById,
} from "../../controllers/exams";
import { examSchema } from "../../schemas";
import { authChecker, permChecker, validate } from "../../middlewares";
import { Permissions } from "../../constants";

const { EXAM } = Permissions;

export default Router()
  .post("/create", validate(examSchema), create)
  .get("/getAll", authChecker, permChecker([EXAM]), getAll)
  .get("/getByAuthor", authChecker, getByAuthor)
  .get("/:examId", getById)
  .put("/:examId", updateById)
  .delete("/:examId", deleteById);
