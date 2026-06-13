'use client';

import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {CategoryPayload} from '@/interfaces/dashboard';
import {useDeleteCategoryMutation} from '@/redux/slices/categories/categoriesApi';
import CategoriesTable from './CategoriesTable';
import {DeleteConfirmationModal} from '@/components/shared/modals/DeleteConfirmationModal';
import CategoryDeleteConfirmation from '@/components/shared/modals/content/CategoryDeleteConfirmation';
import CategoryForm from './CategoryForm';
import useClientSideListFilter from '@/hooks/useClientSideListFilter';
import {getCategories} from '@/redux/slices/categories/categoriesSlice';
import {QUERY_PARAMS} from '@/constants/queryParams';

const Categories = () => {
  const {control, handleSubmit, reset, setValue} = useForm<CategoryPayload>({
    defaultValues: {name: ''},
  });

  const [deleteId, setDeleteId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const {
    filteredData,
    PaginationComponent,
    handleSearch,
    search,
    setSearch,
    resetFilters,
  } = useClientSideListFilter({
    selector: getCategories,
    queryOptions: QUERY_PARAMS.category,
  });

  const [deleteCategory, {isLoading: isDeleteLoading}] =
    useDeleteCategoryMutation();

  const onClose = () => {
    setIsConfirmationOpen(false);
  };

  const onDelete = (deleteId: any) => {
    deleteCategory({_id: deleteId});
    onClose();
  };

  return (
    <div className='mx-auto px-14 py-8'>
      <h2 className='text-2xl font-semibold mb-4'>Manage Categories</h2>

      <CategoryForm
        control={control}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        reset={reset}
        handleSubmit={handleSubmit}
      />

      <CategoriesTable
        setValue={setValue}
        setDeleteId={setDeleteId}
        setIsEditing={setIsEditing}
        setIsConfirmationOpen={setIsConfirmationOpen}
        categoryList={filteredData}
        PaginationComponent={PaginationComponent}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        resetFilters={resetFilters}
        isResetButtonShown={!!search}
      />

      <DeleteConfirmationModal
        content={[<CategoryDeleteConfirmation />]}
        isOpen={isConfirmationOpen}
        setIsOpen={setIsConfirmationOpen}
        onCancel={onClose}
        onDelete={() => onDelete(deleteId)}
        isDeleteLoading={isDeleteLoading}
      />
    </div>
  );
};

export default Categories;
