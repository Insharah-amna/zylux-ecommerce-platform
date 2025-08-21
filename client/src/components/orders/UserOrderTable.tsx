import {OrderTableProps} from '@/interfaces/order';
import {useServerSideListFilter} from '@/hooks/useServerSideListFilter';
import {useFetchOrdersByUserIdQuery} from '@/redux/slices/orders/ordersApi';
import {QUERY_PARAMS} from '@/constants/queryParams';
import {USER_ORDERS_TABLE_HEADER} from '@/constants/orders';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import {Order} from '@/types/redux';
import OrderRow from './OrderRow';
import CustomTable from '@/components/shared/tables/CustomTable';
import {TableCell, TableRow} from '@/components/ui/table';

const UserOrderTable = ({
  setSelectedOrder,
  setIsInfoOpen,
  isUserOrders,
}: OrderTableProps) => {
  const {
    filteredData: ordersList,
    isLoading: isOrdersLoading,
    PaginationComponent,
  } = useServerSideListFilter({
    queryToCall: useFetchOrdersByUserIdQuery,
    queryKey: 'orders',
    queryOptions: QUERY_PARAMS.orders,
  });

  const userOrdersTableHeader = Object.values(USER_ORDERS_TABLE_HEADER);

  if (isOrdersLoading) return <ComponentLoader />;

  return (
    <>
      <CustomTable
        tableHeaders={userOrdersTableHeader}
        tableBody={
          <>
            {ordersList.map((order: Order) => (
              <OrderRow
                isUserOrders={isUserOrders}
                order={order}
                setSelectedOrder={setSelectedOrder}
                setIsInfoOpen={setIsInfoOpen}
              />
            ))}
            {ordersList.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='w-full text-center py-6 text-gray-500'
                >
                  You have not placed any orders yet.
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

export default UserOrderTable;
