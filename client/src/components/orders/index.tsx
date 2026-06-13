'use client';
import {useState} from 'react';
import {Order} from '@/types/redux';
import OrderTable from './OrderTable';
import {InfoModal} from '@/components/shared/modals/InfoModal';
import OrderInfo from './OrderInfo';
import UserOrderTable from './UserOrderTable';

const Orders = ({isUserOrders = true}: {isUserOrders?: boolean}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const onClose = () => {
    setIsInfoOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div
      className={`mx-auto min-h-[80vh] ${isUserOrders ? 'py-4' : 'px-14 py-8'}`}
    >
      <h2 className='text-3xl font-semibold mb-6'>Orders</h2>

      {!isUserOrders ? (
        <OrderTable
          isUserOrders={isUserOrders}
          setSelectedOrder={setSelectedOrder}
          setIsInfoOpen={setIsInfoOpen}
        />
      ) : (
        <UserOrderTable
          isUserOrders={isUserOrders}
          setSelectedOrder={setSelectedOrder}
          setIsInfoOpen={setIsInfoOpen}
        />
      )}

      <InfoModal
        title={`Order Details`}
        content={
          selectedOrder
            ? [<OrderInfo selectedOrder={selectedOrder} onCancel={onClose} />]
            : []
        }
        isInfoOpen={isInfoOpen}
        setIsInfoOpen={() => setIsInfoOpen}
      />
    </div>
  );
};

export default Orders;
