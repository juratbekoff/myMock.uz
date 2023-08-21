import { Router } from "express";
import { create } from "../../controllers/roles";

export default Router()
  .post("/", create);
