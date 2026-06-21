import {FiEdit, FiEye, FiTrash} from 'react-icons/fi';
import {TableCell, TableRow} from '@/components/ui/table';
import {ProductTableRowProps} from '@/interfaces/products';

const ProductRow = ({
  product,
  setSelectedProduct,
  setIsFormOpen,
  setIsInfoOpen,
  setIsConfirmationOpen,
}: ProductTableRowProps) => {
  return (
    <TableRow key={product?._id} className='border-b border-gray-200 w-full'>
      <TableCell className='p-3 overflow-hidden capitalize'>
        {product?.name}
      </TableCell>
      <TableCell className='p-3'>{product?.price}</TableCell>

      <TableCell className='p-3 capitalize'>
        {product?.categoryId?.name}
      </TableCell>

      <TableCell
        className={`p-3 capitalize ${product?.isOutOfStock === true ? 'text-accent' : ''}`}
      >
        {product?.isOutOfStock === true ? 'Out of stock' : 'In stock'}
      </TableCell>

      <TableCell className='flex gap-2'>
        <FiEdit
          className='text-blue-600 h-7 text-md md:text-lg cursor-pointer'
          onClick={() => {
            setSelectedProduct(product);
            setIsFormOpen(true);
          }}
        />
        <FiEye
          className='text-gray-600 h-7 text-md md:text-lg cursor-pointer'
          onClick={() => {
            setSelectedProduct(product);
            setIsInfoOpen(true);
          }}
        />
        <FiTrash
          className='text-red-600 h-7 text-md md:text-lg cursor-pointer'
          onClick={() => {
            setSelectedProduct(product);
            setIsConfirmationOpen(true);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
