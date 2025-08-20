'use client';
import {useState} from 'react';
import {Order} from '@/types/redux';
import OrderTable from './OrderTable';
import {InfoModal} from '@/components/shared/modals/InfoModal';
import OrderInfo from './OrderInfo';

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const onClose = () => {
    setIsInfoOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className='mx-auto px-14 py-8 min-h-[80vh]'>
      <h2 className='text-3xl font-semibold mb-6'>Orders</h2>

      <OrderTable
        setSelectedOrder={setSelectedOrder}
        setIsInfoOpen={setIsInfoOpen}
      />

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
