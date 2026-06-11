import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import SubmitButton from '@/components/shared/buttons/SubmitButton';
import SelectInput from '@/components/shared/inputs/SelectInput';
import TextInput from '@/components/shared/inputs/TextInput';
import MultiColorPicker from '@/components/shared/colorHandler';
import {
  PreviewImage,
  ProductsFormValues,
  ProductsPayload,
} from '@/interfaces/products';
import {AddFormProps} from '@/interfaces/modals';
import {useFetchCategoriesQuery} from '@/redux/slices/categories/categoriesApi';
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from '@/redux/slices/products/productsApi';
import {addProductSchema} from '@/schemas/dashboard';
import ImageHandler from './ImageHandler';
import SwitchInput from '@/components/shared/switches';

const ProductForm = ({
  setIsFormOpen,
  product = null,
  resetSelectedProduct,
}: AddFormProps) => {
  const {control, handleSubmit, setValue, reset, watch} =
    useForm<ProductsFormValues>({
      defaultValues: {
        name: '',
        price: 0,
        description: '',
        categoryId: {
          value: '',
          label: '',
        },
        colorVariants: [],
        isOutOfStock: false,
        discount: 0,
        imageUrls: [],
        files: [],
      },
      resolver: yupResolver(addProductSchema),
    });

  const formFields = watch();

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('price', product.price);
      setValue('description', product.description);
      setValue('categoryId', {
        value: product.categoryId._id,
        label: product.categoryId.name,
      });
      setValue('colorVariants', product.colorVariants);
      setValue('isOutOfStock', product.isOutOfStock);
      setValue('discount', product.discount);
      setValue('imageUrls', product.imageUrls);
    }
  }, [product]);

  const [images, setImages] = useState<PreviewImage[]>([]);

  const [addProduct, {isLoading}] = useAddProductMutation();

  const [updateProduct, {isLoading: isProductUpdating}] =
    useUpdateProductMutation();

  const {isLoading: isCategoriesLoading, data: categories} =
    useFetchCategoriesQuery();

  const categoryList =
    categories?.body?.categories?.map((category) => ({
      value: category._id,
      label: category.name,
    })) ?? [];

  const onSubmit = (data: ProductsPayload) => {
    const formData = new FormData();

    formData.append(
      'data',
      JSON.stringify({
        name: data.name,
        price: data.price,
        categoryId: data.categoryId.value,
        description: data.description,
        colorVariants: data.colorVariants,
        isOutOfStock: data.isOutOfStock,
        discount: data.discount,
        imageUrls: data.imageUrls,
      })
    );

    data.files?.forEach((file) => {
      formData.append('files', file);
    });

    if (product) {
      updateProduct({_id: product._id, formData});
      setIsFormOpen(false);
      reset();
    } else {
      addProduct(formData);
      reset();
      setIsFormOpen(false);
    }
  };

  const onClose = () => {
    setIsFormOpen(false);
    resetSelectedProduct(null);
    setImages([]);
    setValue('files', []);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center gap-4 my-4'
    >
      <div className='flex gap-4 w-full'>
        <TextInput
          type='text'
          name='name'
          label='Name'
          placeholder='Enter product name'
          control={control}
          className='flex-1 p-2 rounded-sm focus-visible:ring-cyan-900'
        />
        <TextInput
          type='number'
          name='price'
          label='Price'
          placeholder='Enter product price'
          control={control}
          className='flex-1 p-2 rounded-sm focus-visible:ring-cyan-900'
        />
      </div>
      <TextInput
        type='text'
        name='description'
        label='Description'
        placeholder='Enter product description'
        control={control}
        className='flex-1 p-2 rounded-sm focus-visible:ring-cyan-900'
      />
      <SelectInput
        name='categoryId'
        control={control}
        label={'Category'}
        options={categoryList}
        className='capitalize'
      />
      <div className='flex gap-8 w-full items-center'>
        <TextInput
          type='number'
          name='discount'
          label='Discount'
          placeholder='Enter discount'
          control={control}
          className='flex-1 p-2 rounded-sm focus-visible:ring-cyan-900'
        />
        <SwitchInput
          name='isOutOfStock'
          label='Out of Stock'
          control={control}
        />
      </div>
      <MultiColorPicker
        name={'colorVariants'}
        selectedColors={formFields.colorVariants ?? []}
        setValue={setValue}
      />
      <ImageHandler
        images={images}
        setImages={setImages}
        setValue={setValue}
        product={product}
      />

      <div className='flex gap-4'>
        <PrimaryButton
          buttonText='Cancel'
          handleClick={onClose}
          className='h-[36px] rounded-[8px]'
          variant='outline'
        />
        <SubmitButton
          buttonText={!product ? 'Add' : 'Update'}
          className='rounded-md hover:bg-accent'
          isLoading={isLoading || isProductUpdating}
          disabled={isLoading || isProductUpdating}
          handleSubmit={() => {
            onClose();
          }}
        />
      </div>
    </form>
  );
};

export default ProductForm;
