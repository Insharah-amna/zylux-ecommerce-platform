'use client';

import {useState} from 'react';
import {useDeleteProductMutation} from '@/redux/slices/products/productsApi';
import {Product} from '@/types/redux';
import {FormModal} from '@/components/shared/modals/FormModal';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import {InfoModal} from '@/components/shared/modals/InfoModal';
import ProductForm from './ProductForm';
import {DeleteConfirmationModal} from '@/components/shared/modals/DeleteConfirmationModal';
import ProductTable from './ProductTable';
import ProductInfo from './ProductInfo';
import ProductDeleteConfirmation from '@/components/shared/modals/content/ProductDeleteConfirmation';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deleteProduct, {isLoading: isDeleteLoading}] =
    useDeleteProductMutation();

  const onClose = () => {
    if (isInfoOpen) setIsInfoOpen(false);
    if (isConfirmationOpen) setIsConfirmationOpen(false);
    setSelectedProduct(null);
  };

  const onDelete = () => {
    deleteProduct({_id: selectedProduct?._id});
    onClose();
  };

  return (
    <div className='mx-auto px-14 py-8 min-h-[80vh]'>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-semibold mb-6'>Products</h2>

        <PrimaryButton
          buttonText='Add Product'
          handleClick={() => setIsFormOpen(true)}
          variant={'outline'}
          className='h-11'
        />
      </div>

      <ProductTable
        setSelectedProduct={setSelectedProduct}
        setIsFormOpen={setIsFormOpen}
        setIsInfoOpen={setIsInfoOpen}
        setIsConfirmationOpen={setIsConfirmationOpen}
      />

      <FormModal
        title='Add Product'
        content={[
          <ProductForm
            product={selectedProduct}
            setIsFormOpen={setIsFormOpen}
            resetSelectedProduct={setSelectedProduct}
          />,
        ]}
        isFormOpen={isFormOpen}
        setIsFormOpen={() => setIsFormOpen(true)}
      />

      <InfoModal
        title={`Product's Details`}
        content={[
          <ProductInfo selectedProduct={selectedProduct} onCancel={onClose} />,
        ]}
        isInfoOpen={isInfoOpen}
        setIsInfoOpen={() => setIsInfoOpen}
      />

      <DeleteConfirmationModal
        content={[<ProductDeleteConfirmation />]}
        isOpen={isConfirmationOpen}
        setIsOpen={setIsConfirmationOpen}
        onCancel={onClose}
        onDelete={onDelete}
        isDeleteLoading={isDeleteLoading}
      />
    </div>
  );
};

export default Products;
