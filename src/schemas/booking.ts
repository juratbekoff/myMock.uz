import { checkSchema } from "express-validator";

const bookingSchema = checkSchema({
  examId: {
    notEmpty: true,
    isInt: {
      errorMessage: "examId should be integer!",
    },
    errorMessage: "organizerId is required field",
  },
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
  surname: {
    isString: {
      errorMessage: "surname should be string!",
    },
    isLength: {
      options: {
        min: 3,
        max: 30,
      },
      errorMessage: "Check the length, min 3, max 15",
    },
    errorMessage: "surname is required field",
  },
  phone_number: {
    notEmpty: true,
    errorMessage: "phone_number is required field!",
    isLength: {
      options: {
        min: 9,
        max: 13,
      },
      errorMessage: "Check the length, min 3, max 15",
    },
    isNumeric: {
      errorMessage:
        "phone_number -- even if it is string, it cannot include absolute non-numeric characters",
    },
    isString: {
      errorMessage: "phone_number should be string",
    },
  },
});

export { bookingSchema };
