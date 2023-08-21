import { checkSchema } from "express-validator";

const organizerSchema = checkSchema({
  name: {
    notEmpty: true,
    errorMessage: "name is required field!",
    isLength: {
      options: {
        min: 3,
        max: 15,
      },
      errorMessage: "Check the length, min 3, max 15",
    },
    isString: {
      errorMessage: "name should be string",
    },
  },
  surname: {
    notEmpty: true,
    errorMessage: "surname is required field!",
    isLength: {
      options: {
        min: 3,
        max: 15,
      },
      errorMessage: "Check the length, min 3, max 15",
    },
    isString: {
      errorMessage: "surname should be string",
    },
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
        "Even if it is string, it cannot include absolute non-numeric characters",
    },
    isString: {
      errorMessage: "phone_number should be string",
    },
  },
  email: {
    notEmpty: true,
    isEmail: {
      errorMessage: "it should be an Email!",
    },
    isLength: {
      options: {
        min: 3,
        max: 30,
      },
      errorMessage: "Check the length, min 3, max 15",
    },
    errorMessage: "email is required field",
    isString: {
      errorMessage: "email should be string",
    },
  },
  password: {
    notEmpty: true,
    isStrongPassword: {
      errorMessage: "password should be more stonger!",
    },
    isLength: {
      options: {
        min: 3,
        max: 30,
      },
      errorMessage: "Check the length, min 3, max 15",
    },
    errorMessage: "password is required field",
  },
  account_type: {
    notEmpty: true,
    isUppercase: {
      errorMessage: "account_type's value should be in an UPPERCASE style!",
    },
    isLength: {
      options: {
        min: 3,
        max: 15,
      },
    },
    errorMessage: "account_type is required field",
    isString: {
      errorMessage: "account_type should be string",
    },
  },
  is_active: {
    notEmpty: true,
    isBoolean: {
      errorMessage: "is_active's value should be booolen!",
    },
    errorMessage: "is_active is required field",
  },
});

export { organizerSchema };
