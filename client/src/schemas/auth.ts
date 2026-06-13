import * as Yup from 'yup';

export const loginUserSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const signUpUserSchema = Yup.object().shape({
  firstName: Yup.string().required('Name is required'),
  lastName: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 digits long')
    .matches(/[A-Z]/, 'Password must contain at least one Capital letter'),
});

export const forgotPasswordUserSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
});

export const resetPasswordUserSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be 8 letters long.')
    .matches(/[A-Z]/, 'Password must contain at least one Capital letter'),
  confirmPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be 8 letters long.')
    .matches(/[A-Z]/, 'Password must contain at least one Capital letter'),
});
