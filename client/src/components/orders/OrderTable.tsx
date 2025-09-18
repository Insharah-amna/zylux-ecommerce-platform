'use client';
import CustomTable from '@/components/shared/tables/CustomTable';
import {TableCell, TableRow} from '@/components/ui/table';
import {ORDERS_TABLE_HEADER} from '@/constants/orders';
import {useServerSideListFilter} from '@/hooks/useServerSideListFilter';
import {useFetchOrdersQuery} from '@/redux/slices/orders/ordersApi';
import {QUERY_PARAMS} from '@/constants/queryParams';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import {Order} from '@/types/redux';
import OrderRow from './OrderRow';
import {OrderTableProps} from '@/interfaces/order';

const OrderTable = ({
  setSelectedOrder,
  setIsInfoOpen,
  isUserOrders,
}: OrderTableProps) => {
  const {
    filteredData: ordersList,
    isLoading: isOrdersLoading,
    PaginationComponent,
  } = useServerSideListFilter({
    queryToCall: useFetchOrdersQuery,
    queryKey: 'orders',
    queryOptions: QUERY_PARAMS.orders,
  });

  const ordersTableHeader = Object.values(ORDERS_TABLE_HEADER);

  if (isOrdersLoading) return <ComponentLoader />;

  return (
    <>
      <CustomTable
        tableHeaders={ordersTableHeader}
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
                  You have no orders yet.
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

export default OrderTable;
