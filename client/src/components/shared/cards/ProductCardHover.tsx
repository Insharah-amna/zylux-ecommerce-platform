import Link from 'next/link';
import {useSelector} from 'react-redux';
import {FiEye, FiHeart} from 'react-icons/fi';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import {ProductProps} from '@/interfaces/products';
import {PUBLIC_ROUTES} from '@/utils/PATHS';
import {dispatch} from '@/redux/store';
import {
  actions,
  getCartItem,
  getCurrentUser,
  getWishlistByProductId,
} from '@/redux/slices/users/usersSlice';
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from '@/redux/slices/wishlist/wishlistApi';
import {createWishlistItem} from '@/utils/general';
import {User} from '@/types/redux';
import ClipBtnLoader from '@/components/shared/loaders/ClipLoader';

const iconClass =
  'p-[10px] bg-stone-100 rounded-full text-center shadow-md hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 mb-3';
const onHoverClass =
  'opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-100 absolute top-0 right-0 flex-col z-10 p-5';
const buttonClass =
  'opacity-0 group-hover:opacity-100 absolute bottom-0 p-5 w-full justify-center translate-y-5 group-hover:translate-y-0 transition-all duration-400 delay-100';

const HoverIcons = ({product}: ProductProps) => {
  const user = useSelector(getCurrentUser);

  const existedProduct = useSelector(
    getCartItem({productId: product._id as string})
  );

  const existedItem = useSelector(
    getWishlistByProductId({productId: product._id as string})
  );

  const [addProduct, {isLoading: isProductAdding}] = useAddToWishlistMutation();
  const [removeProduct, {isLoading: isProductRemoving}] =
    useRemoveFromWishlistMutation();

  const handleWishlistBtn = ({product}: ProductProps) => {
    if (existedItem) {
      removeProduct({_id: existedItem._id, productId: product._id as string});
    } else {
      const wishlistItem = createWishlistItem({user: user as User, product});

      addProduct({_id: product._id as string, wishlistItem});
    }
  };

  const handleQuickAdd = ({product}: ProductProps) => {
    existedProduct
      ? dispatch(actions.removeItemFromCart(product._id))
      : dispatch(
          actions.setCartItem({
            ...product,
            quantity: 1,
          })
        );
  };

  return (
    <div>
      <div className={onHoverClass}>
        {existedItem ? (
          <div
            className={iconClass}
            onClick={() => handleWishlistBtn({product})}
          >
            {isProductRemoving ? (
              <ClipBtnLoader />
            ) : (
              <FiHeart color='red' fill='red' />
            )}
          </div>
        ) : (
          <div
            className={iconClass}
            onClick={() => handleWishlistBtn({product})}
          >
            {isProductAdding ? <ClipBtnLoader /> : <FiHeart />}
          </div>
        )}

        <Link href={PUBLIC_ROUTES.singleProduct({_id: product._id})}>
          <div className={iconClass}>
            <FiEye />
          </div>
        </Link>
      </div>

      <div className={buttonClass}>
        <PrimaryButton
          buttonText={!existedProduct ? 'Quick Add' : 'Remove From Cart'}
          variant={'secondary'}
          className='w-full h-10 rounded-sm transition-all duration-300 ease-in-out'
          handleClick={() => handleQuickAdd({product})}
        />
      </div>
    </div>
  );
};

export default HoverIcons;
