import * as Yup from "yup";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/gi;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;


const email = Yup.string()
    .required("Email Address is required")
    .email("Email Address is invalid")
    .matches(emailRegex, "Email Address is invalid"),
    recoveryEmail = Yup.string()
    .required("Email Address is required")
    .email("Email Address is invalid")
    .matches(emailRegex, "Email Address is invalid"),
    password = Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")

export const userLogin = Yup.object().shape({
    email,
    password
  });

  export const userForgotPassword = Yup.object().shape({
    recoveryEmail,
  });