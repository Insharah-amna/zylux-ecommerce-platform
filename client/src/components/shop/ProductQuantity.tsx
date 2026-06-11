import {FiMinus, FiPlus} from 'react-icons/fi';
import {ProductQuantityProps} from '@/interfaces/shop';

const ProductQuantity = ({
  selectedQuantity,
  setSelectedQuantity,
}: ProductQuantityProps) => {
  return (
    <div className='flex gap-5 h-[50px] items-center'>
      <label htmlFor='quantity' className='text-gray-700 font-semibold'>
        Quantity
      </label>

      <div className='flex border-1 border-gray-300 rounded-3xl w-[100px] py-1'>
        <button
          name='minus'
          className='p-2 w-1/3 cursor-pointer'
          onClick={() => {
            selectedQuantity > 1 && setSelectedQuantity((prev) => prev - 1);
          }}
        >
          <FiMinus />
        </button>
        <input
          type='text'
          id='quantity'
          min={1}
          value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(Number(e.target.value))}
          className='w-1/3 text-center'
        />
        <button
          name='plus'
          className='p-2 w-1/3 cursor-pointer'
          onClick={() => {
            setSelectedQuantity((prev) => prev + 1);
          }}
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductQuantity;
