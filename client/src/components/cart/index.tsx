import Container from '@/components/shared/containers/Container';
import CartItems from './CartItems';

const Cart = () => {
  return (
    <div className='w-full flex-center'>
      <Container>
        <div>
          <h1 className='text-3xl text-primary font-semibold my-8'>
            Your Shopping Cart
          </h1>

          <CartItems />
        </div>
      </Container>
    </div>
  );
};

export default Cart;
