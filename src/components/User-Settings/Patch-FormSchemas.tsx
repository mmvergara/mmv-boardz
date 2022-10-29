import * as yup from "yup";

export const passwordPatchSchema = yup.object({
  username: yup
    .string()
    .min(4, "Minimum of 4 characters")
    .max(20, "Maximum of 20 characters")
    .trim()
    .required("Username field is required."),
  PUpassword: yup
    .string()
    .min(8, "Minimum of 8 characters for password")
    .max(30, "Maximum of 30 characters")
    .trim()
    .required("Current Password field is required."),
  PUnewPassword: yup
    .string()
    .min(8, "Minimum of 8 characters for password")
    .max(30, "Maximum of 30 characters")
    .trim()
    .required("New password field is required."),
});

export const usernamePatchSchema = yup.object({
  username: yup
    .string()
    .min(4, "Minimum of 4 characters")
    .max(20, "Maximum of 20 characters")
    .trim()
    .required("Username field is required."),
  UUnewUsername: yup
    .string()
    .notOneOf([yup.ref("username")], "New username must not match the your current username.")
    .min(4, "Minimum of 4 characters")
    .max(20, "Maximum of 20 characters")
    .trim()
    .required("New Username field is required."),
  UUpassword: yup
    .string()
    .min(8, "Minimum of 8 characters for password")
    .max(30, "Maximum of 30 characters")
    .trim()
    .required("Current Password field is required."),
});

export const emailPatchSchema = yup.object({
  UEnewEmail: yup.string().email("Enter a valid email").required("Email is required."),
  UEpassword: yup
    .string()
    .min(8, "Minimum of 8 characters")
    .max(30, "Maximum of 30 characters")
    .trim()
    .required("Current Password field is required."),
});
