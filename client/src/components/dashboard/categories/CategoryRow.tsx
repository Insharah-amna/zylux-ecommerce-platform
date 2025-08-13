import {FiEdit, FiTrash} from 'react-icons/fi';
import {TableCell, TableRow} from '@/components/ui/table';
import {CategoryRowProps} from '@/interfaces/dashboard';

const CategoryRow = ({
  category,
  handleEditClick,
  handleDelete,
}: CategoryRowProps) => {
  return (
    <TableRow key={category?._id} className='border-b border-gray-200 '>
      <TableCell className='p-3 capitalize'>{category?.name}</TableCell>
      <TableCell className='p-3 text-right flex items-center'>
        <FiEdit
          className='text-blue-600 w-12 text-lg'
          onClick={handleEditClick}
        />
        <FiTrash className='text-red-600 w-12 text-lg' onClick={handleDelete} />
      </TableCell>
    </TableRow>
  );
};

export default CategoryRow;
