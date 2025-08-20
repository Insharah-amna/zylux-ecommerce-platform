import {FiEye} from 'react-icons/fi';
import {TableCell, TableRow} from '@/components/ui/table';
import {OrderRowProps} from '@/interfaces/order';
import {formatDate} from '@/utils/dateUtils';
import {getCurrencySymbol} from '@/utils/currencyUtils';
import {ORDER_STATUS} from '@/constants/orders';

const OrderRow = ({
  order,
  setSelectedOrder,
  setIsInfoOpen,
  isUserOrders,
}: OrderRowProps) => {
  return (
    <TableRow key={order?._id} className='border-b border-gray-200 w-full'>
      <TableCell className='py-3 overflow-hidden capitalize'>
        {`${order?._id.substring(0, 4)}...${order?._id.substring(24 - 4)}`}
      </TableCell>

      {isUserOrders ? (
        <TableCell className='py-3'>{`${getCurrencySymbol({value: order.currency})} ${order.totalPrice.toFixed(2)}`}</TableCell>
      ) : (
        <TableCell className='py-3'>{`${order.userId.firstName} ${order.userId.lastName}`}</TableCell>
      )}

      <TableCell className='py-3'>
        <span
          className={`capitalize text-xs rounded-sm px-2 py-1 ${
            order?.status === ORDER_STATUS.placed.value
              ? 'text-bluepill bg-bluepill-bg'
              : 'text-greenpill bg-greenpill-bg'
          }`}
        >
          {order?.status}
        </span>
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
