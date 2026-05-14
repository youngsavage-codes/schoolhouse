import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  middleName: yup.string().optional(),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  password: yup.string().min(6).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required(),

  // 👇 optional by default (we'll enforce conditionally)
  photo: yup.string().when('$accountType', {
    is: 'teacher',
    then: (schema) => schema.required('Profile image is required'),
  }),
  
  staffIdDocument: yup.string().when('$accountType', {
    is: 'teacher',
    then: (schema) => schema.required('Staff ID is required'),
  }),
});