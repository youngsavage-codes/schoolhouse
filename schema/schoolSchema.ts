import * as yup from "yup";

export const registerSchoolSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phoneNumber: yup.string().required("Admin phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  schoolData: yup.object({
    name: yup.string().required("School name is required"),
    streetAddress: yup.string().required("Street address is required"),
    state: yup.string().required("State is required"),
    lga: yup.string().required("City/LGA is required"),
    phoneNumber: yup.string().required("School phone number is required"), // ✅ important
  }),
});