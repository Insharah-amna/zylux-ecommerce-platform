import CustomTable from '@/components/shared/tables/CustomTable';
import {TableCell, TableRow} from '@/components/ui/table';
import {CATEGORIES_TABLE_HEADER} from '@/constants/categories';
import {Category} from '@/types/redux';
import {CategoryTableProps} from '@/interfaces/dashboard';
import CategoryRow from './CategoryRow';
import TableSearchInput from '@/components/shared/inputs/TableSearchInput';

const CategoriesTable = ({
  setValue,
  setDeleteId,
  categoryList,
  setIsConfirmationOpen,
  setIsEditing,
  PaginationComponent,
  search,
  setSearch,
  handleSearch,
  resetFilters,
  isResetButtonShown,
}: CategoryTableProps) => {
  const categoriesTableHeaders = Object.values(CATEGORIES_TABLE_HEADER);

  const handleEditClick = (category: Category) => {
    setIsEditing(true);
    setValue('name', category.name);
    setValue('_id', category._id);
  };

  const handleDelete = (category: Category) => {
    setDeleteId(category._id);
    setIsConfirmationOpen(true);
  };

  return (
    <>
      <div className='flex-end w-full'>
        <TableSearchInput
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          resetFilters={resetFilters}
          isResetButtonShown={isResetButtonShown}
        />
      </div>

      <CustomTable
        tableHeaders={categoriesTableHeaders}
        tableBody={
          <>
            {categoryList.map((category: Category) => (
              <CategoryRow
                category={category}
                handleEditClick={() => handleEditClick(category)}
                handleDelete={() => handleDelete(category)}
              />
            ))}
            {categoryList.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className='text-center py-4 text-gray-500'
                >
                  No categories available.
                </TableCell>
              </TableRow>
            )}
          </>
        }
      />
      {PaginationComponent}
    </>
  );
};
export default CategoriesTable;
