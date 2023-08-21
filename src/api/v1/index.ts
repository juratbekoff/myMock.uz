import { Router } from "express";
import {
  accessKeyChecker,
  accessPasscode,
  authChecker,
  permChecker,
} from "../../middlewares";
import { Permissions } from "../../constants";

const { ALL, ADMIN, RESULT, ROLE } = Permissions;

// v1 routes
import organizer from "./organizer";
import token from "./token";
import exam from "./exam";
import booking from "./booking";
import result from "./result";
import ceo from "./ceo";
import admin from "./admin";
import role from "./role";
import share from "./share";

export default Router()
  .use("/ceo", accessKeyChecker, accessPasscode, ceo)
  .use("/organizer", organizer)
  .use("/admin", permChecker([ADMIN]), admin)
  .use("/exam", authChecker, exam)
  .use("/token", token)
  .use("/booking", authChecker, booking)
  .use("/result", authChecker, result)
  .use("/role", authChecker, permChecker([ROLE]), role)
  .use("/share", authChecker, permChecker([ALL]), share);
