import SubmitButton from '@/components/shared/buttons/SubmitButton';
import TextInput from '@/components/shared/inputs/TextInput';
import {CategoryFormProps, CategoryPayload} from '@/interfaces/dashboard';
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from '@/redux/slices/categories/categoriesApi';

const CategoryForm = ({
  control,
  reset,
  handleSubmit,
  isEditing,
  setIsEditing,
}: CategoryFormProps) => {
  const [addCategory, {isLoading}] = useAddCategoryMutation();

  const [updateCategory, {isLoading: isUpdateLoading}] =
    useUpdateCategoryMutation();

  const onSubmit = (data: CategoryPayload) => {
    if (isEditing) {
      updateCategory({_id: data._id, name: data.name});
      setIsEditing(false);
      reset();
    } else {
      addCategory({name: data.name});
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex items-center gap-4 mb-10'
    >
      <TextInput
        type='text'
        name='name'
        placeholder='Enter category name'
        control={control}
        className='flex-1 p-2 rounded-sm focus-visible:ring-cyan-900'
      />
      <SubmitButton
        buttonText={isEditing ? 'Update' : 'Add'}
        className='rounded-md hover:bg-accent'
        isLoading={isLoading || isUpdateLoading}
      />
    </form>
  );
};

export default CategoryForm;
