import * as Yup from "yup";

export const registerSchema = Yup.object({
  firstname: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your Firstname"),
  lastname: Yup.string().min(2).max(25).required("Please enter your Lastname"),
  email: Yup.string().email().required("Please enter your email"),
  role: Yup.string().required("Please select role"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirmpassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
