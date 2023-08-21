import { Router } from "express";
import { refreshToken } from "../../controllers/auth";
import { isTokenExpired } from "../../middlewares";

export default Router()
  .post("/refresh", refreshToken)
  .get("/check", isTokenExpired);
