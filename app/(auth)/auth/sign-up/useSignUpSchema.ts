import { SEX_TYPE } from "@/app/types/user";
import * as yup from "yup";

const useSignUpSchema = () => {
  const schema = yup.object().shape({
    email: yup.string().required("This field is required").email(),
    password: yup
      .string()
      .required("This field is required")
      .min(6, "Must be at least 6 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Must contain at least 1 number and 1 alphabetical character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Password mismatch")
      .required("This field is required"),
    name: yup.string().required("This field is required"),
    address: yup.string().required("This field is required"),
    sex: yup.mixed<SEX_TYPE>().required("This field is required"),
    birthday: yup
      .date()
      .required("This field is required")
      .typeError("Invalid date!")
      .max(new Date(), "Must less than current date"),
  });

  return schema;
};

export default useSignUpSchema;
