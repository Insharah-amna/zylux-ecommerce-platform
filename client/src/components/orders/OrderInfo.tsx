import {OrderInfoModalProps} from '@/interfaces/order';
import DisplayFields from '@/components/dashboard/products/ProductsInfoContent';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import {getCurrencyConversion, getCurrencySymbol} from '@/utils/currencyUtils';
import {OrderProduct} from '@/types/redux';
import {getDiscountedPrice} from '@/utils/discountedPrice';

const OrderInfo = ({selectedOrder, onCancel}: OrderInfoModalProps) => {
  return (
    <div className='space-y-2 text-sm w-[440px] m-auto'>
      <div className='w-full flex pt-4 flex-col gap-4'>
        <DisplayFields label='Order Id' value={selectedOrder._id} />
        <DisplayFields
          label='Total Price'
          value={`${getCurrencySymbol({value: selectedOrder.currency})} ${selectedOrder.totalPrice.toFixed(2)}`}
        />
        <DisplayFields label='Status' value={selectedOrder.status} />
        <DisplayFields label='Address' value={selectedOrder.address} />
        <DisplayFields label='City' value={selectedOrder.city} />
        <DisplayFields label='Country' value={selectedOrder.country} />
      </div>

      <div className='w-full flex flex-col gap-4'>
        <label className='text-lg font-semibold'>Products Info</label>
        {selectedOrder?.details.map((product: OrderProduct) => (
          <div
            key={product.productId}
            className='border-b-1 border-gray-300 gap-2 flex flex-col'
          >
            <DisplayFields label='Name' value={product.name} />
            <DisplayFields label='Quantity' value={product.quantity} />
            {/* <DisplayFields
              label='Unit Price'
              value={`${getCurrencySymbol({value: selectedOrder.currency})} ${product.unitPrice}`}
            /> */}
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
            <DisplayFields label='Discount' value={`${product.discount}%`} />
            <DisplayFields
              label='Images'
              value={
                <img
                  src={product.images[0]}
                  alt={''}
                  height={'40px'}
                  width={'40px'}
                />
              }
            />
          </div>
        ))}
      </div>

      <div className='flex-center mt-6 max-w-[500px]'>
        <PrimaryButton
          buttonText='Close'
          className='h-[36px]'
          variant={'outline'}
          handleClick={onCancel}
        />
      </div>
    </div>
  );
};

export default OrderInfo;
