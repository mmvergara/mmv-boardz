import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required."),
  password: yup
    .string()
    .min(8, "Minimum of 8 characters")
    .max(30, "Maximum of 30 characters")
    .trim()
    .required("Password field is required."),
});

export const registerValidationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required."),
  username: yup
    .string()
    .min(4, "Minimum of 4 characters")
    .max(20, "Maximum of 20 characters")
    .trim()
    .required("Username field is required."),
  password: yup
    .string()
    .notOneOf([yup.ref("username")], "Password must not match the username.")
    .min(8, "Minimum of 8 characters for password")
    .max(30, "Maximum of 30 characters")
    .trim()
    .required("Password field is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match.")
    .notOneOf([yup.ref("username")], "Password must not match the username.")
    .min(8, "Minimum of 8 characters for password")
    .max(30, "Maximum of 30 characters")
    .trim()
    .required("Confirm Password field is required."),
});

export const createBoardValidationSchema = yup.object({
  boardTitle: yup
    .string()
    .min(8, "Minimum of 8 characters")
    .max(150, "Maximum of 150 characters")
    .trim()
    .required("Board Content field is required."),
  boardContent: yup
    .string()
    .min(8, "Minimum of 8 characters")
    .max(4000, "Maximum of 4000 characters")
    .trim()
    .required("Board Content field is required."),
});

export const commentValidationSchema = yup.object({
  commentContent: yup
    .string()
    .min(4, "Minimum of 4 characters")
    .max(250, "Maximum of 250 characters")
    .trim(),
});


