import {FiHeart, FiShoppingBag} from 'react-icons/fi';
import {useSelector} from 'react-redux';
import {dispatch} from '@/redux/store';
import {actions, getCartItem} from '@/redux/slices/users/usersSlice';
import {ProductButtonProps} from '@/interfaces/shop';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import {ProductProps} from '@/interfaces/products';

const ProductButtons = ({product, quantity}: ProductButtonProps) => {
  const existedProduct = useSelector(
    getCartItem({productId: product._id as string})
  );

  const handleCartItem = ({product}: ProductProps) => {
    existedProduct
      ? dispatch(actions.removeItemFromCart(product._id))
      : dispatch(
          actions.setCartItem({
            ...product,
            quantity: quantity,
          })
        );
  };

  return (
    <>
      <PrimaryButton
        buttonText={
          <span className='flex gap-3 items-center'>
            <FiShoppingBag />
            {existedProduct ? 'Remove From Cart' : 'Add to Cart'}
          </span>
        }
        variant={'outline'}
        className='py-6 rounded-3xl w-[90%]'
        handleClick={() => handleCartItem({product})}
      />

      <PrimaryButton
        buttonText='Buy Now'
        className='w-[90%] rounded-3xl py-6 hover:bg-accent'
      />

      <PrimaryButton
        buttonText={
          <span className='flex gap-3 items-center'>
            <FiHeart />
            Add to Wishlist
          </span>
        }
        variant={'outline'}
        className='py-6 rounded-3xl w-[90%] hover:text-accent'
      />
    </>
  );
};

export default ProductButtons;
