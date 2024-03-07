import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  name: yup.string().required().min(2),
  email: yup.string().email().required(),
  password: yup.string().required("Password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long"),
});

export const validationloginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required("Password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long"),
});
