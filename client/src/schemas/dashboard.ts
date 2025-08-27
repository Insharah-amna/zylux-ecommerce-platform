import * as Yup from 'yup';
import {ProductsFormValues} from '@/interfaces/products';

export const addProductSchema: Yup.ObjectSchema<ProductsFormValues> =
  Yup.object({
    _id: Yup.string().optional(),
    name: Yup.string().required('Name is required'),
    price: Yup.number()
      .required('Price is required')
      .min(1, 'Price must be greater than 0'),

    description: Yup.string().required('Description is required'),
    categoryId: Yup.object({
      value: Yup.string().required(),
      label: Yup.string().required(),
    }).required('Category is required'),

    colorVariants: Yup.array()
      .of(Yup.string().required())
      .required('At least 1 color is required'),

    isOutOfStock: Yup.boolean().default(false),
    discount: Yup.number()
      .min(0, 'Discount cannot be negative')
      .max(100, 'Invalid amount for discount')
      .default(0),

    imageUrls: Yup.array().optional(),
    files: Yup.array().optional(),
  });

export const addressSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
});

export const reviewSchema = Yup.object().shape({
  rating: Yup.number().min(1).required('Rating is required'),
  subject: Yup.string().required('Subject is required'),
  comment: Yup.string().required('Comment is required'),
});

export const profileSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  profileImage: Yup.string().required('Image is required'),
});
