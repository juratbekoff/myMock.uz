import { Router } from "express";
import { organizerLogin, organizerRegister } from "../../controllers/auth";
import {
  getById,
  updateInfo,
  updatePassword,
  getByToken,
} from "../../controllers/organizer";
import { authChecker, validate } from "../../middlewares";
import { organizerSchema } from "../../schemas";

export default Router()
  .post("/register", validate(organizerSchema), organizerRegister)
  .post("/login", organizerLogin)
  .put("/update-info", authChecker, updateInfo)
  .put("/update-password", authChecker, updatePassword)
  .get("/getme", authChecker, getByToken)
  .get("/:id", getById);
