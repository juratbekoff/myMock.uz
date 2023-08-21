import { checkSchema } from "express-validator";

const examSchema = checkSchema({
  name: {
    notEmpty: true,
    isString: {
      errorMessage: "name should be string!",
    },
    isLength: {
      options: {
        min: 3,
        max: 30,
      },
      errorMessage: "Check the length, min 3, max 15",
    },
    errorMessage: "name is required field",
  },
  // cost: {
  //   notEmpty: false,
  //   isNumeric: {
  //     errorMessage: "cost should be string!",
  //   },
  //   isLength: {
  //     options: {
  //       min: 3,
  //       max: 12,
  //     },
  //     errorMessage: "Check the length, min 3, max 15",
  //   },
  //   errorMessage: "cost is required field",
  // },
  exam_type: {
    notEmpty: true,
    isUppercase: {
      errorMessage: "exam_type's value shoulde be in an UPPERCASE style!",
    },
    errorMessage: "exam_type is required field!",
    isLength: {
      options: {
        min: 3,
        max: 15,
      },
      errorMessage: "Check the length, min 3, max 15",
    },
    isString: {
      errorMessage: "exam_type should be a string",
    },
  },
});

export { examSchema };
