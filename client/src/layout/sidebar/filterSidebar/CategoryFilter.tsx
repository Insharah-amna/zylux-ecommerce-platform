'use client';
import CheckboxInput from '@/components/shared/inputs/Checkbox';
import {Category} from '@/types/redux';
import {CategoryFilterProps} from '@/interfaces/shop';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';

const CategoryFilter = ({
  categoryList,
  isCategoriesLoading,
  categories,
  handleCheckboxChange,
}: CategoryFilterProps) => {
  if (isCategoriesLoading) return <ComponentLoader />;

  return (
    <div className='flex flex-col justify-between border-t border-gray-300 hover:text-gray-800'>
      <div className='flex justify-between h-[40px] cursor-pointer hover:underline'>
        <h3 className='font-semibold pt-3 text-gray-600'>Category:</h3>
      </div>

      <div className='my-5 flex flex-col gap-5'>
        {categoryList.map((category: Category) => (
          <CheckboxInput
            key={category._id}
            label={category.name}
            checked={categories.includes(category._id)}
            onChange={() => handleCheckboxChange(category._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
