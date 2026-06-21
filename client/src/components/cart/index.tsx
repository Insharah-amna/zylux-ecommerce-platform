import Container from '@/components/shared/containers/Container';
import CartItems from './CartItems';

const Cart = () => {
  return (
    <div className='w-full flex-center'>
      <Container>
        <div>
          <h1 className='text-lg sm:text-3xl text-primary font-semibold my-5 sm:my-8'>
            Your Shopping Cart
          </h1>

          <CartItems />
        </div>
      </Container>
    </div>
  );
};

export default Cart;
