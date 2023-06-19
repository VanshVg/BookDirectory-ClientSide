import * as Yup from "yup";

export const passwordSchema = Yup.object({
  newpassword: Yup.string().min(6).required("Password is required"),
  confirmpassword: Yup.string()
    .required()
    .oneOf([Yup.ref("newpassword"), null], "Password must match"),
});
