'use client';
import {useState} from 'react';
import {OrderInfoModalProps} from '@/interfaces/order';
import DisplayFields from '@/components/dashboard/products/ProductsInfoContent';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import {getCurrencyConversion, getCurrencySymbol} from '@/utils/currencyUtils';
import {OrderProduct} from '@/types/redux';
import {getDiscountedPrice} from '@/utils/discountedPrice';
import {InfoModal} from '@/components/shared/modals/InfoModal';

const OrderInfo = ({selectedOrder, onCancel}: OrderInfoModalProps) => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [image, setImage] = useState('');

  return (
    <>
      <div className='space-y-2 text-sm w-[440px] m-auto'>
        <div className='w-full flex pt-4 flex-col gap-4'>
          <DisplayFields label='Order Id' value={selectedOrder._id} />
          <DisplayFields
            label='Subtotal'
            value={`${getCurrencySymbol({value: selectedOrder.currency})} ${selectedOrder.totalPrice.toFixed(2)}`}
          />
          <DisplayFields label='Status' value={selectedOrder.status} />
          <DisplayFields label='Address' value={selectedOrder.address} />
          <DisplayFields label='City' value={selectedOrder.city} />
          <DisplayFields label='Country' value={selectedOrder.country} />
        </div>

        <div className='w-full flex flex-col gap-4'>
          {selectedOrder?.details.map((product: OrderProduct) => (
            <>
              <div
                key={product.productId}
                className='border-b-1 border-gray-300 gap-2 flex flex-col shadow-sm rounded-md px-4 py-2'
              >
                <DisplayFields label='Name' value={product.name} />
                <DisplayFields label='Quantity' value={product.quantity} />

                {product.discount > 0 ? (
                  <DisplayFields
                    label='Unit Price'
                    value={
                      <p>
                        {`${getCurrencySymbol({value: selectedOrder.currency})} `}

                        <span className='line-through text-gray-600'>
                          {getCurrencyConversion({
                            price: product.unitPrice,
                            currency: selectedOrder.currency,
                          })}
                        </span>

                        <span>
                          {` ${getDiscountedPrice({
                            unitPrice: product.unitPrice,
                            discount: product.discount,
                            currency: selectedOrder.currency,
                          })}`}
                        </span>
                      </p>
                    }
                  />
                ) : (
                  <DisplayFields
                    label='Unit Price'
                    value={`${getCurrencySymbol({value: selectedOrder.currency})} ${product.unitPrice}`}
                  />
                )}
                <DisplayFields
                  label='Discount'
                  value={`${product.discount}%`}
                />
                <DisplayFields
                  label='Images'
                  value={
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      height={'40px'}
                      width={'40px'}
                      className='cursor-pointer'
                      onClick={() => {
                        setIsImageOpen(true);
                        setImage(product.images[0]);
                      }}
                    />
                  }
                />
              </div>

              <InfoModal
                content={[
                  <div className='mt-2'>
                    <img
                      src={image}
                      alt={product.name}
                      className='h-[480px] w-[500px] rounded-md'
                    />
                    <div className='flex-center my-2 sticky bottom-2 max-w-[500px]'>
                      <PrimaryButton
                        buttonText='Close'
                        className='h-[36px]'
                        handleClick={() => {
                          setIsImageOpen(false);
                          setImage('');
                        }}
                      />
                    </div>
                  </div>,
                ]}
                isInfoOpen={isImageOpen}
                setIsInfoOpen={() => setIsImageOpen}
              />
            </>
          ))}
        </div>

        <div className='flex-center my-6 sticky bottom-6 bg-white max-w-[500px]'>
          <PrimaryButton
            buttonText='Close'
            className='h-[36px]'
            handleClick={onCancel}
          />
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
