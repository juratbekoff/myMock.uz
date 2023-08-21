import { Router } from "express";
import { create, getShareholders } from "../../controllers/shares";

export default Router()
  .post("/", create)
  .get("/", getShareholders);
