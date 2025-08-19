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

    imageUrls: Yup.array().optional(),
    files: Yup.array().optional(),
  });

export const addressSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
});
