import { Router } from "express";
import { createCeo, createRole } from "../../controllers/auth";

export default Router()
  .post("/", createCeo)
  .post("/role", createRole);
