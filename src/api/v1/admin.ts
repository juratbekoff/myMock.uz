import { Router } from "express";
import { login, register } from "../../controllers/auth/";

export default Router()
  .post("/register", register)
  .post("/login", login);
