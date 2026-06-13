import {FiHeart, FiShoppingBag} from 'react-icons/fi';
import {useSelector} from 'react-redux';
import {dispatch} from '@/redux/store';
import {
  actions,
  getCartItem,
  getCurrentUser,
  getWishlistByProductId,
} from '@/redux/slices/users/usersSlice';
import {ProductButtonProps} from '@/interfaces/shop';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import {ProductProps} from '@/interfaces/products';
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from '@/redux/slices/wishlist/wishlistApi';
import {createWishlistItem} from '@/utils/general';
import {User} from '@/types/redux';
import ClipBtnLoader from '../shared/loaders/ClipLoader';

const ProductButtons = ({product, quantity}: ProductButtonProps) => {
  const user = useSelector(getCurrentUser);

  const existedProduct = useSelector(
    getCartItem({productId: product._id as string})
  );

  const existedItem = useSelector(
    getWishlistByProductId({productId: product._id as string})
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

  const [addProduct, {isLoading: isProductAdding}] = useAddToWishlistMutation();
  const [removeProduct, {isLoading: isProductRemoving}] =
    useRemoveFromWishlistMutation();

  const handleWishlistItem = ({product}: ProductProps) => {
    if (existedItem) {
      removeProduct({_id: existedItem._id, productId: product._id as string});
    } else {
      const wishlistItem = createWishlistItem({user: user as User, product});

      addProduct({_id: product._id as string, wishlistItem});
    }
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
        className='py-6 rounded-3xl w-full'
        handleClick={() => handleCartItem({product})}
      />

      <PrimaryButton
        buttonText='Buy Now'
        className='w-full rounded-3xl py-6 hover:bg-accent'
      />

      <PrimaryButton
        buttonText={
          <span className='flex gap-3 items-center'>
            {existedItem ? (
              <>
                {!isProductRemoving ? (
                  <FiHeart fill='red' color='red' />
                ) : (
                  <ClipBtnLoader color='#111' />
                )}
                Remove From Wishlist
              </>
            ) : (
              <>
                {!isProductAdding ? (
                  <FiHeart />
                ) : (
                  <ClipBtnLoader color='#111' />
                )}
                Add to Wishlist
              </>
            )}
          </span>
        }
        variant={'outline'}
        className='py-6 rounded-3xl w-full hover:text-accent'
        handleClick={() => handleWishlistItem({product})}
      />
    </>
  );
};

export default ProductButtons;
