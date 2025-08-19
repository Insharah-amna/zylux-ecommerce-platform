'use client';
import {useSelector} from 'react-redux';
import {
  actions,
  getCartItems,
  getCurrency,
} from '@/redux/slices/users/usersSlice';
import {dispatch} from '@/redux/store';
import Checkout from './Checkout';
import EmptyCart from './EmptyCart';
import QuantitySelector from '@/components/shared/inputs/QuantitySelector';
import ItemDetails from './ItemDetails';
import {getCurrencyConversion} from '@/utils/currencyUtils';

const CartItems = () => {
  const cartItems = useSelector(getCartItems);

  const currency = useSelector(getCurrency);

  return cartItems?.length === 0 ? (
    <EmptyCart />
  ) : (
    <div className='my-2'>
      <div className='flex w-full py-4'>
        <h2 className='text-lg text-gray-700 w-3/6 uppercase'>Product</h2>
        <h2 className='text-lg text-gray-700 w-2/6 uppercase flex-center opacity-0 sm:opacity-100'>
          Quantity
        </h2>
        <h2 className='text-lg text-gray-700 w-1/6 uppercase flex-center'>
          Total
        </h2>
      </div>

      <div>
        {cartItems.map((product, index) => (
          <div className='flex border-y-1 border-gray-200 py-8' key={index}>
            <div className='w-3/6'>
              <ItemDetails
                product={product}
                handleRemove={() =>
                  dispatch(actions.removeItemFromCart(product._id))
                }
              />
              <div className='flex-center w-full sm:hidden mt-4'>
                <QuantitySelector
                  product={product}
                  handleDecrement={() =>
                    dispatch(actions.decrementItemQuantity(product))
                  }
                  handleIncrement={() =>
                    dispatch(actions.incrementItemQuantity(product))
                  }
                />
              </div>
            </div>

            <div className='w-2/6 h-[120px] flex-center opacity-0 sm:opacity-100'>
              <QuantitySelector
                product={product}
                handleDecrement={() =>
                  dispatch(actions.decrementItemQuantity(product))
                }
                handleIncrement={() =>
                  dispatch(actions.incrementItemQuantity(product))
                }
              />
            </div>

            <div className='w-1/6 h-[120px] flex-center text-lg'>
              {`${currency.symbol} ${getCurrencyConversion({
                price: product.price * product.quantity,
                currency: currency.label,
              }).toFixed(2)}`}
            </div>
          </div>
        ))}
      </div>

      <Checkout />
    </div>
  );
};

export default CartItems;
