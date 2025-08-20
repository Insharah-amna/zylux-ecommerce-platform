import {FiEye} from 'react-icons/fi';
import {TableCell, TableRow} from '@/components/ui/table';
import {OrderRowProps} from '@/interfaces/order';
import {formatDate} from '@/utils/dateUtils';

const OrderRow = ({order, setSelectedOrder, setIsInfoOpen}: OrderRowProps) => {
  return (
    <TableRow key={order?._id} className='border-b border-gray-200 w-full'>
      <TableCell className='py-3 overflow-hidden capitalize'>
        {order?._id}
      </TableCell>

      <TableCell className='py-3'>{`${order.userId.firstName} ${order.userId.lastName}`}</TableCell>
      <TableCell
        className={`py-3 capitalize ${order?.status === 'placed' ? 'text-lime-500' : 'text-green-600'}`}
      >
        {order?.status}
      </TableCell>

      <TableCell className='py-3 capitalize'>
        <span>{formatDate({date: order.createdAt})}</span>
      </TableCell>

      <TableCell className='flex gap-2'>
        <FiEye
          className='text-blue-500 h-7 text-md md:text-lg cursor-pointer'
          onClick={() => {
            setSelectedOrder(order);
            setIsInfoOpen(true);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default OrderRow;
