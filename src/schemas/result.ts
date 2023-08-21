import { checkSchema } from "express-validator";

const addResultSchema = checkSchema({
  reading: {
    notEmpty: true,
    isInt: {
      errorMessage: "reading should be integer!",
    },
    errorMessage: "reading is required field",
  },
  listening: {
    notEmpty: true,
    isInt: {
      errorMessage: "listening should be integer!",
    },
    errorMessage: "listening is required field",
  },
  writing: {
    notEmpty: true,
    isInt: {
      errorMessage: "writing should be integer!",
    },
    errorMessage: "writing is required field",
  },
  speaking: {
    notEmpty: true,
    isInt: {
      errorMessage: "speaking should be integer!",
    },
    errorMessage: "speaking is required field",
  },
});

export { addResultSchema };
